
import React from 'react';
import { cn } from '@/lib/utils';

type CatProps = {
  stage: number;
  className?: string;
};

export const catStages = [
  { name: 'Kitten', time: 0, description: 'Uma gatinha bebê que acabou de acordar!' },
  { name: 'Playful Cat', time: 5, description: 'Gatinha brincalhona cheia de energia!' },
  { name: 'Focused Cat', time: 15, description: 'Gatinha concentrada nos estudos!' },
  { name: 'Scholar Cat', time: 30, description: 'Gatinha estudiosa de óculos!' },
  { name: 'Master Cat', time: 60, description: 'Gatinha mestra da concentração!' },
];

const Cat: React.FC<CatProps> = ({ stage, className }) => {
  const catImages = [
    (
      <div className={cn("w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-4xl", className)}>
        😺
      </div>
    ),
    (
      <div className={cn("w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-4xl", className)}>
        😸
      </div>
    ),
    (
      <div className={cn("w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-4xl", className)}>
        😼
      </div>
    ),
    (
      <div className={cn("w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-4xl", className)}>
        😻
      </div>
    ),
    (
      <div className={cn("w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-4xl", className)}>
        🐱
      </div>
    ),
  ];

  return (
    <div className="cat-evolution">
      {catImages[stage]}
    </div>
  );
};

export default Cat;
