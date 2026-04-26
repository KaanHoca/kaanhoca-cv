import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "cv.kaanhoca — Ücretsiz CV Oluşturma",
    template: "%s · cv.kaanhoca",
  },
  description:
    "Bilgilerinizi tek seferde girin, dilediğiniz tasarımda PDF olarak indirin. Ücretsiz, hızlı ve veriniz tarayıcınızda kalır.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <SiteHeader />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
