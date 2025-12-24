
import React, { useState } from 'react';
import { User, Listing, DeliveryMethod } from '../types';
import { Camera, Sparkles, Loader2, DollarSign, Gift, ArrowRight, ShieldCheck, Truck, MapPin } from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface CreateListingProps { user: User; onAdd: (listing: Listing) => void; }

const CreateListing: React.FC<CreateListingProps> = ({ user, onAdd }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState<Listing['category']>('Ropita');
  const [condition, setCondition] = useState<Listing['condition']>('Segundazo bueno');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('Envío Nacional');
  const [isExchange, setIsExchange] = useState(false);
  const [price, setPrice] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = async () => {
    if (!title) return;
    setIsOptimizing(true);
    try {
      const { optimizedDescription } = await geminiService.generateListingOptimization(title, details);
      setDetails(optimizedDescription);
    } catch (error) { console.error(error); } finally { setIsOptimizing(false); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: Listing = {
      id: `l_${Date.now()}`,
      title,
      description: details,
      price: isExchange ? 'Trueque' : parseFloat(price),
      category,
      condition,
      image: 'https://picsum.photos/seed/new_item/600/400',
      sellerId: user.id,
      sellerName: user.name,
      date: new Date().toISOString().split('T')[0],
      deliveryMethod
    };
    onAdd(newListing);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        <div className="bg-blue-50 p-10 md:w-1/3 flex flex-col justify-center items-center text-center space-y-6">
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-blue-100 group cursor-pointer hover:scale-105 transition-transform">
            <Camera className="text-blue-300 group-hover:text-blue-500 transition-colors" size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-700">Fotos Claras</h3>
            <p className="text-sm text-blue-600/70">Muestra el estado real del producto para generar confianza.</p>
          </div>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all">
            Subir fotos
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 md:w-2/3 space-y-6">
          <h2 className="text-3xl font-black text-gray-800">Publicar Artículo</h2>

          <div className="bg-emerald-50 p-4 rounded-2xl flex items-start space-x-3 border border-emerald-100">
            <ShieldCheck className="text-emerald-600 mt-1" size={20} />
            <div>
               <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Protección Ceres</p>
               <p className="text-[10px] text-emerald-700">Tu dinero está seguro. Retenemos el pago hasta que el comprador reciba y confirme el pedido.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">Título del Anuncio</label>
              <input 
                type="text" 
                placeholder="ej., Cuna de madera en perfecto estado"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-pink-300 outline-none text-lg font-medium"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">Descripción del Producto</label>
              <textarea 
                placeholder="Danos más detalles sobre el estado, tiempo de uso y por qué es una excelente opción..."
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-pink-300 outline-none h-32 resize-none"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
              <button 
                type="button"
                onClick={handleOptimize}
                className="absolute right-4 bottom-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg hover:scale-105 transition-all text-[10px] font-bold uppercase"
                disabled={isOptimizing || !title}
              >
                {isOptimizing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                <span>Mejorar con AI</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Categoría</label>
                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 outline-none" value={category} onChange={(e) => setCategory(e.target.value as any)}>
                  <option value="Ropita">Ropita</option>
                  <option value="Coches y Cunas">Coches y Cunas</option>
                  <option value="Juguetes">Juguetes</option>
                  <option value="Pa' el Cuarto">Pa' el Cuarto</option>
                  <option value="Comidita">Comidita</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Estado</label>
                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 outline-none" value={condition} onChange={(e) => setCondition(e.target.value as any)}>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Como nuevo">Como nuevo</option>
                  <option value="Segundazo bueno">Segundazo bueno</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Método de Entrega</label>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setDeliveryMethod('Envío Nacional')}
                  className={`flex-1 flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${deliveryMethod === 'Envío Nacional' ? 'border-pink-500 bg-pink-50' : 'border-gray-100'}`}
                >
                  <Truck size={20} className={deliveryMethod === 'Envío Nacional' ? 'text-pink-500' : 'text-gray-400'} />
                  <span className="text-[10px] font-bold mt-1">Envío Nacional</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setDeliveryMethod('Entrega Personal Segura')}
                  className={`flex-1 flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${deliveryMethod === 'Entrega Personal Segura' ? 'border-pink-500 bg-pink-50' : 'border-gray-100'}`}
                >
                  <MapPin size={20} className={deliveryMethod === 'Entrega Personal Segura' ? 'text-pink-500' : 'text-gray-400'} />
                  <span className="text-[10px] font-bold mt-1">Entrega Personal</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center space-x-4 mb-4">
                <button type="button" onClick={() => setIsExchange(false)} className={`flex-1 py-3 rounded-xl border-2 font-bold ${!isExchange ? 'border-pink-400 bg-pink-50 text-pink-600' : 'border-gray-100'}`}>Venta</button>
                <button type="button" onClick={() => setIsExchange(true)} className={`flex-1 py-3 rounded-xl border-2 font-bold ${isExchange ? 'border-blue-400 bg-blue-50 text-blue-600' : 'border-gray-100'}`}>Trueque</button>
              </div>
              {!isExchange && (
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">COP $</span>
                  <input type="number" placeholder="Precio justo" className="w-full pl-20 pr-5 py-4 rounded-2xl bg-gray-50 outline-none focus:bg-white text-xl font-bold" value={price} onChange={(e) => setPrice(e.target.value)} required={!isExchange} />
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="w-full bg-pink-500 text-white py-5 rounded-[2rem] text-xl font-bold shadow-xl shadow-pink-100 hover:bg-pink-600 transition-all">
            Publicar Ahora
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
