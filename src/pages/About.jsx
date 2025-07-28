import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Award, 
  Heart,
  Utensils,
  Star,
  ChefHat
} from 'lucide-react'

const About = () => {
  const teamMembers = [
    {
      name: "Chef Maria Rodriguez",
      role: "Head Chef",
      experience: "15+ years",
      specialty: "Mediterranean & Fusion Cuisine"
    },
    {
      name: "James Wilson",
      role: "Restaurant Manager",
      experience: "10+ years",
      specialty: "Customer Experience & Operations"
    },
    {
      name: "Sarah Chen",
      role: "Pastry Chef",
      experience: "8+ years",
      specialty: "Artisan Desserts & Baking"
    }
  ]

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Passion for Food",
      description: "We pour our heart into every dish, using only the finest ingredients and time-honored techniques."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Community Focus",
      description: "We're more than a restaurant - we're a gathering place where memories are made and friendships flourish."
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: "Excellence",
      description: "From our carefully curated menu to our attentive service, we strive for excellence in everything we do."
    },
    {
      icon: <Utensils className="h-8 w-8 text-green-500" />,
      title: "Fresh & Local",
      description: "We partner with local farmers and suppliers to bring you the freshest, highest-quality ingredients."
    }
  ]

  const achievements = [
    "Best Local Restaurant 2023 - City Food Awards",
    "Top 10 Breakfast Spots - Food & Wine Magazine",
    "Excellence in Service Award - Restaurant Association",
    "Sustainable Dining Certification - Green Restaurant Alliance"
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Delicious Bites</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Where culinary passion meets exceptional hospitality. Since 2015, we've been serving 
            our community with fresh, locally-sourced dishes and creating unforgettable dining experiences.
          </p>
        </div>

        {/* Our Story */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <ChefHat className="mr-3 h-6 w-6 text-orange-600" />
              Our Story
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 mb-4">
                  Delicious Bites was born from a simple dream: to create a place where food brings people together. 
                  Founded by Chef Maria Rodriguez in 2015, our restaurant started as a small neighborhood eatery 
                  with big ambitions.
                </p>
                <p className="text-gray-700 mb-4">
                  What began as a 20-seat café has grown into a beloved dining destination, but our core values 
                  remain unchanged. We believe in the power of fresh ingredients, traditional techniques, and 
                  genuine hospitality to create meals that nourish both body and soul.
                </p>
                <p className="text-gray-700">
                  Today, we're proud to serve hundreds of guests daily, from early morning coffee seekers to 
                  late-night diners, each receiving the same attention to detail and passion for excellence 
                  that has defined us from day one.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-orange-800">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-orange-600 mr-2" />
                    <span className="text-sm">Established in 2015</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-orange-600 mr-2" />
                    <span className="text-sm">50+ dedicated team members</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-orange-600 mr-2" />
                    <span className="text-sm">4.8/5 average customer rating</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-orange-600 mr-2" />
                    <span className="text-sm">Prime downtown location</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Meet Our Team */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Meet Our Team</CardTitle>
            <CardDescription>
              The passionate professionals behind your dining experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-20 h-20 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <ChefHat className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-2">{member.role}</Badge>
                  <p className="text-sm text-gray-600 mb-1">{member.experience} experience</p>
                  <p className="text-xs text-gray-500">{member.specialty}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Awards & Recognition */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Award className="mr-3 h-6 w-6 text-yellow-600" />
              Awards & Recognition
            </CardTitle>
            <CardDescription>
              We're honored to be recognized by our community and industry peers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium">{achievement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location & Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-orange-600" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="font-medium">123 Culinary Street</p>
                <p className="text-gray-600">Downtown District</p>
                <p className="text-gray-600">Foodie City, FC 12345</p>
                <div className="pt-3 space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm">(555) 123-BITE</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm">hello@deliciousbites.com</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-orange-600" />
                Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Thursday</span>
                  <span>7:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Friday - Saturday</span>
                  <span>7:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span>8:00 AM - 9:00 PM</span>
                </div>
                <div className="pt-3 text-sm text-gray-600">
                  <p>• Kitchen closes 30 minutes before closing time</p>
                  <p>• Happy hour: Monday-Friday 3:00-6:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default About

