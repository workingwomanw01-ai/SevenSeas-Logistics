"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Shield, MapPin, Phone, CheckCircle, Star } from "lucide-react";

export default function FastPersonalDeliveryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-[#0a3a3a] to-[#1a5a5a] overflow-hidden">
        <div className="absolute inset-0">          <Image
            src="/images/bike1.jpeg"
            alt="Fast Personal Delivery"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Fast Personal Delivery
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Quick and reliable door-to-door delivery for personal packages and documents
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
                Our Fast Personal Delivery service is designed for individuals and businesses who need quick, 
                reliable transportation of personal items, documents, and small packages. Whether you're sending 
                important documents across town or delivering a special gift, we ensure your items reach their 
                destination safely and on time.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                With same-day and next-day delivery options, real-time tracking, and professional handling, 
                we make personal delivery simple and stress-free. Our experienced drivers and secure vehicles 
                ensure your packages are treated with the utmost care.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-[#0a3a3a] mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Same-Day Delivery</h3>
                    <p className="text-gray-600">Urgent deliveries completed within hours of pickup</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Real-Time Tracking</h3>
                    <p className="text-gray-600">Track your package every step of the way</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Secure Handling</h3>
                    <p className="text-gray-600">Professional care for all your valuable items</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Flexible Scheduling</h3>
                    <p className="text-gray-600">Convenient pickup and delivery times</p>
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
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Book Your Delivery</h3>
                    <p className="text-gray-600">Schedule your pickup online or by phone with delivery details</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gold-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Package Pickup</h3>
                    <p className="text-gray-600">Our driver collects your package at the scheduled time</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gold-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Track Progress</h3>
                    <p className="text-gray-600">Monitor your delivery in real-time through our tracking system</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gold-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a3a3a] mb-2">Safe Delivery</h3>
                    <p className="text-gray-600">Your package is delivered safely to the recipient</p>
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
                  <span className="text-gray-600">Same-day delivery available</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gold-secondary mr-3" />
                  <span className="text-gray-600">Fully insured packages</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gold-secondary mr-3" />
                  <span className="text-gray-600">Local and regional coverage</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gold-secondary mr-3" />
                  <span className="text-gray-600">24/7 customer support</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0a3a3a] rounded-lg p-6 text-white mb-8">
              <h3 className="text-xl font-bold mb-4">Get a Quote</h3>
              <p className="mb-4">Ready to schedule your fast personal delivery?</p>
              <Link 
                href="/quote"
                className="bg-gold-secondary hover:bg-gold-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-block w-full text-center"
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
                  <p className="text-gray-600 text-sm">"Fast, reliable service. My documents were delivered the same day!"</p>
                  <p className="text-gray-500 text-xs mt-1">- Sarah M.</p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">"Professional drivers and excellent tracking system."</p>
                  <p className="text-gray-500 text-xs mt-1">- John D.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
