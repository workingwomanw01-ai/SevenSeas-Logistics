// Metadata for the tracking page
export const metadata = {
  title: "Track Your Shipment - Certified Freight Logistics",
  description: "Real-time shipment tracking with live updates, GPS location, and detailed delivery information. Track your packages and freight shipments 24/7.",
  keywords: "shipment tracking, package tracking, freight tracking, logistics tracking, real-time tracking, GPS tracking, delivery status",
  openGraph: {
    title: "Track Your Shipment - Certified Freight Logistics",
    description: "Real-time shipment tracking with live updates, GPS location, and detailed delivery information.",
    url: "https://certifiedfreightlogistic.com/tracking",
    type: "website",
    images: [
      {
        url: "https://certifiedfreightlogistic.com/images/step-03.jpg",
        width: 1200,
        height: 630,
        alt: "Track your shipment - Certified Freight Logistics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Track Your Shipment - Certified Freight Logistics", 
    description: "Real-time shipment tracking with live updates and GPS location.",
    images: ["https://certifiedfreightlogistic.com/images/step-03.jpg"],
  },
}

export default function TrackingLayout({ children }) {
  return children
}
