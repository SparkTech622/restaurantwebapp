import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  ShoppingBag,
  CreditCard
} from 'lucide-react'

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount } = useContext(CartContext)
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [isClearing, setIsClearing] = useState(false)

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  const handleClearCart = () => {
    setIsClearing(true)
    setTimeout(() => {
      clearCart()
      setIsClearing(false)
    }, 500)
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login with return path
      navigate('/login?redirect=/checkout')
    } else {
      navigate('/checkout')
    }
  }

  const subtotal = getCartTotal()
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/menu')}
                className="bg-orange-600 hover:bg-orange-700"
                size="lg"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Browse Menu
              </Button>
              <div>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  size="lg"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-2">
              {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/menu')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Item Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {item.dietary.slice(0, 3).map((diet, index) => (
                              <Badge 
                                key={index} 
                                variant="secondary" 
                                className="text-xs"
                              >
                                {diet.replace('-', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Quantity and Price Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600">Quantity:</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            ${item.price.toFixed(2)} each
                          </div>
                          <div className="text-lg font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart Button */}
            <div className="pt-4">
              <Button
                variant="outline"
                onClick={handleClearCart}
                disabled={isClearing}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {isClearing ? 'Clearing...' : 'Clear Cart'}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  Review your order before checkout
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Details */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({getCartCount()} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Authentication Alert */}
                {!isAuthenticated && (
                  <Alert>
                    <AlertDescription>
                      Please{' '}
                      <button 
                        onClick={() => navigate('/login?redirect=/checkout')}
                        className="text-orange-600 hover:text-orange-700 underline"
                      >
                        sign in
                      </button>
                      {' '}to proceed with checkout.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Checkout Button */}
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  size="lg"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Proceed to Checkout
                </Button>

                {/* Additional Info */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Free delivery on orders over $50</p>
                  <p>• Estimated delivery: 30-45 minutes</p>
                  <p>• All prices include applicable taxes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

