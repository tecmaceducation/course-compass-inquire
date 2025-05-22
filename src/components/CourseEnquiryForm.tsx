
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, MapPin, Mail, Phone, User, Home } from 'lucide-react';

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  courseOfInterest: string;
}

interface CourseEnquiryFormProps {
  onSubmitSuccess: () => void;
}

const CourseEnquiryForm: React.FC<CourseEnquiryFormProps> = ({ onSubmitSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    pinCode: '',
    city: '',
    state: '',
    courseOfInterest: ''
  });
  
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState<string | null>(null);

  // Courses organized by category
  const courseCategories = [
    {
      name: "Programming Courses",
      courses: [
        "Master In Software Technology (MST)",
        "Advanced Diploma In Basic Programming (ADBP)",
        "Advanced Diploma In Java Programming (ADJP)",
        "Advanced Diploma In Python Programming (ADPP)",
        "Full Stack Java Programming",
        "Full Stack Python Programming",
        "Full Stack Web Development"
      ]
    },
    {
      name: "Financial Courses",
      courses: [
        "Advanced Diploma In Computer Application (ADCA)",
        "Diploma In Computer Application (DCA)",
        "Tally ERP 9",
        "Tally Prime"
      ]
    },
    {
      name: "Multimedia Courses",
      courses: [
        "Master Diploma In Graphic Animation (MDGA)",
        "UI/UX Designing",
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Adobe XD",
        "Coral Draw"
      ]
    }
  ];

  // Get all courses for the select input
  const getAllCourses = () => {
    if (!selectedCourseCategory) {
      return [];
    }
    
    const category = courseCategories.find(cat => cat.name === selectedCourseCategory);
    return category ? category.courses : [];
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fetchLocationFromPinCode = async (pinCode: string) => {
    if (pinCode.length !== 6 || !/^\d{6}$/.test(pinCode)) {
      return;
    }

    setIsLoadingLocation(true);
    console.log('Fetching location for pin code:', pinCode);

    try {
      // Using the Indian Postal Pin Code API
      const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
      const data = await response.json();
      
      console.log('Pin code API response:', data);

      if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice?.length > 0) {
        const postOffice = data[0].PostOffice[0];
        const city = postOffice.District;
        const state = postOffice.State;
        
        setFormData(prev => ({
          ...prev,
          city: city,
          state: state
        }));

        toast({
          title: "Location found!",
          description: `${city}, ${state}`,
        });
      } else {
        toast({
          title: "Invalid Pin Code",
          description: "Please enter a valid 6-digit Indian pin code",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      toast({
        title: "Error",
        description: "Failed to fetch location. Please enter city and state manually.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handlePinCodeChange = (value: string) => {
    handleInputChange('pinCode', value);
    
    // Auto-fetch location when pin code is 6 digits
    if (value.length === 6 && /^\d{6}$/.test(value)) {
      fetchLocationFromPinCode(value);
    } else {
      // Clear city and state if pin code is invalid
      setFormData(prev => ({ ...prev, city: '', state: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['fullName', 'phoneNumber', 'email', 'address', 'pinCode', 'city', 'state', 'courseOfInterest'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Please fill all required fields",
        description: "All fields are required to submit the enquiry",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit Indian mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting form data:', formData);

    try {
      // Store the enquiry data in localStorage for now
      const existingEnquiries = JSON.parse(localStorage.getItem('courseEnquiries') || '[]');
      const newEnquiry = {
        ...formData,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };
      
      existingEnquiries.push(newEnquiry);
      localStorage.setItem('courseEnquiries', JSON.stringify(existingEnquiries));

      toast({
        title: "Enquiry Submitted Successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        pinCode: '',
        city: '',
        state: '',
        courseOfInterest: ''
      });
      setSelectedCourseCategory(null);

      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="flex items-center justify-center mb-2">
          <GraduationCap className="h-8 w-8 mr-2" />
          <CardTitle className="text-2xl">Course Enquiry Form</CardTitle>
        </div>
        <CardDescription className="text-blue-100">
          Fill out this form to enquire about our courses. We'll get back to you soon!
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  maxLength={10}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Home className="h-5 w-5 mr-2 text-blue-600" />
              Address Information
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="address">Complete Address *</Label>
              <Input
                id="address"
                placeholder="House/Flat No., Street, Area, Landmark"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pinCode">Pin Code *</Label>
                <div className="relative">
                  <Input
                    id="pinCode"
                    placeholder="6-digit pin code"
                    value={formData.pinCode}
                    onChange={(e) => handlePinCodeChange(e.target.value)}
                    maxLength={6}
                    required
                  />
                  {isLoadingLocation && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                  className={formData.city ? 'bg-green-50 border-green-200' : ''}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  required
                  className={formData.state ? 'bg-green-50 border-green-200' : ''}
                />
              </div>
            </div>
          </div>

          {/* Course Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
              Course Information
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="courseCategory">Course Category *</Label>
                <Select
                  value={selectedCourseCategory || ""}
                  onValueChange={(value) => setSelectedCourseCategory(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course category" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseCategories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="courseOfInterest">Course of Interest *</Label>
                <Select
                  value={formData.courseOfInterest}
                  onValueChange={(value) => handleInputChange('courseOfInterest', value)}
                  disabled={!selectedCourseCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={selectedCourseCategory ? "Select a course" : "Please select a category first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {getAllCourses().map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Submitting...
              </div>
            ) : (
              'Submit Enquiry'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseEnquiryForm;
