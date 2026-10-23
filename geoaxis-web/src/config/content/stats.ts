export interface StatItem {
  number: string;
  label: string;
}

// Counts are conservative estimates of the team's work since 2008, rounded down on purpose.
export const stats: StatItem[] = [
  { number: "500+", label: "Изпълнени проекта" },
  { number: "15+", label: "Години опит в геодезията" },
  { number: "30+", label: "Вида геодезически услуги" },
  { number: "350+", label: "Клиенти" },
] as const;
