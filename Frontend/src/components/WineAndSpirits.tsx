import React from "react";

const categories = [
  "Cider", "Orange Wine", "Sparkling Wine", "Cocktails & Mixers",
  "Red Wine", "Tequila & Mezcal", "Cognac & Brandy", "Rosé Wine",
  "Vermouth & Bitters", "Fortified & Sweet", "Rum", "Vodka",
  "Gin", "Sake", "Whiskey", "Liqueurs", "Select Sips", "White Wine",
];

const filters = ["Sale", "New", "Gluten-Free", "Organic", "Kosher", "Local"];

export default function WineAndSpirits() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-xl font-bold mb-4">Wine & Spirits</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter, index) => (
          <button
            key={index}
            className="border border-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-3">
        {categories.map((category, index) => (
          <div key={index}>
            <span className="text-gray-800 hover:underline cursor-pointer text-sm">
              {category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}