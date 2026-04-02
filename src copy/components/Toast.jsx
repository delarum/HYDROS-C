import React, { useEffect, useState } from 'react';

function Toast({ title, message, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className={`fixed bottom-8 right-8 z-100 transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="glass-panel px-6 py-4 rounded-xl border-l-4 border-emerald-500 flex items-center gap-4 min-w-75">
        <i className="fas fa-check-circle text-emerald-400 text-xl"></i>
        <div>
          <h4 className="font-semibold text-white text-sm">{title}</h4>
          <p className="text-xs text-slate-400">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Toast;