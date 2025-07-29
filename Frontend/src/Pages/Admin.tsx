import React, { useEffect, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";

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
    origin: "",
    brand: "",
    image: null as string | null,
    agree: false,
  });

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("❌ Failed to fetch products", err));
  }, []);

  const handleSubmit = () => {
    fetch("http://localhost:4000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.productName,
        price: formData.sellingPrice,
        description: formData.description,
        image: formData.image,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save product");
        return res.json();
      })
      .then(() => {
        alert("✅ Product saved to database!");

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
          origin: "",
          brand: "",
          image: null,
          agree: false,
        });
      })
      .catch((err) => {
        console.error("❌ Error:", err);
        alert("Failed to save product.");
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Add New Liquor Product</h2>

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
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mt-4 border p-2 rounded"
        rows={5}
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
            fileName="liquor-product.jpg"
            folder="/liquor-products"
            useUniqueFileName={true}
            onSuccess={(res) => {
              console.log("✅ Upload success", res);
              setFormData((prev) => ({ ...prev, image: res.url }));
            }}
            onError={(err) => {
              console.error("❌ Upload error", err);
              alert("Image upload failed.");
            }}
          />
        </IKContext>
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="mt-3 w-40 h-auto rounded shadow"
          />
        )}
      </div>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={formData.agree}
          onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
          className="mr-2"
        />
        <label className="text-sm text-gray-600">
          Clothing takes 30% from your total sale
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 mt-6 rounded hover:bg-gray-800"
      >
        Add Product
      </button>

      <hr className="my-6" />
      <h3 className="text-xl font-bold mb-4">Existing Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded shadow hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h4 className="font-semibold mt-2">{product.name}</h4>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-500 truncate">
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
