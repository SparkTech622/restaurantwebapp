import { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  Calendar,
  Users,
  Utensils,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import { AuthContext } from '@/context/AuthContext'

const Contact = () => {
  const {user } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    // userid: user?.uid || 'guest',
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errors, setErrors] = useState({})

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: <MessageSquare className="h-4 w-4" /> },
    { value: 'reservation', label: 'Reservations', icon: <Calendar className="h-4 w-4" /> },
    { value: 'events', label: 'Private Events', icon: <Users className="h-4 w-4" /> },
    { value: 'catering', label: 'Catering', icon: <Utensils className="h-4 w-4" /> }
  ]

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-orange-600" />,
      title: "Phone",
      details: ["(555) 123-BITE", "(555) 123-2483"],
      description: "Call us for reservations or inquiries"
    },
    {
      icon: <Mail className="h-6 w-6 text-orange-600" />,
      title: "Email",
      details: ["hello@deliciousbites.com", "events@deliciousbites.com"],
      description: "Send us a message anytime"
    },
    {
      icon: <MapPin className="h-6 w-6 text-orange-600" />,
      title: "Address",
      details: ["123 Culinary Street", "Downtown District", "Foodie City, FC 12345"],
      description: "Visit us in the heart of downtown"
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Hours",
      details: ["Mon-Thu: 7AM-10PM", "Fri-Sat: 7AM-11PM", "Sunday: 8AM-9PM"],
      description: "We're here to serve you"
    }
  ]

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // sent to firebase
      const inqueryData = {
        ...formData,
        createdAt: new Date().toISOString()
      }
      //  console.log("Submitting contact form:", inqueryData)
      await addDoc(collection(db, 'inquiries'), inqueryData)


     
    } catch (error) {
      console.error("Error submitting contact form:", error)
      setSubmitStatus('error')
      throw error
    } finally {
       setSubmitStatus('success')
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        subject: '',
        message: '',
        inquiryType: 'general'
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you! Whether you have questions, feedback, or want to make a reservation, 
            we're here to help make your dining experience exceptional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4 ">
                        <div className="flex-shrink-0">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                          <div className="space-y-1">
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-sm text-gray-700">{detail}</p>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Need something specific? Here are some quick links to help you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/booking" className='block'>
                <Button variant="outline" className="w-full justify-start cursor-pointer">
                  <Calendar className="mr-2 h-4 w-4" />
                  Make a Reservation
                </Button>
                </Link>

                <Link to="/menu" className='block'>
                <Button variant="outline" className="w-full justify-start cursor-pointer">
                  <Utensils className="mr-2 h-4 w-4" />
                  View Our Menu
                </Button>
                </Link>
                <Link to="/private-event" className='block'>
                <Button variant="outline" className="w-full justify-start cursor-pointer">
                  <Users className="mr-2 h-4 w-4" />
                  Plan Private Event
                </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitStatus === 'success' && (
                  <Alert className="mb-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Thank you for your message! We'll get back to you within 72 hours.
                    </AlertDescription>
                  </Alert>
                )}

                {submitStatus === 'error' && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Sorry, there was an error sending your message. Please try again.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <Label htmlFor="inquiryType">Type of Inquiry</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {inquiryTypes.map((type) => (
                        <Button
                          key={type.value}
                          type="button"
                          variant={formData.inquiryType === type.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleInputChange('inquiryType', type.value)}
                          className="justify-start"
                        >
                          {type.icon}
                          <span className="ml-2">{type.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className='mb-1'>Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className='mb-1'>Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone and Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className='mb-1'>Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className='mb-1'>Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className={errors.subject ? 'border-red-500' : ''}
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-600 mt-1">{errors.subject}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className='mb-1'>Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600 mt-1">{errors.message}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.message.length}/500 characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    * Required fields. We typically respond within 24 hours.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Reservations</h3>
              <p className="text-sm text-gray-600">
                Book your table online or call us directly. We recommend reservations for dinner service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Private Events</h3>
              <p className="text-sm text-gray-600">
                Host your special occasion with us. We offer customized menus and dedicated service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Utensils className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Catering</h3>
              <p className="text-sm text-gray-600">
                Bring our delicious food to your event. Full-service catering available for all occasions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Contact

