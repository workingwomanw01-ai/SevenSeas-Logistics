"use client";

import { useState } from 'react';

export default function CustomEmail() {
  const [formData, setFormData] = useState({
    recipientEmail: '',
    recipientName: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/email/send-custom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          type: 'success',
          message: 'Email sent successfully!'
        });
        // Clear form after successful send
        setFormData({
          recipientEmail: '',
          recipientName: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Failed to send email'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Network error. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      recipientEmail: '',
      recipientName: '',
      subject: '',
      message: ''
    });
    setStatus({ type: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <i className="fas fa-envelope-open mr-3 text-blue-600"></i>
            Send Custom Email
          </h2>
          <p className="text-gray-600 mt-2">
            Create and send custom emails using the company template
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Status Messages */}
          {status.message && (
            <div className={`p-4 rounded-md border-l-4 ${
              status.type === 'success' 
                ? 'bg-green-50 border-green-400 text-green-700' 
                : 'bg-red-50 border-red-400 text-red-700'
            }`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className={`fas ${
                    status.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'
                  } text-sm`}></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{status.message}</p>
                </div>
              </div>
            </div>
          )}

          {/* Recipient Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Email *
              </label>
              <input
                type="email"
                id="recipientEmail"
                name="recipientEmail"
                value={formData.recipientEmail}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="recipient@example.com"
              />
            </div>

            <div>
              <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Name
              </label>
              <input
                type="text"
                id="recipientName"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Email Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Important Update from Certified Freight Logistics"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Email Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="8"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
              placeholder="Write your message here...

You can use multiple paragraphs by pressing Enter.

The email will be formatted with our company branding and template."
            />
            <p className="text-sm text-gray-500 mt-2">
              Tip: Press Enter to create new paragraphs. The message will be formatted automatically.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane mr-2"></i>
                  Send Email
                </>
              )}
            </button>

            <button
              type="button"
              onClick={clearForm}
              disabled={loading}
              className="flex-1 sm:flex-none px-6 py-3 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <i className="fas fa-eraser mr-2"></i>
              Clear Form
            </button>
          </div>
        </form>

        {/* Email Preview Info */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            <i className="fas fa-info-circle mr-2 text-blue-500"></i>
            Email Template Preview
          </h3>
          <p className="text-sm text-gray-600">
            Your custom email will be sent using the company template with:
          </p>
          <ul className="text-sm text-gray-600 mt-2 ml-4 space-y-1">
            <li>• Company header with logo and branding</li>
            <li>• Professional formatting and styling</li>
            <li>• Responsive design for all devices</li>
            <li>• Company footer and contact information</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
