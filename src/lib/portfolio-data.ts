import {
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Workflow
} from "lucide-react";

export const profile = {
  name: "Md Sadique Shakeel",
  role: "Backend & Full-Stack Developer",
  email: "mdsadiqueshakeel@gmail.com",
  location: "Kolkata / Patna, India",
  resumePath: "/Md_Sadique_Shakeel_SDE.pdf",
  summary:
    "B.Tech ECE student graduating 2027 with hands-on experience shipping production backend systems in Java and Python. Designed and deployed live applications using microservices, REST APIs, JWT security, and AWS cloud infrastructure.",
  metrics: [
    { label: "Live apps shipped", value: "4" },
    { label: "DSA problems", value: "500+" },
    { label: "CGPA", value: "7.69" },
    { label: "Java NPTEL score", value: "87%" }
  ]
};

export const links = {
  linkedin: "https://www.linkedin.com/in/sadique-shakeel-a5bb29266/",
  github: "https://github.com/mdsadiqueshakeel",
  leetcode: "https://leetcode.com/u/sadiqueshakeel/",
  portfolio: "https://mdsadiqueshakeel.github.io/mdsadiqueshakeel-portfolio/",
  ydfCertificate: "https://drive.google.com/file/d/1b7-rhGGUKLC7msiK6g_cAGiU1s3gFUSB/view",
  jpmorganCertificate:
    "https://drive.google.com/file/d/1jHSsPvDyj8YiwMXiCwey92JCOt5lw4ie/view?usp=sharing",
  nptelCertificate: "https://drive.google.com/file/d/1gY8kqWuEqtbDR2nkJYbbpZHVq5dn_oJ1/view",
  aiMlCertificate: "https://drive.google.com/file/d/1ChEXM2_-hk1UgbuYXlr801DdWtqylRZQ/view",
  hackathonCertificate: "https://drive.google.com/file/d/1yVIkwGAie4LsuGYR9cuc9qGHhHQttg7T/view"
};

