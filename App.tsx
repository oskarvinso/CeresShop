
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Marketplace from './components/Marketplace';
import Community from './components/Community';
import CreateListing from './components/CreateListing';
import Profile from './components/Profile';
import { User, Listing, CommunityPost, AppView } from './types';
import { ShoppingBag, Users, PlusCircle, User as UserIcon } from 'lucide-react';

const INITIAL_USER: User = {
  id: 'user_1',
  name: 'Sarah Miller',
  avatar: 'https://picsum.photos/seed/sarah/100/100',
  isLoggedIn: true
};

const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'l1',
    title: 'Portabebés Ergobaby Omni 360',
    description: 'Casi nuevo, incluye empaque original. ¡Excelente soporte para la espalda!',
    price: 85,
    category: 'Equipo',
    condition: 'Como nuevo',
    image: 'https://picsum.photos/seed/carrier/400/300',
    sellerId: 'user_2',
    sellerName: 'Emily R.',
    date: '2023-10-25'
  },
  {
    id: 'l2',
    title: 'Set de 5 Bodies de Algodón Orgánico',
    description: 'Algodón orgánico suave, colores neutros. Talla 0-3 meses.',
    price: 15,
    category: 'Ropa',
    condition: 'Poco uso',
    image: 'https://picsum.photos/seed/onesie/400/300',
    sellerId: 'user_3',
    sellerName: 'Mark T.',
    date: '2023-10-26'
  },
  {
    id: 'l3',
    title: 'Gimnasio Fisher-Price para Bebé',
    description: 'Perfecto para el tiempo boca abajo. Incluye juguetes, todo sanitizado.',
    price: 'Intercambio',
    category: 'Juguetes',
    condition: 'Poco uso',
    image: 'https://picsum.photos/seed/gym/400/300',
    sellerId: 'user_4',
    sellerName: 'Jessica L.',
    date: '2023-10-27'
  }
];

const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    author: 'MamaBear24',
    authorAvatar: 'https://picsum.photos/seed/mama1/100/100',
    title: '¿Éxitos en el entrenamiento del sueño?',
    content: 'Acabamos de empezar con el método Ferber. ¡Fue duro las primeras dos noches, pero anoche el pequeño Leo durmió 6 horas seguidas!',
    tags: ['Sueño', 'Consejos'],
    likes: 24,
    comments: 12,
    date: 'Hace 2h'
  },
  {
    id: 'p2',
    author: 'Papa_Alex',
    authorAvatar: 'https://picsum.photos/seed/dad1/100/100',
    title: '¿Mejores purés orgánicos?',
    content: 'Quiero empezar a hacer mi propia comida para bebés. ¿Alguna sugerencia de primeros alimentos nutritivos?',
    tags: ['Alimentación', 'Recetas'],
    likes: 15,
    comments: 8,
    date: 'Hace 5h'
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('marketplace');
  const [user] = useState<User>(INITIAL_USER);
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [posts] = useState<CommunityPost[]>(INITIAL_POSTS);

  const handleAddListing = (newListing: Listing) => {
    setListings([newListing, ...listings]);
    setView('marketplace');
  };

  const renderContent = () => {
    switch (view) {
      case 'marketplace':
        return <Marketplace listings={listings} />;
      case 'community':
        return <Community posts={posts} />;
      case 'sell':
        return <CreateListing user={user} onAdd={handleAddListing} />;
      case 'profile':
        return <Profile user={user} listings={listings.filter(l => l.sellerId === user.id)} />;
      default:
        return <Marketplace listings={listings} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} activeView={view} setView={setView} />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {renderContent()}
      </main>

      {/* Navegación Inferior Móvil */}
      <nav className="md:hidden sticky bottom-0 bg-white border-t border-gray-200 flex justify-around py-3">
        <button 
          onClick={() => setView('marketplace')}
          className={`flex flex-col items-center ${view === 'marketplace' ? 'text-pink-500 font-bold' : 'text-gray-500'}`}
        >
          <ShoppingBag size={24} />
          <span className="text-xs">Tienda</span>
        </button>
        <button 
          onClick={() => setView('community')}
          className={`flex flex-col items-center ${view === 'community' ? 'text-pink-500 font-bold' : 'text-gray-500'}`}
        >
          <Users size={24} />
          <span className="text-xs">Comunidad</span>
        </button>
        <button 
          onClick={() => setView('sell')}
          className={`flex flex-col items-center ${view === 'sell' ? 'text-pink-500 font-bold' : 'text-gray-500'}`}
        >
          <PlusCircle size={24} />
          <span className="text-xs">Publicar</span>
        </button>
        <button 
          onClick={() => setView('profile')}
          className={`flex flex-col items-center ${view === 'profile' ? 'text-pink-500 font-bold' : 'text-gray-500'}`}
        >
          <UserIcon size={24} />
          <span className="text-xs">Perfil</span>
        </button>
      </nav>

      <footer className="bg-white border-t border-gray-100 py-8 mt-12 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Ceres Shop. Creado con amor para padres primerizos.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
