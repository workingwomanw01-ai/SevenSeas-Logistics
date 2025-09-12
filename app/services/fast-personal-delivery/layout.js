// Metadata for the fast personal delivery page
export const metadata = {
  title: "Fast Personal Delivery - Express Door-to-Door Service",
  description: "Quick and reliable door-to-door delivery for personal packages and documents. Express delivery services with real-time tracking and secure handling.",
  keywords: "fast delivery, personal delivery, express delivery, door-to-door delivery, quick shipping, personal packages, document delivery",
  openGraph: {
    title: "Fast Personal Delivery - Express Door-to-Door Service",
    description: "Quick and reliable door-to-door delivery for personal packages and documents with express service.",    url: "https://certifiedfreightlogistic.com/services/fast-personal-delivery",
    type: "website",
    images: [
      {
        url: "https://certifiedfreightlogistic.com/images/bike1.jpeg",
        width: 1200,
        height: 630,
        alt: "Fast Personal Delivery Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fast Personal Delivery - Express Door-to-Door Service", 
    description: "Quick and reliable door-to-door delivery for personal packages.",
    images: ["https://certifiedfreightlogistic.com/images/bike1.jpeg"],
  },
}

export default function FastPersonalDeliveryLayout({ children }) {
  return children
}
