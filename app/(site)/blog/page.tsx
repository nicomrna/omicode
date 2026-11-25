import type { Metadata } from "next";
import { getBlogPage } from "@/lib/data";
import { getAllPosts } from "@/lib/posts";
import { Container, PageHeader } from "@/components/ui";
import { PostCard } from "@/components/cards";

export function generateMetadata(): Metadata {
  return { title: "Blog", description: getBlogPage().text, alternates: { canonical: "/blog" } };
}

export default function BlogPage() {
  const page = getBlogPage();
  const posts = getAllPosts();
  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} text={page.text} />
      <section className="py-16">
        <Container>
          {posts.length === 0 ? (
            <p className="text-muted">{page.empty}</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
