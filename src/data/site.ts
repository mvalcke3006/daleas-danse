
export const site = {
  name: 'Daléas Danse',
  url: 'https://www.daleas-danse.fr',
  tagline: 'École de danse à Annecy depuis 1965',
  email: 'contact@daleas-danse.fr',
  address: {
    venue: 'Espace Daléas',
    street: '2bis rue Louis Chaumontel',
    zip: '74000',
    city: 'Annecy',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Espace+Dal%C3%A9as+2bis+rue+Louis+Chaumontel+74000+Annecy',
  teachers: [
    { name: 'Diane', phone: '06 11 77 35 55' },
    { name: 'Delphine', phone: '06 03 08 37 82' },
  ],
  rentalPhone: '06 10 32 74 85',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/daleas.danse/' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61560591567358' },
    { label: 'YouTube', href: 'https://www.youtube.com/@espacedansedaleas5103' },
  ],
  links: {
    espace: 'https://espacedaleas.fr',
    yoga: 'https://yoga-annecy-maryse-daleas.com/',
  },
};

export const tel = (p: string) => `tel:+33${p.replace(/\s/g, '').slice(1)}`;
export const sms = (p: string) => `sms:+33${p.replace(/\s/g, '').slice(1)}`;

export const season = '2026 – 2027';

export const announcement = {
  show: true,
  eyebrow: `Saison ${season}`,
  title: 'Les cours ont repris',
  text:
    "Reprise des cours adultes le jeudi 3 septembre et des enfants / ados le vendredi 4 septembre 2026. Pour rejoindre un cours en cours d'année, contactez directement Diane ou Delphine.",
};

export const navigation = [
  { label: 'L’école', href: '/ecole/' },
  { label: 'Horaires', href: '/horaires/' },
  { label: 'Tarifs', href: '/daleas-danse-annecy-tarifs/' },
  { label: 'Stages', href: '/stages/' },
  { label: 'Yoga', href: '/yoga-annecy/' },
  { label: 'Location', href: '/espace-daleas-location-de-salles-annecy/' },
  { label: 'Galerie', href: '/galerie/' },
  { label: 'Contact', href: '/contact-tel/' },
];

export type Day = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi';
export const days: Day[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];

export type Slot = { level: string; day: Day; start: string; end: string };
export type Discipline = {
  id: string;
  name: string;
  audience: string;
  description: string;
  slots: Slot[];
};

export const schedule: Discipline[] = [
  {
    id: 'eveil',
    name: 'Éveil rythmique',
    audience: '2 ans ½ – 5 ans',
    description: "Découvrir le rythme, l'espace et le plaisir de bouger en musique.",
    slots: [
      { level: '2 ans ½ – 3 ans', day: 'lundi', start: '17h00', end: '17h40' },
      { level: '4 ans', day: 'jeudi', start: '17h10', end: '17h55' },
      { level: '5 ans', day: 'lundi', start: '17h00', end: '17h45' },
    ],
  },
  {
    id: 'initiation',
    name: 'Initiation jazz',
    audience: '6 – 9 ans',
    description: 'Les premières bases du Modern’Jazz, posées avec exigence et bienveillance.',
    slots: [
      { level: '6 – 7 ans · 1re année', day: 'mardi', start: '17h00', end: '17h45' },
      { level: '6 – 7 ans · 2e année', day: 'vendredi', start: '17h00', end: '17h45' },
      { level: '8 – 9 ans', day: 'mardi', start: '17h45', end: '18h45' },
    ],
  },
  {
    id: 'ado',
    name: 'Jazz ados',
    audience: '10 ans et +',
    description: 'Une progression par degrés pour construire technique, style et présence.',
    slots: [
      { level: '10 – 11 ans', day: 'vendredi', start: '17h10', end: '18h10' },
      { level: '12 – 13 ans', day: 'mercredi', start: '13h45', end: '14h45' },
      { level: 'Classe junior (2e ou 3e cours)', day: 'mercredi', start: '15h00', end: '16h30' },
      { level: '1er degré', day: 'lundi', start: '17h45', end: '19h00' },
      { level: '2e degré', day: 'vendredi', start: '18h10', end: '19h25' },
      { level: '3e degré', day: 'jeudi', start: '18h00', end: '19h00' },
    ],
  },
  {
    id: 'adultes',
    name: 'Jazz adultes',
    audience: 'Débutants à avancés',
    description: 'Du premier cours au niveau avancé, à midi comme en soirée.',
    slots: [
      { level: 'Débutants & 1er degré', day: 'mardi', start: '18h45', end: '19h45' },
      { level: '1er & 2e degré', day: 'lundi', start: '19h00', end: '20h15' },
      { level: '2e & 3e degré', day: 'mercredi', start: '12h15', end: '13h40' },
      { level: '2e & 3e degré', day: 'jeudi', start: '19h00', end: '20h15' },
      { level: 'Avancé', day: 'vendredi', start: '19h30', end: '20h50' },
    ],
  },
  {
    id: 'moderne',
    name: 'Moderne',
    audience: 'Ados & adultes',
    description: 'Une fois le vocabulaire jazz maîtrisé, explorer une écriture plus libre.',
    slots: [
      { level: '1er degré', day: 'lundi', start: '20h15', end: '21h15' },
      { level: '1er & 2e degré', day: 'mardi', start: '19h45', end: '20h50' },
      { level: '2e & 3e degré', day: 'jeudi', start: '20h15', end: '21h40' },
      { level: 'Inter', day: 'vendredi', start: '12h15', end: '13h30' },
    ],
  },
  {
    id: 'choregraphique',
    name: 'Classe chorégraphique',
    audience: 'Inter & avancés',
    description: 'Travail de répertoire et de création, pour danseurs confirmés.',
    slots: [
      { level: 'Inter', day: 'lundi', start: '18h00', end: '19h15' },
      { level: 'Avancé', day: 'mercredi', start: '19h30', end: '21h00' },
    ],
  },
];

