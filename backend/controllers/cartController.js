import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";


export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity = 1 } = req.body;

    // check if product exists or not in store
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Find or create user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }],
      });
    } else {
      const existingItem = cart.products.find(
        (p) => p.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    return res.json({ success: true, message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    res.json(cart || { products: [] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();

    res.json({ success: true, message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    const item = cart.products.find(p => p.product.toString() === productId);
    if (item) item.quantity = quantity;
    await cart.save();

    res.json({ success: true, message: "Quantity updated", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/cart/:userId
export const getCartByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(200).json({ success: true, count: 0 });
    }

    // total quantity sum krni ho to reduce() use karo
    const totalCount = cart.products.reduce((acc, item) => acc + item.quantity, 0);

    res.status(200).json({
      success: true,
      count: totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
