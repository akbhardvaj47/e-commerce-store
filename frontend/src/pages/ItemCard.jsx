import { NavLink } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function ItemCard({ product }) {
  const { slug, name, image, price, categoryName } = product;

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-pink-400 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">

      {/* Product Image */}
      <NavLink to={`/product/${slug}`} className="w-full">
        <div className="relative w-full h-48 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110"
          />

          {/* Category Tag */}
          {categoryName && (
            <span className="absolute top-2 left-2 bg-pink-100 text-pink-700 text-xs font-semibold px-2 py-1 rounded-full">
              {categoryName}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-3 w-full">
          <h3 className="text-base font-semibold text-gray-800 truncate group-hover:text-pink-600">
            {name}
          </h3>
          <p className="text-lg font-bold text-pink-600 mt-1">₹{price}</p>
        </div>
      </NavLink>

      {/* Hover Action Button */}
      <NavLink
        to={`/product/${slug}`}
        className="absolute bottom-0 left-0 w-full bg-pink-600 text-white py-2 flex items-center justify-center gap-2 text-sm font-medium rounded-b-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ShoppingBag size={16} />
        View Details
      </NavLink>
    </div>
  );
}
