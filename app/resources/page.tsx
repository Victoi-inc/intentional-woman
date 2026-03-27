import type { Metadata } from "next";
import { ResourceVault } from "@/components/resources/resource-vault";

export const metadata: Metadata = {
  title: "Resources: The Economy | Intentional Woman",
  description:
    "Free articles to reason, plus the Resource Vault—guides, workbooks, templates, and highlights to equip your journey.",
};

export default function ResourcesPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col scroll-mt-20 pt-16 sm:pt-20">
      <ResourceVault />
    </main>
  );
}
