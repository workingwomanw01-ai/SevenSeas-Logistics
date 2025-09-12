import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// This is a mock function to simulate fetching blog data
function getBlogPost(id) {
  // In a real app, this would fetch from an API
  const posts = {
    1: {
      title: "Supply Chain Innovation in 2024",
      category: "Supply Chain",
      author: "John Doe",
      date: "January 15, 2024",
      readTime: "5 min read",
      image: "/images/blog1.jpg",
      content: {
        intro: `The logistics and supply chain industry is witnessing unprecedented transformation in 2024,
                driven by technological advancement and changing consumer demands. As we navigate through
                this revolutionary period, several key innovations are reshaping how we think about and
                manage supply chains.`,
        sections: [
          {
            title: "The Rise of AI in Supply Chain Management",
            content: `Artificial Intelligence has become the cornerstone of modern supply chain operations.
                     From predictive analytics to automated decision-making, AI is transforming how companies
                     forecast demand, optimize inventory, and manage logistics. Key applications include:
                     
                     • Real-time demand forecasting using machine learning algorithms
                     • Automated inventory management systems
                     • Smart routing and logistics optimization
                     • Predictive maintenance for transportation fleets`
          },
          {
            title: "Blockchain Revolution in Supply Chain",
            content: `Blockchain technology is providing unprecedented transparency and traceability in
                     supply chain operations. This distributed ledger technology offers:
                     
                     • End-to-end visibility of product movement
                     • Improved supplier accountability
                     • Reduced fraud and counterfeiting
                     • Enhanced compliance management`
          },
          {
            title: "Sustainable Supply Chain Practices",
            content: `Sustainability has moved from a nice-to-have to a must-have in supply chain operations.
                     Companies are implementing various initiatives:
                     
                     • Carbon footprint reduction strategies
                     • Renewable energy adoption in warehouses
                     • Eco-friendly packaging solutions
                     • Green transportation alternatives`
          },
          {
            title: "Future Outlook",
            content: `As we look ahead, the supply chain industry continues to evolve rapidly. Key trends to watch:
                     
                     • Integration of IoT devices for real-time tracking
                     • Adoption of autonomous vehicles and drones
                     • Implementation of 5G technology in logistics
                     • Enhanced cybersecurity measures`
          }
        ],
        conclusion: `The future of supply chain management lies in the successful integration of these
                    innovative technologies while maintaining a focus on sustainability and efficiency.
                    Companies that adapt quickly to these changes will find themselves at the forefront
                    of the industry.`
      }
    },
    2: {
      title: "Green Logistics Solutions",
      category: "Sustainability",
      author: "Jane Smith",
      date: "January 16, 2024",
      readTime: "4 min read",
      image: "/images/blog2.jpg",
      content: {
        intro: `In an era where environmental consciousness is paramount, logistics companies are
               pioneering innovative solutions to reduce their carbon footprint while maintaining
               operational efficiency. This article explores the cutting-edge practices and technologies
               that are making green logistics a reality.`,
        sections: [
          {
            title: "Electric Vehicle Revolution",
            content: `The transition to electric vehicles represents a major shift in logistics operations:

                     • Last-mile delivery using electric vans
                     • Development of charging infrastructure networks
                     • Implementation of smart charging systems
                     • Cost-benefit analysis of EV fleet conversion
                     
                     Our company has already converted 30% of our delivery fleet to electric vehicles,
                     resulting in a 25% reduction in carbon emissions for local deliveries.`
          },
          {
            title: "Sustainable Warehousing",
            content: `Modern warehouses are being transformed into eco-friendly facilities:

                     • Solar panel installations for power generation
                     • LED lighting systems with motion sensors
                     • Rainwater harvesting systems
                     • Green building certifications
                     
                     These improvements have led to a 40% reduction in warehouse energy consumption
                     and significant cost savings.`
          },
          {
            title: "Packaging Innovation",
            content: `Revolutionary changes in packaging are reducing waste:

                     • Biodegradable packaging materials
                     • Right-sizing packaging solutions
                     • Reusable container programs
                     • Packaging waste reduction initiatives
                     
                     Our new packaging solutions have reduced material usage by 35% while maintaining
                     product protection standards.`
          }
        ],
        conclusion: `The journey toward sustainable logistics is ongoing, but the progress made through
                    these initiatives shows that it's possible to balance environmental responsibility
                    with business success. As technology continues to evolve, we expect to see even
                    more innovative solutions emerge.`
      }
    },
    3: {
      title: "AI in Modern Logistics",
      category: "Technology",
      author: "Mike Johnson",
      date: "January 17, 2024",
      readTime: "6 min read",
      image: "/images/blog3.jpg",
      content: {
        intro: `Artificial Intelligence is revolutionizing the logistics industry, bringing unprecedented
               levels of efficiency and automation to supply chain operations. From predictive analytics
               to autonomous systems, AI is transforming how we think about and execute logistics operations.`,
        sections: [
          {
            title: "Predictive Analytics and Demand Forecasting",
            content: `AI-powered predictive analytics is transforming inventory management:

                     • Machine learning algorithms for demand prediction
                     • Real-time inventory optimization
                     • Seasonal trend analysis
                     • Automated reordering systems
                     
                     Implementation of these systems has reduced stockouts by 45% while
                     decreasing excess inventory by 30%.`
          },
          {
            title: "Route Optimization and Delivery Efficiency",
            content: `Smart routing systems are revolutionizing delivery operations:

                     • Dynamic route optimization
                     • Real-time traffic analysis
                     • Weather impact predictions
                     • Driver behavior monitoring
                     
                     These innovations have resulted in a 20% reduction in delivery times
                     and a 15% decrease in fuel consumption.`
          },
          {
            title: "Warehouse Automation",
            content: `AI-driven warehouse automation is setting new standards:

                     • Robotic picking and packing systems
                     • Automated inventory tracking
                     • Smart storage solutions
                     • Predictive maintenance systems
                     
                     Our automated warehouses have seen a 60% increase in picking accuracy
                     and a 40% reduction in processing time.`
          },
          {
            title: "Customer Experience Enhancement",
            content: `AI is transforming the customer experience in logistics:

                     • Chatbots for customer service
                     • Real-time tracking systems
                     • Delivery time predictions
                     • Automated notification systems
                     
                     These improvements have led to a 35% increase in customer satisfaction
                     scores and reduced support queries by 50%.`
          }
        ],        conclusion: `The integration of AI in logistics operations represents a fundamental shift in
                    how the industry operates. As these technologies continue to evolve and mature,
                    we expect to see even more dramatic improvements in efficiency, accuracy, and
                    customer satisfaction. The future of logistics is intelligent, automated, and
                    data-driven.`
      }
    },
    4: {
      title: "What is the Future of Truckload Transportation?",
      category: "Transportation",
      author: "Admin",
      date: "20 Jan 2024",
      readTime: "7 min read",
      image: "https://www.logos3pl.com/wp-content/uploads/2022/08/what-is-the-future-of-truckload-transportation-logos-logistics.jpg",
      content: {
        intro: `The truckload transportation industry stands at the precipice of revolutionary change. 
               Emerging technologies, evolving regulations, and shifting market demands are reshaping 
               how freight moves across our highways. From autonomous vehicles to sustainable fuel 
               solutions, the future of trucking promises unprecedented transformation.`,
        sections: [
          {
            title: "Autonomous Vehicle Revolution",
            content: `Self-driving trucks are no longer science fiction but an emerging reality:

                     • Level 4 autonomous trucks in testing phases
                     • Advanced sensor technology and AI navigation
                     • Platooning systems for improved efficiency
                     • Safety improvements through technology
                     
                     Major manufacturers are targeting 2026-2028 for commercial deployment of 
                     autonomous long-haul trucks, which could revolutionize driver shortages 
                     and operational efficiency.`
          },
          {
            title: "Sustainable Fuel Technologies",
            content: `The industry is rapidly adopting cleaner fuel alternatives:

                     • Electric trucks for short to medium hauls
                     • Hydrogen fuel cells for long-distance transport
                     • Biofuel and renewable diesel adoption
                     • Battery technology improvements
                     
                     Leading companies are investing billions in sustainable fuel infrastructure, 
                     with some fleets already achieving 40% reduction in carbon emissions through 
                     alternative fuel adoption.`
          },
          {
            title: "Digital Transformation and IoT",
            content: `Technology integration is creating smarter trucking operations:

                     • Real-time vehicle diagnostics and monitoring
                     • Predictive maintenance systems
                     • Digital freight matching platforms
                     • Electronic logging devices (ELD) evolution
                     
                     These technologies are reducing downtime by 30% and improving fuel 
                     efficiency by up to 15% through optimized routing and maintenance.`
          },
          {
            title: "Regulatory Changes and Safety",
            content: `Evolving regulations are shaping the industry's future:

                     • Hours of service (HOS) rule modifications
                     • Autonomous vehicle legislation development
                     • Environmental compliance standards
                     • Enhanced safety technology requirements
                     
                     New regulations are pushing the industry toward greater safety and 
                     environmental responsibility while accommodating technological advances.`
          }
        ],
        conclusion: `The future of truckload transportation is bright with innovation and opportunity. 
                    While challenges exist in adapting to new technologies and regulations, the 
                    industry's evolution promises safer, more efficient, and environmentally 
                    sustainable freight movement. Companies that embrace these changes will lead 
                    the way in tomorrow's transportation landscape.`
      }
    },
    5: {
      title: "Cargo Follow Through the Best Supply Your Metals",
      category: "Metal Logistics",
      author: "Admin",
      date: "20 Jan 2024",
      readTime: "6 min read",
      image: "https://msc-p-001.sitecorecontenthub.cloud/api/public/content/5b49e0cffdd04081ad467f694463fcbd?v=e6d3db1d",
      content: {
        intro: `Metal cargo transportation requires specialized expertise, equipment, and handling 
               protocols to ensure safe and efficient delivery across international borders. 
               From steel coils to aluminum sheets, each type of metal cargo presents unique 
               challenges that demand industry-specific solutions and safety measures.`,
        sections: [
          {
            title: "Specialized Handling Techniques",
            content: `Metal cargo requires precise handling to prevent damage and ensure safety:

                     • Proper securing and tie-down methods for various metal types
                     • Specialized lifting equipment and rigging techniques
                     • Climate-controlled environments for sensitive alloys
                     • Corrosion prevention during transport
                     
                     Our specialized metal handling teams undergo extensive training to ensure 
                     proper cargo securement, with zero damage incidents in over 95% of 
                     metal shipments handled last year.`
          },
          {
            title: "International Safety Protocols",
            content: `Cross-border metal transport follows strict international standards:

                     • IMDG Code compliance for hazardous metal materials
                     • Proper documentation and certification
                     • Weight distribution and load planning
                     • Emergency response procedures
                     
                     All international metal shipments are handled according to IMO regulations, 
                     ensuring compliance with global safety standards and customs requirements.`
          },
          {
            title: "Equipment and Infrastructure",
            content: `Specialized equipment ensures optimal metal cargo transport:

                     • Heavy-duty flatbed trailers with reinforced decking
                     • Crane-equipped facilities for loading/unloading
                     • Coil racks and specialized securing devices
                     • Weather protection systems
                     
                     Our fleet includes 200+ specialized metal transport vehicles, equipped 
                     with the latest securement technology and handling capabilities.`
          },
          {
            title: "Quality Assurance and Tracking",
            content: `Comprehensive monitoring ensures cargo integrity throughout transport:

                     • Real-time GPS tracking and monitoring
                     • Temperature and humidity sensors
                     • Damage prevention inspections
                     • Digital documentation and reporting
                     
                     Our advanced tracking systems provide customers with real-time updates 
                     and maintain complete chain of custody documentation for all metal shipments.`
          }
        ],
        conclusion: `Successfully managing metal cargo logistics requires a combination of specialized 
                    expertise, proper equipment, and strict adherence to safety protocols. Our 
                    commitment to excellence in metal transportation ensures that your valuable 
                    cargo arrives safely and on time, regardless of destination or complexity.`
      }
    },
    6: {
      title: "Fast and Reliable Shipping Guaranteey Trusted",
      category: "Service Quality",
      author: "Admin",
      date: "20 Jan 2024",
      readTime: "5 min read",
      image: "/images/ii.jpg",
      content: {
        intro: `In today's fast-paced business environment, reliable shipping isn't just an expectation—
               it's a necessity. Our certified quality standards and real-time tracking systems ensure 
               your shipments arrive on time, every time. Discover how we've built a reputation for 
               dependability through innovative technology and unwavering commitment to service excellence.`,
        sections: [
          {
            title: "Certified Quality Standards",
            content: `Our quality management system exceeds industry standards:

                     • ISO 9001:2015 Quality Management certification
                     • C-TPAT (Customs-Trade Partnership Against Terrorism) certified
                     • SmartWay Partnership for environmental efficiency
                     • Regular third-party audits and compliance reviews
                     
                     These certifications ensure that every aspect of our operation meets 
                     the highest standards for quality, security, and environmental responsibility.`
          },
          {
            title: "Real-Time Tracking Technology",
            content: `Advanced tracking systems provide complete shipment visibility:

                     • GPS tracking with minute-by-minute updates
                     • Automated milestone notifications
                     • Mobile app access for customers
                     • Integration with customer ERP systems
                     
                     Our proprietary tracking platform processes over 10,000 tracking events 
                     daily, providing customers with unprecedented visibility into their shipments.`
          },
          {
            title: "Performance Metrics and Guarantees",
            content: `We back our promises with measurable performance standards:

                     • 99.2% on-time delivery rate
                     • 30-second average response time for customer inquiries
                     • Zero-damage guarantee with full insurance coverage
                     • Service level agreements with penalty clauses
                     
                     Our commitment to excellence is reflected in our industry-leading 
                     performance metrics and customer satisfaction scores.`
          },
          {
            title: "Customer Support Excellence",
            content: `Dedicated support teams ensure seamless service delivery:

                     • 24/7 customer service availability
                     • Dedicated account managers for key clients
                     • Proactive communication and issue resolution
                     • Multi-language support capabilities
                     
                     Our customer support team resolves 95% of inquiries on first contact, 
                     ensuring minimal disruption to your business operations.`
          }
        ],
        conclusion: `Our fast and reliable shipping guarantee isn't just a promise—it's a proven track 
                    record built on years of operational excellence. Through certified quality standards, 
                    advanced tracking technology, and unwavering commitment to customer service, we 
                    deliver the reliability your business demands. Trust us with your shipping needs, 
                    and experience the difference that true reliability makes.`
      }
    }
  };
  return posts[id] || null;
}

