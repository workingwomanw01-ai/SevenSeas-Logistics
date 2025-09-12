import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Metadata for the blogs page
export const metadata = {
  title: "Logistics Blog - Certified Freight Insights & News",
  description: "Stay updated with the latest logistics trends, shipping insights, and freight industry news. Expert analysis and tips from Certified Freight Logistics.",
  keywords: "logistics blog, freight news, shipping insights, supply chain trends, transport industry, logistics tips, freight analysis",
  openGraph: {
    title: "Logistics Blog - Certified Freight Insights & News",
    description: "Stay updated with the latest logistics trends and freight industry insights from our expert team.",
    url: "https://certifiedfreightlogistic.com/blogs",
    type: "website",
    images: [
      {
        url: "https://certifiedfreightlogistic.com/images/blog.jpg",
        width: 1200,
        height: 630,
        alt: "Certified Freight Logistics Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logistics Blog - Certified Freight Insights & News", 
    description: "Latest logistics trends and freight industry insights.",
    images: ["https://certifiedfreightlogistic.com/images/blog.jpg"],
  },
}

const BlogsPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-burgundy-primary to-burgundy-dark py-20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
            style={{
              backgroundImage: "url('/images/blog.jpg')"
            }}
          />
          <div className="absolute inset-0 bg-burgundy-dark/30"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gold-secondary mb-4">Our Blog</h1>
            <p className="text-xl text-white text-teal-100 max-w-2xl mx-auto">
              Stay updated with the latest logistics trends, shipping insights, and freight industry news from our expert team.
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert insights and industry updates to help you stay ahead in the logistics world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="relative h-48">
                <Image
                  src="/images/blog1.jpg"
                  alt="Supply Chain Innovation"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-burgundy-primary/10 text-burgundy-primary text-sm font-semibold px-3 py-1 rounded-full mb-3">
                  Supply Chain
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-2 mb-3 hover:text-burgundy-primary transition-colors">
                  Supply Chain Innovation in 2024
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Exploring the latest trends and innovations in supply chain management that are reshaping the industry...
                </p>
                <Link 
                  href="/blogs/1" 
                  className="inline-flex items-center text-gold-secondary hover:text-gold-dark font-semibold transition-colors duration-200"
                >
                  Read More 
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="relative h-48">
                <Image
                  src="/images/blog2.jpg"
                  alt="Sustainable Logistics"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-burgundy-primary/10 text-burgundy-primary text-sm font-semibold px-3 py-1 rounded-full mb-3">
                  Sustainability
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-2 mb-3 hover:text-burgundy-primary transition-colors">
                  Green Logistics Solutions
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  How we're reducing our carbon footprint in logistics operations and building sustainable transport networks...
                </p>
                <Link 
                  href="/blogs/2" 
                  className="inline-flex items-center text-gold-secondary hover:text-gold-dark font-semibold transition-colors duration-200"
                >
                  Read More 
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="relative h-48">
                <Image
                  src="/images/blog3.jpg"
                  alt="Technology in Logistics"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-burgundy-primary/20 text-gold-dark text-sm font-semibold px-3 py-1 rounded-full mb-3">
                  Technology
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-2 mb-3 hover:text-burgundy-primary transition-colors">
                  AI in Modern Logistics
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Implementing artificial intelligence for smarter delivery solutions and optimizing freight operations...
                </p>
                <Link 
                  href="/blogs/3" 
                  className="inline-flex items-center text-gold-secondary hover:text-gold-dark font-semibold transition-colors duration-200"
                >
                  Read More 
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-gold-secondary to-gold-dark hover:from-orange-600 hover:to-orange-700 text-gold-secondary py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Load More Posts
            </button>
          </div>
        </div>

        {/* Newsletter Subscription */}
        {/* <div className="bg-gradient-to-r from-burgundy-primary to-burgundy-dark py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gold-secondary mb-4">Stay Updated</h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest insights and updates in logistics and freight management.
            </p>
            <div className="bg-white flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-gold-secondary focus:border-transparent"
              />
              <button className="bg-gold-secondary hover:bg-gold-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default BlogsPage;