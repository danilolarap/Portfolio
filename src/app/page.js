'use client';

import { useState } from 'react';
import { gameData } from '@/data/gameData';
import GameCanvas from '@/components/GameCanvas';
import InventoryModal from '@/components/InventoryModal';
import QuestLog from '@/components/QuestLog';
import AboutModal from '@/components/AboutModal';
import ContactModal from '@/components/ContactModal';

export default function Home() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black select-none">
      
      {/* HUD Superior Flotante */}
      <header className="absolute top-3 left-4 z-20 flex items-center gap-3 bg-black/70 border-2 border-white p-2.5 rounded shadow-2xl">
        <div className="w-8 h-8 bg-sky-600 border border-white flex items-center justify-center text-xs font-bold text-white">
          DL
        </div>
        <div>
          <h1 className="text-xs font-bold text-white">{gameData.player.name}</h1>
          <p className="text-[7px] text-gray-300">{gameData.player.class} • {gameData.player.location}</p>
        </div>
      </header>

      {/* Juego a Pantalla Completa */}
      <GameCanvas onInteract={(zoneId) => setActiveModal(zoneId)} />

      {/* Ventanas Desplegables Flotantes */}
      <InventoryModal
        isOpen={activeModal === 'proyectos'}
        onClose={() => setActiveModal(null)}
        data={gameData}
      />

      <QuestLog
        isOpen={activeModal === 'skills'}
        onClose={() => setActiveModal(null)}
        data={gameData}
      />

      <AboutModal
        isOpen={activeModal === 'biografia'}
        onClose={() => setActiveModal(null)}
        player={gameData.player}
      />

      <ContactModal
        isOpen={activeModal === 'contacto'}
        onClose={() => setActiveModal(null)}
      />

    </main>
  );
}