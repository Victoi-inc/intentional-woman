"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&auto=format&fit=crop",
    alt: "Professional woman in business attire, confident portrait",
    width: 900,
    height: 1100,
  },
  {
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=80&auto=format&fit=crop",
    alt: "Women collaborating in a bright, modern workspace",
    width: 900,
    height: 675,
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80&auto=format&fit=crop",
    alt: "Portrait with refined styling and natural light",
    width: 900,
    height: 1200,
  },
] as const;

export function NarrativeReveal() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const introY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [28, 0],
  );

  const introOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.65, 1, 1]);

  return (
    <section
      ref={ref}
      className="relative bg-iw-mist px-5 py-20 sm:px-8 sm:py-24 md:px-12 md:py-28 lg:px-16 lg:py-32"
      aria-labelledby="narrative-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          style={{ y: introY, opacity: introOpacity }}
          className="will-change-transform"
        >
          <p
            id="narrative-heading"
            className="font-accent mb-6 text-xs font-bold uppercase tracking-[0.35em] text-iw-purple/70 sm:text-sm"
          >
            The shift
          </p>
          <p className="font-sans text-iw-purple max-w-3xl text-xl leading-relaxed font-light sm:text-2xl sm:leading-relaxed md:text-3xl md:leading-[1.55] lg:text-[1.875rem] lg:leading-[1.6] xl:text-[2rem]">
            The old story tied your worth to performance alone. The next chapter
            asks something truer: to move from{" "}
            <span className="font-display font-medium not-italic text-iw-purple">
              identity
            </span>{" "}
            as performance into an{" "}
            <span className="font-display font-medium not-italic text-iw-purple">
              economy
            </span>{" "}
            of clarity—where systems carry the load, decisions compound, and who
            you are no longer negotiates with what you build. This is not
            motivation. It is architecture for a life that finally matches your
            intention.
          </p>
        </motion.div>

        <motion.ul
          className="mt-16 grid gap-6 sm:mt-20 sm:grid-cols-2 sm:gap-8 lg:mt-24 lg:grid-cols-3"
          initial={false}
        >
          {IMAGES.map((img, i) => (
            <motion.li
              key={img.src}
              className={
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }
              style={{
                willChange: reduceMotion ? undefined : "transform, opacity",
              }}
              initial={
                reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 36 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{
                duration: 0.75,
                delay: reduceMotion ? 0 : i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <figure className="group relative overflow-hidden rounded-2xl bg-iw-purple/10 shadow-lg ring-1 ring-iw-purple/10">
                <div
                  className={
                    i === 0
                      ? "relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/4]"
                      : "relative aspect-[4/3]"
                  }
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes={
                      i === 0
                        ? "(max-width: 1024px) 100vw, 33vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                  />
                </div>
              </figure>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
