"use client"

import { useState } from "react"
import { Package, Truck, Ship, Plane, Calculator, MapPin, Weight, Calendar } from "lucide-react"

export default function QuotePage() {
  const [formData, setFormData] = useState({
    serviceType: "",
    origin: "",
    destination: "",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: ""
    },
    shipmentDate: "",
    priority: "standard",
    contactInfo: {
      name: "",
      email: "",
      phone: "",
      company: ""
    }
  })

  const [quote, setQuote] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const serviceTypes = [
    {
      id: "air-freight",
      name: "Air Freight",
      icon: <Plane className="w-6 h-6" />,
      description: "Fast and reliable air transportation",
      timeframe: "1-3 days"
    },
    {
      id: "sea-freight",
      name: "Sea Freight",
      icon: <Ship className="w-6 h-6" />,
      description: "Cost-effective ocean shipping",
      timeframe: "15-45 days"
    },
    {
      id: "land-transport",
      name: "Land Transport",
      icon: <Truck className="w-6 h-6" />,
      description: "Ground transportation services",
      timeframe: "2-7 days"
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const calculateQuote = () => {
    const baseRates = {
      "air-freight": 5.50,
      "sea-freight": 1.20,
      "land-transport": 2.80
    }

    const priorityMultipliers = {
      "standard": 1.0,
      "express": 1.5,
      "overnight": 2.0
    }

    const weight = parseFloat(formData.weight) || 0
    const volume = (parseFloat(formData.dimensions.length) || 0) * 
                  (parseFloat(formData.dimensions.width) || 0) * 
                  (parseFloat(formData.dimensions.height) || 0) / 1000000 // Convert to cubic meters

    const chargeableWeight = Math.max(weight, volume * 167) // Volumetric weight factor
    const baseRate = baseRates[formData.serviceType] || 0
    const priorityMultiplier = priorityMultipliers[formData.priority] || 1

    const basePrice = chargeableWeight * baseRate * priorityMultiplier
    const fuelSurcharge = basePrice * 0.15
    const securityFee = 25
    const handlingFee = 35

    return {
      basePrice: basePrice.toFixed(2),
      fuelSurcharge: fuelSurcharge.toFixed(2),
      securityFee: securityFee.toFixed(2),
      handlingFee: handlingFee.toFixed(2),
      total: (basePrice + fuelSurcharge + securityFee + handlingFee).toFixed(2),
      chargeableWeight: chargeableWeight.toFixed(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const calculatedQuote = calculateQuote()
      setQuote(calculatedQuote)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gold-secondary to-gold-dark py-16 overflow-hidden">        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: "url('/images/step-02.jpg')"
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gold-dark/30" />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Calculator className="w-12 h-12 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Get Your Shipping Quote
            </h1>
          </div>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Get an instant quote for your shipment. Fill out the details below and we'll calculate the best price for your logistics needs.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quote Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Service Type Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Service Type</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {serviceTypes.map((service) => (
                      <div key={service.id} className="relative">
                        <input
                          type="radio"
                          id={service.id}
                          name="serviceType"
                          value={service.id}
                          onChange={handleInputChange}
                          className="sr-only"
                          required
                        />
                        <label
                          htmlFor={service.id}
                          className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.serviceType === service.id
                              ? "border-gold-secondary bg-cream-accent"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`${
                              formData.serviceType === service.id
                                ? "text-gold-secondary"
                                : "text-gray-400"
                            }`}>
                              {service.icon}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{service.name}</p>
                              <p className="text-sm text-gray-600">{service.timeframe}</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Origin and Destination */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="origin" className="block text-sm font-semibold text-gray-700 mb-2">
                      Origin
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleInputChange}
                        placeholder="Enter origin city/country"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-2">
                      Destination
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        placeholder="Enter destination city/country"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Weight and Dimensions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Details</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="weight" className="block text-sm font-semibold text-gray-700 mb-2">
                        Weight (kg)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="weight"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          placeholder="0"
                          min="0"
                          step="0.1"
                          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                        <Weight className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="dimensions.length" className="block text-sm font-semibold text-gray-700 mb-2">
                        Length (cm)
                      </label>
                      <input
                        type="number"
                        id="dimensions.length"
                        name="dimensions.length"
                        value={formData.dimensions.length}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="dimensions.width" className="block text-sm font-semibold text-gray-700 mb-2">
                        Width (cm)
                      </label>
                      <input
                        type="number"
                        id="dimensions.width"
                        name="dimensions.width"
                        value={formData.dimensions.width}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="dimensions.height" className="block text-sm font-semibold text-gray-700 mb-2">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        id="dimensions.height"
                        name="dimensions.height"
                        value={formData.dimensions.height}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipment Date and Priority */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="shipmentDate" className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Shipment Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="shipmentDate"
                        name="shipmentDate"
                        value={formData.shipmentDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="standard">Standard</option>
                      <option value="express">Express (+50%)</option>
                      <option value="overnight">Overnight (+100%)</option>
                    </select>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="contactInfo.name"
                      value={formData.contactInfo.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="email"
                      name="contactInfo.email"
                      value={formData.contactInfo.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="tel"
                      name="contactInfo.phone"
                      value={formData.contactInfo.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      name="contactInfo.company"
                      value={formData.contactInfo.company}
                      onChange={handleInputChange}
                      placeholder="Company Name (Optional)"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gold-secondary hover:bg-gold-dark disabled:bg-orange-300 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-200"
                >
                  {isLoading ? "Calculating..." : "Get Quote"}
                </button>
              </form>
            </div>
          </div>

          {/* Quote Results */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <div className="flex items-center space-x-3 mb-6">
                <Calculator className="w-6 h-6 text-gold-secondary" />
                <h3 className="text-xl font-bold text-gray-900">Quote Summary</h3>
              </div>

              {quote ? (
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Chargeable Weight</span>
                      <span className="font-semibold">{quote.chargeableWeight} kg</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Base Rate</span>
                      <span className="font-semibold">${quote.basePrice}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Fuel Surcharge</span>
                      <span className="font-semibold">${quote.fuelSurcharge}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Security Fee</span>
                      <span className="font-semibold">${quote.securityFee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Handling Fee</span>
                      <span className="font-semibold">${quote.handlingFee}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <span className="text-gold-secondary">${quote.total}</span>
                  </div>
                  <div className="pt-4">
                    <button className="w-full bg-teal-600 hover:bg-burgundy-dark text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200">
                      Book Shipment
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Fill out the form to get your instant quote</p>
                </div>
              )}

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Why Choose Us?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Competitive pricing</li>
                  <li>• Real-time tracking</li>
                  <li>• 24/7 customer support</li>
                  <li>• Global network coverage</li>
                  <li>• Insurance options available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
