export interface Project {
  slug: string;
  name: string;
  typology: string;
  type: string;
  location: string;
  year: number;
  image: string;
  video?: string;
  category: string;
  client?: string;
  status?: string;
  quote?: string;
  description?: string;
  details?: { label: string; value: string }[];
  gallery?: string[];
}

export interface FilterCategory {
  key: string;
  label: string;
  count: number;
}

export const categories: FilterCategory[] = [
  { key: "all", label: "All Work", count: 27 },
  { key: "commercial", label: "Commercial", count: 1 },
  { key: "hospitality", label: "Hospitality", count: 2 },
  { key: "multi-residential", label: "Multi-residential", count: 10 },
  { key: "residential", label: "Residential", count: 10 },
  { key: "retail", label: "Retail", count: 3 },
  { key: "seniors-living", label: "Seniors' Living", count: 3 },
];

export const projects: Project[] = [
  {
    slug: "armadale-office",
    name: "Armadale Office",
    typology: "Commercial & Retail",
    type: "Commercial, Retail",
    location: "Armadale, Victoria",
    year: 2025,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/High-St-2-1200x1535.jpg",
    category: "commercial",
    client: "Private",
    status: "Under Construction",
    quote:
      "A considered approach to mixed-use development in the heart of Armadale's High Street.",
    description:
      "The Armadale Office project reimagines a prominent High Street corner, balancing commercial and retail requirements with a refined architectural language that respects the surrounding heritage context.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/High-St-2-1200x1535.jpg",
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/High-St-2-1200x1535.jpg",
    ],
  },
  {
    slug: "caulfield-north",
    name: "Caulfield North",
    typology: "Multi-Residential",
    type: "Multi-residential",
    location: "Caulfield North, Victoria",
    year: 2025,
    video:
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Sequence-03_compressed.mp4",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/Balaclava-1-1200x733.jpg",
    category: "multi-residential",
    client: "Private",
    status: "Design Development",
    quote:
      "Redefining multi-residential living with a focus on light, space, and community.",
    description:
      "A boutique multi-residential development in Caulfield North that prioritises natural light, generous proportions, and a strong connection between indoor and outdoor living spaces.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture & Interior Design" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/Balaclava-1-1200x733.jpg",
    ],
  },
  {
    slug: "penthouse-vivace",
    name: "Penthouse Vivace",
    typology: "Residential",
    type: "Residential",
    location: "Caulfield North, Victoria",
    year: 2025,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/Balaclava-1-1200x733.jpg",
    category: "residential",
    client: "Private",
    status: "Completed",
    quote:
      "A penthouse that celebrates the art of living with panoramic views and bespoke finishes.",
    description:
      "Located at the apex of a luxury development, this penthouse showcases sweeping views and a meticulous approach to material selection and spatial planning.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Interior Design" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/Balaclava-1-1200x733.jpg",
    ],
  },
  {
    slug: "southbank-tower",
    name: "Southbank Tower",
    typology: "Multi-Residential",
    type: "Multi-residential",
    location: "Southbank, Victoria",
    year: 2019,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/SB-Tower-Render_3-480x640.jpg",
    category: "multi-residential",
    client: "Private",
    status: "Completed",
    quote:
      "Rising above Southbank, a tower that sets a new benchmark for urban living.",
    description:
      "A landmark multi-residential tower that responds to the energy of Southbank while offering residents a sanctuary of refined living above the city.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/SB-Tower-Render_3-480x640.jpg",
    ],
  },
  {
    slug: "parlington",
    name: "Parlington",
    typology: "Residential",
    type: "Residential",
    location: "Canterbury, Victoria",
    year: 2025,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/08/Parlington-2-1-480x480.jpg",
    category: "residential",
    client: "Private",
    status: "Under Construction",
    quote:
      "A home that honours tradition while embracing contemporary design principles.",
    description:
      "Parlington is a residential project in Canterbury that weaves together heritage sensitivity with modern architectural ambition, creating a home of enduring character.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture & Interior Design" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/08/Parlington-2-1-480x480.jpg",
    ],
  },
  {
    slug: "loller",
    name: "Loller",
    typology: "Multi-Residential",
    type: "Multi-residential",
    location: "Brighton, Victoria",
    year: 2025,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Loller-1-480x720.jpg",
    category: "multi-residential",
    client: "Private",
    status: "Design Development",
    quote: "Elegant multi-residential design shaped by its Brighton context.",
    description:
      "A thoughtfully designed multi-residential development in Brighton that draws inspiration from its coastal context to create residences of understated elegance.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Loller-1-480x720.jpg",
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Loller-22-480x720.jpg",
    ],
  },
  {
    slug: "half-courtyard-house",
    name: "Half Courtyard House",
    typology: "Residential",
    type: "Residential",
    location: "South Yarra, Victoria",
    year: 2025,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Exterior-1_D3-F-LR-480x256.jpg",
    category: "residential",
    client: "Private",
    status: "Completed",
    quote:
      "A courtyard house that blurs the boundaries between interior and landscape.",
    description:
      "The Half Courtyard House in South Yarra reimagines the traditional courtyard typology, creating a fluid dialogue between built form and garden that enriches daily life.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture & Interior Design" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Exterior-1_D3-F-LR-480x256.jpg",
    ],
  },
  {
    slug: "italian-club-apartments",
    name: "Italian Club Apartments",
    typology: "Multi-Residential",
    type: "Multi-residential, Retail",
    location: "Newstead, Brisbane",
    year: 2025,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/Wyandra-Street-Perspective-Closeup-480x517.jpg",
    category: "multi-residential",
    client: "Private",
    status: "Design Development",
    quote:
      "A culturally informed mixed-use development celebrating community and craftsmanship.",
    description:
      "The Italian Club Apartments in Newstead draw on the rich cultural history of the site to create a mixed-use development that celebrates community gathering and fine craftsmanship.",
    details: [
      { label: "Country", value: "Turrbal & Jagera" },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/Wyandra-Street-Perspective-Closeup-480x517.jpg",
    ],
  },
  {
    slug: "cobram-community-centre",
    name: "Cobram Community Centre",
    typology: "Lifestyle Community",
    type: "Seniors' Living",
    location: "Cobram, Victoria",
    year: 2025,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Cobram-1-480x216.jpg",
    category: "seniors-living",
    client: "Springtree",
    status: "Design Development",
    quote:
      "Creating a palette of materials to complement the context and architectural elements responding to the climate.",
    description:
      "The Clubhouse is at the centre of the community and designed to be split into two buildings, one for wellness and the other for leisure. Both pavilions are surrounded by and connected to a heap of outdoor activity to choose from, including bowling and putting green, pickle ball court, community gardens and even a dog park.",
    details: [
      { label: "Country", value: "Yorta Yorta" },
      {
        label: "Collaborators",
        value:
          "Arkee (Interior Design), Millar Merrigan (Landscape), Matter (Structure), Erbas (Services), Ascot (ESD), Stonebank (Project Manager)",
      },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Cobram-1-480x216.jpg",
    ],
  },
  {
    slug: "port-moresby",
    name: "Port Moresby",
    typology: "Residential",
    type: "Residential",
    location: "Port Moresby, Papua New Guinea",
    year: 2023,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/PNG-1-480x480.jpg",
    category: "residential",
    client: "Private",
    status: "Completed",
    quote: "Tropical architecture responding to climate and culture.",
    description:
      "A residential project in Port Moresby that embraces the tropical climate with open living spaces, natural ventilation, and materials that weather gracefully in the equatorial environment.",
    details: [{ label: "Discipline", value: "Architecture" }],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/PNG-1-480x480.jpg",
    ],
  },
  {
    slug: "es-showroom",
    name: "E&S Showroom",
    typology: "Retail",
    type: "Retail",
    location: "Epping, Victoria",
    year: 2025,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/ES-3-480x720.jpg",
    category: "retail",
    client: "E&S Trading",
    status: "Completed",
    quote:
      "A retail experience that elevates everyday commerce into spatial delight.",
    description:
      "The E&S Showroom project transforms a conventional retail environment into an engaging spatial experience, using material warmth and intuitive wayfinding to guide the customer journey.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture & Interior Design" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/ES-3-480x720.jpg",
    ],
  },
  {
    slug: "yarrawonga-community-centre",
    name: "Yarrawonga Community Centre",
    typology: "Lifestyle Community",
    type: "Seniors' Living",
    location: "Yarrawonga, Victoria",
    year: 2024,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Launceston-2-1920x1018.jpg",
    category: "seniors-living",
    client: "Springtree",
    status: "Completed",
    quote: "Community architecture fostering connection and wellbeing.",
    description:
      "The Yarrawonga Community Centre provides a welcoming hub for residents, featuring flexible gathering spaces, wellness facilities, and a strong connection to the surrounding landscape.",
    details: [
      { label: "Country", value: "Yorta Yorta" },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Launceston-2-1920x1018.jpg",
    ],
  },
  {
    slug: "argo",
    name: "Argo",
    typology: "Multi-Residential",
    type: "Multi-residential",
    location: "Melbourne, Victoria",
    year: 2025,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Argo-5-480x720.jpg",
    category: "multi-residential",
    client: "Private",
    status: "Design Development",
    quote: "A bold multi-residential statement that redefines urban density.",
    description:
      "Argo is a multi-residential project that challenges conventional density models, offering generous apartments with considered amenity and a striking architectural presence.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Argo-5-480x720.jpg",
    ],
  },
  {
    slug: "launceston-creative-precinct",
    name: "Launceston Creative Precinct",
    typology: "Commercial",
    type: "Commercial",
    location: "Launceston, Tasmania",
    year: 2025,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Launceston-2-e1764208087151-480x254.jpg",
    category: "commercial",
    client: "Creative Precinct Pty Ltd",
    status: "Design Development",
    quote:
      "Revitalising a creative precinct through adaptive reuse and thoughtful intervention.",
    description:
      "The Launceston Creative Precinct project breathes new life into an existing urban fabric, creating flexible spaces for creative industries within a heritage-rich context.",
    details: [
      { label: "Country", value: "Palawa" },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Launceston-2-e1764208087151-480x254.jpg",
    ],
  },
  {
    slug: "soho",
    name: "Soho",
    typology: "Multi-Residential",
    type: "Multi-residential",
    location: "South Yarra, Victoria",
    year: 2025,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Soho-1-480x720.jpg",
    category: "multi-residential",
    client: "Private",
    status: "Under Construction",
    quote: "Sophisticated urban living in the heart of South Yarra.",
    description:
      "Soho is a multi-residential development that captures the energy and sophistication of South Yarra, delivering residences with exceptional amenity and architectural distinction.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Soho-1-480x720.jpg",
    ],
  },
  {
    slug: "the-beckworth",
    name: "The Beckworth",
    typology: "Multi-Residential",
    type: "Multi-residential",
    location: "Melbourne, Victoria",
    year: 2023,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Beckworth-3-480x798.jpg",
    category: "multi-residential",
    client: "Private",
    status: "Completed",
    quote:
      "Timeless apartment living with a focus on craft and material expression.",
    description:
      "The Beckworth delivers a new standard in apartment living, with meticulously detailed interiors and a restrained external palette that speaks to permanence and quality.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture & Interior Design" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Beckworth-3-480x798.jpg",
    ],
  },
  {
    slug: "hurstmon",
    name: "Hurstmon",
    typology: "Multi-Residential",
    type: "Multi-residential",
    location: "Melbourne, Victoria",
    year: 2024,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Hurstmon-9-480x719.jpg",
    category: "multi-residential",
    client: "Private",
    status: "Completed",
    quote:
      "A considered multi-residential response to its leafy suburban context.",
    description:
      "Hurstmon is a boutique apartment project that sits quietly within its established neighbourhood, offering residents generous proportions and a refined material palette.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Hurstmon-9-480x719.jpg",
    ],
  },
  {
    slug: "greville-house",
    name: "Greville House",
    typology: "Residential",
    type: "Residential",
    location: "Melbourne, Victoria",
    year: 2024,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Greville-9-480x720.jpg",
    category: "residential",
    client: "Private",
    status: "Completed",
    quote: "A house that celebrates the rituals of domestic life.",
    description:
      "Greville House is a residential project that prioritises the everyday experience of its occupants, crafting spaces that are both functional and deeply atmospheric.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture & Interior Design" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Greville-9-480x720.jpg",
    ],
  },
  {
    slug: "the-saint-hotel",
    name: "The Saint Hotel",
    typology: "Hospitality",
    type: "Hospitality",
    location: "Melbourne, Victoria",
    year: 2023,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/08/TheSaint_30-480x720.jpg",
    category: "hospitality",
    client: "The Saint Hotel Pty Ltd",
    status: "Completed",
    quote:
      "Hospitality design that captures the spirit and energy of its neighbourhood.",
    description:
      "The Saint Hotel is a hospitality project that channels the vibrant character of its surroundings into a unique guest experience, blending bold design moves with warm materiality.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture & Interior Design" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/08/TheSaint_30-480x720.jpg",
    ],
  },
  {
    slug: "stanhope",
    name: "Stanhope",
    typology: "Residential",
    type: "Residential",
    location: "Melbourne, Victoria",
    year: 2024,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Stanhope-3-480x720.jpg",
    category: "residential",
    client: "Private",
    status: "Completed",
    quote: "A home of quiet sophistication and enduring quality.",
    description:
      "Stanhope is a residential project defined by restraint and precision, where every detail has been considered to create a home of lasting beauty and comfort.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture & Interior Design" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Stanhope-3-480x720.jpg",
    ],
  },
  {
    slug: "ormond-house",
    name: "Ormond House",
    typology: "Residential",
    type: "Residential",
    location: "Melbourne, Victoria",
    year: 2024,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Ormond-16-480x720.jpg",
    category: "residential",
    client: "Private",
    status: "Completed",
    quote: "A family home designed around the rhythms of daily life.",
    description:
      "Ormond House is a generous family residence that places the needs of its occupants at the centre of its design, with flowing spaces and a strong connection to garden.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Ormond-16-480x720.jpg",
    ],
  },
  {
    slug: "the-oaks",
    name: "The Oaks",
    typology: "Multi-Residential",
    type: "Multi-residential",
    location: "Melbourne, Victoria",
    year: 2024,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Berwick-1-480x720.jpg",
    category: "multi-residential",
    client: "Private",
    status: "Under Construction",
    quote: "Multi-residential living inspired by the established landscape.",
    description:
      "The Oaks is a multi-residential development that takes its cues from the mature oak trees that define the site, creating a development that feels grounded and connected to place.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Berwick-1-480x720.jpg",
    ],
  },
  {
    slug: "armytage",
    name: "Armytage",
    typology: "Residential",
    type: "Residential",
    location: "South Yarra, Victoria",
    year: 2024,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/StudioPiper_KensingtonRoad_SouthYarra_Bedroom-480x360.jpg",
    category: "residential",
    client: "Private",
    status: "Completed",
    quote: "Interior design that elevates the residential experience.",
    description:
      "Armytage is a residential interior project in South Yarra that transforms an existing dwelling through careful material selection and spatial reconfiguration.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Interior Design" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/StudioPiper_KensingtonRoad_SouthYarra_Bedroom-480x360.jpg",
    ],
  },
  {
    slug: "the-watson",
    name: "The Watson",
    typology: "Multi-Residential",
    type: "Multi-residential",
    location: "Melbourne, Victoria",
    year: 2022,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/The-Watson-6-e1764199236484-480x585.jpg",
    category: "multi-residential",
    client: "Private",
    status: "Completed",
    quote:
      "A landmark multi-residential development of enduring architectural merit.",
    description:
      "The Watson is a completed multi-residential project that has established a new benchmark for apartment living in its neighbourhood, with generous floor plans and considered communal spaces.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/The-Watson-6-e1764199236484-480x585.jpg",
    ],
  },
  {
    slug: "hepburn-springs-house",
    name: "Hepburn Springs House",
    typology: "Residential",
    type: "Residential",
    location: "Hepburn Springs, Victoria",
    year: 2024,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Hepburn-20-480x320.jpg",
    category: "residential",
    client: "Private",
    status: "Completed",
    quote: "A retreat that draws deeply from its bushland setting.",
    description:
      "Hepburn Springs House is a residential retreat nestled within its bushland setting, where the architecture serves as a frame for the surrounding landscape.",
    details: [
      { label: "Country", value: "Dja Dja Wurrung" },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Hepburn-20-480x320.jpg",
    ],
  },
  {
    slug: "anderson-residence",
    name: "Anderson Residence",
    typology: "Residential",
    type: "Residential",
    location: "Melbourne, Victoria",
    year: 2024,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Image5-480x270.jpg",
    category: "residential",
    client: "Private",
    status: "Completed",
    quote:
      "Contemporary residential architecture that respects its heritage context.",
    description:
      "The Anderson Residence is a contemporary home that sits respectfully alongside its heritage neighbours, using material and scale to create a dialogue between old and new.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture & Interior Design" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/Image5-480x270.jpg",
    ],
  },
  {
    slug: "coburg-north",
    name: "Coburg North",
    typology: "Residential",
    type: "Residential",
    location: "Coburg North, Victoria",
    year: 2023,
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Image6-e1764136862188-480x270.jpg",
    category: "residential",
    client: "Private",
    status: "Completed",
    quote: "A home that balances openness and intimacy.",
    description:
      "Coburg North is a residential project that masterfully balances open, communal spaces with intimate retreats, all unified by a warm and tactile material palette.",
    details: [
      { label: "Country", value: "Wurundjeri" },
      { label: "Discipline", value: "Architecture" },
    ],
    gallery: [
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Image6-e1764136862188-480x270.jpg",
    ],
  },
];
