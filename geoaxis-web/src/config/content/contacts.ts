export interface ContactsContent {
  id: "contacts";
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  mapsUrl: string;
  workingHours: string;
  responseTime: string;
}

const PHONE_DIGITS = "359988316263";

export const contacts: ContactsContent = {
  id: "contacts",
  title: "Свържете се",
  subtitle: "Имате въпрос или нужда от услуга? Свържете се с нас и ще ви съдействаме.",
  phone: "+359 98 831 6263",
  email: "geoaxis.sofia@gmail.com",
  address: "1618 бул. България||София, България",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("бул. България, 1618 София"),
  workingHours: "Пон – Пет: 08:30 – 17:30",
  responseTime: "Отговаряме в рамките на работния ден",
} as const;

export const contactLinks = {
  tel: `tel:+${PHONE_DIGITS}`,
  viber: `viber://chat?number=%2B${PHONE_DIGITS}`,
  whatsapp: `https://wa.me/${PHONE_DIGITS}`,
  mail: `mailto:${contacts.email}`,
} as const;