export const membership = [
  { label: 'Par personne', price: 20 },
  { label: 'Par famille', price: 35 },
];

export const kidsPricing = {
  title: 'Enfants',
  audience: '2 ans ½ – 7 ans',
  periods: ['Sept.', 'Oct. – Déc.', 'Janv. – Mars', 'Avril – Juin'],
  rows: [{ label: '1 cours / semaine', prices: [50, 95, 95, 95], year: 310 }],
};

export const mainPricing = {
  title: 'À partir de 8 ans',
  audience: 'Ados & adultes',
  periods: ['Sept. – Déc.', 'Janv. – Mars', 'Avril – Juin'],
  rows: [
    { label: '1 cours / semaine', prices: [170, 125, 125], year: 370 },
    { label: '2 cours / semaine', prices: [250, 205, 205], year: 630 },
    { label: '3 cours / semaine', prices: [350, 305, 305], year: 890 },
  ],
};

export const unlimited = 995;
export const singleClass = 18;
export const card10 = { price: 160, validity: '3 mois' };

export const pricingRules = {
  quarterly: [
    'Réglé en 3 chèques ou plus, déposés à l’inscription et encaissés en début de chaque trimestre (ou mois).',
    'Chaque trimestre commencé est dû intégralement et concerne la période indiquée, de 3 mois consécutifs.',
  ],
  yearly: [
    'Réglé en 1, 2 ou 3 chèques maximum, encaissés obligatoirement avant mars.',
    'Comprend le mois de septembre.',
    'Engagement à l’année, non remboursable.',
    'En cas d’arrêt médical, les cours non pris sont transformés en avoir non nominatif, valable 1 an.',
  ],
  general: [
    'Certificat médical obligatoire.',
    'Cours dispensés de septembre à juin.',
    'Pas de cours pendant les vacances scolaires et les jours fériés.',
  ],
  discount: '−10 % sur la 2e personne d’une même famille (hors tarif enfants).',
};

export const weekends = [
  {
    date: '28 & 29 novembre 2026',
    teacher: 'Laure Demollière',
    style: 'Modern Jazz',
    note: 'Bulletin d’inscription à venir',
  },
];

export const summerCamp = {
  edition: '32e édition',
  year: 2026,
  dates: 'Du vendredi 21 au lundi 24 août 2026',
  past: true,
  registrationPdf: '/32stagedanseannecy-inscriptionsweb5.pdf',
  team: [
    { style: 'Modern Jazz', names: ['Alain Gruttadauria'] },
    { style: 'Moderne', names: ['Laure Demollière', 'Gianluca Falvo'] },
    { style: 'Organic Dance Movement', names: ['Frédéric Jean-Baptiste'] },
  ],
};
