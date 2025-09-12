// Metadata for the contact page
export const metadata = {
  title: "Contact Us - Certified Freight Logistics",
  description: "Get in touch with Certified Freight Logistics. 24/7 customer support, expert logistics consultation, and instant responses for all your shipping needs.",
  keywords: "contact logistics, freight support, shipping help, logistics consultation, customer service, transport inquiries",
  openGraph: {
    title: "Contact Us - Certified Freight Logistics",
    description: "Get in touch with Certified Freight Logistics. 24/7 customer support and expert consultation for all your shipping needs.",    url: "https://certifiedfreightlogistic.com/contact",
    type: "website",
    images: [
      {
        url: "https://certifiedfreightlogistic.com/images/step-04.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Certified Freight Logistics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Certified Freight Logistics", 
    description: "24/7 customer support and expert logistics consultation.",
    images: ["https://certifiedfreightlogistic.com/images/step-04.jpg"],
  },
}

export default function ContactLayout({ children }) {
  return children
}
