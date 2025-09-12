"use client";

import { useState } from "react";
import { 
  Calendar,
  ArrowRight,
  ExternalLink,
  Play,
  BookOpen,
  Newspaper,
  GraduationCap,
  Video
} from "lucide-react";

const resourceCategories = [
  {
    id: "news",
    title: "News",
    icon: Newspaper,
    description: "Latest industry updates and company announcements"
  },
  {
    id: "blog",
    title: "Blog",
    icon: BookOpen,
    description: "Expert insights and logistics best practices"
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    description: "Educational materials and training resources"
  },
  {
    id: "videos",
    title: "Videos",
    icon: Video,
    description: "Video content and webinars"
  }
];

const newsArticles = [
  {
    id: 1,
    title: "Global Logistics Services Announces New Partnership with Tech Leader",
    date: "June 12, 2025",
    category: "news",
    image: "/images/Elite.png",
    excerpt: "Strategic partnership aims to revolutionize supply chain technology and enhance customer experience through innovative solutions."
  },
  {
    id: 2,
    title: "Company Recognized as Top 3PL & Cold Storage Provider",
    date: "June 8, 2025",
    category: "news",
    image: "/images/hero.jpg",
    excerpt: "Industry recognition highlights our commitment to excellence in temperature-controlled logistics and customer service."
  },
  {
    id: 3,
    title: "New Sustainable Logistics Initiative Launched",
    date: "June 5, 2025",
    category: "news",
    image: "/images/hero1.jpg",
    excerpt: "Comprehensive environmental program focused on reducing carbon footprint while maintaining operational efficiency."
  },
  {
    id: 4,
    title: "Expansion into Southeast Asian Markets",
    date: "June 1, 2025",
    category: "news",
    image: "/images/land-freight.jpg",
    excerpt: "Strategic expansion strengthens our global network and provides enhanced service coverage for international clients."
  }
];

const blogPosts = [
  {
    id: 1,
    title: "Navigating Freight Challenges in Global Logistics",
    date: "June 10, 2025",
    category: "blog",
    readTime: "5 min read",
    excerpt: "Explore key strategies for overcoming common freight challenges and optimizing your supply chain operations."
  },
  {
    id: 2,
    title: "How Smart Shippers Set Carriers Up for Success — and Why It Pays Off",
    date: "June 7, 2025",
    category: "blog",
    readTime: "6 min read",
    excerpt: "Learn how building strong carrier relationships through strategic planning benefits your entire logistics operation."
  },
  {
    id: 3,
    title: "What Logistics Leaders Wish the CEO Knew",
    date: "June 4, 2025",
    category: "blog",
    readTime: "7 min read",
    excerpt: "Insights from industry leaders on bridging the gap between logistics operations and executive decision-making."
  },
  {
    id: 4,
    title: "The Future of Cold Chain Logistics",
    date: "May 28, 2025",
    category: "blog",
    readTime: "8 min read",
    excerpt: "Emerging technologies and best practices for temperature-sensitive supply chain management."
  }
];

const educationResources = [
  {
    id: 1,
    title: "Supply Chain Management Fundamentals",
    category: "education",
    type: "Course",
    duration: "2 hours",
    description: "Comprehensive introduction to supply chain principles and best practices."
  },
  {
    id: 2,
    title: "Freight Rate Negotiation Guide",
    category: "education",
    type: "Guide",
    duration: "45 min read",
    description: "Strategic approaches to negotiating better freight rates with carriers."
  },
  {
    id: 3,
    title: "Warehouse Optimization Toolkit",
    category: "education",
    type: "Toolkit",
    duration: "Interactive",
    description: "Tools and templates for improving warehouse efficiency and operations."
  }
];

const videoResources = [
  {
    id: 1,
    title: "Understanding Modern Logistics Technology",
    category: "videos",
    duration: "15:30",
    type: "Webinar",
    thumbnail: "/images/hero.jpg",
    description: "Overview of technology solutions transforming the logistics industry."
  },
  {
    id: 2,
    title: "Customer Success Story: E-commerce Fulfillment",
    category: "videos",
    duration: "8:45",
    type: "Case Study",
    thumbnail: "/images/hero1.jpg",
    description: "How we helped an e-commerce company scale their fulfillment operations."
  },
  {
    id: 3,
    title: "Best Practices for International Shipping",
    category: "videos",
    duration: "12:20",
    type: "Tutorial",
    thumbnail: "/images/land-freight.jpg",
    description: "Essential tips for managing international logistics and customs."
  }
];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("news");
  const renderCategoryContent = () => {
    switch (activeCategory) {
      case "news":
        return (
          <div className="space-y-8">
            {newsArticles.map((article) => (
              <div key={article.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/3">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 lg:h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="lg:w-2/3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                      Read more <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "blog":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Logistics Blogs</h2>
            {blogPosts.map((post) => (
              <div key={post.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                  Read more <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        );

      case "education":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationResources.map((resource) => (
              <div key={resource.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">{resource.type}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{resource.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Access Resource
                </button>
              </div>
            ))}
          </div>
        );

      case "videos":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoResources.map((video) => (
              <div key={video.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">{video.type}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gold-secondary to-gold-dark py-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: "url('/images/hero.jpg')"
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gold-dark/30" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Resources
            </h1>
            <p className="text-xl text-orange-100">
              Stay updated with the ever-changing transportation industry
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Category Navigation */}
            <div className="flex flex-wrap gap-4 mb-12 justify-center">
              {resourceCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      activeCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {category.title}
                  </button>
                );
              })}
            </div>

            {/* Category Description */}
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600">
                {resourceCategories.find(cat => cat.id === activeCategory)?.description}
              </p>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto">
              {renderCategoryContent()}
            </div>

            {/* View More Button */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                View More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
