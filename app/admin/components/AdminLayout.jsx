import { useState } from 'react';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children, activeAside, setActiveAside }) {
  const [showBar, setShowBar] = useState(true);

  return (
    <div className="w-full max-w-screen overflow-hidden relative z-50">
      <div className="fixed top-0 left-0 w-screen h-screen">
        <AdminNav showBar={showBar} setShowBar={setShowBar} />
        <AdminSidebar 
          showBar={showBar} 
          setShowBar={setShowBar}
          activeAside={activeAside}
          setActiveAside={setActiveAside}
        />        <div 
          className={`transition-all duration-300 ease-in-out relative z-10 ${
            !showBar ? 'lg:ml-72 ml-0' : 'ml-0'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
