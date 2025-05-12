
import React, { useState, useEffect } from 'react';
import Cat, { catStages } from '@/components/Cat';
import Timer from '@/components/Timer';
import FocusStats from '@/components/FocusStats';
import FloatingCat from '@/components/FloatingCat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [focusMinutes, setFocusMinutes] = useState(() => {
    const saved = localStorage.getItem('focusMinutes');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [catStage, setCatStage] = useState(() => {
    // Calculate initial cat stage based on saved focus minutes
    const saved = localStorage.getItem('focusMinutes');
    const minutes = saved ? parseInt(saved, 10) : 0;
    
    // Find the highest stage that corresponds to the user's focus minutes
    for (let i = catStages.length - 1; i >= 0; i--) {
      if (minutes >= catStages[i].time) {
        return i;
      }
    }
    return 0;
  });
  
  const { toast } = useToast();

  // Save focus minutes to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('focusMinutes', focusMinutes.toString());
    
    // Check if we need to evolve the cat
    for (let i = 0; i < catStages.length; i++) {
      if (focusMinutes >= catStages[i].time && catStage < i) {
        setCatStage(i);
        toast({
          title: "Sua gatinha evoluiu!",
          description: `${catStages[i].name}: ${catStages[i].description}`,
        });
        break;
      }
    }
  }, [focusMinutes, catStage, toast]);

  const handleMinutePassed = () => {
    setFocusMinutes(prev => prev + 1);
  };

  const handleReset = () => {
    if (confirm("Tem certeza que deseja reiniciar o progresso do seu gatinho?")) {
      setFocusMinutes(0);
      setCatStage(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/50 to-background p-4">
      <div className="max-w-md mx-auto">
        <Card className="backdrop-blur-sm bg-background/90 border-primary/20 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-center text-primary">Foco Gatinho</CardTitle>
            <CardDescription className="text-center">
              Mantenha o foco e veja sua gatinha evoluir!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="cat-container flex justify-center py-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Cat stage={catStage} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{catStages[catStage].name}: {catStages[catStage].description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="flex justify-center">
              <Timer onMinutePassed={handleMinutePassed} onReset={handleReset} />
            </div>
            
            <FocusStats 
              focusMinutes={focusMinutes} 
              currentStage={catStage} 
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Gato Flutuante */}
      <FloatingCat stage={catStage} focusMinutes={focusMinutes} />
    </div>
  );
};

export default Index;
