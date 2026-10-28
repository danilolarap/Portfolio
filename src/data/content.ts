export type Language = "es" | "en";
export type SectionId =
  | "about"
  | "projects"
  | "testimonials"
  | "experience"
  | "contact"
  | "skills";
export type StationId = "projects" | "skills" | "about" | "contact";

export const navigationIds = [
  "home",
  "about",
  "projects",
  "testimonials",
  "experience",
  "contact",
  "skills",
] as const;

export interface PortfolioContent {
  brandTagline: string;
  navigation: Record<(typeof navigationIds)[number], string>;
  menuOpen: string;
  menuClose: string;
  languageLabel: string;
  hero: {
    eyebrow: string;
    titleFirst: string;
    titleSecond: string;
    description: string;
    explore: string;
    cvUnavailable: string;
    cvNote: string;
  };
  world: {
    title: string;
    mode: string;
    map: string;
    discovered: string;
    completed: string;
    move: string;
    interact: string;
    open: string;
    touchHelp: string;
    playerRole: string;
    stations: Record<StationId, string>;
    stationTitles: Record<StationId, string>;
    stationDescriptions: Record<StationId, string>;
    enterSection: string;
    close: string;
    instructions: string;
    helpTitle: string;
    helpDescription: string;
    helpRows: string[];
    directions: { up: string; down: string; left: string; right: string };
    start: string;
  };
  common: { pending: string; pendingDetail: string; section: string };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    featureTitle: string;
    featureText: string;
    facts: string[];
  };
  projects: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: { index: string; title: string; description: string }[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: string[];
    note: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    intro: string;
    academic: string;
    academicText: string;
    work: string;
    workText: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    github: string;
    githubDescription: string;
    openGithub: string;
    otherChannels: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    intro: string;
    categories: string[];
  };
  footer: { builtWith: string; backToTop: string; rights: string };
}

