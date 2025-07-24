import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
        <div className=" flex bg-gray-400 h-16 py-3">
            <div className=" flex-1 justify-start text-3xl px-4">
                {/* left */}
                <h1>Baveda</h1>
            </div>
            <div className=" flex-2justify-end text-2xl">
                {/* right */}
                <ul className=" flex gap-4 mx-1.5">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
            </div>
        </div>


    </header>
  );
}
