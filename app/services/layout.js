// Metadata for the services page
export const metadata = {
  title: "Logistics Services - Certified Freight Solutions",
  description: "Comprehensive logistics and freight services including air freight, sea freight, land transport, warehousing, and supply chain management solutions.",
  keywords: "logistics services, freight services, air freight, sea freight, land transport, warehousing, supply chain, cargo services",
  openGraph: {
    title: "Logistics Services - Certified Freight Solutions",
    description: "Comprehensive logistics and freight services for all your shipping and transport needs.",    url: "https://certifiedfreightlogistic.com/services",
    type: "website",
    images: [
      {
        url: "https://certifiedfreightlogistic.com/images/land-freight.jpg",
        width: 1200,
        height: 630,
        alt: "Certified Freight Logistics Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logistics Services - Certified Freight Solutions", 
    description: "Comprehensive logistics and freight services for all your shipping needs.",
    images: ["https://certifiedfreightlogistic.com/images/land-freight.jpg"],
  },
}

export default function ServicesLayout({ children }) {
  return children
}
