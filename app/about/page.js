"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { 
  Globe, 
  Truck, 
  Users, 
  Award, 
  Target, 
  Eye, 
  Heart,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Building2,
  Package,
  Plane
} from "lucide-react"
import DirtBikeTransport from "@/components/Home/DirtBikeTransport"

export default function AboutPage() {
  const [counters, setCounters] = useState([0, 0, 0, 0])
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const statsRef = useRef(null)
  const stats = [
    { number: 96, label: "Years Experience", icon: Award, suffix: "+" },
    { number: 500, label: "Happy Clients", icon: Users, suffix: "+" },
    { number: 50, label: "Countries Served", icon: Globe, suffix: "+" },
    { number: 99.9, label: "Success Rate", icon: CheckCircle, suffix: "%" }
  ]

  const values = [
    {
      icon: Shield,
      title: "Reliability",
      description: "We deliver on our promises with consistent, dependable service that you can count on.",
      color: "bg-burgundy-primary"
    },
    {
      icon: Clock,
      title: "Efficiency",
      description: "Time is money. We optimize every process to ensure faster, more efficient logistics solutions.",
      color: "bg-gray-500"
    },
    {
      icon: Heart,
      title: "Customer Focus",
      description: "Your success is our success. We prioritize your needs and exceed your expectations.",
      color: "bg-gold-secondary"
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We embrace cutting-edge technology and innovative solutions to stay ahead of the curve.",
      color: "bg-burgundy-dark"
    }
  ]

  const team = [
    {
      name: "John Anderson",
      position: "Chief Executive Officer",
      image: "/images/ceo.jpg",
      description: "25+ years in logistics and supply chain management"
    },
    {
      name: "Sarah Mitchell",
      position: "Chief Operations Officer",
      image: "/images/sarah.png",
      description: "Expert in global operations and process optimization"
    },
    {
      name: "Michael Chen",
      position: "Head of Technology",
      image: "/images/chen1.jpg",
      description: "Leading digital transformation in logistics"
    },
    {
      name: "Emily Rodriguez",
      position: "Customer Success Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Ensuring exceptional customer experiences"
    }
  ]
  const milestones = [
    { year: "1928", title: "Company Founded", description: "Started as a California-based refrigerated carrier specializing in fresh produce transportation" },
    { year: "1950s", title: "Regional Expansion", description: "Expanded refrigerated transport services across the Western United States" },
    { year: "1980s", title: "Fleet Diversification", description: "Added specialized equipment for various cargo types beyond produce" },
    { year: "2010s", title: "Electric Vehicle Focus", description: "Pivoted to specialize in electric dirt bikes, motorcycles, and heavy machinery" },
    { year: "2020s", title: "Global Network", description: "Established worldwide shipping capabilities serving dealers across USA, Canada, UK, and Europe" }
  ]

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Counter animation effect
  useEffect(() => {
    if (!hasAnimated || !isClient) return

    const animateCounters = () => {
      stats.forEach((stat, index) => {
        let start = 0
        const end = stat.number
        const duration = 2000
        const increment = end / (duration / 16)

        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            setCounters(prev => {
              const newCounters = [...prev]
              newCounters[index] = end
              return newCounters
            })
            clearInterval(timer)
          } else {
            setCounters(prev => {
              const newCounters = [...prev]
              newCounters[index] = Math.floor(start)
              return newCounters
            })
          }
        }, 16)
      })
    }

    animateCounters()
  }, [hasAnimated, isClient])

  // Intersection Observer for stats animation
  useEffect(() => {
    if (!isClient) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.1 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated, isClient])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-burgundy py-16 overflow-hidden">        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
             style={{backgroundImage: "url('/images/ceo.jpg')"}}></div>
        <div className="absolute inset-0 bg-burgundy-dark/30"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Building2 className="w-12 h-12 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-gold-secondary">About Us</h1>
          </div>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Discover our journey, mission, and the dedicated team that makes global logistics simple and reliable.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Overview */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-gold-secondary text-sm font-medium uppercase tracking-wider">
              <div className="w-8 h-0.5 bg-gold-secondary"></div>
              <span>Our Story</span>
              <Plane className="w-4 h-4" />
              <div className="w-8 h-0.5 bg-gold-secondary"></div>
            </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Building Bridges Through
              <span className="text-gold-secondary"> Logistics Excellence</span>
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Founded in 1928 as a California-based refrigerated carrier specializing in fresh produce transportation, 
              Certified Freight Logistics has strategically evolved into a global logistics leader for modern transportation 
              needs. While we maintain our heritage in perishable goods shipping through our Western Region operations, 
              our core expertise now focuses on worldwide shipping of electric dirt bikes, motorcycles, vehicles, and heavy machinery.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              Working with hundreds of electric dirt bike dealers of reputable brands such as Altis Powersport, Surron, 
              Talaria, E-Ride Pro, Ebox, Artic Leopard, 79Bikes, and many more. We offer very fast, reliable and cheap 
              transportation services within USA, Canada, UK, Europe and almost worldwide. This transformation leverages 
              our nine decades of transportation knowledge to meet today's mobility demands, combining our original 
              commitment to careful handling with specialized solutions for high-value equipment.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              We now operate a diversified fleet capable of handling everything from temperature-sensitive goods to 
              oversized industrial equipment, supported by the same experienced team and advanced tracking systems 
              that built our reputation. Whether moving vintage motorcycles to collectors or delivering heavy machinery 
              to job sites, we apply the same precision once reserved for perfect peaches to today's most demanding freight challenges.
            </p>

            <div className="flex items-center space-x-4 pt-4">
              {/* <button className="bg-gold-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-gold-dark transition-colors flex items-center space-x-2 group">
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button> */}
              <a href="/contact" className="border-2 border-gold-secondary text-gold-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gold-secondary hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg"
                    alt="Warehouse operations"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="https://images.pexels.com/photos/3856440/pexels-photo-3856440.jpeg"
                    alt="Logistics team"
                    width={300}
                    height={150}
                    className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="https://images.pexels.com/photos/1624695/pexels-photo-1624695.jpeg"
                    alt="Global shipping"
                    width={300}
                    height={150}
                    className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="https://images.pexels.com/photos/8566538/pexels-photo-8566538.jpeg"
                    alt="Modern logistics facility"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
              {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-gold-secondary text-white p-4 rounded-full shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">96+</div>
                <div className="text-xs">Years</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gold-secondary p-3 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To provide innovative, reliable, and sustainable logistics solutions that empower businesses 
                to reach their global potential while contributing to economic growth and community development.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-burgundy-primary" />
                  <span className="text-gray-700">Customer-centric approach</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-burgundy-primary" />
                  <span className="text-gray-700">Sustainable practices</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-burgundy-primary" />
                  <span className="text-gray-700">Innovation-driven solutions</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="bg-burgundy-primary p-3 rounded-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be the world's most trusted logistics partner, setting the standard for excellence in 
                global transportation and supply chain management through technology, innovation, and 
                unwavering commitment to our customers.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-gold-secondary" />
                  <span className="text-gray-700">Global leadership</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-gold-secondary" />
                  <span className="text-gray-700">Technological excellence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-gold-secondary" />
                  <span className="text-gray-700">Industry transformation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div ref={statsRef} className="bg-gradient-to-r from-burgundy-primary to-burgundy-dark rounded-2xl p-8 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gold-secondary mb-4">Our Achievements</h2>
            <p className="text-black-secondary max-w-2xl mx-auto">
              Numbers that speak to our commitment to excellence and the trust our clients place in us.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-gold-secondary" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gold-secondary mb-2">
                    {isClient ? counters[index] : stat.number}{stat.suffix}
                  </div>
                  <div className="text-gold-secondary">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Company Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 text-gold-secondary text-sm font-medium uppercase tracking-wider mb-4">
              <div className="w-8 h-0.5 bg-gold-secondary"></div>
              <span>Our Values</span>
              <Heart className="w-4 h-4" />
              <div className="w-8 h-0.5 bg-gold-secondary"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Drives Us Forward</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide every decision we make and every service we provide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`${value.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      <DirtBikeTransport/>
        {/* Leadership Team */}
        {/* <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 text-gold-secondary text-sm font-medium uppercase tracking-wider mb-4">
              <div className="w-8 h-0.5 bg-gold-secondary"></div>
              <span>Leadership Team</span>
              <Users className="w-4 h-4" />
              <div className="w-8 h-0.5 bg-gold-secondary"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leaders</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced professionals driving innovation and excellence in global logistics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-gold-secondary font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
                {/* Company Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center space-x-4 text-gold-secondary text-sm font-medium uppercase tracking-wider mb-4">
              <div className="w-8 h-0.5 bg-gold-secondary"></div>
              <span>Our Journey</span>
              <Clock className="w-4 h-4" />
              <div className="w-8 h-0.5 bg-gold-secondary"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Company Timeline</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Key milestones that have shaped our company's growth and success over the years.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line - Desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gold-light"></div>
            
            {/* Timeline line - Mobile */}
            <div className="md:hidden absolute left-6 top-0 w-0.5 h-full bg-gold-secondary"></div>
            
            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-start md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Mobile Layout */}
                  <div className="md:hidden flex items-start w-full">
                    {/* Timeline dot and connector */}
                    <div className="flex flex-col items-center mr-4 flex-shrink-0">
                      <div className="w-3 h-3 bg-gold-secondary rounded-full border-2 border-white shadow-md mb-1 relative z-10"></div>
                      <div className="w-8 h-0.5 bg-gold-secondary"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="bg-gradient-to-br from-cream-accent to-orange-100/50 p-4 rounded-xl border border-orange-200/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center mb-3">
                          <div className="bg-gold-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                            {milestone.year}
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{milestone.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-cream-accent p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                      <div className="text-2xl font-bold text-gold-secondary mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot - Desktop */}
                  <div className="hidden md:block relative z-10 w-4 h-4 bg-gold-secondary rounded-full border-4 border-white shadow-lg"></div>
                  
                  <div className="hidden md:block w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}