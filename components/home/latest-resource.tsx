"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const COVER =
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=85&w=900";

export function LatestResource() {
  return (
    <section
      id="resources"
      className="scroll-mt-20 bg-iw-mist px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-16"
      aria-labelledby="resource-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.35em] text-iw-gold">
          Latest resource
        </p>
        <h2
          id="resource-heading"
          className="font-display mb-10 text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl"
        >
          Top-selling guide
        </h2>

        <motion.article
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl border border-iw-purple/10 bg-iw-white shadow-lg ring-1 ring-iw-purple/5 sm:flex"
        >
          <div className="relative aspect-[4/3] sm:aspect-auto sm:w-[42%] sm:min-h-[280px]">
            <Image
              src={COVER}
              alt="E-book cover placeholder — stack of elegant books"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 40vw"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center p-8 sm:p-10 lg:p-12">
            <h3 className="font-display mb-3 text-2xl font-semibold text-iw-purple sm:text-3xl">
              The Intentional Economy Playbook
            </h3>
            <p className="font-sans mb-6 leading-relaxed text-iw-purple/80">
              A field guide for moving from scattered ambition to repeatable
              outcomes—templates, reflection prompts, and the exact systems our
              cohorts use to lead without burning out.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-3xl font-semibold text-iw-purple">
                $48
              </p>
              <Link
                href="/#resources"
                className="font-accent inline-flex min-h-11 items-center justify-center rounded-sm bg-iw-purple px-8 text-xs font-bold uppercase tracking-widest text-iw-white transition-opacity hover:opacity-90"
              >
                Get the e-book
              </Link>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
