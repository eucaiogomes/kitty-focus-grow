
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import FloatingCat from './FloatingCat';

const FloatingCatExtension: React.FC = () => {
  const [focusMinutes, setFocusMinutes] = useState(() => {
    const saved = localStorage.getItem('focusMinutes');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [catStage, setCatStage] = useState(() => {
    // Calculate initial cat stage based on saved focus minutes
    const saved = localStorage.getItem('focusMinutes');
    const minutes = saved ? parseInt(saved, 10) : 0;
    
    // Find the highest stage that corresponds to the user's focus minutes
    const catStages = [
      { name: 'Kitten', time: 0 },
      { name: 'Playful Cat', time: 5 },
      { name: 'Focused Cat', time: 15 },
      { name: 'Scholar Cat', time: 30 },
      { name: 'Master Cat', time: 60 },
    ];
    
    for (let i = catStages.length - 1; i >= 0; i--) {
      if (minutes >= catStages[i].time) {
        return i;
      }
    }
    return 0;
  });

  // Iniciar um temporizador para contar minutos de foco
  useEffect(() => {
    const timer = setInterval(() => {
      // Incrementar o tempo de foco a cada minuto
      setFocusMinutes(prev => {
        const newValue = prev + 1/60; // incrementar 1 segundo convertido para minutos (1/60)
        localStorage.setItem('focusMinutes', newValue.toString());
        return newValue;
      });
    }, 1000); // Atualizar a cada segundo

    return () => clearInterval(timer);
  }, []);

  // Verificar evolução do gato
  useEffect(() => {
    const catStages = [
      { name: 'Kitten', time: 0 },
      { name: 'Playful Cat', time: 5 },
      { name: 'Focused Cat', time: 15 },
      { name: 'Scholar Cat', time: 30 },
      { name: 'Master Cat', time: 60 },
    ];
    
    // Evoluir o gato quando atingir o tempo necessário
    for (let i = 0; i < catStages.length; i++) {
      if (focusMinutes >= catStages[i].time && catStage < i) {
        setCatStage(i);
        break;
      }
    }
  }, [focusMinutes, catStage]);

  return <FloatingCat stage={catStage} focusMinutes={focusMinutes} />;
};

export default FloatingCatExtension;
