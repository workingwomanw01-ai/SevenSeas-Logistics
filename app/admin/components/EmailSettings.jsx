"use client";

import { useState } from 'react';
import { Notyf } from "notyf";

export default function EmailSettings() {
  const [loading, setLoading] = useState(false);
  const [testEmailType, setTestEmailType] = useState('admin');
  const [emailType, setEmailType] = useState('created');
  const [notyf] = useState(new Notyf({ position: { x: "right", y: "top" } }));

  const sendTestEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: emailType,
          emailType: testEmailType,
          shipmentData: {
            trackingNumber: `EWL-TEST-${Date.now()}`,
            sender: 'Test Sender',
            senderEmail: 'test-sender@example.com',
            receiver: 'Test Receiver',
            receiverEmail: 'test-receiver@example.com',
            origin: 'Test Origin',
            destination: 'Test Destination',
            status: emailType === 'created' ? 'Pending' : 'In Transit',
            currentLocationPercentage: emailType === 'updated' ? 75 : 0
          }
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        notyf.success('Test email sent successfully!');
      } else {
        notyf.error(data.message || 'Failed to send test email');
      }
    } catch (error) {
      console.error('Error sending test email:', error);
      notyf.error('Error sending test email');
    } finally {
      setLoading(false);
    }
  };  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">📧 Email Settings & Testing</h1>
      
      <div className="space-y-6 max-w-4xl">
        {/* Configuration Status */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">Configuration Status</h3>
          <div className="text-sm text-blue-700">
            <p className="mb-3">✅ Email service is integrated and ready</p>
            <p className="mb-3">⚙️ Configure these environment variables in your .env.local file:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><code className="bg-blue-100 px-2 py-1 rounded">EMAIL_USER</code> - Your Gmail address</li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">EMAIL_APP_PASSWORD</code> - Gmail App Password</li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">ADMIN_EMAIL</code> - Admin notification email</li>
            </ul>
          </div>
        </div>

        {/* Email Features */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-green-800 mb-3">Automated Email Features</h3>
          <div className="text-sm text-green-700 space-y-3">
            <p>📤 <strong>Shipment Created:</strong> Automatic emails sent to admin and customers</p>
            <p>🔄 <strong>Shipment Updated:</strong> Notifications when status or details change</p>
            <p>👥 <strong>Multi-recipient:</strong> Sender and receiver both notified</p>
            <p>🎨 <strong>Professional Templates:</strong> HTML formatted emails with shipment details</p>
          </div>
        </div>

        {/* Test Email Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Test Email Functionality</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Type
              </label>
              <select 
                value={emailType}
                onChange={(e) => setEmailType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="created">Shipment Created</option>
                <option value="updated">Shipment Updated</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipients
              </label>
              <select 
                value={testEmailType}
                onChange={(e) => setTestEmailType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="admin">Admin Only</option>
                <option value="customer">Customers Only</option>
                <option value="both">Admin & Customers</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={sendTestEmail}
            disabled={loading}
            className={`w-full md:w-auto px-8 py-3 rounded-md font-medium transition-colors text-lg ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {loading ? 'Sending...' : 'Send Test Email'}
          </button>
        </div>

        {/* Setup Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-yellow-800 mb-3">Setup Instructions</h3>
          <div className="text-sm text-yellow-700 space-y-3">
            <div>
              <p><strong>1. Gmail Setup:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                <li>Enable 2-factor authentication on your Gmail account</li>
                <li>Generate an App Password (not your regular password)</li>
                <li>Use this App Password in EMAIL_APP_PASSWORD</li>
              </ul>
            </div>
            <div>
              <p><strong>2. Environment Variables:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                <li>Create a .env.local file in your project root</li>
                <li>Add the email configuration variables</li>
                <li>Restart your development server</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">How It Works</h3>
          <div className="text-sm text-gray-700 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">📧 Shipment Created</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Admin gets detailed notification</li>
                  <li>Customers receive confirmation</li>
                  <li>Includes tracking number</li>
                  <li>Shows sender/receiver info</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">🔄 Shipment Updated</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Status change notifications</li>
                  <li>Progress updates included</li>
                  <li>Highlights what changed</li>
                  <li>Automatic delivery to all parties</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
