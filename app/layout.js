import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShipmentProvider } from "@/contexts/ShipmentContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SevenSeas Logistics - Professional Shipping & Transport Solutions",
  description: "SevenSeas Logistics: Leading logistics company providing air freight, sea freight, land transport, and supply chain management. 96+ years of experience with global reach and reliable service.",
  keywords: "logistics, freight, shipping, transport, air freight, sea freight, land transport, supply chain, global shipping, cargo transport",
  openGraph: {
    title: "SevenSeas Logistics - Professional Shipping & Transport Solutions",
    description: "SevenSeas Logistics: 96+ years of experience providing reliable freight and transport solutions globally.",
    url: "https://certifiedfreightlogistic.com/", // Update if you have a new domain
    siteName: "SevenSeas Logistics",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://certifiedfreightlogistic.com/images/Elite-optimized.png",
        width: 1200,
        height: 630,
        alt: "SevenSeas Logistics - Professional Transport Solutions",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sevenseaslogistics", // Update if you have a new handle
    title: "SevenSeas Logistics - Professional Shipping & Transport Solutions", 
    description: "SevenSeas Logistics: 96+ years of reliable freight experience.",
    images: ["https://certifiedfreightlogistic.com/images/Elite-optimized.png"],
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ShipmentProvider>
          <Navbar />
          <main className="pt-20 lg:pt-24">
            {children}
          </main>
          <Footer />
        </ShipmentProvider>
      </body>
    </html>
  );
}
