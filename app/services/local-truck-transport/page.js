"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Shield, MapPin, Phone, CheckCircle, Star, Truck } from "lucide-react";

export default function LocalTruckTransportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-gold-secondary to-gold-dark overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/land-freight.jpg"
            alt="Local Truck Transport"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Local Truck Transport
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Comprehensive ground transportation for heavy cargo and bulk shipments
            </p>
            <Link 
              href="/"
              className="inline-flex items-center text-white hover:text-[#0a3a3a] transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-[#0a3a3a] mb-6">Service Overview</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our Local Truck Transport service provides comprehensive ground transportation solutions 
                for heavy cargo, bulk shipments, and oversized items within regional areas. Whether you're 
                moving industrial equipment, construction materials, or large household items, our fleet 
                of specialized vehicles and experienced drivers ensure safe and efficient delivery.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We understand that different cargo requires different handling approaches. That's why we 
                offer specialized equipment including flatbed trucks, refrigerated vehicles, and custom 
                transport solutions for fragile or oversized items. Our regional network ensures timely 
                delivery within your local area and surrounding regions.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-[#0a3a3a] mb-6">Vehicle Fleet</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <Truck className="h-8 w-8 text-gold-secondary mb-3" />
                  <h3 className="font-semibold text-[#0a3a3a] mb-2">Standard Trucks</h3>
                  <p className="text-gray-600">Box trucks and cargo vans for general freight and packages</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <Truck className="h-8 w-8 text-gold-secondary mb-3" />
                  <h3 className="font-semibold text-[#0a3a3a] mb-2">Flatbed Trucks</h3>
                  <p className="text-gray-600">Open deck vehicles for oversized and heavy machinery</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <Truck className="h-8 w-8 text-gold-secondary mb-3" />
                  <h3 className="font-semibold text-[#0a3a3a] mb-2">Refrigerated Trucks</h3>
                  <p className="text-gray-600">Temperature-controlled transport for sensitive cargo</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <Truck className="h-8 w-8 text-gold-secondary mb-3" />
                  <h3 className="font-semibold text-[#0a3a3a] mb-2">Heavy Haul</h3>
                  <p className="text-gray-600">Specialized equipment for extra-heavy loads</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-[#0a3a3a] mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Specialized Equipment</h3>
                    <p className="text-gray-600">Custom vehicles for every type of cargo</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Regional Coverage</h3>
                    <p className="text-gray-600">Comprehensive service within regional areas</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Fragile Item Care</h3>
                    <p className="text-gray-600">Special handling for delicate and valuable items</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Loading Assistance</h3>
                    <p className="text-gray-600">Professional loading and unloading services</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-[#0a3a3a] mb-6">Service Process</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gold-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Cargo Assessment</h3>
                    <p className="text-gray-600">We evaluate your cargo to determine the best transport solution</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gold-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Vehicle Selection</h3>
                    <p className="text-gray-600">Choose the appropriate truck and equipment for your needs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gold-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Professional Loading</h3>
                    <p className="text-gray-600">Our team safely loads your cargo with proper securing</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gold-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Safe Transport</h3>
                    <p className="text-gray-600">Efficient delivery with real-time tracking and updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-[#0a3a3a] mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gold-secondary mr-3" />
                  <span className="text-gray-600">Flexible scheduling options</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gold-secondary mr-3" />
                  <span className="text-gray-600">Comprehensive cargo insurance</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gold-secondary mr-3" />
                  <span className="text-gray-600">Regional and local coverage</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gold-secondary mr-3" />
                  <span className="text-gray-600">Expert logistics support</span>
                </div>
              </div>
            </div>

            <div className="bg-gold-secondary rounded-lg p-6 text-white mb-8">
              <h3 className="text-xl font-bold mb-4">Get a Quote</h3>
              <p className="mb-4">Need truck transport for your cargo?</p>
              <Link 
                href="/quote"
                className="bg-[#0a3a3a] hover:bg-[#1a5a5a] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-block w-full text-center"
              >
                Request Quote
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#0a3a3a] mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">"Excellent service for moving our heavy machinery. Professional and reliable!"</p>
                  <p className="text-gray-500 text-xs mt-1">- Mike R.</p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">"The team handled our fragile equipment with great care."</p>
                  <p className="text-gray-500 text-xs mt-1">- Lisa K.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
