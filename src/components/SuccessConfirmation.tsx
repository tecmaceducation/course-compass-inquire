
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, GraduationCap, Mail, Phone, Clock } from 'lucide-react';

interface SuccessConfirmationProps {
  onBackToForm: () => void;
}

const SuccessConfirmation: React.FC<SuccessConfirmationProps> = ({ onBackToForm }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-blue-50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <CheckCircle className="h-20 w-20 text-green-500 animate-pulse" />
              <div className="absolute inset-0 h-20 w-20 bg-green-500 rounded-full opacity-20 animate-ping"></div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
            Thank You!
          </CardTitle>
          <p className="text-lg text-gray-600">
            Your course enquiry has been submitted successfully
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6 p-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />
              What happens next?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Quick Response</p>
                  <p className="text-sm text-gray-600">Our admissions team will review your enquiry within 2-4 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Personal Call</p>
                  <p className="text-sm text-gray-600">We'll call you within 24 hours to discuss course details and answer your questions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Detailed Information</p>
                  <p className="text-sm text-gray-600">You'll receive comprehensive course information and admission guidelines via email</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Need immediate assistance?</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>📞 Call us: <span className="font-medium">+91 12345 67890</span></p>
              <p>📧 Email: <span className="font-medium">admissions@institution.edu</span></p>
              <p>🕒 Office Hours: Monday - Saturday, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={onBackToForm}
              variant="outline"
              className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Submit Another Enquiry
            </Button>
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open('https://institution.edu', '_blank')}
            >
              Visit Our Website
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessConfirmation;
