'use client';

import { useEffect, useRef, useState } from 'react';

interface Orb {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  emotion: string;
  intensity: number;
  pulsePhase: number;
  trailPoints: { x: number; y: number; alpha: number }[];
}

const emotions = [
  { name: 'Joy', color: '#FFD700', lightColor: '#FFFF99' },
  { name: 'Sadness', color: '#4169E1', lightColor: '#87CEEB' },
  { name: 'Anger', color: '#FF4500', lightColor: '#FF6347' },
  { name: 'Fear', color: '#9370DB', lightColor: '#DDA0DD' },
  { name: 'Disgust', color: '#32CD32', lightColor: '#90EE90' },
  { name: 'Surprise', color: '#FF69B4', lightColor: '#FFB6C1' },
];

export default function InsideOutOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const orbsRef = useRef<Orb[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [selectedOrb, setSelectedOrb] = useState<Orb | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize orbs
    const initOrbs = () => {
      orbsRef.current = [];
      for (let i = 0; i < 12; i++) {
        const emotion = emotions[i % emotions.length];
        const orb: Orb = {
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: 20 + Math.random() * 40,
          color: emotion.color,
          emotion: emotion.name,
          intensity: 0.5 + Math.random() * 0.5,
          pulsePhase: Math.random() * Math.PI * 2,
          trailPoints: [],
        };
        orbsRef.current.push(orb);
      }
    };

    initOrbs();

    const drawOrb = (orb: Orb) => {
      const currentTime = Date.now() * 0.001;
      const pulseScale = 1 + Math.sin(currentTime * 2 + orb.pulsePhase) * 0.2;
      const currentRadius = orb.radius * pulseScale;

      // Draw trail
      orb.trailPoints.forEach((point, index) => {
        const alpha = point.alpha * (index / orb.trailPoints.length);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = orb.color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, currentRadius * 0.3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      // Create gradient for orb
      const gradient = ctx.createRadialGradient(
        orb.x - currentRadius * 0.3,
        orb.y - currentRadius * 0.3,
        0,
        orb.x,
        orb.y,
        currentRadius
      );
      
      const emotion = emotions.find(e => e.name === orb.emotion);
      if (emotion) {
        gradient.addColorStop(0, emotion.lightColor);
        gradient.addColorStop(0.7, emotion.color);
        gradient.addColorStop(1, emotion.color + '80');
      }

      // Draw main orb
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw inner glow
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = emotion?.lightColor || '#FFFFFF';
      ctx.beginPath();
      ctx.arc(orb.x - currentRadius * 0.2, orb.y - currentRadius * 0.2, currentRadius * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // Draw outer glow
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = orb.color;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, currentRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;

      // Draw emotion label when selected
      if (selectedOrb && selectedOrb.id === orb.id) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(orb.emotion, orb.x, orb.y - currentRadius - 20);
      }
    };

    const updateOrbs = () => {
      orbsRef.current.forEach((orb) => {
        // Update position
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Add trail point
        orb.trailPoints.push({ x: orb.x, y: orb.y, alpha: 1 });
        if (orb.trailPoints.length > 8) {
          orb.trailPoints.shift();
        }

        // Update trail alpha
        orb.trailPoints.forEach((point, index) => {
          point.alpha = index / orb.trailPoints.length;
        });

        // Mouse interaction
        const dx = mouseRef.current.x - orb.x;
        const dy = mouseRef.current.y - orb.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          orb.vx += (dx / distance) * force * 0.1;
          orb.vy += (dy / distance) * force * 0.1;
        }

        // Bounce off walls
        if (orb.x - orb.radius < 0 || orb.x + orb.radius > canvas.width) {
          orb.vx *= -0.8;
          orb.x = Math.max(orb.radius, Math.min(canvas.width - orb.radius, orb.x));
        }
        if (orb.y - orb.radius < 0 || orb.y + orb.radius > canvas.height) {
          orb.vy *= -0.8;
          orb.y = Math.max(orb.radius, Math.min(canvas.height - orb.radius, orb.y));
        }

        // Apply friction
        orb.vx *= 0.99;
        orb.vy *= 0.99;

        // Random movement
        orb.vx += (Math.random() - 0.5) * 0.1;
        orb.vy += (Math.random() - 0.5) * 0.1;

        // Limit velocity
        const maxVel = 3;
        const vel = Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy);
        if (vel > maxVel) {
          orb.vx = (orb.vx / vel) * maxVel;
          orb.vy = (orb.vy / vel) * maxVel;
        }
      });
    };

    const drawBackground = () => {
      // Create animated gradient background
      const time = Date.now() * 0.001;
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      gradient.addColorStop(0, `hsl(${(time * 20) % 360}, 20%, 5%)`);
      gradient.addColorStop(0.5, `hsl(${(time * 15 + 120) % 360}, 15%, 8%)`);
      gradient.addColorStop(1, `hsl(${(time * 10 + 240) % 360}, 25%, 12%)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      drawBackground();
      updateOrbs();
      
      orbsRef.current.forEach(drawOrb);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Mouse click handler
    const handleMouseClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      
      const clickedOrb = orbsRef.current.find(orb => {
        const distance = Math.sqrt((clickX - orb.x) ** 2 + (clickY - orb.y) ** 2);
        return distance < orb.radius;
      });

      if (clickedOrb) {
        setSelectedOrb(clickedOrb);
        // Add explosion effect
        clickedOrb.vx += (Math.random() - 0.5) * 5;
        clickedOrb.vy += (Math.random() - 0.5) * 5;
      } else {
        setSelectedOrb(null);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleMouseClick);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleMouseClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedOrb]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
        style={{ background: 'radial-gradient(circle, #1a1a2e 0%, #0f0f23 100%)' }}
      />
      
      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            hyrk.io
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Where emotions meet innovation
          </p>
          <button className="pointer-events-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:scale-105 transition-transform">
            Explore Your Emotions
          </button>
        </div>
      </div>

      {/* Emotion info panel */}
      {selectedOrb && (
        <div className="absolute top-4 right-4 bg-black/80 text-white p-6 rounded-2xl backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-2" style={{ color: selectedOrb.color }}>
            {selectedOrb.emotion}
          </h3>
          <p className="text-sm text-gray-300">
            Click on orbs to discover different emotions
          </p>
          <div className="mt-4">
            <div className="text-xs text-gray-400">Intensity</div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${selectedOrb.intensity * 100}%`,
                  backgroundColor: selectedOrb.color
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-white/70 text-sm">
        <p>💡 Move your mouse to attract orbs</p>
        <p>🎯 Click on orbs to interact with emotions</p>
      </div>
    </div>
  );
}