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

const languageStorageKey = "portfolio-language";

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(languageStorageKey);
    if (savedLanguage === "es" || savedLanguage === "en")
      setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(languageStorageKey, language);
  }, [language]);

  const copy = content[language];

  return (
    <>
      <Navbar
        language={language}
        copy={copy}
        onLanguageChange={() =>
          setLanguage((current) => (current === "es" ? "en" : "es"))
        }
      />
      <main>
        <Hero copy={copy} />
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
