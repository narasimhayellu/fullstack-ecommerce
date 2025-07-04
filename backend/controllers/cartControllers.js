const Cart = require("../model/cartModel");

const saveCart = async (req, res) => {
  const { userId, items } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = new Cart({ userId, items });
      await cart.save();
    }

    res.status(200).json({ message: "Cart saved successfully", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { saveCart, getCart };
