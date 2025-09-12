"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Zap, Warehouse, Headphones, Shield, ArrowUp } from "lucide-react"

const features = [
  {
    id: 1,
    icon: <Warehouse className="w-8 h-8" />,
    title: "Warehouse",
    description: "Warehouse: hub for storage, distribution, and logistics.",
  },
  {
    id: 2,
    icon: <Headphones className="w-8 h-8" />,
    title: "Support 24/7",
    description: "Round-the-clock customer support for all your logistics needs and inquiries.",
  },
  {
    id: 3,
    icon: <Shield className="w-8 h-8" />,
    title: "Cargo Insurance",
    description: "Comprehensive insurance coverage for your valuable cargo during transit.",
  },
]

export default function LogisticsFeatures() {
  const [showScrollTop, setShowScrollTop] = useState(false)
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
    }

    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-slate-800 via-teal-800 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Geometric Lines */}
          <path
            d="M0 200 L400 100 L800 300 L1200 150"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M0 400 L300 250 L600 450 L900 300 L1200 400"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.2"
          />
          <path
            d="M200 0 L500 200 L800 50 L1100 250 L1200 100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />

          {/* Abstract Shapes */}
          <circle cx="1000" cy="150" r="80" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
          <rect
            x="1050"
            y="200"
            width="60"
            height="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.2"
          />
          <polygon
            points="900,400 950,350 1000,400 950,450"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.2"
          />
        </svg>
      </div>      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16">
          <div className="lg:max-w-2xl mb-8 lg:mb-0">
            {/* Tagline */}
            <div className={`flex items-center space-x-2 text-orange-400 mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-8 scale-90'}`} style={{transitionDelay: isVisible ? '0.1s' : '0s'}}>
              <Zap className={`w-5 h-5 transition-all duration-500 ${isVisible ? 'rotate-0' : 'rotate-180'}`} style={{transitionDelay: isVisible ? '0.2s' : '0s'}} />
              <span className={`text-sm font-semibold tracking-wider uppercase transition-all duration-600 ${isVisible ? 'opacity-100 tracking-wider' : 'opacity-0 tracking-normal'}`} style={{transitionDelay: isVisible ? '0.3s' : '0s'}}>Trusted Transport Service</span>
            </div>

            {/* Main Heading */}
            <h1 className={`text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`} style={{transitionDelay: isVisible ? '0.4s' : '0s'}}>
              Logistics Features That
              <br />
              We Can Providing
            </h1>
          </div>

          {/* All Services Button */}
          <div className="flex-shrink-0">
            <button className={`bg-gold-secondary hover:bg-gold-dark text-white font-bold py-4 px-8 rounded-lg transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl ${isVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-8 rotate-3'}`} style={{transitionDelay: isVisible ? '0.6s' : '0s'}}>
              ALL SERVICES
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`bg-white rounded-3xl shadow-2xl p-8 lg:p-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`} style={{transitionDelay: isVisible ? '0.8s' : '0s'}}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`group text-center lg:text-left hover:transform hover:scale-105 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-6'}`}
                style={{
                  transitionDelay: isVisible ? `${1.0 + index * 0.2}s` : '0s',
                  transform: isVisible ? 'translateY(0) rotateZ(0)' : `translateY(24px) rotateZ(${index % 2 === 0 ? '-2deg' : '2deg'})`
                }}
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-gold-secondary rounded-2xl mb-6 group-hover:bg-gold-secondary group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-gold-secondary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                </div>

                {/* Decorative Line */}
                <div className="hidden lg:block mt-8">
                  <div className="w-12 h-1 bg-orange-200 group-hover:bg-gold-secondary transition-all duration-300 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-20 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Additional Background Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gold-secondary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-40 left-20 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-emerald-500/10 rounded-full blur-lg"></div>
    </section>
  )
}
