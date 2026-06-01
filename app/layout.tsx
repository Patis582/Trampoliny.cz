import type { Metadata } from "next";
import { Montserrat, Work_Sans } from "next/font/google";
import { AnnouncementBar } from "@/components/announcements/AnnouncementBar";
import { getAnnouncements } from "@/sanity/lib/queries";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

const workSans = Work_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trampoliny.cz"),
  title: {
    default: "Trampolíny.cz",
    template: "%s | Trampolíny.cz",
  },
  description:
    "Dva trampolínové oddíly v Liberci pod jednou střechou. Trampolíny Liberec — závodní sport a příprava reprezentantů. Trampolíny Patrman — skákání a aktivity pro celou rodinu.",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Trampolíny.cz",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const announcements = await getAnnouncements();

  return (
    <html
      lang="cs"
      className={`${montserrat.variable} ${workSans.variable} antialiased`}
    >
      <body>
        <div className="fixed top-0 left-0 w-full z-50">
          <AnnouncementBar announcements={announcements} />
        </div>
        {children}
      </body>
    </html>
  );
}
