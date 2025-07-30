// ✅ Admin.tsx (updated with Best Seller + Trending + New Arrival behavior)
import React, { useEffect, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";

const categoryMap: { [key: string]: string[] } = {
  Whiskey: ["Canadian", "Flavored", "American", "Irish", "Bourbon", "Single Malt", "More Whiskey", "Scotch", "Rye"],
  Rum: ["White", "Spiced", "Flavored", "Dark", "Aged", "Gold"],
  Wine: ["Red Wine", "Champagne & Sparkling Wine", "Dessert Wine", "Pink Wine", "White Wine", "Speciality Wine"],
  "Brandy & Cognac": ["Speciality Wine", "Champagne & Sparkling Wine", "Dessert Wine", "White Wine", "Red Wine", "Pink Wine"],
  Spirits: ["Ready-to-Drink Cocktails", "Soju", "Gin", "Liqueur, Cordials, & Schnapps"],
  "Tequila & Mezcal": ["Reposado", "Gold", "Blanco", "Anejo", "Mezcal"],
  "Seltzer & Hard Beverages": ["Hard Seltzer", "Ready to Drink Cocktails & Shots"],
  Vodka: [],
  "Non-Alcoholic Drinks": [],
  "Best Seller": [],
  Trending: [],
  "New Arrival": [],
};

export default function Admin() {
  const [formData, setFormData] = useState({
    productName: "",
    tagline: "",
    description: "",
    volume: "",
    alcoholPercent: "",
    actualPrice: "",
    discount: "",
    sellingPrice: "",
    stock: "",
    category: "",
    subcategory: "",
    origin: "",
    brand: "",
    image: null as string | null,
    agree: false,
    onSale: false,
  });

  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("❌ Failed to fetch products", err));
  }, []);

  const handleSubmit = () => {
    if (!formData.image) {
      alert("Please upload an image before submitting.");
      return;
    }

    const url = editingProductId
      ? `http://localhost:4000/api/products/${editingProductId}`
      : "http://localhost:4000/api/products";

    const payload = {
      name: formData.productName,
      price: formData.sellingPrice,
      description: formData.description,
      image: formData.image,
      category: formData.category,
      subcategory: formData.subcategory,
      onSale: formData.onSale,
      brand: formData.brand,
      volume: formData.volume,
    };

    fetch(url, {
      method: editingProductId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save/update product");
        return res.json();
      })
      .then(() => {
        alert(`✅ Product ${editingProductId ? "updated" : "added"} successfully!`);
        fetch("http://localhost:4000/api/products")
          .then((res) => res.json())
          .then((data) => setProducts(data));
        setFormData({
          productName: "",
          tagline: "",
          description: "",
          volume: "",
          alcoholPercent: "",
          actualPrice: "",
          discount: "",
          sellingPrice: "",
          stock: "",
          category: "",
          subcategory: "",
          origin: "",
          brand: "",
          image: null,
          agree: false,
          onSale: false,
        });
        setEditingProductId(null);
      })
      .catch((err) => {
        console.error("❌ Error:", err);
        alert("Failed to save product.");
      });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    fetch(`http://localhost:4000/api/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        alert("🗑️ Product deleted");
        setProducts(products.filter((p) => p._id !== id));
      })
      .catch((err) => {
        console.error("❌ Delete error:", err);
        alert("Could not delete product.");
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">{editingProductId ? "Editing Product" : "Add / Edit Liquor Product"}</h2>

      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      {/* Always render the form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={formData.productName}
          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Volume"
          value={formData.volume}
          onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Selling Price"
          value={formData.sellingPrice}
          onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Brand"
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          className="border p-2 rounded"
        />

        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: "" })}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {Object.keys(categoryMap).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {categoryMap[formData.category]?.length > 0 && (
          <select
            value={formData.subcategory}
            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Subcategory</option>
            {categoryMap[formData.category].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        )}
      </div>

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mt-4 border p-2 rounded"
        rows={4}
      />

      <div className="mt-4">
        <label className="block font-semibold mb-2">Upload Image</label>
        <IKContext
          publicKey="public_bPlFafmths0AlYRK+uMj4YnhEUs="
          urlEndpoint="https://ik.imagekit.io/fo27dnu54"
          authenticator={async () => {
            const res = await fetch("http://localhost:4000/api/imagekit/auth");
            const data = await res.json();
            return data;
          }}
        >
          <IKUpload
            fileName="liquor-product"
            folder="/liquor-products"
            useUniqueFileName={true}
            onSuccess={(res) => setFormData((prev) => ({ ...prev, image: res.url }))}
            onError={() => alert("Image upload failed.")}
          />
        </IKContext>
        {formData.image && <img src={formData.image} alt="Preview" className="mt-3 w-40 h-auto rounded shadow" />}
      </div>

      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          checked={formData.onSale}
          onChange={(e) => setFormData({ ...formData, onSale: e.target.checked })}
          className="mr-2"
        />
        <label className="text-sm text-gray-600">Mark as Sale Item</label>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 mt-6 rounded hover:bg-gray-800"
      >
        {editingProductId ? "Update Product" : "Add Product"}
      </button>

      {editingProductId && (
        <button
          className="mt-2 ml-4 text-sm text-blue-600 underline"
          onClick={() => {
            setEditingProductId(null);
            setFormData({
              productName: "",
              tagline: "",
              description: "",
              volume: "",
              alcoholPercent: "",
              actualPrice: "",
              discount: "",
              sellingPrice: "",
              stock: "",
              category: "",
              subcategory: "",
              origin: "",
              brand: "",
              image: null,
              agree: false,
              onSale: false,
            });
          }}
        >Cancel Edit</button>
      )}

      <hr className="my-6" />
      <h3 className="text-xl font-bold mb-4">Existing Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.filter((p) => (p?.name || "").toLowerCase().includes(search.toLowerCase())).map((product) => (
          <div key={product._id} className="p-4 border rounded shadow">
            <img src={product.image || "/images/placeholder.jpg"} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h4 className="font-semibold mt-2">{product.name}</h4>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-500 truncate">{product.description}</p>
            <div className="flex gap-2 mt-3">
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                onClick={() => {
                  setEditingProductId(product._id);
                  setFormData({
                    productName: product.name || "",
                    tagline: "",
                    description: product.description || "",
                    volume: product.volume || "",
                    alcoholPercent: "",
                    actualPrice: "",
                    discount: "",
                    sellingPrice: product.price || "",
                    stock: "",
                    category: product.category || "",
                    subcategory: product.subcategory || "",
                    origin: "",
                    brand: product.brand || "",
                    image: product.image || null,
                    agree: false,
                    onSale: product.onSale || false,
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >Edit</button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                onClick={() => handleDelete(product._id)}
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}