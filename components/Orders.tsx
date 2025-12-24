
import React from 'react';
import { Order, OrderStatus } from '../types';
import { Package, Truck, CheckCircle2, Clock, Search, ShieldCheck } from 'lucide-react';

interface OrdersProps {
  orders: Order[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pendiente': return 'text-amber-700 bg-amber-50 border-amber-100';
      case 'Enviado': return 'text-blue-700 bg-blue-50 border-blue-100';
      case 'Entregado': return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case 'Completado': return 'text-gray-600 bg-gray-50 border-gray-100';
      default: return 'text-gray-400 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Seguimiento de Pedidos</h1>
          <p className="text-gray-500 mt-1">Consulta el estado actual de tus adquisiciones y envíos.</p>
        </div>
        <div className="bg-white px-4 py-1 rounded-2xl flex items-center shadow-sm border border-gray-100 w-full md:w-96">
          <Search className="text-gray-300" size={18} />
          <input type="text" placeholder="Número de guía (ej. CS-CO-XXXX)..." className="flex-grow px-3 py-3 outline-none text-sm placeholder-gray-300" />
          <button className="bg-pink-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold">Rastrear</button>
        </div>
      </div>

      <div className="grid gap-6">
        {orders.length > 0 ? orders.map(order => (
          <div key={order.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-28 h-28 bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-100">
                <Package className="text-gray-300" size={40} />
              </div>
              
              <div className="flex-grow space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold text-gray-800">{order.title}</h3>
                  <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Referencia</p>
                    <p className="font-semibold text-gray-700">#{order.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Fecha Compra</p>
                    <p className="font-semibold text-gray-700">{order.date}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Método Entrega</p>
                    <div className="flex items-center space-x-1 font-semibold text-gray-700">
                      {order.deliveryMethod === 'Envío Nacional' ? <Truck size={14} /> : <ShieldCheck size={14} className="text-emerald-600" />}
                      <span>{order.deliveryMethod}</span>
                    </div>
                  </div>
                  {order.trackingNumber && (
                    <div className="space-y-1">
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">N° Seguimiento</p>
                      <p className="font-black text-blue-700">{order.trackingNumber}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-between items-end border-l border-gray-100 pl-8 hidden md:flex">
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Total</p>
                  <p className="text-2xl font-black text-pink-600">
                    {order.price === 'Trueque' ? 'Intercambio' : `$${order.price.toLocaleString('es-CO')}`}
                  </p>
                </div>
                <button className="bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold transition-colors">
                  Detalles del Envío
                </button>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-50">
              <div className="relative flex items-center justify-between max-w-3xl mx-auto">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
                <div 
                  className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-1000"
                  style={{ width: order.status === 'Pendiente' ? '0%' : order.status === 'Enviado' ? '50%' : '100%' }}
                ></div>
                
                {[
                  { label: 'Procesando', icon: <Clock size={16} />, active: true },
                  { label: 'En Camino', icon: <Truck size={16} />, active: order.status !== 'Pendiente' },
                  { label: 'Entregado', icon: <CheckCircle2 size={16} />, active: order.status === 'Entregado' || order.status === 'Completado' }
                ].map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border-4 border-white ${step.active ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-300'}`}>
                      {step.icon}
                    </div>
                    <span className={`text-[10px] font-bold mt-2 uppercase tracking-wide ${step.active ? 'text-emerald-700' : 'text-gray-400'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <Package className="mx-auto text-gray-200 mb-4" size={56} />
            <h3 className="text-xl font-bold text-gray-800">Sin órdenes recientes</h3>
            <p className="text-gray-400 mt-2">Tus pedidos y seguimientos aparecerán aquí.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
