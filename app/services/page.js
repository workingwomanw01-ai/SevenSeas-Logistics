"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Truck, 
  Ship, 
  Plane, 
  Package, 
  Building2, 
  Globe, 
  Clock, 
  Shield, 
  ArrowRight, 
  CheckCircle,
  Users,
  BarChart3,
  MapPin,
  Headphones
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Air Freight",
    description: "Fast and reliable air cargo services for time-sensitive shipments worldwide",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    features: ["Express delivery", "Temperature controlled", "Real-time tracking", "Global network"],
    bgColor: "bg-gradient-to-br from-[#8b1538] to-[#6b1129]",
    delay: "0ms"
  },
  {
    id: 2,
    title: "Ocean Freight", 
    description: "Cost-effective sea freight solutions for bulk shipments and containers",
    icon: Ship,
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    features: ["FCL & LCL options", "Door-to-door service", "Customs clearance", "Insurance coverage"],
    bgColor: "bg-gradient-to-br from-[#c9a96e] to-[#b8965a]",
    delay: "100ms"
  },
  {
    id: 3,
    title: "Land Transport",
    description: "Comprehensive road freight services for domestic and cross-border deliveries",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    features: ["Same-day delivery", "Temperature control", "Specialized vehicles", "Regional coverage"],
    bgColor: "bg-gradient-to-br from-[#8b1538] to-[#a5376b]",
    delay: "200ms"
  },
  {
    id: 4,
    title: "Warehousing",
    description: "State-of-the-art storage facilities with advanced inventory management",
    icon: Building2,
    image: "https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg",
    features: ["Climate controlled", "24/7 security", "Inventory management", "Pick & pack services"],
    bgColor: "bg-gradient-to-br from-[#c9a96e] to-[#9c7f4b]",
    delay: "300ms"
  },
  {
    id: 5,
    title: "Supply Chain",
    description: "End-to-end supply chain optimization and management solutions",
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    features: ["Procurement services", "Vendor management", "Analytics & reporting", "Cost optimization"],
    bgColor: "bg-gradient-to-br from-[#8b1538] to-[#6b1129]",
    delay: "400ms"
  },
  {
    id: 6,
    title: "Last Mile Delivery",
    description: "Efficient final delivery solutions direct to your customers' doorstep",
    icon: Package,
    image: "/images/1.png",
    features: ["Same-day delivery", "Scheduled delivery", "Proof of delivery", "Return management"],
    bgColor: "bg-gradient-to-br from-[#c9a96e] to-[#b8965a]",
    delay: "500ms"
  }
];

const stats = [
  { number: 500, label: "Happy Clients", icon: Users, suffix: "+" },
  { number: 50000, label: "Shipments Delivered", icon: Package, suffix: "K+" },
  { number: 25, label: "Countries Served", icon: Globe, suffix: "+" },
  { number: 99.9, label: "On-Time Delivery", icon: Clock, suffix: "%" }
];

