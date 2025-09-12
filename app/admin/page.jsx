"use client";

import { useState, useContext, useEffect } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import AdminLayout from './components/AdminLayout';
import ShipmentForm from './components/ShipmentForm';
import EditShipment from './components/EditShipment';
import EmailSettings from './components/EmailSettings';
import CustomEmail from './components/CustomEmail';
import InvoiceGenerator from './components/InvoiceGenerator';
import style from "./page.module.css";
import ShipmentContext from "@/contexts/ShipmentContext";

export default function Admin() {
  const [activeAside, setActiveAside] = useState("Add");
  const { user } = useContext(ShipmentContext);
  const [formData, setFormData] = useState({});
  const [trackingNumber, setTrackingNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notyf, setNotyf] = useState(null);

  useEffect(() => {
    setNotyf(new Notyf({
      position: { x: "right", y: "top" }
    }));
  }, []);

  const showNotification = (type, message) => {
    if (notyf) {
      notyf[type](message);
    }
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    setError(null);

    const requiredFields = [
      'sender', 'senderEmail', 'senderNumber', 'senderAddress',
      'receiver', 'receiverEmail', 'receiverNumber', 'receiverAddress',
      'origin', 'destination'
    ];
    
    console.log('Form data being validated:', formData);
    
    const missingFields = requiredFields.filter(field => {
      const value = formData[field];
      return !value || value.trim() === '';
    });
    
    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => field.replace(/([A-Z])/g, ' $1').toLowerCase());
      showNotification('error', `Please fill in: ${fieldNames.join(', ')}`);
      setLoading(false);
      return;
    }    try {
      const shipmentData = {
        ...formData,
        status: formData.status || "Pending",
        createdAt: new Date().toISOString(),
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        originLatitude: formData.originLatitude ? parseFloat(formData.originLatitude) : null,
        originLongitude: formData.originLongitude ? parseFloat(formData.originLongitude) : null,
        destinationLatitude: formData.destinationLatitude ? parseFloat(formData.destinationLatitude) : null,
        destinationLongitude: formData.destinationLongitude ? parseFloat(formData.destinationLongitude) : null,
        currentLocationPercentage: formData.currentLocationPercentage ? parseFloat(formData.currentLocationPercentage) : 0,
        quantity: formData.quantity ? parseInt(formData.quantity) : 0,
        productQuantity: formData.productQuantity ? parseInt(formData.productQuantity) : 0,
        weight: formData.weight || "0",
        productWeight: formData.productWeight || "0",
      };

      const res = await fetch("/api/createShipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shipmentData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await res.json();
      setTrackingNumber(data.trackingNumber);
      showNotification('success', "Shipment created successfully");
    } catch (error) {
      setError(error.message);
      showNotification('error', "An error occurred check tracking Info");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (updatedData) => {
    console.log('Form data updated:', updatedData);
    setFormData(prevData => ({
      ...prevData,
      ...updatedData
    }));
  };

  useEffect(() => {
    console.log('Current form data:', formData);
  }, [formData]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(trackingNumber)
      .then(() => {
        showNotification('success', "Copied to clipboard");
      })
      .catch((err) => {
        showNotification('error', "Failed to copy text");
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <AdminLayout activeAside={activeAside} setActiveAside={setActiveAside}>
      {loading && (
        <div className="loadingStuff">
          <div className="loader">Loading...</div>
        </div>
      )}
        {activeAside === "Add" && (
        <section className={style.scroll}>
          <h1>Create shipment</h1>
          <ShipmentForm
            initialData={formData}
            onSubmit={handleFormSubmit} 
            onChange={handleFormChange}
            buttonText="Create Shipment"
            loading={loading}
          />
          {trackingNumber && (
            <div className={style.num}>
              <h2>Your tracking number is:</h2>
              <div className={style.track}>
                <p>{trackingNumber}</p>
                <button onClick={handleCopyClick}>copy</button>
              </div>
            </div>
          )}
        </section>      )}        {activeAside === "Edit" && <EditShipment />}
      {activeAside === "Email" && (
        <section className={style.scroll}>
          <EmailSettings />
        </section>
      )}      {activeAside === "CustomEmail" && (
        <section className={style.scroll}>
          <CustomEmail />
        </section>
      )}
      {activeAside === "Invoice" && (
        <section className={style.scroll}>
          <InvoiceGenerator />
        </section>
      )}
      {activeAside === "Tracking" && <h1>Tracking</h1>}
    </AdminLayout>
  );
}
