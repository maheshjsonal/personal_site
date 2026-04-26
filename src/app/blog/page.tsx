import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Personal Site',
  description: 'Thoughts on web development, design, and technology.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Blog
        </h1>
        <p className="text-lg text-muted max-w-2xl">
          Thoughts on web development, design systems, and the latest in technology.
        </p>
      </div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <article key={post.slug} className="group border border-border p-6 rounded-lg hover:shadow-lg transition-shadow bg-card">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {post.tags.length > 0 && (
                    <>
                      <span>•</span>
                      <div className="flex gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group-hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-4">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-primary hover:underline font-medium"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}