export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8 xs:px-6 md:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 text-center xs:text-start">
          {/* Logo + Description */}
          <div>
            <h2 className="text-xl font-bold text-gray-800">AkShoppe</h2>
            <p className="text-sm text-gray-600 mt-2">
              Your one-stop shop for electronics, fashion, books, and more.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Electronics</a></li>
              <li><a href="#" className="hover:text-blue-600">Fashion</a></li>
              <li><a href="#" className="hover:text-blue-600">Books</a></li>
              <li><a href="#" className="hover:text-blue-600">Toys</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Returns</a></li>
              <li><a href="#" className="hover:text-blue-600">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-600">Shipping</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Follow Us</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Facebook</a></li>
              <li><a href="#" className="hover:text-blue-600">Instagram</a></li>
              <li><a href="#" className="hover:text-blue-600">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-600">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AkShoppe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
