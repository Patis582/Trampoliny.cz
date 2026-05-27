import type { Metadata } from "next";
import { Montserrat, Work_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-montserrat",
});

const workSans = Work_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Trampolíny Liberec & Patrman",
  description:
    "Profesionální trampolíny, sportovní oddíl a zázemí pro všechny, kteří milují pohyb. Připoj se k nám v Liberci.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${montserrat.variable} ${workSans.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
