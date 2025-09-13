import { Languages } from 'lucide-react';
import Image from 'next/image';

export default function RegionalWebsites() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-stretch gap-10">
          {/* Map Image */}
          <div className="w-full md:w-7/12 flex justify-center items-center">
            <Image
              src="/images/shipping-map.png"
              alt="International shipping map"
              width={700}
              height={420}
              className="rounded"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          {/* Text */}
          <div className="w-full md:w-5/12 flex flex-col justify-between px-3 md:px-0">
            <div>
              <div className="flex items-center mb-8">
                <Languages className="h-10 w-10 text-[#bfa14a] mr-4" />
                <h2 className="text-4xl font-bold mb-0" style={{ color: '#bfa14a' }}>
                  Our Regional Websites & Languages
                </h2>
              </div>
              <p className="mb-4 text-xl leading-relaxed">
                We have region-specific websites to support our international customers. Plus, our customer service team offer 24-hour advice in various languages, including Thai, Cantonese, Mandarin, Afrikaans and English.
              </p>
              <p className="mb-4 text-xl">
                Please make your selection below:
              </p>
            </div>
          </div>
        </div>
        {/* Regions and Languages List */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-[#0a3a3a] text-xl px-3 md:px-0">
          <div>
            <h3 className="font-semibold text-lg mb-2">Australia</h3>
            <ul>
              <li className="text-[#800020]">English</li>
              <li className="text-[#800020]">中文</li>
              <li className="text-[#800020]">ไทย</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Canada</h3>
            <ul>
              <li className="text-[#800020]">English</li>
              <li className="text-[#800020]">中文</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">China Mainland</h3>
            <ul>
              <li className="text-[#800020]">English</li>
              <li className="text-[#800020]">中文</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Europe</h3>
            <ul>
              <li className="text-[#800020]">Netherlands - English</li>
              <li className="text-[#800020]">Ireland - English</li>
              <li className="text-[#800020]">Germany - English</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Hong Kong SAR</h3>
            <ul>
              <li className="text-[#800020]">English</li>
              <li className="text-[#800020]">繁體中文</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Malaysia</h3>
            <ul>
              <li className="text-[#800020]">English</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">New Zealand</h3>
            <ul>
              <li className="text-[#800020]">English</li>
              <li className="text-[#800020]">中文</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Singapore</h3>
            <ul>
              <li className="text-[#800020]">English</li>
              <li className="text-[#800020]">中文</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">South Africa</h3>
            <ul>
              <li className="text-[#800020]">English</li>
              <li className="text-[#800020]">中文</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Taiwan</h3>
            <ul>
              <li className="text-[#800020]">English</li>
              <li className="text-[#800020]">中文</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Thailand</h3>
            <ul>
              <li className="text-[#800020]">English</li>
              <li className="text-[#800020]">ไทย</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">United Kingdom</h3>
            <ul>
              <li className="text-[#800020]">English</li>
              <li className="text-[#800020]">中文</li>
              <li className="text-[#800020]">ไทย</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">United States</h3>
            <ul>
              <li className="text-[#800020]">English</li>
              <li className="text-[#800020]">中文</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}