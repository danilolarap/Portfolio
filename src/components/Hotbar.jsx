export default function Hotbar({ activeSlot, setActiveSlot, onOpenInventory }) {
  const slots = [
    { id: 0, label: "Proyectos", key: "1", icon: "📦" },
    { id: 1, label: "Habilidades", key: "2", icon: "⚔️" },
    { id: 2, label: "Biografía", key: "3", icon: "📜" },
    { id: 3, label: "Redstone (Contacto)", key: "4", icon: "🔴" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex items-center bg-[#2b2b2b]/90 p-2 border-4 border-[#373737] shadow-2xl">
      <div className="flex gap-1.5">
        {slots.map((slot, index) => {
          const isActive = activeSlot === index;
          return (
            <button
              key={slot.id}
              onClick={() => {
                setActiveSlot(index);
                if (index === 0) onOpenInventory(true);
              }}
              className={`relative w-12 h-12 flex flex-col items-center justify-center text-xs transition-all ${
                isActive 
                  ? 'border-4 border-white bg-[#8b8b8b]' 
                  : 'minecraft-button bg-[#727272]'
              }`}
            >
              <span className="absolute top-0.5 left-1 text-[7px] text-[#ffffff] font-bold">
                {slot.key}
              </span>
              <span className="text-base mt-1">{slot.icon}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}