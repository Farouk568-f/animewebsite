import React from 'react';

const AnimeDetailsPageSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
        {/* Backdrop Skeleton */}
        <div className="absolute top-0 left-0 w-full h-[60vh] -z-10 bg-slate-900" />
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-40 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
                {/* Poster Skeleton */}
                <div className="md:col-span-1 lg:col-span-1">
                    <div className="w-full rounded-2xl bg-slate-800 aspect-[2/3]"></div>
                </div>

                {/* Details Skeleton */}
                <div className="md:col-span-2 lg:col-span-3 space-y-6">
                    <div className="h-16 bg-slate-800 rounded-lg w-3/4"></div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="h-8 w-24 bg-slate-800 rounded-full"></div>
                        <div className="h-8 w-24 bg-slate-800 rounded-full"></div>
                        <div className="h-8 w-24 bg-slate-800 rounded-full"></div>
                    </div>
                     <div className="flex flex-wrap items-center gap-2">
                        <div className="h-6 w-20 bg-slate-800 rounded-full"></div>
                        <div className="h-6 w-20 bg-slate-800 rounded-full"></div>
                        <div className="h-6 w-20 bg-slate-800 rounded-full"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="h-5 bg-slate-800 rounded w-full"></div>
                        <div className="h-5 bg-slate-800 rounded w-full"></div>
                        <div className="h-5 bg-slate-800 rounded w-5/6"></div>
                    </div>
                    <div className="h-16 w-48 bg-slate-800 rounded-full"></div>
                </div>
            </div>

            {/* Episodes Skeleton */}
            <div className="mt-16">
                 <div className="h-10 w-1/4 bg-slate-800 rounded-lg mb-6"></div>
                 <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
                    <div className="h-12 bg-slate-800 rounded-lg"></div>
                    <div className="h-12 bg-slate-800 rounded-lg"></div>
                    <div className="h-12 bg-slate-800 rounded-lg"></div>
                    <div className="h-12 bg-slate-800 rounded-lg"></div>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default AnimeDetailsPageSkeleton;