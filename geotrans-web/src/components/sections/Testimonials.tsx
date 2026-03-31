import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Иван Петров",
    role: "Частен клиент",
    text: "Работихме с GeoAxis за геодезическо заснемане на парцел преди започване на строеж. Работата беше свършена бързо и много професионално, а комуникацията беше ясна през целия процес.",
  },
  {
    name: "Мария Георгиева",
    role: "Архитект",
    text: "Отлично съдействие при изготвяне на необходимите геодезически данни за проект. Получихме точни материали и бърза реакция при всякакви въпроси.",
  },
  {
    name: "Николай Стоянов",
    role: "Инвеститор",
    text: "Работили сме с различни геодезисти, но при GeoAxis останахме най-доволни. Точност, коректност и много добро отношение към клиента.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-bg-section py-24">
      {/* <section className="bg-bg-secondary py-24"> */}

      <div className="container-page">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          {/* <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">
            Отзиви
          </p> */}

          <h2 className="typo-h2">Какво казват нашите клиенти</h2>

          <p className="typo-body text-tx-secondary mt-4">
            Доверието на нашите клиенти е най-доброто доказателство за качеството на
            нашата работа.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl bg-bg-page p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            >
              {/* stars */}
              <div className="flex gap-1 text-accent mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              {/* text */}
              <p className="text-tx-secondary leading-relaxed mb-6">“{item.text}”</p>

              {/* author */}
              <div>
                <p className="font-semibold text-tx-primary">{item.name}</p>
                <p className="text-sm text-tx-secondary">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
