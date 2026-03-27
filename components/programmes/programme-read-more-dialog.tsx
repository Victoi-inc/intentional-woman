"use client";

import { X } from "lucide-react";
import { useEffect, useId } from "react";
import type { ProgrammeDetailNode } from "@/lib/programmes/programme-detail-nodes";
import type { ProgrammeTrackConfig } from "@/lib/programmes/registration-config";

function ProgrammeDetailNodes({ nodes }: { nodes: ProgrammeDetailNode[] }) {
  return (
    <>
      {nodes.map((node, i) => {
        const key = `${node.type}-${i}`;
        switch (node.type) {
          case "h2":
            return (
              <h3
                key={key}
                className="font-display mt-10 border-t border-iw-purple/10 pt-8 text-xl font-semibold tracking-tight text-iw-purple first:mt-0 first:border-t-0 first:pt-0 sm:text-2xl"
              >
                {node.text}
              </h3>
            );
          case "h3":
            return (
              <h4
                key={key}
                className="font-accent mt-6 text-sm font-bold uppercase tracking-[0.14em] text-iw-purple/75"
              >
                {node.text}
              </h4>
            );
          case "p":
            return (
              <p
                key={key}
                className="font-sans mt-4 text-base leading-relaxed text-iw-purple/85 first:mt-0 sm:text-[1.05rem]"
              >
                {node.text}
              </p>
            );
          case "ul":
            return (
              <ul
                key={key}
                className="mt-4 space-y-2.5 font-sans text-base leading-relaxed text-iw-purple/85 sm:text-[1.05rem]"
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
                className="mt-8 rounded-xl border border-iw-purple/10 bg-iw-mist/50 p-5 sm:p-6"
              >
                <h3 className="font-display text-lg font-semibold tracking-tight text-iw-purple sm:text-xl">
                  {node.title}
                </h3>
                <div className="mt-2">
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

type ProgrammeReadMoreDialogProps = {
  track: ProgrammeTrackConfig | null;
  onClose: () => void;
  onRegister: (trackId: ProgrammeTrackConfig["id"]) => void;
};

export function ProgrammeReadMoreDialog({
  track,
  onClose,
  onRegister,
}: ProgrammeReadMoreDialogProps) {
  const titleId = useId();

  useEffect(() => {
    if (!track) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [track, onClose]);

  if (!track) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center p-0 sm:items-center sm:p-5 sm:pb-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-iw-purple/55 backdrop-blur-[2px]"
        aria-label="Close programme details"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(72dvh,600px)] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-iw-purple/15 bg-iw-white shadow-[0_28px_72px_-16px_rgba(75,36,106,0.35)] ring-1 ring-iw-purple/8 sm:max-h-[min(70dvh,560px)] sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b-4 border-iw-gold bg-iw-mist/35 px-5 py-4 sm:px-7">
          <div className="min-w-0 pr-2">
            <h2
              id={titleId}
              className="font-display text-xl font-semibold tracking-tight text-iw-purple sm:text-2xl"
            >
              {track.title}
            </h2>
            <p className="font-sans mt-1 text-sm text-iw-purple/60">
              Full programme outline
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-1.5 text-iw-purple/45 transition-colors hover:bg-iw-purple/8 hover:text-iw-purple"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7 sm:py-8">
          <ProgrammeDetailNodes nodes={track.readMore} />

          <div className="mt-12 border-t border-iw-purple/10 pt-8">
            <div className="rounded-2xl border border-iw-gold/35 bg-linear-to-br from-iw-purple/[0.06] to-iw-mist/80 p-6 sm:p-8">
              <p className="font-display text-lg font-semibold text-iw-purple sm:text-xl">
                Ready to register?
              </p>
              <p className="font-sans mt-2 text-sm leading-relaxed text-iw-purple/75 sm:text-base">
                Choose specific programmes in the next step, then send your
                details—we will follow up with enrolment options.
              </p>
              <button
                type="button"
                onClick={() => {
                  onRegister(track.id);
                  onClose();
                }}
                className="font-accent mt-6 w-full rounded-sm bg-iw-gold py-3.5 text-sm font-bold uppercase tracking-widest text-iw-purple transition-[filter] hover:brightness-105 sm:py-4"
              >
                Register for this track
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
