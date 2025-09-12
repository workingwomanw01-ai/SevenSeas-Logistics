// Metadata for the about page
export const metadata = {
  title: "About Us - Certified Freight Logistics",
  description: "Learn about Certified Freight Logistics - 96+ years of experience in global shipping, logistics, and freight transportation. Trusted by businesses worldwide.",
  keywords: "about logistics company, freight company history, logistics experience, global shipping, transport company, logistics expertise",
  openGraph: {
    title: "About Us - Certified Freight Logistics",
    description: "96+ years of experience in global shipping and logistics. Trusted by businesses worldwide for reliable freight solutions.",    url: "https://certifiedfreightlogistic.com/about",
    type: "website",
    images: [
      {
        url: "https://certifiedfreightlogistic.com/images/ceo.jpg",
        width: 1200,
        height: 630,
        alt: "About Certified Freight Logistics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Certified Freight Logistics", 
    description: "96+ years of experience in global shipping and logistics solutions.",
    images: ["https://certifiedfreightlogistic.com/images/ceo.jpg"],
  },
}

export default function AboutLayout({ children }) {
  return children
}
