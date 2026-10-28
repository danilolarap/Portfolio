export const gameData = {
  player: {
    name: "Danilo Lara",
    level: 5,
    class: "Ingeniero de Software",
    location: "Universidad Cooperativa de Colombia",
    stats: {
      health: 20,
      maxHealth: 20,
      experience: "5º Semestre",
      mana: "Java / TypeScript / Next.js"
    }
  },
  projects: [
    {
      id: "gridmind",
      title: "GridMind",
      description: "Sistema de monitoreo de energía residencial con arquitectura backend segura en Spring Boot y sincronización Git.",
      category: "Backend & Seguridad",
      blockType: "Redstone",
      techStack: ["Java", "Spring Boot", "Git"],
      githubUrl: "https://github.com/danilolarap"
    },
    {
      id: "petadoption",
      title: "PetAdoption",
      description: "Plataforma web MVC para adopción de mascotas conectada a MongoDB Atlas en la nube.",
      category: "Full-Stack",
      blockType: "Gold Block",
      techStack: ["Spring Boot", "Thymeleaf", "MongoDB"],
      githubUrl: "https://github.com/danilolarap"
    },
    {
      id: "flex-dashboard",
      title: "Flex Dashboard",
      description: "Panel de control UI en tiempo real construido con Next.js y componentes dinámicos en Tailwind CSS.",
      category: "Frontend UI",
      blockType: "Diamond Block",
      techStack: ["Next.js", "Tailwind CSS", "React"],
      githubUrl: "https://github.com/danilolarap"
    },
    {
      id: "book-nestjs",
      title: "Book NestJS API",
      description: "API REST modular para gestión de usuarios y enrutamiento estructurado en NestJS.",
      category: "Backend API",
      blockType: "Command Block",
      techStack: ["NestJS", "TypeScript", "Node.js"],
      githubUrl: "https://github.com/danilolarap"
    }
  ],
  skills: [
    { name: "Desarrollo Frontend", level: "Avanzado", tools: "Next.js, React, Tailwind CSS, Bootstrap" },
    { name: "Desarrollo Backend", level: "Intermedio-Avanzado", tools: "Java Spring Boot, NestJS, Maven" },
    { name: "Bases de Datos", level: "Intermedio", tools: "MongoDB Atlas, SQL" },
    { name: "Herramientas & Versionado", level: "Avanzado", tools: "Git, GitHub (danilolarap), VS Code, IntelliJ IDEA, Swagger" }
  ]
};