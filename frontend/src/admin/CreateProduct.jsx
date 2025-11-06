import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate()
    const [auth]=useAuth()
    const token = auth.token
    const createdByUserId=auth.userId
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discountPercentage: "",
        quantity: "",
        shipping: true,
        category: "",
        image: "",
        createdBy: createdByUserId
    })

    const handleChange = async (e) => {
        const { type, name, value, checked } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(false)
        try {
            const res = await fetch('http://localhost:8080/api/products/create-product/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
                body: JSON.stringify(formData)
            })
            toast.success("Product Created Successfully")
            navigate('/admin/products')
            setLoading(false)
            setFormData({
                name: "",
                description: "",
                price: "",
                discountPercentage: "",
                quantity: "",
                shipping: true,
                category: "",
                image: "",
                createdBy: createdByUserId||""
            })

        } catch (error) {
            console.log(error);
        }
    }

    // Get All categories
    const getAllCategories = async () => {
        setLoading(true);
        setError(false);

        try {
            const res = await fetch('http://localhost:8080/api/category/categories/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch categories: ${res.status}`);
            }

            const data = await res.json();
            setCategories(data.categories || []); // fallback to empty array
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCategories()
    }, [])
    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-500">Create New Product</h2>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-8 border">

                {/* Product Name */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        required
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-2 h-24"
                    ></textarea>
                </div>

                {/* Price and Discount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Price (₹)</label>
                        <input
                            type="number"
                            value={formData.price}
                            name="price"
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Discount %</label>
                        <input
                            type="number"
                            value={formData.discountPercentage}
                            name="discountPercentage"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>
                </div>

                {/* Quantity and Shipping */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            required
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>
                    <div className="flex items-center gap-3 mt-6">
                        <input
                            type="checkbox"
                            name="shipping"
                            checked={formData.shipping}
                            onChange={handleChange}
                        />
                        <label className="text-gray-700">Requires Shipping?</label>
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Category</label>
                    <select
                        name="category"
                        required
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        disabled={loading}
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map((p) => (
                            <option key={p._id} value={p._id}>{p.categoryName}</option>
                        ))}
                    </select>

                </div>

                {/* Image URL */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Product Image URL</label>
                    <input
                        type="text"
                        name="image"
                        required
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                </div>

                {/* Submit */}
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition duration-200"
                    >
                        {loading ? "Creating..." : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateProduct