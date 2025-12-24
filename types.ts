
export interface User {
  id: string;
  name: string;
  avatar: string;
  isLoggedIn: boolean;
}

export type DeliveryMethod = 'Envío Nacional' | 'Entrega Personal Segura';
export type OrderStatus = 'Pendiente' | 'Enviado' | 'Entregado' | 'Completado';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number | 'Trueque';
  category: 'Ropita' | 'Coches y Cunas' | 'Juguetes' | "Pa' el Cuarto" | 'Comidita';
  condition: 'Nuevo' | 'Como nuevo' | 'Segundazo bueno';
  image: string;
  sellerId: string;
  sellerName: string;
  date: string;
  deliveryMethod: DeliveryMethod;
}

export interface Order {
  id: string;
  listingId: string;
  title: string;
  price: number | 'Trueque';
  status: OrderStatus;
  trackingNumber?: string;
  deliveryMethod: DeliveryMethod;
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

export type AppView = 'marketplace' | 'community' | 'sell' | 'profile' | 'orders';
