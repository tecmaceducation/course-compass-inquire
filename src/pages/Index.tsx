
import React, { useState } from 'react';
import CourseEnquiryForm from '@/components/CourseEnquiryForm';
import SuccessConfirmation from '@/components/SuccessConfirmation';
import { GraduationCap, Users, Award, BookOpen, Code, Database, Palette } from 'lucide-react';

const Index = () => {
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  const handleSubmitSuccess = () => {
    setShowSuccessPage(true);
  };

  const handleBackToForm = () => {
    setShowSuccessPage(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tecmac Education</h1>
                <p className="text-sm text-gray-600">Enhancing Skills, Empowering Futures</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Code className="h-4 w-4" />
                <span>Programming</span>
              </div>
              <div className="flex items-center space-x-1">
                <Database className="h-4 w-4" />
                <span>Financial</span>
              </div>
              <div className="flex items-center space-x-1">
                <Palette className="h-4 w-4" />
                <span>Multimedia</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showSuccessPage ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Start Your Learning Journey
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Discover industry-relevant courses at Tecmac Education designed to help you achieve your career goals. 
                Fill out our enquiry form and take the first step towards your future success.
              </p>
              
              {/* Address Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto mb-12">
                <div className="flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold">Our Location</h2>
                </div>
                <p className="text-gray-700">
                  Tecmac Education, Sow-Ma Complex,<br />
                  243, 1st Floor, Sathy Rd,<br />
                  Gandhipuram, Coimbatore,<br />
                  Tamil Nadu 641012
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm">+91 9994779308</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm">tecmaceducation@gmail.com</span>
                  </div>
                </div>
              </div>
              
              {/* Course Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Code className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Programming Courses</h3>
                  <p className="text-sm text-gray-600">Master Software Technology, Java, Python, and Full Stack Development</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Database className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Financial Courses</h3>
                  <p className="text-sm text-gray-600">Computer Applications, Tally ERP 9, and Tally Prime</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Palette className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multimedia Courses</h3>
                  <p className="text-sm text-gray-600">Graphic Animation, UI/UX Design, and Adobe Creative Suite</p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <CourseEnquiryForm onSubmitSuccess={handleSubmitSuccess} />

            {/* Features Section */}
            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Tecmac Education?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Expert Faculty</h3>
                  <p className="text-sm text-gray-600">Learn from industry experts with years of practical experience</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Industry-Relevant</h3>
                  <p className="text-sm text-gray-600">Curriculum designed to meet current industry demands</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Flexible Learning</h3>
                  <p className="text-sm text-gray-600">Online, offline, and hybrid learning options available</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Career Support</h3>
                  <p className="text-sm text-gray-600">Dedicated placement assistance and career guidance</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <SuccessConfirmation onBackToForm={handleBackToForm} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Tecmac Education</h3>
                  <p className="text-sm text-gray-400">Enhancing Skills, Empowering Futures</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Providing quality education and industry-relevant skills to students across various disciplines.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📍 Tecmac Education, Sow-Ma Complex, 243, 1st Floor, Sathy Rd, Gandhipuram, Coimbatore, Tamil Nadu 641012</p>
                <p>📞 +91 9994779308</p>
                <p>📧 tecmaceducation@gmail.com</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Course Categories</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Programming Courses</p>
                <p>• Financial Courses</p>
                <p>• Multimedia Courses</p>
                <p>• Admissions</p>
                <p>• Career Services</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>&copy; 2024 Tecmac Education. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
