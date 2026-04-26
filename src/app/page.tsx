import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default async function Home() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 2); // Show only the 2 latest posts

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <section className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Hey, I'm a Developer
        </h1>
        <p className="text-lg text-muted max-w-2xl">
          Welcome to my digital garden. 🌿 I'm a passionate software engineer focusing on modern web technologies, design systems, and improving user experiences.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold border-b pb-2 border-border">
            Latest Posts
          </h2>
          <Link href="/blog" className="text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6">
          {latestPosts.map((post) => (
            <article key={post.slug} className="group">
              <time className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h3 className="text-xl font-medium mt-1">
                <Link href={`/blog/${post.slug}`} className="group-hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 text-muted">
                {post.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2 border-border">
          Featured Projects
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="border border-border p-6 rounded-lg hover:shadow-lg transition-shadow bg-card">
            <h3 className="font-medium text-lg">Project Alpha</h3>
            <p className="text-sm text-muted-foreground mt-2">A revolutionary tool that simplifies your daily workflow.</p>
            <a href="#" className="text-sm mt-4 inline-block font-medium text-primary transition-colors">View Project &rarr;</a>
          </div>
          <div className="border border-border p-6 rounded-lg hover:shadow-lg transition-shadow bg-card">
            <h3 className="font-medium text-lg">Project Beta</h3>
            <p className="text-sm text-muted-foreground mt-2">An open-source library for creating beautiful animations.</p>
            <a href="#" className="text-sm mt-4 inline-block font-medium text-primary transition-colors">View Project &rarr;</a>
          </div>
        </div>
      </section>
    </div>
  );
}
