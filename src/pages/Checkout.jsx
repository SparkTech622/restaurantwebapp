import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CreditCard, 
  ArrowLeft,
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  Receipt,
  Phone,
  Building2
} from 'lucide-react'

// Firebase imports
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

const Checkout = () => {
  const { cartItems, getCartTotal, getCartCount, clearCart } = useContext(CartContext)
  const { isAuthenticated, user } = useContext(AuthContext)
  const navigate = useNavigate()

  // Restaurant payment details (constants)
  const RESTAURANT_PAYBILL = '174379'; // Replace with your actual paybill
  const RESTAURANT_ACCOUNT = 'Restaurant123'; // Replace with your actual account number
  
  const [paymentData, setPaymentData] = useState({
    referenceCode: '',
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  })
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})

  // Redirect if not authenticated or cart is empty
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout')
      return
    }
    if (cartItems.length === 0) {
      navigate('/cart')
    }
  }, [isAuthenticated, cartItems, navigate])

  // Pre-fill user data if available
  useEffect(() => {
    if (user) {
      setPaymentData(prev => ({
        ...prev,
        customerName: user.name || '',
        customerEmail: user.email || '',
        customerPhone: user.phone || ''
      }))
    }
  }, [user])

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!paymentData.referenceCode?.trim()) {
      newErrors.referenceCode = 'Reference code is required'
    } else if (paymentData.referenceCode.length < 6) {
      newErrors.referenceCode = 'Reference code must be at least 6 characters'
    }

    if (!paymentData.customerName?.trim()) {
      newErrors.customerName = 'Customer name is required'
    }

    if (!paymentData.customerEmail?.trim()) {
      newErrors.customerEmail = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(paymentData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email'
    }

    if (!paymentData.customerPhone?.trim()) {
      newErrors.customerPhone = 'Phone number is required'
    } else if (!/^\+?[\d\s]{10,}$/.test(paymentData.customerPhone)) {
      newErrors.customerPhone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateReceiptId = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `RC${timestamp}${random}`
  }

  const saveOrderToFirebase = async (orderData) => {
    try {
      const ordersCollection = collection(db, 'orders');
      await addDoc(ordersCollection, orderData);
    } catch (error) {
      console.error('Error saving order to Firebase:', error);
      throw error; // Re-throw to be caught in handlePayment
    }
  };

  const handlePaymentComplete = (orderData) => {
    navigate(`/checkout/receipt/${orderData.receiptId}`);
    clearCart();
  };

  const handlePayment = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      const receiptId = generateReceiptId()
      const orderData = {
        receiptId,
        userId: user?.uid || 'guest', // Add user ID
        items: cartItems,
        subtotal: getCartTotal(),
        tax: getCartTotal() * 0.08,
        total: getCartTotal() * 1.08,
        paymentData,
        orderDate: new Date().toISOString(),
       status:'pending'
      }

      await saveOrderToFirebase(orderData);
      handlePaymentComplete(orderData)
    } catch (error) {
      console.error('Payment processing error:', error)
      setErrors({ general: 'Payment processing failed. Please try again.' })
    } finally {
      setIsProcessing(false)
    }
  }

  const subtotal = getCartTotal()
  const tax = subtotal * 0.08
  const total = subtotal + tax

  if (!isAuthenticated || cartItems.length === 0) {
    return null 
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600 mt-2">
              Complete your order and make payment
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/cart')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Cart</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Information</span>
                </CardTitle>
                <CardDescription>
                  Enter your mobile money payment details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {errors.general && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.general}</AlertDescription>
                  </Alert>
                )}

                {/* Display Paybill and Account Number as Constant Values */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paybill">Paybill Number</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="paybill"
                        value={RESTAURANT_PAYBILL}
                        readOnly // Make it non-editable
                        className="pl-10 bg-gray-100 text-gray-700" // Style as read-only
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="account">Account Number</Label>
                    <Input
                      id="account"
                      value={RESTAURANT_ACCOUNT}
                      readOnly // Make it non-editable
                      className="bg-gray-100 text-gray-700" // Style as read-only
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reference">Reference Code</Label>
                  <Input
                    id="reference"
                    placeholder="Enter your M-Pesa reference code"
                    value={paymentData.referenceCode}
                    onChange={(e) => handleInputChange('referenceCode', e.target.value)}
                    className={errors.referenceCode ? 'border-red-500' : ''}
                  />
                  {errors.referenceCode && (
                    <p className="text-sm text-red-600 mt-1">{errors.referenceCode}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Complete the M-Pesa transaction first, then enter the reference code here
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>
                  Confirm your contact details for order updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={paymentData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    className={errors.customerName ? 'border-red-500' : ''}
                  />
                  {errors.customerName && (
                    <p className="text-sm text-red-600 mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={paymentData.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                    className={errors.customerEmail ? 'border-red-500' : ''}
                  />
                  {errors.customerEmail && (
                    <p className="text-sm text-red-600 mt-1">{errors.customerEmail}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      placeholder="+254 700 000 000"
                      value={paymentData.customerPhone}
                      onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                      className={`pl-10 ${errors.customerPhone ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.customerPhone && (
                    <p className="text-sm text-red-600 mt-1">{errors.customerPhone}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Order Summary</span>
                </CardTitle>
                <CardDescription>
                  {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'} in your order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 py-3 border-b last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.dietary.slice(0, 2).map((diet, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {diet.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <form onSubmit={handlePayment}>
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({getCartCount()} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-orange-600 hover:bg-orange-700 mt-6"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Receipt className="mr-2 h-5 w-5" />
                      Complete Payment
                    </>
                  )}
                </Button>
                </form>

                <div className="text-xs text-gray-500 space-y-1 mt-4">
                  <p>• Your payment will be processed securely</p>
                  <p>• You will receive an email confirmation</p>
                  {/* <p>• Estimated delivery: 30-45 minutes</p> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout