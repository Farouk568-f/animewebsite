import React from 'react';
import { Part } from '../types.ts';
import { ShoppingCartIcon } from '../constants.tsx';

interface PartCardProps {
  part: Part;
}

const PartCard: React.FC<PartCardProps> = ({ part }) => {
  return (
    <div 
      className="group relative flex flex-col justify-end rounded-2xl overflow-hidden h-full p-6 text-white bg-slate-900 border border-transparent hover:border-[color:var(--color-primary)]/30 transition-all duration-300"
    >
      <img 
        src={part.imageUrl} 
        alt={part.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300 group-hover:from-black/80"></div>
      
      <div className="relative z-10 transition-all duration-300 transform group-hover:-translate-y-2">
        <h3 className="text-2xl font-bold mb-2 text-slate-50 line-clamp-2" style={{fontFamily: 'var(--heading-font)'}}>{part.name}</h3>
        <p className="text-slate-300 text-base mb-4 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transition-all duration-300 ease-in-out line-clamp-3">{part.description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-3xl font-bold text-[color:var(--color-primary)]">{part.price} ر.س</span>
          <button className="flex items-center justify-center whitespace-nowrap space-x-2 rtl:space-x-reverse bg-[color:var(--color-primary)] text-slate-950 font-bold py-3 px-5 rounded-full transition-all duration-300 transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 hover:bg-[color:var(--color-primary-dark)] text-base">
            <ShoppingCartIcon className="w-6 h-6"/>
            <span>أضف للسلة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartCard;