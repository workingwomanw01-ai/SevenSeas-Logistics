import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const services = [
    { name: "Air Freight", href: "/services#air-freight" },
    { name: "Ocean Freight", href: "/services#ocean-freight" },
    { name: "Land Transport", href: "/services#land-transport" },
  ]

  const careers = [
    { name: "Current Openings", href: "/careers" },
    { name: "Join Our Team", href: "/careers" },
    { name: "Career Growth", href: "/careers" },
  ]
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Track Shipment", href: "/tracking" },
    { name: "Get Quote", href: "/quote" },
    { name: "Contact Us", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Resources", href: "/resources" },
    { name: "Blog", href: "/blogs" },
  ]
    const socialLinks = [
    { name: "Facebook", href: "https://facebook.com/certifiedfreightlogistic", icon: Facebook },
    { name: "Twitter", href: "https://twitter.com/certifiedfreightlogistic", icon: Twitter },
    { name: "Instagram", href: "https://instagram.com/certifiedfreightlogistic", icon: Instagram },
    { name: "LinkedIn", href: "https://linkedin.com/company/certifiedfreightlogistic", icon: Linkedin },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-gold py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-cream-light text-lg">
                Get the latest updates on logistics trends and special offers.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 max-w-md mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-burgundy-dark hover:bg-burgundy-primary text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className=" p-3 rounded-lg">
                  <Image
                    src="/images/cel1.png"
                    alt="Certified Freight Logistics Logo"
                    width={220}
                    height={58}
                    className="object-contain"
                  />
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                We provide comprehensive logistics solutions with a focus on reliability, 
                efficiency, and customer satisfaction. Your trusted partner for global shipping.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 hover:bg-gold-secondary rounded-lg flex items-center justify-center transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-gray-300 hover-gold-text transition-colors duration-200 flex items-center space-x-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>{service.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>            </div>

            {/* Careers */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Careers</h3>
              <ul className="space-y-3">
                {careers.map((career) => (
                  <li key={career.name}>
                    <Link
                      href={career.href}
                      className="text-gray-300 hover-gold-text transition-colors duration-200 flex items-center space-x-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>{career.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover-gold-text transition-colors duration-200 flex items-center space-x-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Contact Info</h3>
              <div className="space-y-4">                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gold-secondary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">
                      1344 White Ct<br />
                      Santa Maria, CA 93458<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gold-secondary flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">+1 (209) 353-3619</p>
                  </div>
                </div>                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gold-secondary flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">info@certifiedfreightlogistic.com</p>
                    <p className="text-gray-300">support@certifiedfreightlogistic.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gold-secondary flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">Mon - Fri: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-300">Sat: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Certified Freight Logistics. All rights reserved.
            </div>            <div className="flex space-x-6 text-sm">
              <Link href="/about" className="text-gray-400 hover-gold-text transition-colors duration-200">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-400 hover-gold-text transition-colors duration-200">
                Contact
              </Link>
              <Link href="/services" className="text-gray-400 hover-gold-text transition-colors duration-200">
                Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}