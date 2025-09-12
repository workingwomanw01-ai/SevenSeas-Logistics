"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Shield, MapPin, Phone, CheckCircle, Star, Globe, Plane, Ship } from "lucide-react";

export default function InternationalTransportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-[#0a3a3a] to-[#1a5a5a] overflow-hidden">
        <div className="absolute inset-0">          <Image
            src="/images/land1.jpeg"
            alt="International Transport"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              International Transport
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Global freight solutions with air, sea, and land options
            </p>
            <Link 
              href="/"
              className="inline-flex items-center text-white hover:text-gold-secondary transition-colors duration-200"
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
                Our International Transport service connects you to global markets through comprehensive 
                freight solutions. We offer air, sea, and land transportation options to move your cargo 
                efficiently across international borders. Whether you're importing raw materials, exporting 
                finished products, or managing global supply chains, we provide end-to-end logistics support.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                With extensive experience in international trade regulations, customs procedures, and 
                global logistics networks, we ensure your shipments comply with all requirements and 
                reach their destinations on time. Our team handles all documentation, customs clearance, 
                and regulatory compliance, making international shipping simple and stress-free.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-[#0a3a3a] mb-6">Transport Modes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <Plane className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-[#0a3a3a] mb-2">Air Freight</h3>
                  <p className="text-gray-600 text-sm">Fast delivery for time-sensitive shipments worldwide</p>
                  <ul className="text-xs text-gray-500 mt-3 space-y-1">
                    <li>• Express delivery (1-3 days)</li>
                    <li>• Standard air (3-5 days)</li>
                    <li>• Temperature controlled</li>
                  </ul>
                </div>
                <div className="bg-teal-50 rounded-lg p-6 text-center">
                  <Ship className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-[#0a3a3a] mb-2">Ocean Freight</h3>
                  <p className="text-gray-600 text-sm">Cost-effective solution for large volume shipments</p>
                  <ul className="text-xs text-gray-500 mt-3 space-y-1">
                    <li>• FCL (Full Container Load)</li>
                    <li>• LCL (Less Container Load)</li>
                    <li>• Bulk cargo handling</li>
                  </ul>
                </div>
                <div className="bg-cream-accent rounded-lg p-6 text-center">
                  <Globe className="h-12 w-12 text-gold-dark mx-auto mb-4" />
                  <h3 className="font-semibold text-[#0a3a3a] mb-2">Multi-Modal</h3>
                  <p className="text-gray-600 text-sm">Combined transport solutions for optimal efficiency</p>
                  <ul className="text-xs text-gray-500 mt-3 space-y-1">
                    <li>• Sea-Air combinations</li>
                    <li>• Road-Rail connections</li>
                    <li>• Door-to-door service</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-[#0a3a3a] mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Customs Clearance</h3>
                    <p className="text-gray-600">Complete customs documentation and clearance services</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Global Network</h3>
                    <p className="text-gray-600">Worldwide coverage with trusted partner network</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Documentation Support</h3>
                    <p className="text-gray-600">Expert handling of all international trade documents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Compliance Management</h3>
                    <p className="text-gray-600">Ensuring adherence to international regulations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-[#0a3a3a] mb-6">Service Process</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#0a3a3a] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Shipment Planning</h3>
                    <p className="text-gray-600">Analyze requirements and recommend optimal transport solution</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#0a3a3a] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Documentation</h3>
                    <p className="text-gray-600">Prepare all required international shipping documents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#0a3a3a] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Customs Clearance</h3>
                    <p className="text-gray-600">Handle all customs procedures at origin and destination</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#0a3a3a] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Global Delivery</h3>
                    <p className="text-gray-600">Safe transport and delivery to final destination</p>
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
                  <Globe className="h-5 w-5 text-gold-secondary mr-3" />
                  <span className="text-gray-600">190+ countries served</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gold-secondary mr-3" />
                  <span className="text-gray-600">Full cargo insurance</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gold-secondary mr-3" />
                  <span className="text-gray-600">24/7 tracking available</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gold-secondary mr-3" />
                  <span className="text-gray-600">Dedicated account managers</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0a3a3a] to-[#1a5a5a] rounded-lg p-6 text-white mb-8">
              <h3 className="text-xl font-bold mb-4">Get a Quote</h3>
              <p className="mb-4">Ready to ship internationally? Get a custom quote for your cargo.</p>
              <Link 
                href="/quote"
                className="bg-gold-secondary hover:bg-gold-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-block w-full text-center"
              >
                Request Quote
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-[#0a3a3a] mb-4">Popular Destinations</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Europe</span>
                  <span className="text-[#0a3a3a] font-semibold">3-5 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Asia Pacific</span>
                  <span className="text-[#0a3a3a] font-semibold">2-4 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Middle East</span>
                  <span className="text-[#0a3a3a] font-semibold">2-3 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Americas</span>
                  <span className="text-[#0a3a3a] font-semibold">1-3 days</span>
                </div>
              </div>
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
                  <p className="text-gray-600 text-sm">"Seamless international shipping. They handled all customs perfectly!"</p>
                  <p className="text-gray-500 text-xs mt-1">- David L.</p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">"Excellent global network and reliable delivery times."</p>
                  <p className="text-gray-500 text-xs mt-1">- Maria S.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
