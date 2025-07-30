// src/pages/Whiskey.tsx
import React, { useEffect, useState } from "react";

const Whiskey = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const whiskeyItems = data.filter((item) => item.category === "Whiskey");
        setProducts(whiskeyItems);
      });
  }, []);

  const grouped = products.reduce((acc: any, item) => {
    const sub = item.subcategory || "Other";
    acc[sub] = acc[sub] || [];
    acc[sub].push(item);
    return acc;
  }, {});

  return (
    <div className="container py-10">
      <h2 className="text-3xl font-bold mb-6">Whiskey</h2>

      {Object.entries(grouped).map(([subcategory, items]) => (
        <div key={subcategory} className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">{subcategory}</h3>
            <button className="text-sm text-blue-600">See all</button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map((product) => (
              <div
                key={product._id}
                className="bg-white border rounded shadow p-2 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 object-cover rounded mb-2"
                />
                <h4 className="font-semibold text-sm line-clamp-2">{product.name}</h4>
                <p className="text-xs text-gray-500">{product.volume}</p>
                <span className="mt-auto font-bold text-green-700">${product.price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Whiskey;
