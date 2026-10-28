export default function AboutModal({ isOpen, onClose, player }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="mc-modal w-full max-w-lg p-6 relative">
        <div className="flex justify-between items-center border-b-4 border-[#555555] pb-3 mb-4">
          <h2 className="text-xs font-bold text-[#2e2e2e]">📚 LIBRERÍA SOBRE MÍ</h2>
          <button 
            onClick={() => onClose(false)} 
            className="mc-button px-3 py-1 text-[9px] bg-red-700 hover:bg-red-800 text-white font-bold"
          >
            [X]
          </button>
        </div>

        <div className="space-y-4 text-[8px] text-[#222222]">
          <div className="mc-slot p-3">
            <h3 className="text-black font-bold text-xs mb-1">{player.name}</h3>
            <p className="text-[#333333] mb-1">{player.class}</p>
            <p className="text-[#555555]">{player.location}</p>
          </div>

          <p className="leading-relaxed mc-slot p-3">
            Estudiante de Ingeniería de Software en 5to semestre. Especializado en arquitectura backend con Java Spring Boot y NestJS, persistencia en MongoDB y desarrollo de interfaces modernas con Next.js y Tailwind CSS.
          </p>

          <div className="flex justify-between text-[8px] bg-[#a0a0a0] p-2 font-bold text-black border border-[#555555]">
            <span>Nivel: {player.level}</span>
            <span>Experiencia: {player.stats.experience}</span>
          </div>
        </div>
      </div>
    </div>
  );
}