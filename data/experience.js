export const experiences = [
  {
    company: "Kynoby",
    url: "https://kynoby.com",
    location: "London, UK",
    locationType: "Remote",
    isCurrent: true,
    roles: [
      {
        id: "kynoby-lead",
        title: "Software Development Lead",
        type: "Full-time",
        startDate: "2026-03",
        endDate: null,
        description:
          "Managing engineering team, architecting healthcare integrations, and driving technical direction across automation platforms.",
        skills: [
          "React",
          "Next.js",
          "Django",
          "PostgreSQL",
          "Redis",
          "Celery",
          "Docker",
        ],
      },
      {
        id: "kynoby-rpa",
        title: "RPA Engineer",
        type: "Full-time",
        startDate: "2025-03",
        endDate: "2026-03",
        description:
          "Engineered clinical software automations integrated with SystmOne, EMIS, and Docman.",
        skills: ["Power Automate", "AutoHotkey", "JavaScript", "Python"],
      },
    ],
  },
  {
    company: "Simplamo",
    url: "https://simplamo.com",
    location: "Ho Chi Minh City, Viet Nam",
    locationType: "Onsite",
    isCurrent: false,
    roles: [
      {
        id: "simplamo-sr-fe",
        title: "Senior Frontend Developer",
        type: "Full-time",
        startDate: "2022-10",
        endDate: "2026-01",
        description:
          "Led frontend architecture, built component libraries, and optimized application performance.",
        skills: [
          "TypeScript",
          "Next.js",
          "React Native",
          "Tailwind CSS",
          "Agile",
        ],
      },
    ],
  },
];

export const education = [
  {
    id: "edu-uml",
    institution: "University of Massachusetts, Lowell",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science",
    minor: "Mathematics",
    startDate: "2020",
    endDate: "2024",
    grade: "3.8 GPA",
    activities: "ACM Student Chapter, Distributed Systems Lab",
    description:
      "Core focus on algorithms, distributed computing, operating systems, and applied mathematics.",
    location: "Lowell, MA",
    skills: ["C/C++", "Python", "Algorithms", "Distributed Systems", "SQL", "Linux"],
    url: "https://www.uml.edu",
    image: "/experience/umasslowell_logo.jpg",
  },
  {
    id: "edu-comsats",
    institution: "COMSATS University",
    degree: "Associate / Pre-Engineering",
    fieldOfStudy: "Computer & Information Sciences",
    startDate: "2018",
    endDate: "2020",
    grade: "First Class Honors",
    activities: "Software Innovation Society",
    description:
      "Foundation in data structures, computational mathematics, and database management.",
    location: "Islamabad, PK",
    skills: ["Data Structures", "OOP", "Database Design", "Mathematics"],
    url: "https://www.comsats.edu.pk",
    image: null,
  },
];