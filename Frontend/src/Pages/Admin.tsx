// ✅ Admin.tsx (complete version with Best Seller, Trending, New Arrival)
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
    bestSeller: false,
    trending: false,
    newArrival: false,
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
      bestSeller: formData.bestSeller,
      trending: formData.trending,
      newArrival: formData.newArrival,
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
          bestSeller: false,
          trending: false,
          newArrival: false,
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Product Name" value={formData.productName} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Volume" value={formData.volume} onChange={(e) => setFormData({ ...formData, volume: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Selling Price" value={formData.sellingPrice} onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className="border p-2 rounded" />

        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: "" })} className="border p-2 rounded">
          <option value="">Select Category</option>
          {Object.keys(categoryMap).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {categoryMap[formData.category]?.length > 0 && (
          <select value={formData.subcategory} onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })} className="border p-2 rounded">
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

      <div className="flex flex-wrap items-center gap-4 mt-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={formData.onSale} onChange={(e) => setFormData({ ...formData, onSale: e.target.checked })} /> Sale Item
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={formData.bestSeller} onChange={(e) => setFormData({ ...formData, bestSeller: e.target.checked })} /> Best Seller
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={formData.trending} onChange={(e) => setFormData({ ...formData, trending: e.target.checked })} /> Trending
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={formData.newArrival} onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })} /> New Arrival
        </label>
      </div>

      <button onClick={handleSubmit} className="bg-black text-white px-6 py-2 mt-6 rounded hover:bg-gray-800">
        {editingProductId ? "Update Product" : "Add Product"}
      </button>
      {/* Product Table */}
{products.length > 0 && (
  <div className="mt-10">
    <h3 className="text-xl font-semibold mb-4">Product List</h3>
    <div className="overflow-x-auto">
      <table className="w-full border text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Tags</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((p) =>
              p.name?.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => (
              <tr key={product._id}>
                <td className="border p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">
                  {product.category}
                  {product.subcategory && ` → ${product.subcategory}`}
                </td>
                <td className="border p-2">
                  {product.onSale && <span className="mr-2">🔥 Sale</span>}
                  {product.bestSeller && <span className="mr-2">⭐ Best</span>}
                  {product.trending && <span className="mr-2">📈 Trend</span>}
                  {product.newArrival && <span>🆕 New</span>}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditingProductId(product._id);
                      setFormData({
                        productName: product.name || "",
                        tagline: product.tagline || "",
                        description: product.description || "",
                        volume: product.volume || "",
                        alcoholPercent: product.alcoholPercent || "",
                        actualPrice: product.actualPrice || "",
                        discount: product.discount || "",
                        sellingPrice: product.price || "",
                        stock: product.stock || "",
                        category: product.category || "",
                        subcategory: product.subcategory || "",
                        origin: product.origin || "",
                        brand: product.brand || "",
                        image: product.image || null,
                        agree: false,
                        onSale: product.onSale || false,
                        bestSeller: product.bestSeller || false,
                        trending: product.trending || false,
                        newArrival: product.newArrival || false,
                      });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
)}

    </div>
  );
}
