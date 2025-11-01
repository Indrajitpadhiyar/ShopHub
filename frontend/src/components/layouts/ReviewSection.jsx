// ReviewSection.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../redux/actions/product.Action';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const ReviewSection = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [currentImageIdx, setCurrentImageIdx] = useState(0);
    const [userReview, setUserReview] = useState({
        rating: 0,
        title: '',
        comment: '',
    });
    const [showAllReviews, setShowAllReviews] = useState(false); // NEW: Toggle all reviews

    const { loading, product, error } = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        if (id) dispatch(getProductDetails(id));
    }, [dispatch, id]);

    const { totalReviews, averageRating, distribution } = useMemo(() => {
        const reviews = product?.reviews || [];

        if (!reviews.length) {
            return {
                totalReviews: 0,
                averageRating: 0,
                distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
            };
        }

        const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let sum = 0;

        reviews.forEach((r) => {
            const rating = parseInt(r.rating, 10);
            if (!isNaN(rating) && rating >= 1 && rating <= 5) {
                dist[rating] += 1;
                sum += rating;
            }
        });

        return {
            totalReviews: reviews.length,
            averageRating: reviews.length > 0 ? sum / reviews.length : 0,
            distribution: dist,
        };
    }, [product?.reviews]);

    const reviewsWithImages = useMemo(
        () => (product?.reviews || []).filter((r) => r.images?.length > 0),
        [product?.reviews]
    );

    const handlePrev = () => {
        setCurrentImageIdx((i) =>
            i === 0 ? reviewsWithImages.length - 1 : i - 1
        );
    };
    const handleNext = () => {
        setCurrentImageIdx((i) =>
            i === reviewsWithImages.length - 1 ? 0 : i + 1
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit review →', userReview);
        setUserReview({ rating: 0, title: '', comment: '' });
    };

    const renderStars = (rating) => {
        const numRating = Number(rating);
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                size={16}
                className={i < numRating ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}
            />
        ));
    };

    const renderInteractiveStars = (selected, setSelected) => {
        const numSelected = Number(selected);
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                size={32}
                className={`cursor-pointer transition-colors ${i < numSelected
                        ? 'fill-orange-500 text-orange-500'
                        : 'text-gray-300 hover:text-orange-400'
                    }`}
                onClick={() => setSelected(i + 1)}
            />
        ));
    };

    if (loading) return <p className="text-center py-12">Loading reviews…</p>;
    if (error) return <p className="text-center py-12 text-red-600">{error}</p>;

    // NEW: Show only 4 reviews by default
    const visibleReviews = showAllReviews
        ? product?.reviews || []
        : (product?.reviews || []).slice(0, 4);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* ---------- 1. Header + Rating Overview ---------- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* LEFT */}
                <div>
                    <h2 className="text-3xl font-bold mb-4">Customer reviews</h2>

                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex">{renderStars(Math.round(averageRating))}</div>
                        <span className="text-xl font-semibold">
                            {averageRating.toFixed(1)} out of 5
                        </span>
                    </div>

                    <p className="text-gray-600 mb-6">{totalReviews} global ratings</p>

                    {/* Distribution bars */}
                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = distribution[star] || 0;
                            const pct =
                                totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

                            return (
                                <div key={star} className="flex items-center gap-3">
                                    <span className="w-12 text-sm font-medium text-orange-600">
                                        {star} star
                                    </span>

                                    <div className="flex-1 h-5 bg-gray-200 rounded overflow-hidden">
                                        <div
                                            className="h-full bg-orange-500 transition-all"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>

                                    <span className="w-12 text-sm font-medium text-orange-600 text-right">
                                        {pct}%
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <button className="mt-6 text-sm text-blue-600 hover:underline">
                        How are ratings calculated?
                    </button>
                </div>

                {/* RIGHT – Customers say */}
                <div>
                    <h2 className="text-3xl font-bold mb-4">Customers say</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        {product?.customersSay ||
                            product?.description ||
                            'Customers love this product for its quality and value.'}
                    </p>

                    <p className="text-xs text-gray-500 mb-6 flex items-center gap-1">
                        <span className="text-base">AI</span> Generated from the text of
                        customer reviews
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {(product?.positiveFeatures || []).map((f) => (
                            <button
                                key={f}
                                className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-orange-500 hover:bg-orange-50 flex items-center gap-1"
                            >
                                <span className="text-green-600">Checkmark</span> {f}
                            </button>
                        ))}
                        {(product?.negativeFeatures || []).map((f) => (
                            <button
                                key={f}
                                className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-orange-500 hover:bg-orange-50 flex items-center gap-1"
                            >
                                <span className="text-orange-500">Neutral</span> {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ---------- 2. Reviews with images (carousel) ---------- */}
            {reviewsWithImages.length > 0 && (
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold">Reviews with images</h3>
                        <button className="text-blue-600 hover:underline text-sm">
                            See all photos
                        </button>
                    </div>

                    <div className="relative">
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                            {reviewsWithImages[currentImageIdx].images.map((img, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 w-48 h-48 snap-center"
                                >
                                    <img
                                        src={img}
                                        alt={`Review ${currentImageIdx + 1} – img ${i + 1}`}
                                        className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>

                        {reviewsWithImages.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                                    aria-label="Previous review"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                                    aria-label="Next review"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}
                    </div>
                </section>
            )}

            {/* ---------- 3. Write a review ---------- */}
            <section className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-2xl p-8 mb-12 shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Share Your Experience</h3>
                <p className="text-gray-600 mb-6">
                    Help others make informed decisions
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-3">
                            Your Rating *
                        </label>
                        <div className="flex gap-2">
                            {renderInteractiveStars(userReview.rating, (r) =>
                                setUserReview((s) => ({ ...s, rating: r }))
                            )}
                        </div>
                        {userReview.rating > 0 && (
                            <p className="mt-2 text-sm text-gray-600">
                                {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][
                                    userReview.rating
                                ]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Review Title *
                        </label>
                        <input
                            type="text"
                            value={userReview.title}
                            onChange={(e) =>
                                setUserReview((s) => ({ ...s, title: e.target.value }))
                            }
                            placeholder="Summarize your experience"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Your Review *
                        </label>
                        <textarea
                            value={userReview.comment}
                            onChange={(e) =>
                                setUserReview((s) => ({ ...s, comment: e.target.value }))
                            }
                            placeholder="Share your thoughts about this product..."
                            rows={5}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            {userReview.comment.length} characters
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={
                            !userReview.rating ||
                            !userReview.title.trim() ||
                            !userReview.comment.trim()
                        }
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                    >
                        Submit Review
                    </button>
                </form>
            </section>

            {/* ---------- 4. Top reviews (Only 4 by default) ---------- */}
            <section>
                <h3 className="text-2xl font-bold mb-6">Top reviews from India</h3>

                {product?.reviews?.length ? (
                    <div className="space-y-6">
                        {visibleReviews.map((rev, idx) => {
                            const name = rev.name || rev.user?.name || 'Anonymous';
                            const date = rev.createdAt || rev.date || Date.now();

                            return (
                                <div
                                    key={idx}
                                    className="border-b border-gray-200 pb-6 last:border-0"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                            {name.charAt(0).toUpperCase()}
                                        </div>

                                        <div className="flex-1">
                                            <p className="font-semibold text-lg">{name}</p>

                                            <div className="flex items-center gap-2 mt-1 mb-2">
                                                <div className="flex">{renderStars(rev.rating)}</div>
                                                <span className="text-sm font-semibold">
                                                    {rev.title || 'Great Product'}
                                                </span>
                                            </div>

                                            <p className="text-xs text-gray-500 mb-3">
                                                Reviewed on{' '}
                                                {new Date(date).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>

                                            <p className="text-gray-700 leading-relaxed">
                                                {rev.comment || rev.review}
                                            </p>

                                            {rev.images?.length > 0 && (
                                                <div className="flex gap-2 mt-4">
                                                    {rev.images.map((img, i) => (
                                                        <img
                                                            key={i}
                                                            src={img}
                                                            alt={`Review image ${i + 1}`}
                                                            className="w-20 h-20 object-cover rounded-md"
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex gap-4 mt-4 text-sm">
                                                <button className="text-gray-600 hover:text-orange-600">
                                                    Helpful ({rev.helpful || 0})
                                                </button>
                                                <button className="text-gray-600 hover:text-orange-600">
                                                    Report
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-8">
                        No reviews yet. Be the first to review this product!
                    </p>
                )}

                {/* NEW: See More / Show Less Button */}
                {totalReviews > 4 && (
                    <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="mt-8 w-full border-2 border-orange-500 text-orange-600 font-semibold py-3 rounded-lg hover:bg-orange-50 transition-all"
                    >
                        {showAllReviews
                            ? `Show Less`
                            : `See More Reviews (${totalReviews - 4} more)`}
                    </button>
                )}
            </section>
        </div>
    );
};

export default ReviewSection;