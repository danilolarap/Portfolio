"use client";

import { useState } from "react";
import {
  navigationIds,
  type Language,
  type PortfolioContent,
} from "@/data/content";

interface NavbarProps {
  theme: "light" | "dark";
  onThemeChange: () => void;
  musicEnabled: boolean;
  onMusicChange: () => void;
  language: Language;
  copy: PortfolioContent;
  onLanguageChange: () => void;
}

export default function Navbar({
  theme,
  onThemeChange,
  musicEnabled,
  onMusicChange,
  language,
  copy,
  onLanguageChange,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <a
          className="brand-lockup"
          href="#home"
          onClick={() => setMenuOpen(false)}
          aria-label="Portfolio"
        >
          <span className="brand-cube" aria-hidden="true">
            <span />
          </span>
          <span className="brand-name">PORTFOLIO</span>
        </a>
        <nav
          className={`site-links ${menuOpen ? "is-open" : ""}`}
          aria-label={copy.navigation.home}
        >
          {navigationIds.map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {copy.navigation[id]}
            </a>
          ))}
        </nav>
        <div className="nav-controls">
          <button
            className="music-switch"
            type="button"
            role="switch"
            aria-checked={musicEnabled}
            aria-label={copy.settings.music}
            title={`${copy.settings.music}: ${musicEnabled ? copy.settings.enabled : copy.settings.disabled}`}
            onClick={onMusicChange}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 9v6h4l5 4V5L8 9H4Z" />
              {musicEnabled ? (
                <>
                  <path d="M16 9a4 4 0 0 1 0 6" />
                  <path d="M19 6a8 8 0 0 1 0 12" />
                </>
              ) : (
                <path d="m17 9 5 6m0-6-5 6" />
              )}
            </svg>
          </button>
          <button
            className="language-switch"
            type="button"
            onClick={onLanguageChange}
            aria-label={copy.languageLabel}
            title={copy.languageLabel}
          >
            <span className={language === "es" ? "active" : ""}>ES</span>
            <span className="language-divider">/</span>
            <span className={language === "en" ? "active" : ""}>EN</span>
          </button>
          <button
            className="theme-switch"
            type="button"
            onClick={onThemeChange}
            aria-label={
              theme === "dark"
                ? copy.settings.lightMode
                : copy.settings.darkMode
            }
            title={
              theme === "dark"
                ? copy.settings.lightMode
                : copy.settings.darkMode
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {theme === "dark" ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2" />
                </>
              ) : (
                <path d="M20.8 14A9 9 0 0 1 10 3.2 9 9 0 1 0 20.8 14Z" />
              )}
            </svg>
          </button>
          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? copy.menuClose : copy.menuOpen}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
        aria-label={copy.navigation.home}
      >
        {navigationIds.map((id, index) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            {copy.navigation[id]}
          </a>
        ))}
      </nav>
    </header>
  );
}
