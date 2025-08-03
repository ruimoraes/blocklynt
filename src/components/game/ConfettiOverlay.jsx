import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { confetti } from '@tsparticles/confetti';

const ConfettiOverlay = ({ isActive, onComplete }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (isActive && canvasRef.current) {
      
      const canvas = canvasRef.current;
      
      const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min;
      };

      const triggerConfettiBlast = async () => {
        const defaultOptions = {
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          particleCount: randomInRange(50, 100),
          origin: { y: 0.6 },
          canvas: canvas,
        };

        await confetti(defaultOptions);
      };

      triggerConfettiBlast();

      animationRef.current = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 500);

    } else if (!isActive && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isActive, onComplete]);

  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
};

ConfettiOverlay.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onComplete: PropTypes.func,
};

export default ConfettiOverlay;