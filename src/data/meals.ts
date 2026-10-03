import { Meal } from "@/types";

export const MEALS_DATABASE: Meal[] = [
  // 1. Indian
  {
    id: "chickpea-curry",
    name: "Golden Chickpea & Spinach Curry",
    description: "Warm, fragrant aromatic curry with tender chickpeas, fresh baby spinach, coconut milk, and ginger turmeric sauce.",
    cuisine: "Indian",
    category: "Indian",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Chickpeas (canned)", amount: "2 cans (30 oz)", category: "protein" },
      { name: "Coconut milk", amount: "1 can (13.5 oz)", category: "pantry" },
      { name: "Baby spinach", amount: "4 cups", category: "produce" },
      { name: "Diced tomatoes", amount: "1 can (14 oz)", category: "produce" },
      { name: "Yellow onion", amount: "1 medium", category: "produce" },
      { name: "Garlic cloves", amount: "4 minced", category: "produce" },
      { name: "Fresh ginger", amount: "1 tbsp grated", category: "produce" },
      { name: "Garam masala", amount: "1 tbsp", category: "spices" },
      { name: "Ground turmeric", amount: "1 tsp", category: "spices" },
      { name: "Ground cumin", amount: "1 tsp", category: "spices" },
      { name: "Olive oil", amount: "2 tbsp", category: "pantry" },
      { name: "Basmati rice", amount: "2 cups dry", category: "grains" }
    ],
    instructions: [
      "Heat olive oil in a deep pan or dutch oven over medium heat. Sauté diced onion for 4 minutes until translucent.",
      "Add minced garlic and fresh ginger; cook for 1 minute until fragrant.",
      "Stir in garam masala, turmeric, and cumin to bloom the spices in warm oil (30 seconds).",
      "Pour in diced tomatoes with juices and coconut milk. Stir well and bring to a gentle simmer.",
      "Add rinsed chickpeas and simmer uncovered for 15 minutes to allow flavors to meld and sauce to thicken.",
      "Fold in fresh baby spinach until just wilted (about 2 minutes). Season with salt and pepper.",
      "Serve hot over steamed basmati rice with lime wedges."
    ],
    allergenTags: [],
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free"],
    caloriesApprox: 480,
    proteinApprox: 16,
    carbsApprox: 68,
    fatApprox: 15,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Chickpeas", substitute: "Tofu cubes or Diced chicken breast", note: "Adjust cook time if using chicken" }
    ],
    crossContactTips: [
      "Naturally free from top 9 allergens (verify canned coconut milk label for tree nut facility notices)."
    ],
    isPopular: true
  },
  {
    id: "paneer-tikka-masala",
    name: "Smoky Paneer Tikka Masala",
    description: "Pan-seared spiced Indian cottage cheese simmered in a velvety, spiced tomato-fenugreek gravy.",
    cuisine: "Indian",
    category: "Indian",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Paneer cubes", amount: "400g (14 oz)", category: "dairy" },
      { name: "Plain Greek yogurt", amount: "1/2 cup", category: "dairy" },
      { name: "Tomato puree", amount: "2 cups", category: "pantry" },
      { name: "Heavy cream", amount: "1/4 cup", category: "dairy" },
      { name: "Butter", amount: "2 tbsp", category: "dairy" },
      { name: "Onion", amount: "1 large finely chopped", category: "produce" },
      { name: "Garlic & Ginger paste", amount: "2 tbsp", category: "produce" },
      { name: "Kashmiri chili powder", amount: "1.5 tsp", category: "spices" },
      { name: "Garam masala", amount: "1 tsp", category: "spices" },
      { name: "Kasuri methi (fenugreek)", amount: "1 tbsp", category: "spices" },
      { name: "Naan flatbread", amount: "4 pieces", category: "grains" }
    ],
    instructions: [
      "Marinate paneer cubes in yogurt, turmeric, chili powder, and salt for 15 minutes.",
      "Sear marinated paneer in a hot cast iron skillet with 1 tbsp butter until golden-brown spots form. Set aside.",
      "In the same pan, melt remaining butter, sauté chopped onions until golden brown (6-8 minutes).",
      "Add ginger-garlic paste and spices; sauté for 1 minute.",
      "Add tomato puree and simmer on low for 10 minutes until oil separates.",
      "Stir in heavy cream and crushed kasuri methi for richness.",
      "Add the seared paneer cubes and simmer gently for 3-4 minutes. Serve with warm naan and basmati rice."
    ],
    allergenTags: ["dairy", "wheat_gluten"],
    dietaryTags: ["Vegetarian", "High-Protein"],
    caloriesApprox: 580,
    proteinApprox: 24,
    carbsApprox: 45,
    fatApprox: 34,
    imageUrl: "/meals/lentil-curry.jpg",
    substitutions: [
      { original: "Paneer cubes", substitute: "Pressed extra firm tofu", note: "Makes the dish dairy-free when combined with coconut cream", targetAllergen: "dairy" },
      { original: "Heavy cream & Butter", substitute: "Coconut cream & Olive oil", note: "Provides velvety dairy-free sauce", targetAllergen: "dairy" },
      { original: "Naan flatbread", substitute: "Basmati rice or Gluten-free roti", note: "For gluten-free diners", targetAllergen: "wheat_gluten" }
    ],
    crossContactTips: [
      "Contains dairy and gluten (from naan). Use separate tongs and clean pan if preparing dairy-free tofu variation."
    ],
    isPopular: true
  },
  {
    id: "dal-tadka",
    name: "Comforting Yellow Dal Tadka",
    description: "Homestyle red and yellow lentils tempered with cumin, garlic, ghee, mustard seeds, and fresh cilantro.",
    cuisine: "Indian",
    category: "Indian",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Toor dal / Red lentils", amount: "1.5 cups", category: "grains" },
      { name: "Water / vegetable broth", amount: "4 cups", category: "pantry" },
      { name: "Ghee / olive oil", amount: "2 tbsp", category: "dairy" },
      { name: "Cumin seeds", amount: "1 tsp", category: "spices" },
      { name: "Mustard seeds", amount: "1/2 tsp", category: "spices" },
      { name: "Garlic cloves", amount: "5 sliced", category: "produce" },
      { name: "Green chili", amount: "1 slit", category: "produce" },
      { name: "Ground turmeric", amount: "1/2 tsp", category: "spices" },
      { name: "Fresh cilantro", amount: "1/4 cup chopped", category: "produce" }
    ],
    instructions: [
      "Pressure cook or boil rinsed lentils with turmeric, salt, and water for 15 minutes until soft and creamy.",
      "Whisk lentils lightly to create a smooth, comforting consistency.",
      "In a small tempering pan, heat ghee or olive oil over medium-high heat.",
      "Add cumin seeds and mustard seeds until they sizzle and crackle.",
      "Add sliced garlic and green chili; fry until garlic turns golden brown.",
      "Pour the aromatic sizzling tadka directly over the hot dal and cover immediately to trap aromatics.",
      "Garnish with fresh cilantro and serve with steamed rice or lemon wedges."
    ],
    allergenTags: ["dairy"],
    dietaryTags: ["Vegetarian", "Gluten-Free", "High-Protein", "Nut-Free"],
    caloriesApprox: 340,
    proteinApprox: 18,
    carbsApprox: 48,
    fatApprox: 8,
    imageUrl: "/meals/mushroom-risotto.jpg",
    substitutions: [
      { original: "Ghee", substitute: "Extra virgin olive oil or mustard oil", note: "Makes the dal completely dairy-free / vegan", targetAllergen: "dairy" }
    ],
    crossContactTips: ["Use vegetable oil/olive oil for strict dairy-free roommates."],
    isPopular: false
  },

  // 2. Italian
  {
    id: "creamy-garlic-pasta",
    name: "Creamy Garlic Parmesan Pasta",
    description: "Silky fettuccine tossed in a rich roasted garlic, butter, and freshly grated aged parmesan reduction with parsley.",
    cuisine: "Italian",
    category: "Italian",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Fettuccine pasta", amount: "1 lb (450g)", category: "grains" },
      { name: "Heavy cream", amount: "1 cup", category: "dairy" },
      { name: "Butter", amount: "4 tbsp", category: "dairy" },
      { name: "Parmesan cheese", amount: "1 cup freshly grated", category: "dairy" },
      { name: "Garlic cloves", amount: "6 minced", category: "produce" },
      { name: "Fresh flat-leaf parsley", amount: "1/4 cup chopped", category: "produce" },
      { name: "Black pepper & sea salt", amount: "to taste", category: "spices" },
      { name: "Reserved pasta water", amount: "1/2 cup", category: "pantry" }
    ],
    instructions: [
      "Bring a large pot of salted water to a rolling boil. Cook fettuccine until al dente (about 9-11 min). Reserve 1/2 cup pasta water before draining.",
      "In a wide skillet, melt butter over medium-low heat. Add minced garlic and sauté for 1-2 minutes until soft and fragrant without browning.",
      "Pour in heavy cream and bring to a gentle simmer for 3 minutes until slightly reduced.",
      "Turn heat to lowest setting. Gradually whisk in freshly grated parmesan cheese until silky smooth.",
      "Add cooked pasta directly to the sauce with a splash of starchy pasta water. Toss vigorously for 1 minute until glossy.",
      "Garnish with chopped fresh parsley and freshly cracked black pepper. Serve immediately."
    ],
    allergenTags: ["dairy", "wheat_gluten"],
    dietaryTags: ["Vegetarian", "Quick Meals"],
    caloriesApprox: 620,
    proteinApprox: 18,
    carbsApprox: 65,
    fatApprox: 32,
    imageUrl: "/meals/creamy-pasta.jpg",
    substitutions: [
      { original: "Heavy cream & Butter", substitute: "Oat cooking cream + Olive oil", note: "Replaces dairy richness with neutral plant cream", targetAllergen: "dairy" },
      { original: "Parmesan cheese", substitute: "Nutritional yeast + pulsed sunflower seeds", note: "Savory cheesy umami without dairy", targetAllergen: "dairy" },
      { original: "Fettuccine pasta", substitute: "Gluten-free brown rice fettuccine", note: "Gluten-free swap with same texture", targetAllergen: "wheat_gluten" }
    ],
    crossContactTips: [
      "Contains dairy and wheat gluten. Boil GF pasta in clean water and toss in a dedicated skillet."
    ],
    isPopular: true
  },
  {
    id: "tuscan-white-bean-skillet",
    name: "Rustic Tuscan White Bean & Tomato Skillet",
    description: "Creamy cannellini beans stewed with San Marzano tomatoes, fresh rosemary, baby kale, garlic, and extra virgin olive oil.",
    cuisine: "Italian",
    category: "One-Pot",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Cannellini beans (canned)", amount: "2 cans (30 oz)", category: "protein" },
      { name: "San Marzano crushed tomatoes", amount: "1 can (28 oz)", category: "produce" },
      { name: "Baby kale / Tuscan kale", amount: "3 cups chopped", category: "produce" },
      { name: "Garlic cloves", amount: "5 thinly sliced", category: "produce" },
      { name: "Fresh rosemary", amount: "1 sprig minced", category: "spices" },
      { name: "Extra virgin olive oil", amount: "3 tbsp", category: "pantry" },
      { name: "Red pepper flakes", amount: "1/4 tsp", category: "spices" },
      { name: "Crusty sourdough bread", amount: "for serving (optional)", category: "grains" }
    ],
    instructions: [
      "In a heavy cast-iron skillet, warm olive oil over medium heat. Sauté sliced garlic, rosemary, and red pepper flakes for 90 seconds.",
      "Add crushed tomatoes and a pinch of salt. Simmer for 10 minutes until sauce thickens.",
      "Stir in drained and rinsed cannellini beans. Cook on low simmer for 8 minutes to absorb herb-tomato sauce.",
      "Stir in chopped Tuscan kale and cook until tender (3 minutes).",
      "Drizzle with top-shelf olive oil and serve warm with toasted sourdough or gluten-free bread."
    ],
    allergenTags: [],
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "One-Pot"],
    caloriesApprox: 380,
    proteinApprox: 17,
    carbsApprox: 58,
    fatApprox: 9,
    imageUrl: "/meals/salad.jpg",
    substitutions: [
      { original: "Sourdough bread", substitute: "Gluten-free toasted baguette or Polenta", note: "For gluten-sensitive roommates", targetAllergen: "wheat_gluten" }
    ],
    crossContactTips: [
      "Naturally free from dairy, nuts, soy, and eggs."
    ],
    isPopular: false
  },
  {
    id: "classic-margherita-flatbread",
    name: "Crispy Margherita Basil Flatbread",
    description: "Quick artisan flatbread with crushed plum tomatoes, fresh mozzarella medallions, fragrant basil, and balsamic glaze.",
    cuisine: "Italian",
    category: "Quick Meals",
    prepTime: 10,
    cookTime: 12,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Artisan flatbread crusts", amount: "2 large", category: "grains" },
      { name: "Fresh mozzarella", amount: "8 oz sliced", category: "dairy" },
      { name: "Plum tomatoes", amount: "3 thinly sliced", category: "produce" },
      { name: "Fresh basil leaves", amount: "1/2 cup", category: "produce" },
      { name: "Olive oil", amount: "2 tbsp", category: "pantry" },
      { name: "Balsamic glaze", amount: "1 tbsp", category: "pantry" },
      { name: "Sea salt & oregano", amount: "1/2 tsp each", category: "spices" }
    ],
    instructions: [
      "Preheat oven to 425°F (220°C). Lightly brush flatbread crusts with olive oil.",
      "Layer sliced fresh mozzarella and sliced plum tomatoes evenly across the crust.",
      "Bake directly on oven rack or hot baking sheet for 10-12 minutes until crust is crispy and cheese is bubbling.",
      "Remove from oven and immediately scatter fresh basil leaves on top.",
      "Drizzle with aged balsamic glaze, slice into wedges, and serve."
    ],
    allergenTags: ["dairy", "wheat_gluten"],
    dietaryTags: ["Vegetarian", "Quick Meals"],
    caloriesApprox: 420,
    proteinApprox: 19,
    carbsApprox: 42,
    fatApprox: 18,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Fresh mozzarella", substitute: "Vegan almond or cashew mozzarella / Dairy-free shreds", note: "Plant-based meltable cheese", targetAllergen: "dairy" },
      { original: "Artisan flatbread crust", substitute: "Gluten-free cauliflower or rice flour crust", note: "Gluten-free pizza base", targetAllergen: "wheat_gluten" }
    ],
    crossContactTips: ["Use separate baking sheet / parchment paper for allergen-free flatbreads."],
    isPopular: true
  },

  // 3. Mexican
  {
    id: "chipotle-black-bean-tacos",
    name: "Crispy Chipotle Black Bean & Avocado Tacos",
    description: "Warm corn tortillas filled with smoky chipotle seasoned black beans, sweet charred corn, fresh avocado salsa, and cilantro.",
    cuisine: "Mexican",
    category: "Mexican",
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Corn tortillas (gluten-free)", amount: "8 small", category: "grains" },
      { name: "Black beans (canned)", amount: "2 cans (30 oz)", category: "protein" },
      { name: "Sweet corn kernels", amount: "1 cup", category: "produce" },
      { name: "Ripe avocados", amount: "2 diced", category: "produce" },
      { name: "Red onion", amount: "1/2 diced", category: "produce" },
      { name: "Fresh cilantro", amount: "1/2 cup chopped", category: "produce" },
      { name: "Limes", amount: "2 juiced", category: "produce" },
      { name: "Chipotle powder & cumin", amount: "1 tsp each", category: "spices" },
      { name: "Olive oil", amount: "1 tbsp", category: "pantry" }
    ],
    instructions: [
      "In a skillet over medium heat, warm olive oil and sauté drained black beans with chipotle powder, cumin, lime juice, and salt for 6 minutes. Mash lightly with a fork.",
      "Char sweet corn in a dry hot skillet for 4 minutes until golden spots appear.",
      "Toss diced avocados, charred corn, red onion, cilantro, lime juice, and salt to make a vibrant salsa.",
      "Warm corn tortillas on a dry skillet or over an open flame for 30 seconds per side until pliable.",
      "Assemble tacos: spoon warm seasoned black beans into tortillas, top generously with avocado-corn salsa, and serve with lime wedges."
    ],
    allergenTags: [],
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "Quick Meals"],
    caloriesApprox: 410,
    proteinApprox: 15,
    carbsApprox: 62,
    fatApprox: 14,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Black beans", substitute: "Grilled chicken breast or Jackfruit", note: "For high protein or varied texture" }
    ],
    crossContactTips: ["Naturally free of major allergens. Check corn tortilla packaging for wheat facility traces."],
    isPopular: true
  },
  {
    id: "fajita-chicken-burrito-bowl",
    name: "Fiesta Lime Chicken Fajita Bowl",
    description: "Marinated grilled chicken with bell peppers, cilantro-lime brown rice, pinto beans, guacamole, and fire-roasted salsa.",
    cuisine: "Mexican",
    category: "Rice Bowls",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Chicken breast", amount: "1.5 lbs sliced", category: "protein" },
      { name: "Bell peppers (tri-color)", amount: "3 sliced", category: "produce" },
      { name: "Red onion", amount: "1 large sliced", category: "produce" },
      { name: "Brown rice / white rice", amount: "2 cups cooked", category: "grains" },
      { name: "Pinto beans", amount: "1 can (15 oz)", category: "protein" },
      { name: "Guacamole", amount: "1 cup", category: "produce" },
      { name: "Pico de gallo / salsa", amount: "1 cup", category: "produce" },
      { name: "Fajita seasoning (cumin, paprika, oregano)", amount: "2 tbsp", category: "spices" },
      { name: "Lime juice & olive oil", amount: "2 tbsp each", category: "pantry" }
    ],
    instructions: [
      "Toss chicken slices with fajita seasoning, lime juice, and 1 tbsp olive oil.",
      "Sear chicken in a screaming hot skillet for 6-8 minutes until caramelized and cooked through (165°F internal). Set aside.",
      "In the same skillet, sauté sliced bell peppers and onions for 5 minutes until tender-crisp with charred edges.",
      "Assemble bowls: base of warm cilantro-lime rice, topped with sections of seasoned chicken, fajita peppers, pinto beans, fresh guacamole, and pico de gallo.",
      "Serve with lime wedges and hot sauce."
    ],
    allergenTags: [],
    dietaryTags: ["Gluten-Free", "Dairy-Free", "High-Protein", "Nut-Free"],
    caloriesApprox: 540,
    proteinApprox: 42,
    carbsApprox: 54,
    fatApprox: 16,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Chicken breast", substitute: "Seasoned firm tofu or Portobello mushroom strips", note: "Makes the bowl 100% vegetarian/vegan", targetAllergen: "meat" }
    ],
    crossContactTips: ["Use separate tongs and pan when cooking tofu/chicken side by side."],
    isPopular: true
  },
  {
    id: "tortilla-soup",
    name: "Smoky Tortilla & Black Bean Soup",
    description: "Rich fire-roasted tomato broth with simmered black beans, corn, crispy baked tortilla strips, avocado, and lime.",
    cuisine: "Mexican",
    category: "Soups",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Vegetable broth", amount: "4 cups", category: "pantry" },
      { name: "Fire roasted crushed tomatoes", amount: "1 can (28 oz)", category: "produce" },
      { name: "Black beans", amount: "1 can (15 oz)", category: "protein" },
      { name: "Corn kernels", amount: "1 cup", category: "produce" },
      { name: "Onion & Garlic", amount: "1 onion, 3 cloves", category: "produce" },
      { name: "Smoked paprika & cumin", amount: "1 tsp each", category: "spices" },
      { name: "Corn tortilla strips", amount: "1 cup baked", category: "grains" },
      { name: "Diced avocado & cilantro", amount: "for topping", category: "produce" }
    ],
    instructions: [
      "Sauté onion and garlic in a soup pot with olive oil until soft.",
      "Add smoked paprika, cumin, crushed tomatoes, and vegetable broth. Simmer for 12 minutes.",
      "Add black beans and corn; simmer 5 more minutes.",
      "Ladle into bowls and top with baked crispy tortilla strips, avocado, fresh cilantro, and lime juice."
    ],
    allergenTags: [],
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "One-Pot"],
    caloriesApprox: 320,
    proteinApprox: 12,
    carbsApprox: 52,
    fatApprox: 9,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Black beans", substitute: "Shredded chicken or Pinto beans", note: "Add shredded cooked chicken if meat protein desired" }
    ],
    crossContactTips: ["Safe for most dietary restrictions. Ensure tortilla strips are certified gluten-free."],
    isPopular: false
  },

  // 4. Asian
  {
    id: "pad-thai-noodles",
    name: "Bangkok Street-Style Pad Thai",
    description: "Stir-fried flat rice noodles with egg, tofu, bean sprouts, garlic chives, tangy tamarind sauce, and crushed peanuts.",
    cuisine: "Asian",
    category: "Asian",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Rice noodles (Pad Thai cut)", amount: "8 oz (225g)", category: "grains" },
      { name: "Extra firm tofu", amount: "200g cubed", category: "protein" },
      { name: "Eggs", amount: "2 large lightly beaten", category: "protein" },
      { name: "Bean sprouts", amount: "2 cups", category: "produce" },
      { name: "Crushed peanuts", amount: "1/4 cup toasted", category: "pantry" },
      { name: "Garlic cloves & Shallots", amount: "3 cloves, 2 shallots", category: "produce" },
      { name: "Tamarind paste", amount: "2 tbsp", category: "pantry" },
      { name: "Fish sauce (or Tamari)", amount: "2 tbsp", category: "pantry" },
      { name: "Coconut palm sugar", amount: "2 tbsp", category: "pantry" },
      { name: "Lime wedges & chili flakes", amount: "for serving", category: "produce" }
    ],
    instructions: [
      "Soak rice noodles in warm water for 25 minutes until pliable but firm. Drain well.",
      "Whisk tamarind paste, fish sauce (or tamari), coconut sugar, and 2 tbsp water in a bowl for the sauce.",
      "Heat oil in a large wok over high heat. Fry tofu cubes until golden (3 min).",
      "Add minced shallots and garlic; stir-fry for 30 seconds.",
      "Push ingredients to the side, pour beaten eggs into the empty space and scramble until soft curds form.",
      "Add soaked noodles and pour the tamarind sauce all over. Toss vigorously on high heat for 2-3 minutes until noodles absorb sauce.",
      "Fold in bean sprouts and garlic chives for 30 seconds. Remove from heat.",
      "Serve hot with crushed peanuts on the side (or omitted), lime wedges, and chili flakes."
    ],
    allergenTags: ["peanuts", "eggs", "soy", "fish"],
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    caloriesApprox: 510,
    proteinApprox: 20,
    carbsApprox: 68,
    fatApprox: 18,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Crushed peanuts", substitute: "Toasted pumpkin seeds or sunflower seeds", note: "CRITICAL: Replace for peanut allergy safety", targetAllergen: "peanuts" },
      { original: "Eggs", substitute: "Extra firm tofu or omit egg scramble", note: "For egg allergy or vegan diet", targetAllergen: "eggs" },
      { original: "Fish sauce", substitute: "Tamari + lime juice + brown sugar", note: "Fish-free and vegetarian safe", targetAllergen: "fish" }
    ],
    crossContactTips: [
      "🚨 HIGH ALLERGY ALERT: Contains peanuts, eggs, soy, and fish. Keep crushed peanuts in a separate bowl rather than tossing into the main wok."
    ],
    isPopular: true
  },
  {
    id: "sesame-ginger-tofu-bowl",
    name: "Crispy Sesame Ginger Tofu Rice Bowl",
    description: "Golden crispy cornstarch-crusted tofu tossed in a sticky ginger-garlic tamari glaze over jasmine rice with steamed edamame and broccoli.",
    cuisine: "Asian",
    category: "Rice Bowls",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Extra firm tofu", amount: "1 block (14 oz) pressed & cubed", category: "protein" },
      { name: "Cornstarch", amount: "3 tbsp", category: "pantry" },
      { name: "Jasmine rice", amount: "2 cups cooked", category: "grains" },
      { name: "Broccoli florets", amount: "3 cups steamed", category: "produce" },
      { name: "Edamame (shelled)", amount: "1 cup", category: "protein" },
      { name: "Tamari / Soy sauce", amount: "3 tbsp", category: "pantry" },
      { name: "Toasted sesame oil", amount: "1 tbsp", category: "pantry" },
      { name: "Maple syrup", amount: "2 tbsp", category: "pantry" },
      { name: "Fresh ginger & garlic", amount: "1 tbsp each minced", category: "produce" },
      { name: "Toasted sesame seeds", amount: "1 tbsp", category: "spices" }
    ],
    instructions: [
      "Toss pressed tofu cubes with cornstarch and a pinch of salt until evenly coated.",
      "Pan-fry tofu in 2 tbsp oil over medium-high heat for 8-10 minutes, flipping until all sides are crunchy and golden.",
      "In a small bowl, whisk tamari, maple syrup, sesame oil, grated ginger, minced garlic, and 2 tbsp water.",
      "Pour sauce over the crispy tofu in the pan; it will bubble and caramelize into a glossy glaze in 45 seconds.",
      "Assemble bowls with jasmine rice, glazed tofu, steamed broccoli, and edamame. Sprinkle with toasted sesame seeds."
    ],
    allergenTags: ["soy", "sesame"],
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "High-Protein"],
    caloriesApprox: 470,
    proteinApprox: 22,
    carbsApprox: 64,
    fatApprox: 14,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Extra firm tofu & Edamame", substitute: "Chicken breast or Chickpea cubes", note: "For soy-allergic roommates", targetAllergen: "soy" },
      { original: "Toasted sesame oil & seeds", substitute: "Avocado oil + toasted pumpkin seeds", note: "For sesame allergy safety", targetAllergen: "sesame" }
    ],
    crossContactTips: ["Contains soy and sesame. Use clean pans if substituting chicken and olive oil."],
    isPopular: true
  },
  {
    id: "veggie-ramen-miso",
    name: "Rich Shiitake & Miso Vegetable Ramen",
    description: "Deep umami vegetable broth infused with red miso, roasted garlic, sautéed shiitake mushrooms, ramen noodles, bok choy, and scallions.",
    cuisine: "Japanese",
    category: "Soups",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Ramen noodles", amount: "4 portions", category: "grains" },
      { name: "Shiitake mushrooms", amount: "2 cups sliced", category: "produce" },
      { name: "Red / White miso paste", amount: "3 tbsp", category: "pantry" },
      { name: "Vegetable broth", amount: "5 cups", category: "pantry" },
      { name: "Baby bok choy", amount: "4 heads halved", category: "produce" },
      { name: "Garlic & Ginger", amount: "4 cloves, 1 tbsp ginger", category: "produce" },
      { name: "Soy sauce / Tamari", amount: "2 tbsp", category: "pantry" },
      { name: "Toasted sesame oil", amount: "1 tbsp", category: "pantry" },
      { name: "Scallions & Nori sheets", amount: "for garnish", category: "produce" }
    ],
    instructions: [
      "In a deep pot, heat sesame oil. Sauté sliced shiitake mushrooms, minced garlic, and ginger for 4 minutes until mushrooms are browned.",
      "Pour in vegetable broth and tamari. Bring to a simmer for 10 minutes.",
      "Take 1/2 cup hot broth in a small bowl, whisk in the miso paste until completely dissolved, then pour back into the pot. (Do not boil miso to preserve delicate flavors).",
      "Cook ramen noodles separately in boiling water according to package instructions (approx 3 min). Drain.",
      "Blanch baby bok choy in the simmering ramen broth for 2 minutes.",
      "Divide noodles between large bowls, ladle hot aromatic miso-mushroom broth over noodles, top with bok choy, sliced scallions, and nori sheets."
    ],
    allergenTags: ["wheat_gluten", "soy", "sesame", "mushrooms"],
    dietaryTags: ["Vegetarian", "Vegan", "Dairy-Free"],
    caloriesApprox: 460,
    proteinApprox: 16,
    carbsApprox: 72,
    fatApprox: 12,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Shiitake mushrooms", substitute: "Sliced zucchini and roasted sweet potato slices", note: "Crucial swap if roommate dislikes mushrooms", targetAllergen: "mushrooms" },
      { original: "Ramen noodles", substitute: "Gluten-free 100% millet & brown rice ramen noodles", note: "Gluten-free option", targetAllergen: "wheat_gluten" },
      { original: "Red miso paste & Soy sauce", substitute: "Chickpea miso + Coconut aminos", note: "Soy-free ramen broth base", targetAllergen: "soy" }
    ],
    crossContactTips: ["Contains mushrooms, soy, gluten, and sesame."],
    isPopular: false
  },

  // 5. Mediterranean & Healthy
  {
    id: "mediterranean-quinoa-salad",
    name: "Sunshine Mediterranean Quinoa Bowl",
    description: "Fluffy quinoa tossed with crisp English cucumbers, kalamata olives, cherry tomatoes, crumbled feta, chickpeas, and lemon-oregano vinaigrette.",
    cuisine: "Mediterranean",
    category: "Healthy",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Quinoa (dry)", amount: "1.5 cups (makes 4 cups cooked)", category: "grains" },
      { name: "Chickpeas (canned)", amount: "1 can (15 oz) rinsed", category: "protein" },
      { name: "English cucumber", amount: "1 diced", category: "produce" },
      { name: "Cherry tomatoes", amount: "1.5 cups halved", category: "produce" },
      { name: "Kalamata olives", amount: "1/2 cup pitted & sliced", category: "pantry" },
      { name: "Feta cheese", amount: "1/2 cup crumbled", category: "dairy" },
      { name: "Red onion", amount: "1/4 cup finely diced", category: "produce" },
      { name: "Fresh parsley & mint", amount: "1/2 cup chopped", category: "produce" },
      { name: "Extra virgin olive oil", amount: "3 tbsp", category: "pantry" },
      { name: "Lemon juice", amount: "3 tbsp fresh", category: "produce" },
      { name: "Dried oregano", amount: "1 tsp", category: "spices" }
    ],
    instructions: [
      "Rinse quinoa under cold water. Combine with 3 cups water in a pot, bring to a boil, cover, reduce heat to low and cook for 15 minutes. Fluff with a fork and let cool.",
      "In a small jar, shake olive oil, lemon juice, dried oregano, salt, and black pepper.",
      "In a large serving bowl, combine cooked cooled quinoa, rinsed chickpeas, diced cucumber, cherry tomatoes, kalamata olives, red onion, and fresh herbs.",
      "Pour lemon-oregano dressing over the salad and toss gently.",
      "Top with crumbled feta cheese right before serving. Keeps crisp for 4 days in the fridge."
    ],
    allergenTags: ["dairy"],
    dietaryTags: ["Vegetarian", "Gluten-Free", "High-Protein", "Nut-Free"],
    caloriesApprox: 430,
    proteinApprox: 16,
    carbsApprox: 54,
    fatApprox: 18,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Feta cheese", substitute: "Almond-milk feta OR Marinated kalamata olives with avocado", note: "Omitting feta makes this 100% dairy-free and vegan", targetAllergen: "dairy" }
    ],
    crossContactTips: ["Naturally gluten-free, peanut-free, egg-free, soy-free. Leave feta on the side for dairy-sensitive housemates."],
    isPopular: true
  },
  {
    id: "lemon-herb-grilled-salmon",
    name: "Lemon Herb Wild Salmon & Asparagus",
    description: "Pan-seared Atlantic salmon fillets seasoned with fresh dill, garlic, and lemon butter alongside roasted tender asparagus spears.",
    cuisine: "Mediterranean",
    category: "Healthy",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Salmon fillets", amount: "4 (6 oz each)", category: "protein" },
      { name: "Fresh asparagus", amount: "1 lb trimmed", category: "produce" },
      { name: "Butter / Olive oil", amount: "2 tbsp", category: "dairy" },
      { name: "Garlic cloves", amount: "3 minced", category: "produce" },
      { name: "Fresh dill", amount: "2 tbsp chopped", category: "produce" },
      { name: "Lemon", amount: "1 sliced + 1 juiced", category: "produce" },
      { name: "Sea salt & cracked black pepper", amount: "1 tsp each", category: "spices" }
    ],
    instructions: [
      "Pat salmon fillets dry with paper towels. Season generously with salt, pepper, and fresh dill.",
      "Heat 1 tbsp olive oil in a wide stainless steel or nonstick skillet over medium-high heat.",
      "Place salmon skin-side up and sear undisturbed for 4-5 minutes until a golden crust forms.",
      "Flip salmon, add butter (or olive oil), minced garlic, and lemon slices to the pan. Baste salmon with the garlic-lemon pan juices for 3-4 minutes until cooked to medium.",
      "In a second pan or on a baking sheet, toss asparagus with olive oil and roast at 400°F for 10 minutes until tender-crisp.",
      "Serve salmon fillets warm over asparagus with a squeeze of fresh lemon juice."
    ],
    allergenTags: ["fish", "dairy"],
    dietaryTags: ["Gluten-Free", "High-Protein", "Low-Carb", "Keto-Friendly", "Nut-Free"],
    caloriesApprox: 490,
    proteinApprox: 44,
    carbsApprox: 8,
    fatApprox: 31,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Salmon fillets", substitute: "Chicken breast cutlets OR Marinated portobello caps", note: "CRITICAL: For fish-allergic or vegetarian roommates", targetAllergen: "fish" },
      { original: "Butter", substitute: "Pure extra virgin olive oil", note: "Keeps the dish dairy-free", targetAllergen: "dairy" }
    ],
    crossContactTips: ["🚨 HIGH ALLERGY ALERT: Contains fish. Do not use fish-seared pan or spatulas for fish-allergic roommates."],
    isPopular: false
  },

  // 6. Comfort Food & One-Pot
  {
    id: "loaded-veggie-chili",
    name: "Hearty Three-Bean Campfire Chili",
    description: "Thick, smoky comfort chili loaded with black beans, kidney beans, pinto beans, sweet corn, fire-roasted peppers, and dark cocoa.",
    cuisine: "American",
    category: "Comfort Food",
    prepTime: 15,
    cookTime: 35,
    servings: 6,
    difficulty: "Easy",
    ingredients: [
      { name: "Black beans (canned)", amount: "2 cans (30 oz)", category: "protein" },
      { name: "Kidney beans (canned)", amount: "2 cans (30 oz)", category: "protein" },
      { name: "Pinto beans (canned)", amount: "1 can (15 oz)", category: "protein" },
      { name: "Crushed fire roasted tomatoes", amount: "2 cans (28 oz each)", category: "produce" },
      { name: "Bell peppers & Onion", amount: "2 bell peppers, 1 onion", category: "produce" },
      { name: "Garlic cloves", amount: "4 minced", category: "produce" },
      { name: "Chili powder & Cumin", amount: "2 tbsp chili, 1 tbsp cumin", category: "spices" },
      { name: "Smoked paprika & Oregano", amount: "1 tsp each", category: "spices" },
      { name: "Unsweetened cocoa powder", amount: "1 tsp secret ingredient", category: "spices" },
      { name: "Vegetable broth", amount: "2 cups", category: "pantry" }
    ],
    instructions: [
      "In a large Dutch oven or chili pot, heat 2 tbsp olive oil. Sauté diced onions and bell peppers for 6 minutes until tender.",
      "Add minced garlic, chili powder, cumin, smoked paprika, oregano, and cocoa powder. Stir constantly for 1 minute.",
      "Pour in crushed fire-roasted tomatoes, vegetable broth, and all drained beans.",
      "Bring to a boil, then reduce heat to low, cover with lid slightly ajar, and simmer for 30 minutes, stirring occasionally.",
      "Taste and adjust seasoning with sea salt and a splash of apple cider vinegar.",
      "Serve hot in bowls with tortilla chips, diced avocado, and green onions."
    ],
    allergenTags: [],
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "One-Pot"],
    caloriesApprox: 390,
    proteinApprox: 19,
    carbsApprox: 68,
    fatApprox: 5,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Beans only", substitute: "Add 1 lb lean ground beef or turkey", note: "Brown meat before adding aromatics if non-veg option desired" }
    ],
    crossContactTips: ["Naturally free of all top 9 allergens."],
    isPopular: true
  },
  {
    id: "classic-shakshuka",
    name: "Spiced Mediterranean Shakshuka",
    description: "Eggs poached in a spiced, bubbling sauce of crushed San Marzano tomatoes, roasted bell peppers, cumin, smoked paprika, and cilantro.",
    cuisine: "Mediterranean",
    category: "Breakfast",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Eggs", amount: "4-6 large", category: "protein" },
      { name: "Crushed tomatoes", amount: "1 can (28 oz)", category: "produce" },
      { name: "Red bell pepper", amount: "1 large diced", category: "produce" },
      { name: "Yellow onion", amount: "1 medium diced", category: "produce" },
      { name: "Garlic cloves", amount: "4 minced", category: "produce" },
      { name: "Ground cumin & smoked paprika", amount: "1 tsp each", category: "spices" },
      { name: "Cayenne pepper", amount: "1/4 tsp", category: "spices" },
      { name: "Crumbled feta (optional)", amount: "1/4 cup", category: "dairy" },
      { name: "Fresh cilantro / parsley", amount: "1/4 cup chopped", category: "produce" },
      { name: "Warm pita bread", amount: "for dipping", category: "grains" }
    ],
    instructions: [
      "In a wide skillet, heat olive oil over medium. Sauté diced onion and red bell pepper for 6 minutes until soft.",
      "Add garlic, cumin, smoked paprika, and cayenne; cook 1 minute until fragrant.",
      "Pour in crushed tomatoes, season with salt, and simmer uncovered for 10 minutes until sauce thickens.",
      "Use the back of a large spoon to make 4-6 small wells in the sauce. Crack an egg directly into each well.",
      "Cover skillet with a lid and cook on low heat for 5-8 minutes until egg whites are set but yolks remain runny.",
      "Garnish with fresh cilantro, optional crumbled feta, and serve straight from the pan with warm pita."
    ],
    allergenTags: ["eggs", "wheat_gluten", "dairy"],
    dietaryTags: ["Vegetarian", "High-Protein", "One-Pot"],
    caloriesApprox: 360,
    proteinApprox: 18,
    carbsApprox: 32,
    fatApprox: 17,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Eggs", substitute: "Silken tofu slabs or Canned chickpeas", note: "Simmer tofu slabs in tomato sauce for egg-free/vegan version", targetAllergen: "eggs" },
      { original: "Warm pita bread", substitute: "Gluten-free flatbread or Corn tortillas", note: "Gluten-free dipping alternative", targetAllergen: "wheat_gluten" },
      { original: "Crumbled feta", substitute: "Omit or use plant-based feta", note: "For dairy-free diners", targetAllergen: "dairy" }
    ],
    crossContactTips: ["Contains eggs. Tofu swap can be cooked in a separate mini skillet."],
    isPopular: true
  },
  {
    id: "peanut-butter-banana-overnight-oats",
    name: "Creamy Peanut Butter & Banana Overnight Oats",
    description: "Rolled oats soaked in oat milk with creamy peanut butter, chia seeds, pure maple syrup, sliced bananas, and dark chocolate chips.",
    cuisine: "American",
    category: "Breakfast",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Rolled oats (certified GF)", amount: "1 cup", category: "grains" },
      { name: "Oat milk / Almond milk", amount: "1.25 cups", category: "dairy" },
      { name: "Creamy peanut butter", amount: "3 tbsp", category: "pantry" },
      { name: "Chia seeds", amount: "1 tbsp", category: "pantry" },
      { name: "Pure maple syrup", amount: "2 tbsp", category: "pantry" },
      { name: "Ripe banana", amount: "1 sliced", category: "produce" },
      { name: "Dark chocolate chips", amount: "2 tbsp (dairy-free)", category: "pantry" }
    ],
    instructions: [
      "In a glass mason jar or bowl, whisk together oat milk, peanut butter, and maple syrup until combined.",
      "Stir in rolled oats and chia seeds until fully submerged.",
      "Seal jar and refrigerate overnight (or for at least 4 hours) to allow oats to thicken into a creamy pudding.",
      "In the morning, top with freshly sliced banana and dairy-free chocolate chips. Enjoy chilled."
    ],
    allergenTags: ["peanuts"],
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Quick Meals"],
    caloriesApprox: 450,
    proteinApprox: 14,
    carbsApprox: 62,
    fatApprox: 18,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Creamy peanut butter", substitute: "Sunflower seed butter (SunButter) OR Tahini", note: "CRITICAL: Direct 1:1 swap for peanut-allergic households", targetAllergen: "peanuts" }
    ],
    crossContactTips: ["🚨 ALLERGEN ALERT: Contains peanut butter. Always label individual jars in shared refrigerators!"],
    isPopular: false
  },
  {
    id: "lemon-garlic-chicken-pasta",
    name: "Lemon Garlic Herb Chicken Penne",
    description: "Tender seasoned chicken breast strips tossed with al dente penne, baby spinach, sun-dried tomatoes, garlic, and extra virgin olive oil.",
    cuisine: "Italian",
    category: "Quick Meals",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Penne pasta", amount: "12 oz (340g)", category: "grains" },
      { name: "Chicken breast", amount: "1 lb diced", category: "protein" },
      { name: "Sun-dried tomatoes", amount: "1/2 cup sliced", category: "pantry" },
      { name: "Baby spinach", amount: "3 cups", category: "produce" },
      { name: "Garlic cloves", amount: "5 minced", category: "produce" },
      { name: "Lemon juice & zest", amount: "from 1 lemon", category: "produce" },
      { name: "Extra virgin olive oil", amount: "3 tbsp", category: "pantry" },
      { name: "Italian seasoning", amount: "1 tsp", category: "spices" }
    ],
    instructions: [
      "Cook penne pasta in salted boiling water until al dente. Drain and set aside.",
      "In a large skillet, heat olive oil over medium-high heat. Season diced chicken with Italian seasoning, salt, and pepper.",
      "Sear chicken for 6-7 minutes until golden brown and cooked through.",
      "Add minced garlic and sun-dried tomatoes; cook for 1 minute until fragrant.",
      "Add baby spinach and toss until wilted.",
      "Stir in cooked penne, lemon zest, lemon juice, and a generous drizzle of olive oil. Toss well and serve warm."
    ],
    allergenTags: ["wheat_gluten"],
    dietaryTags: ["Dairy-Free", "High-Protein", "Nut-Free", "Quick Meals"],
    caloriesApprox: 520,
    proteinApprox: 38,
    carbsApprox: 58,
    fatApprox: 14,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Penne pasta", substitute: "Gluten-free brown rice penne or Chickpea penne", note: "Gluten-free alternative", targetAllergen: "wheat_gluten" },
      { original: "Chicken breast", substitute: "Canned chickpeas or Extra firm tofu", note: "Vegetarian alternative", targetAllergen: "meat" }
    ],
    crossContactTips: ["Contains wheat. Easy to adapt to gluten-free with dedicated pasta pot."],
    isPopular: true
  },
  {
    id: "veggie-fried-rice",
    name: "Classic 10-Minute Rainbow Fried Rice",
    description: "Sizzling jasmine rice stir-fried with scrambled eggs, green peas, carrots, scallions, garlic, and tamari soy sauce.",
    cuisine: "Asian",
    category: "Quick Meals",
    prepTime: 10,
    cookTime: 10,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Day-old cooked jasmine rice", amount: "4 cups cold", category: "grains" },
      { name: "Eggs", amount: "3 beaten", category: "protein" },
      { name: "Frozen peas & carrots", amount: "1.5 cups", category: "frozen" },
      { name: "Scallions", amount: "4 stalks chopped", category: "produce" },
      { name: "Garlic cloves", amount: "3 minced", category: "produce" },
      { name: "Tamari / Soy sauce", amount: "3 tbsp", category: "pantry" },
      { name: "Sesame oil", amount: "1 tbsp", category: "pantry" },
      { name: "Vegetable oil", amount: "2 tbsp", category: "pantry" }
    ],
    instructions: [
      "Heat 1 tbsp vegetable oil in a hot wok. Pour in beaten eggs and scramble until softly set. Remove eggs and set aside.",
      "Add remaining oil to the wok over high heat. Sauté minced garlic and white parts of scallions for 30 seconds.",
      "Add cold day-old rice, breaking up any clumps with a spatula. Fry on high heat for 3 minutes until grains are toasted.",
      "Toss in frozen peas and carrots, drizzling tamari and sesame oil all around the edge of the wok.",
      "Stir-fry vigorously for 2 minutes. Fold back in scrambled eggs and green scallion greens.",
      "Serve hot with sriracha or chili oil."
    ],
    allergenTags: ["eggs", "soy", "sesame"],
    dietaryTags: ["Vegetarian", "Gluten-Free", "Quick Meals", "Nut-Free"],
    caloriesApprox: 380,
    proteinApprox: 13,
    carbsApprox: 58,
    fatApprox: 11,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Eggs", substitute: "Crumbled firm tofu with a pinch of turmeric", note: "Egg-free vegan scramble", targetAllergen: "eggs" },
      { original: "Soy sauce & Sesame oil", substitute: "Coconut aminos + avocado oil", note: "Soy-free and sesame-free version", targetAllergen: "soy" }
    ],
    crossContactTips: ["Contains eggs, soy, and sesame."],
    isPopular: true
  },
  // 13. Additional Popular Household Dishes
  {
    id: "thai-coconut-green-curry",
    name: "Thai Green Coconut & Tofu Curry",
    description: "Fragrant lemongrass and green chili coconut curry simmered with tender zucchini, bamboo shoots, and crisp pan-seared tofu.",
    cuisine: "Thai",
    category: "Asian",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Green curry paste", amount: "3 tbsp", category: "pantry" },
      { name: "Coconut milk", amount: "2 cans (27 oz)", category: "pantry" },
      { name: "Extra firm tofu", amount: "14 oz cubed", category: "protein" },
      { name: "Zucchini & Bell pepper", amount: "1 zucchini, 1 red pepper", category: "produce" },
      { name: "Bamboo shoots", amount: "1 can drained", category: "pantry" },
      { name: "Thai basil leaves", amount: "1 cup fresh", category: "produce" },
      { name: "Tamari / Soy sauce", amount: "2 tbsp", category: "pantry" },
      { name: "Jasmine rice", amount: "2 cups cooked", category: "grains" }
    ],
    instructions: [
      "In a wok or pot, simmer 1/2 cup coconut milk with green curry paste until fragrant and oil separates.",
      "Add tofu cubes and cook for 3 minutes to infuse with curry paste.",
      "Pour in remaining coconut milk, sliced zucchini, red pepper, and bamboo shoots.",
      "Simmer for 10 minutes until vegetables are tender.",
      "Remove from heat, stir in tamari and fold in fresh Thai basil leaves. Serve over jasmine rice."
    ],
    allergenTags: ["soy"],
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free"],
    caloriesApprox: 490,
    proteinApprox: 18,
    carbsApprox: 48,
    fatApprox: 28,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Tofu", substitute: "Sliced chicken breast or Chickpeas", note: "Soy-free protein alternative", targetAllergen: "soy" }
    ],
    crossContactTips: ["Naturally gluten-free and dairy-free."],
    isPopular: true
  },
  {
    id: "sheet-pan-fajitas",
    name: "Crispy Sheet-Pan Chicken Fajitas",
    description: "Sizzling spiced chicken breast strips roasted with rainbow bell peppers and red onions, served with warm tortillas, lime, and salsa.",
    cuisine: "Mexican",
    category: "One-Pot",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Chicken breast", amount: "1.5 lbs sliced", category: "protein" },
      { name: "Bell peppers (red, yellow, green)", amount: "3 sliced", category: "produce" },
      { name: "Red onion", amount: "1 large sliced", category: "produce" },
      { name: "Fajita spice mix", amount: "2 tbsp (cumin, chili, garlic)", category: "spices" },
      { name: "Olive oil", amount: "2 tbsp", category: "pantry" },
      { name: "Corn or flour tortillas", amount: "8 warm", category: "grains" },
      { name: "Fresh lime & salsa", amount: "for serving", category: "produce" }
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Toss sliced chicken, bell peppers, and red onions with olive oil and fajita seasoning on a large baking sheet.",
      "Spread into a single layer and roast for 20 minutes until chicken is cooked through and peppers are slightly charred.",
      "Squeeze fresh lime juice over the pan.",
      "Serve family-style with warm tortillas and salsa."
    ],
    allergenTags: [],
    dietaryTags: ["Gluten-Free", "Dairy-Free", "High-Protein", "Nut-Free", "One-Pot"],
    caloriesApprox: 420,
    proteinApprox: 38,
    carbsApprox: 36,
    fatApprox: 14,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Chicken breast", substitute: "Portobello mushroom strips or Firm tofu", note: "Vegetarian fajitas", targetAllergen: "meat" }
    ],
    crossContactTips: ["Naturally free of major allergens when using 100% corn tortillas."],
    isPopular: true
  },
  {
    id: "butternut-squash-soup",
    name: "Velvety Roasted Butternut Squash Soup",
    description: "Sweet caramelized butternut squash blended with roasted apples, garlic, ginger, coconut cream, and toasted pumpkin seeds.",
    cuisine: "American",
    category: "Soups",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Butternut squash", amount: "1 large peeled & cubed (4 cups)", category: "produce" },
      { name: "Honeycrisp apple", amount: "1 peeled & chopped", category: "produce" },
      { name: "Vegetable broth", amount: "3 cups", category: "pantry" },
      { name: "Coconut cream", amount: "1/2 cup", category: "pantry" },
      { name: "Garlic & Ginger", amount: "3 cloves, 1 tbsp ginger", category: "produce" },
      { name: "Nutmeg & Cinnamon", amount: "1/4 tsp each", category: "spices" },
      { name: "Toasted pumpkin seeds", amount: "1/4 cup for garnish", category: "pantry" }
    ],
    instructions: [
      "Roast cubed squash and apple with olive oil at 400°F for 25 minutes until caramelized and tender.",
      "In a soup pot, sauté minced garlic and ginger in olive oil for 1 minute.",
      "Add roasted squash, apple, vegetable broth, nutmeg, and cinnamon. Simmer for 10 minutes.",
      "Blend using an immersion blender until silky smooth.",
      "Stir in coconut cream, season with salt and white pepper.",
      "Serve warm topped with toasted crunchy pumpkin seeds."
    ],
    allergenTags: [],
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "One-Pot"],
    caloriesApprox: 290,
    proteinApprox: 5,
    carbsApprox: 48,
    fatApprox: 11,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [],
    crossContactTips: ["Completely free of all top 9 allergens."],
    isPopular: false
  },
  {
    id: "lentil-bolognese-pasta",
    name: "Rich Umami French Green Lentil Bolognese",
    description: "Slow-simmered green lentils with finely diced carrots, celery, crushed tomatoes, red wine reduction, and basil over rigatoni.",
    cuisine: "Italian",
    category: "Italian",
    prepTime: 15,
    cookTime: 35,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Brown or green lentils (dry)", amount: "1 cup rinsed", category: "grains" },
      { name: "Rigatoni or Tagliatelle pasta", amount: "12 oz (340g)", category: "grains" },
      { name: "Crushed San Marzano tomatoes", amount: "1 can (28 oz)", category: "produce" },
      { name: "Carrot, Celery & Onion (mirepoix)", amount: "1 cup finely minced", category: "produce" },
      { name: "Garlic cloves", amount: "4 minced", category: "produce" },
      { name: "Tomato paste", amount: "2 tbsp", category: "pantry" },
      { name: "Vegetable broth", amount: "2 cups", category: "pantry" },
      { name: "Dried oregano & fresh basil", amount: "1 tsp oregano, 1/4 cup basil", category: "spices" }
    ],
    instructions: [
      "In a Dutch oven, sauté finely minced mirepoix (onion, carrot, celery) in 2 tbsp olive oil for 8 minutes.",
      "Add garlic and tomato paste; cook for 2 minutes to caramelize.",
      "Add rinsed lentils, crushed tomatoes, vegetable broth, and oregano.",
      "Bring to a boil, reduce to low simmer, cover and cook for 30 minutes until lentils are tender and sauce is thick and hearty.",
      "Cook pasta in salted water until al dente. Drain.",
      "Toss pasta directly with hot lentil bolognese and fresh basil."
    ],
    allergenTags: ["wheat_gluten"],
    dietaryTags: ["Vegetarian", "Vegan", "Dairy-Free", "Nut-Free", "High-Protein"],
    caloriesApprox: 490,
    proteinApprox: 22,
    carbsApprox: 86,
    fatApprox: 6,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Rigatoni pasta", substitute: "Gluten-free brown rice or chickpea pasta", note: "Gluten-free swap", targetAllergen: "wheat_gluten" }
    ],
    crossContactTips: ["Naturally dairy-free, nut-free, egg-free, and soy-free."],
    isPopular: true
  },
  {
    id: "teriyaki-salmon-rice-bowl",
    name: "Glazed Wild Teriyaki Salmon & Edamame Bowl",
    description: "Pan-crisped salmon fillets brushed with a glossy homemade teriyaki reduction over sushi rice with cucumbers, edamame, and sesame.",
    cuisine: "Japanese",
    category: "Rice Bowls",
    prepTime: 15,
    cookTime: 12,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Salmon fillets", amount: "4 (5 oz each)", category: "protein" },
      { name: "Tamari / Soy sauce", amount: "1/4 cup", category: "pantry" },
      { name: "Maple syrup / Brown sugar", amount: "2 tbsp", category: "pantry" },
      { name: "Fresh ginger & garlic", amount: "1 tsp each grated", category: "produce" },
      { name: "Sushi or Jasmine rice", amount: "2 cups cooked", category: "grains" },
      { name: "Shelled edamame", amount: "1 cup steamed", category: "protein" },
      { name: "Cucumber & Scallions", amount: "1 cucumber sliced, 2 scallions", category: "produce" },
      { name: "Toasted sesame seeds", amount: "1 tbsp", category: "spices" }
    ],
    instructions: [
      "Whisk tamari, maple syrup, grated ginger, minced garlic, and 2 tbsp water in a small pot. Simmer 3 minutes until syrupy.",
      "Sear salmon fillets in a nonstick skillet with olive oil for 4 minutes skin-side down, flip and brush generously with teriyaki glaze.",
      "Cook for 3 more minutes until glazed and flaky.",
      "Assemble bowls with warm sushi rice, sliced cucumber, steamed edamame, and glazed salmon fillet.",
      "Drizzle extra teriyaki sauce on top and garnish with sesame seeds and scallions."
    ],
    allergenTags: ["fish", "soy", "sesame"],
    dietaryTags: ["Gluten-Free", "Dairy-Free", "High-Protein"],
    caloriesApprox: 540,
    proteinApprox: 41,
    carbsApprox: 56,
    fatApprox: 18,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Salmon fillets", substitute: "Crispy pan-fried tofu steaks or Chicken breast", note: "For fish allergy safety", targetAllergen: "fish" },
      { original: "Soy sauce & Edamame", substitute: "Coconut aminos + Steamed broccoli", note: "Soy-free swap", targetAllergen: "soy" }
    ],
    crossContactTips: ["🚨 HIGH ALLERGY ALERT: Contains fish, soy, and sesame."],
    isPopular: false
  },
  {
    id: "hummus-falafel-wrap",
    name: "Golden Crispy Falafel & Tahini Wrap",
    description: "Crispy herb-packed chickpea falafel patties wrapped in warm lavash with garlic hummus, pickled turnips, crisp lettuce, and lemon tahini.",
    cuisine: "Middle Eastern",
    category: "Quick Meals",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Prepared baked falafel patties", amount: "12 pieces", category: "protein" },
      { name: "Garlic hummus", amount: "1 cup", category: "pantry" },
      { name: "Lavash or pita flatbreads", amount: "4 breads", category: "grains" },
      { name: "Tahini sauce", amount: "1/4 cup", category: "pantry" },
      { name: "Shredded romaine & Tomatoes", amount: "2 cups lettuce, 2 tomatoes", category: "produce" },
      { name: "Pickles / pickled turnips", amount: "1/2 cup", category: "produce" }
    ],
    instructions: [
      "Bake or pan-crisp falafel patties at 375°F for 10 minutes until crunchy.",
      "Warm pita flatbreads on a dry pan for 30 seconds.",
      "Spread generous layer of garlic hummus down the center of each flatbread.",
      "Layer crushed falafel patties, diced tomatoes, crisp romaine, and pickles.",
      "Drizzle with lemon tahini sauce, roll tightly into a wrap, slice in half and serve."
    ],
    allergenTags: ["wheat_gluten", "sesame"],
    dietaryTags: ["Vegetarian", "Vegan", "Dairy-Free"],
    caloriesApprox: 460,
    proteinApprox: 18,
    carbsApprox: 68,
    fatApprox: 15,
    imageUrl: "/meals/salad.jpg",
    substitutions: [
      { original: "Lavash flatbread", substitute: "Gluten-free tortilla or serve as a Salad Bowl", note: "Gluten-free alternative", targetAllergen: "wheat_gluten" },
      { original: "Tahini sauce & Hummus (with sesame)", substitute: "Guacamole or Garlic Toum (sesame-free garlic emulsion)", note: "Sesame-free alternative", targetAllergen: "sesame" }
    ],
    crossContactTips: ["Contains wheat and sesame."],
    isPopular: true
  },
  {
    id: "avocado-toast-poached-egg",
    name: "Artisan Sourdough Avocado Toast with Everything Bagel Spice",
    description: "Thick toasted country sourdough topped with coarse mashed Haas avocado, heirloom cherry tomatoes, microgreens, and a runny poached egg.",
    cuisine: "American",
    category: "Breakfast",
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Artisan sourdough bread", amount: "2 thick slices toasted", category: "grains" },
      { name: "Ripe avocados", amount: "2 mashed", category: "produce" },
      { name: "Eggs", amount: "2 poached or fried", category: "protein" },
      { name: "Heirloom cherry tomatoes", amount: "1/2 cup halved", category: "produce" },
      { name: "Everything bagel seasoning", amount: "1 tbsp", category: "spices" },
      { name: "Extra virgin olive oil & lemon", amount: "1 tsp each", category: "pantry" },
      { name: "Microgreens / chili flakes", amount: "for garnish", category: "produce" }
    ],
    instructions: [
      "Toast sourdough slices until deep golden brown and crunchy.",
      "Coarsely mash avocado with fresh lemon juice, sea salt, and black pepper.",
      "Poach or fry eggs to desired doneness with runny yolk.",
      "Spread thick avocado layer on sourdough, top with poached egg, cherry tomatoes, and microgreens.",
      "Generously sprinkle with Everything bagel seasoning and a drizzle of olive oil."
    ],
    allergenTags: ["wheat_gluten", "eggs", "sesame"],
    dietaryTags: ["Vegetarian", "Quick Meals"],
    caloriesApprox: 410,
    proteinApprox: 16,
    carbsApprox: 38,
    fatApprox: 24,
    imageUrl: "/meals/fried-rice.jpg",
    substitutions: [
      { original: "Sourdough bread", substitute: "Gluten-free artisan bread or Sweet potato toast", note: "Gluten-free swap", targetAllergen: "wheat_gluten" },
      { original: "Eggs", substitute: "Pan-seared smoked tofu or Hemp seeds", note: "Egg-free / vegan topping", targetAllergen: "eggs" },
      { original: "Everything bagel seasoning", substitute: "Cracked black pepper + flaky sea salt + red chili flakes", note: "Sesame-free spice mix", targetAllergen: "sesame" }
    ],
    crossContactTips: ["Contains gluten, eggs, and sesame."],
    isPopular: true
  }
];

