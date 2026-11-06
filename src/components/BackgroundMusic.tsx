"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic({ enabled }: { enabled: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    if (!enabled) {
      audio.pause();
      return;
    }
    const play = () => {
      if (audio.paused) void audio.play().catch(() => {});
    };
    play();
    // Browsers may require a user interaction before allowing sound.
    window.addEventListener("pointerdown", play);
    window.addEventListener("keydown", play);
    return () => {
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("keydown", play);
      audio.pause();
    };
  }, [enabled]);

  return (
    <audio ref={audioRef} src="/audio/Minefolio.mp3" loop preload="none" />
  );
}
