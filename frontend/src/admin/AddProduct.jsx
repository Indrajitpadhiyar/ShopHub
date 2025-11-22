import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/actions/addProduct.Action";
import { ADD_PRODUCT_RESET } from "../constans/addProduct.Constans";
import Loader from "../components/Loader";
import Message from "../components/Message"; 

const AddProduct = () => {
  const dispatch = useDispatch();

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // Redux state
  const { loading, success, error } = useSelector((state) => state.addProduct);

  // Reset form on success
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: ADD_PRODUCT_RESET });
        // Reset form
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setStock("");
        setImages([]);
        setImagesPreview([]);
      }, 3000);
    }
  }, [success, dispatch]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !price || !description || !category || !stock || images.length === 0) {
      alert("Please fill all fields and upload at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(addProduct(formData));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">Add New Product</h1>
          <p className="text-gray-600">Fill all details to list your product</p>
        </div>

        {/* Messages */}
        {loading && <Loader />}
        {success && (
          <Message variant="success">
            Product added successfully! Redirecting...
          </Message>
        )}
        {error && <Message variant="danger">{error}</Message>}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
            <h2 className="text-2xl font-semibold">Product Details</h2>
          </div>

          <form onSubmit={submitHandler} className="p-8 space-y-6">
            {/* Name & Price */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-200 focus:border-orange-500 outline-none transition"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Price (₹)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-200 focus:border-orange-500 outline-none transition"
                  placeholder="999"
                  required
                />
              </div>
            </div>

            {/* Category & Stock */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-200 focus:border-orange-500 outline-none transition"
                  required
                >
                  <option value="">Choose Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Sports">Sports</option>
                  <option value="Books">Books</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Stock Quantity</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-200 focus:border-orange-500 outline-none transition"
                  placeholder="50"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-200 focus:border-orange-500 outline-none transition resize-none"
                placeholder="Write a detailed description..."
                required
              ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">Product Images</label>
              <div className="border-2 border-dashed border-orange-300 rounded-xl p-8 text-center cursor-pointer hover:border-orange-500 transition">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <svg className="mx-auto h-16 w-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mt-2 text-gray-600">Click to upload images (multiple allowed)</p>
                </label>
              </div>

              {/* Image Preview */}
              {imagesPreview.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {imagesPreview.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={img}
                        alt="Preview"
                        className="h-32 w-full object-cover rounded-lg shadow-md border-2 border-orange-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagesPreview(imagesPreview.filter((_, index) => index !== i));
                          setImages(images.filter((_, index) => index !== i));
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold py-4 px-12 rounded-full text-lg transition transform hover:scale-105 shadow-lg"
              >
                {loading ? "Adding Product..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;