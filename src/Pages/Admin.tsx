import React, { useState } from "react";

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const {
      productName,
      volume,
      sellingPrice,
      image,
      description,
      brand,
      category,
      agree,
    } = formData;

    if (
      !productName ||
      !volume ||
      !sellingPrice ||
      !image ||
      !description ||
      !brand ||
      !category
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!agree) {
      alert("Please agree to the 30% sales share.");
      return;
    }

    const newItem = {
      productName,
      volume,
      sellingPrice,
      image,
    };

    const existing = JSON.parse(localStorage.getItem("items") || "[]");
    localStorage.setItem("items", JSON.stringify([...existing, newItem]));

    alert("Product added!");
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
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
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
          placeholder="Volume (e.g. 750ml)"
          value={formData.volume}
          onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Selling Price (e.g. $54.99)"
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
          placeholder="Category (e.g. Vodka)"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      <textarea
        placeholder="Detailed Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mt-4 border p-2 rounded"
        rows={5}
      />

      <div className="mt-4">
        <label className="block font-semibold mb-2">Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {formData.image && (
          <img src={formData.image} alt="Preview" className="mt-3 w-40 h-auto rounded shadow" />
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
    </div>
  );
}