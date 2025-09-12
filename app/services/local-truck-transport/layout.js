// Metadata for the local truck transport page
export const metadata = {
  title: "Local Truck Transport - Ground Freight Services",
  description: "Reliable local truck transport services for heavy cargo and bulk shipments. Professional ground transportation with real-time tracking and secure handling.",
  keywords: "local truck transport, ground freight, local delivery, truck transport, cargo transport, local shipping, ground logistics",
  openGraph: {
    title: "Local Truck Transport - Ground Freight Services",
    description: "Reliable local truck transport services for heavy cargo and bulk shipments with professional handling.",    url: "https://certifiedfreightlogistic.com/services/local-truck-transport",
    type: "website",
    images: [
      {
        url: "https://certifiedfreightlogistic.com/images/land-freight.jpg",
        width: 1200,
        height: 630,
        alt: "Local Truck Transport Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Local Truck Transport - Ground Freight Services", 
    description: "Reliable local truck transport for heavy cargo and bulk shipments.",
    images: ["https://certifiedfreightlogistic.com/images/land-freight.jpg"],
  },
}

export default function LocalTruckTransportLayout({ children }) {
  return children
}
