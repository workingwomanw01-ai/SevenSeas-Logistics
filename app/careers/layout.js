// Metadata for the careers page
export const metadata = {
  title: "Careers - Join Certified Freight Logistics Team",
  description: "Join Certified Freight Logistics team. Explore career opportunities in logistics, freight, and transportation. Competitive benefits and global opportunities.",
  keywords: "logistics jobs, freight careers, transportation jobs, logistics careers, shipping jobs, cargo careers, supply chain jobs",
  openGraph: {
    title: "Careers - Join Certified Freight Logistics Team",
    description: "Explore career opportunities in logistics and freight transportation. Join our global team with competitive benefits.",    url: "https://certifiedfreightlogistic.com/careers",
    type: "website",
    images: [
      {
        url: "https://certifiedfreightlogistic.com/images/chen.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at Certified Freight Logistics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers - Join Certified Freight Logistics Team", 
    description: "Explore career opportunities in logistics and freight transportation.",
    images: ["https://certifiedfreightlogistic.com/images/chen.jpg"],
  },
}

export default function CareersLayout({ children }) {
  return children
}
