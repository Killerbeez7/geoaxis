export interface ContactsContent {
  id: "contacts";
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  mapsUrl: string;
  /** TODO(client): set to true once the office address is confirmed */
  showAddress: boolean;
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
  showAddress: false,
} as const;

export const contactLinks = {
  tel: `tel:+${PHONE_DIGITS}`,
  viber: `viber://chat?number=%2B${PHONE_DIGITS}`,
  mail: `mailto:${contacts.email}`,
} as const;
