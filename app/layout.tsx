import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme";
import { Toaster } from "sonner";
import { ViewTransitions } from "next-view-transitions";
import Script from "next/script";
import { AuthProvider } from "@/components/providers/auth";

const inter = Inter({ subsets: ["latin"] });

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
    <AuthProvider>
      <ViewTransitions>
        <html lang="en" suppressHydrationWarning>
          <Script
            async
            src="https://umami.klisiu.me/script.js"
            data-website-id="64d2e6f4-90a8-424f-882e-6a05eb93024c"
          />
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster richColors />
            </ThemeProvider>
          </body>
        </html>
      </ViewTransitions>
    </AuthProvider>
  );
}
