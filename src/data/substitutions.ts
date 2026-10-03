export interface SubstitutionMapItem {
  ingredient: string;
  substitute: string;
  ratio: string;
  notes: string;
  targetCategory: string; // e.g. "dairy", "gluten", "peanuts", "eggs", "mushrooms"
  isAllergenFreeTag: string; // e.g. "Dairy-Free", "Nut-Free"
}

export const SUBSTITUTIONS_DATABASE: SubstitutionMapItem[] = [
  // Dairy
  {
    ingredient: "Heavy Cream",
    substitute: "Full-fat canned coconut milk OR cashew cream OR oat cooking cream",
    ratio: "1:1",
    notes: "Coconut milk adds a mild tropical sweetness; oat cooking cream provides neutral richness.",
    targetCategory: "dairy",
    isAllergenFreeTag: "Dairy-Free"
  },
  {
    ingredient: "Butter",
    substitute: "Extra virgin olive oil OR vegan plant butter",
    ratio: "3/4 cup oil for 1 cup butter in cooking; 1:1 for plant butter",
    notes: "Olive oil is ideal for savory pan cooking; plant butter melts identically on toast/pasta.",
    targetCategory: "dairy",
    isAllergenFreeTag: "Dairy-Free"
  },
  {
    ingredient: "Parmesan Cheese",
    substitute: "Nutritional yeast + pulsed sunflower seeds + sea salt",
    ratio: "1:1 by volume",
    notes: "Delivers the sharp, savory umami kick of aged cheese without dairy.",
    targetCategory: "dairy",
    isAllergenFreeTag: "Dairy-Free"
  },
  {
    ingredient: "Cow's Milk",
    substitute: "Unsweetened oat milk OR soy milk OR almond milk",
    ratio: "1:1",
    notes: "Use unsweetened, plain varieties for savory sauces and soups.",
    targetCategory: "dairy",
    isAllergenFreeTag: "Dairy-Free"
  },
  {
    ingredient: "Sour Cream",
    substitute: "Unsweetened coconut yogurt with a splash of lemon juice",
    ratio: "1:1",
    notes: "Provides the same tangy, cool contrast for tacos and baked potatoes.",
    targetCategory: "dairy",
    isAllergenFreeTag: "Dairy-Free"
  },
  {
    ingredient: "Paneer / Halloumi",
    substitute: "Extra firm pressed tofu cubes or seasoned seitan",
    ratio: "1:1",
    notes: "Press tofu well to hold shape when pan-seared or simmered in curries.",
    targetCategory: "dairy",
    isAllergenFreeTag: "Dairy-Free"
  },

  // Nuts / Peanuts
  {
    ingredient: "Peanut Butter",
    substitute: "Sunflower seed butter (SunButter) OR tahini",
    ratio: "1:1",
    notes: "SunButter has an identical creamy mouthfeel and richness in dressings and satay sauce.",
    targetCategory: "peanuts",
    isAllergenFreeTag: "Peanut-Free"
  },
  {
    ingredient: "Crushed Peanuts",
    substitute: "Toasted pumpkin seeds (pepitas) OR toasted sesame seeds (if sesame safe)",
    ratio: "1:1",
    notes: "Gives crunchy texture and toasted savory crunch to Pad Thai and noodle bowls.",
    targetCategory: "peanuts",
    isAllergenFreeTag: "Peanut-Free"
  },
  {
    ingredient: "Cashews / Walnuts",
    substitute: "Roasted pumpkin seeds OR toasted hemp hearts",
    ratio: "1:1",
    notes: "Safe crunch in salads, pestos, and grain bowls.",
    targetCategory: "tree_nuts",
    isAllergenFreeTag: "Nut-Free"
  },

  // Gluten / Wheat
  {
    ingredient: "Wheat Pasta",
    substitute: "Brown rice pasta OR chickpea pasta OR zucchini noodles",
    ratio: "1:1",
    notes: "Chickpea pasta adds extra plant protein; rice pasta holds sauce identically.",
    targetCategory: "wheat_gluten",
    isAllergenFreeTag: "Gluten-Free"
  },
  {
    ingredient: "Soy Sauce",
    substitute: "Tamari (certified GF) OR Coconut Aminos",
    ratio: "1:1 for Tamari; use 1.25x for sweeter Coconut Aminos",
    notes: "Coconut aminos is both soy-free and gluten-free.",
    targetCategory: "wheat_gluten",
    isAllergenFreeTag: "Gluten-Free"
  },
  {
    ingredient: "Breadcrumbs / Panko",
    substitute: "Gluten-free panko OR crushed cornflakes OR ground flax meal",
    ratio: "1:1",
    notes: "Gluten-free panko delivers superior crispiness for baked coatings.",
    targetCategory: "wheat_gluten",
    isAllergenFreeTag: "Gluten-Free"
  },
  {
    ingredient: "Flour (All Purpose / Thickener)",
    substitute: "1-to-1 gluten free baking blend OR cornstarch / arrowroot",
    ratio: "1:1 for GF blend; 1/2 amount if using cornstarch for thickening",
    notes: "Mix cornstarch with cold water first to make a smooth slurry.",
    targetCategory: "wheat_gluten",
    isAllergenFreeTag: "Gluten-Free"
  },

  // Eggs
  {
    ingredient: "Egg (in baking / binding)",
    substitute: "Flax egg (1 tbsp ground flax + 3 tbsp warm water, rest 5 min)",
    ratio: "1 flax egg per 1 whole egg",
    notes: "Excellent binder for veggie patties, meatballs, and baked goods.",
    targetCategory: "eggs",
    isAllergenFreeTag: "Egg-Free"
  },
  {
    ingredient: "Mayonnaise",
    substitute: "Vegan egg-free mayo (aquafaba / canola base) OR mashed avocado",
    ratio: "1:1",
    notes: "Rich and creamy without raw egg yolks.",
    targetCategory: "eggs",
    isAllergenFreeTag: "Egg-Free"
  },

  // Soy
  {
    ingredient: "Tofu",
    substitute: "Chickpea tofu (Shan Burmese tofu) OR paneer (if dairy safe) OR chicken / tempeh",
    ratio: "1:1",
    notes: "Chickpea tofu is soy-free, gluten-free, and firm enough to stir-fry.",
    targetCategory: "soy",
    isAllergenFreeTag: "Soy-Free"
  },

  // Meat / Vegetarian substitutes
  {
    ingredient: "Chicken Breast / Thigh",
    substitute: "Extra firm pressed tofu OR canned drained chickpeas OR oyster mushrooms",
    ratio: "1:1 by volume",
    notes: "Chickpeas absorb marinades easily and provide high plant protein and fiber.",
    targetCategory: "meat",
    isAllergenFreeTag: "Vegetarian"
  },
  {
    ingredient: "Ground Beef",
    substitute: "Cooked brown lentils + finely minced walnuts/mushrooms OR plant-based ground",
    ratio: "1:1",
    notes: "Lentils retain an authentic texture in bolognese, chili, and taco fillings.",
    targetCategory: "meat",
    isAllergenFreeTag: "Vegetarian"
  },

  // Mushrooms
  {
    ingredient: "Mushrooms",
    substitute: "Diced zucchini + caramelized onions + a dash of smoked paprika",
    ratio: "1:1",
    notes: "Replaces the texture and adds savory umami sweetness without fungi.",
    targetCategory: "mushrooms",
    isAllergenFreeTag: "Mushroom-Free"
  }
];
