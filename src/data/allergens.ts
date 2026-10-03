export interface AllergenDefinition {
  id: string;
  name: string;
  category: string;
  icon: string;
  severityDefault: 'allergy' | 'intolerance' | 'dislike';
  aliases: string[]; // Variations, ingredients that contain or derive from this
  crossContactRisks: string[];
  safeAlternatives: string[];
  description: string;
}

export const ALLERGEN_DATABASE: AllergenDefinition[] = [
  {
    id: "peanuts",
    name: "Peanuts",
    category: "Legumes / Nuts",
    icon: "🥜",
    severityDefault: "allergy",
    aliases: [
      "peanut", "peanuts", "groundnut", "groundnuts", "peanut butter", "peanut oil",
      "arachis oil", "beer nuts", "monkey nuts", "valencia peanuts", "peanut flour",
      "mixed nuts containing peanuts", "satay sauce", "mandelonas"
    ],
    crossContactRisks: [
      "Shared frying oil or woks used for Thai/Asian cooking",
      "Shared knives or butter spreaders",
      "Bakery equipment and ice cream scoopers"
    ],
    safeAlternatives: [
      "Sunflower seed butter (SunButter)",
      "Pumpkin seed butter",
      "Roasted soy nuts (if soy-safe)",
      "Tahini"
    ],
    description: "Peanuts are legumes that grow underground. Even trace contact can provoke severe allergic reactions."
  },
  {
    id: "tree_nuts",
    name: "Tree Nuts",
    category: "Nuts",
    icon: "🌰",
    severityDefault: "allergy",
    aliases: [
      "tree nut", "tree nuts", "almond", "almonds", "cashew", "cashews", "walnut", "walnuts",
      "pecan", "pecans", "pistachio", "pistachios", "hazelnut", "hazelnuts", "macadamia",
      "brazil nut", "brazil nuts", "pine nut", "pine nuts", "chestnut", "nutella",
      "marzipan", "praline", "gianduja", "almond milk", "cashew cream", "almond flour"
    ],
    crossContactRisks: [
      "Pesto made on shared blenders/food processors",
      "Salad bars and bakery display cases",
      "Nut-crusted pans or baking sheets"
    ],
    safeAlternatives: [
      "Toasted pumpkin seeds (pepitas)",
      "Sunflower seeds",
      "Rolled oats (for crusts)",
      "Roasted chickpeas"
    ],
    description: "Tree nuts grow on trees and include almonds, walnuts, cashews, and hazelnuts."
  },
  {
    id: "dairy",
    name: "Milk & Dairy",
    category: "Animal Dairy",
    icon: "🥛",
    severityDefault: "intolerance",
    aliases: [
      "milk", "dairy", "cow's milk", "butter", "butterfat", "buttermilk", "cream",
      "heavy cream", "sour cream", "cheese", "cheddar", "mozzarella", "parmesan",
      "ricotta", "feta", "gouda", "brie", "paneer", "ghee", "clarified butter",
      "whey", "whey protein", "casein", "caseinate", "lactose", "curds", "yogurt",
      "custard", "half-and-half", "ice cream", "condensed milk", "evaporated milk"
    ],
    crossContactRisks: [
      "Butter residue in frying pans and griddles",
      "Shared cheese graters or cutting boards",
      "Espresso machine steam wands"
    ],
    safeAlternatives: [
      "Oat milk, Almond milk, Soy milk, or Coconut milk",
      "Plant-based butter (olive oil / avocado oil blend)",
      "Nutritional yeast for savory cheesy depth",
      "Coconut cream for creamy soups and curries"
    ],
    description: "Includes both lactose intolerance (digestive enzyme deficiency) and cow milk protein allergy."
  },
  {
    id: "eggs",
    name: "Eggs",
    category: "Poultry",
    icon: "🥚",
    severityDefault: "allergy",
    aliases: [
      "egg", "eggs", "egg white", "egg yolk", "albumin", "albumen", "globulin",
      "lysozyme", "ovalbumin", "ovomucin", "mayonnaise", "mayo", "hollandaise",
      "meringue", "aioli", "egg noodles", "egg wash", "surimi"
    ],
    crossContactRisks: [
      "Shared breakfast skillets and spatulas",
      "Baking pans and pastry brushes",
      "Whisks and mixing bowls"
    ],
    safeAlternatives: [
      "Flax egg (1 tbsp ground flax + 3 tbsp water)",
      "Chia seed egg or applesauce in baking",
      "Silken tofu for scrambles",
      "Aquafaba (chickpea liquid) for whipping"
    ],
    description: "Egg whites and yolks contain proteins that can trigger immune responses. Common binder in baking and sauces."
  },
  {
    id: "wheat_gluten",
    name: "Wheat & Gluten",
    category: "Grains",
    icon: "🌾",
    severityDefault: "allergy",
    aliases: [
      "wheat", "gluten", "flour", "all-purpose flour", "bread flour", "wheat flour",
      "durum", "semolina", "spelt", "farro", "kamut", "barley", "rye", "malt",
      "malt extract", "brewer's yeast", "bulgur", "couscous", "seitan", "wheat berries",
      "breadcrumbs", "panko", "wheat pasta", "soy sauce (traditional brewed)"
    ],
    crossContactRisks: [
      "Shared toasters and crumb trays",
      "Shared pasta boiling water and colanders",
      "Airborne flour in kitchen during baking"
    ],
    safeAlternatives: [
      "Rice noodles, Brown rice pasta, or Chickpea pasta",
      "Gluten-free flour blend / 1-to-1 baking flour",
      "Tamari (certified gluten-free soy sauce)",
      "Quinoa, Polenta, Corn tortillas"
    ],
    description: "Wheat allergy and Celiac disease require strict avoidance of gluten-containing grains."
  },
  {
    id: "soy",
    name: "Soybeans & Soy",
    category: "Legumes",
    icon: "🌱",
    severityDefault: "allergy",
    aliases: [
      "soy", "soya", "soybean", "soybeans", "tofu", "tempeh", "edamame", "miso",
      "soy sauce", "shoyu", "tamari", "soy lecithin", "soy protein isolate",
      "textured vegetable protein", "tvp", "hydrolyzed soy protein", "natto"
    ],
    crossContactRisks: [
      "Woks seasoned with soy sauce",
      "Shared sushi prep mats",
      "Asian marinades and shared dipping bowls"
    ],
    safeAlternatives: [
      "Coconut aminos (soy-free savory seasoning)",
      "Chickpea miso",
      "Hemp or pea protein instead of soy protein",
      "Extra-firm chickpea tofu (Burmese tofu)"
    ],
    description: "Soy is a common legume used widely as protein, emulsifier, and seasoning base."
  },
  {
    id: "shellfish",
    name: "Shellfish",
    category: "Seafood",
    icon: "🦐",
    severityDefault: "allergy",
    aliases: [
      "shellfish", "crustacean", "mollusk", "shrimp", "prawn", "prawns", "crab",
      "crabmeat", "lobster", "crawfish", "crayfish", "clam", "clams", "mussel",
      "mussels", "oyster", "oysters", "scallop", "scallops", "squid", "calamari",
      "octopus", "cuttlefish", "shrimp paste", "oyster sauce", "fish sauce with oyster"
    ],
    crossContactRisks: [
      "Frying baskets used for calamari / shrimp",
      "Shared seafood grills or steamer pots",
      "Fish market prep stations"
    ],
    safeAlternatives: [
      "King oyster mushroom scallops",
      "Hearts of palm 'crab' cakes",
      "Vegetarian stir-fry sauce / mushroom sauce",
      "Firm tofu marinated in kelp broth"
    ],
    description: "Shellfish allergies often cause rapid and severe reactions. Includes crustaceans and mollusks."
  },
  {
    id: "fish",
    name: "Fish",
    category: "Seafood",
    icon: "🐟",
    severityDefault: "allergy",
    aliases: [
      "fish", "salmon", "tuna", "cod", "halibut", "tilapia", "trout", "snapper",
      "anchovy", "anchovies", "sardine", "sardines", "mackerel", "sea bass",
      "fish sauce", "worcestershire sauce (with anchovies)", "caesar dressing", "dashi (bonito)"
    ],
    crossContactRisks: [
      "Grates and grill marks on barbecue",
      "Shared cutting boards and filleting knives",
      "Stock pots used for fish broth"
    ],
    safeAlternatives: [
      "Marinated tofu or tempeh fillets",
      "Nori / dulse seaweed flakes for ocean flavor",
      "Chickpea 'tuna' salad",
      "Soy-free vegan Worcestershire sauce"
    ],
    description: "Fish allergies can be lifelong and triggered by finned fish species and fish-based sauces."
  },
  {
    id: "sesame",
    name: "Sesame",
    category: "Seeds",
    icon: "🥯",
    severityDefault: "allergy",
    aliases: [
      "sesame", "sesame seed", "sesame seeds", "sesame oil", "toasted sesame oil",
      "tahini", "hummus (containing tahini)", "halva", "gomashio", "benne",
      "sesamol", "sesamum indicum", "za'atar"
    ],
    crossContactRisks: [
      "Burger bun toasters",
      "Shared salad prep counters",
      "Stir-fry pans with residual sesame oil"
    ],
    safeAlternatives: [
      "Sunflower seeds and sunbutter",
      "Pumpkin seed paste",
      "Toasted perilla oil or walnut oil for nutty aroma",
      "Poppy seeds for crunch"
    ],
    description: "Sesame is an official major food allergen found in baked goods, dressings, and Middle Eastern/Asian cuisine."
  },
  {
    id: "mushrooms",
    name: "Mushrooms / Fungi",
    category: "Produce / Fungi",
    icon: "🍄",
    severityDefault: "dislike",
    aliases: [
      "mushroom", "mushrooms", "button mushroom", "cremini", "portobello",
      "shiitake", "oyster mushroom", "porcini", "chanterelle", "enoki",
      "maitake", "truffle", "truffle oil", "mushroom powder", "mushroom broth"
    ],
    crossContactRisks: [
      "Sauté pans used for mixed stir-fries",
      "Pizza sauce or pasta sauces made with mushroom base"
    ],
    safeAlternatives: [
      "Zucchini or roasted eggplant for texture",
      "Caramelized onions for umami depth",
      "Sun-dried tomatoes",
      "Smoked paprika for earthiness"
    ],
    description: "Common preference or intolerance. Can be omitted or swapped for rich umami vegetables."
  },
  {
    id: "nightshades",
    name: "Nightshades (Tomatoes, Peppers, Eggplants)",
    category: "Produce",
    icon: "🍅",
    severityDefault: "intolerance",
    aliases: [
      "nightshade", "nightshades", "tomato", "tomatoes", "tomato paste", "tomato sauce",
      "bell pepper", "capsicum", "chili pepper", "jalapeno", "cayenne", "paprika",
      "eggplant", "aubergine", "potato", "potatoes", "pimento", "goji berries", "tobacco"
    ],
    crossContactRisks: [
      "Shared pasta sauce ladles",
      "Blenders used for salsa or marinara"
    ],
    safeAlternatives: [
      "Nomato sauce (beet, carrot & pumpkin base)",
      "Sweet potatoes / yams",
      "Zucchini and yellow squash",
      "Turmeric and ginger for warmth without chili"
    ],
    description: "Some individuals experience digestive inflammation from solanine in nightshade family plants."
  },
  {
    id: "alliums",
    name: "Alliums (Onion & Garlic)",
    category: "Produce / Aromatics",
    icon: "🧄",
    severityDefault: "intolerance",
    aliases: [
      "garlic", "onion", "onions", "shallot", "shallots", "leek", "leeks", "chives",
      "scallion", "scallions", "green onion", "garlic powder", "onion powder",
      "garlic oil", "allium", "alliums"
    ],
    crossContactRisks: [
      "Shared cutting boards where garlic was minced",
      "Pre-made stock cubes or bouillon"
    ],
    safeAlternatives: [
      "Hing / Asafoetida (in tiny pinches for allium flavor without FODMAPs)",
      "Green tips of scallions only (FODMAP-friendly)",
      "Celery and fennel for aromatic base",
      "Ginger and fresh herbs"
    ],
    description: "FODMAP intolerance and allium sensitivity can cause significant gastric discomfort."
  }
];

export const CUISINES_LIST = [
  "Italian",
  "Mexican",
  "Indian",
  "Asian",
  "Mediterranean",
  "American",
  "Japanese",
  "Thai",
  "Middle Eastern",
  "Healthy",
  "Comfort Food",
  "Breakfast"
];

export const DIETARY_PREFERENCES_LIST = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Gluten-Free",
  "Dairy-Free",
  "High-Protein",
  "Low-Carb",
  "Keto-Friendly",
  "Nut-Free",
  "Halal",
  "Kosher"
];
