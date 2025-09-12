import Image from "next/image"
import { Globe, Truck, Plane, ArrowRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function LogisticsAbout() {
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

  return (
    <section ref={sectionRef} className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 pt-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className={`flex items-center justify-center space-x-4 text-gold-secondary text-sm font-medium uppercase tracking-wider mb-8 transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-90'}`} style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>
          <div className={`w-8 h-0.5 bg-gold-secondary transition-all duration-700 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} style={{transitionDelay: isVisible ? '0.2s' : '0s'}}></div>
          <span className={`transition-all duration-600 ${isVisible ? 'opacity-100 tracking-wider' : 'opacity-0 tracking-normal'}`} style={{transitionDelay: isVisible ? '0.3s' : '0s'}}>WHO WE ARE</span>
          <Plane className={`w-4 h-4 transition-all duration-800 ${isVisible ? 'rotate-0 scale-100' : 'rotate-90 scale-75'}`} style={{transitionDelay: isVisible ? '0.4s' : '0s'}} />
          <div className={`w-8 h-0.5 bg-gold-secondary transition-all duration-700 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} style={{transitionDelay: isVisible ? '0.5s' : '0s'}}></div>
        </div>        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Section - Images and Stats */}
          <div className={`space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-12 scale-95'}`} style={{transitionDelay: isVisible ? '0.6s' : '0s'}}>
            {/* Statistics */}
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-1 h-16 bg-gold-secondary transition-all duration-700 ${isVisible ? 'scale-y-100' : 'scale-y-0'}`} style={{transitionDelay: isVisible ? '0.8s' : '0s'}}></div>
              <div>
                <div className={`text-4xl font-bold text-gray-900 transition-all duration-800 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{transitionDelay: isVisible ? '1.0s' : '0s'}}>97+</div>
                <div className={`text-gray-600 font-medium transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{transitionDelay: isVisible ? '1.2s' : '0s'}}>Years of experience</div>
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`relative transition-all duration-900 ${isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-6 -rotate-3'}`} style={{transitionDelay: isVisible ? '1.4s' : '0s'}}>
                <div className="absolute left-0 top-0 w-1 h-full bg-gold-secondary z-10"></div>
                <Image
                  src="https://images.pexels.com/photos/7363166/pexels-photo-7363166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Logistics workers at container facility"
                  width={400}
                  height={0}
                  className="w-full h-100 object-cover rounded-r-lg"
                />
              </div>
              <div className={`relative transition-all duration-900 ${isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-6 rotate-3'}`} style={{transitionDelay: isVisible ? '1.6s' : '0s'}}>
                <div className="absolute left-0 top-0 w-1 h-full bg-gold-secondary z-10"></div>
                <Image
                  src="/images/3.png"
                  alt="Forklift in warehouse"
                  width={400}
                  height={0}
                  className="w-full h-100 object-cover rounded-r-lg"
                />
              </div>
            </div>
          </div>
          
          {/* Right Section - Content */}
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'}`} style={{transitionDelay: isVisible ? '0.7s' : '0s'}}>
            <div className="space-y-3">
              {/* Title */}
              <h2 className={`text-3xl lg:text-4xl font-bold text-gray-900 leading-tight transition-all duration-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: isVisible ? '0.9s' : '0s'}}>
                Leading Global Logistic
                <br />
                And Transport <span className={`text-gold-secondary transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} style={{transitionDelay: isVisible ? '1.3s' : '0s'}}>AGENCY</span>
              </h2>              <p className={`text-gray-600 text-lg leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: isVisible ? '1.1s' : '0s'}}>
                At Certified Freight Logistics, we deliver excellence in every shipment. With over 97 years of experience 
                in the logistics industry, we provide comprehensive freight solutions that connect businesses worldwide. 
                Our certified processes and dedicated team ensure your cargo reaches its destination safely, on time, every time.
              </p>
            </div>
            
            {/* Services */}
            <div className="space-y-4">
              {/* Global Service */}
              <div className="flex items-start space-x-4">
                <div className="w-1 h-16 bg-gold-secondary flex-shrink-0"></div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-secondary p-3 rounded-lg flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Global Service</h3>
                    <p className="text-gray-600">
                      Comprehensive international shipping solutions with certified quality standards and global reach.
                    </p>
                  </div>
                </div>
              </div>

              {/* Local Service */}
              <div className="flex items-start space-x-4">
                <div className="w-1 h-16 bg-gold-secondary flex-shrink-0"></div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-secondary p-3 rounded-lg flex-shrink-0">
                    <Truck className="w-6 h-6 text-white" />
                  </div>                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Local Service</h3>
                    <p className="text-gray-600">
                      Reliable domestic freight delivery with real-time tracking and dedicated customer support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            {/* <div className="pt-4">
              <button className="bg-gold-secondary hover:bg-gold-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 flex items-center space-x-2 group">
                <span>More About Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div> */}
          </div>
        </div>
      </div>
      
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
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }
      `}</style>
    </section>
  )
}