export const content: Record<Language, PortfolioContent> = {
  es: {
    brandTagline: "UN MUNDO POR EXPLORAR",
    navigation: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      testimonials: "Testimonios",
      experience: "Experiencia",
      contact: "Contacto",
      skills: "Habilidades",
    },
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    languageLabel: "Cambiar idioma a inglés",
    hero: {
      eyebrow: "PORTAFOLIO INTERACTIVO / EDICIÓN 01",
      titleFirst: "Bienvenido a",
      titleSecond: "mi pequeño mundo.",
      description:
        "Explora una sala de bloques, descubre cada estación y recorre el portafolio a tu ritmo.",
      explore: "Explorar secciones",
      cvUnavailable: "CV próximamente",
      cvNote: "La hoja de vida se añadirá con los datos definitivos.",
    },
    world: {
      title: "MUNDO / SALA PRINCIPAL",
      mode: "MODO AVENTURA",
      map: "MAPA",
      discovered: "ZONAS DESCUBIERTAS",
      completed: "MUNDO EXPLORADO",
      move: "MOVERSE",
      interact: "INTERACTUAR",
      open: "ABRIR",
      touchHelp: "Usa el teclado o toca una estación para explorar",
      playerRole: "EXPLORADOR / NIVEL 01",
      stations: {
        projects: "PROYECTOS",
        skills: "HABILIDADES",
        about: "SOBRE MÍ",
        contact: "CONTACTO",
      },
      stationTitles: {
        projects: "Taller de proyectos",
        skills: "Mesa de habilidades",
        about: "Biblioteca personal",
        contact: "Portal de contacto",
      },
      stationDescriptions: {
        projects: "Descubre el espacio reservado para mis creaciones.",
        skills: "Conoce las herramientas que forman parte de mi inventario.",
        about: "Lee la historia detrás del personaje.",
        contact: "Encuentra las formas de conectar conmigo.",
      },
      enterSection: "Ver sección",
      close: "Cerrar",
      instructions: "Cómo jugar",
      helpTitle: "Guía del explorador",
      helpDescription:
        "Muévete por la sala y abre las estaciones. También puedes navegar por las secciones de la página.",
      helpRows: [
        "W A S D o flechas: mover personaje",
        "E: abrir estación cercana",
        "1 a 4: abrir estación directamente",
        "ESC: cerrar ventana",
      ],
      directions: {
        up: "Arriba",
        down: "Abajo",
        left: "Izquierda",
        right: "Derecha",
      },
      start: "Comenzar a explorar",
    },
    common: {
      pending: "PRÓXIMAMENTE",
      pendingDetail: "Contenido pendiente de incorporar.",
      section: "SECCIÓN",
    },
    about: {
      eyebrow: "01 / EL PERSONAJE",
      title: "Detrás del avatar",
      intro:
        "Soy Danilo. Este espacio contará mi historia, mis intereses y la forma en que convierto ideas en proyectos.",
      featureTitle: "Historia en construcción",
      featureText:
        "Añadiremos aquí una presentación personal auténtica, con fotografía o avatar, trayectoria y objetivos.",
      facts: [
        "Presentación personal",
        "Intereses y motivación",
        "Objetivos profesionales",
      ],
    },
    projects: {
      eyebrow: "02 / EL TALLER",
      title: "Proyectos por descubrir",
      intro:
        "Cada proyecto tendrá su propio espacio con contexto, decisiones de diseño, tecnologías, capturas y enlaces.",
      cards: [
        {
          index: "01",
          title: "Proyecto destacado",
          description: "Historia, desafío y resultado del primer proyecto.",
        },
        {
          index: "02",
          title: "Proyecto destacado",
          description: "Proceso de creación y decisiones del segundo proyecto.",
        },
        {
          index: "03",
          title: "Proyecto destacado",
          description: "Demostración y repositorio del tercer proyecto.",
        },
      ],
    },
    testimonials: {
      eyebrow: "03 / VOCES DEL CAMINO",
      title: "Testimonios",
      intro:
        "Aquí se mostrarán recomendaciones reales de personas con quienes he trabajado o estudiado.",
      cards: ["Testimonio 01", "Testimonio 02", "Testimonio 03"],
      note: "Se necesitan tres testimonios reales para completar esta sección.",
    },
    experience: {
      eyebrow: "04 / TRAYECTORIA",
      title: "Experiencia",
      intro:
        "Un recorrido claro por mi formación académica y mi experiencia laboral.",
      academic: "Formación académica",
      academicText: "Institución, programa, fechas y logros relevantes.",
      work: "Experiencia laboral",
      workText: "Rol, organización, periodo y resultados concretos.",
    },
    contact: {
      eyebrow: "05 / EL PORTAL",
      title: "Hablemos",
      intro:
        "Si quieres conocer mi trabajo o conversar sobre una idea, puedes encontrarme en GitHub. Añadiremos los demás canales cuando estén confirmados.",
      github: "GitHub",
      githubDescription: "Repositorios y actividad de desarrollo.",
      openGithub: "Visitar perfil",
      otherChannels: "Correo y otros enlaces: próximamente",
    },
    skills: {
      eyebrow: "06 / INVENTARIO EXTRA",
      title: "Habilidades",
      intro:
        "La sección adicional del portafolio. Aquí organizaremos las herramientas y áreas que forman parte de mi práctica.",
      categories: [
        "Desarrollo frontend",
        "Desarrollo backend",
        "Datos",
        "Herramientas de trabajo",
      ],
    },
    footer: {
      builtWith: "Construido bloque a bloque",
      backToTop: "Volver al inicio",
      rights: "Portafolio personal de Danilo",
    },
  },
  en: {
    brandTagline: "A WORLD TO EXPLORE",
    navigation: {
      home: "Home",
      about: "About",
      projects: "Projects",
      testimonials: "Testimonials",
      experience: "Experience",
      contact: "Contact",
      skills: "Skills",
    },
    menuOpen: "Open menu",
    menuClose: "Close menu",
    languageLabel: "Switch language to Spanish",
    hero: {
      eyebrow: "INTERACTIVE PORTFOLIO / EDITION 01",
      titleFirst: "Welcome to",
      titleSecond: "my little world.",
      description:
        "Explore a room made of blocks, discover each station, and browse the portfolio at your own pace.",
      explore: "Explore sections",
      cvUnavailable: "Resume coming soon",
      cvNote: "The resume will be added with the final personal details.",
    },
    world: {
      title: "WORLD / MAIN ROOM",
      mode: "ADVENTURE MODE",
      map: "MAP",
      discovered: "AREAS DISCOVERED",
      completed: "WORLD EXPLORED",
      move: "MOVE",
      interact: "INTERACT",
      open: "OPEN",
      touchHelp: "Use the keyboard or tap a station to explore",
      playerRole: "EXPLORER / LEVEL 01",
      stations: {
        projects: "PROJECTS",
        skills: "SKILLS",
        about: "ABOUT",
        contact: "CONTACT",
      },
      stationTitles: {
        projects: "Project workshop",
        skills: "Skills table",
        about: "Personal library",
        contact: "Contact portal",
      },
      stationDescriptions: {
        projects: "Discover the space reserved for my work.",
        skills: "See the tools in my inventory.",
        about: "Read the story behind the character.",
        contact: "Find ways to connect with me.",
      },
      enterSection: "View section",
      close: "Close",
      instructions: "How to play",
      helpTitle: "Explorer guide",
      helpDescription:
        "Move around the room and open the stations. You can also browse the page sections directly.",
      helpRows: [
        "W A S D or arrows: move character",
        "E: open nearby station",
        "1 to 4: open a station directly",
        "ESC: close window",
      ],
      directions: { up: "Up", down: "Down", left: "Left", right: "Right" },
      start: "Start exploring",
    },
    common: {
      pending: "COMING SOON",
      pendingDetail: "Content to be added.",
      section: "SECTION",
    },
    about: {
      eyebrow: "01 / THE CHARACTER",
      title: "Behind the avatar",
      intro:
        "I am Danilo. This space will tell my story, my interests, and how I turn ideas into projects.",
      featureTitle: "Story in progress",
      featureText:
        "We will add an authentic personal introduction here, with a photo or avatar, background, and goals.",
      facts: [
        "Personal introduction",
        "Interests and motivation",
        "Professional goals",
      ],
    },
    projects: {
      eyebrow: "02 / THE WORKSHOP",
      title: "Projects to discover",
      intro:
        "Each project will have its own space with context, design decisions, technologies, screenshots, and links.",
      cards: [
        {
          index: "01",
          title: "Featured project",
          description: "Story, challenge, and outcome of the first project.",
        },
        {
          index: "02",
          title: "Featured project",
          description:
            "Creation process and decisions behind the second project.",
        },
        {
          index: "03",
          title: "Featured project",
          description: "Demo and repository for the third project.",
        },
      ],
    },
    testimonials: {
      eyebrow: "03 / VOICES ALONG THE WAY",
      title: "Testimonials",
      intro:
        "This section will feature real recommendations from people I have worked or studied with.",
      cards: ["Testimonial 01", "Testimonial 02", "Testimonial 03"],
      note: "Three real testimonials are needed to complete this section.",
    },
    experience: {
      eyebrow: "04 / THE JOURNEY",
      title: "Experience",
      intro: "A clear timeline of my education and professional experience.",
      academic: "Education",
      academicText: "Institution, program, dates, and relevant achievements.",
      work: "Work experience",
      workText: "Role, organization, dates, and concrete outcomes.",
    },
    contact: {
      eyebrow: "05 / THE PORTAL",
      title: "Let’s talk",
      intro:
        "If you would like to see my work or discuss an idea, you can find me on GitHub. We will add other channels once they are confirmed.",
      github: "GitHub",
      githubDescription: "Repositories and development activity.",
      openGithub: "Visit profile",
      otherChannels: "Email and other links: coming soon",
    },
    skills: {
      eyebrow: "06 / EXTRA INVENTORY",
      title: "Skills",
      intro:
        "The additional section of the portfolio. This is where we will organize the tools and areas that are part of my practice.",
      categories: [
        "Frontend development",
        "Backend development",
        "Data",
        "Work tools",
      ],
    },
    footer: {
      builtWith: "Built block by block",
      backToTop: "Back to top",
      rights: "Danilo’s personal portfolio",
    },
  },
};
