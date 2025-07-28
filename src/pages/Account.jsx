import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ShoppingBag, 
  MapPin,
  Edit,
  Save,
  X,
  LogOut
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'; 
import { collection, query, where, getDocs } from "firebase/firestore";

const Account = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [userBookings, setUserBookings] = useState([])
  const [userOrders, setUserOrders] = useState([])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      })
    }

    // Load user's bookings and orders
    loadUserData()
  }, [user, isAuthenticated, navigate])

  const loadUserData = async () => {
    if (!user) return

    try {
      // Load table bookings from Firestore
      const tableBookingsCollection = collection(db, 'bookings');
      const qTable = query(tableBookingsCollection, where("userId", "==", user.uid));
      const querySnapshotTable = await getDocs(qTable);
      const tableBookings = querySnapshotTable.docs.map(doc => ({ ...doc.data(), type: 'table' }));

      // Load event bookings from Firestore
      const eventBookingsCollection = collection(db, 'events');
      const qEvent = query(eventBookingsCollection, where("userId", "==", user.uid));
      const querySnapshotEvent = await getDocs(qEvent);
      const eventBookings = querySnapshotEvent.docs.map(doc => ({ ...doc.data(), type: 'event' }));

      // console.log( "eventBookings", eventBookings);

      // Combine bookings
      const allBookings = [...tableBookings, ...eventBookings];
      setUserBookings(allBookings);

      // Load orders
      const ordersCollection = collection(db, 'orders');
      const qo = query(ordersCollection, where("userId", "==", user.uid));
      const querySnapshotO = await getDocs(qo);
      const orders = querySnapshotO.docs.map(doc => doc.data());
      setUserOrders(orders)
      // console.log('User orders:', orders);  
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) {
      return
    }

    // Update user data in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map(u => 
      u.id === user.id 
        ? { ...u, name: formData.name, email: formData.email, phone: formData.phone }
        : u
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    // Update current user session
    const updatedUser = { ...user, name: formData.name, email: formData.email, phone: formData.phone }
    localStorage.setItem('user', JSON.stringify(updatedUser))

    setSuccessMessage('Profile updated successfully!')
    setIsEditing(false)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    })
    setErrors({})
    setIsEditing(false)
  }
    const StatusBadge = ({ status}) => {
    if (status) {
      const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-green-100 text-green-800',
        preparing: 'bg-blue-100 text-blue-800',
        ready: 'bg-purple-100 text-purple-800',
        delivered: 'bg-gray-100 text-gray-800'
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    }
    
    // return (
    //   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
    //     confirmed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
    //   }`}>
    //     {confirmed ? 'Confirmed' : 'Pending'}
    //   </span>
    // );
  };

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your profile and view your activity</p>
        </div>

        {successMessage && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal information and contact details
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={handleCancel}
                        className="flex items-center space-x-2"
                      >
                        <X size={16} />
                        <span>Cancel</span>
                      </Button>
                      <Button 
                        onClick={handleSave}
                        className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700"
                      >
                        <Save size={16} />
                        <span>Save</span>
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`pl-10 ${errors.name ? 'border-red-500' : ''} ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''} ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter your phone number"
                      className={`pl-10 ${errors.phone ? 'border-red-500' : ''} ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>
                  View your table reservations and event bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">No bookings found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Book a table or event to see your reservations here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userBookings.map((booking, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            {booking.type === 'table' ? (
                              <>
                                <h3 className="font-semibold">Table for {booking.guests}</h3>
                                <p className="text-sm text-gray-600">
                                  {booking.date} at {booking.time}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Special requests: {booking.specialRequests || 'None'}
                                </p>
                              </>
                            ) : (
                              <>
                                <h3 className="font-semibold">Event: {booking.eventType}</h3>
                                <p className="text-sm text-gray-600">
                                  {booking.eventDate} at {booking.eventTime}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Number of Guests: {booking.guestCount}
                                </p>
                              </>
                            )}
                          </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                            booking.isConfirmed === true ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.isConfirmed === true ? 'Confirmed' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View your past orders and receipts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">No orders found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Place an order to see your history here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">Order #{order.receiptId}</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              Total: ${order.total.toFixed(2)}
                            </p>
                          </div>
                        <StatusBadge status={order.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="w-full mt-4 justify-center flex">
     <Button onClick={handleLogout} className="cursor-pointer" variant="outline" size="sm" >
      <LogOut size={18} className="mr-1" />
       Logout
      </Button>
        </div>
      </div>
 
    </div>
  )
}

export default Account