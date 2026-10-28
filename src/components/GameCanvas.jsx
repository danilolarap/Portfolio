'use client';

import { useEffect, useRef, useState } from 'react';

export default function GameCanvas({ onInteract }) {
  const canvasRef = useRef(null);
  const minimapRef = useRef(null);
  const [nearStation, setNearStation] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const minimap = minimapRef.current;
    const miniCtx = minimap ? minimap.getContext('2d') : null;

    // Ajustar tamaño del Canvas al 100% de la ventana dinámicamente
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const TILE = 32;

    // Steve (Jugador)
    const player = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      w: 28,
      h: 36,
      speed: 4,
      animFrame: 0,
      animTimer: 0,
      isMoving: false
    };

    const keys = {
      w: false, a: false, s: false, d: false,
      ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false
    };

    let currentNear = null;

    const handleKeyDown = (e) => {
      if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
      if ((e.key === 'e' || e.key === 'E' || e.key === ' ') && currentNear) {
        onInteract(currentNear.id);
      }
    };

    const handleKeyUp = (e) => {
      if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animId;

    const loop = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Calcular posiciones relativas para las 4 estaciones según resolución
      const stations = [
        { id: 'proyectos', label: 'COFRE PROYECTOS', x: W * 0.25, y: H * 0.3, w: 100, h: 80, color: '#b45309', icon: '📦' },
        { id: 'skills', label: 'ENCANTAMIENTOS', x: W * 0.7, y: H * 0.3, w: 100, h: 80, color: '#6b21a8', icon: '🔮' },
        { id: 'biografia', label: 'LIBRERÍA BIO', x: W * 0.25, y: H * 0.7, w: 100, h: 80, color: '#854d0e', icon: '📚' },
        { id: 'contacto', label: 'REDSTONE CONTACTO', x: W * 0.7, y: H * 0.7, w: 100, h: 80, color: '#991b1b', icon: '🔴' }
      ];

      // Movimiento
      let dx = 0;
      let dy = 0;

      if (keys.w || keys.ArrowUp) dy -= 1;
      if (keys.s || keys.ArrowDown) dy += 1;
      if (keys.a || keys.ArrowLeft) dx -= 1;
      if (keys.d || keys.ArrowRight) dx += 1;

      player.isMoving = dx !== 0 || dy !== 0;

      if (player.isMoving) {
        player.animTimer++;
        if (player.animTimer % 6 === 0) player.animFrame++;

        if (dx !== 0 && dy !== 0) {
          dx *= 0.7071;
          dy *= 0.7071;
        }

        const nextX = player.x + dx * player.speed;
        const nextY = player.y + dy * player.speed;

        if (nextX >= TILE && nextX <= W - TILE - player.w) player.x = nextX;
        if (nextY >= TILE + 40 && nextY <= H - TILE - player.h) player.y = nextY;
      }

      // Proximidad
      currentNear = null;
      stations.forEach(st => {
        const cx = st.x + st.w / 2;
        const cy = st.y + st.h / 2;
        const dist = Math.hypot((player.x + 14) - cx, (player.y + 18) - cy);
        if (dist < 110) currentNear = st;
      });

      setNearStation(currentNear);

      // --- RENDERIZADO ---
      ctx.clearRect(0, 0, W, H);

      // Suelo de Pasto Minecraft
      ctx.fillStyle = '#4d7c0f';
      ctx.fillRect(0, 0, W, H);

      for (let x = 0; x < W; x += TILE * 2) {
        for (let y = 0; y < H; y += TILE * 2) {
          ctx.fillStyle = '#65a30d';
          ctx.fillRect(x + 4, y + 4, 8, 8);
          ctx.fillStyle = '#3f6212';
          ctx.fillRect(x + 20, y + 20, 10, 10);
        }
      }

      // Muros de Adoquín en los Bordes
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, 0, W, TILE);
      ctx.fillRect(0, H - TILE, W, TILE);
      ctx.fillRect(0, 0, TILE, H);
      ctx.fillRect(W - TILE, 0, TILE, H);

      // Dibujar Estaciones
      stations.forEach(st => {
        const isNear = currentNear && currentNear.id === st.id;

        // Estructura
        ctx.fillStyle = st.color;
        ctx.fillRect(st.x, st.y, st.w, st.h);

        ctx.strokeStyle = isNear ? '#fde047' : '#000000';
        ctx.lineWidth = isNear ? 4 : 2;
        ctx.strokeRect(st.x, st.y, st.w, st.h);

        // Cartel inferior
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(st.x - 10, st.y + st.h + 4, st.w + 20, 18);
        ctx.fillStyle = isNear ? '#fde047' : '#ffffff';
        ctx.font = '8px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText(st.label, st.x + st.w / 2, st.y + st.h + 16);

        // Alerta flotante [E] ABRIR
        if (isNear) {
          ctx.fillStyle = '#fde047';
          ctx.fillRect(st.x + st.w / 2 - 45, st.y - 30, 90, 22);
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2;
          ctx.strokeRect(st.x + st.w / 2 - 45, st.y - 30, 90, 22);

          ctx.fillStyle = '#000000';
          ctx.font = '8px "Press Start 2P"';
          ctx.fillText('[E] ABRIR', st.x + st.w / 2, st.y - 15);
        }
      });

      // Dibujar Steve
      const legOffset = player.isMoving ? Math.sin(player.animFrame * 0.4) * 4 : 0;
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(player.x + 14, player.y + 34, 12, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Piernas
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(player.x + 4, player.y + 20 + legOffset, 8, 14);
      ctx.fillRect(player.x + 16, player.y + 20 - legOffset, 8, 14);

      // Camiseta Steve
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(player.x + 2, player.y + 8, 24, 14);

      // Cabeza
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(player.x + 4, player.y - 8, 20, 16);
      ctx.fillStyle = '#451a03';
      ctx.fillRect(player.x + 4, player.y - 8, 20, 5); // Cabello

      // Ojos
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(player.x + 6, player.y, 5, 4);
      ctx.fillRect(player.x + 15, player.y, 5, 4);
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(player.x + 8, player.y, 3, 4);
      ctx.fillRect(player.x + 15, player.y, 3, 4);

      // Nombre
      ctx.fillStyle = '#ffffff';
      ctx.font = '8px "Press Start 2P"';
      ctx.textAlign = 'center';
      ctx.fillText('DANILO', player.x + 14, player.y - 14);

      // Render Minimapa Esquina Superior Derecha
      if (miniCtx) {
        miniCtx.clearRect(0, 0, 120, 80);
        miniCtx.fillStyle = '#0f172a';
        miniCtx.fillRect(0, 0, 120, 80);

        const sx = 120 / W;
        const sy = 80 / H;

        stations.forEach(s => {
          miniCtx.fillStyle = s.color;
          miniCtx.fillRect(s.x * sx, s.y * sy, s.w * sx, s.h * sy);
        });

        miniCtx.fillStyle = '#ef4444';
        miniCtx.fillRect(player.x * sx, player.y * sy, 6, 6);
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onInteract]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Canvas ocupa el 100% real de la pantalla */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Minimapa ordenado en la esquina superior derecha */}
      <div className="absolute top-4 right-4 bg-black/80 border-2 border-white p-1 rounded shadow-xl flex flex-col items-center z-10">
        <span className="text-[6px] text-yellow-300 font-bold mb-1">MAPA</span>
        <canvas ref={minimapRef} width={120} height={80} className="bg-slate-900 border border-slate-700" />
      </div>

      {/* Controles en la parte inferior izquierda */}
      <div className="absolute bottom-4 left-4 bg-black/80 border border-slate-600 px-3 py-2 text-[8px] text-gray-200 rounded z-10">
        🕹️ <span className="text-yellow-400">WASD / Flechas</span> para caminar | <span className="text-yellow-400">[E]</span> abrir
      </div>
    </div>
  );
}