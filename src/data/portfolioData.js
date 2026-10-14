// Portfolio Data for Rahil Mirza
// B.Tech Computer & Data Science • R. C. Patel Institute of Technology (Class of 2029)

export const PROFILE = {
  name: "Rahil Mirza",
  shortName: "Rahil",
  handle: "@rahilmirza062",
  tagline: "COMPUTER & DATA SCIENCE STUDENT",
  headline: "Building ideas into digital experiences.",
  heroSupport: "I'm Rahil Mirza, an engineering student exploring web development, software, and practical technology solutions through projects.",
  coreTheme: "Still learning. Always building. Becoming better.",
  supportingStatement: "Not just a student. A developer in progress.",
  college: "R. C. Patel Institute of Technology, Shirpur",
  degree: "B.Tech — Computer & Data Science",
  gradYear: "2029",
  status: "LEARNING & BUILDING",
  title: "Software & Web Developer",
  subTitle: "B.Tech Computer & Data Science",
  location: "Shirpur, Maharashtra, India",
  avatar: "/rahil.jpg",
  email: "rahilmirza062@gmail.com",
  github: "https://github.com/rahilmirza062-code",
  githubUsername: "rahilmirza062-code",
  campusImage: "/images/rahil-campus.png",
  bio: "A second-year B.Tech Computer & Data Science student with a passionate curiosity for software architecture, responsive web design, and modern developer tooling. I build projects by combining foundational computer science, independent research, hands-on experimentation, and AI-assisted engineering.",
  whatDrivesMe: [
    {
      title: "Learning by Building",
      desc: "Translating classroom computer science fundamentals directly into functional web tools and deployable software.",
      icon: "Hammer"
    },
    {
      title: "Solving Practical Problems",
      desc: "Targeting real-world friction—like farmer grain queue bottlenecks and student accommodation discovery.",
      icon: "Target"
    },
    {
      title: "Exploring New Technologies",
      desc: "Staying ahead of modern development paradigms, AI-assisted workflows, and responsive UI methodologies.",
      icon: "Compass"
    },
    {
      title: "Improving Through Feedback",
      desc: "Actively seeking code critiques, iterating on user interaction feedback, and refining performance.",
      icon: "RefreshCw"
    }
  ]
};

export const EDUCATION = {
  institution: "R. C. Patel Institute of Technology",
  location: "Shirpur, Maharashtra, India",
  degree: "B.Tech in Computer & Data Science",
  duration: "2025 – 2029",
  currentYear: "2nd Year Undergraduate",
  expectedGraduation: "2029",
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems (MySQL)",
    "Computer Organization",
    "Web Development Fundamentals"
  ]
};

export const SKILLS_DATA = [
  {
    category: "Frontend",
    desc: "Crafting structured, accessible, and responsive user interfaces",
    skills: [
      { name: "HTML5", level: "Used in Projects", status: "used" },
      { name: "CSS3 & Responsive Design", level: "Used in Projects", status: "used" },
      { name: "JavaScript Fundamentals", level: "Used in Projects", status: "used" },
      { name: "Tailwind CSS", level: "Used in Projects", status: "used" },
      { name: "React.js", level: "Currently Learning", status: "learning" }
    ]
  },
  {
    category: "Programming",
    desc: "Core computational foundations and algorithmic problem-solving",
    skills: [
      { name: "C Fundamentals", level: "Used in Coursework & Projects", status: "used" },
      { name: "Java Fundamentals", level: "Used in Coursework & Practice", status: "used" },
      { name: "Python Basics", level: "Currently Exploring", status: "learning" }
    ]
  },
  {
    category: "Tools & Platforms",
    desc: "Version control, deployment pipelines, and backend cloud primitives",
    skills: [
      { name: "Git & GitHub", level: "Used in Projects", status: "used" },
      { name: "Firebase", level: "Currently Learning", status: "learning" },
      { name: "Netlify", level: "Used in Deployments", status: "used" },
      { name: "VS Code & Antigravity IDE", level: "Daily Workflow", status: "used" }
    ]
  },
  {
    category: "Database",
    desc: "Relational data modeling, schema definition, and query construction",
    skills: [
      { name: "MySQL Fundamentals", level: "Used in Coursework", status: "used" },
      { name: "Relational Data Modeling", level: "Currently Learning", status: "learning" }
    ]
  },
  {
    category: "Development Approach",
    desc: "Modern methodologies for rapid learning, validation, and delivery",
    skills: [
      { name: "AI-Assisted Development", level: "Daily Practice", status: "used" },
      { name: "Prompt Design & Context Engineering", level: "Daily Practice", status: "used" },
      { name: "Systematic Debugging", level: "Continuous Growth", status: "used" },
      { name: "Rapid Experimentation & Prototyping", level: "Core Approach", status: "used" }
    ]
  }
];

