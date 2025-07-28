import { useState, useContext } from 'react'
import { CartContext } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Plus, 
  Star, 
  Filter,
  ShoppingCart
} from 'lucide-react'
import { menuCategories,  getItemsByCategory, getPopularItems, searchItems } from '../data/menuData'
import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'



const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showPopularOnly, setShowPopularOnly] = useState(false)
  const { addToCart } = useContext(CartContext)



  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const validCategory = menuCategories.find(
        cat => cat.id === categoryParam || cat.name.toLowerCase() === categoryParam.toLowerCase()
      );
      if (validCategory) {
        setSelectedCategory(validCategory.id);
      }
    }
  }, [searchParams]);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() === '') {
      searchItems(searchQuery, '');
      setSearchParams({});
    } else {
      setSearchParams({ search: e.target.value });
    }
  };


  const handleAddToCart = (item) => {
    addToCart(item)
    // You could add a toast notification here
  }

    const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };
 const getFilteredItems = () => {
    let items = [];
    
    if (selectedCategory === 'all') {
      items = menuCategories.flatMap(category => getItemsByCategory(category.id));
    } else if (selectedCategory === 'popular') {
      items = getPopularItems();
    } else {
      items = getItemsByCategory(selectedCategory);
    }

    if (showPopularOnly) {
      items = items.filter(item => item.popular);
    }

    if (searchQuery) {
      items = searchItems(searchQuery);
    }

    return items;
  };

  const filteredItems = getFilteredItems();

  const getDietaryBadgeColor = (dietary) => {
    const colors = {
      'vegetarian': 'bg-green-100 text-green-800',
      'vegan': 'bg-green-200 text-green-900',
      'gluten-free': 'bg-blue-100 text-blue-800',
      'healthy': 'bg-emerald-100 text-emerald-800',
      'spicy': 'bg-red-100 text-red-800',
      'caffeine': 'bg-orange-100 text-orange-800',
      'alcoholic': 'bg-purple-100 text-purple-800'
    }
    return colors[dietary] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients. 
            From hearty breakfasts to refreshing beverages, we have something for everyone.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e)}
                className="pl-10"
              />
            </div>
            <Button
              variant={showPopularOnly ? "default" : "outline"}
              onClick={() => setShowPopularOnly(!showPopularOnly)}
              className="flex items-center space-x-2"
            >
              <Star size={16} />
              <span>Popular Only</span>
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory}
         onValueChange={handleCategoryChange} 
         className="mb-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            {menuCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                <span className="mr-1">{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Category Headers */}
          {selectedCategory !== 'all' && selectedCategory !== 'popular' && (
            <div className="mt-6 mb-8">
              {menuCategories.map((category) => (
                selectedCategory === category.id && (
                  <div key={category.id} className="text-center">
                    <div className="text-6xl mb-4">{category.icon}</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {item.popular && (
                    <Badge className="absolute top-2 left-2 bg-orange-600 text-white">
                      <Star size={12} className="mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <span className="text-xl font-bold text-orange-600">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <CardDescription className="text-sm">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.dietary.map((diet, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className={`text-xs ${getDietaryBadgeColor(diet)}`}
                      >
                        {diet.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    <Plus size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? `No menu items match "${searchQuery}". Try a different search term.`
                  : 'No items available in this category.'
                }
              </p>
              {searchQuery && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery('')}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </Tabs>

        {/* Category Overview (when showing all items) */}
        {selectedCategory === 'all' && !searchQuery && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {menuCategories.map((category) => (
                <Card 
                  key={category.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                    <div className="mt-3 text-sm text-orange-600">
                      {getItemsByCategory(category.id).length} items
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu

