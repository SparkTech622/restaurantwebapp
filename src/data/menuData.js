// Menu data for the restaurant
import breakfastPlate from '../assets/breakfast-plate.jpg'
import pancakesBacon from '../assets/pancakes-bacon.jpg'
import lunchRestaurant from '../assets/lunch-restaurant.jpg'
import burgerSalad from '../assets/burger-salad.jpg'
import pastaPizza from '../assets/pasta-pizza.jpg'
import coffeeLatte from '../assets/coffee-latte.jpg'
import coffeeTypes from '../assets/coffee-types.jpg'
import teaVarieties from '../assets/tea-varieties.png'
import craftBeer from '../assets/craft-beer.jpg'
import beerTasting from '../assets/beer-tasting.jpg'

export const menuCategories = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    description: 'Start your day with our delicious breakfast options',
    icon: '🍳',
    image: breakfastPlate
  },
  {
    id: 'lunch',
    name: 'Lunch',
    description: 'Satisfying meals for your midday hunger',
    icon: '🍽️',
    image: lunchRestaurant
  },
  {
    id: 'coffee',
    name: 'Coffee',
    description: 'Premium coffee blends and specialty drinks',
    icon: '☕',
    image: coffeeLatte
  },
  {
    id: 'tea',
    name: 'Tea',
    description: 'Soothing tea varieties from around the world',
    icon: '🍵',
    image: teaVarieties
  },
  {
    id: 'beers',
    name: 'Beers',
    description: 'Craft and local beers for every taste',
    icon: '🍺',
    image: craftBeer
  }
]

export const menuItems = {
  breakfast: [
    {
      id: 1,
      name: 'Classic Breakfast Plate',
      description: 'Two eggs any style, bacon or sausage, hash browns, and toast',
      price: 12.99,
      image: breakfastPlate,
      popular: true,
      dietary: ['gluten-free-option']
    },
    {
      id: 2,
      name: 'Fluffy Pancakes with Bacon',
      description: 'Three fluffy pancakes served with crispy bacon and maple syrup',
      price: 11.99,
      image: pancakesBacon,
      popular: false,
      dietary: ['vegetarian-option']
    },
    {
      id: 3,
      name: 'Avocado Toast',
      description: 'Smashed avocado on sourdough with cherry tomatoes and feta',
      price: 9.99,
      image: breakfastPlate,
      popular: true,
      dietary: ['vegetarian', 'healthy']
    },
    {
      id: 4,
      name: 'Breakfast Burrito',
      description: 'Scrambled eggs, cheese, peppers, onions, and salsa in a flour tortilla',
      price: 10.99,
      image: breakfastPlate,
      popular: false,
      dietary: ['spicy']
    },
    {
      id: 5,
      name: 'French Toast',
      description: 'Thick-cut brioche French toast with berries and whipped cream',
      price: 10.99,
      image: pancakesBacon,
      popular: true,
      dietary: ['vegetarian']
    },
    {
      id: 6,
      name: 'Omelette Special',
      description: 'Three-egg omelette with your choice of cheese, vegetables, and meat',
      price: 13.99,
      image: breakfastPlate,
      popular: false,
      dietary: ['gluten-free', 'customizable']
    }
  ],
  lunch: [
    {
      id: 7,
      name: 'Gourmet Burger',
      description: 'Angus beef patty with lettuce, tomato, onion, and special sauce',
      price: 15.99,
      image: burgerSalad,
      popular: true,
      dietary: ['gluten-free-bun-option']
    },
    {
      id: 8,
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan, croutons, and Caesar dressing',
      price: 11.99,
      image: burgerSalad,
      popular: true,
      dietary: ['vegetarian', 'healthy']
    },
    {
      id: 9,
      name: 'Grilled Chicken Sandwich',
      description: 'Marinated grilled chicken breast with avocado and chipotle mayo',
      price: 14.99,
      image: lunchRestaurant,
      popular: false,
      dietary: ['healthy', 'protein-rich']
    },
    {
      id: 10,
      name: 'Pasta Primavera',
      description: 'Fresh vegetables tossed with penne pasta in a light cream sauce',
      price: 13.99,
      image: pastaPizza,
      popular: true,
      dietary: ['vegetarian']
    },
    {
      id: 11,
      name: 'Fish and Chips',
      description: 'Beer-battered cod with crispy fries and tartar sauce',
      price: 16.99,
      image: lunchRestaurant,
      popular: false,
      dietary: ['seafood']
    },
    {
      id: 12,
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomato sauce, and basil on thin crust',
      price: 14.99,
      image: pastaPizza,
      popular: true,
      dietary: ['vegetarian']
    }
  ],
  coffee: [
    {
      id: 13,
      name: 'Espresso',
      description: 'Rich and bold single shot of premium espresso',
      price: 2.99,
      image: coffeeLatte,
      popular: true,
      dietary: ['vegan', 'caffeine']
    },
    {
      id: 14,
      name: 'Cappuccino',
      description: 'Espresso with steamed milk and a thick layer of foam',
      price: 4.99,
      image: coffeeLatte,
      popular: true,
      dietary: ['vegetarian', 'caffeine']
    },
    {
      id: 15,
      name: 'Latte',
      description: 'Smooth espresso with steamed milk and light foam',
      price: 5.49,
      image: coffeeLatte,
      popular: true,
      dietary: ['vegetarian', 'caffeine']
    },
    {
      id: 16,
      name: 'Americano',
      description: 'Espresso shots with hot water for a clean, strong taste',
      price: 3.99,
      image: coffeeTypes,
      popular: false,
      dietary: ['vegan', 'caffeine']
    },
    {
      id: 17,
      name: 'Mocha',
      description: 'Espresso with chocolate syrup, steamed milk, and whipped cream',
      price: 5.99,
      image: coffeeLatte,
      popular: true,
      dietary: ['vegetarian', 'sweet', 'caffeine']
    },
    {
      id: 18,
      name: 'Cold Brew',
      description: 'Smooth, cold-steeped coffee served over ice',
      price: 4.49,
      image: coffeeTypes,
      popular: false,
      dietary: ['vegan', 'caffeine', 'cold']
    }
  ],
  tea: [
    {
      id: 19,
      name: 'Earl Grey',
      description: 'Classic black tea with bergamot oil and citrus notes',
      price: 3.99,
      image: teaVarieties,
      popular: true,
      dietary: ['vegan', 'caffeine']
    },
    {
      id: 20,
      name: 'Green Tea',
      description: 'Light and refreshing green tea with antioxidants',
      price: 3.49,
      image: teaVarieties,
      popular: true,
      dietary: ['vegan', 'healthy', 'caffeine']
    },
    {
      id: 21,
      name: 'Chamomile',
      description: 'Soothing herbal tea perfect for relaxation',
      price: 3.99,
      image: teaVarieties,
      popular: false,
      dietary: ['vegan', 'caffeine-free', 'herbal']
    },
    {
      id: 22,
      name: 'Jasmine Tea',
      description: 'Fragrant green tea scented with jasmine flowers',
      price: 4.49,
      image: teaVarieties,
      popular: false,
      dietary: ['vegan', 'floral', 'caffeine']
    },
    {
      id: 23,
      name: 'Peppermint Tea',
      description: 'Refreshing herbal tea with cooling peppermint leaves',
      price: 3.49,
      image: teaVarieties,
      popular: true,
      dietary: ['vegan', 'caffeine-free', 'herbal']
    },
    {
      id: 24,
      name: 'Oolong Tea',
      description: 'Traditional Chinese tea with complex flavor profile',
      price: 4.99,
      image: teaVarieties,
      popular: false,
      dietary: ['vegan', 'traditional', 'caffeine']
    }
  ],
  beers: [
    {
      id: 25,
      name: 'IPA',
      description: 'Hoppy India Pale Ale with citrus and pine notes',
      price: 6.99,
      image: craftBeer,
      popular: true,
      dietary: ['alcoholic', 'hoppy']
    },
    {
      id: 26,
      name: 'Wheat Beer',
      description: 'Light and refreshing wheat beer with smooth finish',
      price: 5.99,
      image: beerTasting,
      popular: true,
      dietary: ['alcoholic', 'light']
    },
    {
      id: 27,
      name: 'Stout',
      description: 'Rich and creamy dark beer with coffee and chocolate notes',
      price: 7.49,
      image: craftBeer,
      popular: false,
      dietary: ['alcoholic', 'dark', 'rich']
    },
    {
      id: 28,
      name: 'Lager',
      description: 'Crisp and clean lager beer, perfect for any occasion',
      price: 5.49,
      image: beerTasting,
      popular: true,
      dietary: ['alcoholic', 'crisp']
    },
    {
      id: 29,
      name: 'Porter',
      description: 'Dark beer with roasted malt flavors and smooth texture',
      price: 6.99,
      image: craftBeer,
      popular: false,
      dietary: ['alcoholic', 'dark', 'roasted']
    },
    {
      id: 30,
      name: 'Pilsner',
      description: 'Golden beer with floral hops and crisp finish',
      price: 5.99,
      image: beerTasting,
      popular: true,
      dietary: ['alcoholic', 'golden', 'crisp']
    }
  ]
  }


