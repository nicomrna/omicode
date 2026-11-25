export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center font-display text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="px-6">{t}</span>
          <span className="text-accent" aria-hidden>✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-b border-ink bg-ink py-4 text-paper">
      <div className="marquee-track flex">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