export default function ServicesPage() {
  // Helper function to convert service title to anchor ID
  const getServiceAnchorId = (title) => {
    const mappings = {
      'Air Freight': 'air-freight',
      'Ocean Freight': 'ocean-freight', 
      'Land Transport': 'land-transport',
      'Warehousing': 'warehousing',
      'Supply Chain': 'supply-chain',
      'Last Mile Delivery': 'last-mile'
    };
    return mappings[title] || title.toLowerCase().replace(/\s+/g, '-');
  };

  // Add custom styles for animations and smooth scrolling
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      /* Animation keyframes */
      @keyframes slideInFromLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideInFromRight {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideInFromBottom {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideInFromTop {
        from {
          opacity: 0;
          transform: translateY(-50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes rotateIn {
        from {
          opacity: 0;
          transform: rotate(-10deg) scale(0.8);
        }
        to {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }
      }
      
      /* Animation classes */
      .animate-slide-in-left {
        animation: slideInFromLeft 0.8s ease-out forwards;
      }
      
      .animate-slide-in-right {
        animation: slideInFromRight 0.8s ease-out forwards;
      }
      
      .animate-slide-in-bottom {
        animation: slideInFromBottom 0.8s ease-out forwards;
      }
      
      .animate-slide-in-top {
        animation: slideInFromTop 0.8s ease-out forwards;
      }
      
      .animate-fade-in-scale {
        animation: fadeInScale 0.8s ease-out forwards;
      }
      
      .animate-rotate-in {
        animation: rotateIn 0.8s ease-out forwards;
      }
      
      /* Initially hidden elements */
      .animate-on-scroll {
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);  const [selectedService, setSelectedService] = useState(null);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const statsRef = useRef(null);
  const heroRef = useRef(null);
  const servicesHeaderRef = useRef(null);
  const servicesGridRef = useRef(null);
  const whyChooseUsRef = useRef(null);
  const ctaRef = useRef(null);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animation observer for different sections
  useEffect(() => {
    if (!isClient) return;

    const animateOnScroll = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animationType = element.dataset.animation;
          
          if (animationType) {
            element.classList.remove('animate-on-scroll');
            element.classList.add(animationType);
          }
          
          observer.unobserve(element);
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isClient]);
  
  // Counter animation effect
  useEffect(() => {
    if (!isClient) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
            stats.forEach((stat, index) => {
            const target = stat.number === 50000 ? 50 : stat.number; // For "50K+" display
            const increment = target / 50; // Faster counting - fewer steps
            let current = 0;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              
              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[index] = current;
                return newCounters;
              });
            }, 15); // Faster interval
          });
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, isClient]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[45vh] lg:h-[35vh] min-h-[350px] overflow-hidden">        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/images/land-freight.jpg')` 
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#8b1538]/90 via-[#6b1129]/80 to-transparent" />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Solutions That Move
                  <span className="block" style={{ color: '#c9a96e' }}>Your Business Forward</span>
                </h1>

                <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto px-4 sm:px-0">
                  From air freight to last-mile delivery, we provide end-to-end logistics solutions 
                  that ensure your cargo reaches its destination safely, efficiently, and on time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {isClient && stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const displayNumber = stat.number === 50000 
                ? Math.round(counters[index]) 
                : stat.number === 99.9 
                ? counters[index].toFixed(1)
                : Math.round(counters[index]);
              
              return (
                <div 
                  key={index}
                  className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-3 sm:mb-4 transition-colors duration-300" style={{ backgroundColor: '#f4f1e8' }}>
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300" style={{ color: '#8b1538' }} />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2" style={{ color: '#8b1538' }}>
                    {displayNumber}{stat.suffix}
                  </div>
                  <div className="text-gray-600 font-medium text-sm sm:text-base">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: '#f4f1e8' }}>
        <div className="container mx-auto px-4">          {/* Section Header */}
          <div 
            className="text-center mb-12 sm:mb-16 animate-on-scroll"
            data-animation="animate-slide-in-top"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-[2px] w-6 sm:w-8" style={{ backgroundColor: '#c9a96e' }}></div>
              <span className="font-semibold tracking-wide uppercase text-sm sm:text-base" style={{ color: '#c9a96e' }}>Our Services</span>
              <div className="h-[2px] w-6 sm:w-8" style={{ backgroundColor: '#c9a96e' }}></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4" style={{ color: '#8b1538' }}>
              Complete Logistics Solutions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              We offer a comprehensive range of logistics services designed to meet 
              all your shipping and supply chain needs.
            </p>
          </div>

          {/* Services Grid - Slick Mobile Carousel */}
          <div className="relative">            {/* Mobile Carousel */}
            <div className="md:hidden">
              <div className="flex overflow-x-auto scrollbar-hide space-x-6 px-4 pb-6 snap-x snap-mandatory animate-on-scroll" data-animation="animate-slide-in-left">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (                    <div 
                      key={service.id}
                      id={`mobile-${getServiceAnchorId(service.title)}`}
                      className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden group cursor-pointer min-w-[280px] max-w-[280px] snap-center transform hover:scale-105"
                      style={{ animationDelay: service.delay }}
                      onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                    >
                      {/* Service Image with Parallax Effect */}
                      <div className="relative h-48 overflow-hidden">
                        <div 
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-125 transition-transform duration-1000 ease-out"
                          style={{ backgroundImage: `url(${service.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Floating Icon */}
                        <div className={`absolute top-4 left-4 w-14 h-14 ${service.bgColor} rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all duration-500`}>
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        
                        {/* Gradient Overlay Animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-gold-secondary/0 to-orange-500/30 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      </div>

                      {/* Service Content */}
                      <div className="p-6 relative">
                        {/* Decorative Element */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-gold-secondary rounded-full opacity-60" />
                        
                        <h3 className="text-xl font-bold text-burgundy-dark mb-3 group-hover:text-gold-secondary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                          {service.description}
                        </p>

                        {/* Features List with Animation */}
                        <div className={`space-y-2 mb-6 transition-all duration-500 ease-in-out ${
                          selectedService === service.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                        }`}>
                          {service.features.map((feature, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-center space-x-2 transform transition-all duration-300"
                              style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <button className="w-full bg-gradient-to-r from-burgundy-dark to-burgundy-primary text-white py-3 rounded-xl font-semibold hover:from-gold-secondary hover:to-gold-dark transition-all duration-500 flex items-center justify-center space-x-2 group/btn shadow-lg">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Scroll Indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {services.map((_, index) => (
                  <div 
                    key={index}
                    className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
                  />
                ))}
              </div>
              
              {/* Scroll Hint */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500 flex items-center justify-center space-x-1">
                  <span>Swipe to explore more services</span>
                  <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </div>            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-8 animate-on-scroll" data-animation="animate-fade-in-scale">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (                  <div 
                    key={service.id}
                    id={getServiceAnchorId(service.title)}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer transform hover:scale-105 animate-on-scroll"
                    style={{ animationDelay: `${index * 100}ms` }}
                    data-animation="animate-slide-in-bottom"
                    onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                  >
                    {/* Service Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${service.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className={`absolute top-4 left-4 w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Service Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-burgundy-dark mb-3 group-hover:text-gold-secondary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className={`space-y-2 mb-6 transition-all duration-300 ${
                        selectedService === service.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                      }`}>
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button className="w-full bg-burgundy-dark text-white py-3 rounded-lg font-semibold hover:bg-gold-secondary transition-all duration-300 flex items-center justify-center space-x-2 group/btn">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 bg-burgundy-dark">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div 
              className="animate-on-scroll"
              data-animation="animate-slide-in-left"
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                <span className="text-orange-400 font-semibold tracking-wide uppercase text-sm sm:text-base">Why Choose Us</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Trusted Logistics Partner for 
                <span className="text-orange-400"> Global Success</span>
              </h2>
              
              <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
                With decades of experience and a commitment to excellence, we deliver 
                logistics solutions that drive your business forward. Our advanced 
                technology and global network ensure your cargo is always in safe hands.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">24/7 Support</div>
                    <div className="text-gray-400 text-xs sm:text-sm">Round-the-clock assistance</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Global Reach</div>
                    <div className="text-gray-400 text-xs sm:text-sm">Worldwide network</div>
                  </div>
                </div>
              </div>

              <a href="/" className="bg-gold-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gold-dark transition-all duration-300 flex items-center space-x-2 group text-sm sm:text-base">
                <span>Get Started Today</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div 
              className="relative mt-8 lg:mt-0 animate-on-scroll"
              data-animation="animate-slide-in-right"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg animate-on-scroll" data-animation="animate-fade-in-scale" style={{ animationDelay: '200ms' }}>
                    <Headphones className="w-6 h-6 sm:w-8 sm:h-8 text-gold-secondary mb-3" />
                    <h4 className="font-semibold text-burgundy-dark mb-2 text-sm sm:text-base">Expert Support</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Dedicated team of logistics experts</p>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg animate-on-scroll" data-animation="animate-fade-in-scale" style={{ animationDelay: '400ms' }}>
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-gold-secondary mb-3" />
                    <h4 className="font-semibold text-burgundy-dark mb-2 text-sm sm:text-base">Secure Handling</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Advanced security protocols</p>
                  </div>
                </div>
                <div className="space-y-4 sm:mt-8">
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg animate-on-scroll" data-animation="animate-fade-in-scale" style={{ animationDelay: '300ms' }}>
                    <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-gold-secondary mb-3" />
                    <h4 className="font-semibold text-burgundy-dark mb-2 text-sm sm:text-base">Real-time Tracking</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Monitor your shipments 24/7</p>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg animate-on-scroll" data-animation="animate-fade-in-scale" style={{ animationDelay: '500ms' }}>
                    <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-gold-secondary mb-3" />
                    <h4 className="font-semibold text-burgundy-dark mb-2 text-sm sm:text-base">Global Network</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Worldwide logistics coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-gold-secondary to-gold-dark animate-on-scroll" data-animation="animate-slide-in-bottom">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Optimize Your Logistics?
          </h2>
          <p className="text-cream-light text-base sm:text-lg mb-8 max-w-2xl mx-auto px-4">
            Let our experts help you streamline your supply chain and reduce costs. 
            Get a free consultation and quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button className="bg-white text-gold-secondary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 group text-sm sm:text-base">
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="/contact" className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-gold-secondary transition-all duration-300 text-sm sm:text-base">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
