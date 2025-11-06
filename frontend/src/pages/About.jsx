import { assets } from "../assets/assets";

const About = () => {
  return (
    <section className="bg-white" id="About">
      {/* <div className="max-w-7xl mx-auto"> */}
        {/* Header */}
        <h2 className="text-3xl px-6 py-3 bg-blue-400 sm:text-4xl font-bold text-gray-900 mb-4">
          About <span className="text-pink-600">AkShoppe</span>
        </h2>
        <p className="text-gray-600 px-6 text-lg mb-6 max-w-3xl">
          Have questions about your order, want to know more about our products, or just want to say hi? We’d love to hear from you.
        </p>
<hr className="text-gray-400"/>
        {/* About Content */}
        <div className="grid grid-cols-1 px-6 mt-5 md:grid-cols-2 gap-10 items-center mb-16">
          {/* Text */}
          <div className="text-gray-700 text-lg leading-relaxed">
            <p>
              Welcome to <span className="font-semibold text-pink-600">AkShoppe</span> — your one-stop online destination for everything you need!
            </p>

            <p className="mt-2 text-justify">
              Whether you're shopping for the latest electronics, trendy fashion, home decor, or thoughtful gifts, we've got you covered.
            </p>

            <p className="mt-2 text-justify">
              At <span className="font-semibold text-pink-600">AkShoppe</span>, we believe that shopping should be more than just a transaction — it should be a delightful experience. That’s why we’ve built a platform that combines quality, variety, affordability, and convenience all in one place.
            </p>

            <p className="mt-2 text-justify">
              Our curated collections are handpicked with care, ensuring that every product meets our standards of style, functionality, and value. From local treasures to global trends, we bring the best to your doorstep.
            </p>
           
          </div>


          {/* Image */}
          <div className="flex justify-center">
            <img
              src={assets.about_image}
              alt="About AkShoppe"
              className="rounded-lg w-full h-[100%] max-w-md shadow-md"
            />
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 px-6 md:grid-cols-3 gap-6">
          {/* Our Mission */}
          <div className=" p-6 rounded-xl bg-yellow-400 shadow-2xl hover:shadow-md transition duration-300 text-center">
            <div className="text-5xl mb-4 text-pink-600">🎯</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Our mission is to make shopping easy, accessible, and enjoyable for everyone — bringing together high-quality products at affordable prices with top-tier customer service.
            </p>
          </div>

          {/* Why Shop With Us */}
          <div className=" p-6 rounded-xl bg-yellow-400 shadow-2xl hover:shadow-md transition duration-300 text-center">
            <div className="text-5xl mb-4 text-pink-600">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Shop With Us?</h3>
            <ul className="text-gray-700 text-left list-disc list-inside space-y-2">
              <li>Hand-picked products across multiple categories</li>
              <li>Secure and seamless checkout process</li>
              <li>Fast shipping and easy returns</li>
              <li>Responsive customer support team</li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div className=" p-6 rounded-xl bg-yellow-400 shadow-2xl hover:shadow-md transition duration-300 text-center">
            <div className="text-5xl mb-4 text-pink-600">📬</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Get In Touch</h3>
            <p className="text-gray-700 mb-2">
              Have questions, feedback, or just want to say hi? We'd love to hear from you!
            </p>
            <p className="text-gray-700">
              Email us at:{" "}
              <a
                href="mailto:support@akshoppe.com"
                className="text-pink-600 font-medium underline hover:text-pink-800"
              >
                support@akshoppe.com
              </a>
            </p>
          </div>
        </div>
      {/* </div> */}
    </section>
  );
};

export default About;
