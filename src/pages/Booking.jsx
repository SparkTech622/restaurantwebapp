import { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Phone, 
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { db } from '@/firebase'
import { addDoc, collection } from 'firebase/firestore'

const Booking = () => {
  const { isAuthenticated, user } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialRequests: '',
    type: 'table', 
  })
  
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingId, setBookingId] = useState('')

  // Available time slots
  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ]

  // Guest count options
  const guestOptions = Array.from({ length: 12 }, (_, i) => i + 1)


    useEffect(() => {
    // Check if there's booking data in the query parameters
    const params = new URLSearchParams(location.search);
    const bookingData = params.get('bookingData');

    if (bookingData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(bookingData));
        setFormData(parsedData);
        handleSubmit();
      } catch (error) {
        console.error("Error parsing booking data from URL:", error);
      }
      //  if (isAuthenticated) {
      //       handleSubmit();
      //   }
    }
  }, [location.search, isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    const today = new Date().toISOString().split('T')[0]

    if (!formData.date) {
      newErrors.date = 'Please select a date'
    } else if (formData.date < today) {
      newErrors.date = 'Please select a future date'
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time'
    }

    if (!formData.guests) {
      newErrors.guests = 'Please select number of guests'
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

      if (!isAuthenticated) {
      // Store form data in URL parameters
      const bookingData = encodeURIComponent(JSON.stringify(formData));
      navigate(`/login?redirect=/booking&bookingData=${bookingData}`);
      return;
    }

    setIsLoading(true)

    try {
      // Generate booking ID
      const newBookingId = `BK${Date.now()}`
      
      // Create booking object
      const bookingData = {
        id: newBookingId,
        userId: user?.uid || 'guest',
        ...formData,
         isConfirmed: false, 
        createdAt: new Date().toISOString()
      }

      const bookingsCollection = collection(db, 'bookings'); 
      await addDoc(bookingsCollection, bookingData );

      setBookingId(newBookingId)
      setBookingSuccess(true)
    } catch (error) {
      console.error("Booking error:", error)
      setErrors({ submit: 'An error occurred while processing your booking. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      date: '',
      time: '',
      guests: '',
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      specialRequests: ''
    })
    setErrors({})
    setBookingSuccess(false)
    setBookingId('')
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mb-6">
                <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
                <p className="text-lg text-gray-600">
                  Your table reservation has been successfully confirmed.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4">Booking Details</h2>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-green-700">Booking ID:</span>
                    <span className="font-semibold text-green-900">{bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Date:</span>
                    <span className="font-semibold text-green-900">
                      {new Date(formData.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Time:</span>
                    <span className="font-semibold text-green-900">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Guests:</span>
                    <span className="font-semibold text-green-900">{formData.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Name:</span>
                    <span className="font-semibold text-green-900">{formData.name}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  A confirmation email has been sent to {formData.email}. 
                  Please arrive 10 minutes before your reservation time.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={resetForm} variant="outline">
                    Make Another Booking
                  </Button>
                  <Button onClick={() => navigate('/menu')} className="bg-orange-600 hover:bg-orange-700">
                    View Menu
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Reserve Your Table</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book a table at Delicious Bites and enjoy an exceptional dining experience. 
            We look forward to serving you!
          </p>
        </div>

        {/* Restaurant Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="mx-auto h-8 w-8 text-orange-600 mb-3" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm text-gray-600">
                123 Restaurant Street<br />
                Food City, FC 12345
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="mx-auto h-8 w-8 text-orange-600 mb-3" />
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-sm text-gray-600">
                Mon-Thu: 11:00 AM - 10:00 PM<br />
                Fri-Sat: 11:00 AM - 11:00 PM<br />
                Sun: 11:00 AM - 9:00 PM
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Phone className="mx-auto h-8 w-8 text-orange-600 mb-3" />
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-sm text-gray-600">
                +1 (555) 123-4567<br />
                info@deliciousbites.com
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
            <CardDescription>
              Please fill in the details below to reserve your table
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isAuthenticated && (
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You cannot book as a guest, Please{' '}
                  <button 
                    onClick={() => navigate('/login')}
                    className="text-orange-600 text-xl cursor-pointer hover:text-orange-700 underline"
                  >
                    sign in
                  </button>
                  {' '}to save your booking details.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.submit}</AlertDescription>
                </Alert>
              )}

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`pl-10 ${errors.date ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.date && (
                    <p className="text-sm text-red-500">{errors.date}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Select value={formData.time} onValueChange={(value) => handleSelectChange('time', value)}>
                    <SelectTrigger className={errors.time ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 bg-amber-50"> 
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.time && (
                    <p className="text-sm text-red-500">{errors.time}</p>
                  )}
                </div>
              </div>

              {/* Number of Guests */}
              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <Select value={formData.guests} onValueChange={(value) => handleSelectChange('guests', value)}>
                  <SelectTrigger className={errors.guests ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select number of guests" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 bg-orange-600 text-white">
                    {guestOptions.map((count) => (
                      <SelectItem key={count} value={count.toString()}>
                        {count} {count === 1 ? 'Guest' : 'Guests'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.guests && (
                  <p className="text-sm text-red-500">{errors.guests}</p>
                )}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                <Textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requests or dietary requirements..."
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={isLoading}
              >
                {isLoading ? 'Processing Booking...' : 'Reserve Table'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Booking

