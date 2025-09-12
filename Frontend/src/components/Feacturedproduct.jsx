import { useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useCartStore } from "../../stores/useCartStore";

const FeaturedProducts = ({ featuredproducts = [] }) => {
  const { AdditemToCart } = useCartStore();
  const scrollRef = useRef(null);

  // Scroll helper
  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-500 mb-8">
          Featured Products
        </h2>

        {/* Carousel */}
        <div className="relative">
          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide"
          >
            {featuredproducts.map((product) => (
              <div
                key={product._id}
                className="snap-start flex-shrink-0 w-[80%] sm:w-[45%] lg:w-[30%] xl:w-[23%] bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                {/* Product Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-emerald-600 font-medium mb-4">
                    ${product.price.toFixed(2)}
                  </p>

                  <button
                    onClick={() => AdditemToCart(product)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Prev Button */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="hidden sm:flex absolute top-1/2 -left-5 -translate-y-1/2 p-3 rounded-full shadow-md bg-emerald-600 hover:bg-emerald-500 text-white transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="hidden sm:flex absolute top-1/2 -right-5 -translate-y-1/2 p-3 rounded-full shadow-md bg-emerald-600 hover:bg-emerald-500 text-white transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
