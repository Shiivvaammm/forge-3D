export const site = {
  name: "Forge Automotive",
  tagline: "For Those Who Refuse Ordinary",
  eyebrow: "We don’t modify vehicles. We build them for you.",
  subline:
    "A luxury automotive atelier for bespoke styling, performance and craftsmanship.",
  cta: "Start Your Project",
};

export const nav = ["Home", "Builds", "Stock", "Contact"];

export const approach = {
  title: "Our Approach To Every Build",
  intro:
    "Every decision is intentional, every detail has purpose based on your taste, your lifestyle, and your standards.",
  pillars: [
    {
      title: "Identity",
      text: "Every build begins with the person behind the wheel, shaped around their individual taste, lifestyle, presence and personal sense of identity on the road.",
    },
    {
      title: "Insight",
      text: "Exterior, interior and performance are brought together through a considered, detail-led approach, creating one complete and fully resolved vision.",
    },
    {
      title: "Cohesion",
      text: "Every modification is chosen with precision, ensuring each detail adds purpose, balance and distinction to the final bespoke automotive build.",
    },
  ],
};

export const brands = [
  "Aston Martin", "Audi", "Bentley", "Jaguar", "Lamborghini", "Land Rover",
  "Lotus", "Lucid", "Maserati", "McLaren", "Mercedes", "Polestar",
  "Porsche", "Rolls Royce",
];

export const servicesIntro = {
  title:
    "A vehicle should say something before it moves. Every line, material, and finish is considered.",
  text: "Our services are shaped with intent, from exterior styling and interior refinement to performance upgrades, detailing and bespoke finishes; each detail sharpens the vehicle’s character without overpowering it.",
};

export const services = [
  { title: "Bodystyling", text: "From aero styling to carbon details and exterior refinement, bodywork is designed to change the vehicle’s presence without compromising its original character." },
  { title: "Interior", text: "Material, stitching, trim and finish are selected to create an interior that feels personal, tactile and composed. We turn the cabin into a space of identity, comfort and control." },
  { title: "Wheels", text: "Bespoke wheel upgrades designed to enhance stance, proportion and road presence, with fitments selected to complement the vehicle’s character and performance." },
  { title: "Lighting", text: "Lighting gives a vehicle its expression. From subtle tinting to signature illumination and refined visual details, we use light to sharpen character, presence and atmosphere." },
  { title: "Exhaust", text: "Exhaust upgrades are chosen for tone, response and presence. Not noise for the sake of noise, but a sound profile that gives the vehicle more character and depth." },
  { title: "Protection", text: "Paint protective film solutions that preserve the finish of the vehicle while allowing for satin finishes, coloured films and full visual transformation." },
];

export const ordinary = {
  word: "Ordinary",
  title: "Ends Here",
  text: "Complete expressions of taste, intent and individuality, shaped through detail, restraint and presence.",
  cars: ["Mercedes G-Wagen", "Porsche 992 GT3 RS", "Land Rover Defender 110"],
};

export const builds = {
  title: "Previous Builds",
  text: "A collection of previous bespoke builds, shaped by craft, character and the people behind the wheel.",
  cta: "Explore Builds",
};

export const stock = {
  title: "Available Stock",
  text: "Builds available for purchase, refined with intent, engineered with purpose, and ready to make a statement.",
  cta: "Browse Stock",
};

export const finalCta = { pre: "Are you ready to", title: "Refuse Ordinary", cta: "Start Your Project" };

export const socials = {
  linkedin: "https://www.linkedin.com/company/forge-automotive-ltd/",
  instagram: "https://www.instagram.com/forgeautomotive/",
  facebook: "https://www.facebook.com/profile.php?id=61588925168989",
};

