import type { Metadata } from "next";
import { ContactDirectLine } from "@/components/contact/contact-direct-line";

export const metadata: Metadata = {
  title: "Contact — The Direct Line | Intentional Woman",
  description:
    "Connect with Intentional Woman: send an enquiry, copy our email, and reach us during working hours (WAT).",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col scroll-mt-20">
      <ContactDirectLine />
    </main>
  );
}
