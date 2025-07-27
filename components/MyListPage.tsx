
import React from 'react';
import { Media } from '../types.ts';
import MovieCard from './MovieCard.tsx';
import { ListBulletIcon } from '../constants.tsx';

interface MyListPageProps {
  myList: Media[];
  onCardClick: (media: Media) => void;
}

const MyListPage: React.FC<MyListPageProps> = ({ myList, onCardClick }) => {
  return (
    <div className="min-h-screen text-slate-200 pt-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
            <ListBulletIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[color:var(--color-primary)]" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                My List
            </h1>
        </div>

        {myList.length === 0 ? (
          <div className="col-span-full text-center py-20 flex flex-col items-center gap-4">
            <ListBulletIcon className="w-24 h-24 text-slate-700" />
            <h3 className="text-2xl font-bold text-slate-400">Your List is Empty</h3>
            <p className="text-slate-500 max-w-md">Add shows and movies to your list to see them here. Look for the "Add to List" button on details pages.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
            {myList.map(media => (
              <MovieCard key={`${media.id}-${media.media_type}`} movie={media} onCardClick={onCardClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListPage;
