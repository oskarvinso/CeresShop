
import React from 'react';
import { User, Listing } from '../types';
import ItemCard from './ItemCard';
import { Star, Award, Settings, Package } from 'lucide-react';

interface ProfileProps {
  user: User;
  listings: Listing[];
}

const Profile: React.FC<ProfileProps> = ({ user, listings }) => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Cabecera del Perfil */}
      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-40 h-40 rounded-full border-4 border-pink-50 shadow-xl"
            />
            <div className="absolute bottom-2 right-2 bg-pink-500 text-white p-2 rounded-xl shadow-lg">
              <Settings size={20} />
            </div>
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-4xl font-black text-gray-800 mb-1">{user.name}</h1>
                <p className="text-gray-400 font-medium">Madre Verificada desde 2023</p>
              </div>
              <div className="flex items-center justify-center md:justify-end space-x-4 mt-4 md:mt-0">
                <div className="bg-amber-50 text-amber-600 px-4 py-2 rounded-2xl flex items-center space-x-2 border border-amber-100">
                  <Star size={18} fill="currentColor" />
                  <span className="font-bold">4.9</span>
                </div>
                <div className="bg-rose-50 text-rose-600 px-4 py-2 rounded-2xl flex items-center space-x-2 border border-rose-100">
                  <Award size={18} />
                  <span className="font-bold">Súper Vendedora</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 max-w-2xl leading-relaxed mb-8">
              ¡Hola! Soy Sarah, mamá de dos niños maravillosos. Creemos firmemente en la crianza consciente y la vida sostenible. ¡Todo lo que publico aquí ha sido amado y cuidado, esperando que traiga tanta alegría a tu familia como a la nuestra!
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-3xl text-center">
                <p className="text-2xl font-black text-pink-500">{listings.length}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Artículos Vendidos</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-3xl text-center">
                <p className="text-2xl font-black text-blue-500">12</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Comprados</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-3xl text-center">
                <p className="text-2xl font-black text-emerald-500">5</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Insignias</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pestañas del Perfil */}
      <div className="space-y-6">
        <div className="flex items-center space-x-8 border-b border-gray-100 pb-2">
          <button className="text-xl font-bold text-gray-800 border-b-4 border-pink-500 pb-2 px-1">Mis Anuncios</button>
          <button className="text-xl font-bold text-gray-400 hover:text-gray-600 pb-2 px-1 transition-colors">Compras</button>
          <button className="text-xl font-bold text-gray-400 hover:text-gray-600 pb-2 px-1 transition-colors">Favoritos</button>
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map(item => (
              <ItemCard key={item.id} listing={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
            <Package className="mx-auto text-gray-200 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-700">No tienes anuncios activos</h3>
            <p className="text-gray-400 max-w-xs mx-auto mt-2">¿Es hora de liberar espacio? ¡Publica tu primer artículo hoy!</p>
            <button className="mt-6 bg-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-pink-600 transition-all">
              Empezar a Vender
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
