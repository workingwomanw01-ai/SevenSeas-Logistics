"use client"
import { Award, FileText, Settings } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function FeatureCards() {
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
  }, []);

  const features = [
    {
      id: "01",
      title: "Premium Quality",
      description: "We deliver exceptional service with the highest standards of care, ensuring your shipments arrive safely and on time.",
      icon: Award,
    },
    {
      id: "02",
      title: "License & Insurance",
      description: "Fully licensed and insured operations provide complete protection and peace of mind for all your logistics needs.",
      icon: FileText,
    },
    {
      id: "03",
      title: "Certified Expert",
      description: "Our experienced team of logistics professionals brings years of expertise to handle your most complex shipping requirements.",
      icon: Settings,
      },
    ]
  
  return (
    <div ref={sectionRef} className="py-8 md:py-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <div 
              key={feature.id} 
              className={`flex flex-col sm:flex-row bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 scale-95'}`}
              style={{
                transitionDelay: isVisible ? `${0.2 + index * 0.15}s` : '0s',
                transform: isVisible ? 'translateX(0) scale(1)' : `translateX(${index % 2 === 0 ? '-20px' : '20px'}) scale(0.95)`
              }}
            >
              <div className="bg-gold-secondary p-4 sm:p-6 flex flex-col items-center justify-center min-w-full sm:min-w-[120px]">
                <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-2 sm:mb-4" />
                <span className="text-white text-xl sm:text-2xl font-bold opacity-50">{feature.id}</span>
              </div>
              <div className="p-4 sm:p-6 flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>          )
        })}
      </div>
    </div>
  )
}
