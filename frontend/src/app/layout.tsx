import "./globals.css";

import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Space Token Hunt",
  description: "Game for Aave education",
  openGraph: {
    images:
      "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmYkMf37Dgis8NecSzWEqMec4U4hTRQ7KtSLvNpmnoj1PL",
    title: "Space Token Hunt",
    description: "Game for Aave education",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${orbitron.variable}`}>{children}</body>
    </html>
  );
}
