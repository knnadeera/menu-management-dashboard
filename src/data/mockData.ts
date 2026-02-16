import type { IMenuItem } from "@/types/menu.types";

export const mockMenuItems: IMenuItem[] = [
  {
    id: 1,
    name: "Grilled Salmon",
    category: "Main Courses",
    price: 2800,
    status: "active",
    description:
      "Fresh Atlantic salmon with herb butter and seasonal vegetables",
    image:
      "https://www.thecookierookie.com/wp-content/uploads/2023/05/featured-grilled-salmon-recipe.jpg",
  },
  {
    id: 2,
    name: "Caesar Salad",
    category: "Starters",
    price: 1200,
    status: "active",
    description: "Crisp romaine lettuce with house-made dressing and croutons",
    image:
      "https://media.istockphoto.com/id/1211166166/photo/caesar-salad-with-grilled-chicken-and-croutons-of-bread.jpg?s=612x612&w=0&k=20&c=anNWizfxset3nOpS9zxGU1PCgn6dBwILhqYIED4qxYY=",
  },
  {
    id: 3,
    name: "Truffle Risotto",
    category: "Main Courses",
    price: 3200,
    status: "inactive",
    description: "Creamy arborio rice with black truffle and parmesan",
    image:
      "https://alwaysfromscratch.com/wp-content/uploads/2023/10/Mushroom-truffle-risotto-21.jpg",
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    category: "Desserts",
    price: 1500,
    status: "active",
    description: "Warm chocolate cake with molten center and vanilla ice cream",
    image:
      "https://www.melskitchencafe.com/wp-content/uploads/2023/01/updated-lava-cakes7.jpg",
  },
  {
    id: 5,
    name: "Mojito",
    category: "Beverages",
    price: 950,
    status: "active",
    description: "Classic Cuban cocktail with fresh mint and lime",
    image:
      "https://www.stephiecooks.com/wp-content/uploads/2014/08/tomato-bruschetta-on-platter-hero.jpg",
  },
  {
    id: 6,
    name: "Bruschetta",
    category: "Starters",
    price: 850,
    status: "active",
    description: "Toasted bread topped with tomatoes, basil, and olive oil",
    image:
      "https://noplatelikehome.com/wp-content/uploads/Caprese-Bruschetta-Recipe-copy-scaled.jpg",
  },
  {
    id: 7,
    name: "Beef Tenderloin",
    category: "Main Courses",
    price: 4500,
    status: "inactive",
    description: "Premium cut with red wine reduction and mashed potatoes",
    image:
      "https://playswellwithbutter.com/wp-content/uploads/2023/11/Roasted-Beef-Tenderloin-with-Creamy-Horseradish-Sauce-21.jpg",
  },
  {
    id: 8,
    name: "Fresh Juice",
    category: "Beverages",
    price: 650,
    status: "active",
    description: "Seasonal fresh-pressed fruit juice",
    image:
      "https://laespanolaoliveoil.com/wp-content/uploads/2024/10/5-super-powered-fresh-juice-and-smoothie-recipes.jpg",
  },
];

export const categories = [
  { id: "Starters", name: "Starters" },
  { id: "Main Courses", name: "Main Courses" },
  { id: "Desserts", name: "Desserts" },
  { id: "Beverages", name: "Beverages" },
  { id: "Specials", name: "Specials" },
];
