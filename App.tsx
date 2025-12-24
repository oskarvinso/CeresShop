
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Marketplace from './components/Marketplace';
import Community from './components/Community';
import CreateListing from './components/CreateListing';
import Profile from './components/Profile';
import Orders from './components/Orders';
import { User, Listing, CommunityPost, AppView, Order } from './types';
import { ShoppingBag, Users, PlusCircle, User as UserIcon, ShieldCheck, Truck } from 'lucide-react';

const INITIAL_USER: User = {
  id: 'user_1',
  name: 'Mariana Restrepo',
  avatar: 'https://picsum.photos/seed/mariana/100/100',
  isLoggedIn: true
};

const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'l1',
    title: 'Canguro Ergobaby Omni 360 - Excelente Estado',
    description: 'Artículo en perfectas condiciones, usado muy pocas veces. Diseño ergonómico ideal para el soporte de espalda del adulto y comodidad del bebé.',
    price: 320000,
    category: 'Coches y Cunas',
    condition: 'Como nuevo',
    image: 'https://picsum.photos/seed/carrier/400/300',
    sellerId: 'user_2',
    sellerName: 'Catalina Gómez',
    date: '2023-10-25',
    deliveryMethod: 'Envío Nacional'
  },
  {
    id: 'l2',
    title: 'Set de 5 Pijamas de Algodón - Talla 0-3m',
    description: 'Prendas de algodón de alta calidad, muy suaves al tacto. Colores neutros ideales para cualquier recién nacido.',
    price: 45000,
    category: 'Ropita',
    condition: 'Segundazo bueno',
    image: 'https://picsum.photos/seed/onesie/400/300',
    sellerId: 'user_3',
    sellerName: 'Mateo Holguín',
    date: '2023-10-26',
    deliveryMethod: 'Entrega Personal Segura'
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_1',
    listingId: 'l2',
    title: 'Set de Pijamas Algodón',
    price: 45000,
    status: 'Enviado',
    trackingNumber: 'CS-CO-992341',
    deliveryMethod: 'Envío Nacional',
    date: '2023-11-01'
  }
];

const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    author: 'Mariana_R',
    authorAvatar: 'https://picsum.photos/seed/mama1/100/100',
    title: 'Recomendaciones para el bienestar del lactante',
    content: '¿Alguna madre o padre en la comunidad tiene consejos sobre masajes para aliviar los cólicos? Mi bebé ha estado un poco inquieta últimamente.',
    tags: ['Salud', 'Consejos'],
    likes: 42,
    comments: 25,
    date: 'Hace 1 hora'
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('marketplace');
  const [user] = useState<User>(INITIAL_USER);
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [orders] = useState<Order[]>(INITIAL_ORDERS);
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
        return <Profile user={user} listings={listings.filter(l => l.sellerId === user.id)} setView={setView} />;
      case 'orders':
        return <Orders orders={orders} />;
      default:
        return <Marketplace listings={listings} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} activeView={view} setView={setView} />
      
      <div className="bg-emerald-700 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-2 text-xs md:text-sm font-semibold tracking-wide">
          <ShieldCheck size={18} />
          <span>Garantía Ceres: Transacciones protegidas y entregas verificadas para tu seguridad</span>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {renderContent()}
      </main>

      <nav className="md:hidden sticky bottom-0 bg-white border-t border-gray-200 flex justify-around py-3 z-40">
        <button onClick={() => setView('marketplace')} className={`flex flex-col items-center ${view === 'marketplace' ? 'text-pink-600' : 'text-gray-500'}`}>
          <ShoppingBag size={24} />
          <span className="text-[10px] mt-1 font-medium">Tienda</span>
        </button>
        <button onClick={() => setView('community')} className={`flex flex-col items-center ${view === 'community' ? 'text-pink-600' : 'text-gray-500'}`}>
          <Users size={24} />
          <span className="text-[10px] mt-1 font-medium">Comunidad</span>
        </button>
        <button onClick={() => setView('sell')} className={`flex flex-col items-center ${view === 'sell' ? 'text-pink-600' : 'text-gray-500'}`}>
          <PlusCircle size={24} />
          <span className="text-[10px] mt-1 font-medium">Vender</span>
        </button>
        <button onClick={() => setView('orders')} className={`flex flex-col items-center ${view === 'orders' ? 'text-pink-600' : 'text-gray-500'}`}>
          <Truck size={24} />
          <span className="text-[10px] mt-1 font-medium">Seguimiento</span>
        </button>
        <button onClick={() => setView('profile')} className={`flex flex-col items-center ${view === 'profile' ? 'text-pink-600' : 'text-gray-500'}`}>
          <UserIcon size={24} />
          <span className="text-[10px] mt-1 font-medium">Perfil</span>
        </button>
      </nav>

      <footer className="bg-white border-t border-gray-100 py-8 mt-12 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Ceres Shop Colombia. Fomentando una crianza colaborativa y sostenible.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
