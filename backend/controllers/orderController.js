import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    const totalAmount = cart.products.reduce(
      (acc, item) => acc + item.product.discountedPrice * item.quantity,
      0
    );

    const order = new Order({
      user: userId,
      products: cart.products,
      totalAmount,
      paymentMethod,
      shippingAddress,
      status: "Pending",
    });

    await order.save();

    // Optional: clear cart after placing order
    cart.products = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating order" });
  }
};


export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error fetching orders" });
  }
};
