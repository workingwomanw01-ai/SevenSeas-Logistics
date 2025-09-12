import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ShipmentForm from './ShipmentForm';
import LoadingSpinner from './LoadingSpinner';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function EditShipment() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState(null);
  const [allShipments, setAllShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingShipments, setLoadingShipments] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('list'); // 'list' or 'edit'
  const navigate = useRouter();

  const notyf = new Notyf({
    position: { x: "right", y: "top" }
  });

  // Fetch all shipments on component mount
  useEffect(() => {
    fetchAllShipments();
  }, []);

  const fetchAllShipments = async () => {
    setLoadingShipments(true);
    try {
      const res = await fetch("/api/getAllShipments");
      if (res.ok) {
        const data = await res.json();
        setAllShipments(data.shipments);
      } else {
        setError("Failed to fetch shipments");
      }
    } catch (error) {
      setError("Error fetching shipments");
    } finally {
      setLoadingShipments(false);
    }
  };

  const handleDeleteShipment = async (trackingNum) => {
    if (!confirm(`Are you sure you want to delete shipment ${trackingNum}?`)) {
      return;
    }

    try {
      const res = await fetch("/api/deleteShipment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber: trackingNum }),
      });

      if (res.ok) {
        notyf.success("Shipment deleted successfully");
        fetchAllShipments(); // Refresh the list
      } else {
        const errorData = await res.json();
        notyf.error(errorData.message || "Error deleting shipment");
      }
    } catch (error) {
      notyf.error("Error deleting shipment");
    }
  };

  const handleEditShipment = (shipmentData) => {
    setShipment(shipmentData);
    setTrackingNumber(shipmentData.trackingNumber);
    setView('edit');
  };

  const handleSearch = async () => {
    if (!trackingNumber) {
      setError("Please enter a tracking number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/getShipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setShipment(data.shipmentData);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Shipment not found");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/updateShipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingNumber, updatedData: shipment })
      });

      if (res.status === 200) {
        const data = await res.json();
        setShipment(data.shipmentData);
        notyf.success("Shipment updated successfully");
        fetchAllShipments(); // Refresh the list
        setView('list'); // Go back to list view
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Error updating shipment");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'in transit': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleFocus = (event) => {
    event.target.select();
  };
  return (
    <section className="overflow-y-scroll h-screen z-20 pb-60 bg-gray-50 hide-scrollbar">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {view === 'list' ? 'Manage Shipments' : 'Edit Shipment'}
          </h1>
          {view === 'edit' && (
            <button
              onClick={() => {
                setView('list');
                setShipment(null);
                setTrackingNumber('');
                setError(null);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Back to List
            </button>
          )}
        </div>

        {loading && <LoadingSpinner />}

        {view === 'list' && (
          <>
            {/* Search Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="text-lg font-semibold mb-3">Quick Search</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onClick={handleFocus}
                  placeholder="Enter tracking number to search"
                  className="flex-1 py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button 
                  onClick={handleSearch}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Shipments List */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">All Shipments ({allShipments.length})</h2>
              </div>
                {loadingShipments ? (
                <div className="p-8">
                  <LoadingSpinner inline={true} message="Loading shipments..." />
                </div>
              ) : allShipments.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>No shipments found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {allShipments.map((shipmentItem) => (
                    <div key={shipmentItem.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-800">
                              {shipmentItem.trackingNumber}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipmentItem.status)}`}>
                              {shipmentItem.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">From:</span> {shipmentItem.sender}
                              <br />
                              <span className="text-gray-500">{shipmentItem.origin}</span>
                            </div>
                            <div>
                              <span className="font-medium">To:</span> {shipmentItem.receiver}
                              <br />
                              <span className="text-gray-500">{shipmentItem.destination}</span>
                            </div>
                          </div>
                          
                          <div className="mt-2 text-xs text-gray-500">
                            Created: {formatDate(shipmentItem.createdAt)}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditShipment(shipmentItem)}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteShipment(shipmentItem.trackingNumber)}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {view === 'edit' && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            
            {shipment && (
              <ShipmentForm 
                initialData={shipment}
                onSubmit={handleUpdate} 
                buttonText="Update Shipment"
                onChange={setShipment}
              />
            )}
          </div>
        )}

        {error && view === 'list' && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}
