"use client";

import Link from "next/link";

export function SupportAccess() {
  return (
    <section
      id="support"
      className="scroll-mt-20 border-t border-iw-purple/10 bg-iw-white px-5 py-14 sm:px-8 md:px-12 lg:px-16"
      aria-labelledby="support-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h2
            id="support-heading"
            className="font-accent mb-2 text-xs font-bold uppercase tracking-[0.35em] text-iw-gold"
          >
            Support access
          </h2>
          <p className="font-display max-w-xl text-2xl font-semibold text-iw-purple sm:text-3xl">
            Need help with enrolment, billing, or programme access?
          </p>
        </div>
        <Link
          href="/contact"
          className="font-accent shrink-0 rounded-sm border-2 border-iw-purple px-6 py-3 text-xs font-bold uppercase tracking-widest text-iw-purple transition-colors hover:bg-iw-purple hover:text-iw-white"
        >
          Contact support
        </Link>
      </div>
    </section>
  );
}
