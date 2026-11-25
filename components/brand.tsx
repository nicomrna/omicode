/** Marca de omnicode: un anillo (el "todo") con un punto en órbita. */
export function LogoMark({ className = "h-8 w-8", dark = false }: { className?: string; dark?: boolean }) {
  const ink = dark ? "#f4f1ea" : "#0e0e12";
  const bg = dark ? "#0e0e12" : "#f4f1ea";
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <circle cx="16" cy="16" r="11" stroke={ink} strokeWidth="3.2" />
      <circle cx="24.8" cy="9.4" r="4.2" fill="#ff4d1c" stroke={bg} strokeWidth="2" />
    </svg>
  );
}

export function Logo({ brand, dark = false }: { brand: string; dark?: boolean }) {
  const prefix = brand.replace(/code$/i, "");
  const suffix = brand.slice(prefix.length);
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark dark={dark} />
      <span className={`font-display text-[1.4rem] font-bold leading-none tracking-tight ${dark ? "text-paper" : "text-ink"}`}>
        {prefix}
        <span className={`font-mono text-[1.1rem] font-medium ${dark ? "text-accent" : "text-accent-600"}`}>{suffix}</span>
      </span>
    </span>
  );
}
