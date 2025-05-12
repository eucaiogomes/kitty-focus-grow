
import React from 'react';
import { catStages } from './Cat';

type FocusStatsProps = {
  focusMinutes: number;
  currentStage: number;
};

const FocusStats: React.FC<FocusStatsProps> = ({ focusMinutes, currentStage }) => {
  const nextStage = catStages[currentStage + 1];
  const minutesToNextStage = nextStage ? nextStage.time - focusMinutes : null;

  return (
    <div className="bg-secondary/50 rounded-lg p-4 backdrop-blur-sm">
      <h3 className="font-medium text-sm text-primary mb-2">Estatísticas de Foco</h3>
      
      <div className="text-xs space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tempo total de foco:</span>
          <span className="font-medium">{focusMinutes} minutos</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Estágio atual:</span>
          <span className="font-medium">{catStages[currentStage].name}</span>
        </div>
        
        {minutesToNextStage !== null && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Próximo estágio em:</span>
            <span className="font-medium">{minutesToNextStage} minutos</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FocusStats;
