import React from "react";
import { FaShoppingCart, FaStore } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchValue = params.get("q") || "";

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value;
    navigate(`/?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        {/* Store name */}
        <Link to="/" className="text-xl font-bold text-gray-900 whitespace-nowrap">
          65 Liquor Store
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-grow max-w-xl w-full mx-3">
          <div className="flex">
            <input
              type="text"
              name="search"
              defaultValue={searchValue}
              placeholder="What can we help you find today?"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-r-md hover:bg-green-700"
            >
              Search
            </button>
          </div>
        </form>

        {/* Store pickup info */}
        <div className="hidden md:flex items-center space-x-2 text-gray-700">
          <FaStore />
          <div className="text-sm leading-tight">
            <div className="text-xs text-gray-500">Pickup at</div>
            <div className="font-semibold">Westbury, NY</div>
          </div>
        </div>

        {/* Cart & Admin */}
        <div className="flex items-center space-x-4">
          <Link to="/admin" className="text-sm text-gray-800 hover:text-black font-medium">
            Admin
          </Link>
          <Link to="/cart" className="text-gray-800 hover:text-black">
            <FaShoppingCart size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}