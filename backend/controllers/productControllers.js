const productModel = require("../model/productModel")

const getProducts = async (req,res)=>{
  
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
}

const getProductsById = async (req,res)=>{
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
}

const postProducts = async (req, res) => {
  try {
    const newProduct = await productModel.create(req.body);
    res.status(201).send(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to add product", details: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const findProduct = await productModel.findById(req.params.id);

    if (!findProduct) {
      return res.status(404).send("Product with given ID not found");
    }

    const updateProductsData = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).send(updateProductsData);
  } catch (error) {
    res.status(500).send("Error updating product: " + error.message);
  }
};


const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).send("Product with given ID not found");
    }

    res.status(200).send({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    res.status(500).send("Error deleting product: " + error.message);
  }
};

module.exports = {getProducts,getProductsById,postProducts,updateProduct,deleteProduct}






// let data = [
//   {
//     "id": 1,
//     "name": "Classic Margherita Pizza",
//     "ingredients": [
//       "Pizza dough",
//       "Tomato sauce",
//       "Fresh mozzarella cheese",
//       "Fresh basil leaves",
//       "Olive oil",
//       "Salt and pepper to taste"
//     ],
//     "instructions": [
//       "Preheat the oven to 475°F (245°C).",
//       "Roll out the pizza dough and spread tomato sauce evenly.",
//       "Top with slices of fresh mozzarella and fresh basil leaves.",
//       "Drizzle with olive oil and season with salt and pepper.",
//       "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
//       "Slice and serve hot."
//     ],
//     "prepTimeMinutes": 20,
//     "cookTimeMinutes": 15,
//     "servings": 4,
//     "difficulty": "Easy",
//     "cuisine": "Italian",
//     "caloriesPerServing": 300,
//     "tags": [
//       "Pizza",
//       "Italian"
//     ],
//     "userId": 166,
//     "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
//     "rating": 4.6,
//     "reviewCount": 98,
//     "mealType": [
//       "Dinner"
//     ]
//   },
//   {
//     "id": 2,
//     "name": "Vegetarian Stir-Fry",
//     "ingredients": [
//       "Tofu, cubed",
//       "Broccoli florets",
//       "Carrots, sliced",
//       "Bell peppers, sliced",
//       "Soy sauce",
//       "Ginger, minced",
//       "Garlic, minced",
//       "Sesame oil",
//       "Cooked rice for serving"
//     ],
//     "instructions": [
//       "In a wok, heat sesame oil over medium-high heat.",
//       "Add minced ginger and garlic, sauté until fragrant.",
//       "Add cubed tofu and stir-fry until golden brown.",
//       "Add broccoli, carrots, and bell peppers. Cook until vegetables are tender-crisp.",
//       "Pour soy sauce over the stir-fry and toss to combine.",
//       "Serve over cooked rice."
//     ],
//     "prepTimeMinutes": 15,
//     "cookTimeMinutes": 20,
//     "servings": 3,
//     "difficulty": "Medium",
//     "cuisine": "Asian",
//     "caloriesPerServing": 250,
//     "tags": [
//       "Vegetarian",
//       "Stir-fry",
//       "Asian"
//     ],
//     "userId": 143,
//     "image": "https://cdn.dummyjson.com/recipe-images/2.webp",
//     "rating": 4.7,
//     "reviewCount": 26,
//     "mealType": [
//       "Lunch"
//     ]
//   }
// ]