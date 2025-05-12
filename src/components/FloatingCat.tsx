
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { catStages } from './Cat';
import { MessageSquare } from 'lucide-react';

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
    if (focusMinutes > 0 && focusMinutes % 5 === 0) {
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

  const catEmojis = ["😺", "😸", "😼", "😻", "🐱"];
  const catEmoji = catEmojis[stage];

  return (
    <div className="fixed bottom-4 right-4 z-50">
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
          onClick={showMotivationalMessage}
          className={cn(
            "w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-3xl cursor-pointer shadow-lg hover:scale-110 transition-all duration-300",
            isAnimating && "animate-bounce"
          )}
        >
          {catEmoji}
        </div>
      </div>
    </div>
  );
};

export default FloatingCat;
