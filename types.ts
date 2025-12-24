
export interface User {
  id: string;
  name: string;
  avatar: string;
  isLoggedIn: boolean;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number | 'Intercambio';
  category: 'Ropa' | 'Equipo' | 'Juguetes' | 'Habitación' | 'Alimentación';
  condition: 'Nuevo' | 'Como nuevo' | 'Poco uso';
  image: string;
  sellerId: string;
  sellerName: string;
  date: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  date: string;
}

export type AppView = 'marketplace' | 'community' | 'sell' | 'profile';
