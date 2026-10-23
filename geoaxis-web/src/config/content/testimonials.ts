export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  // Where the review came from, stated honestly (e.g. "Google" or "Отзив, споделен лично")
  source: string;
  sourceUrl?: string;
  // Set to true only after the client has agreed (in writing, e.g. Viber) to be quoted
  consentConfirmed: boolean;
}

export interface TestimonialsContent {
  id: "testimonials";
  kicker?: string;
  title: string;
  subtitle: string;
  // Only reviews with consentConfirmed are shown; the section hides when none are.
  items: Testimonial[];
}

export const testimonials: TestimonialsContent = {
  id: "testimonials",
  kicker: "Отзиви",
  title: "Какво казват нашите клиенти",
  subtitle: "Какво споделят клиенти, с които сме работили.",
  // TODO(client): ask each client for permission, then set consentConfirmed: true.
  items: [
    {
      name: "Иван П.",
      role: "Частен клиент",
      text: "Работихме с GeoAxis за геодезическо заснемане на парцел преди започване на строеж. Работата беше свършена бързо и много професионално, а комуникацията беше ясна през целия процес.",
      rating: 5,
      source: "Отзив, споделен лично",
      consentConfirmed: false,
    },
    {
      name: "Мария Г.",
      role: "Архитект",
      text: "Отлично съдействие при изготвяне на необходимите геодезически данни за проект. Получихме точни материали и бърза реакция при всякакви въпроси.",
      rating: 5,
      source: "Отзив, споделен лично",
      consentConfirmed: false,
    },
    {
      name: "Николай С.",
      role: "Инвеститор",
      text: "Работили сме с различни геодезисти, но при GeoAxis останахме най-доволни. Точност, коректност и много добро отношение към клиента.",
      rating: 5,
      source: "Отзив, споделен лично",
      consentConfirmed: false,
    },
  ],
};
