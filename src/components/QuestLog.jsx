'use client';

import { useEffect } from 'react';

export default function QuestLog({ isOpen, onClose, data }) {
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
            <h2 className="text-xs font-bold text-[#2e2e2e]">🔮 HABILIDADES Y ENCANTAMIENTOS</h2>
            <p className="text-[8px] text-[#555555] mt-1">{data.player.name} • {data.player.location}</p>
          </div>
          <button 
            onClick={() => onClose(false)}
            className="mc-button px-3 py-1.5 text-[9px] bg-red-700 text-white font-bold"
          >
            [X] ESC
          </button>
        </div>

        <div className="space-y-4">
          <div className="mc-slot p-4">
            <h3 className="text-xs font-bold text-black mb-2">📜 Estadísticas del Jugador</h3>
            <p className="text-[8px] text-[#222222] mb-1"><strong>Semestre:</strong> {data.player.stats.experience}</p>
            <p className="text-[8px] text-[#222222] mb-1"><strong>Stack Principal:</strong> {data.player.stats.mana}</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {data.skills.map((skill, idx) => (
              <div key={idx} className="mc-slot p-3 flex justify-between items-center">
                <div>
                  <h4 className="text-[9px] font-bold text-black">{skill.name}</h4>
                  <p className="text-[8px] text-[#333333] mt-1">{skill.tools}</p>
                </div>
                <span className="text-[8px] bg-[#373737] text-yellow-300 px-2 py-1 font-bold">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}