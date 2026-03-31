"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutIntentionalWoman() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-iw-mist px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-16"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 1, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
        >
          <div className="relative aspect-[3/4] min-h-[280px] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-iw-purple/10 sm:aspect-[4/5] sm:min-h-0">
            <Image
              src="/images/founder.jpg"
              alt="Mme Bambot Antoinette Epse Munkep, founder of Intentional Woman"
              fill
              className="object-cover object-[center_20%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="mt-5 text-center lg:text-left">
            <p className="font-accent text-xs font-bold uppercase tracking-[0.35em] text-iw-gold">
              Founder
            </p>
            <p className="font-display mt-2 text-lg font-semibold leading-snug tracking-tight text-iw-purple sm:text-xl">
              Mme Bambot Antoinette Epse Munkep
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {/*  */}
          <h2
            id="about-heading"
            className="font-display mb-6 text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl"
          >
                     About Intentional Woman
          </h2>
          <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.35em] text-iw-gold">
            From potential to measurable outcomes
          </p>
          <div className="font-sans space-y-5 text-lg leading-relaxed text-iw-purple/85 sm:text-xl">
            <p>
              <strong className="font-semibold text-iw-purple">
                INTENTIONAL WOMAN (IWOMAN)
              </strong>{" "}
              is a women’s growth and economic enablement agency designed to
              move women from potential to measurable outcomes.
            </p>
            <p>
              We exist at a critical intersection where personal development meets
              economic participation, where identity meets income, and where
              capacity is translated into leadership.
            </p>
            <p>
              Across Africa and beyond, women are not lacking ambition,
              intelligence, or drive. What is often missing are structured
              systems; systems that consistently guide, support, and convert that
              potential into tangible economic and leadership outcomes. This is the
              gap IWOMAN was built to solve.
            </p>
            <p>
              We do not approach women’s empowerment as a moment. We designed
              it as a system.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
