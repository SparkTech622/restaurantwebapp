import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Receipt as ReceiptIcon, 
  Download, 
  Mail, 
  CheckCircle,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  CreditCard,
  ShoppingBag
} from 'lucide-react'

const Receipt = () => {
  const { receiptId } = useParams()
  const navigate = useNavigate()
  const [receiptData, setReceiptData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Load receipt data from localStorage
    const receipts = JSON.parse(localStorage.getItem('receipts') || '[]')
    console.log('Loaded receipts:', receipts) 
    const receipt = receipts.find(r => r.receiptId === receiptId)
    
    if (receipt) {
      setReceiptData(receipt)
    } else {
      setError('Receipt not found')
    }
    setLoading(false)
  }, [receiptId])

  const handleDownloadReceipt = () => {
    if (!receiptData) return

    const receiptContent = `
DELICIOUS BITES RESTAURANT
Digital Receipt
========================

Receipt ID: ${receiptData.receiptId}
Date: ${new Date(receiptData.orderDate).toLocaleDateString()}
Time: ${new Date(receiptData.orderDate).toLocaleTimeString()}

Customer Information:
Name: ${receiptData.paymentData.customerName}
Email: ${receiptData.paymentData.customerEmail}
Phone: ${receiptData.paymentData.customerPhone}

Order Items:
${receiptData.items.map(item => 
  `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
).join('\n')}

Payment Details:
Paybill: ${receiptData.paymentData.paybillNumber}
Account: ${receiptData.paymentData.accountNumber}
Reference: ${receiptData.paymentData.referenceCode}

Order Summary:
Subtotal: $${receiptData.subtotal.toFixed(2)}
Tax (8%): $${receiptData.tax.toFixed(2)}
Total: $${receiptData.total.toFixed(2)}

Status: ${receiptData.status.toUpperCase()}

Thank you for dining with us!
Visit us again soon.
    `

    const blob = new Blob([receiptContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `receipt-${receiptId}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleEmailReceipt = () => {
    if (!receiptData) return
    
    const subject = `Receipt ${receiptId} - Delicious Bites Restaurant`
    const body = `Dear ${receiptData.paymentData.customerName},

Thank you for your order! Your receipt details are below:

Receipt ID: ${receiptId}
Order Date: ${new Date(receiptData.orderDate).toLocaleString()}
Total Amount: $${receiptData.total.toFixed(2)}

Your order is being prepared and will be ready for delivery in 30-45 minutes.

Best regards,
Delicious Bites Restaurant Team`

    const mailtoLink = `mailto:${receiptData.paymentData.customerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading receipt...</p>
        </div>
      </div>
    )
  }

  if (error || !receiptData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert variant="destructive">
            <AlertDescription>
              {error || 'Receipt not found. Please check the receipt ID and try again.'}
            </AlertDescription>
          </Alert>
          <div className="mt-6">
            <Button onClick={() => navigate('/')} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const orderDate = new Date(receiptData.orderDate)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Your order has been confirmed and is being prepared
          </p>
        </div>

        {/* Receipt Card */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center border-b">
            <div className="flex justify-center mb-4">
              <ReceiptIcon className="h-12 w-12 text-orange-600" />
            </div>
            <CardTitle className="text-2xl">🍽️ Delicious Bites</CardTitle>
            <CardDescription>Digital Receipt</CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Receipt Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Receipt ID</p>
                <p className="font-mono font-semibold text-lg">{receiptData.receiptId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge variant="default" className="bg-green-600">
                  {receiptData.status.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{orderDate.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">{orderDate.toLocaleTimeString()}</p>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <User className="mr-2 h-5 w-5" />
                Customer Information
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-600">Name:</span> {receiptData.paymentData.customerName}</p>
                <p><span className="text-gray-600">Email:</span> {receiptData.paymentData.customerEmail}</p>
                <p><span className="text-gray-600">Phone:</span> {receiptData.paymentData.customerPhone}</p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Order Items
              </h3>
              <div className="space-y-3">
                {receiptData.items.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.dietary.slice(0, 3).map((diet, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {diet.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </span>
                        <span className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Details
              </h3>
              <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg">
                <p><span className="text-gray-600">Paybill Number:</span> {receiptData.paymentData.paybillNumber}</p>
                <p><span className="text-gray-600">Account Number:</span> {receiptData.paymentData.accountNumber}</p>
                <p><span className="text-gray-600">Reference Code:</span> {receiptData.paymentData.referenceCode}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({receiptData.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${receiptData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>${receiptData.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Paid</span>
                    <span>${receiptData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={handleDownloadReceipt}
                variant="outline"
                className="flex-1"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
              <Button 
                onClick={handleEmailReceipt}
                variant="outline"
                className="flex-1"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Receipt
              </Button>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 pt-4 border-t">
              <p>Thank you for dining with us!</p>
              <p>Your order will be ready for delivery in 30-45 minutes.</p>
              <p className="mt-2">
                <Button 
                  variant="link" 
                  onClick={() => navigate('/')}
                  className="text-orange-600 hover:text-orange-700"
                >
                  Return to Home
                </Button>
                {' | '}
                <Button 
                  variant="link" 
                  onClick={() => navigate('/menu')}
                  className="text-orange-600 hover:text-orange-700"
                >
                  Order Again
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Receipt

