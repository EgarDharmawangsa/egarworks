/** Public portfolio information shared by page sections and metadata. */
export const siteConfig = {
  name: "EGARWORKS",
  owner: "Egar Dharmawangsa",
  role: "Full-stack web developer",
  title: "EGARWORKS — Egar Dharmawangsa",
  description:
    "Egar Dharmawangsa, a full-stack web developer based in Bali. Explore my projects, skills, and let's build something together.",
  url: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://egarworks.vercel.app",
  ).origin,
  email: "dharmawangsaegar@gmail.com",
  location: "Bali, Indonesia",
  cvPath: "/files/(CV) I Komang Egar Suarama Dharmawangsa.pdf",
  navigation: [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ],
  socials: [
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/EgarDharmawangsa",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com/in/egar-dharmawangsa",
    },
    {
      id: "instagram",
      label: "Instagram",
      url: "https://instagram.com/gazzelll_",
    },
    { id: "whatsapp", label: "WhatsApp", url: "https://wa.me/6289524627369" },
  ],
} as const;
