export default function AchievementBox({ title, description, onClose }) {
  return (
    <div className="fixed top-6 right-6 z-50 bg-[#3a2004] border-4 border-[#895C33] p-4 shadow-2xl flex items-center gap-4 max-w-sm animate-bounce rounded">
      <div className="w-10 h-10 bg-[#e5c158] border-2 border-white flex items-center justify-center text-black font-bold text-xs rounded">
        🏆
      </div>
      <div>
        <h4 className="text-[10px] text-[#fcd116] font-bold">¡Logro Desbloqueado!</h4>
        <p className="text-[9px] text-white mt-1">{title}</p>
        <p className="text-[8px] text-[#cccccc]">{description}</p>
      </div>
      <button 
        onClick={onClose}
        className="ml-auto text-white text-[10px] hover:text-red-400 font-bold px-1"
      >
        ×
      </button>
    </div>
  );
}