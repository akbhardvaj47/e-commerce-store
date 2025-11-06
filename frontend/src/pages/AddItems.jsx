export default function AddItems() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8">
      <div className="max-w-[1300px] mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Add New Item</h1>

        {/* Form Section */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
            <input
              name="name"
              placeholder="Enter item name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
            <input
              name="price"
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <input
              name="category"
              placeholder="e.g. Electronics"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <input
              name="description"
              placeholder="Brief description"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
            <input
              name="imageUrl"
              placeholder=""
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Add Item
            </button>
          </div>
        </form>

        {/* Item List Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Item List</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Item Card - repeat for multiple items */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition duration-200">
            <img
              src=""
              alt="Sample Product"
              className="w-full h-40 object-contain rounded mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Sample Product</h3>
            <p className="text-gray-600 text-sm mt-1">
              Price: <span className="font-medium text-blue-600">$999</span>
            </p>
            <p className="text-gray-600 text-sm">
              Category: <span className="font-medium">Electronics</span>
            </p>
          </div>

          {/* Duplicate or map items dynamically later */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition duration-200">
            <img
              src=""
              alt="Sample Product"
              className="w-full h-40 object-contain rounded mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Sample Product</h3>
            <p className="text-gray-600 text-sm mt-1">
              Price: <span className="font-medium text-blue-600">$999</span>
            </p>
            <p className="text-gray-600 text-sm">
              Category: <span className="font-medium">Electronics</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
