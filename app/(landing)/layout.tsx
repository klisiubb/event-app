import type { Metadata } from "next";

import Navbar from "@/components/landing-page/sections/navbar";

import Footer from "@/components/landing-page/sections/footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL as string),
  title: "Event App",
  description:
    "Event App - sign up for your local event. Create and manage your workshops and lectures!",
  keywords: [
    "Mateusz Kliś",
    "klisiubb",
    "Event",
    "Event App",
    "Lectures",
    "Workshops",
  ],
  openGraph: {
    title: "Event App",
    description:
      "Event App - sign up for your local event. Create and manage your workshops and lectures!",
    type: "website",
    locale: "en-GB",
    images: [
      {
        url: `/opengraph-image.png`,
      },
    ],
    url: process.env.NEXT_PUBLIC_WEBSITE_URL,
    siteName: "Event App",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main> {children}</main>
      <Footer />
    </div>
  );
}