export default function BlogPost({ params }) {
  const post = getBlogPost(params.id);

  if (!post) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl">Blog post not found</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative w-full h-96 overflow-hidden">
          <Image 
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <div className="max-w-4xl mx-auto">
              <span className="text-orange-400 text-sm font-semibold mb-2 block">{post.category}</span>
              <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center text-white/80">
                <span>By {post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="py-12 px-4">
          <article className="prose lg:prose-xl mx-auto">
            <p className="lead text-xl text-gray-700 mb-8">{post.content.intro}</p>
            
            {post.content.sections?.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <div className="whitespace-pre-line text-gray-700">{section.content}</div>
              </div>
            ))}
            
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700">{post.content.conclusion}</p>
            </div>
            
            {/* Share and Comments Section */}
            <div className="mt-12 border-t pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gold-secondary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gold-secondary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>Like</span>
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500">Share this article:</span>
                  <div className="flex space-x-2">
                    {['Twitter', 'Facebook', 'LinkedIn'].map((platform) => (
                      <button key={platform} className="text-gray-400 hover:text-gold-secondary">
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Return to Blogs */}
        <div className="text-center pb-12">
          <Link href="/blogs" className="inline-flex items-center text-gold-secondary hover:text-gold-dark">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all blogs
          </Link>
        </div>
      </div>
    </>
  );
}