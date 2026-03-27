import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-blueprint-mono",
  display: "swap",
});

export default function SupportAccessLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`flex flex-1 flex-col ${jetbrainsMono.variable}`}>
      {children}
    </div>
  );
}
