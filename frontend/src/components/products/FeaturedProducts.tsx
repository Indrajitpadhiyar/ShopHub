import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Sample product data - this will come from API/state management later
const featuredProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    rating: 4.8,
    reviews: 127,
    category: "Electronics",
    isNew: false,
    isOnSale: true,
  },
  {
    id: "2",
    name: "Designer Leather Jacket",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 89,
    category: "Fashion",
    isNew: true,
    isOnSale: false,
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    price: 249.99,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 203,
    category: "Electronics",
    isNew: false,
    isOnSale: true,
  },
  {
    id: "4",
    name: "Minimalist Backpack",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 156,
    category: "Accessories",
    isNew: true,
    isOnSale: false,
  },
  {
    id: "5",
    name: "Organic Skincare Set",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
    rating: 4.9,
    reviews: 341,
    category: "Beauty",
    isNew: false,
    isOnSale: true,
  },
  {
    id: "6",
    name: "Artisan Coffee Beans",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop",
    rating: 4.4,
    reviews: 78,
    category: "Food & Drink",
    isNew: true,
    isOnSale: false,
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our hand-picked selection of premium products that combine quality, style, and innovation.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 text-lg btn-glow group"
          >
            <Link to="/products">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}