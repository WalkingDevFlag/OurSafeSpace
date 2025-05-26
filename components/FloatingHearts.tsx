
import React, { useState, useEffect, useRef } from 'react';
import { HeartIcon } from '../constants';

interface HeartProps {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDuration: string;
  animationDelay: string;
}

const NUM_HEARTS = 50;
const GLOW_DISTANCE_SQUARED = 150 * 150; // Use squared distance to avoid Math.sqrt

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  
  useEffect(() => {
    const generateHearts = () => {
      const newHearts: HeartProps[] = [];
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Determine grid dimensions for more even distribution
      // Aim for a grid where each heart roughly gets its own cell to start in
      const approxGridDim = Math.max(1, Math.ceil(Math.sqrt(NUM_HEARTS)));
      const GRID_COLS = approxGridDim;
      const GRID_ROWS = Math.max(1, Math.ceil(NUM_HEARTS / GRID_COLS));
      
      const cellWidth = screenWidth / GRID_COLS;
      const cellHeight = screenHeight / GRID_ROWS;

      for (let i = 0; i < NUM_HEARTS; i++) {
        const size = Math.random() * 30 + 15; // Size between 15px and 45px
        
        // Determine cell for this heart
        // FIx: Changed const-col to const col
        const col = i % GRID_COLS;
        // FIx: Changed const-row to const row
        const row = Math.floor(i / GRID_COLS);

        // Calculate position within the cell
        // Ensure heart doesn't overflow cell by much, or at least its origin is well within
        const xOffset = Math.random() * Math.max(0, cellWidth - size);
        const yOffset = Math.random() * Math.max(0, cellHeight - size);

        const x = col * cellWidth + xOffset;
        const y = row * cellHeight + yOffset;

        newHearts.push({
          id: i,
          x: Math.min(x, screenWidth - size), // Ensure it doesn't go off screen right
          y: Math.min(y, screenHeight - size), // Ensure it doesn't go off screen bottom
          size: size,
          opacity: Math.random() * 0.3 + 0.2, // Opacity between 0.2 and 0.5
          animationDuration: `${Math.random() * 5 + 7}s`, // Duration 7s to 12s
          animationDelay: `${Math.random() * (i % GRID_COLS === 0 ? 3 : 7)}s`, // Vary delay more, some start sooner
        });
      }
      setHearts(newHearts);
    };

    generateHearts(); // Initial generation

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleResize = () => {
        generateHearts(); // Re-generate hearts on resize
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map(heart => {
        let isGlowing = false;
        if (mousePosition) {
          const heartCenterX = heart.x + heart.size / 2;
          const heartCenterY = heart.y + heart.size / 2;
          const distanceSquared =
            Math.pow(heartCenterX - mousePosition.x, 2) +
            Math.pow(heartCenterY - mousePosition.y, 2);
          
          if (distanceSquared < GLOW_DISTANCE_SQUARED) {
            isGlowing = true;
          }
        }

        return (
          <div
            key={heart.id}
            className="absolute animate-float"
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              opacity: isGlowing ? Math.min(heart.opacity + 0.5, 0.9) : heart.opacity,
              transform: isGlowing ? 'scale(1.15)' : 'scale(1)',
              filter: isGlowing ? `drop-shadow(0 0 12px rgba(236, 72, 153, 0.8))` : 'none',
              transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out',
              animationDuration: heart.animationDuration,
              animationDelay: heart.animationDelay,
            }}
          >
            <HeartIcon className="w-full h-full text-pink-400" />
          </div>
        );
      })}
    </div>
  );
};

export default FloatingHearts;