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
  playerName: string;
  playerSubtitle: string;
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
  welcome: {
    title: string;
    subtitle: string;
    play: string;
    controls: string;
    back: string;
    keyboardTitle: string;
    mobileTitle: string;
    objective: string;
    menuFooter: string;
    returnToTitle: string;
    joystickLabel: string;
    actionLabel: string;
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
    exit: string;
    tapHint: string;
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
    openRepository: string;
    openProduction: string;
    cards: {
      index: string;
      title: string;
      description: string;
      repository: string;
      production?: string;
    }[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: string[];
  };
  experience: {
    eyebrow: string;
    title: string;
    intro: string;
    academic: string;
    academicItems: { title: string; organization: string }[];
    work: string;
    workItems: { title: string; organization: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    github: string;
    githubDescription: string;
    openGithub: string;
    email: string;
    emailAddress: string;
    openEmail: string;
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
    playerName: "Danilo Lara",
    playerSubtitle:
      "Desarrollador de software · Estudiante de Ingeniería de Software",
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
    welcome: {
      title: "PORTAFOLIO WORLD",
      subtitle: "Un mundo construido bloque a bloque",
      play: "Jugar",
      controls: "Controles",
      back: "Volver",
      keyboardTitle: "Controles de teclado",
      mobileTitle: "Controles táctiles",
      objective:
        "Recorre el mundo, encuentra las edificaciones y acércate para descubrir cada sección del portafolio.",
      menuFooter: "UN JUGADOR · MODO EXPLORACIÓN",
      returnToTitle: "Volver al inicio",
      joystickLabel: "Joystick virtual para moverte",
      actionLabel: "Interactuar con la estación cercana",
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
        projects:
          "Explora mis proyectos y abre sus versiones publicadas o repositorios.",
        skills: "Conoce los lenguajes y tecnologías que utilizo.",
        about: "Conoce mi perfil, mis intereses y lo que me gusta desarrollar.",
        contact: "Visita mi GitHub o escríbeme por correo electrónico.",
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
      exit: "Menú",
      tapHint: "Toca una edificación para seleccionarla",
    },
    common: {
      pending: "PRÓXIMAMENTE",
      pendingDetail: "Contenido pendiente de incorporar.",
      section: "SECCIÓN",
    },
    about: {
      eyebrow: "01 / SOBRE MÍ",
      title: "Sobre mí",
      intro:
        "Desarrollador de software en formación, apasionado por programar y mantenerme en movimiento.",
      featureTitle: "Mi perfil",
      featureText:
        "Mi nombre es Danilo Lara. Soy desarrollador de software y actualmente curso la carrera de Ingeniería de Software. Me apasiona la programación, hacer ejercicio, salir al aire libre y todo lo relacionado con el movimiento. Desarrollo aplicaciones, páginas web y APIs.",
      facts: [
        "Desarrollo de aplicaciones",
        "Desarrollo de páginas web",
        "Desarrollo de APIs",
      ],
    },
    projects: {
      eyebrow: "02 / EL TALLER",
      title: "Proyectos",
      intro:
        "Una selección de proyectos interactivos para organizar espacios, planificar equipaje y explorar interfaces 3D.",
      openRepository: "Ver repositorio",
      openProduction: "Ver proyecto",
      cards: [
        {
          index: "01",
          title: "RoomLayout",
          description:
            "Organizador interactivo de espacios para planificar distribuciones con una interfaz de arrastrar y soltar.",
          repository: "https://github.com/danilolarap/RoomLayout.git",
          production: "https://room-layout-red.vercel.app/",
        },
        {
          index: "02",
          title: "PackGuide",
          description:
            "Organizador de equipaje que optimiza la distribución de artículos dentro de maletas de viaje.",
          repository: "https://github.com/danilolarap/PackGuide.git",
        },
        {
          index: "03",
          title: "TiltClock",
          description:
            "Aplicación de reloj con carátulas interactivas en formato GLB.",
          repository: "https://github.com/danilolarap/TiltClock.git",
          production: "https://tilt-clock.vercel.app/",
        },
      ],
    },
    testimonials: {
      eyebrow: "03 / VOCES DEL CAMINO",
      title: "Testimonios",
      intro: "Esta sección se completará más adelante.",
      cards: [],
    },
    experience: {
      eyebrow: "04 / TRAYECTORIA",
      title: "Experiencia",
      intro: "Mi formación académica y experiencia laboral.",
      academic: "Formación académica",
      academicItems: [
        {
          title: "Bachiller",
          organization: "Colegio San Felipe Neri · Pasto",
        },
        {
          title: "Ingeniería de Software · En curso",
          organization: "Universidad Cooperativa de Colombia",
        },
      ],
      work: "Experiencia laboral",
      workItems: [
        {
          title: "Trabajo en bodega",
          organization: "Bodega de relojes",
        },
        {
          title: "Jefe de bodega",
          organization: "Bodega de zapatos",
        },
        {
          title: "Vendedor",
          organization: "Tienda de ropa",
        },
      ],
    },
    contact: {
      eyebrow: "05 / EL PORTAL",
      title: "Hablemos",
      intro:
        "Puedes ver mis proyectos en GitHub o escribirme por correo electrónico.",
      github: "GitHub",
      githubDescription: "@danilolarap · Repositorios y proyectos",
      openGithub: "Visitar perfil",
      email: "Correo electrónico",
      emailAddress: "danilolarap06@gmail.com",
      openEmail: "Enviar correo",
    },
    skills: {
      eyebrow: "06 / INVENTARIO EXTRA",
      title: "Habilidades",
      intro:
        "Lenguajes y tecnologías que utilizo para desarrollar aplicaciones y experiencias web.",
      categories: [
        "Python · Java",
        "JavaScript · TypeScript",
        "React · Next.js",
        "HTML · CSS · Tailwind CSS",
      ],
    },
    footer: {
      builtWith: "Construido bloque a bloque",
      backToTop: "Volver al inicio",
      rights: "Portafolio personal de Danilo",
    },
  },
  en: {
    playerName: "Danilo Lara",
    playerSubtitle: "Software developer · Software Engineering student",
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
    welcome: {
      title: "PORTFOLIO WORLD",
      subtitle: "A world built block by block",
      play: "Play",
      controls: "Controls",
      back: "Back",
      keyboardTitle: "Keyboard controls",
      mobileTitle: "Touch controls",
      objective:
        "Explore the world, find the buildings, and approach them to discover each portfolio section.",
      menuFooter: "SINGLE PLAYER · EXPLORATION MODE",
      returnToTitle: "Return to title",
      joystickLabel: "Virtual joystick for movement",
      actionLabel: "Interact with the nearby station",
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
        projects: "Explore my work and open its live versions or repositories.",
        skills: "See the programming languages and technologies I use.",
        about:
          "Learn about my profile, interests, and the things I like to build.",
        contact: "Visit my GitHub or send me an email.",
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
      exit: "Menu",
      tapHint: "Tap a building to select it",
    },
    common: {
      pending: "COMING SOON",
      pendingDetail: "Content to be added.",
      section: "SECTION",
    },
    about: {
      eyebrow: "01 / ABOUT ME",
      title: "About me",
      intro:
        "A software developer in training, motivated by creating things and staying active.",
      featureTitle: "My profile",
      featureText:
        "My name is Danilo Lara. I am a software developer currently studying Software Engineering. I am passionate about programming, exercising, spending time outdoors, and anything related to movement. I develop applications, websites, and APIs.",
      facts: [
        "Application development",
        "Website development",
        "API development",
      ],
    },
    projects: {
      eyebrow: "02 / THE WORKSHOP",
      title: "Projects",
      intro:
        "A selection of interactive projects for arranging spaces, planning luggage, and exploring 3D interfaces.",
      openRepository: "View repository",
      openProduction: "Open project",
      cards: [
        {
          index: "01",
          title: "RoomLayout",
          description:
            "An interactive space planner for arranging layouts with a drag-and-drop interface.",
          repository: "https://github.com/danilolarap/RoomLayout.git",
          production: "https://room-layout-red.vercel.app/",
        },
        {
          index: "02",
          title: "PackGuide",
          description:
            "A travel packing organizer that optimizes how items fit inside suitcases.",
          repository: "https://github.com/danilolarap/PackGuide.git",
        },
        {
          index: "03",
          title: "TiltClock",
          description:
            "A clock application featuring interactive watch faces in GLB format.",
          repository: "https://github.com/danilolarap/TiltClock.git",
          production: "https://tilt-clock.vercel.app/",
        },
      ],
    },
    testimonials: {
      eyebrow: "03 / VOICES ALONG THE WAY",
      title: "Testimonials",
      intro: "This section will be completed later.",
      cards: [],
    },
    experience: {
      eyebrow: "04 / THE JOURNEY",
      title: "Experience",
      intro: "My education and work experience.",
      academic: "Education",
      academicItems: [
        {
          title: "High school graduate",
          organization: "Colegio San Felipe Neri · Pasto",
        },
        {
          title: "Software Engineering · In progress",
          organization: "Universidad Cooperativa de Colombia",
        },
      ],
      work: "Work experience",
      workItems: [
        {
          title: "Warehouse work",
          organization: "Watch warehouse",
        },
        {
          title: "Warehouse manager",
          organization: "Shoe warehouse",
        },
        {
          title: "Sales assistant",
          organization: "Clothing store",
        },
      ],
    },
    contact: {
      eyebrow: "05 / THE PORTAL",
      title: "Let’s talk",
      intro: "Explore my projects on GitHub or get in touch by email.",
      github: "GitHub",
      githubDescription: "@danilolarap · Repositories and projects",
      openGithub: "Visit profile",
      email: "Email",
      emailAddress: "danilolarap06@gmail.com",
      openEmail: "Send email",
    },
    skills: {
      eyebrow: "06 / EXTRA INVENTORY",
      title: "Skills",
      intro:
        "Programming languages and technologies I use to build applications and web experiences.",
      categories: [
        "Python · Java",
        "JavaScript · TypeScript",
        "React · Next.js",
        "HTML · CSS · Tailwind CSS",
      ],
    },
    footer: {
      builtWith: "Built block by block",
      backToTop: "Back to top",
      rights: "Danilo’s personal portfolio",
    },
  },
};
