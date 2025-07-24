import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Item {
  productName: string;
  volume: string;
  sellingPrice: string;
  image: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  useEffect(() => {
    const stored = localStorage.getItem("items");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch (e) {
        console.error("Invalid localStorage data", e);
      }
    }
  }, []);

  const filteredItems = items.filter(
    (item): item is Item =>
      typeof item?.productName === "string" &&
      item.productName.toLowerCase().includes(query)
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {filteredItems.length === 0 ? (
        <p className="text-gray-500 text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={item.image}
                alt={item.productName}
                className="h-48 w-full object-contain p-4"
              />

              <div className="px-4 pb-4">
                <h2 className="font-semibold text-lg">{item.productName}</h2>
                <p className="text-sm text-gray-600">{item.volume}</p>

                <p className="text-xl font-bold mt-2">{item.sellingPrice}</p>

                <button
                  className="w-full bg-emerald-600 text-white font-semibold mt-4 py-2 rounded hover:bg-emerald-700"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}