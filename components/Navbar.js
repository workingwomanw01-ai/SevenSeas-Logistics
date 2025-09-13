"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Mail, MapPin, Clock, ChevronDown } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Blogs", href: "/blogs" },
    { name: "Careers", href: "/careers" },
    { name: "Tracking", href: "/tracking" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">      {/* Top Bar */}
      <div className="bg-gradient-burgundy text-white py-2 px-4 hidden xl:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4 xl:space-x-6 overflow-hidden">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Phone className="w-4 h-4" />
              <span className="whitespace-nowrap">+1 (209) 353-3619</span>
            </div>            <div className="flex items-center space-x-2 flex-shrink-0">
              <Mail className="w-4 h-4" />
              <span className="whitespace-nowrap">info@sevenseaslogistic.com</span>
            </div>
            {/* <div className="flex items-center space-x-2 flex-shrink-0 hidden 2xl:flex">
              <MapPin className="w-4 h-4" />
              <span className="whitespace-nowrap">1344 White Ct, Santa Maria, CA 93458</span>
            </div> */}
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Clock className="w-4 h-4" />
            <span className="whitespace-nowrap">Mon - Fri: 8:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>      {/* Main Navbar */}
      <nav className={`transition-all duration-300 w-full overflow-hidden ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-white/95 backdrop-blur-sm py-4"
      }`}>        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="flex justify-between items-center min-w-0">            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
              <Image
                src="/images/cel1.png"
                alt="Certified Freight Logistics Logo"
                width={250}
                height={140}
                className="object-contain w-[220px] sm:w-[240px] md:w-[240px] lg:w-[250px] h-[68px] sm:h-auto"
              />
            </Link>{/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-8 overflow-hidden">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >                  <Link
                    href={item.href}
                    className={`font-medium transition-all duration-200 flex items-center space-x-1 relative group ${
                      pathname === item.href 
                        ? "text-burgundy-primary" 
                        : "text-gray-700 hover-burgundy-text"
                    }`}
                  >
                    <span className="relative">
                      {item.name}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-burgundy-primary transition-all duration-300 ${
                        pathname === item.href 
                          ? "w-full" 
                          : "w-0 group-hover:w-full"
                      }`}></span>
                    </span>
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 z-50">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-cream-accent hover-burgundy-text transition-colors duration-200"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
              <Link
                href="/quote"
                className="bg-gradient-gold hover:bg-gold-dark text-white px-4 xl:px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-sm xl:text-base whitespace-nowrap shadow-gold"
              >
                Get Quote
              </Link>
              <Link
                href="/tracking"
                className="border-2 border-burgundy-primary text-burgundy-primary hover:bg-burgundy-primary hover:text-white px-4 xl:px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-sm xl:text-base whitespace-nowrap"
              >
                Track Shipment
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>                  <Link
                    href={item.href}
                    className={`block font-medium py-2 transition-all duration-200 relative group ${
                      pathname === item.href 
                        ? "text-burgundy-primary" 
                        : "text-gray-700 hover-burgundy-text"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative">
                      {item.name}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-burgundy-primary transition-all duration-300 ${
                        pathname === item.href 
                          ? "w-full" 
                          : "w-0 group-hover:w-full"
                      }`}></span>
                    </span>
                  </Link>
                  {item.dropdown && (
                    <div className="pl-4 space-y-2 mt-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block text-gray-600 hover-burgundy-text py-1 transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-3">
                <Link
                  href="/quote"
                  className="block w-full bg-gradient-gold hover:bg-gold-dark text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-gold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Quote
                </Link>
                <Link
                  href="/tracking"
                  className="block w-full border-2 border-burgundy-primary text-burgundy-primary hover:bg-burgundy-primary hover:text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Track Shipment
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}