export interface SocialLinkItem {
  id: "email" | "github" | "linkedin" | "resume";
  label: string;
  handle: string;
  href: string;
  external: boolean;
}

export const socialLinks = {
  email: "ngkaisheng@um.edu.my",
  github: "https://github.com/Codinggeniusnks",
  githubHandle: "@Codinggeniusnks",
  linkedin: "https://www.linkedin.com/in/ng-kai-sheng-64ab9942b/",
  linkedinHandle: "in/ng-kai-sheng-64ab9942b",
  resumePath: "/resume",
  items: [
    {
      id: "email",
      label: "Email",
      handle: "ngkaisheng@um.edu.my",
      href: "mailto:ngkaisheng@um.edu.my",
      external: false,
    },
    {
      id: "github",
      label: "GitHub",
      handle: "github.com/Codinggeniusnks",
      href: "https://github.com/Codinggeniusnks",
      external: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "in/ng-kai-sheng-64ab9942b",
      href: "https://www.linkedin.com/in/ng-kai-sheng-64ab9942b/",
      external: true,
    },
    {
      id: "resume",
      label: "Curriculum Vitae",
      handle: "Interactive & Print CV",
      href: "/resume",
      external: false,
    },
  ] satisfies SocialLinkItem[],
};
