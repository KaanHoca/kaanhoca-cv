import { z } from "zod";

const optionalString = z.string().trim().optional().or(z.literal(""));
const optionalUrl = z
  .string()
  .trim()
  .url({ message: "Geçerli bir URL girin" })
  .optional()
  .or(z.literal(""));

export const profileSchema = z.object({
  fullName: z.string().trim().min(1, "İsim zorunludur"),
  title: z.string().trim().min(1, "Ünvan zorunludur"),
  email: z.string().trim().email("Geçerli bir e-posta girin").or(z.literal("")),
  phone: optionalString,
  location: optionalString,
  website: optionalUrl,
  photoDataUrl: optionalString,
  summary: optionalString,
});

export const linkSchema = z.object({
  id: z.string(),
  label: z.string().trim().min(1, "Etiket zorunludur"),
  url: z.string().trim().url("Geçerli bir URL girin"),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().trim().min(1, "Şirket zorunludur"),
  position: z.string().trim().min(1, "Pozisyon zorunludur"),
  location: optionalString,
  startDate: optionalString,
  endDate: optionalString,
  current: z.boolean().default(false),
  description: optionalString,
});

export const educationSchema = z.object({
  id: z.string(),
  school: z.string().trim().min(1, "Okul zorunludur"),
  degree: optionalString,
  field: optionalString,
  startDate: optionalString,
  endDate: optionalString,
  description: optionalString,
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, "Yetenek adı zorunludur"),
  level: z.enum(["başlangıç", "orta", "ileri", "uzman"]).optional(),
  category: optionalString,
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, "Proje adı zorunludur"),
  url: optionalUrl,
  description: optionalString,
  technologies: optionalString,
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, "Sertifika adı zorunludur"),
  issuer: optionalString,
  date: optionalString,
  url: optionalUrl,
});

export const languageSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, "Dil adı zorunludur"),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2", "Anadil"]).optional(),
});

export const cvDataSchema = z.object({
  profile: profileSchema,
  links: z.array(linkSchema).default([]),
  experiences: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  skills: z.array(skillSchema).default([]),
  projects: z.array(projectSchema).default([]),
  certifications: z.array(certificationSchema).default([]),
  languages: z.array(languageSchema).default([]),
});

export type CvData = z.infer<typeof cvDataSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Link = z.infer<typeof linkSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Language = z.infer<typeof languageSchema>;

export const emptyCv: CvData = {
  profile: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    photoDataUrl: "",
    summary: "",
  },
  links: [],
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
};

export const sampleCv: CvData = {
  profile: {
    fullName: "Ayşe Yılmaz",
    title: "Senior Frontend Developer",
    email: "ayse.yilmaz@example.com",
    phone: "+90 555 123 45 67",
    location: "İstanbul, Türkiye",
    website: "https://ayseyilmaz.dev",
    photoDataUrl: "",
    summary:
      "8 yıl deneyimli frontend geliştirici. React, TypeScript ve modern web teknolojileri konusunda uzman. Ölçeklenebilir kullanıcı arayüzleri ve performans odaklı çözümler geliştiriyorum.",
  },
  links: [
    { id: "l1", label: "LinkedIn", url: "https://linkedin.com/in/ayseyilmaz" },
    { id: "l2", label: "GitHub", url: "https://github.com/ayseyilmaz" },
  ],
  experiences: [
    {
      id: "e1",
      company: "TechCorp",
      position: "Senior Frontend Developer",
      location: "İstanbul",
      startDate: "2022-03",
      endDate: "",
      current: true,
      description:
        "Mikro-frontend mimarisi tasarladım ve uyguladım. Sayfa yüklenme süresini %40 iyileştirdim. 5 kişilik ekibe mentörlük yaptım.",
    },
    {
      id: "e2",
      company: "StartupX",
      position: "Frontend Developer",
      location: "Ankara",
      startDate: "2019-06",
      endDate: "2022-02",
      current: false,
      description:
        "React + Redux ile SaaS dashboard geliştirdim. Tasarım sistemini sıfırdan kurdum. Kod kalitesi süreçlerini kurguladım.",
    },
  ],
  education: [
    {
      id: "ed1",
      school: "İstanbul Teknik Üniversitesi",
      degree: "Lisans",
      field: "Bilgisayar Mühendisliği",
      startDate: "2015-09",
      endDate: "2019-06",
      description: "GPA: 3.45 / 4.00",
    },
  ],
  skills: [
    { id: "s1", name: "React", level: "uzman", category: "Frontend" },
    { id: "s2", name: "TypeScript", level: "uzman", category: "Dil" },
    { id: "s3", name: "Next.js", level: "ileri", category: "Frontend" },
    { id: "s4", name: "Node.js", level: "ileri", category: "Backend" },
    { id: "s5", name: "Tailwind CSS", level: "uzman", category: "Frontend" },
  ],
  projects: [
    {
      id: "p1",
      name: "Açık Kaynak Tasarım Sistemi",
      url: "https://github.com/ayseyilmaz/design-system",
      description:
        "50+ component içeren, erişilebilir, tema desteği olan React tasarım sistemi.",
      technologies: "React, TypeScript, Storybook, Vite",
    },
  ],
  certifications: [
    {
      id: "c1",
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2024-01",
      url: "",
    },
  ],
  languages: [
    { id: "lng1", name: "Türkçe", level: "Anadil" },
    { id: "lng2", name: "İngilizce", level: "C1" },
  ],
};
