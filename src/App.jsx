import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {   useEffect } from 'react'


import { initializeData } from './data/initializeData'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Booking from './pages/Booking'
import About from './pages/About'
import Contact from './pages/Contact'
import Account from './pages/Account'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Receipt from './pages/Receipt'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import PrivateEvent from './pages/PrivateEvent'




function App() {
  
  useEffect(() => {
    // Initialize demo data
    initializeData()
  }, [])

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
         
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/private-event" element={<PrivateEvent />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/receipt/:receiptId" element={<Receipt />} />
              </Routes>
            </main>
        
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App

