import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

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
    <header className="bg-gray-900 text-white px-4 py-4 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Baveda</h1>

        <form onSubmit={handleSearch} className="w-full max-w-md">
          <input
            type="text"
            name="search"
            defaultValue={searchValue}
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded border border-gray-300 text-black focus:outline-none"
          />
        </form>

        <ul className="flex gap-4 text-lg">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          <li><Link to="/admin" className="hover:underline">Admin</Link></li>
        </ul>
      </div>
    </header>
  );
}