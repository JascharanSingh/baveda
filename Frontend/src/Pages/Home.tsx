import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("❌ Failed to fetch products:", err);
        alert("Could not load products.");
      });
  }, [location]); // re-fetch on route change

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Explore Liquor Collection</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition-all p-4 flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">{item.description}</p>
              <span className="mt-auto text-green-700 font-bold">${item.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}