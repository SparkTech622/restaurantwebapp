// Initialize demo data for the restaurant app
export const initializeData = () => {
  // Initialize demo users if not already present
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
  
  if (existingUsers.length === 0) {
    const demoUsers = [
      {
        id: 'demo-user-1',
        name: 'User 001',
        email: 'demo@example.com',
        phone: '+1 (555) 123-4567',
        password: 'demo123',
        createdAt: new Date().toISOString()
      }
    ]
    
    localStorage.setItem('users', JSON.stringify(demoUsers))
  }

  // Initialize demo bookings
  const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
  
  if (existingBookings.length === 0) {
    const demoBookings = [
      {
        id: 'booking-1',
        userId: 'demo-user-1',
        date: '2025-07-20',
        time: '19:00',
        guests: 4,
        specialRequests: 'Window table preferred',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
    ]
    
    localStorage.setItem('bookings', JSON.stringify(demoBookings))
  }

  // Initialize demo orders
  const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
  
  if (existingOrders.length === 0) {
    const demoOrders = [
      {
        id: 'order-1',
        userId: 'demo-user-1',
        items: [
          { id: 1, name: 'Grilled Salmon', price: 24.99, quantity: 1 },
          { id: 2, name: 'Caesar Salad', price: 12.99, quantity: 1 }
        ],
        total: 37.98,
        status: 'delivered',
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        receiptId: 'RCP-001'
      }
    ]
    
    localStorage.setItem('orders', JSON.stringify(demoOrders))
  }
}

// Call this function when the app loads
if (typeof window !== 'undefined') {
  initializeData()
}

