export interface Job {
  slug: string;
  title: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export const jobs: Job[] = [
  {
    slug: "brand-strategist",
    title: "Brand Strategist",
    type: "Full-time · Berlin",
    description:
      "We are looking for a conceptual and analytical Brand Strategist to join our Berlin studio. You will be responsible for uncovering core insights, defining brand architectures, and shaping brand narratives that resonate deeply with audiences and align with business goals.",
    responsibilities: [
      "Lead strategic discovery processes, including stakeholder interviews, workshops, and market research.",
      "Develop comprehensive brand strategies defining positioning, purpose, and messaging frameworks.",
      "Translate complex business challenges into clear, actionable creative briefs.",
      "Collaborate closely with design and digital teams to ensure strategic alignment throughout the creative process.",
    ],
    requirements: [
      "3+ years of experience in brand strategy, preferably within a branding agency or studio environment.",
      "Strong analytical skills with the ability to distill complex information into clear insights.",
      "Excellent written and verbal communication skills in English (German is a plus).",
      "A deep understanding of brand building and design thinking.",
    ],
  },
  {
    slug: "senior-identity-designer",
    title: "Senior Identity Designer",
    type: "Full-time · Berlin",
    description:
      "We are seeking a highly talented and experienced Senior Identity Designer to craft bold, enduring visual identities. In this role, you will lead design projects from concept to completion, defining the visual language for brands across various industries.",
    responsibilities: [
      "Conceptualize and design comprehensive visual identity systems, including logos, typography, color palettes, and brand guidelines.",
      "Lead and mentor junior designers, providing creative direction and constructive feedback.",
      "Present design concepts to clients with clear rationale and confidence.",
      "Collaborate seamlessly with strategists and project managers to deliver exceptional work on time.",
    ],
    requirements: [
      "5+ years of experience in graphic design, with a strong focus on visual identity and branding.",
      "An outstanding portfolio demonstrating a high level of craft, conceptual thinking, and versatility.",
      "Proficiency in industry-standard design software (Adobe Creative Suite, Figma).",
      "Strong typographic skills and an impeccable eye for detail.",
    ],
  },
  {
    slug: "digital-brand-director",
    title: "Digital Brand Director",
    type: "Full-time · Remote",
    description:
      "The Digital Brand Director will lead our digital initiatives, shaping how brands behave and interact in the digital space. You will oversee the creation of digital experiences, products, and platforms that seamlessly extend brand identities into the interactive realm.",
    responsibilities: [
      "Define the digital vision and strategy for client brands, ensuring cohesion across all digital touchpoints.",
      "Lead UI/UX design processes, directing teams to create intuitive and engaging digital experiences.",
      "Stay at the forefront of digital trends, technologies, and best practices, integrating them appropriately into client work.",
      "Collaborate closely with developers and technical partners to ensure high-quality implementation of digital designs.",
    ],
    requirements: [
      "7+ years of experience in digital design, UI/UX, and digital product creation.",
      "Proven leadership experience, guiding multi-disciplinary teams through complex digital projects.",
      "A strong portfolio showcasing exceptional digital brand experiences and interactive design.",
      "Deep understanding of user-centered design principles and digital accessibility.",
    ],
  },
];
