import { Zap, Building2, Headphones, Truck, ArrowUp } from "lucide-react"

export default function Component() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-burgundy-primary to-teal-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M200 100L400 200L600 150L800 250L1000 200L1200 300" stroke="currentColor" strokeWidth="2" />
          <path d="M0 200L200 300L400 250L600 350L800 300L1000 400L1200 350" stroke="currentColor" strokeWidth="2" />
          <path d="M100 300L300 400L500 350L700 450L900 400L1100 500" stroke="currentColor" strokeWidth="2" />
          <circle cx="1100" cy="150" r="80" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="1200" cy="250" r="60" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="1050" y="300" width="100" height="80" stroke="currentColor" strokeWidth="2" fill="none" rx="8" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2 text-gold-secondary">
            <Zap className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wider uppercase">TRUSTED TRANSPORT SERVICE</span>
          </div>
          <button className="bg-gold-secondary hover:bg-gold-dark text-white px-8 py-3 font-semibold tracking-wider">
            ALL SERVICES
          </button>
        </div>

        {/* Main Heading */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl">
            Logistics Features That
            <br />
            We Can Provideing
          </h1>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg p-12 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Warehouse */}
            <div className="flex flex-col items-start">
              <div className="w-16 h-16 bg-cream-accent rounded-lg flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-gold-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Warehouse</h3>
              <p className="text-gray-600 leading-relaxed">Warehouse: hub for storage, distribution, and logistics.</p>
            </div>

            {/* Support 24/7 */}
            <div className="flex flex-col items-start">
              <div className="w-16 h-16 bg-cream-accent rounded-lg flex items-center justify-center mb-6">
                <Headphones className="w-8 h-8 text-gold-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Support 24/7</h3>
              <p className="text-gray-600 leading-relaxed">Warehouse: hub for storage, distribution, and logistics.</p>
            </div>

            {/* Cargo Insurance */}
            <div className="flex flex-col items-start">
              <div className="w-16 h-16 bg-cream-accent rounded-lg flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-gold-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Cargo
                <br />
                Insurance
              </h3>
              <p className="text-gray-600 leading-relaxed">Warehouse: hub for storage, distribution, and logistics.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  )
}
