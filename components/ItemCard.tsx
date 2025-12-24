
import React from 'react';
import { Listing } from '../types';
import { Tag, Repeat, ShieldCheck, Truck, MapPin } from 'lucide-react';

interface ItemCardProps {
  listing: Listing;
}

const ItemCard: React.FC<ItemCardProps> = ({ listing }) => {
  const formatPrice = (price: number | 'Trueque') => {
    if (price === 'Trueque') return 'Trueque';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={listing.image} 
          alt={listing.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-pink-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm w-fit">
            {listing.category}
          </span>
          <div className="bg-emerald-500/90 text-white px-2 py-1 rounded-lg text-[9px] font-bold flex items-center space-x-1 shadow-sm w-fit">
             <ShieldCheck size={10} />
             <span>COMPRA PROTEGIDA</span>
          </div>
        </div>
        
        {/* Badge de Método de Entrega */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/80 backdrop-blur-sm p-2 rounded-xl flex items-center space-x-2 text-[10px] font-bold text-blue-800 shadow-sm border border-white">
            {listing.deliveryMethod === 'Envío Nacional' ? <Truck size={14} /> : <MapPin size={14} />}
            <span>{listing.deliveryMethod}</span>
          </div>
        </div>

        {listing.price === 'Trueque' && (
          <div className="absolute top-4 right-4">
            <span className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
              <Repeat size={16} />
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex flex-col mb-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-pink-500 transition-colors">{listing.title}</h3>
            <span className="text-lg font-extrabold text-pink-600 whitespace-nowrap ml-2">
              {formatPrice(listing.price)}
            </span>
          </div>
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
