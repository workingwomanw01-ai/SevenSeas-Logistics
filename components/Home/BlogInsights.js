"use client"
import { ArrowRight, User, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function BlogNews() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }    return () => observer.disconnect()
  }, [])
    const posts = [
    {
      id: "4",
      title: "What is the Future of Truckload Transportation?",
      excerpt: "Explore emerging technologies and trends reshaping the trucking industry, from autonomous vehicles to sustainable fuel solutions.",
      image: "https://www.logos3pl.com/wp-content/uploads/2022/08/what-is-the-future-of-truckload-transportation-logos-logistics.jpg",
      author: "Admin",
      date: "20 Jan 2024",
      link: "/blogs/4",
    },
    {
      id: "5",
      title: "Cargo Follow Through the Best Supply Your Metals",
      excerpt: "Discover specialized handling techniques and safety protocols for transporting metal cargo across international borders.",
      image: "https://msc-p-001.sitecorecontenthub.cloud/api/public/content/5b49e0cffdd04081ad467f694463fcbd?v=e6d3db1d",
      author: "Admin",
      date: "20 Jan 2024",
      link: "/blogs/5",
    },
    {
      id: "6",
      title: "Fast and Reliable Shipping Guaranteey Trusted",
      excerpt: "Learn how our certified quality standards and real-time tracking systems ensure your shipments arrive on time, every time.",
      image: "/images/ii.jpg",
      author: "Admin",
      date: "20 Jan 2024",
      link: "/blogs/6",
    },
  ]
    return (
    <div ref={sectionRef} className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-95 -rotate-1'}`} style={{transitionDelay: isVisible ? '0.1s' : '0s'}}>
          <p className={`text-gray-500 uppercase tracking-wide mb-2 flex items-center justify-center gap-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{transitionDelay: isVisible ? '0.3s' : '0s'}}>
            <span className={`w-8 h-px bg-gold-secondary transition-all duration-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} style={{transitionDelay: isVisible ? '0.5s' : '0s'}}></span>
            LATEST BLOGS
            <ArrowRight className={`w-4 h-4 text-gold-secondary transition-all duration-500 ${isVisible ? 'rotate-0 scale-100' : 'rotate-45 scale-75'}`} style={{transitionDelay: isVisible ? '0.7s' : '0s'}} />
          </p>
          <h2 className={`text-4xl font-bold text-gray-900 transition-all duration-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: isVisible ? '0.4s' : '0s'}}>
            Latest Blogs & <span className={`text-gold-secondary transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} style={{transitionDelay: isVisible ? '0.8s' : '0s'}}>NEWS</span>
          </h2>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className={`relative h-96 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700 group ${isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-8 rotate-2'}`}
              style={{
                transitionDelay: isVisible ? `${0.6 + index * 0.3}s` : '0s',
                transform: isVisible ? 'translateY(0) rotateZ(0)' : `translateY(30px) rotateZ(${index % 2 === 0 ? '2deg' : '-2deg'})`
              }}
            >
              <Image 
                src={post.image || "/placeholder.svg"} 
                alt={post.title} 
                fill 
                className="object-cover transition-transform duration-300 group-hover:scale-105" 
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Author and date badges */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <span className="bg-gold-secondary text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {post.author}
                </span>
                <span className="bg-gray-900/80 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-3 leading-tight">{post.title}</h3>
                <p className="text-gray-200 mb-6 leading-relaxed">{post.excerpt}</p>                <Link
                  href={post.link}
                  className="bg-gold-secondary text-white px-6 py-2 rounded-lg font-semibold hover:bg-gold-dark transition-colors inline-flex items-center gap-2"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>          ))}
        </div>
      </div>
    </div>
  )
}
