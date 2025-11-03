import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, ShoppingBag, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getProduct } from '../../redux/actions/product.Action';
import Navbar from '../ui/Navbar';
import Sidebar from '../layouts/Sidebar';
import ProductCard from '../ui/ProductCard';
import Footer from '../ui/Footer';
import Loading from '../ui/Loading';
import MetaData from '../ui/MetaData';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q')?.trim() || '';
    const dispatch = useDispatch();
    const { loading, error, products = [] } = useSelector((state) => state.products);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filters, setFilters] = useState({
        categories: [],
        brands: [],
        priceRange: [0, 1000000],
        customMin: '',
        customMax: '',
    });
    const [sortBy, setSortBy] = useState('featured');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);

    useEffect(() => {
        if (error) toast.error(error);
        dispatch(getProduct());
    }, [dispatch, error]);

    const filteredByQuery = React.useMemo(() => {
        if (!query) return products;
        const q = query.toLowerCase();
        const exact = products.filter(p => p.name?.toLowerCase().includes(q));
        if (exact.length > 0) return exact;
        return products.filter(p =>
            p.name?.toLowerCase().split(' ').some(w => w.startsWith(q))
        );
    }, [query, products]);

    const filteredProducts = Array.isArray(filteredByQuery)
        ? filteredByQuery.filter(product => {
            if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
            if (filters.categories.length > 0 && product.category && !filters.categories.includes(product.category)) return false;
            if (filters.brands.length > 0 && product.brand && !filters.brands.includes(product.brand)) return false;
            return true;
        })
        : [];

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'rating': return (b.ratings || 0) - (a.ratings || 0);
            case 'newest': return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            default: return 0;
        }
    });

    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = sortedProducts.slice(startIndex, endIndex);
    const displayStart = startIndex + 1;
    const displayEnd = Math.min(endIndex, sortedProducts.length);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const clearAllFilters = () => {
        setFilters({
            categories: [],
            brands: [],
            priceRange: [0, 10000],
            customMin: '',
            customMax: '',
        });
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <MetaData title="Search Results" />
            <Navbar />

            <div className="flex relative">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    filters={filters}
                    setFilters={handleFilterChange}
                />

                <div className="flex-1 lg:ml-0 transition-all duration-300">
                    <div className="p-4 md:p-6 lg:p-8">
                        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                                >
                                    <Filter className="w-5 h-5" />
                                    Filters
                                </button>

                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
                                        Search Results for "{query}"
                                    </h1>
                                    {!loading && sortedProducts.length > 0 && (
                                        <p className="text-gray-600 text-sm">
                                            Showing {displayStart}-{displayEnd} of {sortedProducts.length} products
                                        </p>
                                    )}
                                </div>
                            </div>

                            <select
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value);
                                    setCurrentPage(1);
                                }}
                                disabled={loading}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-700 text-sm font-medium cursor-pointer disabled:opacity-50"
                            >
                                <option value="featured">Sort by: Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Rating: High to Low</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>

                        {(filters.categories.length > 0 || filters.brands.length > 0) && (
                            <div className="mb-4 lg:hidden">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-gray-700">Active:</span>
                                    {filters.categories.slice(0, 2).map(cat => (
                                        <span key={cat} className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs capitalize">
                                            {cat}
                                        </span>
                                    ))}
                                    {filters.categories.length > 2 && (
                                        <span className="text-xs text-gray-500">+{filters.categories.length - 2} more</span>
                                    )}
                                    {filters.brands.slice(0, 1).map(brand => (
                                        <span key={brand} className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">
                                            {brand}
                                        </span>
                                    ))}
                                    {filters.brands.length > 1 && (
                                        <span className="text-xs text-gray-500">+{filters.brands.length - 1} more</span>
                                    )}
                                </div>
                            </div>
                        )}

                        {loading && (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Loading />
                                <p className="text-gray-600 font-medium mt-4">Loading products...</p>
                            </div>
                        )}

                        {error && !loading && (
                            <div className="text-center py-20">
                                <div className="text-red-400 mb-4">
                                    <ShoppingBag className="w-20 h-20 mx-auto" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Error loading products</h3>
                                <p className="text-gray-500 mb-4">{error}</p>
                                <button
                                    onClick={() => dispatch(getProduct())}
                                    className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {!loading && !error && currentProducts.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                                {currentProducts.map((product) => (
                                    <ProductCard
                                        key={product._id || product.id}
                                        id={product._id || product.id}
                                        name={product.name}
                                        price={product.price}
                                        description={product.description}
                                        ratings={product.ratings}
                                        images={product.images}
                                        stock={product.stock}
                                        numOfReviews={product.numOfReviews}
                                    />
                                ))}
                            </div>
                        )}

                        {!loading && !error && sortedProducts.length === 0 && (
                            <div className="text-center py-20">
                                <div className="text-gray-400 mb-4">
                                    <ShoppingBag className="w-20 h-20 mx-auto" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-4">
                                    {query ? `No results for "${query}".` : 'No products available.'}
                                    {products.length > 0 && ' Try adjusting your filters.'}
                                </p>
                                {products.length > 0 && (filters.categories.length > 0 || filters.brands.length > 0) && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
                                    >
                                        Clear All Filters
                                    </button>
                                )}
                            </div>
                        )}

                        {!loading && !error && sortedProducts.length > 0 && totalPages > 1 && (
                            <div className="mt-12 flex justify-center items-center gap-2 flex-wrap">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 border border-gray-300 rounded-lg transition-colors text-sm font-medium ${currentPage === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                >
                                    Previous
                                </button>

                                {[...Array(totalPages)].map((_, i) => {
                                    const page = i + 1;
                                    if (
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${currentPage === page
                                                    ? 'bg-orange-600 text-white shadow-md'
                                                    : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                                        return <span key={page} className="px-2 text-gray-400">...</span>;
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 border border-gray-300 rounded-lg transition-colors text-sm font-medium ${currentPage === totalPages
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SearchResults;