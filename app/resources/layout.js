// Metadata for the resources page
export const metadata = {
  title: "Resources - Certified Freight Logistics Hub",
  description: "Access logistics resources, industry guides, educational content, and expert insights. Your comprehensive resource hub for freight and shipping knowledge.",
  keywords: "logistics resources, freight guides, shipping resources, transport education, logistics training, industry resources, supply chain guides",
  openGraph: {
    title: "Resources - Certified Freight Logistics Hub",
    description: "Your comprehensive resource hub for logistics knowledge, guides, and industry insights.",    url: "https://certifiedfreightlogistic.com/resources",
    type: "website",
    images: [
      {
        url: "https://certifiedfreightlogistic.com/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Certified Freight Logistics Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources - Certified Freight Logistics Hub", 
    description: "Comprehensive logistics resources and industry guides.",
    images: ["https://certifiedfreightlogistic.com/images/hero.jpg"],
  },
}

export default function ResourcesLayout({ children }) {
  return children
}
