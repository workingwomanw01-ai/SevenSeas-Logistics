"use client"

import { useState } from "react"
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Award, 
  Heart, 
  Globe, 
  GraduationCap,
  Coffee,
  Car,
  Shield,
  Calendar,
  ArrowRight,
  Search,
  Filter,
  ChevronDown,
  Building,
  TrendingUp,
  Target,
  Zap,
  X
} from "lucide-react"

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showJobDetails, setShowJobDetails] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    location: "",
    resume: null,
    coverLetter: ""
  })

  const departments = [
    { value: "all", label: "All Departments" },
    { value: "operations", label: "Operations" },
    { value: "logistics", label: "Logistics" },
    { value: "technology", label: "Technology" },
    { value: "sales", label: "Sales & Marketing" },
    { value: "finance", label: "Finance" },
    { value: "hr", label: "Human Resources" }
  ]

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "new-york", label: "New York, NY" },
    { value: "los-angeles", label: "Los Angeles, CA" },
    { value: "chicago", label: "Chicago, IL" },
    { value: "miami", label: "Miami, FL" },
    { value: "london", label: "London, UK" },
    { value: "singapore", label: "Singapore" }
  ]

  const jobs = [
    {
      id: 1,
      title: "Senior Logistics Coordinator",
      department: "logistics",
      location: "new-york",
      type: "Full-time",
      salary: "$65,000 - $85,000",
      experience: "3-5 years",
      description: "Coordinate and oversee logistics operations, manage vendor relationships, and optimize supply chain processes.",
      requirements: [
        "Bachelor's degree in Logistics, Supply Chain, or related field",
        "3+ years of logistics coordination experience",
        "Strong analytical and problem-solving skills",
        "Proficiency in logistics software and ERP systems",
        "Excellent communication and organizational skills"
      ],
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "Fleet Operations Manager",
      department: "operations",
      location: "los-angeles",
      type: "Full-time",
      salary: "$75,000 - $95,000",
      experience: "5+ years",
      description: "Manage fleet operations, ensure compliance with safety regulations, and optimize vehicle utilization.",
      requirements: [
        "Bachelor's degree in Transportation, Logistics, or Business",
        "5+ years of fleet management experience",
        "Knowledge of DOT regulations and safety standards",
        "Experience with fleet management software",
        "Strong leadership and team management skills"
      ],
      posted: "1 week ago"
    },
    {
      id: 3,
      title: "Software Engineer - Logistics Platform",
      department: "technology",
      location: "new-york",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      experience: "2-4 years",
      description: "Develop and maintain our logistics management platform, integrate with external APIs, and improve system performance.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "2+ years of software development experience",
        "Proficiency in React, Node.js, and cloud technologies",
        "Experience with API development and integration",
        "Understanding of logistics/supply chain processes preferred"
      ],
      posted: "3 days ago"
    },
    {
      id: 4,
      title: "Sales Representative - Freight Services",
      department: "sales",
      location: "chicago",
      type: "Full-time",
      salary: "$50,000 - $70,000 + Commission",
      experience: "1-3 years",
      description: "Generate new business opportunities, build client relationships, and promote our freight services.",
      requirements: [
        "Bachelor's degree in Business or related field",
        "1+ years of B2B sales experience",
        "Excellent communication and presentation skills",
        "Self-motivated with strong negotiation abilities",
        "Knowledge of freight/logistics industry preferred"
      ],
      posted: "5 days ago"
    },
    {
      id: 5,
      title: "Warehouse Supervisor",
      department: "operations",
      location: "miami",
      type: "Full-time",
      salary: "$45,000 - $60,000",
      experience: "2-4 years",
      description: "Supervise warehouse operations, ensure safety compliance, and manage inventory accuracy.",
      requirements: [
        "High school diploma or equivalent required",
        "2+ years of warehouse supervision experience",
        "Knowledge of warehouse management systems",
        "Strong leadership and organizational skills",
        "Forklift certification preferred"
      ],
      posted: "1 week ago"
    },
    {
      id: 6,
      title: "Financial Analyst",
      department: "finance",
      location: "new-york",
      type: "Full-time",
      salary: "$60,000 - $80,000",
      experience: "2-4 years",
      description: "Analyze financial data, prepare reports, and support strategic decision-making processes.",
      requirements: [
        "Bachelor's degree in Finance, Accounting, or Economics",
        "2+ years of financial analysis experience",
        "Advanced Excel skills and financial modeling",
        "Strong analytical and communication skills",
        "CPA or CFA certification preferred"
      ],
      posted: "4 days ago"
    }
  ]

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive medical, dental, and vision insurance",
      color: "bg-gradient-to-br from-[#8b1538] to-[#6b1129]"
    },
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Market-competitive compensation and performance bonuses",
      color: "bg-gradient-to-br from-[#c9a96e] to-[#b8965a]"
    },
    {
      icon: Calendar,
      title: "Paid Time Off",
      description: "Generous vacation, sick leave, and holiday policies",
      color: "bg-gradient-to-br from-[#8b1538] to-[#6b1129]"
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description: "Professional development programs and tuition assistance",
      color: "bg-gradient-to-br from-[#c9a96e] to-[#b8965a]"
    },
    {
      icon: Car,
      title: "Transportation Benefits",
      description: "Company vehicle or transportation allowance",
      color: "bg-gradient-to-br from-[#8b1538] to-[#6b1129]"
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Flexible schedules and remote work opportunities",
      color: "bg-gradient-to-br from-[#c9a96e] to-[#b8965a]"
    },
    {
      icon: Shield,
      title: "Insurance Coverage",
      description: "Life and disability insurance protection",
      color: "bg-gradient-to-br from-[#8b1538] to-[#6b1129]"
    },
    {
      icon: Award,
      title: "Recognition Programs",
      description: "Employee appreciation and achievement awards",
      color: "bg-gradient-to-br from-[#c9a96e] to-[#b8965a]"
    }
  ]

  const companyValues = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in everything we do, setting high standards and continuously improving our services."
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "We believe in the power of collaboration and work together to achieve common goals and drive success."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We embrace new technologies and creative solutions to solve complex logistics challenges."
    },
    {
      icon: Zap,
      title: "Agility",
      description: "We adapt quickly to changing market conditions and customer needs with flexibility and responsiveness."
    }
  ]

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment
    const matchesLocation = selectedLocation === "all" || job.location === selectedLocation
    const matchesSearch = searchTerm === "" || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesDepartment && matchesLocation && matchesSearch
  })

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    if (name === "resume") {
      setApplicationData(prev => ({ ...prev, [name]: files[0] }))
    } else {
      setApplicationData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleJobApplication = (job) => {
    setSelectedJob(job)
    setApplicationData(prev => ({ ...prev, position: job.title }))
    setShowApplicationForm(true)
  }
  const handleSubmitApplication = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowApplicationForm(false)
      setShowSuccessMessage(true)
      
      // Reset form
      setApplicationData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        location: "",
        resume: null,
        coverLetter: ""
      })
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }, 1500)
  }

  return (
    <div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        
        .glassmorphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .job-card {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .parallax-bg {
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>
    <div className="min-h-screen bg-gray-50">      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#8b1538] via-[#6b1129] to-[#8b1538] py-24 overflow-hidden">        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: "url('/images/chen.jpg')"
          }}
        />
        
        {/* Animated background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#8b1538]/70 to-[#6b1129]/70" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c9a96e]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#b8965a]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="p-3 bg-[#c9a96e]/20 rounded-2xl backdrop-blur-sm">
                <Briefcase className="w-12 h-12" style={{ color: '#c9a96e' }} />
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#c9a96e] to-[#b8965a] bg-clip-text text-transparent">
                Join Our Team
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Build your career with a leading logistics company. We're looking for passionate professionals to help us deliver excellence worldwide.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('open-positions').scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#c9a96e] hover:bg-[#b8965a] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                View Open Positions
              </button>
              <button className="border-2 border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105">
                Learn About Culture
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Company Culture Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join a company that values innovation, teamwork, and professional growth. We're committed to creating an environment where you can thrive.
            </p>
          </div>          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="text-center group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c9a96e]/10 to-[#b8965a]/5 rounded-3xl transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
                  <div className="relative p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#c9a96e] to-[#b8965a] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Benefits Grid */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Employee Benefits</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 group border">
                    <div className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>      {/* Job Search and Filters */}
      <div id="open-positions" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">Find your next opportunity with us</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                />
              </div>

              <div className="relative">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent appearance-none"
                >
                  {departments.map(dept => (
                    <option key={dept.value} value={dept.value}>{dept.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent appearance-none"
                >
                  {locations.map(loc => (
                    <option key={loc.value} value={loc.value}>{loc.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              <button className="bg-[#c9a96e] hover:bg-[#b8965a] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Apply Filters</span>
              </button>
            </div>
          </div>          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <div 
                key={job.id} 
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#c9a96e] transition-colors duration-200">
                            {job.title}
                          </h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Hiring Now
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Building className="w-4 h-4 text-gray-400" />
                            <span className="capitalize font-medium">{job.department}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{locations.find(l => l.value === job.location)?.label}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold text-green-600">{job.salary}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                        {job.posted}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-[#c9a96e]/20 to-[#b8965a]/10 text-[#8b1538] rounded-full text-sm font-medium border border-[#c9a96e]/30">
                        {job.experience} experience
                      </span>
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                        {job.type}
                      </span>
                      <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                        {job.requirements.length} requirements
                      </span>
                    </div>

                    <button
                      onClick={() => setShowJobDetails(showJobDetails === job.id ? null : job.id)}
                      className="text-[#c9a96e] hover:text-[#b8965a] font-medium text-sm flex items-center space-x-1 mb-4"
                    >
                      <span>{showJobDetails === job.id ? 'Hide Details' : 'View Requirements'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showJobDetails === job.id ? 'rotate-180' : ''}`} />
                    </button>

                    {showJobDetails === job.id && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                              <div className="w-2 h-2 bg-[#c9a96e] rounded-full mt-2 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="lg:ml-6">
                    <button
                      onClick={() => handleJobApplication(job)}
                      className="w-full lg:w-auto bg-gradient-to-r from-[#c9a96e] to-[#b8965a] hover:from-[#b8965a] hover:to-[#9c7f4b] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No positions found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or check back later for new openings.</p>
            </div>
          )}
        </div>
      </div>      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-20 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Apply for Position</h2>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {selectedJob && (
                <p className="text-gray-600 mt-2">{selectedJob.title} - {locations.find(l => l.value === selectedJob.location)?.label}</p>
              )}
            </div>

            <form onSubmit={handleSubmitApplication} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={applicationData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={applicationData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <select
                    name="experience"
                    value={applicationData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-3">2-3 years</option>
                    <option value="4-5">4-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Resume/CV *
                </label>
                <input
                  type="file"
                  name="resume"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={applicationData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us why you're interested in this position..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent resize-none"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-[#c9a96e] hover:bg-[#b8965a] disabled:bg-[#c9a96e]/50 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Application</span>
                  )}
                </button>
              </div>
            </form>
          </div>        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in-up">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-semibold">Application Submitted!</h3>
              <p className="text-sm text-green-100">We'll review your application and get back to you soon.</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-[#8b1538] to-[#6b1129]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't See the Right Position?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#c9a96e] hover:bg-[#b8965a] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>Send Resume</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#8b1538] px-8 py-4 rounded-lg font-semibold transition-colors duration-200">
              Contact HR Team
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}