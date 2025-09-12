import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import ShipmentContext from '@/contexts/ShipmentContext';

export default function AdminSidebar({ showBar, activeAside, setActiveAside, setShowBar }) {
  const { logout } = useContext(ShipmentContext);
  const navigate = useRouter();

  const handleLogout = async () => {
    await logout();
    navigate.push("/login");
  };
  const handleCloseSidebar = () => {
    setShowBar(true);
  };

  return (
    <>
      {/* Overlay for mobile - only show when sidebar is open */}
      {!showBar && (
        <div 
          className="fixed inset-0 backdrop-blur-md bg-opacity-50 z-20 lg:hidden"
          onClick={handleCloseSidebar}
          aria-label="Close sidebar overlay"
        />
      )}
      
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white text-gray-800 shadow-lg transition-transform duration-300 ease-in-out z-30 border-r border-gray-200 ${
          showBar ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
      <div className="p-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700">Admin Panel</h2>        <button 
          onClick={handleCloseSidebar}
          className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 group"
          aria-label="Close sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2 px-2">
          <li>
            <button
              onClick={() => setActiveAside("Add")}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md transition-colors duration-200 ${
                activeAside === "Add"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className={`fa fa-plus mr-3 text-lg ${activeAside === "Add" ? "text-white" : "text-red-600"}`} aria-hidden="true"></i>
              <span className="font-medium">Create shipment</span>
            </button>
          </li>          <li>
            <button
              onClick={() => setActiveAside("Edit")}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md transition-colors duration-200 ${
                activeAside === "Edit"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className={`fas fa-file-edit mr-3 text-lg ${activeAside === "Edit" ? "text-white" : "text-red-600"}`}></i>
              <span className="font-medium">Edit Shipment</span>
            </button>
          </li>          <li>
            {/* <button
              onClick={() => setActiveAside("Email")}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md transition-colors duration-200 ${
                activeAside === "Email"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className={`fas fa-envelope mr-3 text-lg ${activeAside === "Email" ? "text-white" : "text-red-600"}`}></i>
              <span className="font-medium">Email Settings</span>
            </button> */}
          </li>          <li>
            <button
              onClick={() => setActiveAside("CustomEmail")}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md transition-colors duration-200 ${
                activeAside === "CustomEmail"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className={`fas fa-envelope-open mr-3 text-lg ${activeAside === "CustomEmail" ? "text-white" : "text-red-600"}`}></i>
              <span className="font-medium">Send Custom Email</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveAside("Invoice")}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md transition-colors duration-200 ${
                activeAside === "Invoice"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className={`fas fa-file-invoice mr-3 text-lg ${activeAside === "Invoice" ? "text-white" : "text-red-600"}`}></i>
              <span className="font-medium">Generate Invoice</span>
            </button>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full border-t border-gray-200 bg-gray-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-4 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          <i className="fa fa-sign-out mr-3 text-lg text-red-600" aria-hidden="true"></i>
          <span className="font-medium">Log out</span>        </button>
      </div>
    </aside>
    </>
  );
}
