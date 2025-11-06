import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import { NavLink, Outlet } from 'react-router-dom';
import toast from "react-hot-toast";

const AdminProductsPage = () => {
  const url=`${import.meta.env.VITE_BACKEND_URL}`
  const [auth] = useAuth();
  // console.log(auth);
  const token=auth.token;

  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  // const auth=JSON.parse(localStorage.getItem("auth"))

  // Get all products
  const fetchProducts = async () => {
    setLoading(true)
    const res = await fetch(`${url}/api/products/`);
    const data = await res.json();
    if (data.status) setProducts(data.products);
    setLoading(false)
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  // Handle product deletion
  const handleDelete = async (id) => {
    const res = await fetch(`${url}/api/products/delete-product/${id}`, {
      method: 'DELETE',
      headers:{
        Authorization:token
      }
    });
    const data = await res.json();
    toast.success(data.message)
    
    if (data.status) fetchProducts();
    else alert(data.message || 'Failed to delete');
  };




  return (
    <div className="p-6">
      {
        loading ? <p className='text-center text-2xl'>Loading...</p> :



          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-green-700">Manage Products</h1>
              <NavLink to="/admin/create-product">
                <button className="bg-green-600 text-white px-4 py-2 rounded">
                  + Add Product
                </button>
              </NavLink>

            </div>
            <table className="w-full border text-center">
              <thead className="bg-gray-100 text-center">
                <tr className='text-center'>
                  <th className="p-2">Name</th>
                  <th className="p-2">Image</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Stock</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod._id} className="border-t">
                    <td className="p-2">{prod.name}</td>
                    <td className="p-2">
                      <img src={prod.image} className="w-12 h-12 object-cover" alt={prod.name} />
                    </td>
                    <td className="p-2">₹{prod.discountedPrice || prod.price}</td>
                    <td className="p-2">{prod.quantity}</td>
                    <td className="p-2">{prod.category?.categoryName || '-'}</td>
                    <td className="p-2 space-x-2">
                      <NavLink to={`/admin/update-product/${prod.slug}`}>
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded">
                          Edit
                        </button>
                      </NavLink>
                      <button
                        onClick={() => handleDelete(prod._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div>
  );
};

export default AdminProductsPage;
