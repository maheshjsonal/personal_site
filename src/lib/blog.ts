import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  content: string;
  htmlContent: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');

  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Process markdown to HTML with syntax highlighting
        const processedContent = await remark()
          .use(remarkGfm)
          .use(remarkRehype)
          .use(rehypeHighlight)
          .use(rehypeStringify)
          .process(content);
        const htmlContent = processedContent.toString();

        return {
          title: data.title || '',
          description: data.description || '',
          date: data.date || '',
          slug: data.slug || slug,
          tags: data.tags || [],
          content,
          htmlContent,
        } as BlogPost;
      })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}