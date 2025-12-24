
import React from 'react';
import { Listing } from '../types';
import { Tag, Repeat } from 'lucide-react';

interface ItemCardProps {
  listing: Listing;
}

const ItemCard: React.FC<ItemCardProps> = ({ listing }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={listing.image} 
          alt={listing.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-pink-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            {listing.category}
          </span>
        </div>
        {listing.price === 'Intercambio' && (
          <div className="absolute top-4 right-4">
            <span className="bg-emerald-500 text-white p-2 rounded-full shadow-lg">
              <Repeat size={16} />
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{listing.title}</h3>
          <span className="text-lg font-extrabold text-pink-500">
            {listing.price === 'Intercambio' ? 'Cambio' : `$${listing.price}`}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          {listing.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center space-x-2">
            <img 
              src={`https://picsum.photos/seed/${listing.sellerId}/40/40`} 
              alt={listing.sellerName}
              className="w-8 h-8 rounded-full border border-pink-100"
            />
            <span className="text-xs font-medium text-gray-600">{listing.sellerName}</span>
          </div>
          <div className="flex items-center text-gray-400 text-xs">
            <Tag size={12} className="mr-1" />
            <span>{listing.condition}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