export const buildItems = [
  {
    id: "FA001",
    name: "Defender 110",
    text: "Satin grey against gloss black, widened arches and a stance built to be noticed.",
    images: ["/images/builds/fa001.jpg"],
  },
  {
    id: "FA002",
    name: "911 Carrera",
    text: "Satin black from crest to calliper, with every brightwork detail taken out of the picture.",
    images: ["/images/builds/fa002.jpg"],
  },
  {
    id: "FA005",
    name: "Defender 130",
    text: "Satin graphite over gloss black, widened at every arch and loaded for the long way round.",
    images: ["/images/builds/fa005.jpg"],
  },
  {
    id: "FA006",
    name: "Urus",
    text: "Gloss yellow against forged carbon, with nothing about it asking to be overlooked.",
    images: ["/images/builds/fa006.jpg"],
  },
  {
    id: "FA007",
    name: "M3 Touring",
    text: "Grey held to a mirror gloss, carbon at every edge, and yellow light in the eyes.",
    images: ["/images/builds/fa007.jpg"],
  },
  {
    id: "FA008",
    name: "G63",
    text: "Satin green over tan leather, with bronze standing in wherever chrome used to be.",
    images: ["/images/builds/fa008.jpg"],
  },
  {
    id: "FA009",
    name: "Defender 90",
    text: "Military green against gloss black, short in the wheelbase and heavy in the stance.",
    images: ["/images/builds/fa009.jpg"],
  },
  {
    id: "FA010",
    name: "RS3",
    text: "Satin PPF from bumper to hatch, a Maxton kit at every edge, and red calipers behind the spokes.",
    images: ["/images/builds/fa010.jpg"], 
  },
];

export const stockItems = [
  {
    id: "FA003",
    name: "Range Rover D300",
    price: "£88,595",
    text: "Satin protection, sculpted carbon and 24-inch forged alloys for undeniable road presence.",
    images: ["/images/stock/fa003.jpg"],
  },
  {
    id: "FA004",
    name: "VW T6.1",
    status: "Coming soon",
    text: "This build will be available soon. Check back for updates.",
    images: ["/images/stock/fa004.jpg"],
  },
];

export const buildsPage = {
  eyebrow: "The archive",
  lines: ["Builds"],
  text: builds.text,
};

export const stockPage = {
  eyebrow: "For sale now",
  lines: ["Stock"],
  text: stock.text,
  note: "Finished Forge Automotive builds for sale now, each with a full specification. Viewings by appointment in Yorkshire and the North West.",
};

export const contact = {
  lines: ["Every build", "starts with", "a conversation"],
  cta: "Start the conversation",
  methods: [
    {
      label: "Phone",
      value: "+44(0) 3330 417 965",
      note: "Monday to Friday, 9am — 6pm",
      href: "tel:+443330417965",
    },
    {
      label: "Email",
      value: "Send Us A Message",
      note: "We aim to respond within 1-3 business days",
      href: "#form",
    },
    {
      label: "Concierge",
      value: "Nationwide Collection Available",
      note: "Ask about our secure collection/delivery service",
    },
    {
      label: "Visit Us",
      value: "Viewings By Appointment",
      note: "Visit our studios in person to discuss your build",
      links: [
        { label: "Yorkshire", href: "https://maps.app.goo.gl/NmTzBYkb544jSnia8" },
        { label: "North West", href: "https://maps.app.goo.gl/sppHgGfo8j5p6x2LA" },
      ],
    },
  ],
  formTitle: "Define Your Specification",
  formText:
    "Share your build details so we can prepare a tailored quote. We aim to respond within 1–3 business days.",
  contactMethods: ["Email", "Phone"],
  sites: ["Yorkshire", "North West"],
  processTitle: "A considered process built around you",
  process: [
    {
      title: "We’ll Review Your Enquiry",
      text: "Our team will review your details and get back to you to learn more about your vision and goals.",
    },
    {
      title: "Discovery Call Or Studio Visit",
      text: "We’ll arrange a call or meeting to explore ideas, expectations and potential solutions.",
    },
    {
      title: "Tailored Proposal Delivered",
      text: "You’ll receive a bespoke proposal outlining the approach, timeline and investment required.",
    },
  ],
};