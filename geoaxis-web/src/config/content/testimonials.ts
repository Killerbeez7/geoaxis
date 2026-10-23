export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  // Where the review was left (e.g. "Google"), so readers can verify it
  source: string;
  sourceUrl?: string;
}

export interface TestimonialsContent {
  id: "testimonials";
  kicker?: string;
  title: string;
  subtitle: string;
  // TODO(client): add only real reviews, with the client's permission.
  // The section stays hidden while the list is empty.
  items: Testimonial[];
}

export const testimonials: TestimonialsContent = {
  id: "testimonials",
  kicker: "Отзиви",
  title: "Какво казват нашите клиенти",
  subtitle: "Отзиви от клиенти, публикувани в Google.",
  items: [],
};
