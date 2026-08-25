// =================================================
// Note! we're not rednering certificates and awards. If you want to, you can update the credentials section to render these documents
// =================================================
// =================================================
// Keep them for bot api compatibility
// =================================================
export const awards = [
  {
    id: "award-1",
    title: "Engineering Excellence & Innovation Award",
    issuer: "Kynoby Leadership",
    date: "2025",
    description:
      "Awarded for architecting healthcare interoperability pipelines reducing clinical data processing latency by 40%.",
  },
  {
    id: "award-2",
    title: "Dean's Honor List",
    issuer: "University of Massachusetts",
    date: "2023",
    description: "Academic honors in Computer Science & Applied Mathematics.",
  },
];

export const certificates = [
  {
    id: "cert-aws",
    name: "AWS Certified Solutions Architect",
    issuingOrg: "Amazon Web Services (AWS)",
    issueDate: "Jan 2024",
    expirationDate: "Jan 2027",
    credentialId: "AWS-PSA-882194",
    credentialUrl: "https://aws.amazon.com/verification",
    skills: ["Cloud Architecture", "S3", "EC2", "IAM", "VPC", "Serverless"],
  },
  {
    id: "cert-gcp-data",
    name: "Google Data Analytics Professional Certificate",
    issuingOrg: "Google / Coursera",
    issueDate: "Aug 2023",
    expirationDate: null,
    credentialId: "GCP-DA-49210",
    credentialUrl:
      "https://coursera.org/verify/professional-cert/google-data-analytics",
    skills: ["SQL", "Data Pipelines", "R", "Tableau", "Data Modeling"],
  },
  {
    id: "cert-react",
    name: "Advanced React & Next.js Architecture",
    issuingOrg: "Udemy / Vercel Partner",
    issueDate: "May 2023",
    expirationDate: null,
    credentialId: "UC-5928174",
    credentialUrl: "https://udemy.com/certificate/UC-5928174",
    skills: ["React 19", "Server Components", "Next.js", "State Machines"],
  },
  {
    id: "cert-sql",
    name: "SQL for Data Science & Distributed Queries",
    issuingOrg: "UC Davis / Coursera",
    issueDate: "Nov 2022",
    expirationDate: null,
    credentialId: "COURSERA-SQL-38192",
    credentialUrl: "https://coursera.org/verify/sql-data-science",
    skills: ["PostgreSQL", "Query Optimization", "Indexing", "ETL"],
  },
];
