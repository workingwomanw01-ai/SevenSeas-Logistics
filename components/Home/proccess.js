"use client"
import { useEffect, useRef, useState } from "react"

export default function Component() {
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

  const steps = [
    {
      id: "01",
      title: "Select Services",
      description:
        "Choose from our range of logistics solutions including local delivery, freight transport, or international shipping based on your specific needs.",
      bannerColor: "bg-burgundy-primary",
    },
    {
      id: "02",
      title: "Parcel Information",
      description:
        "Provide detailed information about your shipment including dimensions, weight, destination, and any special handling requirements.",
      bannerColor: "bg-gold-secondary",
    },
    {
      id: "03",
      title: "Transportation",
      description:
        "Your cargo is picked up and transported using our certified fleet with real-time tracking and professional handling throughout the journey.",
      bannerColor: "bg-burgundy-dark",
    },
    {
      id: "04",
      title: "Takeover Products",
      description:
        "Safe delivery to the final destination with proof of delivery confirmation and customer signature for complete peace of mind.",
      bannerColor: "bg-gold-dark",
    },
  ]

  return (
    <div className="relative overflow-hidden py-12 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://images.pexels.com/photos/3616764/pexels-photo-3616764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'}}>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-burgundy-dark/70"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-gold-secondary/30 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-gold-secondary/30 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-gold-secondary/30 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-gold-secondary/30 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 items-start">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative opacity-0 animate-fadeInUp" style={{animationDelay: `${0.2 + index * 0.2}s`, animationFillMode: 'forwards'}}>
              {/* Wavy Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-16 z-0">
                  <svg className="w-full h-full" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 30 Q50 10 100 30 T190 30"
                      stroke="rgba(201, 169, 110, 0.6)"
                      strokeWidth="2"
                      strokeDasharray="8,8"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Small dots along the path */}
                    <circle cx="30" cy="22" r="2" fill="rgba(201, 169, 110, 0.5)" />
                    <circle cx="70" cy="35" r="2" fill="rgba(201, 169, 110, 0.5)" />
                    <circle cx="130" cy="22" r="2" fill="rgba(201, 169, 110, 0.5)" />
                    <circle cx="170" cy="35" r="2" fill="rgba(201, 169, 110, 0.5)" />
                  </svg>
                </div>
              )}

              {/* Step Circle with Image */}
              <div className="relative mb-4 z-10">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gold-secondary/40 shadow-2xl">
                  <img
                    src={`/images/step-${step.id}.jpg`}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Step Banner */}
                <div
                  className={`${step.bannerColor} text-white px-6 py-3 rounded-lg shadow-lg transform -translate-y-4 mx-auto w-fit`}
                >
                  <span className="font-bold text-lg">Step - {step.id}</span>
                </div>
              </div>

              {/* Content */}
              <div className="text-center max-w-xs">
                <h3 className="text-cream-light text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-cream-accent text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