export const skills = [
  {
    title: "Backend",
    icon: ServerCog,
    items: ["Java", "Spring Boot", "Spring Security", "JWT/RBAC", "JPA", "Hibernate", "Maven", "Python", "FastAPI", "Node.js"]
  },
  {
    title: "Systems",
    icon: Layers3,
    items: ["DSA", "OOP", "SOLID", "Design Patterns", "LLD", "HLD", "Microservices", "REST API Design", "System Design"]
  },
  {
    title: "AI / ML",
    icon: BrainCircuit,
    items: ["OpenCV", "face_recognition", "Dlib", "scikit-learn", "PyTorch", "NumPy", "Pandas"]
  },
  {
    title: "Frontend / Mobile",
    icon: Smartphone,
    items: ["React Native", "Expo", "React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Data",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Redis", "Supabase"]
  },
  {
    title: "Cloud / DevOps",
    icon: Cloud,
    items: ["AWS EC2", "AWS RDS", "IAM", "S3", "Docker", "GitHub Actions", "Git", "Linux"]
  }
];

export const experiences = [
  {
    role: "Freelance Backend & Full-Stack Developer",
    company: "Remote, Self-Employed",
    period: "Jan 2025 - Nov 2025",
    icon: BriefcaseBusiness,
    highlights: [
      "Architected and shipped 2 live production applications, gramflix.in and growthaffinitymarketing.com, end-to-end.",
      "Designed Java/Spring Boot microservices with JWT/RBAC auth, API Gateway routing, REST APIs, Redis caching, and PostgreSQL/MongoDB persistence.",
      "Integrated Python AI/ML microservices with Java backends over REST with structured logging, error handling, and production monitoring.",
      "Owned SDLC from database design and testing to Docker containerisation, GitHub Actions CI/CD, AWS EC2 deployment, and zero-downtime releases."
    ]
  },
  {
    role: "DevOps Intern",
    company: "Youth Dreamers Foundation",
    period: "Feb 2025 - May 2025",
    icon: Workflow,
    certificate: links.ydfCertificate,
    highlights: [
      "Configured and maintained AWS cloud infrastructure across EC2, RDS, and IAM.",
      "Contributed to Docker containerisation, CI/CD automation, backend service deployment, and production reliability under senior engineering mentorship."
    ]
  }
];

export const projects = [
  {
    name: "Smart Attendance System",
    label: "AI attendance microservices",
    description:
      "A 3-tier system where a React Native app captures classroom images, a Spring Boot API handles auth and student workflows, and a FastAPI ML service performs face detection and recognition.",
    stack: ["Java", "Spring Boot", "React Native", "FastAPI", "PostgreSQL", "Supabase", "JWT"],
    github: "https://github.com/mdsadiqueshakeel/Ai-Attendance-System",
    live: null,
    accent: "from-cyan-400 via-blue-500 to-violet-500",
    stats: ["128D Dlib embeddings", "0.6 match threshold", "6 REST endpoints", "800px image optimization"],
    architecture: ["Mobile capture", "Spring API", "ML inference", "Supabase records"],
    bullets: [
      "Implemented One-Shot Learning face recognition with Euclidean distance matching and in-memory caching.",
      "Auto-marks multiple students present or absent from one image using confidence-based filtering.",
      "Exposes auth, student management, automated attendance, and daily analytics endpoints."
    ]
  },
  {
    name: "GrowthAffinity",
    label: "Live SaaS platform",
    description:
      "A microservices-based SaaS application with independently deployable services, unified API Gateway routing, Redis caching, PostgreSQL, Docker, and AWS EC2 deployment.",
    stack: ["Node.js", "React", "PostgreSQL", "Redis", "Docker", "AWS"],
    github: "https://github.com/mdsadiqueshakeel/aws",
    live: "https://growthaffinitymarketing.com/auth/login",
    accent: "from-emerald-300 via-teal-500 to-sky-500",
    stats: ["Live production app", "API Gateway", "CI/CD via GitHub Actions", "Real users"],
    architecture: ["Gateway", "Services", "Redis", "Postgres", "AWS EC2"],
    bullets: [
      "Applied service decomposition, load balancing strategy, SOLID principles, and design patterns.",
      "Containerised services with Docker and shipped releases through GitHub Actions.",
      "Runs at growthaffinitymarketing.com with production-grade uptime and monitoring."
    ]
  },
  {
    name: "GramFlix",
    label: "Live Java backend",
    description:
      "A production Java backend powered by Spring Boot microservices, API Gateway, JWT role-based access control, rate limiting, Redis caching, MongoDB, and AWS deployment.",
    stack: ["Java", "Spring Boot", "MongoDB", "Redis", "Next.js", "AWS"],
    github: "https://github.com/mdsadiqueshakeel/gramflix/tree/master",
    live: "https://gramflix.in/",
    accent: "from-rose-400 via-orange-400 to-amber-300",
    stats: ["RBAC security", "Rate limiting", "Redis cache", "AWS EC2"],
    architecture: ["Next.js UI", "Gateway", "Spring services", "Redis", "MongoDB"],
    bullets: [
      "Built a secure backend with JWT role-based access control and rate-limiting middleware.",
      "Used Redis for in-memory caching and MongoDB for scalable storage.",
      "Automated deployment with CI/CD to AWS EC2."
    ]
  }
];

export const achievements = [
  {
    title: "300+ DSA problems solved",
    detail: "Consistent LeetCode practice in arrays, trees, graphs, dynamic programming, and binary search using Java and Python.",
    icon: Code2,
    href: links.leetcode
  },
  {
    title: "JPMorgan Chase Software Engineering Job Simulation",
    detail: "Completed practical tasks in Kafka Integration, REST API Integration, H2 Integration, and REST API Controller in Oct 2025.",
    icon: ShieldCheck,
    href: links.jpmorganCertificate
  },
  {
    title: "NPTEL Programming in Java - Elite",
    detail: "National-level Elite certification with 87%, covering Java, OOP, and software design fundamentals.",
    icon: Award,
    href: links.nptelCertificate
  },
  {
    title: "AI/ML Virtual Internship - EduSkill",
    detail: "Hands-on ML engineering and computer vision workflows applied directly in Smart Attendance System.",
    icon: BrainCircuit,
    href: links.aiMlCertificate
  },
  {
    title: "3x Hackathon Participant",
    detail: "Including Adobe Hackathon, focused on rapid prototype and feature delivery in cross-functional teams.",
    icon: Workflow,
    href: links.hackathonCertificate
  }
];

export const education = [
  {
    title: "B.Tech - Electronics & Communication Engineering",
    org: "JIS College of Engineering, Kolkata",
    meta: "Graduating 2027 | CGPA 7.69/10",
    icon: GraduationCap
  },
  {
    title: "Class XII",
    org: "Patna Muslim H/S +2, Patna",
    meta: "2021-2023 | 75.8%",
    icon: GraduationCap
  },
  {
    title: "Class X",
    org: "Swami Vivekananda H/S, Patna",
    meta: "2020-2021 | 75.2%",
    icon: GraduationCap
  }
];
