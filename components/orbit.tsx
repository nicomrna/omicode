import { LogoMark } from "./brand";

const rings = [
  { inset: "28%", dur: "40s", rev: false, angles: [20, 200] },
  { inset: "14%", dur: "60s", rev: true, angles: [110, 290] },
  { inset: "0%", dur: "85s", rev: false, angles: [65, 245] },
];

/** Ilustración del hero: todo gira alrededor de omnicode (el "omni"). */
export function Orbit({ items }: { items: string[] }) {
  let n = 0;
  return (
    <div className="mx-auto w-full max-w-[500px] px-12 sm:px-10 lg:px-6" aria-hidden>
    <div className="relative aspect-square w-full">
      <div className="absolute inset-[30%] rounded-full bg-accent/25 blur-3xl" />

      {rings.map((ring) => (
        <div
          key={ring.inset}
          className="absolute rounded-full border border-dashed border-ink/30"
          style={{ inset: ring.inset }}
        >
          <div
            className={`absolute inset-0 ${ring.rev ? "orbit-rev" : "orbit-spin"}`}
            style={{ ["--dur" as string]: ring.dur }}
          >
            {ring.angles.map((angle) => {
              const label = items[n++];
              if (!label) return null;
              return (
                <div key={angle} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <div style={{ transform: `rotate(${-angle}deg)` }}>
                      <div className={ring.rev ? "orbit-spin" : "orbit-rev"} style={{ ["--dur" as string]: ring.dur }}>
                        <span className="block whitespace-nowrap rounded-full border border-ink bg-surface px-3.5 py-1.5 font-mono text-xs font-medium shadow-[3px_3px_0_0_var(--color-ink)]">
                          {label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Núcleo */}
      <div className="absolute inset-[38%] grid place-items-center">
        <span className="pulse-ring absolute inset-0 rounded-full border-2 border-accent" />
        <div className="relative grid h-full w-full place-items-center rounded-full bg-ink shadow-[0_0_0_6px_var(--color-paper),0_0_0_7px_var(--color-ink)]">
          <LogoMark dark className="h-[58%] w-[58%]" />
        </div>
      </div>
    </div>
    </div>
  );
}
