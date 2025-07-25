import React from 'react';

const MovieCardSkeleton: React.FC = () => (
    <div className="flex-shrink-0 w-48 md:w-56">
        <div className="w-full aspect-[2/3] bg-slate-800/50 rounded-xl animate-pulse" />
    </div>
);

const MovieCarouselSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-1/3 bg-slate-800/50 rounded-md mb-6 animate-pulse" />
        <div className="flex items-start gap-4 md:gap-6 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 overflow-hidden">
            {[...Array(6)].map((_, i) => (
                <MovieCardSkeleton key={i} />
            ))}
        </div>
    </div>
  );
};

export default MovieCarouselSkeleton;
