
import React from 'react';
import { User, AppView } from '../types';
import { ShoppingBag, Users, PlusCircle } from 'lucide-react';

interface NavbarProps {
  user: User;
  activeView: AppView;
  setView: (view: AppView) => void;
}

const LOGO_URL = "https://static.wixstatic.com/media/522a2a_fe586d95a93a409fb8d056e47fab66a3~mv2.png/v1/crop/x_71,y_57,w_221,h_177/fill/w_190,h_158,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/522a2a_fe586d95a93a409fb8d056e47fab66a3~mv2.png";

const Navbar: React.FC<NavbarProps> = ({ user, activeView, setView }) => {
  const navItems: { label: string; view: AppView; icon: React.ReactNode }[] = [
    { label: 'Tienda', view: 'marketplace', icon: <ShoppingBag size={18} /> },
    { label: 'Comunidad', view: 'community', icon: <Users size={18} /> },
    { label: 'Publicar Artículo', view: 'sell', icon: <PlusCircle size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => setView('marketplace')}
          >
            <div className="mr-3 overflow-hidden rounded-lg w-10 h-10 border border-gray-100 group-hover:scale-105 transition-transform bg-white flex items-center justify-center">
              <img src={LOGO_URL} alt="Logo Ceres" className="max-w-full max-h-full object-contain" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
              Ceres Shop
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className={`flex items-center space-x-2 transition-colors hover:text-pink-600 ${
                  activeView === item.view ? 'text-pink-600 font-semibold' : 'text-gray-600'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setView('profile')}
              className="flex items-center space-x-2 bg-pink-50 px-4 py-2 rounded-full hover:bg-pink-100 transition-colors"
            >
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-7 h-7 rounded-full border border-white shadow-sm"
              />
              <span className="hidden sm:inline font-semibold text-gray-700 text-sm">Mi Perfil</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
