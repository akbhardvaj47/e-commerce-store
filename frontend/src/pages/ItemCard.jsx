import { NavLink } from "react-router-dom";


export default function ItemCard({ product }) {
  const { slug, name, image, price, categoryName } = product;
  // console.log(item);
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">

     <NavLink to={`product/${slug}`}>
       <div className="w-full flex flex-col items-center">
        <div className="w-full flex items-center justify-center h-40">
          <img
            src={image}
            alt="Product"
            className="object-contain h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
        {/* Info */}
        <div className="w-full mt-2">
          <h3 className="text-sm font-medium text-gray-800 truncate">
            {name}
          </h3>
          <p className="text-base font-bold text-blue-600">₹{price}</p>
        </div>
      </div>
     </NavLink>
    </div>
  );
}
