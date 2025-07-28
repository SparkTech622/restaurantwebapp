import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  BookOpen, 
  Star, 
  Clock, 
  MapPin, 
  Phone,
  ChefHat,
  Users,
  Award
} from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Delicious Bites
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Experience exceptional dining with our carefully crafted menu, 
              comfortable atmosphere, and outstanding service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/private-event">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 w-full sm:w-auto">
                  <BookOpen className="mr-2" size={20} />
                  Book a Private Event
                </Button>
              </Link>
              <Link to="/booking">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 w-full sm:w-auto">
                  <Calendar className="mr-2" size={20} />
                  Book a Table
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Delicious Bites?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing an exceptional dining experience with quality food, 
              great service, and a welcoming atmosphere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Chefs</h3>
              <p className="text-gray-600">
                Our experienced chefs create delicious dishes using the finest ingredients 
                and traditional cooking techniques.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Friendly Service</h3>
              <p className="text-gray-600">
                Our staff is dedicated to making your dining experience memorable 
                with warm hospitality and attentive service.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                We use only the freshest ingredients and maintain the highest 
                standards of quality in everything we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Menu Categories
            </h2>
            <p className="text-lg text-gray-600">
              From hearty breakfasts to refreshing beverages, we have something for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: 'Breakfast', icon: '🍳', description: 'Start your day right' },
              { name: 'Lunch', icon: '🍽️', description: 'Satisfying midday meals' },
              { name: 'Coffee', icon: '☕', description: 'Premium coffee blends' },
              { name: 'Tea', icon: '🍵', description: 'Soothing tea varieties' },
              { name: 'Beers', icon: '🍺', description: 'Craft and local beers' }
            ].map((category, index) => (
               <Link 
                  key={index} 
                  to={`/menu?category=${category.name.toLowerCase()}`}
                  className="block"
                >
              <div key={index} className="text-center cursor-pointer p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/menu">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Restaurant Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Visit Us Today
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-orange-600" size={24} />
                  <span className="text-lg">123 Restaurant Street, Food City, FC 12345</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-orange-600" size={24} />
                  <span className="text-lg">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-orange-600" size={24} />
                  <div>
                    <div className="text-lg">Mon - Thu: 8:00 AM - 10:00 PM</div>
                    <div className="text-lg">Fri - Sat: 8:00 AM - 11:00 PM</div>
                    <div className="text-lg">Sunday: 9:00 AM - 9:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">Sarah M.</span>
                  </div>
                  <p className="text-gray-700">"Amazing food and excellent service! The atmosphere is perfect for both casual dining and special occasions."</p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">John D.</span>
                  </div>
                  <p className="text-gray-700">"Best restaurant in town! The breakfast menu is outstanding and the coffee is perfect."</p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">Emily R.</span>
                  </div>
                  <p className="text-gray-700">"Love the online ordering system! So convenient and the food always arrives fresh and delicious."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

