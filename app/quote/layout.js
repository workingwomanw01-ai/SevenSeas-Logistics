// Metadata for the quote page
export const metadata = {
  title: "Get Instant Shipping Quote - Certified Freight Logistics",
  description: "Get instant quotes for freight and logistics services. Fast, reliable, and competitive pricing for international transport, local delivery, and express shipping.",
  keywords: "shipping quote, freight quote, logistics pricing, transport cost, delivery estimate, international shipping, local delivery, express transport",
  openGraph: {
    title: "Get Instant Shipping Quote - Certified Freight Logistics",
    description: "Get instant quotes for freight and logistics services. Fast, reliable, and competitive pricing for all transport needs.",
    url: "https://certifiedfreightlogistic.com/quote",
    type: "website",
    images: [
      {
        url: "https://certifiedfreightlogistic.com/images/step-02.jpg",
        width: 1200,
        height: 630,
        alt: "Get shipping quotes - Certified Freight Logistics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Instant Shipping Quote - Certified Freight Logistics", 
    description: "Get instant quotes for freight and logistics services. Fast, reliable, and competitive pricing.",
    images: ["https://certifiedfreightlogistic.com/images/step-02.jpg"],
  },
}

export default function QuoteLayout({ children }) {
  return children
}
