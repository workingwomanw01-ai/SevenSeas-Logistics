"use client"
import { useEffect, useRef, useState } from "react"
import { Bike, Shield, Truck, Clock, Star, ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function DirtBikeTransport() {
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
  const features = [
    {
      icon: Shield,
      title: "Trusted Network",
      description: "Access to 20,000+ enclosed and open carriers across the U.S. for reliable dirt bike transportation.",
    },
    {
      icon: Truck,
      title: "Specialized Transport",
      description: "Custom motorcycle trailers and professional equipment designed specifically for dirt bike shipping.",
    },
    {
      icon: Clock,
      title: "Global Reach",
      description: "U.S. and international shipping capabilities with real-time tracking and delivery updates.",
    },
    {
      icon: Star,
      title: "#1 Rated Service",
      description: "Over 10,000+ reviews make us the top choice for bike shipping companies in America.",
    },
  ]
  const benefits = [
    "Network of 20,000+ enclosed and open carriers",
    "Over 10,000+ customer reviews and counting",
    "Door-to-door pickup and delivery service",
    "U.S. and international shipping capabilities",
    "Fully insured transportation coverage",
    "#1 rated bike shipping company in the U.S.",
    "Experienced team for hassle-free process",
    "Competitive pricing with no hidden fees",
    "24/7 customer support and tracking",
  ]

  return (    <div ref={sectionRef} className="py-16  lg:mx-8 xl:mx-16 2xl:mx-24  relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-gold-secondary/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-gold-secondary/20 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-gold-secondary/20 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-gold-secondary/20 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`transition-all duration-700 ${isVisible ? 'rotate-0 scale-100' : 'rotate-45 scale-75'}`}>
              <Bike className="w-12 h-12 text-gold-secondary" />
            </div>
            <span className={`w-8 h-px bg-gold-secondary transition-all duration-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            <p className={`text-gold-secondary uppercase tracking-wide font-semibold transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              SPECIALIZED TRANSPORT
            </p>
            <span className={`w-8 h-px bg-gold-secondary transition-all duration-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
          </div> 
                <h2 className={`text-4xl md:text-5xl font-bold text-green-900 mb-4 transition-all duration-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
             Dirt Bike <span className="text-gold-secondary">Transport Services</span>
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: isVisible ? '0.3s' : '0s'}}>
            Certified Freight Logistics - one of the top vehicle transport companies with over 10,000+ reviews! 
            Reliable, hassle-free dirt bike transport services across the U.S. and internationally.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{transitionDelay: isVisible ? '0.4s' : '0s'}}>            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Why Choose Certified Freight Logistics?</h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you're relocating, purchasing a dirt bike, or need it transported to or from the U.S., 
                our experienced team makes the dirt bike shipping process easy. With a network of 20,000+ 
                enclosed and open carriers, we're the #1 choice for bike shipping companies in the U.S.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{transitionDelay: isVisible ? `${0.6 + index * 0.1}s` : '0s'}}
                >
                  <CheckCircle className="w-5 h-5 text-gold-secondary flex-shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </div>
              ))}
            </div>
            
          </div>          {/* Right Images */}
          <div className={`relative transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'}`} style={{transitionDelay: isVisible ? '0.5s' : '0s'}}>
            <div className="relative h-96 md:h-[500px]">
              {/* Main Center Image */}
              <div className="absolute inset-8 rounded-xl overflow-hidden shadow-2xl z-20">
                <Image
                  src="/images/bike3.jpeg"
                  alt="Dirt bike being loaded onto transport trailer"
                  fill
                  className="object-fit"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Top Left Floating Image */}
              <div className={`absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-lg transform transition-all duration-1000 z-30 ${isVisible ? 'rotate-3 scale-100' : 'rotate-12 scale-75'}`} style={{transitionDelay: isVisible ? '0.7s' : '0s'}}>
                <Image
                  src="/images/bike1.jpeg"
                  alt="Professional dirt bike transport"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gold-secondary/20"></div>
              </div>
              
              {/* Bottom Right Floating Image */}
              <div className={`absolute bottom-0 right-0 w-36 h-36 md:w-44 md:h-44 rounded-xl overflow-hidden shadow-lg transform transition-all duration-1000 z-30 ${isVisible ? '-rotate-2 scale-100' : '-rotate-12 scale-75'}`} style={{transitionDelay: isVisible ? '0.9s' : '0s'}}>
                <Image
                  src="/images/bike2.jpeg"
                  alt="Secure motorcycle shipping"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gold-secondary/10"></div>
              </div>
              
              {/* Decorative Elements */}
              <div className={`absolute top-1/2 right-8 w-6 h-6 bg-gold-secondary rounded-full transform transition-all duration-700 z-10 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} style={{transitionDelay: isVisible ? '1.1s' : '0s'}}></div>
              <div className={`absolute top-1/3 left-8 w-4 h-4 bg-orange-400 rounded-full transform transition-all duration-700 z-10 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} style={{transitionDelay: isVisible ? '1.2s' : '0s'}}></div>
              <div className={`absolute bottom-1/4 left-1/3 w-8 h-8 border-2 border-gold-secondary/30 rounded-full transform transition-all duration-700 z-10 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} style={{transitionDelay: isVisible ? '1.3s' : '0s'}}></div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div 
                key={index}
                className={`bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 text-center hover:bg-white/90 hover:shadow-lg transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{transitionDelay: isVisible ? `${0.8 + index * 0.15}s` : '0s'}}
              >
                <div className="w-16 h-16 bg-gold-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-secondary/30 transition-colors">
                  <IconComponent className="w-8 h-8 text-gold-secondary" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div> */}

        {/* Bottom CTA Section */}
        <div className={`text-center mt-16 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: isVisible ? '1.4s' : '0s'}}>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-8 backdrop-blur-sm">            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Ship Your Dirt Bike with the #1 Transport Company?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join over 10,000+ satisfied customers who trust Certified Freight Logistics for their dirt bike shipping needs. 
              Experience hassle-free transport with our network of 20,000+ carriers across the U.S. and internationally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <button className="bg-gold-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-gold-dark transition-colors">
                Get Free Quote
              </button> */}
              <button className="border border-gold-secondary text-gold-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gold-secondary hover:text-white transition-colors">
                Contact : (209) 353-3619
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
