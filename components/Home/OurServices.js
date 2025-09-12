"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Plane } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function LogisticsServices() {
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

  return (
    <div ref={sectionRef} className="w-full bg-gray-50 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">        {/* Header Section */}
        <div className={`flex items-center justify-center gap-2 mb-3 sm:mb-4 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: isVisible ? '0.1s' : '0s'}}>
          <div className={`h-[1px] w-4 sm:w-6 bg-gold-secondary transition-all duration-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} style={{transitionDelay: isVisible ? '0.2s' : '0s'}}></div>
          <h2 className={`text-sm sm:text-base text-gray-600 font-medium tracking-wide transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{transitionDelay: isVisible ? '0.3s' : '0s'}}>OUR SERVICE</h2>
          <Plane className={`h-3 w-3 sm:h-4 sm:w-4 text-gold-secondary rotate-45 transition-all duration-700 ${isVisible ? 'opacity-100 rotate-45' : 'opacity-0 rotate-90'}`} style={{transitionDelay: isVisible ? '0.4s' : '0s'}} />
        </div>

        {/* Main Heading */}
        <h1 className={`text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0a3a3a] mb-8 sm:mb-12 md:mb-16 leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`} style={{transitionDelay: isVisible ? '0.5s' : '0s'}}>
          Provide Efficient Logistics <br className="hidden sm:block" />
          <span className="block sm:inline">Solutions </span>
          <span className={`text-gold-secondary transition-all duration-800 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} style={{transitionDelay: isVisible ? '0.8s' : '0s'}}>BUSINESS</span>
        </h1>        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">          {/* Fast Personal Delivery Card */}          <div className={`transition-all duration-800 hover:scale-105 ${isVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 -translate-x-10 -rotate-3'}`} style={{transitionDelay: isVisible ? '0.9s' : '0s'}}>
            <ServiceCard
              title="Fast Personal Delivery"
              imageSrc="https://images.pexels.com/photos/6969975/pexels-photo-6969975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              iconBgColor="bg-[#0a3a3a]"
              description="Quick and reliable door-to-door delivery for personal packages and documents. Same-day and next-day delivery options available with real-time tracking."
              readMoreLink="/services/fast-personal-delivery"
              icon={
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14 11H10V13H14V11Z" fill="currentColor" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 5V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H20C21.6569 5 23 6.34315 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34315 21 1 19.6569 1 18V8C1 6.34315 2.34315 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44772 7 3 7.44772 3 8V14H21V8C21 7.44772 20.5523 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z"
                    fill="currentColor"
                  />
                </svg>
              }
            />
          </div>{/* Local Truck Transport Card */}          <div className={`transition-all duration-900 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'}`} style={{transitionDelay: isVisible ? '1.1s' : '0s'}}>
            <ServiceCard
              title="Local Truck Transport"
              imageSrc="/images/3.png"
              iconBgColor="bg-gold-secondary"
              description="Comprehensive ground transportation for heavy cargo and bulk shipments within regional areas. Specialized equipment for oversized and fragile items."
              readMoreLink="/services/local-truck-transport"
              icon={
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15 4H18L22 8V17C22 17.5523 21.5523 18 21 18H20C20 19.6569 18.6569 21 17 21C15.3431 21 14 19.6569 14 18H10C10 19.6569 8.65685 21 7 21C5.34315 21 4 19.6569 4 18H3C2.44772 18 2 17.5523 2 17V6C2 4.89543 2.89543 4 4 4H15ZM4 6V16H4.57C5.25 15.39 6.09 15 7 15C7.91 15 8.75 15.39 9.43 16H14.57C15.25 15.39 16.09 15 17 15C17.91 15 18.75 15.39 19.43 16H20V8.83L16.83 6H4ZM7 17C6.44772 17 6 17.4477 6 18C6 18.5523 6.44772 19 7 19C7.55228 19 8 18.5523 8 18C8 17.4477 7.55228 17 7 17ZM17 17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19C17.5523 19 18 18.5523 18 18C18 17.4477 17.5523 17 17 17Z"
                    fill="currentColor"
                  />
                </svg>
              }
            />
          </div>{/* International Transport Card */}          <div className={`transition-all duration-1000 hover:scale-105 ${isVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-10 rotate-3'}`} style={{transitionDelay: isVisible ? '1.3s' : '0s'}}>
            <ServiceCard
              title="International Transport"
              imageSrc="https://images.pexels.com/photos/32010723/pexels-photo-32010723/free-photo-of-commercial-cargo-plane-taking-off-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              iconBgColor="bg-[#0a3a3a]"
              description="Global freight solutions with air, sea, and land options. Complete customs clearance, documentation, and international compliance management."
              readMoreLink="/services/international-transport"
              icon={
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM14.8055 18.4151C17.1228 17.4003 18.7847 15.1667 18.9806 12.525C18.1577 12.9738 17.12 13.3418 15.9371 13.598C15.7882 15.4676 15.3827 17.1371 14.8055 18.4151ZM9.1945 18.4151C8.6173 17.1371 8.2118 15.4676 8.06286 13.598C6.88 13.3418 5.84227 12.9738 5.01941 12.525C5.21534 15.1667 6.87719 17.4003 9.1945 18.4151ZM5.01941 11.475C5.84227 11.0262 6.88 10.6582 8.06286 10.402C8.2118 8.53239 8.6173 6.86288 9.1945 5.58493C6.87719 6.59966 5.21534 8.83332 5.01941 11.475ZM14.8055 5.58493C15.3827 6.86288 15.7882 8.53239 15.9371 10.402C17.12 10.6582 18.1577 11.0262 18.9806 11.475C18.7847 8.83332 17.1228 6.59966 14.8055 5.58493ZM10.0024 13.5C10.0024 14.8978 10.1327 16.1911 10.3608 17.2534C11.1516 17.4488 12.0008 17.4488 12.7916 17.2534C13.0196 16.1911 13.15 14.8978 13.15 13.5C13.15 13.4654 13.1498 13.4309 13.1495 13.3964C12.1908 13.47 11.1613 13.47 10.2029 13.3964C10.2026 13.4309 10.0024 13.4654 10.0024 13.5ZM13.1495 10.6036C13.1498 10.5691 13.15 10.5346 13.15 10.5C13.15 9.10217 13.0196 7.80886 12.7916 6.74658C12.0008 6.55122 11.1516 6.55122 10.3608 6.74658C10.1327 7.80886 10.0024 9.10217 10.0024 10.5C10.0024 10.5346 10.2026 10.5691 10.2029 10.6036C11.1613 10.53 12.1908 10.53 13.1495 10.6036Z"
                    fill="currentColor"
                  />
                </svg>
              }
            />
          </div></div>
      </div>
    </div>
  )
}


function ServiceCard({ title, imageSrc, iconBgColor, icon, description, readMoreLink }) {
  return (
    <div className="relative h-full group hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          width={800}
          height={600}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 relative">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0a3a3a] mb-3 sm:mb-4 leading-tight">{title}</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
          {description}
        </p>
        <Link 
          href={readMoreLink || "#"}
          className="flex items-center text-[#0a3a3a] font-medium text-sm sm:text-base hover:text-gold-secondary transition-colors duration-200 cursor-pointer"
        >
          <span>Read More</span>
          <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>

        {/* Icon */}
        <div className={`absolute -right-0 bottom-0 ${iconBgColor} p-3 sm:p-4`}>{icon}</div>
      </div>
    </div>
  )
}
