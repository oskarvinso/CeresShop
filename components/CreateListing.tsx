
import React, { useState } from 'react';
import { User, Listing } from '../types';
import { Camera, Sparkles, Loader2, DollarSign, Gift, ArrowRight } from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface CreateListingProps {
  user: User;
  onAdd: (listing: Listing) => void;
}

const CreateListing: React.FC<CreateListingProps> = ({ user, onAdd }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState<Listing['category']>('Ropa');
  const [condition, setCondition] = useState<Listing['condition']>('Poco uso');
  const [isExchange, setIsExchange] = useState(false);
  const [price, setPrice] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [suggestedPrice, setSuggestedPrice] = useState('');

  const handleOptimize = async () => {
    if (!title) return;
    setIsOptimizing(true);
    try {
      const { optimizedDescription, suggestedPriceRange } = await geminiService.generateListingOptimization(title, details);
      setDetails(optimizedDescription);
      setSuggestedPrice(suggestedPriceRange);
    } catch (error) {
      console.error(error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: Listing = {
      id: `l_${Date.now()}`,
      title,
      description: details,
      price: isExchange ? 'Intercambio' : parseFloat(price),
      category,
      condition,
      image: 'https://picsum.photos/seed/new_item/600/400',
      sellerId: user.id,
      sellerName: user.name,
      date: new Date().toISOString().split('T')[0]
    };
    onAdd(newListing);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        <div className="bg-pink-50 p-10 md:w-1/3 flex flex-col justify-center items-center text-center space-y-6">
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-pink-100 group cursor-pointer hover:scale-105 transition-transform">
            <Camera className="text-pink-300 group-hover:text-pink-500 transition-colors" size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-pink-700">Añadir Fotos</h3>
            <p className="text-sm text-pink-600/70">¡A los compradores les encanta ver los artículos desde todos los ángulos!</p>
          </div>
          <button className="bg-white text-pink-600 px-6 py-2 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all">
            Subir Imagen
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 md:w-2/3 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-black text-gray-800">Nuevo Anuncio</h2>
            <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Vista Previa en Vivo
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">Nombre del Artículo</label>
              <input 
                type="text" 
                placeholder="ej., Silla de comer Mamas & Papas"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-pink-300 focus:ring-0 transition-all outline-none text-lg font-medium"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">Descripción</label>
              <textarea 
                placeholder="Cuéntanos sobre el estado, características y por qué te encantó..."
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-pink-300 focus:ring-0 transition-all outline-none h-40 resize-none"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
              <button 
                type="button"
                onClick={handleOptimize}
                className="absolute right-4 bottom-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-pink-200 hover:scale-105 transition-all text-xs font-bold uppercase tracking-widest disabled:opacity-50"
                disabled={isOptimizing || !title}
              >
                {isOptimizing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                <span>{isOptimizing ? 'Optimizando...' : 'Magia AI'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">Categoría</label>
                <select 
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent outline-none focus:bg-white focus:border-pink-300 transition-all"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Listing['category'])}
                >
                  <option value="Ropa">Ropa</option>
                  <option value="Equipo">Equipo</option>
                  <option value="Juguetes">Juguetes</option>
                  <option value="Habitación">Habitación</option>
                  <option value="Alimentación">Alimentación</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">Estado</label>
                <select 
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent outline-none focus:bg-white focus:border-pink-300 transition-all"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as Listing['condition'])}
                >
                  <option value="Nuevo">Nuevo</option>
                  <option value="Como nuevo">Como nuevo</option>
                  <option value="Poco uso">Poco uso</option>
                </select>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex items-center space-x-8">
                <button 
                  type="button"
                  onClick={() => setIsExchange(false)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-2xl border-2 transition-all ${!isExchange ? 'bg-pink-50 border-pink-400 text-pink-600' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
                >
                  <DollarSign size={20} />
                  <span className="font-bold">Poner Precio</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setIsExchange(true)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-2xl border-2 transition-all ${isExchange ? 'bg-emerald-50 border-emerald-400 text-emerald-600' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
                >
                  <Gift size={20} />
                  <span className="font-bold">Regalo/Cambio</span>
                </button>
              </div>

              {!isExchange && (
                <div className="animate-fadeIn">
                  <div className="relative">
                    <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-300" size={24} />
                    <input 
                      type="number" 
                      placeholder="Precio en USD"
                      className="w-full pl-14 pr-5 py-5 rounded-2xl bg-gray-50 border-transparent outline-none focus:bg-white focus:border-pink-300 transition-all text-xl font-bold"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required={!isExchange}
                    />
                  </div>
                  {suggestedPrice && (
                    <p className="mt-2 text-xs text-rose-400 font-medium italic ml-2">
                      💡 Sugerencia AI: {suggestedPrice}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-pink-500 text-white py-5 rounded-[2rem] text-xl font-bold shadow-xl shadow-pink-100 hover:bg-pink-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3"
            >
              <span>Publicar Anuncio</span>
              <ArrowRight size={24} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
