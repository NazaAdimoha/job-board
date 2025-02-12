import type { Metadata } from "next";
import { EB_Garamond, Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/provider";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Job Board App",
  description: "Job Board App by Naza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
        <body className="min-h-[calc(100vh-1px)] flex flex-col font-sans bg-brand-50 text-brand-950 antialiased">
          <main className="relative flex-1 flex flex-col">
            <QueryProvider>{children}</QueryProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}