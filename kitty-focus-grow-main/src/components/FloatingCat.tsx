
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FloatingCatProps {
  stage: number;
  focusMinutes: number;
}

const motivationalMessages = [
  "Continue assim!",
  "Você está indo muito bem!",
  "Mantenha o foco!",
  "Seu progresso é incrível!",
  "Missão cumprida!",
  "Seu gatinho está orgulhoso!",
  "Tempo de qualidade!",
  "Continue focado!",
];

const FloatingCat: React.FC<FloatingCatProps> = ({ stage, focusMinutes }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });

  // Mostrar mensagens motivacionais periodicamente
  useEffect(() => {
    const messageInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance de mostrar mensagem
        showMotivationalMessage();
      }
    }, 60000); // Verifica a cada minuto

    return () => clearInterval(messageInterval);
  }, []);

  // Mostrar mensagem quando alcançar marcos de tempo
  useEffect(() => {
    // Mostrar mensagem quando atingir novos 5 minutos
    if (focusMinutes > 0 && Math.floor(focusMinutes) % 5 === 0 && Math.floor(focusMinutes) === focusMinutes) {
      showMotivationalMessage();
    }
  }, [focusMinutes]);

  const showMotivationalMessage = () => {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setMessage(randomMessage);
    setShowMessage(true);
    setIsAnimating(true);

    // Esconder mensagem após alguns segundos
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);

    // Parar animação
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  // Funcionalidade de arrastar
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - 25,
          y: e.clientY - 25
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const catEmojis = ["😺", "😸", "😼", "😻", "🐱"];
  const catEmoji = catEmojis[stage];

  return (
    <div 
      className="fixed z-[9999]" 
      style={{ 
        top: `${position.y}px`, 
        left: `${position.x}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <div className="relative">
        {/* Balão de mensagem */}
        {showMessage && (
          <div className="absolute bottom-full right-0 mb-2 p-2 bg-white border border-primary rounded-lg shadow-lg max-w-[200px] text-xs">
            <div className="relative">
              <p className="text-center">{message}</p>
              <div className="absolute -bottom-2 right-4 w-3 h-3 bg-white border-r border-b border-primary rotate-45"></div>
            </div>
          </div>
        )}
        
        {/* Gato flutuante */}
        <div 
          onMouseDown={handleMouseDown}
          onClick={showMotivationalMessage}
          className={cn(
            "w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-3xl cursor-pointer shadow-lg hover:scale-110 transition-all duration-300",
            isAnimating && "animate-bounce"
          )}
        >
          <div className="flex items-center justify-center h-full">
            {catEmoji}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCat;
