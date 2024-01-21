import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
