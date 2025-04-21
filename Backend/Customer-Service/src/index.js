require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4002;

const customerController = require('./Controller/Customer-ServiceController');

// תוספי אמצע (middlewares)
app.use(express.json());

app.use('/customers', customerController);
const recipes = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black Pepper"],
    instructions: "Boil pasta. Cook pancetta. Mix with eggs and cheese. Combine all and serve."
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    ingredients: ["Chicken", "Yogurt", "Tomato", "Garlic", "Garam Masala"],
    instructions: "Marinate chicken. Grill it. Cook sauce. Combine and simmer."
  },
  {
    id: 3,
    name: "Avocado Toast",
    ingredients: ["Bread", "Avocado", "Lemon", "Chili Flakes", "Salt"],
    instructions: "Toast bread. Mash avocado with lemon. Spread and top with chili flakes."
  }
];

app.get( (req, res) => {
  res.json(recipes);
});

app.listen(port, () => {
  console.log(`Customer-Service is running on port ${port}`);
});
