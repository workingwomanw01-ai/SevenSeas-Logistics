"use client"

import { useState } from "react"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  User, 
  Building, 
  MessageSquare,
  Globe,
  Headphones,
  Shield,
  CheckCircle,
  ArrowRight
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    service: "",
    message: "",
    priority: "standard"
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const offices = [    {
      name: "Headquarters - Santa Maria",
      address: "1344 White Ct, Santa Maria, CA 93458, United States",
      phone: "+1 (209) 353-3619",
      email: "info@certifiedfreightlogistic.com",
      hours: "Mon - Fri: 8:00 AM - 6:00 PM",
      type: "Headquarters"
    },
    {
      name: "Washington Office - Sumner",
      address: "4504 E Valley Hwy E, Sumner, Washington 98390, US",
      phone: "+1 (209) 353-3619",
      email: "info@certifiedfreightlogistic.com", 
      hours: "Mon - Fri: 7:00 AM - 5:00 PM",
      type: "Regional Office"    },{
      name: "European Office - London",
      address: "15 Canary Wharf, London E14 5JP, UK",
      phone: "+44 20 7123 4567",
      email: "info@certifiedfreightlogistic.com",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM GMT",
      type: "International Office"
    },
    {
      name: "Asia Pacific - Singapore",
      address: "1 Marina Boulevard, Singapore 018989",
      phone: "+65 6123 4567",
      email: "info@certifiedfreightlogistic.com",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM SGT",
      type: "Regional Hub"
    }
  ]

  const services = [
    "Air Freight",
    "Sea Freight", 
    "Land Transport",
    "Warehousing",
    "Supply Chain Management",
    "Customs Clearance",
    "Insurance",
    "Consulting",
    "Other"
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our logistics experts",
      contact: "+1 (209) 353-3619",
      availability: "24/7 Emergency Support",
      color: "bg-blue-500"
    },    {
      icon: Mail,
      title: "Email Us", 
      description: "Send us your detailed requirements",
      contact: "info@certifiedfreightlogistic.com",
      availability: "Response within 2 hours",
      color: "bg-green-500"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant support from our team",
      contact: "Available on www.certifiedfreightlogistic.com",
      availability: "Mon - Fri: 8AM - 8PM",
      color: "bg-purple-500"
    },
    {
      icon: Globe,
      title: "Global Support",
      description: "Worldwide customer service network",
      contact: "25+ Countries",
      availability: "Local language support",
      color: "bg-orange-500"
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus("success")
      setIsSubmitting(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        service: "",
        message: "",
        priority: "standard"
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#8b1538] to-[#6b1129] py-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: "url('/images/step-04.jpg')"
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#8b1538]/30" />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Headphones className="w-12 h-12 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-[#c9a96e]">
              Contact Us
            </h1>
          </div>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Ready to optimize your logistics? Our expert team is here to help you find the perfect shipping solution for your business needs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-3">{method.description}</p>
                <p className="text-lg font-semibold text-[#8b1538] mb-2 break-words">{method.contact}</p>
                <p className="text-sm text-gray-500">{method.availability}</p>
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-8">
                <Send className="w-6 h-6 text-[#c9a96e]" />
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              </div>

              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <p className="text-green-700 font-medium">Message sent successfully! We'll get back to you within 2 hours.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                        required
                      />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                        required
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                      />
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Enter your company name"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                      />
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Inquiry Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
                      Priority Level
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                    >
                      <option value="standard">Standard</option>
                      <option value="urgent">Urgent (within 24 hours)</option>
                      <option value="emergency">Emergency (ASAP)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your inquiry"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Please provide detailed information about your logistics requirements..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#c9a96e] hover:bg-[#b8965a] disabled:bg-[#c9a96e]/50 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Contact</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Emergency Hotline</p>
                    <p className="font-semibold text-gray-900">+1 (800) 592-5906</p>
                  </div>
                </div>                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">General Inquiries</p>
                    <p className="font-semibold text-gray-900">info@certifiedfreightlogistic.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Security Issues</p>
                    <p className="font-semibold text-gray-900">security@certifiedfreightlogistic.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-[#8b1538] rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-[#c9a96e]" />
                <h3 className="text-xl font-bold">Business Hours</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">Emergency Only</span>
                </div>
                <div className="border-t border-[#6b1129] pt-3 mt-4">
                  <div className="flex justify-between">
                    <span>24/7 Support</span>
                    <span className="font-semibold text-[#c9a96e]">Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-[#c9a96e]/10 border border-[#c9a96e]/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#8b1538] mb-4">Response Time</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">Standard inquiries: <strong>2 hours</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">Urgent requests: <strong>30 minutes</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">Emergency issues: <strong>Immediate</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Global Offices</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              With offices worldwide, we're always close to your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-5 h-5 text-[#c9a96e]" />
                  <span className="text-sm font-medium text-[#c9a96e] px-2 py-1 bg-[#c9a96e]/10 rounded-full">
                    {office.type}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3">{office.name}</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{office.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 font-medium">{office.phone}</span>
                  </div>
                    <div className="flex items-start space-x-2">
                    <Mail className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-900 font-medium text-xs break-all">{office.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#8b1538] to-[#6b1129] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Shipping?</h2>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Don't wait! Get your personalized logistics solution today. Our experts are standing by to help optimize your supply chain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#c9a96e] hover:bg-[#b8965a] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>Get Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#8b1538] px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}