import React from 'react';
import Card from '../layouts/Card';
const Products = [
  {
    id: 1,
    name: 'Asus Laptop',
    price: 200000,
    images: [{ url: 'https://www.asus.com/media/Odin/Websites/global/ProductLine/20200824120814.jpg?webp' }],
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    name: 'USB-C Cable 2m',
    price: 999,
    images: [{ url: 'https://m.media-amazon.com/images/I/41xNtWtAFyL._AC_SX300_SY300_QL70_ML2_.jpg' }],
    rating: 4.7,
    inStock: true,
  },
  {
    id: 3,
    name: 'Power Bank 10,000mAh',
    price: 3999,
    images: [{ url: 'https://m.media-amazon.com/images/I/513Ovgywq7L._AC_CR0%2C0%2C0%2C0_SX615_SY462_.jpg' }],
    rating: 4.3,
    inStock: false,
  },
];

const Product = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Products.map((products) => (
            <Card key={products.id} products={products} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;