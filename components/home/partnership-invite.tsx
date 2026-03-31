"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/** Replace `src` (and `alt`) with real partner logo assets when available. */
const PARTNER_LOGO_PLACEHOLDERS = [
  { src: "/images/partners/partner-01.svg", alt: "Partner organization (logo placeholder)" },
  { src: "/images/partners/partner-02.svg", alt: "Partner organization (logo placeholder)" },
  { src: "/images/partners/partner-03.svg", alt: "Partner organization (logo placeholder)" },
  { src: "/images/partners/partner-04.svg", alt: "Partner organization (logo placeholder)" },
  { src: "/images/partners/partner-05.svg", alt: "Partner organization (logo placeholder)" },
  { src: "/images/partners/partner-06.svg", alt: "Partner organization (logo placeholder)" },
] as const;

export function PartnershipInvite() {
  return (
    <section
      id="partner-invite"
      className="scroll-mt-20 bg-iw-purple px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-16"
      aria-labelledby="partner-invite-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="font-accent mb-4 text-xs font-bold uppercase tracking-[0.35em] text-iw-gold">
            Partnership
          </p>
          <h2
            id="partner-invite-heading"
            className="font-display mx-auto mb-6 max-w-3xl text-3xl font-semibold tracking-tight text-iw-white sm:text-4xl"
          >
            Built with institutions that serve women at scale
          </h2>
          <p className="font-sans mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-iw-white/85">
            Banks, NGOs, and enterprises partner with us to fund programmes built on
            systems not slogans so impact is measurable and your stakeholders can
            trust the delivery.
          </p>

          <p className="font-accent mb-6 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-iw-white/55">
            Organizations we&apos;ve partnered with
          </p>
          <ul className="mb-12 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 lg:mb-14 lg:grid-cols-6 lg:gap-x-8">
            {PARTNER_LOGO_PLACEHOLDERS.map((partner, i) => (
              <motion.li
                key={partner.src}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex w-full max-w-[200px] items-center justify-center"
              >
                <div className="relative h-12 w-full opacity-90 transition-opacity hover:opacity-100 sm:h-14">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                  />
                </div>
              </motion.li>
            ))}
          </ul>

          <Link
            href="/programmes#programme-registration"
            className="font-accent inline-flex min-h-12 items-center justify-center rounded-sm border-2 border-iw-gold bg-iw-gold px-10 text-sm font-bold uppercase tracking-widest text-iw-purple transition-[transform,box-shadow] hover:shadow-lg hover:shadow-iw-gold/35"
          >
            Partner with us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
