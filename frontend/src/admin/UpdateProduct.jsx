import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateProduct = () => {
    const { slug, id } = useParams()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const auth = JSON.parse(localStorage.getItem("auth"))
    const token = auth.token
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        discountPercentage: "",
        quantity: "",
        shipping: true,
        category: "",
        image: "",
    })

    const handleChange = (e) => {
        const { name, value, type, select, checkbox } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    // Get categories
    const getAllCategories = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/category/categories/')
            setCategories(res.data.categories)

        } catch (error) {
            console.log(error);
        }
    }
    const getProductBySlug = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/products/product/${slug}`, {
                headers: {
                    Authorization: token
                }
            })
            setProduct(res.data.product)

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `http://localhost:8080/api/products/update-product/${product._id}`,
                product,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );
            navigate('/admin/products')
            toast.success("Product updated successfully")
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductBySlug()
        getAllCategories()
    }, [slug])
    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-500">
                Update Product
            </h2>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white shadow-md rounded-lg p-8 border"
            >
                {/* Product Name */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2 h-24"
                    ></textarea>
                </div>

                {/* Price & Discount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Price (₹)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Discount %
                        </label>
                        <input
                            type="number"
                            name="discountPercentage"
                            value={product.discountPercentage}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>
                </div>

                {/* Quantity & Shipping */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Quantity
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>
                    <div className="flex items-center gap-3 mt-6">
                        <input
                            type="checkbox"
                            name="shipping"
                            checked={product.shipping}
                            onChange={handleChange}
                        />
                        <label className="text-gray-700">Requires Shipping?</label>
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Image */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">
                        Product Image URL
                    </label>
                    <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        required
                        placeholder="https://example.com/image.jpg"
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition duration-200"
                    >
                        {loading ? "Updating..." : "Update Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
