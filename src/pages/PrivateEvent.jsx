import React, {  use, useContext, useEffect, useState } from 'react';
import { Calendar, Clock, Users, ChefHat, Phone, Mail, MapPin, Check, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import {getMenuPackages} from '../data/menuData'; 
import { getEventTypes } from '../data/menuData';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';
import { AuthContext } from '@/context/AuthContext';

 const PrivateEventBooking=() =>{
    const { user } = useContext(AuthContext);
    const menuPackages = getMenuPackages();
    const eventTypes = getEventTypes();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    userId: user?.uid || 'guest',
    phone: user?.phone || '',
    eventDate: '',
    eventTime: '',
    guestCount: '',
    eventType: '',
    budget: '',
    type:'event',
    menuPackage: '',
    dietaryRestrictions: '',
    specialRequests: '',
    contactMethod: 'phone',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    budget:'',
    eventDate: '',
    eventTime: '',
    guestCount: '',
    eventType: '',
    menuPackage: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Reset form data if user changes
    if (user) {
        setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        userId: user.uid || 'guest'
        }));
    }
    }, [user]);

   


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error on change
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      budget:'',
      phone: '',
      eventDate: '',
      eventTime: '',
      guestCount: '',
      eventType: '',
      menuPackage: ''
    };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
      isValid = false;
    }

    if (!formData.eventDate) {
      newErrors.eventDate = 'Event date is required';
      isValid = false;
    }

    if (!formData.eventTime) {
      newErrors.eventTime = 'Event time is required';
      isValid = false;
    }

    if (!formData.guestCount) {
      newErrors.guestCount = 'Number of guests is required';
      isValid = false;
    } else if (formData.guestCount < 10) {
      newErrors.guestCount = 'Minimum number of guests is 10';
      isValid = false;
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Event type is required';
      isValid = false;
    }

    if (!formData.menuPackage) {
      newErrors.menuPackage = 'Menu package is required';
      isValid = false;
    }
    if (!formData.menuPackage) {
      newErrors.budget = 'Budget is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const saveBookingToFirebase = async (bookingData) => {
    try {
      const bookingsCollection = collection(db, 'events');
      await addDoc(bookingsCollection, bookingData);
    } catch (error) {
      console.error('Error saving booking to Firebase:', error);
      throw error; 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      await saveBookingToFirebase(formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setFormData({
        name: '',
        email: User?.email || '',
        userId: User?.uid || 'guest',
        phone: '',
        budget:'',
        eventDate: '',
        eventTime: '',
        guestCount: '',
        eventType: '',
        menuPackage: '',
        dietaryRestrictions: '',
        specialRequests: '',
        contactMethod: 'phone',
      });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Request Sent!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in hosting your private event with us. We'll contact you within 24 hours to discuss the details and confirm your booking.
          </p>
          <Link to="/" className="inline-block "> 
          <button
            className="bg-amber-600 cursor-pointer hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </button>
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Private Event Booking</h1>
            <p className="text-lg text-gray-600">Create unforgettable memories at our restaurant</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-amber-600" />
                Event Details
              </h2>

              {/* Personal Information */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className='text-red-600 text-xl ml-1'>*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className='text-red-600 text-xl ml-1'>*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className='text-red-600 text-xl ml-1'>*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type <span className='text-red-600 text-xl ml-1'>*</span></label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${errors.eventType ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType}</p>}
                </div>
              </div>

              {/* Event Date & Time */}
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Date <span className='text-red-600 text-xl ml-1'>*</span></label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${errors.eventDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.eventDate && <p className="text-red-500 text-xs mt-1">{errors.eventDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time <span className='text-red-600 text-xl ml-1'>*</span></label>
                  <input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${errors.eventTime ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.eventTime && <p className="text-red-500 text-xs mt-1">{errors.eventTime}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests <span className='text-red-600 text-xl ml-1'>*</span></label>
                  <input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    required
                    min="10"
                    max="200"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${errors.guestCount ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Min 10"
                  />
                  {errors.guestCount && <p className="text-red-500 text-xs mt-1">{errors.guestCount}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="budget">Your Budget exclusive of food <span className='text-red-600 text-xl ml-1'>*</span></label>
                <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="$ 100"
                  />
                </div>
              </div>

              {/* Menu Package Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <ChefHat className="w-5 h-5 mr-2 text-amber-600" />
                  Select Menu Package  <span className='text-red-600 text-xl ml-1'>*</span>
                </h3>
                <div className="grid gap-4">
                  {menuPackages.map(pkg => (
                    <div key={pkg.id} className="relative">
                      <input
                        type="radio"
                        name="menuPackage"
                        value={pkg.id}
                        onChange={handleInputChange}
                        className="sr-only"
                        id={pkg.id}
                      />
                      <label
                        htmlFor={pkg.id}
                        className={`block p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-amber-50 ${
                          formData.menuPackage === pkg.id
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-lg">{pkg.name}</h4>
                            <p className="text-amber-600 font-bold text-xl mb-2">{pkg.price}</p>
                            <p className="text-gray-600 mb-3">{pkg.description}</p>
                            <ul className="text-sm text-gray-500 space-y-1">
                              {pkg.items.map((item, idx) => (
                                <li key={idx} className="flex items-center">
                                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                {errors.menuPackage && <p className="text-red-500 text-xs mt-1">{errors.menuPackage}</p>}
              </div>

              {/* Additional Information */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions & Allergies</label>
                  <textarea
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="Please list any dietary restrictions, allergies, or special dietary needs..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="Decorations, special seating, entertainment, or any other requests..."
                  />
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Contact Method</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={formData.contactMethod === 'email'}
                      onChange={handleInputChange}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-gray-700">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={formData.contactMethod === 'phone'}
                      onChange={handleInputChange}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-gray-700">Phone</span>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Submit Booking Request
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-amber-600 mr-3" />
                  <span className="text-gray-700">(555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-amber-600 mr-3" />
                  <span className="text-gray-700">events@restaurant.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-amber-600 mr-3" />
                  <span className="text-gray-700">123 Gourmet Street, City, ST 12345</span>
                </div>
              </div>
            </div>

            {/* Event Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Event Information</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Capacity</h4>
                  <p>We can accommodate 10-200 guests for private events</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Booking Requirements</h4>
                  <p>Private events require a minimum of 14 days advance notice and a 50% deposit</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Cancellation Policy</h4>
                  <p>Cancellations must be made at least 7 days in advance for a full refund</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-amber-600" />
                Private Event Hours
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span>5:00 PM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday - Saturday</span>
                  <span>5:00 PM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>4:00 PM - 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateEventBooking;