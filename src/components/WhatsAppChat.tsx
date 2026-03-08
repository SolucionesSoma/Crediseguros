import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const phoneNumber = '573187798503'; // Número de WhatsApp
  const message = 'Hola, estoy interesado en adquirir los servicios';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      bubbleRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        delay: 2,
      }
    );


  }, []);

  return (
    <>
      {/* WhatsApp Bubble */}
      <div
        ref={bubbleRef}
        className="fixed bottom-6 right-6 z-50"
      >
        {/* Chat preview */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-soft-lg p-4 w-72 mb-2 animate-fade-in">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-brand-dark">CrediSeguros</p>
                  <p className="text-xs text-green-500">En línea</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-body hover:text-brand-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 mb-3">
              <p className="text-sm text-brand-body">{message}</p>
              <p className="text-xs text-brand-body/60 mt-1 text-right">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-full font-medium text-sm transition-colors"
            >
              Enviar mensaje
            </a>
          </div>
        )}

        {/* Main button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
          aria-label="Abrir chat de WhatsApp"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      </div>
    </>
  );
};

export default WhatsAppChat;
