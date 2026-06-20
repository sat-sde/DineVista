const foodItems = [
  {
    id: "1",
    name: "Classic Cheeseburger",
    price: "$6.99",
    desc: "Our juicy, hand-pressed beef patty is grilled to perfection and served on a toasted brioche bun with melted cheddar, crisp lettuce, ripe tomatoes, and tangy pickles. Complete your meal with our golden fries for a satisfying comfort food experience.",
    image: "https://www.foodandwine.com/thmb/LUEdbNTLcdq_BtCmINp23zQbQro=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheeseburgers-eat-delicious-XL-BLOG0517-b578f43651854aeb8e2e605580094811.jpg"
  },
  {
    id: "2",
    name: "Wood-Fired Pizza",
    price: "$10.99",
    desc: "Freshly baked in our wood-fired oven, this pizza features a crisp yet tender crust topped with our signature tomato sauce, melted mozzarella, and your choice of premium toppings. Whether you crave pepperoni, fresh veggies, or classic margherita, it's always made fresh to order.",
    image: "https://static.vecteezy.com/system/resources/previews/022/701/934/non_2x/generative-ai-illustration-of-italian-pizza-is-cooked-in-a-wood-fired-oven-photo.jpg"
  },
  {
    id: "3",
    name: "Gourmet Sandwich",
    price: "$7.99",
    desc: "Crafted with artisan bread and filled with fresh, high-quality ingredients, our gourmet sandwiches offer a perfect blend of flavors. From smoked turkey with avocado to roasted veggies with goat cheese, every bite is a savory delight.",
    image: "https://img.freepik.com/free-photo/tasty-appetizing-sandwich-with-ham-vegetables-served-plate_1220-6788.jpg"
  },
  {
    id: "4",
    name: "Authentic Pasta",
    price: "$9.99",
    desc: "Savor the taste of Italy with our classic pasta dishes. Choose your favorite from spaghetti marinara, creamy fettuccine alfredo, or rich pesto. Each dish is crafted with fresh, hand-tossed noodles and house-made sauces.",
    image: "https://media.istockphoto.com/id/857927726/photo/pasta-with-meat-tomato-sauce-and-vegetables.jpg?s=612x612&w=0&k=20&c=1bcoXcBKM7Hb1ASweDx-vcwXEgy-WrCGM71dVP2Cp0w="
  },
  {
    id: "5",
    name: "Fresh Garden Salad",
    price: "$8.99",
    desc: "Crisp greens, juicy tomatoes, and seasonal vegetables come together in our vibrant garden salad, topped with your choice of grilled chicken, shrimp, or tofu. Enjoy it with a house-made vinaigrette or a creamy dressing for a light yet satisfying meal.",
    image: "https://img.freepik.com/free-photo/fresh-salad-with-vegetables-tomatoes-red-onions-lettuce-quail-eggs-healthy-food-diet-concept-vegetarian-food_2829-20246.jpg"
  },
  {
    id: "6",
    name: "Crispy French Fries",
    price: "$3.99",
    desc: "Golden, crispy, and perfectly seasoned, our French fries are the ideal sidekick for any meal. Double-fried for that extra crunch, they're irresistible on their own or paired with a burger or sandwich.",
    image: "https://static.vecteezy.com/system/resources/previews/028/180/321/large_2x/freshly-cooked-crispy-french-fries-unhealthy-fast-food-ai-generative-photo.jpg"
  },
  {
    id: "7",
    name: "House-Made Ice Cream",
    price: "$4.99",
    desc: "Indulge in our house-made ice cream, crafted from premium ingredients. Whether you opt for classic flavors like vanilla and chocolate or try something new like salted caramel, each scoop is creamy and decadent.",
    image: "https://img.freepik.com/free-photo/delicious-ice-cream-with-cookies-top-view_23-2149681853.jpg"
  },
  {
    id: "8",
    name: "Signature Sushi",
    price: "$12.99",
    desc: "Delight in our signature sushi rolls, made with the freshest fish and seasoned rice. From classic California rolls to spicy tuna and tempura shrimp, every roll is a beautifully crafted bite of flavor.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/022/263/428/small_2x/a-rolls-with-salmon-avocado-tuna-and-cucumber-isolated-on-white-background-fresh-hosomaki-pieces-with-rice-and-nori-closeup-of-delicious-japanese-food-with-sushi-roll-generative-ai-photo.jpg"
  },
  {
    id: "9",
    name: "Specialty Sushi Rolls",
    price: "$14.99",
    desc: "Indulge in our creative sushi rolls, featuring combinations like spicy salmon, avocado, and crispy tempura flakes. Handcrafted by our sushi chefs, these rolls balance fresh ingredients with bold flavors.",
    image: "https://img.pikbest.com/photo/20240525/sushi-rolls-macro-hyper-detailed-trending-on-artstation_10582561.jpg!w700wp"
  },
  {
    id: "10",
    name: "Grilled Steak",
    price: "$15.99",
    desc: "Sink your teeth into our perfectly grilled steak, seared to your liking and served with your choice of sides. This premium cut is seasoned with a savory rub and finished with a drizzle of garlic herb butter for a truly indulgent dining experience.",
    image: "https://www.shutterstock.com/image-photo/grilled-meat-steak-on-stainless-600nw-2203020861.jpg"
  },
  {
    id: "11",
    name: "Hearty Soup",
    price: "$5.99",
    desc: "Warm up with a bowl of our hearty, house-made soup. Whether you prefer the classic tomato basil, creamy broccoli cheddar, or chicken noodle, our soups are the perfect comfort food for any time of day.",
    image: "https://sallysbakingaddiction.com/wp-content/uploads/2018/01/best-minestrone-soup.jpg"
  },
  {
    id: "12",
    name: "Street Tacos",
    price: "$8.99",
    desc: "Get a taste of authentic Mexican street food with our tacos, featuring your choice of seasoned meats like carnitas, chicken, or beef, topped with fresh salsa, cilantro, and a squeeze of lime. Served with house-made tortilla chips and salsa.",
    image: "https://img.freepik.com/premium-photo/tacos-with-creative-use-negativ_1179130-2724.jpg"
  },
  {
    id: "13",
    name: "Buffalo Chicken Wings",
    price: "$11.99",
    desc: "Crispy, juicy chicken wings tossed in your choice of buffalo, BBQ, or sweet chili sauce. Served with a side of cool ranch and crunchy celery sticks for the perfect game-day snack or a spicy meal.",
    image: "https://img.freepik.com/free-photo/grilled-buffalo-chicken-wings-rustic-wood-plate-generated-by-ai_188544-26049.jpg"
  },
  {
    id: "14",
    name: "Veggie Wrap",
    price: "$7.99",
    desc: "A fresh and healthy option, our veggie wrap is loaded with crunchy vegetables, hummus, and your choice of protein, all wrapped in a soft whole-grain tortilla. Perfect for a light lunch on the go.",
    image: "https://t3.ftcdn.net/jpg/07/40/68/56/360_F_740685644_2AoWxy0KJkd0WwHUH4kpKQ7R0KVDFu9r.jpg"
  },
    {
      id: "15",
      name: "Avocado Toast",
      price: "$6.99",
      desc: "A perfect start to your day! Creamy avocado spread on toasted whole grain bread, topped with a sprinkle of sea salt, chili flakes, and a drizzle of olive oil. Add a poached egg or smoked salmon for a gourmet twist.",
      image: "https://static.vecteezy.com/system/resources/previews/023/901/890/non_2x/avocado-toast-on-a-white-plate-on-a-rustic-wooden-table-illustration-ai-generative-free-photo.jpg"
    },
    {
      id: "16",
      name: "Grilled Veggie Sandwich",
      price: "$7.99",
      desc: "A hearty sandwich stuffed with grilled bell peppers, zucchini, eggplant, and mozzarella, served on ciabatta bread with a spread of pesto. A fresh and filling option for any meal.",
      image: "https://www.vegrecipesofindia.com/wp-content/uploads/2014/01/grilled-sandwich-1.jpg"
    },
    {
      id: "17",
      name: "Fish and Chips",
      price: "$11.99",
      desc: "A British classic! Crispy, golden beer-battered fish served with a generous portion of thick-cut fries and a side of tangy tartar sauce. Pair it with a refreshing lemon wedge for an extra zesty touch.",
      image: "https://img.freepik.com/premium-photo/traditional-english-food-fish-chips-black-background_123827-26941.jpg"
    },
    {
      id: "18",
      name: "Margherita Pizza",
      price: "$9.99",
      desc: "Classic Margherita pizza with a thin crust, topped with fresh mozzarella, sliced tomatoes, basil leaves, and a drizzle of olive oil. A light yet flavorful option for pizza lovers.",
      image: "https://cdn.pixabay.com/photo/2024/04/21/18/44/ai-generated-8711272_1280.jpg"
    },
    {
      id: "19",
      name: "Cheese Quesadilla",
      price: "$6.99",
      desc: "A crispy flour tortilla filled with melted cheddar and Monterey Jack cheeses, served with fresh guacamole, sour cream, and pico de gallo. A cheesy, satisfying snack or meal option!",
      image: "https://static.vecteezy.com/system/resources/thumbnails/030/625/891/small_2x/quesadilla-image-hd-free-photo.jpg"
    },
    {
      id: "20",
      name: "BBQ Pulled Pork Sandwich",
      price: "$8.99",
      desc: "Slow-cooked, tender pulled pork drenched in smoky barbecue sauce, served on a soft bun with a side of coleslaw. A southern classic that's packed with flavor in every bite.",
      image: "https://131462681.cdn6.editmysite.com/uploads/1/3/1/4/131462681/s408761767752705371_p32_i3_w5616.jpeg?width=2560"
    },
    {
      id: "21",
      name: "Lobster Roll",
      price: "$14.99",
      desc: "Chunks of fresh lobster meat tossed in a light, creamy dressing and served on a buttery, toasted bun. A New England favorite that's both luxurious and comforting.",
      image: "https://t4.ftcdn.net/jpg/08/38/13/19/360_F_838131983_NPx7FoqtmwNjKKk3cpbHsmsyvl1ZPbPG.jpg"
    },
    {
      id: "22",
      name: "Spicy Ramen Bowl",
      price: "$11.99",
      desc: "A rich, flavorful broth simmered with garlic, ginger, and chili oil, served over tender ramen noodles, and topped with soft-boiled eggs, marinated pork belly, and fresh green onions. A perfect meal to warm you up on a chilly day.",
      image: "https://img.freepik.com/premium-photo/spicy-ramen-bowl-with-fresh-vegetables-seafood-generated-by-ai_188544-22253.jpg"
    },
    {
      id: "23",
      name: "Chicken Quesadilla",
      price: "$7.99",
      desc: "Grilled chicken, melted cheddar, and Monterey Jack cheese, folded in a crispy tortilla, served with a side of fresh guacamole, sour cream, and pico de gallo. Perfect for sharing or enjoying as a meal!",
      image: "https://img.freepik.com/premium-photo/chicken-quesadilla-food-professional-photography-generative-ai_913266-6707.jpg"
    },
    {
      id: "24",
      name: "Grilled Salmon",
      price: "$13.99",
      desc: "A perfectly grilled salmon fillet, seasoned with herbs and served with a side of roasted vegetables and lemon butter sauce. A healthy and delicious choice for any seafood lover.",
      image: "https://media.istockphoto.com/id/1433809721/photo/two-salmon-fillets-baked-until-crispy-with-sesame-close-up.jpg?s=612x612&w=0&k=20&c=5rI4OFj8sSCWI2CEIqz47V_jFYhYIlPEF71zrzlmUQ4="
    },
    {
      id: "25",
      name: "Chocolate Lava Cake",
      price: "$6.99",
      desc: "A decadent molten chocolate cake with a rich, gooey center, served warm with a scoop of vanilla ice cream. The perfect indulgence for any chocolate lover.",
      image: "https://media.longhornsteakhouse.com/en_us/images/marketing/MoltenLavaCake918x568.png"
    },
    {
      id: "26",
      name: "Mixed Berry Parfait",
      price: "$5.99",
      desc: "A delightful mix of fresh berries layered with creamy Greek yogurt and crunchy granola. A light and refreshing dessert or snack that’s bursting with flavor.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH2O8HRh9ivCWv82akZHDD09bS6sce9jMQ9A&s"
    },
      {
        id: "27",
        name: "Paneer Tikka",
        price: "$8.99",
        desc: "Chunks of paneer marinated in yogurt and spices, skewered with bell peppers and onions, and grilled to perfection. Served with a side of mint chutney for a flavorful bite.",
        image: "https://t4.ftcdn.net/jpg/08/24/35/61/360_F_824356146_wskBHp7Ft3lRXcF37fCWRFUYtZESvVSs.jpg"
      },
      {
        id: "28",
        name: "Mushroom Risotto",
        price: "$12.99",
        desc: "Creamy arborio rice cooked with sautéed mushrooms, garlic, and Parmesan cheese, finished with a drizzle of truffle oil. A rich, savory dish that's both comforting and indulgent.",
        image: "https://ik.imagekit.io/munchery/blog/tr:w-768/porcini-mushroom-risotto-recipe.jpeg"
      },
      {
        id: "29",
        name: "Paneer Butter Masala",
        price: "$9.99",
        desc: "Soft cubes of paneer cooked in a rich, creamy tomato-based gravy, flavored with aromatic spices and butter. Served with a side of naan or basmati rice.",
        image: "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-butter-masala-1.jpg"
      },
      {
        id: "30",
        name: "Stuffed Mushroom Caps",
        price: "$7.99",
        desc: "Portobello mushroom caps stuffed with a mixture of cream cheese, herbs, and breadcrumbs, baked until golden brown and served with a drizzle of balsamic glaze. A perfect appetizer or light snack.",
        image: "https://www.eatingwell.com/thmb/jC0C97YHPDjRDYlh2f6iruXfXa0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7032138-3b643290901d4283963338d37a5e557e.jpg"
      },
];


module.exports=foodItems;