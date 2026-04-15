/* ------------------------------------------------------------------ */
/*  Apprenticeship credential data                                     */
/* ------------------------------------------------------------------ */

export interface Credential {
  id: string;
  title: string;
  focus: string;
  issuer: string;
  date: string;          // human-readable
  dateISO: string;       // ISO 8601 for schema
  verifyUrl: string;
  skills: string[];
}

export const apprenticeships: Credential[] = [
  {
    id: "acadium-5",
    title: "Apprenticeship Completion",
    focus: "SEO / AEO / GEO Consulting",
    issuer: "Acadium",
    date: "Apr 2026",
    dateISO: "2026-04-11",
    verifyUrl:
      "https://www.credential.net/2e879ad2-f032-49be-ab7e-0b3ffc7bccf2",
    skills: ["SEO", "AEO/GEO", "Website Design", "Content Marketing"],
  },
  {
    id: "acadium-4",
    title: "Apprenticeship Completion",
    focus: "Web Development & SEO",
    issuer: "Acadium",
    date: "Apr 2026",
    dateISO: "2026-04-11",
    verifyUrl:
      "https://www.credential.net/c08e06c8-70b3-4c28-8a0f-f093dade3825",
    skills: ["Website Design", "SEO", "Digital Marketing", "Analytics"],
  },
  {
    id: "acadium-3",
    title: "Apprenticeship Completion",
    focus: "Custom Website Building",
    issuer: "Acadium",
    date: "Jul 2025",
    dateISO: "2025-07-29",
    verifyUrl:
      "https://www.credential.net/9a2798ac-21ca-4b83-aee9-e7486d82dfb9",
    skills: ["Website Design", "SEO", "Email Marketing", "Content Marketing"],
  },
  {
    id: "acadium-2",
    title: "Apprenticeship Completion",
    focus: "Web App Consulting",
    issuer: "Acadium",
    date: "May 2025",
    dateISO: "2025-05-22",
    verifyUrl:
      "https://www.credential.net/75e9638b-1006-42bd-8512-14bd8916692a",
    skills: ["Website Design", "Digital Marketing", "SEO", "Marketing Analytics"],
  },
  {
    id: "acadium-1",
    title: "Apprenticeship Completion",
    focus: "SEO & Digital Marketing",
    issuer: "Acadium",
    date: "Feb 2025",
    dateISO: "2025-02-10",
    verifyUrl:
      "https://www.credential.net/671c71b9-f3fb-4c4e-a0b7-6d3d5188b45d",
    skills: ["SEO", "Content Marketing", "Digital Marketing", "Analytics"],
  },
];
