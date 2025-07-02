"use client";

import { useState } from "react";
import Link from "next/link";
import { pharmacy } from "@/data/pharmacy";

const Pharmacy = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = pharmacy.categories;
  const featuredProducts = pharmacy.featuredProducts;
  const filteredProducts =
    selectedCategory === "all"
      ? featuredProducts
      : featuredProducts.filter(
          (product) => product.category === selectedCategory
        );

  // const categories = [
  //   { id: 'all', name: 'All Medicines' },
  //   { id: 'prescription', name: 'Prescription Drugs' },
  //   { id: 'otc', name: 'Over-the-Counter' },
  //   { id: 'vitamins', name: 'Vitamins & Supplements' },
  //   { id: 'personal', name: 'Personal Care' },
  //   { id: 'health', name: 'Health Devices' },
  // ];

  // const featuredProducts = [
  //   {
  //     id: 1,
  //     name: 'Vitamin C 1000mg',
  //     category: 'vitamins',
  //     price: 19.99,
  //     image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  //     description: 'High-strength vitamin C supplement for immune support',
  //     requiresPrescription: false,
  //   },
  //   {
  //     id: 2,
  //     name: 'Blood Pressure Monitor',
  //     category: 'health',
  //     price: 49.99,
  //     image: 'https://images.unsplash.com/photo-1581594693706-946f6796c8a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  //     description: 'Digital automatic blood pressure monitor',
  //     requiresPrescription: false,
  //   },
  //   {
  //     id: 3,
  //     name: 'Amoxicillin 500mg',
  //     category: 'prescription',
  //     price: 29.99,
  //     image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  //     description: 'Antibiotic for bacterial infections',
  //     requiresPrescription: true,
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">
            Online Pharmacy
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Order your medications and healthcare products online. Fast delivery
            and competitive prices.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for medicines, health products..."
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-950 rounded-lg overflow-hidden relative" // Added 'relative' here
              >
                {/* Image with prescription badge */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.requiresPrescription && (
                    <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                      Requires Prescription
                    </span>
                  )}
                </div>

                {/* Product details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {product.name}
                    </h3>
                    <span className="text-blue-400 font-semibold">
                      ₹ {product.price}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-950 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-400">
              Get your medications delivered to your doorstep within 24 hours
            </p>
          </div>
          <div className="bg-gray-950 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Genuine Products
            </h3>
            <p className="text-gray-400">
              All medications are sourced from authorized manufacturers
            </p>
          </div>
          <div className="bg-gray-950 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-400">
              Our pharmacists are available round the clock for assistance
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Need Help with Your Order?
          </h2>
          <p className="text-gray-300 mb-8">
            Our pharmacists are here to help you with any questions about
            medications or orders.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Pharmacist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
