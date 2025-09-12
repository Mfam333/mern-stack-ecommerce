
import { Link } from "react-router-dom"

const Category = ({ category }) => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-md transition-shadow hover:shadow-xl">
      <Link
        to={"/category"+category.href}
        aria-label={`Explore ${category.name}`}
        className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-2xl"
      >
        {/* Wrapper with responsive aspect ratio */}
        <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-[16/9]">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

          {/* Image */}
          <img
            src={category.imageUrl}
            srcSet={`${category.imageUrl}?w=400 400w,
                     ${category.imageUrl}?w=800 800w,
                     ${category.imageUrl}?w=1200 1200w`}
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   33vw"
            alt={category.name || "Category"}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-safe:group-hover:scale-110"
            loading="lazy"
          />

          {/* Text Content */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 z-20">
            <h3 className="text-white text-base sm:text-lg lg:text-2xl font-bold drop-shadow-md">
              {category.name}
            </h3>
            <p className="text-gray-200 text-xs sm:text-sm">
              Explore {category.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Category;
