import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';
import {
  CheckCircle2,
  PackageCheck,
  Truck,
  Printer,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export const OrderSuccessModal: React.FC<{ order: Order | null; onClose: () => void }> = ({
  order,
  onClose,
}) => {
  const { formatPrice, setActiveView } = useStore();

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto font-sans">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-zinc-950 border border-cyan-500/40 shadow-[0_0_80px_rgba(0,240,255,0.3)] overflow-hidden text-white my-8 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto shadow-[0_0_30px_#00f0ff]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
            Order Confirmed!
          </h2>
          <p className="text-xs text-cyan-400 font-mono">
            Tracking ID: <strong className="text-white">{order.orderId}</strong>
          </p>
        </div>

        {/* Delivery Timeline Graphic */}
        <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Status:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Truck className="w-4 h-4 animate-bounce" />
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-[10px] text-center font-mono">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300">
              ✓ Order Processed
            </div>
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300">
              ⚡ Quantum Packaged
            </div>
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-zinc-400">
              🚚 In Transit
            </div>
          </div>
        </div>

        {/* Order Receipt Breakdown */}
        <div className="space-y-3 text-xs">
          <h4 className="font-bold text-zinc-300 uppercase tracking-wider">
            Items Purchased ({order.items.length})
          </h4>

          <div className="space-y-2 max-h-36 overflow-y-auto pr-2">
            {order.items.map((item) => (
              <div
                key={item.product.id}
                className="p-2.5 rounded-xl bg-black border border-white/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-8 h-8 object-cover rounded-lg"
                  />
                  <div>
                    <span className="font-bold text-white block">{item.product.name}</span>
                    <span className="text-[10px] text-zinc-500">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-mono text-cyan-400 font-bold">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 flex items-baseline justify-between font-mono">
            <span className="text-zinc-400">Total Paid:</span>
            <span className="text-xl font-extrabold text-cyan-400">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.print()}
            className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 flex items-center justify-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={() => {
              onClose();
              setActiveView('shop');
            }}
            className="flex-1 py-3 rounded-xl bg-cyan-500 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-black" />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
};
