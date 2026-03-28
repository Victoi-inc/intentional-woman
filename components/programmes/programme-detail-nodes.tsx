import type { ProgrammeDetailNode } from "@/lib/programmes/programme-detail-nodes";

/**
 * Renders nested programme outline (used on full detail pages; heading levels assume an h1 exists above).
 */
export function ProgrammeDetailNodes({ nodes }: { nodes: ProgrammeDetailNode[] }) {
  return (
    <>
      {nodes.map((node, i) => {
        const key = `${node.type}-${i}`;
        switch (node.type) {
          case "h2":
            return (
              <h2
                key={key}
                className="font-display mt-12 border-t border-iw-purple/10 pt-10 text-2xl font-semibold tracking-tight text-iw-purple first:mt-0 first:border-t-0 first:pt-0 sm:text-3xl"
              >
                {node.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={key}
                className="font-accent mt-8 text-sm font-bold uppercase tracking-[0.14em] text-iw-purple/75"
              >
                {node.text}
              </h3>
            );
          case "p":
            return (
              <p
                key={key}
                className="font-sans mt-5 text-base leading-relaxed text-iw-purple/85 first:mt-0 sm:text-lg"
              >
                {node.text}
              </p>
            );
          case "ul":
            return (
              <ul
                key={key}
                className="mt-5 space-y-2.5 font-sans text-base leading-relaxed text-iw-purple/85 sm:text-lg"
              >
                {node.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-iw-gold"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "section":
            return (
              <section
                key={key}
                className="mt-10 rounded-xl border border-iw-purple/10 bg-iw-mist/50 p-6 sm:p-8"
              >
                <h3 className="font-display text-xl font-semibold tracking-tight text-iw-purple sm:text-2xl">
                  {node.title}
                </h3>
                <div className="mt-3">
                  <ProgrammeDetailNodes nodes={node.children} />
                </div>
              </section>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
