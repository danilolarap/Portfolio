"use client";

import { useEffect, useState } from "react";
import { content, type Language } from "@/data/content";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [preferencesReady, setPreferencesReady] = useState(false);

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("portfolio-language");
      const savedTheme = localStorage.getItem("portfolio-theme");
      if (savedLanguage === "es" || savedLanguage === "en")
        setLanguage(savedLanguage);
      if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
      setMusicEnabled(localStorage.getItem("portfolio-music") !== "off");
    } catch {
      // Use the defaults when browser storage is unavailable.
    }
    setPreferencesReady(true);
  }, []);

  useEffect(() => {
    if (!preferencesReady) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = language;
    try {
      localStorage.setItem("portfolio-language", language);
      localStorage.setItem("portfolio-theme", theme);
      localStorage.setItem("portfolio-music", musicEnabled ? "on" : "off");
    } catch {
      // Keep preferences in memory when storage is unavailable.
    }
  }, [language, theme, musicEnabled, preferencesReady]);

  const copy = content[language];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 700);
    return () => window.clearTimeout(timer);
  }, [theme]);

  return (
    <>
      <BackgroundMusic enabled={preferencesReady && musicEnabled} />
      <Navbar
        theme={theme}
        onThemeChange={() => {
          document.documentElement.classList.add("theme-transitioning");
          setTheme((current) => (current === "dark" ? "light" : "dark"));
        }}
        language={language}
        copy={copy}
        onLanguageChange={() =>
          setLanguage((current) => (current === "es" ? "en" : "es"))
        }
      />
      <main>
        <Hero
          copy={copy}
          theme={theme}
          musicEnabled={musicEnabled}
          onMusicChange={() => setMusicEnabled((current) => !current)}
        />
        <About copy={copy} />
        <Projects copy={copy} />
        <Testimonials copy={copy} />
        <Experience copy={copy} />
        <Contact copy={copy} />
        <Skills copy={copy} />
      </main>
      <Footer copy={copy} />
    </>
  );
}
