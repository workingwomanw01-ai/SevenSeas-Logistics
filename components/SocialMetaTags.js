import Head from 'next/head'

export default function SocialMetaTags({ 
  title = "Certified Freight Logistics - Professional Shipping & Transport Solutions",
  description = "Leading logistics company providing air freight, sea freight, land transport, and supply chain management. 96+ years of experience with global reach and reliable service.",
  image = "https://certifiedfreightlogistic.com/images/hero.jpg",
  url = "https://certifiedfreightlogistic.com/"
}) {
  return (
    <Head>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:site_name" content="Certified Freight Logistics" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:image:alt" content="Certified Freight Logistics - Professional Transport Solutions" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Head>
  )
}
