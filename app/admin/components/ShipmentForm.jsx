import { useState } from 'react';
import dynamic from 'next/dynamic';
import { getCurrentDateForTimezone, getCurrentTimeForTimezone, getTimezoneDisplayName } from '../../../utils/timezone';

// Import maps with no SSR to avoid conflicts
const ShipmentMap = dynamic(
  () => import('./ShipmentMap'),
  { ssr: false }
);

const RouteMap = dynamic(
  () => import('./RouteMap'),
  { ssr: false }
);

export default function ShipmentForm({ initialData = {}, onSubmit, buttonText, onChange, loading = false }) {
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState('');  // Imgur upload function via our API route
  const uploadToImgur = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData, // Don't set Content-Type header, let browser set it
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        return data.imageUrl;
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setImageUploadError('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setImageUploadError('Image size must be less than 10MB');
      return;
    }

    setImageUploading(true);
    setImageUploadError('');

    try {
      const imageUrl = await uploadToImgur(file);
      const updatedData = {
        ...initialData,
        featuredImage: imageUrl
      };
      onChange(updatedData);
    } catch (error) {
      setImageUploadError(error.message || 'Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = () => {
    const updatedData = {
      ...initialData,
      featuredImage: ''
    };
    onChange(updatedData);
  };  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating field ${name} with value:`, value); // Debug log
    const updatedData = {
      ...initialData,
      [name]: value
    };
    console.log('Updated form data:', updatedData); // Debug log
    onChange(updatedData);
  };

  // Helper function to set current time for selected timezone
  const setCurrentTimestamp = () => {
    const timezone = initialData.timezone || 'UTC';
    const currentDate = getCurrentDateForTimezone(timezone);
    const currentTime = getCurrentTimeForTimezone(timezone);
    
    const updatedData = {
      ...initialData,
      customTimestampDate: currentDate,
      customTimestampTime: currentTime
    };
    onChange(updatedData);
  };

  // Helper function to clear custom timestamp
  const clearCustomTimestamp = () => {
    const updatedData = {
      ...initialData,
      customTimestampDate: '',
      customTimestampTime: ''
    };
    onChange(updatedData);
  };
  const handleLocationUpdate = (coordinates) => {
    console.log('Location update received:', coordinates);
    // coordinates are received as [lng, lat]
    const updatedData = {
      ...initialData,
      longitude: coordinates[0],  // First coordinate is longitude
      latitude: coordinates[1]    // Second coordinate is latitude
    };
    onChange(updatedData);
  };

  const handleOriginUpdate = (coordinates) => {
    console.log('Origin update received:', coordinates);
    const updatedData = {
      ...initialData,
      originLongitude: coordinates ? coordinates[0] : null,
      originLatitude: coordinates ? coordinates[1] : null
    };
    onChange(updatedData);
  };
  const handleCurrentLocationUpdate = (location) => {
    console.log('Current location update received:', location);
    const updatedData = {
      ...initialData,
      currentLocationPercentage: typeof location === 'number' ? location : null
    };
    onChange(updatedData);
  };

  const handleDestinationUpdate = (coordinates) => {
    console.log('Destination update received:', coordinates);
    const updatedData = {
      ...initialData,
      destinationLongitude: coordinates ? coordinates[0] : null,
      destinationLatitude: coordinates ? coordinates[1] : null
    };
    onChange(updatedData);
  };
  const handleSubmit = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    // Prevent multiple submissions
    if (loading) {
      return;
    }
    if (typeof onSubmit === 'function') {
      onSubmit(initialData);
    }
  };

  // Get initial location from initialData or default
  const initialLocation = initialData.longitude && initialData.latitude 
    ? [parseFloat(initialData.longitude), parseFloat(initialData.latitude)] // [lng, lat]
    : [-0.127758, 51.507351]; // Default to London coordinates

  // Get origin and destination coordinates for route map
  const originCoords = initialData.originLongitude && initialData.originLatitude
    ? [parseFloat(initialData.originLongitude), parseFloat(initialData.originLatitude)]
    : null;

  const destinationCoords = initialData.destinationLongitude && initialData.destinationLatitude
    ? [parseFloat(initialData.destinationLongitude), parseFloat(initialData.destinationLatitude)]
    : null;
  return (
    <form 
      onSubmit={handleSubmit} 
      noValidate
      className="w-full"
    >
      {/* Hidden field for featured image URL */}
      <input
        type="hidden"
        name="featuredImage"
        value={initialData.featuredImage || ''}
      />
      
      <div className="border border-gray-300 rounded w-[95%] mx-auto bg-gray-50 mb-4">
        <div className="py-2 px-4 border-b border-black font-semibold">Shipment Details</div>
        <div className="p-4">
          <h2 className="text-lg font-medium text-[#b91c1c]">SHIPPER DETAILS</h2>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Shipper Name</label>
            <input
              required
              type="text"
              name="sender"
              value={initialData.sender || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Phone Number</label>
            <input
              required
              type="text"
              name="senderNumber"
              value={initialData.senderNumber || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Address</label>
            <input
              required
              type="text"
              name="senderAddress"
              value={initialData.senderAddress || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Email</label>
            <input
              required
              type="text"
              name="senderEmail"
              value={initialData.senderEmail || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-medium text-[#b91c1c]">RECEIVER DETAILS</h2>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Receiver Name</label>
            <input
              required
              type="text"
              name="receiver"
              value={initialData.receiver || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Phone Number</label>
            <input
              required
              type="text"
              name="receiverNumber"
              value={initialData.receiverNumber || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Address</label>
            <input
              required
              type="text"
              name="receiverAddress"
              value={initialData.receiverAddress || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Email</label>
            <input
              required
              type="text"
              name="receiverEmail"
              value={initialData.receiverEmail || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-medium text-[#b91c1c]">SHIPMENT DETAILS</h2>          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Type of shipment</label>            <select
              name="shipmentType"
              value={initialData.shipmentType || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            >
              <option value="">
                {" "}
                -- Select One --
              </option>
              <option value="International Shipping">
                International Shipping
              </option>
              <option value="Air Freight">Air Freight</option>
              <option value="Truckload">Truckload</option>
              <option value="LTL Freight">LTL Freight</option>
              <option value="Truckload-TL">Truckload-TL</option>
              <option value="Van Move">Van Move</option>
              <option value="Land Shipment">Land Shipment</option>
              <option value="Discreet">Discreet</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Weight</label>
            <input
              type="text"
              name="weight"
              value={initialData.weight || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Courier</label>
            <input
              type="text"
              name="courier"
              value={initialData.courier || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Packages</label>
            <input
              type="text"
              name="packages"
              value={initialData.packages || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Mode</label>            <select
              name="mode"
              value={initialData.mode || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            >
              <option value="">
                {" "}
                -- Select One --
              </option>
              <option value="Sea Transport">Sea Transport</option>
              <option value="Land Shipping">Land Shipping</option>
              <option value="Air Freight">Air Freight</option>
              <option value="DISCREET">DISCREET</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Product</label>
            <input
              type="text"
              name="product"
              value={initialData.product || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={initialData.quantity || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2 uppercase">
            <label className="font-semibold">Payment Method:</label>
            <select
              name="paymentMethod"
              value={initialData.paymentMethod || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent uppercase"
            >
              <option value="">Select Payment</option>
              <option value="Cashapp">Cashapp</option>
              <option value="Apple pay">Apple Pay</option>
              <option value="Google pay">Google Pay</option>
              <option value="Bank">Bank</option>
              <option value="Gift Card">Gift Card</option>
              <option value="Bacs">Bacs</option>
              <option value="Credit card">Credit card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="paypal">Paypal</option>
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="litecoin">Litecoin</option>
              <option value="dogecoin">Dogecoin</option>
              <option value="stellar">Stellar</option>
              <option value="cheque">Cheque</option>
              <option value="zcash">Zcash</option>
              <option value="dash">Dash</option>
              <option value="zelle">Zelle</option>
              <option value="venmo">Venmo</option>              <option value="chime">Chime</option>
              <option value="usdt">USDT</option>
              <option value="cryptocurrency">Cryptocurrency</option>
              <option value="e-transfer">E-transfer</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Total Freight</label>
            <input
              type="text"
              name="totalFreight"
              value={initialData.totalFreight || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Carrier</label>            <select
              name="carrier"
              value={initialData.carrier || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            >
              <option value="">
                {" "}
                -- Select One --
              </option>
              <option value="DHL">DHL</option>
              <option value="USPS">USPS</option>
              <option value="FedEx">FedEx</option>
              <option value="HYPER MAIL">HYPER MAIL</option>
              <option value="CFL">CFL</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Carrier Refrence No.</label>
            <input
              type="text"
              name="carrierReferenceNo"
              value={initialData.carrierReferenceNo || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Departure time</label>
            <input
              type="time"
              name="departureTime"
              value={initialData.departureTime || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Origin</label>
            <input
              type="text"
              name="origin"
              value={initialData.origin || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Destination</label>
            <input
              type="text"
              name="destination"
              value={initialData.destination || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Pickup Date</label>
            <input
              type="date"
              name="pickupDate"
              value={initialData.pickupDate || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Pickup Time</label>
            <input
              type="time"
              name="pickupTime"
              value={initialData.pickupTime || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Expected Delivery Date</label>
            <input
              type="date"
              name="estimatedDeliveryDate"
              value={initialData.estimatedDeliveryDate || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            />
          </div>
            {/* Custom Timestamp Controls */}
          <div className="flex flex-col gap-2 my-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold">Custom Creation/Edit Timestamp</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={setCurrentTimestamp}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  disabled={!initialData.timezone}
                  title={!initialData.timezone ? "Select timezone first" : "Set to current time in selected timezone"}
                >
                  Use Current Time
                </button>
                <button
                  type="button"
                  onClick={clearCustomTimestamp}
                  className="px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Date</label>
                <input
                  type="date"
                  name="customTimestampDate"
                  value={initialData.customTimestampDate || ''}
                  onChange={handleChange}
                  className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Time</label>
                <input
                  type="time"
                  name="customTimestampTime"
                  value={initialData.customTimestampTime || ''}
                  onChange={handleChange}
                  className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Leave empty to use current system time. Set custom date/time to override when this shipment is recorded as created/edited.
              {initialData.customTimestampDate && initialData.customTimestampTime && initialData.timezone && (
                <div className="mt-1 p-2 bg-blue-50 border border-blue-200 rounded">
                  <strong>Preview:</strong> {initialData.customTimestampDate} {initialData.customTimestampTime} ({getTimezoneDisplayName(initialData.timezone)})
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Timezone</label>
            <select
              name="timezone"
              value={initialData.timezone || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            >
              <option value="">-- Select Timezone --</option>
              <optgroup label="North America">
                <option value="America/New_York">Eastern Time (ET) - New York</option>
                <option value="America/Chicago">Central Time (CT) - Chicago</option>
                <option value="America/Denver">Mountain Time (MT) - Denver</option>
                <option value="America/Los_Angeles">Pacific Time (PT) - Los Angeles</option>
                <option value="America/Phoenix">Arizona Time (MST)</option>
                <option value="America/Anchorage">Alaska Time (AKST)</option>
                <option value="Pacific/Honolulu">Hawaii Time (HST)</option>
                <option value="America/Toronto">Eastern Time - Toronto</option>
                <option value="America/Vancouver">Pacific Time - Vancouver</option>
              </optgroup>
              <optgroup label="Europe">
                <option value="Europe/London">Greenwich Mean Time (GMT) - London</option>
                <option value="Europe/Paris">Central European Time (CET) - Paris</option>
                <option value="Europe/Berlin">Central European Time (CET) - Berlin</option>
                <option value="Europe/Rome">Central European Time (CET) - Rome</option>
                <option value="Europe/Madrid">Central European Time (CET) - Madrid</option>
                <option value="Europe/Amsterdam">Central European Time (CET) - Amsterdam</option>
                <option value="Europe/Moscow">Moscow Time (MSK)</option>
              </optgroup>
              <optgroup label="Asia">
                <option value="Asia/Tokyo">Japan Standard Time (JST) - Tokyo</option>
                <option value="Asia/Shanghai">China Standard Time (CST) - Shanghai</option>
                <option value="Asia/Hong_Kong">Hong Kong Time (HKT)</option>
                <option value="Asia/Singapore">Singapore Time (SGT)</option>
                <option value="Asia/Dubai">Gulf Standard Time (GST) - Dubai</option>
                <option value="Asia/Kolkata">India Standard Time (IST) - Mumbai</option>
                <option value="Asia/Seoul">Korea Standard Time (KST) - Seoul</option>
              </optgroup>
              <optgroup label="Australia & Pacific">
                <option value="Australia/Sydney">Australian Eastern Time (AEST) - Sydney</option>
                <option value="Australia/Melbourne">Australian Eastern Time (AEST) - Melbourne</option>
                <option value="Australia/Perth">Australian Western Time (AWST) - Perth</option>
                <option value="Pacific/Auckland">New Zealand Time (NZST) - Auckland</option>
              </optgroup>
              <optgroup label="Africa">
                <option value="Africa/Cairo">Eastern European Time (EET) - Cairo</option>
                <option value="Africa/Lagos">West Africa Time (WAT) - Lagos</option>
                <option value="Africa/Johannesburg">South Africa Time (SAST) - Johannesburg</option>
              </optgroup>
              <optgroup label="South America">
                <option value="America/Sao_Paulo">Brasília Time (BRT) - São Paulo</option>
                <option value="America/Argentina/Buenos_Aires">Argentina Time (ART) - Buenos Aires</option>
                <option value="America/Lima">Peru Time (PET) - Lima</option>
              </optgroup>
              <optgroup label="UTC">
                <option value="UTC">Coordinated Universal Time (UTC)</option>
              </optgroup>
            </select>
            <div className="text-xs text-gray-500">
              Select the timezone for this shipment. This affects how timestamps are stored and displayed.
            </div>
          </div>

          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Comments</label>
            <textarea
              type="text"
              name="comments"
              value={initialData.comments || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent h-28"
            />
          </div>          <div className="flex flex-col gap-2 my-2">
            <label className="font-semibold">Shipment Status</label>
            <select
              name="status"
              value={initialData.status || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
            >
              <option value="">-- Select Status --</option>
              <option value="Pending">Pending</option>
              <option value="Registered">Registered</option>
              <option value="Picked Up">Picked Up</option>
              <option value="Processing">Processing</option>
              <option value="Custom Clearance">Custom Clearance</option>
              <option value="In Transit">In Transit</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="On Hold">On Hold</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Failed">Failed</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Map container with fixed height */}
      <div className="border border-gray-300 rounded w-[95%] mx-auto bg-gray-50 mb-4">
        <div className="py-2 px-4 border-b border-black font-semibold">Location</div>
        <div className="relative" style={{ height: '400px', width: '100%' }}>
          <ShipmentMap 
            initialLocation={initialLocation}
            onLocationUpdate={handleLocationUpdate}
          />
        </div>
      </div>

      <div className="border border-gray-300 rounded w-[95%] mx-auto bg-gray-50 mb-4">
        <div className="py-2 px-4 border-b border-black font-semibold">Current Location Details</div>
        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Latitude</label>
            <input
              type="text"
              name="latitude"
              value={initialData.latitude || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
              placeholder="Latitude coordinate"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Longitude</label>
            <input
              type="text"
              name="longitude"
              value={initialData.longitude || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
              placeholder="Longitude coordinate"
            />
          </div>          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-semibold">Current Location Description</label>
            <input
              type="text"
              name="currentLocationDescription"
              value={initialData.currentLocationDescription || ''}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent"
              placeholder="E.g., In transit - Chicago warehouse"
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-semibold">Route Progress (%)</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                name="currentLocationPercentage"
                min="0"
                max="100"
                value={initialData.currentLocationPercentage || 0}
                onChange={handleChange}
                className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent flex-1"
                placeholder="Percentage along route (0-100)"
              />
              <span className="text-sm text-gray-600 whitespace-nowrap">
                {initialData.currentLocationPercentage === 0 && "📍 At Origin"}
                {initialData.currentLocationPercentage === 100 && "🎯 At Destination"}
                {initialData.currentLocationPercentage > 0 && initialData.currentLocationPercentage < 100 && "🚚 In Transit"}
                {!initialData.currentLocationPercentage && "📍 At Origin"}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Set to 0% for origin, 100% for destination, or any value in between for current position along the route
            </div>
          </div>
        </div>
      </div>      {/* Route Map container with Current Location Tracking */}
      <div className="border border-gray-300 rounded w-[95%] mx-auto bg-gray-50 mb-4">
        <div className="py-2 px-4 border-b border-black font-semibold">Shipment Route & Current Location Tracking</div>
        <div className="relative" style={{ height: '500px', width: '100%' }}>
          <RouteMap 
            originCoords={originCoords}
            destinationCoords={destinationCoords}
            onOriginUpdate={handleOriginUpdate}
            onDestinationUpdate={handleDestinationUpdate}
            currentLocation={initialData.currentLocationPercentage || 0}
            onCurrentLocationUpdate={handleCurrentLocationUpdate}
            showCurrentLocation={!!(originCoords && destinationCoords)}
          />
        </div>
        {/* Current Location Status */}
        {originCoords && destinationCoords && (
          <div className="p-4 bg-blue-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-blue-800">📍 Current Location Status</h4>
                <p className="text-sm text-blue-600">
                  Shipment is at {initialData.currentLocationPercentage || 0}% of the route
                  {initialData.currentLocationPercentage === 0 && " (At Origin)"}
                  {initialData.currentLocationPercentage === 100 && " (At Destination)"}
                  {initialData.currentLocationPercentage > 0 && initialData.currentLocationPercentage < 100 && " (In Transit)"}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Progress</div>
                <div className="text-lg font-bold text-blue-600">{initialData.currentLocationPercentage || 0}%</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Route Details */}
      <div className="border border-gray-300 rounded w-[95%] mx-auto bg-gray-50 mb-4">
        <div className="py-2 px-4 border-b border-black font-semibold">Route Details</div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Origin Coordinates</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    name="originLatitude"
                    value={initialData.originLatitude || ''}
                    onChange={handleChange}
                    className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent text-sm"
                    placeholder="Origin latitude"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    name="originLongitude"
                    value={initialData.originLongitude || ''}
                    onChange={handleChange}
                    className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent text-sm"
                    placeholder="Origin longitude"
                  />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-red-600 mb-2">Destination Coordinates</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    name="destinationLatitude"
                    value={initialData.destinationLatitude || ''}
                    onChange={handleChange}
                    className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent text-sm"
                    placeholder="Destination latitude"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    name="destinationLongitude"
                    value={initialData.destinationLongitude || ''}
                    onChange={handleChange}
                    className="border border-gray-400 rounded p-2 outline-[#b91c1c] bg-transparent text-sm"
                    placeholder="Destination longitude"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded w-[95%] mx-auto bg-gray-50 mb-4">
        <div className="py-2 px-4 border-b border-black font-semibold">Packages</div>
        <div className="p-4 flex gap-0.5 overflow-x-scroll">
          <div className="min-w-40 text-center border border-gray-300 whitespace-nowrap">
            <h2 className="bg-[#b91c1c] text-white p-1.5 w-full text-sm">Qty</h2>
            <input
              type="number"
              name="productQuantity"
              value={initialData.productQuantity || ''}
              onChange={handleChange}
              className="w-[90%] mx-auto my-0.5 p-1 border border-gray-300 rounded outline-[#b91c1c]"
            />
          </div>
          <div className="min-w-40 text-center border border-gray-300 whitespace-nowrap">
            <h2 className="bg-[#b91c1c] text-white p-1.5 w-full text-sm">Piece Type</h2>            <select
              name="productType"
              value={initialData.productType || ''}
              onChange={handleChange}
              className="w-[90%] mx-auto my-0.5 p-1 border border-gray-300 rounded outline-[#b91c1c]"
            >
              <option value="">
                {" "}
                -- Select Type --
              </option>
              <option value="Pallet">Pallet</option>
              <option value="Carton">Carton</option>
              <option value="Crate">Crate</option>
              <option value="Loose">Loose</option>
              <option value="Box">Box</option>
              <option value="Others">Others</option>
              <option value="Discreet">Discreet</option>
            </select>
          </div>
          <div className="min-w-40 text-center border border-gray-300 whitespace-nowrap">
            <h2 className="bg-[#b91c1c] text-white p-1.5 w-full text-sm">Description</h2>
            <input
              type="text"
              name="description"
              value={initialData.description || ''}
              onChange={handleChange}
              className="w-[90%] mx-auto my-0.5 p-1 border border-gray-300 rounded outline-[#b91c1c]"
            />
          </div>          <div className="min-w-40 text-center border border-gray-300 whitespace-nowrap">
            <h2 className="bg-[#b91c1c] text-white p-1.5 w-full text-sm">Length(in)</h2>
            <input
              type="text"
              name="length"
              value={initialData.length || ''}
              onChange={handleChange}
              className="w-[90%] mx-auto my-0.5 p-1 border border-gray-300 rounded outline-[#b91c1c]"
            />
          </div>
          <div className="min-w-40 text-center border border-gray-300 whitespace-nowrap">
            <h2 className="bg-[#b91c1c] text-white p-1.5 w-full text-sm">Width(in)</h2>
            <input
              type="text"
              name="width"
              value={initialData.width || ''}
              onChange={handleChange}
              className="w-[90%] mx-auto my-0.5 p-1 border border-gray-300 rounded outline-[#b91c1c]"
            />
          </div>
          <div className="min-w-40 text-center border border-gray-300 whitespace-nowrap">
            <h2 className="bg-[#b91c1c] text-white p-1.5 w-full text-sm">Height(in)</h2>
            <input
              type="text"
              name="height"
              value={initialData.height || ''}
              onChange={handleChange}
              className="w-[90%] mx-auto my-0.5 p-1 border border-gray-300 rounded outline-[#b91c1c]"
            />
          </div>
          <div className="min-w-40 text-center border border-gray-300 whitespace-nowrap">
            <h2 className="bg-[#b91c1c] text-white p-1.5 w-full text-sm">Weight(lbs)</h2>
            <input
              type="text"
              name="productWeight"
              value={initialData.productWeight || ''}
              onChange={handleChange}
              className="w-[90%] mx-auto my-0.5 p-1 border border-gray-300 rounded outline-[#b91c1c]"
            />
          </div>
        </div>
      </div>      <div className="border border-gray-300 rounded w-[95%] mx-auto bg-gray-50 mb-4">
        <div className="py-2 px-4 border-b border-black font-semibold">Feature Image</div>
        <div className="p-4">
          {initialData.featuredImage ? (
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={initialData.featuredImage} 
                  alt="Featured" 
                  className="w-full max-w-md mx-auto h-64 object-cover rounded border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Remove image"
                >
                  ×
                </button>
              </div>
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                  className="hidden"
                  id="image-replace"
                />
                <label
                  htmlFor="image-replace"
                  className={`inline-block px-4 py-2 rounded cursor-pointer transition-colors ${
                    imageUploading 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {imageUploading ? 'Uploading...' : 'Replace Image'}
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="space-y-3">
                  <div className="text-4xl text-gray-400">📷</div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageUploading}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className={`inline-block px-6 py-3 rounded cursor-pointer transition-colors ${
                        imageUploading 
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                          : 'bg-[#b91c1c] text-white hover:bg-[#991b1b]'
                      }`}
                    >
                      {imageUploading ? 'Uploading...' : 'Upload Featured Image'}
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Select an image file (max 10MB)
                  </p>
                  <p className="text-xs text-gray-400">
                    Supported formats: JPG, PNG, GIF, WebP
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {imageUploadError && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {imageUploadError}
            </div>
          )}
          
          {imageUploading && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-blue-700 text-sm">
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                <span>Uploading image to Imgur...</span>
              </div>
            </div>
          )}
        </div>
      </div><div className="border border-gray-300 rounded w-[95%] mx-auto bg-gray-50 mb-4">
        <button 
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 px-4 font-semibold border-none ${
            loading 
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
              : 'bg-[#b91c1c] text-white hover:bg-[#991b1b]'
          }`}
        >
          {loading ? 'Creating Shipment...' : buttonText}
        </button>
      </div>
    </form>
  );
}