export const PROJECTS = [
  {
    id: "kisan-connect",
    number: "01",
    name: "KISAN CONNECT",
    tagline: "Farmer Procurement & Queue-Management Portal",
    badge: "Hackathon Project • Live Portal",
    statusText: "Live Portal",
    statusType: "live",
    color: "#10b981", // Emerald
    accentBg: "from-emerald-500/20 to-teal-500/10",
    borderColor: "border-emerald-500/30",
    liveUrl: "https://kisan-connect-portal.netlify.app/",
    githubUrl: "https://github.com/rahilmirza062-code",
    problem: "Farmers often endure exhausting, multi-day wait times in unorganized physical queues at grain procurement centers without knowing when slots are open.",
    solution: "A streamlined procurement portal with digital slot booking, instant digital token generation, and real-time queue tracking to eliminate unnecessary travel.",
    features: [
      "Farmer registration & authentication dashboard",
      "Procurement schedules with calendar date selection",
      "Automated queue token generation & verification",
      "Live queue tracking and status overview",
      "Multilingual interface cues for rural accessibility",
      "Admin procurement dashboard for center officials"
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Netlify"],
    myContribution: "Engineered responsive frontend layouts, structured the booking and token generation flow, and handled deployment on Netlify.",
    previewType: "kisan-queue"
  },
  {
    id: "nivasa-hub",
    number: "02",
    name: "NIVASA HUB",
    tagline: "Student Accommodation & PG Discovery Network",
    badge: "In Active Development",
    statusText: "In Progress",
    statusType: "progress",
    color: "#38bdf8", // Sky Cyan
    accentBg: "from-cyan-500/20 to-blue-500/10",
    borderColor: "border-cyan-500/30",
    liveUrl: null,
    githubUrl: "https://github.com/rahilmirza062-code",
    problem: "New students relocating to college face unreliable broker listings, inflated prices, and lack of verified facility information near campus.",
    solution: "A direct student-to-owner housing portal that displays transparent amenities, campus proximity distance tags, and honest student peer reviews.",
    features: [
      "Dedicated roles for student room-seekers and local PG owners",
      "Categorized property listings with room amenities (Wi-Fi, Food, Power)",
      "Proximity filtering based on walking distance to campus",
      "Verified student review cards and rating summaries",
      "Saved favorite properties for quick side-by-side comparison"
    ],
    tech: ["React", "JavaScript", "Tailwind CSS", "Component Architecture"],
    myContribution: "Designing component architecture, state management for search filters, and developing responsive accommodation cards.",
    previewType: "nivasa-map"
  },
  {
    id: "neuronix-ai",
    number: "03",
    name: "NEURONIX AI",
    tagline: "AI-Powered Campus Study & Knowledge Companion",
    badge: "Concept & Prototype Architecture",
    statusText: "Architecture & Prototype",
    statusType: "concept",
    color: "#a855f7", // Violet
    accentBg: "from-purple-500/20 to-indigo-500/10",
    borderColor: "border-purple-500/30",
    liveUrl: null,
    githubUrl: "https://github.com/rahilmirza062-code",
    problem: "Engineering students navigate fragmented study PDFs, disjointed syllabus notes, and struggle to quickly test their own comprehension before university exams.",
    solution: "A proposed contextual campus study assistant engineered to parse syllabus documents, synthesize key concepts, and generate custom practice quizzes.",
    featuresImplemented: [
      "Modular prompt structuring for syllabus extraction",
      "Terminal-inspired interactive prompt query dashboard",
      "UI wireframe & layout testbed for quiz generation"
    ],
    featuresPlanned: [
      "Automated PDF document analysis & note summarization",
      "Adaptive quiz generator based on previous mistakes",
      "Semester exam countdown & personalized revision calendar",
      "Code concept explainer with syntax breakdown"
    ],
    tech: ["JavaScript", "Prompt Engineering", "CSS Design System"],
    myContribution: "Created system concept specification, prompt design templates, and interactive dashboard UI prototype.",
    previewType: "neuronix-neural"
  }
];

export const TERMINAL_COMMANDS = {
  help: "Displays all valid system commands",
  about: "Short dossier of Rahil Mirza & academic background",
  skills: "List of technical skills and learning focus",
  projects: "Overview of Kisan Connect, Nivasa Hub, and Neuronix AI",
  contact: "Email and GitHub links",
  status: "Academic progression and current development focus",
  clear: "Clears the terminal output screen"
};

export const THEMES = [
  { id: 'midnight', name: 'Midnight Dark', accent: '#38bdf8' },
  { id: 'cyberpunk', name: 'Cyberpunk Neon', accent: '#a855f7' },
  { id: 'emerald', name: 'Matrix Emerald', accent: '#10b981' }
];

export const SKILLS_MATRIX = [
  {
    category: "Frontend & Interfaces",
    icon: "Code2",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Tailwind CSS", "Responsive Design"]
  },
  {
    category: "Programming & Foundations",
    icon: "Layout",
    skills: ["C Fundamentals", "Java Basics", "Data Structures", "Algorithms", "Object-Oriented Design"]
  },
  {
    category: "Databases & Platforms",
    icon: "Palette",
    skills: ["MySQL", "Relational Modeling", "Git & GitHub", "Netlify", "Firebase Basics"]
  },
  {
    category: "Engineering Workflows",
    icon: "Sparkles",
    skills: ["AI-Assisted Development", "Prompt Engineering", "Systematic Debugging", "Rapid Prototyping"]
  }
];

