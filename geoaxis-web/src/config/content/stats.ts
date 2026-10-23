export interface StatItem {
  number: string;
  label: string;
}

// TODO(client): confirm the project and client counts before publishing.
export const stats: StatItem[] = [
  { number: "570+", label: "Успешни проекта" },
  { number: "15+", label: "Години опит" },
  { number: "30+", label: "Вида геодезически услуги" },
  { number: "375+", label: "Доволни клиенти" },
] as const;
