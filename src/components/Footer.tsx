import React from "react";
export default function Footer() {
    return (
        <footer className="mt-auto w-full bg-white">
            <div className="text-center text-sm text-gray-500 py-4">
                © {new Date().getFullYear()} Baveda. All rights reserved.
            </div>
        </footer>
    );
}