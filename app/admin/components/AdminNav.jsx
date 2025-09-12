import React from 'react';

export default function AdminNav({ showBar, setShowBar }) {
  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md border-b border-purple-500/30 h-16 px-6 shadow-2xl">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setShowBar(!showBar)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-3 rounded-lg shadow-lg transition-all duration-300 flex flex-col justify-center items-center w-12 h-12 group"
          aria-label={showBar ? "Hide Menu" : "Show Menu"}
        >
          <div className={`w-5 h-0.5 bg-white mb-1 transition-all duration-300 ${!showBar ? 'rotate-45 translate-y-1.5' : 'group-hover:w-6'}`}></div>
          <div className={`w-5 h-0.5 bg-white mb-1 transition-all duration-300 ${!showBar ? 'opacity-0' : 'opacity-100 group-hover:w-6'}`}></div>
          <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${!showBar ? '-rotate-45 -translate-y-1.5' : 'group-hover:w-6'}`}></div>
        </button>
        
        <div className="hidden md:block">
          <h1 className="text-white font-bold text-xl tracking-wide">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm">Logistics Management System</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">        <button className="relative p-3 text-gray-300 hover:text-white hover:bg-purple-800/50 rounded-lg transition-all duration-200 group">
          <i className="fas fa-bell text-lg"></i>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">3</span>
          <div className="absolute inset-0 bg-purple-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200"></div>
        </button>
        
        <button className="relative p-3 text-gray-300 hover:text-white hover:bg-purple-800/50 rounded-lg transition-all duration-200 group">
          <i className="fas fa-envelope text-lg"></i>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
          <div className="absolute inset-0 bg-indigo-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200"></div>
        </button>
        
        <div className="w-px h-8 bg-gray-700 mx-2"></div>
        
        <div className="flex items-center space-x-3">
          <div className="hidden md:block text-right">
            <p className="text-white text-sm font-medium">Admin User</p>
            <p className="text-gray-400 text-xs">System Administrator</p>
          </div>
          
          <div className="relative group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 p-0.5 shadow-lg">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <img 
                  src="https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg" 
                  alt="Profile" 
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/40/374151/ffffff?text=A";
                  }}
                />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-black"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
