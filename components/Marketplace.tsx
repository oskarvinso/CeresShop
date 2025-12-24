
import React, { useState } from 'react';
import { Listing } from '../types';
import ItemCard from './ItemCard';
import { Search, SlidersHorizontal, CreditCard, ShieldCheck } from 'lucide-react';

interface MarketplaceProps { listings: Listing[]; }

const Marketplace: React.FC<MarketplaceProps> = ({ listings }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todo');
  const categories = ['Todo', 'Ropita', 'Coches y Cunas', 'Juguetes', "Pa' el Cuarto", 'Comidita'];

  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todo' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Sección Hero */}
      <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden border border-white">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-pink-600 mb-6 shadow-sm border border-pink-100">
            <ShieldCheck size={14} />
            <span>Mercado Seguro en Colombia</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-blue-950 mb-6 leading-tight">
            Bienvenidos a Ceres. <br/><span className="text-pink-600">Lo mejor para tu familia.</span>
          </h1>
          <p className="text-lg text-blue-900/70 mb-8 max-w-lg">
            Compra, vende e intercambia artículos para bebés en una comunidad confiable. Protegemos tu dinero hasta que el artículo esté en tus manos.
          </p>
          
          {/* Métodos de Pago Visual Corregidos */}
          <div className="flex flex-col space-y-3 mb-8">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pagos seguros compatibles con:</span>
            <div className="flex items-center space-x-8">
               <img src="https://images.seeklogo.com/logo-png/40/1/nequi-logo-png_seeklogo-404357.png" alt="Nequi" className="h-5 md:h-6 object-contain grayscale hover:grayscale-0 transition-all" />
               <img src="https://images.seeklogo.com/logo-png/45/1/daviplata-logo-png_seeklogo-457809.png" alt="Daviplata" className="h-5 md:h-6 object-contain grayscale hover:grayscale-0 transition-all" />
               <img src="https://www.bancolombia.com/wcm/connect/b8e4c3f2-36a9-497d-a125-ac04f83b0bf8/LogoBancolombia.png?MOD=AJPERES" alt="Bancolombia" className="h-5 md:h-6 object-contain grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={20} />
              <input 
                type="text" 
                placeholder="Busca por nombre o categoría..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-pink-400 outline-none placeholder-gray-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-800 transition-all transform hover:-translate-y-1">
              Ver Ofertas
            </button>
          </div>
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
                ? 'bg-pink-600 text-white shadow-md' 
                : 'bg-white text-gray-500 hover:bg-pink-50 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="flex items-center space-x-2 text-gray-600 bg-white border border-gray-100 px-5 py-2.5 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
          <SlidersHorizontal size={18} />
          <span className="text-sm font-semibold">Filtros Avanzados</span>
        </button>
      </div>

      {/* Grilla */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map(listing => (
            <ItemCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">No encontramos resultados</h3>
          <p className="text-gray-400 mt-2">Intenta ajustar los filtros de búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
