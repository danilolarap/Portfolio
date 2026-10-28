'use client';

import { useEffect } from 'react';
import VoxelCard from './VoxelCard';

export default function InventoryModal({ isOpen, onClose, data }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'e' || e.key === 'E') {
        onClose(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="mc-modal-container">
      <div className="mc-modal p-6 relative">
        <div className="flex justify-between items-center border-b-4 border-[#555555] pb-3 mb-6">
          <div>
            <h2 className="text-xs font-bold text-[#2e2e2e]">📦 INVENTARIO DE PROYECTOS</h2>
            <p className="text-[8px] text-[#555555] mt-1">{data.player.name} • Nivel {data.player.level}</p>
          </div>
          <button 
            onClick={() => onClose(false)}
            className="mc-button px-3 py-1.5 text-[9px] bg-red-700 text-white font-bold"
          >
            [X] ESC
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.projects.map((project) => (
            <VoxelCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}