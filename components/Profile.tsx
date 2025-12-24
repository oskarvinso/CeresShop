
import React from 'react';
import { User, Listing, AppView } from '../types';
import ItemCard from './ItemCard';
import { Star, Award, Settings, Package, Truck, ShoppingBag, Heart } from 'lucide-react';

interface ProfileProps {
  user: User;
  listings: Listing[];
  setView: (view: AppView) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, listings, setView }) => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Cabecera del Perfil */}
      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
          <div className="relative">
            <div className="w-44 h-44 rounded-full border-8 border-pink-50 shadow-2xl overflow-hidden">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-3 right-3 bg-white text-gray-600 p-2.5 rounded-2xl shadow-xl hover:scale-110 transition-transform border border-gray-100">
              <Settings size={20} />
            </button>
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-4xl font-black text-gray-800 mb-1">{user.name}</h1>
                <p className="text-gray-400 font-semibold">Bienvenida de nuevo a tu comunidad Ceres.</p>
              </div>
              <div className="flex items-center justify-center md:justify-end space-x-3 mt-4 md:mt-0">
                <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-2xl flex items-center space-x-2 border border-amber-100 shadow-sm">
                  <Star size={18} fill="currentColor" />
                  <span className="font-bold">4.9</span>
                </div>
                <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl flex items-center space-x-2 border border-emerald-100 shadow-sm">
                  <Award size={18} />
                  <span className="font-bold">Vendedora Destacada</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 max-w-2xl leading-relaxed mb-10 text-sm md:text-base">
              Madre comprometida con el consumo responsable y la crianza colaborativa. En mi tienda encontrarás artículos seleccionados con cuidado, garantizando su calidad para otros niños.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <button onClick={() => setView('orders')} className="bg-blue-600 p-5 rounded-3xl text-center group hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                <Truck className="mx-auto text-white mb-2" size={26} />
                <p className="text-[10px] font-black uppercase tracking-widest text-white/90">Seguimiento</p>
              </button>
              <div className="bg-white p-5 rounded-3xl text-center border border-gray-100 shadow-sm">
                <p className="text-3xl font-black text-pink-600">{listings.length}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Publicaciones</p>
              </div>
              <div className="bg-white p-5 rounded-3xl text-center border border-gray-100 shadow-sm">
                <p className="text-3xl font-black text-emerald-600">12</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Puntos Ceres</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pestañas */}
      <div className="space-y-8">
        <div className="flex items-center space-x-10 border-b border-gray-100 pb-0 overflow-x-auto no-scrollbar">
          <button className="flex items-center space-x-2 text-base font-bold text-gray-800 border-b-4 border-pink-600 pb-4 px-2 whitespace-nowrap">
            <ShoppingBag size={20} />
            <span>Mis Artículos</span>
          </button>
          <button onClick={() => setView('orders')} className="flex items-center space-x-2 text-base font-bold text-gray-400 hover:text-gray-600 pb-4 px-2 transition-colors whitespace-nowrap">
            <Truck size={20} />
            <span>Compras y Seguimiento</span>
          </button>
          <button className="flex items-center space-x-2 text-base font-bold text-gray-400 hover:text-gray-600 pb-4 px-2 transition-colors whitespace-nowrap">
            <Heart size={20} />
            <span>Mis Favoritos</span>
          </button>
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map(item => (
              <ItemCard key={item.id} listing={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <Package className="mx-auto text-gray-200 mb-6" size={64} />
            <h3 className="text-2xl font-bold text-gray-800">Aún no tienes publicaciones activas</h3>
            <p className="text-gray-400 max-w-sm mx-auto mt-2">Empieza a vender los artículos que tu bebé ya no necesita.</p>
            <button onClick={() => setView('sell')} className="mt-8 bg-pink-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-pink-100 hover:bg-pink-700 transition-all">
              Publicar ahora
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
