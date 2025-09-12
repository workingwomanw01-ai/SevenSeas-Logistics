import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function InvoiceGenerator() {
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingInvoice, setGeneratingInvoice] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    services: [],
    totalAmount: 0,
    taxRate: 10, // 10% tax
    notes: ''
  });

  const notyf = new Notyf({
    position: { x: "right", y: "top" }
  });

  useEffect(() => {
    fetchShipments();
  }, []);
  const fetchShipments = async () => {
    setLoading(true);
    try {
      console.log('Fetching shipments...');
      const res = await fetch("/api/getAllShipments");
      if (res.ok) {
        const data = await res.json();
        console.log('Fetched shipments:', data.shipments);
        setShipments(data.shipments);
      } else {
        console.error('Failed to fetch shipments - status:', res.status);
        notyf.error("Failed to fetch shipments");
      }
    } catch (error) {
      console.error('Error fetching shipments:', error);
      notyf.error("Error fetching shipments");
    } finally {
      setLoading(false);
    }
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.receiver?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || shipment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });  const handleSelectShipment = (shipment) => {
    console.log('Selected shipment:', shipment);
    setSelectedShipment(shipment);
    generateInvoiceData(shipment);
    setShowInvoicePreview(true);
    console.log('Should show invoice preview now');
  };
  const generateInvoiceData = (shipment) => {
    console.log('Generating invoice data for shipment:', shipment);
    
    const baseRate = 100; // Base shipping rate
    const weightMultiplier = parseFloat(shipment.weight) || 1;
    const distanceMultiplier = 1.5; // Estimated based on distance
    
    const services = [
      {
        description: 'Shipping Service',
        quantity: 1,
        rate: baseRate * distanceMultiplier,
        amount: baseRate * distanceMultiplier
      }
    ];

    if (shipment.weight && parseFloat(shipment.weight) > 10) {
      services.push({
        description: 'Heavy Weight Surcharge',
        quantity: 1,
        rate: 25,
        amount: 25
      });
    }

    if (shipment.status === 'Express') {
      services.push({
        description: 'Express Delivery',
        quantity: 1,
        rate: 50,
        amount: 50
      });
    }

    const subtotal = services.reduce((sum, service) => sum + service.amount, 0);
    const currentTaxRate = invoiceData.taxRate || 10; // Use current tax rate or default to 10%
    const taxAmount = subtotal * (currentTaxRate / 100);
    const totalAmount = subtotal + taxAmount;

    const invoiceNumber = `INV-${shipment.trackingNumber}-${Date.now().toString().slice(-4)}`;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    const newInvoiceData = {
      invoiceNumber,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      services,
      subtotal,
      taxAmount,
      totalAmount,
      taxRate: currentTaxRate,
      notes: invoiceData.notes || ''
    };

    console.log('Setting invoice data:', newInvoiceData);
    setInvoiceData(newInvoiceData);
  };

  const handleGenerateInvoice = () => {
    setShowInvoicePreview(true);
  };

  const handlePrintInvoice = () => {
    window.print();
  };  const handleDownloadInvoice = async () => {
    try {
      setGeneratingInvoice(true);
      notyf.success('Generating PDF...');
      console.log('Starting PDF generation...');

      // Get the invoice content element
      const element = document.getElementById('invoice-content');
      if (!element) {
        console.error('Invoice content element not found');
        throw new Error('Invoice content not found');
      }
      console.log('Found invoice content element:', element);

      // Temporarily hide no-print elements for better PDF quality
      const noPrintElements = document.querySelectorAll('.no-print');
      console.log('Found no-print elements:', noPrintElements.length);
      noPrintElements.forEach(el => {
        el.style.display = 'none';
      });

      // Wait a bit for layout to settle
      await new Promise(resolve => setTimeout(resolve, 200));      // Create a style element to override problematic CSS
      const styleOverride = document.createElement('style');
      styleOverride.id = 'pdf-style-override';
      styleOverride.textContent = `
        * {
          color: rgb(0, 0, 0) !important;
          background-color: transparent !important;
          border-color: rgb(204, 204, 204) !important;
        }
        body {
          background-color: rgb(255, 255, 255) !important;
        }
        .no-print {
          display: none !important;
        }
        /* Override any Tailwind CSS variables that might cause issues */
        :root {
          --tw-border-spacing-x: 0;
          --tw-border-spacing-y: 0;
          --tw-translate-x: 0;
          --tw-translate-y: 0;
          --tw-rotate: 0;
          --tw-skew-x: 0;
          --tw-skew-y: 0;
          --tw-scale-x: 1;
          --tw-scale-y: 1;
        }
      `;
      document.head.appendChild(styleOverride);

      console.log('Starting html2canvas capture...');
      // Configure html2canvas options for better compatibility
      const canvas = await html2canvas(element, {
        scale: 1.2, // Reduced scale for better performance
        useCORS: true,
        allowTaint: true, // Allow tainted canvas
        backgroundColor: '#ffffff',
        width: element.offsetWidth,
        height: element.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        logging: false, // Disable logging to avoid noise
        imageTimeout: 20000,
        removeContainer: true,
        foreignObjectRendering: false, // Disable foreign object rendering
        ignoreElements: (element) => {
          // Ignore elements that might cause issues
          return element.classList && element.classList.contains('no-print');
        },
        onclone: (clonedDoc) => {
          // Additional cleanup in the cloned document
          const clonedStyle = clonedDoc.createElement('style');
          clonedStyle.textContent = `
            * {
              color: #000000 !important;
              background-color: transparent !important;
              border-color: #cccccc !important;
            }
            body {
              background-color: #ffffff !important;
            }
          `;
          clonedDoc.head.appendChild(clonedStyle);
        }
      });

      // Remove the style override
      const styleEl = document.getElementById('pdf-style-override');
      if (styleEl) {
        document.head.removeChild(styleEl);
      }

      console.log('Canvas created successfully:', canvas.width, 'x', canvas.height);

      // Restore no-print elements
      noPrintElements.forEach(el => {
        el.style.display = '';
      });

      // Calculate PDF dimensions
      const imgData = canvas.toDataURL('image/jpeg', 0.8); // Use JPEG for smaller file size
      console.log('Canvas converted to data URL');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      // Calculate image dimensions to fit A4
      const imgWidth = pdfWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 10; // 10mm top margin

      console.log('Adding image to PDF...');
      // Add the image to PDF
      pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= (pdfHeight - 20); // Subtract page height minus margins

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= (pdfHeight - 20);
      }

      // Save the PDF
      const fileName = `${invoiceData.invoiceNumber || 'invoice'}.pdf`;
      console.log('Saving PDF as:', fileName);
      pdf.save(fileName);
      
      notyf.success('PDF downloaded successfully');      console.log('PDF generation completed successfully');
    } catch (error) {
      console.error('Detailed error generating PDF:', error);
      console.error('Error stack:', error.stack);
      
      // More specific error messages
      let errorMessage = 'Failed to generate PDF. ';
      if (error.message.includes('canvas') || error.message.includes('oklch')) {
        errorMessage += 'Trying fallback method...';
        notyf.error(errorMessage);
        
        // Try fallback PDF generation
        try {
          await handleDownloadSimplePDF();
          return;
        } catch (fallbackError) {
          console.error('Fallback PDF generation also failed:', fallbackError);
          errorMessage = 'Both PDF generation methods failed. Please try HTML download instead.';
        }
      } else if (error.message.includes('tainted')) {
        errorMessage += 'Image security issue detected. ';
      } else if (error.message.includes('memory')) {
        errorMessage += 'Insufficient memory. ';
      }
      errorMessage += 'Please try again or contact support.';
      
      notyf.error(errorMessage);} finally {
      setGeneratingInvoice(false);
    }
  };
  const handleDownloadSimplePDF = async () => {
    try {
      console.log('Starting simple PDF generation...');
      setGeneratingInvoice(true);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      // Add header
      pdf.setFontSize(28);
      pdf.text('INVOICE', 105, 30, { align: 'center' });
      
      pdf.setFontSize(18);
      pdf.text('Certified Freight Logistics', 105, 40, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.text('Professional Shipping Solutions', 105, 47, { align: 'center' });
      pdf.text('info@certifiedfreightlogistic.com | +1 (209) 353-3619', 105, 52, { align: 'center' });

      // Add line
      pdf.line(20, 60, 190, 60);

      // Invoice details
      let yPos = 75;
      pdf.setFontSize(12);
      pdf.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 20, yPos);
      pdf.text(`Issue Date: ${invoiceData.issueDate}`, 20, yPos + 8);
      pdf.text(`Due Date: ${invoiceData.dueDate}`, 20, yPos + 16);
      pdf.text(`Tracking Number: ${selectedShipment?.trackingNumber}`, 20, yPos + 24);

      // Bill To / Ship To
      yPos += 40;
      pdf.setFontSize(14);
      pdf.text('Bill To:', 20, yPos);
      pdf.text('Ship To:', 110, yPos);
      
      pdf.setFontSize(10);
      yPos += 8;
      pdf.text(selectedShipment?.sender || '', 20, yPos);
      pdf.text(selectedShipment?.receiver || '', 110, yPos);
      yPos += 6;
      pdf.text(selectedShipment?.senderAddress || '', 20, yPos);
      pdf.text(selectedShipment?.receiverAddress || '', 110, yPos);
      yPos += 6;
      pdf.text(selectedShipment?.senderEmail || '', 20, yPos);
      pdf.text(selectedShipment?.receiverEmail || '', 110, yPos);

      // Services table
      yPos += 20;
      pdf.setFontSize(12);
      pdf.text('Description', 20, yPos);
      pdf.text('Qty', 120, yPos);
      pdf.text('Rate', 140, yPos);
      pdf.text('Amount', 170, yPos);
      
      pdf.line(20, yPos + 2, 190, yPos + 2);
      
      yPos += 10;
      pdf.setFontSize(10);
      
      if (invoiceData.services) {
        invoiceData.services.forEach((service) => {
          pdf.text(service.description, 20, yPos);
          pdf.text(service.quantity.toString(), 120, yPos);
          pdf.text(`$${service.rate.toFixed(2)}`, 140, yPos);
          pdf.text(`$${service.amount.toFixed(2)}`, 170, yPos);
          yPos += 8;
        });
      }

      // Totals
      yPos += 10;
      pdf.line(120, yPos, 190, yPos);
      yPos += 8;
      
      pdf.text('Subtotal:', 140, yPos);
      pdf.text(`$${invoiceData.subtotal?.toFixed(2) || '0.00'}`, 170, yPos);
      yPos += 8;
      
      pdf.text(`Tax (${invoiceData.taxRate}%):`, 140, yPos);
      pdf.text(`$${invoiceData.taxAmount?.toFixed(2) || '0.00'}`, 170, yPos);
      yPos += 8;
      
      pdf.setFontSize(12);
      pdf.text('Total:', 140, yPos);
      pdf.text(`$${invoiceData.totalAmount?.toFixed(2) || '0.00'}`, 170, yPos);

      // Notes
      if (invoiceData.notes) {
        yPos += 20;
        pdf.setFontSize(10);
        pdf.text('Notes:', 20, yPos);
        yPos += 8;
        pdf.text(invoiceData.notes, 20, yPos);
      }

      // Footer
      yPos = 280;
      pdf.setFontSize(8);
      pdf.text('Certified Freight Logistics - Your trusted shipping partner', 105, yPos, { align: 'center' });
      pdf.text('Thank you for choosing our services!', 105, yPos + 5, { align: 'center' });

      // Save the PDF
      const fileName = `${invoiceData.invoiceNumber || 'invoice'}.pdf`;
      console.log('Saving simple PDF as:', fileName);
      pdf.save(fileName);
      
      notyf.success('PDF downloaded successfully');
      console.log('Simple PDF generation completed successfully');
    } catch (error) {
      console.error('Error in simple PDF generation:', error);
      notyf.error('Failed to generate PDF. Please try HTML download instead.');
      throw error;    } finally {
      setGeneratingInvoice(false);
    }
  };

  const handleDownloadHTML = () => {
    try {
      // Create a simple invoice HTML and trigger download
      const invoiceHTML = generateInvoiceHTML();
      const blob = new Blob([invoiceHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${invoiceData.invoiceNumber}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      notyf.success('HTML file downloaded successfully');
    } catch (error) {
      console.error('Error downloading HTML:', error);
      notyf.error('Failed to download HTML file');
    }
  };

  const handleSaveInvoice = async () => {
    try {
      const invoiceToSave = {
        shipmentId: selectedShipment.id,
        trackingNumber: selectedShipment.trackingNumber,
        ...invoiceData,
        shipmentData: selectedShipment
      };

      const response = await fetch('/api/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceToSave),
      });

      if (response.ok) {
        notyf.success('Invoice saved successfully');
      } else {
        const error = await response.json();
        notyf.error(`Failed to save invoice: ${error.error}`);
      }
    } catch (error) {
      notyf.error('Error saving invoice');
      console.error('Error saving invoice:', error);
    }
  };  const generateInvoiceHTML = () => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Invoice ${invoiceData.invoiceNumber}</title>
        <style>            body { font-family: Arial, sans-serif; margin: 20px; }            .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; }
            .logo-section { display: flex; align-items: center; }
            .simple-logo { height: 60px; width: 60px; background-color: #2563eb; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 20px; }
            .simple-logo span { color: white; font-weight: bold; font-size: 24px; }
            .company-info h1 { margin: 0; font-size: 28px; color: #333; }
            .company-info h2 { margin: 5px 0 0 0; font-size: 18px; color: #666; }
            .invoice-info { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .billing-info { display: flex; justify-content: space-between; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .totals { float: right; width: 300px; }
            .total-row { font-weight: bold; }
            @media (max-width: 768px) {
                body { margin: 10px; font-size: 14px; }
                .header { flex-direction: column; text-align: center; }
                .header > div:last-child { margin-top: 15px; text-align: center; }
                .logo-section { flex-direction: column; text-align: center; }
                .simple-logo { margin-right: 0; margin-bottom: 10px; height: 50px; width: 50px; }
                .invoice-info, .billing-info { flex-direction: column; }
                .invoice-info > div:last-child, .billing-info > div:last-child { margin-top: 15px; }
                th, td { padding: 6px; font-size: 13px; }
                .totals { width: 100%; float: none; margin-top: 15px; }
            }
            @media print {
                .header { page-break-inside: avoid; }
                .simple-logo { height: 50px; width: 50px; }
            }
        </style>
    </head>
    <body>        <div class="header">
            <div class="logo-section">
                <div class="simple-logo">
                    <span>EL</span>
                </div>                <div class="company-info">
                    <h1>INVOICE</h1>
                    <h2>Certified Freight Logistics</h2>
                </div>
            </div>
            <div style="text-align: right; font-size: 12px; color: #666;">
                <p style="font-weight: bold; margin: 0;">Certified Freight Logistics</p>
                <p style="margin: 2px 0;">Professional Shipping Solutions</p>
                <p style="margin: 2px 0;">info@certifiedfreightlogistic.com</p>
                <p style="margin: 2px 0;">+1 (209) 353-3619</p>
            </div>
        </div>
        
        <div class="invoice-info">
            <div>
                <strong>Invoice Number:</strong> ${invoiceData.invoiceNumber}<br>
                <strong>Issue Date:</strong> ${invoiceData.issueDate}<br>
                <strong>Due Date:</strong> ${invoiceData.dueDate}
            </div>
            <div>
                <strong>Tracking Number:</strong> ${selectedShipment?.trackingNumber}
            </div>
        </div>
        
        <div class="billing-info">
            <div>
                <h3>Bill To:</h3>
                <strong>${selectedShipment?.sender}</strong><br>
                ${selectedShipment?.senderAddress}<br>
                Email: ${selectedShipment?.senderEmail}<br>
                Phone: ${selectedShipment?.senderNumber}
            </div>
            <div>
                <h3>Ship To:</h3>
                <strong>${selectedShipment?.receiver}</strong><br>
                ${selectedShipment?.receiverAddress}<br>
                Email: ${selectedShipment?.receiverEmail}<br>
                Phone: ${selectedShipment?.receiverNumber}
            </div>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                ${invoiceData.services.map(service => `
                    <tr>
                        <td>${service.description}</td>
                        <td>${service.quantity}</td>
                        <td>$${service.rate.toFixed(2)}</td>
                        <td>$${service.amount.toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <div class="totals">
            <table>
                <tr>
                    <td>Subtotal:</td>
                    <td>$${invoiceData.subtotal?.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Tax (${invoiceData.taxRate}%):</td>
                    <td>$${invoiceData.taxAmount?.toFixed(2)}</td>
                </tr>
                <tr class="total-row">
                    <td>Total:</td>
                    <td>$${invoiceData.totalAmount?.toFixed(2)}</td>
                </tr>
            </table>
        </div>        
        ${invoiceData.notes ? `<div style="margin-top: 30px;"><strong>Notes:</strong><br>${invoiceData.notes}</div>` : ''}
        
        <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 12px; color: #666;">
            <p style="margin: 5px 0;"><strong>Certified Freight Logistics</strong> - Your trusted shipping partner</p>
            <p style="margin: 5px 0;">Thank you for choosing our services!</p>
            <p style="margin: 5px 0;">For questions about this invoice, contact us at info@certifiedfreightlogistic.com or +1 (209) 353-3619</p>
        </div>
    </body>
    </html>`;
  };
  if (loading) {
    return <LoadingSpinner />;
  }

  console.log('Current state - shipments:', shipments.length, 'showInvoicePreview:', showInvoicePreview, 'selectedShipment:', selectedShipment);
  console.log('Filtered shipments:', filteredShipments.length);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Invoice Generator</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by tracking number, sender, or receiver..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Express">Express</option>
          </select>
        </div>
      </div>

      {/* Shipments List */}
      {!showInvoicePreview ? (
        <div className="bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Receiver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {shipment.trackingNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {shipment.sender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {shipment.receiver}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                        shipment.status === 'Express' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(shipment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleSelectShipment(shipment)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                      >
                        Generate Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredShipments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No shipments found</p>
            </div>
          )}
        </div>
      ) : (        /* Invoice Preview */
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-8">          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 no-print">
            <h2 className="text-xl font-bold">Invoice Preview</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {/* <button
                onClick={() => setShowInvoicePreview(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Back to List
               </button>    
                    <button 
                onClick={handlePrintInvoice}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Print Invoice
              </button> */}
              {/* <button
                onClick={handleSaveInvoice}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Save Invoice
              </button>          */}
                   <button
                onClick={handleDownloadInvoice}
                disabled={generatingInvoice}
                className={`px-4 py-2 rounded-md transition-colors duration-200 text-sm ${
                  generatingInvoice 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {generatingInvoice ? 'Generating PDF...' : 'Download PDF'}
              </button>
              {/* <button
                onClick={handleDownloadSimplePDF}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 text-sm"
              >
                Simple PDF
              </button> */}
              <button
                onClick={handleDownloadHTML}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors duration-200 text-sm"
              >
                Download HTML
              </button>
            </div>
          </div>          {/* Invoice Content */}
          <div className="border-2 border-gray-300 p-4 sm:p-8 bg-white" id="invoice-content" style={{minHeight: '800px'}}>            <div className="border-b-2 border-gray-800 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="h-12 w-12 sm:h-16 sm:w-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto sm:mx-0">
                  <span className="text-white font-bold text-lg">EL</span>
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold">INVOICE</h1>
                  <h2 className="text-lg sm:text-xl text-gray-600">Certified Freight Logistics</h2>
                </div>
              </div><div className="text-center sm:text-right text-sm text-gray-600">
                <p className="font-semibold">Certified Freight Logistics</p>
                <p>Professional Shipping Solutions</p>
                <p>info@certifiedfreightlogistic.com</p>
                <p>+1 (209) 353-3619</p>
              </div>
            </div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8">
              <div>
                <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
                <p><strong>Issue Date:</strong> {invoiceData.issueDate}</p>
                <p><strong>Due Date:</strong> {invoiceData.dueDate}</p>
              </div>
              <div className="text-left sm:text-right">
                <p><strong>Tracking Number:</strong> {selectedShipment?.trackingNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-2">Bill To:</h3>
                <p className="font-semibold">{selectedShipment?.sender}</p>
                <p>{selectedShipment?.senderAddress}</p>
                <p>Email: {selectedShipment?.senderEmail}</p>
                <p>Phone: {selectedShipment?.senderNumber}</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Ship To:</h3>
                <p className="font-semibold">{selectedShipment?.receiver}</p>
                <p>{selectedShipment?.receiverAddress}</p>
                <p>Email: {selectedShipment?.receiverEmail}</p>
                <p>Phone: {selectedShipment?.receiverNumber}</p>
              </div>
            </div>            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300 min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-sm">Description</th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-sm">Qty</th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-sm">Rate</th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-sm">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.services.map((service, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-sm">{service.description}</td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-sm">{service.quantity}</td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-sm">${service.rate.toFixed(2)}</td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-sm">${service.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>            <div className="flex justify-center sm:justify-end">
              <div className="w-full sm:w-64">
                <table className="w-full">
                  <tr>
                    <td className="py-1 text-sm">Subtotal:</td>
                    <td className="py-1 text-right text-sm">${invoiceData.subtotal?.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-sm">Tax ({invoiceData.taxRate}%):</td>
                    <td className="py-1 text-right text-sm">${invoiceData.taxAmount?.toFixed(2)}</td>
                  </tr>
                  <tr className="border-t border-gray-300 font-bold">
                    <td className="py-2 text-sm">Total:</td>
                    <td className="py-2 text-right text-sm">${invoiceData.totalAmount?.toFixed(2)}</td>
                  </tr>
                </table>
              </div>
            </div>{invoiceData.notes && (
              <div className="mt-8">
                <h3 className="font-bold mb-2">Notes:</h3>
                <p>{invoiceData.notes}</p>
              </div>
            )}

            {/* Invoice Footer */}
            <div className="mt-12 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
              <p className="font-semibold mb-2">Certified Freight Logistics - Your trusted shipping partner</p>
              <p className="mb-1">Thank you for choosing our services!</p>
              <p>For questions about this invoice, contact us at info@certifiedfreightlogistic.com or +1 (209) 353-3619</p>
            </div>
          </div>{/* Invoice Settings */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg no-print">
            <h3 className="font-bold mb-4">Invoice Settings</h3>            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                <input
                  type="number"
                  value={invoiceData.taxRate}
                  onChange={(e) => {
                    const newTaxRate = parseFloat(e.target.value) || 0;
                    const subtotal = invoiceData.services.reduce((sum, service) => sum + service.amount, 0);
                    const taxAmount = subtotal * (newTaxRate / 100);
                    const totalAmount = subtotal + taxAmount;
                    
                    setInvoiceData({
                      ...invoiceData,
                      taxRate: newTaxRate,
                      taxAmount,
                      totalAmount
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any additional notes here..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
