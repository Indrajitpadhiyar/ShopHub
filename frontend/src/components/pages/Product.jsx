import React, { useEffect } from "react";
import Card from "../layouts/Card";
import { getProducts } from "../../actions/product.action";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader";
import toast from "react-hot-toast"; // ✅ Import toast

const Product = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // ✅ Show toast when there's an error
  useEffect(() => {
    if (error) {
      toast.error(error || "Something went wrong while fetching products");
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Products</h1>

        {loading ? (
          <Loader />
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, index) => (
              <Card key={p._id || p.id || index} product={p} />
            ))}
          </div>
        ) : (
          !loading && <p className="text-center text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Product;
