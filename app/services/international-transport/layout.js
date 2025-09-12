// Metadata for the international transport page
export const metadata = {
  title: "International Transport - Global Freight Solutions",
  description: "Professional international transport services with air, sea, and land freight options. Global shipping solutions with customs clearance and door-to-door delivery.",
  keywords: "international transport, global freight, air freight, sea freight, international shipping, customs clearance, global logistics",
  openGraph: {
    title: "International Transport - Global Freight Solutions",
    description: "Professional international transport services with air, sea, and land freight options worldwide.",    url: "https://certifiedfreightlogistic.com/services/international-transport",
    type: "website",
    images: [
      {
        url: "https://certifiedfreightlogistic.com/images/land1.jpeg",
        width: 1200,
        height: 630,
        alt: "International Transport Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "International Transport - Global Freight Solutions", 
    description: "Professional international transport with global reach.",
    images: ["https://certifiedfreightlogistic.com/images/land1.jpeg"],
  },
}

export default function InternationalTransportLayout({ children }) {
  return children
}
