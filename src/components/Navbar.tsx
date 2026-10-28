"use client";

import { useState } from "react";
import {
  navigationIds,
  type Language,
  type PortfolioContent,
} from "@/data/content";

interface NavbarProps {
  language: Language;
  copy: PortfolioContent;
  onLanguageChange: () => void;
}

export default function Navbar({
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
