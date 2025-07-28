import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  LogOut,
  Home,
  BookOpen,
  Calendar,
  Info,
  Phone
} from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user } = useContext(AuthContext)
  const { cartItems } = useContext(CartContext)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="text-xl sm:text-2xl font-bold text-orange-600">
              🍽️ DeliciousBites
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center  space-x-2 lg:space-x-8">
            <NavLink to="/" icon={<Home size={18} />} label="Home" />
            <NavLink to="/menu" icon={<BookOpen size={18} />} label="Menu" />
            <NavLink to="/booking" icon={<Calendar size={18} />} label="Book Table" />
            <NavLink to="/about" icon={<Info size={18} />} label="About" />
            <NavLink to="/contact" icon={<Phone size={18} />} label="Contact" />
          </div>

          {/* Auth & Cart (Desktop) */}
          <div className="hidden md:flex items-center  space-x-2 lg:space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart size={18} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/account">
                  <Button variant="outline" size="sm">
                    <User size={18} className="mr-1" />
                    {user?.name || 'Account'}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/cart" className="relative" onClick={closeMenu}>
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart size={18} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-4 bg-white border-t">
              <NavLink to="/" icon={<Home size={18} />} label="Home" onClick={closeMenu} />
              <NavLink to="/menu" icon={<BookOpen size={18} />} label="Menu" onClick={closeMenu} />
              <NavLink to="/booking" icon={<Calendar size={18} />} label="Book Table" onClick={closeMenu} />
              <NavLink to="/about" icon={<Info size={18} />} label="About" onClick={closeMenu} />
              <NavLink to="/contact" icon={<Phone size={18} />} label="Contact" onClick={closeMenu} />

              <div className="border-t pt-3 mt-3">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <NavLink to="/account" icon={<User size={18} />} label={user?.name || 'Account'} onClick={closeMenu} />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded-md transition-colors"
                      onClick={closeMenu}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function NavLink({ to, icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors"
    >
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  )
}

export default Navbar