export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="mc-modal w-full max-w-lg p-6 relative">
        <div className="flex justify-between items-center border-b-4 border-[#555555] pb-3 mb-4">
          <h2 className="text-xs font-bold text-[#2e2e2e]">🔴 REDSTONE CONTACTO</h2>
          <button 
            onClick={() => onClose(false)} 
            className="mc-button px-3 py-1 text-[9px] bg-red-700 hover:bg-red-800 text-white font-bold"
          >
            [X]
          </button>
        </div>

        <div className="space-y-4 text-[8px] text-[#222222]">
          <p className="text-[#333333]">Conéctate con mi perfil de desarrollo y repositorios en GitHub:</p>

          <div className="mc-slot p-4 space-y-2">
            <p><strong className="text-black">GitHub:</strong> github.com/danilolarap</p>
            <p><strong className="text-black">Ubicación:</strong> Colombia</p>
            <p><strong className="text-black">Universidad:</strong> Universidad Cooperativa de Colombia</p>
          </div>

          <a
            href="https://github.com/danilolarap"
            target="_blank"
            rel="noopener noreferrer"
            className="mc-button block text-center py-3 text-[9px] font-bold text-white no-underline w-full"
          >
            🔗 Ir al Perfil de GitHub
          </a>
        </div>
      </div>
    </div>
  );
}