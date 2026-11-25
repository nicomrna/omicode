import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { getBlogPage, getSite } from "@/lib/data";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";
import { ButtonLink, Container, Tag } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", title: post.meta.title, description: post.meta.description, publishedTime: post.meta.date },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const site = getSite();
  const page = getBlogPage();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: { "@type": "Person", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${slug}`,
  };

  return (
    <article className="py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Container className="max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-1.5 font-mono text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Blog
        </Link>
        <header className="mt-6">
          <div className="flex items-center gap-3 font-mono text-xs text-muted">
            <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
            <span aria-hidden>/</span>
            <span>{post.meta.readingTime} min de lectura</span>
          </div>
          <h1 className="mt-5 text-balance font-display text-5xl font-bold leading-[1.02] tracking-tighter sm:text-6xl">{post.meta.title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-muted">{post.meta.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {post.meta.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </header>

        <div className="prose prose-lg mt-10 max-w-none border-t border-ink pt-10 prose-a:no-underline hover:prose-a:underline">
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-16 rounded-xl border border-ink bg-surface p-8 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight">{page.postCtaTitle}</h2>
          <p className="mt-2 text-muted">{page.postCtaText}</p>
          <div className="mt-6">
            <ButtonLink href="/contacto">{page.postCtaLabel}</ButtonLink>
          </div>
        </div>
      </Container>
    </article>
  );
}
