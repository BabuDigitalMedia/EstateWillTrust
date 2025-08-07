import React from 'react';
import { CheckCircle, Download, FileText, Shield } from 'lucide-react';

export function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Thank you for choosing Grow-Shine Financial for your estate planning needs.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What Happens Next?
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Document Preparation
                </h3>
                <p className="text-gray-600">
                  Your attorney-drafted estate planning documents are being prepared based on your state's specific legal requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Access Your Documents
                </h3>
                <p className="text-gray-600">
                  You'll receive an email within 24 hours with instructions on how to access and download your complete estate planning package.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 rounded-full p-3 flex-shrink-0">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Lifetime Support
                </h3>
                <p className="text-gray-600">
                  Remember, you have lifetime access to update your documents at no additional cost as your life circumstances change.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Need Immediate Assistance?
          </h3>
          <p className="text-blue-800 mb-4">
            Our team is here to help with any questions about your estate planning documents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="text-sm">
              <span className="font-medium">Phone:</span> +1 (609) 674-7817
            </div>
            <div className="text-sm">
              <span className="font-medium">Email:</span> solve@growshinefin.com
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}