"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Zap } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote:
      "I recently used for my logistics needs, and I am thoroughly impressed with their exceptional service. I contacted them, team demonstrated and making the entire process smooth and hassle-free.",
    name: "Winifred P. Reyes",
    title: "Freight Manager",
    image: "https://www.bilevi.com/cdn/shop/articles/dressing-for-success-a-guide-to-office-attire-for-women-607338.jpg?v=1691239553&width=2048",
  },
  {
    id: 2,
    quote:
      "Outstanding service and reliability. Their team went above and beyond to ensure our shipments arrived on time. Highly recommend their transport services for any business needs.",
    name: "Marcus Johnson",
    title: "Supply Chain Director",
    image: "/images/marc.jpg",
  },
  {
    id: 3,
    quote:
      "Professional, efficient, and cost-effective. They have transformed our logistics operations and helped us reduce costs while improving delivery times significantly.",
    name: "Sarah Chen",
    title: "Operations Manager",
    image: "https://i.insider.com/62968df03050690018311acc?width=700",
  },
]

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0)
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

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div ref={sectionRef} className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-1200 ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-1'}`} style={{transitionDelay: isVisible ? '0.2s' : '0s'}}>        <div className="flex flex-col lg:flex-row min-h-[500px]">
          {/* Image Section */}
          <div className="relative lg:w-2/5 bg-gradient-to-br from-orange-400 to-yellow-500">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/90 to-yellow-500/90"></div>
            <div className="relative h-64 lg:h-full flex items-center justify-center p-8">
              <div className={`relative w-48 h-48 lg:w-64 lg:h-64 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{transitionDelay: isVisible ? '0.4s' : '0s'}}>
                <Image
                  src={currentTestimonial.image || "/placeholder.svg"}
                  alt={currentTestimonial.name}
                  fill
                  className="object-cover rounded-full border-4 border-white shadow-xl"
                  priority
                />
              </div>
            </div>

            {/* Feedback Badge */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 lg:top-auto lg:bottom-8 lg:translate-y-0">
              <div className={`bg-gold-secondary text-white px-4 py-8 lg:px-6 lg:py-12 rounded-r-2xl shadow-lg transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{transitionDelay: isVisible ? '0.6s' : '0s'}}>
                <div className="flex flex-col items-center space-y-2">
                  <Zap className="w-6 h-6 lg:w-8 lg:h-8" />
                  <span className="text-sm lg:text-base font-semibold tracking-wider transform -rotate-90 lg:rotate-0 whitespace-nowrap">
                    Feedback
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className={`flex items-center space-x-2 text-gold-secondary transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{transitionDelay: isVisible ? '0.8s' : '0s'}}>
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-semibold tracking-wider uppercase">Trusted Transport Service</span>
                </div>
                <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight transition-all duration-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: isVisible ? '1.0s' : '0s'}}>
                  What Our Client's Says
                </h2>
              </div>

              {/* Testimonial Quote */}
              <div className="space-y-6">
                <blockquote className={`text-gray-700 text-lg lg:text-xl leading-relaxed transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{transitionDelay: isVisible ? '1.2s' : '0s'}}>
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Client Info */}
                <div className={`space-y-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{transitionDelay: isVisible ? '1.4s' : '0s'}}>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900">{currentTestimonial.name}</h3>
                  <p className="text-gray-600 font-medium">{currentTestimonial.title}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className={`flex items-center justify-between pt-6 transition-all duration-600 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{transitionDelay: isVisible ? '1.6s' : '0s'}}>
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "bg-gold-secondary w-8" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-3 rounded-full border-2 border-gray-300 hover:border-gold-secondary hover:bg-cream-accent transition-all duration-300 group"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gold-secondary" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-3 rounded-full border-2 border-gray-300 hover:border-gold-secondary hover:bg-cream-accent transition-all duration-300 group"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gold-secondary" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
