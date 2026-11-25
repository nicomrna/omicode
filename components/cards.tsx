import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, type PostMeta } from "@/lib/posts";
import type { Entry } from "@/lib/content";
import type { Project } from "@/lib/data";
import { Tag } from "./ui";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-xl border border-ink bg-surface p-6 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-ink)]"
    >
      <div className="flex items-center gap-3 font-mono text-xs text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden>/</span>
        <span>{post.readingTime} min</span>
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight group-hover:text-accent-600">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{post.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </Link>
  );
}

const tones = {
  accent: "bg-accent text-ink",
  ink: "bg-ink text-paper",
  sand: "bg-[#e6e0d0] text-ink",
} as const;

export function ProjectCard({ project, index }: { project: Entry<Project>; index: number }) {
  const { data } = project;
  const tone = tones[data.tone ?? "accent"] ?? tones.accent;

  const card = (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-ink bg-surface transition group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0_0_var(--color-ink)]">
      <div className={`relative flex h-48 items-end justify-between overflow-hidden p-5 ${tone}`}>
        {data.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.image} alt={`Captura de ${data.title}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <>
            <span className="absolute -right-6 -top-6 h-36 w-36 rounded-full border border-dashed border-current opacity-40" aria-hidden />
            <span className="font-display text-8xl font-bold leading-[0.8] tracking-tighter">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-xs">{data.year}</span>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight">{data.title}</h3>
          {data.url && <ArrowUpRight className="mt-1 h-5 w-5 shrink-0" aria-hidden />}
        </div>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{project.body}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {data.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </article>
  );

  return data.url ? (
    <a href={data.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
      {card}
    </a>
  ) : (
    <div className="group h-full">{card}</div>
  );
}
