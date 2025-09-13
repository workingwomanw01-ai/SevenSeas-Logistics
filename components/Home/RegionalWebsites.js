import { Languages } from 'lucide-react';

export default function RegionalWebsites() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Languages className="h-8 w-8 text-gold-secondary mr-3" />
          <h2 className="text-3xl font-bold text-[#0a3a3a]">Our Regional Websites & Languages</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow flex flex-col">
            <span className="font-semibold text-[#0a3a3a] mb-2">United States</span>
            <a href="https://us.certifiedfreightlogistic.com" className="text-blue-600 hover:underline">us.certifiedfreightlogistic.com</a>
            <span className="text-gray-500 text-sm mt-1">English, Spanish</span>
          </div>
          <div className="bg-white rounded-lg p-6 shadow flex flex-col">
            <span className="font-semibold text-[#0a3a3a] mb-2">Europe</span>
            <a href="https://eu.certifiedfreightlogistic.com" className="text-blue-600 hover:underline">eu.certifiedfreightlogistic.com</a>
            <span className="text-gray-500 text-sm mt-1">English, German, French</span>
          </div>
          <div className="bg-white rounded-lg p-6 shadow flex flex-col">
            <span className="font-semibold text-[#0a3a3a] mb-2">Asia Pacific</span>
            <a href="https://apac.certifiedfreightlogistic.com" className="text-blue-600 hover:underline">apac.certifiedfreightlogistic.com</a>
            <span className="text-gray-500 text-sm mt-1">English, Chinese, Japanese</span>
          </div>
          <div className="bg-white rounded-lg p-6 shadow flex flex-col">
            <span className="font-semibold text-[#0a3a3a] mb-2">Middle East</span>
            <a href="https://me.certifiedfreightlogistic.com" className="text-blue-600 hover:underline">me.certifiedfreightlogistic.com</a>
            <span className="text-gray-500 text-sm mt-1">English, Arabic</span>
          </div>
        </div>
      </div>
    </section>
  );
}