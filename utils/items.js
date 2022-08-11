// Menu items and their corresponding details
appetizerItems = [
  {
    img: "/assets/images/mushroom.avif",
    id: "A1",
    name: "Stuffed Mushrooms",
    description:
      "Fontina and Parmesan Cheese, Garlic and Herbs in a Wine Sauce",
    price: 9.99,
  },
  {
    img: "/assets/images/zucchini.avif",
    id: "A2",
    name: "Fried Zucchini",
    description:
      "Lightly Breaded and Topped with Parmesan Cheese. Served with Ranch Dressing",
    price: 9.99,
  },
  {
    img: "/assets/images/cauliflower.avif",
    id: "A3",
    name: "Korean Fried Cauliflower",
    description:
      "Crispy Cauliflower Tossed with Sweet and Spicy Sauce, Toasted Sesame Seeds and Green Onion.",
    price: 9.99,
  },
];

mainItems = [
  {
    img: "/assets/images/sandwich.avif",
    id: "M1",
    name: "Grilled Chicken and Avocado Club Sandwich",
    description:
      "Grilled Chicken Breast with Avocado, Bacon, Tomato, Melted Swiss and Herb Mayonnaise",
    price: 15.99,
  },
  {
    img: "/assets/images/pizza.avif",
    id: "M2",
    name: "Spinach and Mushroom Flatbread Pizza",
    description:
      "With Mozzarella, Parmesan, Garlic, Herbs and Extra Virgin Olive Oil",
    price: 15.99,
  },
  {
    img: "/assets/images/salad.avif",
    id: "M3",
    name: "Chinese Chicken Salad",
    description:
      "Chicken Breast, Rice Noodles, Lettuce, Green Onions, Almonds, Crisp Wontons, Bean Sprouts, Orange and Sesame Seeds. Tossed in Our Special Chinese Plum Dressing",
    price: 15.99,
  },
  {
    img: "/assets/images/tacos.avif",
    id: "M4",
    name: "Cauliflower Tacos",
    description:
      "Soft Corn Tortillas with Crispy Fried Cauliflower, Avocado, Onion, Garlic, Chipotle Sauce and Toasted Pepitas. Served with Rice and Beans",
    price: 15.99,
  },
  {
    img: "/assets/images/cacio.avif",
    id: "M5",
    name: "Cacio E Pepe Pasta with Chicken",
    description:
      "Our Not So Traditional Recipe with Spaghetti, Romano and Parmesan Cheese, Arugula and Lots of Freshly Ground Black Pepper",
    price: 15.99,
  },
  {
    img: "/assets/images/rigatoni.avif",
    id: "M6",
    name: "Spicy Rigatoni Vodka",
    description:
      "Rigatoni Pasta, Italian Cherry Tomatoes, Parmesan, Fresh Basil and Pancetta Tossed with Spicy Vodka Sauce",
    price: 15.99,
  },
];

dessertItems = [
  {
    img: "/assets/images/sundae.avif",
    id: "D1",
    name: "Hot Fudge Sundae",
    description:
      "The Best Hot Fudge Anywhere. Topped with Whipped Cream and Almonds",
    price: 12.99,
  },
  {
    img: "/assets/images/cheesecake.avif",
    id: "D2",
    name: "Chocolate Caramelicious Cheesecake Made with Snickers",
    description:
      "Original Cheesecake Swirled with Snickers on a Brownie Crust with Chocolate, Caramel and Peanuts",
    price: 12.99,
  },
  {
    img: "/assets/images/tiramisu.avif",
    id: "D3",
    name: "Tiramisu Cake",
    description:
      "Italian Custard Made with Mascarpone, Whipped Cream, Lady Fingers, Chocolate, Marsala and Coffee Liqueur",
    price: 12.99,
  },
];

menuItems = JSON.stringify({
  appetizerItems: appetizerItems,
  mainItems: mainItems,
  dessertItems: dessertItems,
});

module.exports = menuItems;
