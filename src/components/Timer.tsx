
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Timer as TimerIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type TimerProps = {
  onMinutePassed: () => void;
  onReset: () => void;
};

const Timer: React.FC<TimerProps> = ({ onMinutePassed, onReset }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionTime, setSessionTime] = useState(25); // 25 minutes by default
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1;
          
          // If a minute has passed, call the callback
          if (newSeconds % 60 === 0) {
            onMinutePassed();
            
            // Show toast every 5 minutes
            if (newSeconds % 300 === 0) {
              toast({
                title: "Foco mantido!",
                description: `Você está focado há ${newSeconds / 60} minutos. Continue assim!`,
              });
            }
          }
          
          return newSeconds;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, onMinutePassed, toast]);

  const formattedTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = () => {
    return (seconds / (sessionTime * 60)) * 100;
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
    onReset();
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="text-primary h-5 w-5" />
          <span className="text-2xl font-bold">{formattedTime()}</span>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Meta: {sessionTime}:00</span>
        </div>
      </div>
      
      <Progress value={progressPercentage()} className="h-2" />
      
      <div className="flex gap-2">
        <Button 
          onClick={() => setIsRunning(!isRunning)} 
          variant={isRunning ? "secondary" : "default"}
          className="flex-1"
        >
          {isRunning ? "Pausar" : "Iniciar"}
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex gap-1">
          <TimerIcon className="h-4 w-4" />
          Reiniciar
        </Button>
      </div>
    </div>
  );
};

export default Timer;
