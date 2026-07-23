import React from 'react';
import { useStore } from '../../context/StoreContext';
import { PackageCheck, Truck, Printer, RotateCcw, ShoppingBag } from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { orders, formatPrice, setActiveView } = useStore();

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-white font-sans">
        <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
          <PackageCheck className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Past Orders Found</h2>
        <p className="text-xs text-zinc-400 mb-6 max-w-md mx-auto">
          Test placing a fictional order through our checkout simulator to see live order receipts and tracking history here!
        </p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-extrabold text-xs uppercase hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
        >
          Explore Shop Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 font-sans text-white">
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <PackageCheck className="w-6 h-6 text-cyan-400" />
          <span>Fictional Order History ({orders.length})</span>
        </h1>
        <p className="text-xs text-zinc-400">
          Track Quantum Express delivery statuses and print receipts
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-4"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10 text-xs">
              <div>
                <span className="text-zinc-400 font-mono">Order ID: </span>
                <strong className="text-white font-mono">{order.orderId}</strong>
                <span className="text-zinc-500 ml-3 font-mono">Placed on {order.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px] border border-emerald-500/30 flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  {order.status}
                </span>

                <button
                  onClick={() => window.print()}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                  title="Print Receipt"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 rounded-2xl bg-black border border-white/10 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-xl"
                    />
                    <div>
                      <h4 className="font-bold text-white">{item.product.name}</h4>
                      <span className="text-zinc-500 font-mono">
                        Qty: {item.quantity} x {formatPrice(item.product.price)}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-cyan-400 font-bold">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Footer */}
            <div className="pt-2 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Total Paid ({order.paymentMethod}):</span>
              <span className="text-lg font-black text-white">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
