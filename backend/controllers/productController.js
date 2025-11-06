import Product from "../models/productModel.js";
import slugify from "slugify";

const createProduct = async (req, res) => {
  try {
    const { name, image, description, price, discountPercentage, quantity, category, createdBy, shipping, sold } = req.body;
    if (!name || !description || !price || !quantity || !category || !createdBy || !image) {
      return res.status(400).send({ error: "All required fields must be filled." });
    }

    const createdProduct = new Product({
      name,
      slug: slugify(name),
      description,
      price,
      discountPercentage,
      quantity,
      shipping,
      category,
      createdBy,
      image
    })

    await createdProduct.save()

    res.send({
      status: true,
      message: "Product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    res.send({
      status: false,
      message: "Error adding in product",
      error
    })
  }
}

// Read / Fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "categoryName") // 🔥 this is the key line
      .populate("createdBy", "name");;
    if (!products || products.length == 0) {
      return res.send({
        status: false,
        message: "Products not found",
      })
    }
    res.send({
      status: true,
      message: "All products are here",
      products,
    });
  } catch (error) {
    res.send({
      status: false,
      message: "Error in getting all products",
      error
    })

  }
}


// Get single product by slug
const getSingleProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({slug:req.params.slug});
  if (!product) {
    return res.send({
      status: false,
      message: "product not find",
    });
  }
res.send({
      status: true,
      message: "product details are here",
      product,
    });
  } catch (error) {
    res.send({
      status: false,
      message: "product details are here",
     error: error.message,
    });
  }
}

// delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete({ _id: id })
    res.send({
      status: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    res.send({
      status: false,
      message: "Error in deleting the product",
      error
    })
  }
}

// update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      image,
      description,
      price,
      discountPercentage,
      quantity,
      category,
      createdBy,
      shipping,
      sold
    } = req.body;

    if (!name || !description || !price || !quantity || !category || !createdBy || !image) {
      return res.status(400).json({
        status: false,
        message: "All required fields must be filled.",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
        description,
        price,
        discountPercentage,
        quantity,
        shipping: shipping ?? false,
        category,
        createdBy,
        image,
        sold: sold ?? 0,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.send({
        status: false,
        message: "Product not found with this ID",
      });
    }

    res.send({
      status: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.send({
      status: false,
      message: "Error in updating the product",
      error: error.message || error,
    });
  }
};


export { createProduct, getAllProducts, deleteProduct, updateProduct, getSingleProductBySlug }