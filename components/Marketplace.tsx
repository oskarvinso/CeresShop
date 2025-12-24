
import React, { useState } from 'react';
import { Listing } from '../types';
import ItemCard from './ItemCard';
import { Search, SlidersHorizontal } from 'lucide-react';

interface MarketplaceProps {
  listings: Listing[];
}

const Marketplace: React.FC<MarketplaceProps> = ({ listings }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Ropa', 'Equipo', 'Juguetes', 'Habitación', 'Alimentación'];

  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
    
    const categoryMap: {[key: string]: string} = {
      'Ropa': 'Ropa',
      'Equipo': 'Equipo',
      'Juguetes': 'Juguetes',
      'Habitación': 'Habitación',
      'Alimentación': 'Alimentación'
    };
    
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Sección Hero */}
      <div className="bg-gradient-to-r from-pink-100 to-rose-50 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black text-rose-900 mb-6 leading-tight">
            La alegría de compartir, <br/>de padres para padres.
          </h1>
          <p className="text-lg text-rose-800/70 mb-8 max-w-lg">
            Dale una segunda vida a las cosas de tu bebé. Intercambia, compra o vende con una comunidad de confianza.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" size={20} />
              <input 
                type="text" 
                placeholder="Busca cochecitos, ropa, juguetes..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-pink-400 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="bg-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all transform hover:-translate-y-1">
              Buscar
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:block opacity-20 pointer-events-none">
           <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-400 to-transparent rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
                selectedCategory === cat 
                ? 'bg-pink-500 text-white shadow-md' 
                : 'bg-white text-gray-500 hover:bg-pink-50 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="flex items-center space-x-2 text-gray-500 bg-white border border-gray-100 px-4 py-2.5 rounded-full hover:bg-gray-50 transition-colors">
          <SlidersHorizontal size={18} />
          <span className="text-sm font-medium">Más Filtros</span>
        </button>
      </div>

      {/* Grilla de Anuncios */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map(listing => (
            <ItemCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-300" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-700">No se encontraron artículos</h3>
          <p className="text-gray-400">Prueba ajustando tu búsqueda o los filtros de categoría.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
