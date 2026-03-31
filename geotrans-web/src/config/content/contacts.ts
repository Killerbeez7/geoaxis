export interface ContactsContent {
  id: "contacts";
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  mapsUrl: string;
}

export const contacts: ContactsContent = {
  id: "contacts",
  title: "Свържи се",
  subtitle: "Имаш въпрос или нужда от услуга? Свържи се с нас и ще ти съдействаме.",
  phone: "+359 98 831 6263",
  email: "geoaxis.sofia@gmail.com",
  address: "1618 бул. България||София, България",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sofia%2C+Bulgaria",
} as const;
