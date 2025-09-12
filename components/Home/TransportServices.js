'use client'
import { Zap, MapPin, Truck, Package, Globe, Headphones, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function TServices() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const scrollContainerRef = useRef(null)
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

  const services = [
        {
      icon: (
        <div className="relative">
          <div className="animate-spin duration-4000">
            <Globe className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <div className="animate-bounce absolute -bottom-1 -right-1 animation-delay-700">
            <Truck className="w-5 h-5 text-white drop-shadow-lg transform hover:scale-110 transition-transform" />
          </div>
        </div>
      ),
      title: "International Shipping Services"
    },
    {
      icon: (
        <div className="relative">
          <div className="animate-pulse duration-2000">
            <MapPin className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <div className="animate-bounce absolute -bottom-1 -right-1 animation-delay-500">
            <Truck className="w-5 h-5 text-white drop-shadow-lg transform hover:scale-110 transition-transform" />
          </div>
        </div>
      ),
      title: "Complete Logistics System"
    },
    {
      icon: (
        <div className="relative">
          <div className="animate-pulse duration-1500">
            <Package className="w-10 h-10 text-white drop-shadow-lg transform hover:rotate-12 transition-transform" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center animate-ping duration-2000">
            <div className="w-2 h-2 bg-burgundy-dark rounded-full animate-pulse"></div>
          </div>
        </div>
      ),
      title: "Shipping All Over The World"
    },
    {
      icon: (
        <div className="relative">
          <div className="animate-pulse duration-1800">
            <Package className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <div className="animate-bounce absolute -top-1 -right-1 animation-delay-300">
            <MapPin className="w-5 h-5 text-white drop-shadow-lg transform hover:scale-125 transition-transform" />
          </div>
        </div>
      ),
      title: "Online Product Tracking"
    },
    {
      icon: (
        <div className="animate-pulse duration-2500">
          <Headphones className="w-10 h-10 text-white drop-shadow-lg transform hover:rotate-6 transition-transform" />
        </div>
      ),
      title: "Great Logistical Support"
    }
  ]
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setScrollPosition(scrollLeft)
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
      
      // Update current slide based on scroll position
      const cardWidth = 280
      const newSlide = Math.round(scrollLeft / cardWidth)
      setCurrentSlide(newSlide)
    }
  }

  const scrollToCard = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 280 // Card width + gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', updateScrollButtons)
      updateScrollButtons() // Initial check
      return () => container.removeEventListener('scroll', updateScrollButtons)
    }
  }, [])
  return (
    <section ref={sectionRef} className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: isVisible ? '0.1s' : '0s'}}>
          <div className={`flex items-center justify-center gap-2 mb-6 transition-all duration-600 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{transitionDelay: isVisible ? '0.2s' : '0s'}}>
            <Zap className={`w-5 h-5 text-gold-secondary transition-all duration-700 ${isVisible ? 'rotate-0' : 'rotate-180'}`} style={{transitionDelay: isVisible ? '0.3s' : '0s'}} />
            <span className={`text-gold-secondary font-semibold tracking-wider uppercase text-sm transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{transitionDelay: isVisible ? '0.4s' : '0s'}}>
              TRUSTED TRANSPORT SERVICE
            </span>
          </div>

          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`} style={{transitionDelay: isVisible ? '0.5s' : '0s'}}>
            We Provide Quick & Safe Transportation All Over The World
          </h1>
        </div>        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden lg:grid grid-cols-5 gap-6 mt-16">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-all duration-600 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{transitionDelay: isVisible ? `${0.3 + index * 0.1}s` : '0s'}}
            >
              <div className="w-20 h-20 bg-burgundy-dark rounded-lg flex items-center justify-center mx-auto mb-6">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">{service.title}</h3>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden mt-16 relative opacity-0 animate-fadeInUp" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>          {/* Scroll Buttons */}
          <button
            onClick={() => scrollToCard('left')}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-300 ${
              canScrollLeft ? 'opacity-100 hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={() => scrollToCard('right')}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-300 ${
              canScrollRight ? 'opacity-100 hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!canScrollRight}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>{/* Carousel Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-100 flex-shrink-0 w-64 snap-start hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <div className="w-20 h-20 bg-burgundy-dark rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-600 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">{service.title}</h3>
              </div>
            ))}
          </div>          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cardWidth = 280
                    scrollContainerRef.current.scrollTo({
                      left: cardWidth * index,
                      behavior: 'smooth'
                    })
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-burgundy-dark w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  )
}