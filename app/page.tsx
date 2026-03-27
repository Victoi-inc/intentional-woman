import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "Intentional Woman — Build the Life You Were Meant to Lead",
  description:
    "A radically intentional path from identity to economy—systems, mentorship, and architecture for the life you were meant to lead.",
};

export default function Home() {
  return <HomePage />;
}
