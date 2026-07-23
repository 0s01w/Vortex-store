import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NotificationToast: React.FC = () => {
  const { notification } = useStore();

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-zinc-900/90 dark:bg-black/90 text-white backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.25)]"
        >
          {notification.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          )}
          {notification.type === 'info' && (
            <Info className="w-5 h-5 text-indigo-400 shrink-0" />
          )}
          {notification.type === 'warning' && (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          )}
          <span className="text-sm font-medium tracking-wide">
            {notification.message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
