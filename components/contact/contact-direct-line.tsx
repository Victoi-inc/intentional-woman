"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useId,
  useState,
  type FormEvent,
} from "react";
import { IconFacebook, IconInstagram } from "@/components/contact/contact-social-icons";

const CONTACT_EMAIL = "support@intentionalwoman.org";

const GENERAL_INQUIRIES_LABEL = "General inquiries";

const GENERAL_INQUIRY_PHONES = [
  { display: "+237 697 506 008", tel: "+237697506008" },
  { display: "+237 679 263 388", tel: "+237679263388" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/18MJ5bnXQq/?mibextid=wwXIfr",
    Icon: IconFacebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/iwoman.life?igsh=bm9lNjMxbWx2bjN4&utm_source=qr",
    Icon: IconInstagram,
  },
] as const;

const fieldClass =
  "w-full rounded-md border-2 border-iw-purple bg-iw-white px-4 py-3 font-sans text-iw-purple placeholder:text-iw-purple/40 transition-[border-color,box-shadow] duration-200 focus:border-iw-gold focus:outline-none focus:ring-2 focus:ring-iw-gold/35";

const labelClass =
  "font-accent mb-1.5 block text-[10px] font-bold uppercase tracking-[0.28em] text-iw-purple/70";

const sidebarLabelClass =
  "font-accent mb-1.5 block text-[10px] font-bold uppercase tracking-[0.28em] text-iw-white/50";

export function ContactDirectLine() {
  const formId = useId();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFormSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || success) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1400);
  }, [loading, success]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <div className="relative isolate min-h-0 flex-1 overflow-hidden bg-iw-mist">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <Image
          src="/images/iwoman-logo.jpeg"
          alt=""
          width={720}
          height={720}
          className="max-h-[min(85vh,52rem)] w-auto object-contain opacity-[0.02]"
          priority={false}
        />
      </div>

      <div className="relative z-[1] mx-auto max-w-6xl px-4 pb-14 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8 lg:pb-20 lg:pt-32">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center sm:mb-12"
        >
          <p className="font-accent mb-3 text-[10px] font-bold uppercase tracking-[0.38em] text-iw-purple/45">
            Contact — The direct line
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl lg:text-[2.65rem]">
            Connect with Intentionality
          </h1>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl border border-iw-purple/10 bg-iw-white shadow-[0_24px_80px_-32px_rgb(75_36_106/0.35)] lg:grid lg:min-h-[28rem] lg:grid-cols-[1fr_minmax(0,1.05fr)]"
        >
          {/* Column A — form */}
          <div className="border-b border-iw-purple/10 bg-iw-white p-6 sm:p-8 lg:border-b-0 lg:border-r lg:border-iw-purple/10">
            <h2 className="font-accent mb-6 text-xs font-bold uppercase tracking-[0.3em] text-iw-purple/55">
              The inquiry engine
            </h2>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  role="status"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-iw-gold/50 bg-iw-mist/50 px-6 py-12 text-center"
                >
                  <motion.span
                    initial={{ scale: 0.85 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 22 }}
                    className="flex size-14 items-center justify-center rounded-full bg-iw-gold text-iw-purple"
                    aria-hidden
                  >
                    <Check className="size-7 stroke-[2.5]" />
                  </motion.span>
                  <p className="font-display text-xl font-semibold text-iw-purple">
                    Success
                  </p>
                  <p className="font-sans max-w-sm text-sm leading-relaxed text-iw-purple/75">
                    Thank you — your message is on its way. We read every enquiry
                    and will respond as soon as we can.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  id={formId}
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor={`${formId}-name`} className={labelClass}>
                      Name
                    </label>
                    <input
                      id={`${formId}-name`}
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className={fieldClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${formId}-email`} className={labelClass}>
                      Email
                    </label>
                    <input
                      id={`${formId}-email`}
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={fieldClass}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${formId}-org`}
                      className={labelClass}
                    >
                      Organization{" "}
                      <span className="font-normal normal-case tracking-normal text-iw-purple/45">
                        (optional)
                      </span>
                    </label>
                    <input
                      id={`${formId}-org`}
                      name="organization"
                      type="text"
                      autoComplete="organization"
                      className={fieldClass}
                      placeholder="Company or initiative"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${formId}-subject`}
                      className={labelClass}
                    >
                      Subject
                    </label>
                    <input
                      id={`${formId}-subject`}
                      name="subject"
                      type="text"
                      required
                      className={fieldClass}
                      placeholder="What is this about?"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${formId}-message`}
                      className={labelClass}
                    >
                      Message
                    </label>
                    <textarea
                      id={`${formId}-message`}
                      name="message"
                      required
                      rows={5}
                      className={`${fieldClass} resize-y min-h-[8rem]`}
                      placeholder="Share your question or idea…"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-md bg-iw-gold px-6 py-3.5 font-accent text-sm font-bold uppercase tracking-[0.22em] text-iw-purple shadow-sm transition-[filter,transform] duration-200 hover:brightness-[1.03] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70 sm:w-auto sm:min-w-[11rem]"
                    >
                      <span
                        className="relative z-10 inline-flex items-center gap-2 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                        aria-live="polite"
                      >
                        {loading ? "Sending…" : "Send"}
                        {!loading ? (
                          <span
                            className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                            aria-hidden
                          >
                            →
                          </span>
                        ) : null}
                      </span>
                      <span
                        className="absolute inset-y-0 left-0 w-full -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-full"
                        aria-hidden
                      />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Column B — direct access */}
          <div className="flex flex-col justify-center bg-[#3d1f56] p-6 sm:p-8 lg:p-10">
            <h2 className="font-accent mb-8 text-xs font-bold uppercase tracking-[0.3em] text-iw-gold/90">
              Direct access
            </h2>

            <div className="space-y-8">
              <div>
                <p className={sidebarLabelClass}>Email</p>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-sans text-lg font-medium text-iw-white no-underline decoration-transparent transition-colors hover:text-iw-gold"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex size-9 items-center justify-center rounded-md border border-iw-gold/35 text-iw-gold transition-[border-color,background-color,transform] hover:scale-105 hover:border-iw-gold hover:bg-iw-gold/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-iw-gold"
                    aria-label={copied ? "Copied" : "Copy email to clipboard"}
                  >
                    {copied ? (
                      <Check className="size-4" strokeWidth={2.25} />
                    ) : (
                      <Copy className="size-4" strokeWidth={2} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <p className={sidebarLabelClass}>Phone</p>
                <p className="font-accent mb-2 text-[10px] font-semibold uppercase tracking-widest text-iw-gold/70">
                  {GENERAL_INQUIRIES_LABEL}
                </p>
                <ul className="flex flex-col gap-2">
                  {GENERAL_INQUIRY_PHONES.map(({ display, tel }) => (
                    <li key={tel}>
                      <a
                        href={`tel:${tel}`}
                        className="font-mono text-base text-iw-white no-underline transition-colors hover:text-iw-gold"
                      >
                        {display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={sidebarLabelClass}>Working hours</p>
                <p className="font-sans text-base text-iw-white/92">
                  Monday – Friday: 09:00 – 17:00 (WAT)
                </p>
              </div>

              <div>
                <p className={sidebarLabelClass}>Social</p>
                <div className="flex flex-wrap gap-3 pt-1">
                  {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex size-11 items-center justify-center rounded-lg border border-iw-white/20 text-iw-white transition-[transform,border-color,color,background-color] duration-200 hover:scale-110 hover:border-iw-gold/60 hover:bg-iw-gold/10 hover:text-iw-gold"
                    >
                      <Icon className="size-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