const menuPackages = [
    {
      id: 'silver',
      name: 'Silver Package',
      price: '$45/person',
      description: 'Appetizer, main course, dessert, and soft drinks',
      items: ['Caesar Salad or Soup', 'Choice of 3 Main Courses', 'Seasonal Dessert', 'Coffee & Tea']
    },
    {
      id: 'gold',
      name: 'Gold Package',
      price: '$65/person',
      description: 'Premium appetizers, multiple courses, wine pairing',
      items: ['Premium Appetizer Selection', 'Choice of 4 Main Courses', 'Wine Pairing', 'Gourmet Desserts', 'Full Bar Service']
    },
    {
      id: 'platinum',
      name: 'Platinum Package',
      price: '$85/person',
      description: 'Luxury dining experience with chef specialties',
      items: ['Chef\'s Special Appetizers', 'Choice of 5 Signature Dishes', 'Premium Wine Selection', 'Custom Dessert Options', 'Full Bar & Cocktails', 'Dedicated Server']
    }
  ]


   const eventTypes = [
    'Birthday Party',
    'Anniversary',
    'Corporate Event',
    'Wedding Reception',
    'Baby Shower',
    'Graduation Party',
    'Holiday Party',
    'Other'
  ];
  


  export const getEventTypes = () => {
    return eventTypes
  }

export const getMenuPackages = () => {
  return menuPackages
}



// Helper functions
export const getItemsByCategory = (category) => {
  return menuItems[category] || []
}

export const getPopularItems = () => {
  const allItems = Object.values(menuItems).flat()
  return allItems.filter(item => item.popular)
}

export const searchItems = (query) => {
  const allItems = Object.values(menuItems).flat()
  return allItems.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  )
}

