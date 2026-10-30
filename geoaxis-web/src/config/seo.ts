export const defaultSeo = {
  siteName: "GeoAxis",
  defaultTitle: "GeoAxis",
  titleTemplate: "%s - GeoAxis",
  defaultDescription:
    "Геодезически услуги в София и Софийска област за имоти, строителство и проекти: заснемане, трасиране, кадастър и консултации.",
  defaultOgImage: "/images/og-image.webp",
  locale: "bg_BG",
  robots: {
    index: true,
    follow: true,
  },
  twitterCard: "summary_large_image",
} as const;

export const pageSeo = {
  home: {
    title: "Геодезически услуги в София",
    description:
      "Професионални геодезически услуги в София и Софийска област — заснемане, трасиране, кадастър, проектиране и градоустройство.",
    canonical: "",
  },

  uslugiIndex: {
    title: "Геодезически услуги",
    description:
      "Заснемане, трасиране, кадастър, проектиране, ПУП и консултации в София и Софийска област. Изберете услуга според вашия проект.",
    canonical: "/uslugi",
    image: "/images/sections/services-hero-abstract-01.webp",
  },

  about: {
    title: "Геодезически екип в София",
    description:
      "Екип с опит в геодезията, кадастъра и градоустройството, работещ по имоти, обекти и проекти в София и Софийска област.",
    canonical: "/about",
  },

  contacts: {
    title: "Контакти",
    description:
      "Свържете се с нас за геодезически услуги в София и Софийска област: заснемане, трасиране, кадастър и проектни казуси.",
    canonical: "/contacts",
  },

  proekti: {
    title: "Проекти",
    description:
      "Разгледайте реализирани геодезически и кадастрални проекти в София и Софийска област с примери от практиката.",
    canonical: "/projects",
  },

  polezno: {
    title: "Полезно",
    description:
      "Практични статии и ръководства за геодезия, кадастър, трасиране и устройствени процедури в София и Софийска област.",
    canonical: "/polezno",
  },
} as const;
