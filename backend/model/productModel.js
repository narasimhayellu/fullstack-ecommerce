const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = Schema({
    name:String,
    ingredients:String,
    instructions:String,
    servings:Number,
    rating:Number,
})

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;

