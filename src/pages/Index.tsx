import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/7bd7cf71-9877-4ed8-9d70-3cd182f94736/files/94bbae78-8b50-428d-9145-da4309f2561b.jpg";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const services = [
  {
    icon: "PenLine",
    title: "Обучающие материалы",
    desc: "Всё что нужно для самостоятельного старта — курс, шаблоны, примеры и разборы реальных каналов.",
  },
  {
    icon: "TrendingUp",
    title: "Рост аудитории",
    desc: "Стратегия продвижения в Дзене, которая привлекает живых читателей, а не ботов.",
  },
  {
    icon: "Sparkles",
    title: "Контент-стратегия",
    desc: "Находим твою нишу, голос и темы — чтобы писать с кайфом и читатели возвращались.",
  },
  {
    icon: "DollarSign",
    title: "Монетизация",
    desc: "Как зарабатывать на Дзен-канале: реклама, партнёрки, продажи. Конкретные схемы.",
  },
  {
    icon: "MessageCircle",
    title: "Личное ведение",
    desc: "Никита лично разбирает твой канал, даёт обратную связь и помогает расти каждую неделю.",
  },
  {
    icon: "Rocket",
    title: "Канал под ключ",
    desc: "Создаём канал с нуля — от идеи и оформления до первых публикаций и аудитории.",
  },
];

const plans = [
  {
    name: "Самостоятельный материал",
    price: "7 600",
    period: "руб",
    desc: "Всё для старта — сам, в своём темпе",
    features: [
      "Полный обучающий курс",
      "Шаблоны контент-плана",
      "Чек-листы по запуску",
      "Доступ к базе знаний",
      "Поддержка в чате",
    ],
    highlighted: false,
    emoji: "📚",
  },
  {
    name: "Личное ведение",
    price: "12 500",
    period: "руб",
    desc: "Никита лично помогает расти",
    features: [
      "Персональные созвоны",
      "Разбор твоего канала",
      "Стратегия роста под тебя",
      "Проверка контента",
      "Обратная связь всегда",
      "Месяц сопровождения",
    ],
    highlighted: true,
    emoji: "🤝",
  },
  {
    name: "Канал под ключ",
    price: "33 900",
    period: "руб",
    desc: "Никита делает всё сам — ты получаешь канал",
    features: [
      "Создание канала с нуля",
      "Разработка стратегии",
      "Производство контента",
      "Оформление и упаковка",
      "Запуск и продвижение",
      "Сопровождение 3 месяца",
    ],
    highlighted: false,
    emoji: "🚀",
  },
];

const stats = [
  { value: "4+", label: "года в Дзене" },
  { value: "50к+", label: "подписчиков суммарно" },
  { value: "30+", label: "каналов запущено" },
  { value: "×8", label: "средний рост за 3 мес" },
];

const results = [
  { name: "Канал о путешествиях", result: "0 → 12 000 подписчиков за 4 месяца" },
  { name: "Финансовый блог", result: "Монетизация с первого месяца" },
  { name: "Авто-канал", result: "8 000 читателей, рекламный доход от 80к/мес" },
];

export default function Index() {
  const [activeNav, setActiveNav] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroSection = useInView();
  const servicesSection = useInView();
  const aboutSection = useInView();
  const pricingSection = useInView();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans">

      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{ background: scrolled ? "rgba(28, 22, 18, 0.96)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none" }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18" style={{ height: "72px" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-display font-semibold text-sm"
                style={{ background: "linear-gradient(135deg, #e8630a, #f5c842)" }}>
                Н
              </div>
              <div>
                <span className="font-display font-medium text-white text-base tracking-tight">Никита Варакин</span>
                <span className="block text-[10px] leading-none mt-0.5" style={{ color: "#f5c842", opacity: 0.9 }}>Дзен-каналы</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-7">
              {[
                { id: "home", label: "Главная" },
                { id: "services", label: "Услуги" },
                { id: "about", label: "Обо мне" },
                { id: "pricing", label: "Тарифы" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-sm font-light transition-all duration-200"
                  style={{ color: activeNav === item.id ? "#f5c842" : "rgba(255,255,255,0.75)" }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden md:block">
              <button
                onClick={() => scrollTo("pricing")}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{ background: "#e8630a", color: "#fff" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f07c2a")}
                onMouseLeave={e => (e.currentTarget.style.background = "#e8630a")}
              >
                Выбрать тариф
              </button>
            </div>

            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 py-5 space-y-3" style={{ background: "rgba(28,22,18,0.98)" }}>
            {[
              { id: "home", label: "Главная" },
              { id: "services", label: "Услуги" },
              { id: "about", label: "Обо мне" },
              { id: "pricing", label: "Тарифы" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left py-2 text-white/75 hover:text-white transition-colors text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Audi A6 C8" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(28,22,18,0.88) 45%, rgba(28,22,18,0.3) 100%)" }} />
          <div className="absolute inset-0 bg-subtle-pattern" />
        </div>

        <div ref={heroSection.ref} className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full">
          <div className="max-w-2xl">
            <div className={heroSection.inView ? "animate-fade-in" : "opacity-0"}>
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-medium mb-8"
                style={{ color: "#f5c842" }}>
                <span className="w-6 h-px" style={{ background: "#f5c842" }} />
                Дзен-каналы с душой
              </span>
            </div>

            <h1 className={`font-display text-4xl md:text-6xl font-medium text-white leading-[1.15] mb-6 ${heroSection.inView ? "animate-fade-in animate-delay-100" : "opacity-0"}`}>
              Пишешь —<br />
              <span className="text-gradient-gold">тебя читают</span>
            </h1>

            <p className={`text-lg leading-relaxed mb-10 font-light ${heroSection.inView ? "animate-fade-in animate-delay-200" : "opacity-0"}`}
              style={{ color: "rgba(255,255,255,0.7)", maxWidth: "440px" }}>
              Помогаю запустить Дзен-канал, который живёт и растёт. Самостоятельно, вместе или под ключ — выбери как тебе удобно.
            </p>

            <div className={`flex flex-wrap gap-3 ${heroSection.inView ? "animate-fade-in animate-delay-300" : "opacity-0"}`}>
              <button
                onClick={() => scrollTo("pricing")}
                className="px-7 py-3.5 rounded-full font-medium text-sm flex items-center gap-2 transition-all duration-200"
                style={{ background: "#e8630a", color: "#fff" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f07c2a")}
                onMouseLeave={e => (e.currentTarget.style.background = "#e8630a")}
              >
                Смотреть тарифы
                <Icon name="ArrowRight" size={15} />
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="px-7 py-3.5 rounded-full text-sm font-light transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.85)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                Обо мне
              </button>
            </div>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 pt-10 border-t ${heroSection.inView ? "animate-fade-in animate-delay-500" : "opacity-0"}`}
            style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            {stats.map((s) => (
              <div key={s.value}>
                <div className="font-display text-3xl md:text-4xl font-medium text-gradient-gold">{s.value}</div>
                <div className="text-sm font-light mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24" style={{ background: "#faf8f5" }}>
        <div ref={servicesSection.ref} className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className={`mb-14 ${servicesSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <span className="text-[11px] tracking-[0.25em] uppercase font-medium" style={{ color: "#e8630a" }}>что я делаю</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 mb-2" style={{ color: "#1c1612" }}>
              Направления работы
            </h2>
            <div className="divider-gold mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`group p-7 rounded-2xl bg-white card-hover cursor-pointer border ${servicesSection.inView ? "animate-fade-in" : "opacity-0"}`}
                style={{ borderColor: "#f0ebe3", animationDelay: `${i * 0.07}s` }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, rgba(232,99,10,0.12), rgba(245,200,66,0.12))" }}>
                  <Icon name={s.icon} size={20} style={{ color: "#e8630a" }} fallback="Star" />
                </div>
                <h3 className="font-display text-lg font-medium mb-2" style={{ color: "#1c1612" }}>{s.title}</h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: "#7a6f65" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 relative overflow-hidden" style={{ background: "#1c1612" }}>
        <div className="absolute inset-0 bg-subtle-pattern opacity-30" />
        <div ref={aboutSection.ref} className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className={aboutSection.inView ? "animate-fade-in" : "opacity-0"}>
              <span className="text-[11px] tracking-[0.25em] uppercase font-medium" style={{ color: "#f5c842" }}>обо мне</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-white mt-3 mb-4">
                Никита Варакин
              </h2>
              <div className="divider-gold mb-7" />
              <p className="text-lg font-light leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>
                Создаю и развиваю Дзен-каналы с 2020 года. Начинал с нуля — сейчас суммарно больше 50 000 читателей на своих и клиентских каналах.
              </p>
              <p className="font-light leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>
                Я не про теорию. Работаю лично с каждым — никаких команд и помощников. Ты получаешь честную обратную связь и понятный план, что делать дальше.
              </p>
              <div className="space-y-3">
                {[
                  "Работаю лично, не делегирую",
                  "Опыт в разных нишах: авто, финансы, путешествия",
                  "Реальные результаты у реальных людей",
                  "Монетизация — не слова, а конкретные схемы",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-base" style={{ color: "#e8630a" }}>→</span>
                    <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.8)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${aboutSection.inView ? "animate-slide-in-right animate-delay-200" : "opacity-0"} space-y-4`}>
              <div className="text-[11px] tracking-[0.2em] uppercase font-medium mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
                результаты клиентов
              </div>
              {results.map((r, i) => (
                <div
                  key={r.name}
                  className="p-5 rounded-2xl border transition-all duration-200 hover:border-orange-500/40"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.08)",
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  <div className="text-white font-medium mb-1">{r.name}</div>
                  <div className="text-sm font-light" style={{ color: "#f5c842" }}>{r.result}</div>
                </div>
              ))}

              <div className="p-5 rounded-2xl border mt-2"
                style={{ borderColor: "rgba(232,99,10,0.35)", background: "rgba(232,99,10,0.07)" }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <div className="text-white font-medium text-sm">Твой канал — следующий?</div>
                    <div className="text-sm font-light mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Напиши, обсудим бесплатно</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="py-14" style={{ background: "linear-gradient(135deg, #e8630a 0%, #f5a623 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-3xl">🎯</span>
              <div>
                <div className="font-display text-xl font-medium text-white">Дзен-канал с нуля до первых читателей</div>
                <div className="text-sm font-light mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>Никита делает это лично — в любом из форматов</div>
              </div>
            </div>
            <button
              onClick={() => scrollTo("pricing")}
              className="px-7 py-3 rounded-full font-medium text-sm flex items-center gap-2 flex-shrink-0 transition-all duration-200"
              style={{ background: "#1c1612", color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#2a1f14")}
              onMouseLeave={e => (e.currentTarget.style.background = "#1c1612")}
            >
              Выбрать формат
              <Icon name="ArrowRight" size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24" style={{ background: "#faf8f5" }}>
        <div ref={pricingSection.ref} className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className={`mb-14 text-center ${pricingSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <span className="text-[11px] tracking-[0.25em] uppercase font-medium" style={{ color: "#e8630a" }}>тарифы</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 mb-2" style={{ color: "#1c1612" }}>
              Выбери свой формат
            </h2>
            <div className="divider-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative flex flex-col ${pricingSection.inView ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="text-xs font-medium px-4 py-1 rounded-full"
                      style={{ background: "#e8630a", color: "#fff" }}>
                      🔥 Популярный
                    </span>
                  </div>
                )}
                <div
                  className="flex flex-col flex-1 p-7 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg"
                  style={{
                    borderColor: plan.highlighted ? "#e8630a" : "#f0ebe3",
                    background: plan.highlighted ? "#1c1612" : "white",
                  }}
                >
                  <div className="text-3xl mb-4">{plan.emoji}</div>
                  <div className="text-[11px] tracking-[0.15em] uppercase font-medium mb-1"
                    style={{ color: plan.highlighted ? "rgba(255,255,255,0.45)" : "#a89888" }}>
                    {plan.name}
                  </div>
                  <div className="flex items-end gap-1.5 mb-1">
                    <span className="font-display text-3xl font-medium"
                      style={{ color: plan.highlighted ? "#fff" : "#1c1612" }}>
                      {plan.price}
                    </span>
                    <span className="text-sm font-light mb-1"
                      style={{ color: plan.highlighted ? "rgba(255,255,255,0.4)" : "#a89888" }}>
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm font-light mb-5"
                    style={{ color: plan.highlighted ? "rgba(255,255,255,0.55)" : "#7a6f65" }}>
                    {plan.desc}
                  </p>
                  <div className="h-px mb-5"
                    style={{ background: plan.highlighted ? "rgba(255,255,255,0.08)" : "#f0ebe3" }} />
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm font-light"
                        style={{ color: plan.highlighted ? "rgba(255,255,255,0.75)" : "#4a3f35" }}>
                        <span style={{ color: "#e8630a" }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="mt-auto w-full py-3 rounded-full font-medium text-sm transition-all duration-200"
                    style={plan.highlighted
                      ? { background: "#e8630a", color: "#fff" }
                      : { border: "1.5px solid #1c1612", color: "#1c1612", background: "transparent" }}
                    onMouseEnter={e => {
                      if (plan.highlighted) e.currentTarget.style.background = "#f07c2a";
                      else { e.currentTarget.style.background = "#1c1612"; e.currentTarget.style.color = "#fff"; }
                    }}
                    onMouseLeave={e => {
                      if (plan.highlighted) e.currentTarget.style.background = "#e8630a";
                      else { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1c1612"; }
                    }}
                  >
                    {plan.price === "33 900" ? "Обсудить" : "Выбрать"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className={`text-center text-sm font-light mt-8 ${pricingSection.inView ? "animate-fade-in animate-delay-400" : "opacity-0"}`}
            style={{ color: "#a89888" }}>
            Оплата разовая · Доступ бессрочный · Есть вопрос? Напиши сначала 👋
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#1c1612" }}>
        <div className="absolute inset-0 bg-subtle-pattern opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="text-3xl block mb-5">✌️</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-4">
            Готов запустить свой Дзен-канал?
          </h2>
          <p className="font-light mb-10" style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.05rem" }}>
            Напиши Никите — разберёмся вместе, какой формат подходит именно тебе.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-200"
              style={{ background: "#e8630a", color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f07c2a")}
              onMouseLeave={e => (e.currentTarget.style.background = "#e8630a")}
            >
              Написать Никите
            </button>
            <button
              onClick={() => scrollTo("pricing")}
              className="px-8 py-3.5 rounded-full text-sm font-light transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              Посмотреть тарифы
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t" style={{ background: "#100e0b", borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-display font-semibold text-xs"
                style={{ background: "linear-gradient(135deg, #e8630a, #f5c842)" }}>
                Н
              </div>
              <span className="font-display text-white font-medium text-sm">Никита Варакин</span>
            </div>
            <div className="text-xs font-light" style={{ color: "rgba(255,255,255,0.25)" }}>
              © 2024 Никита Варакин · Дзен-каналы
            </div>
            <div className="flex gap-5 text-xs font-light" style={{ color: "rgba(255,255,255,0.3)" }}>
              <button className="hover:text-white/60 transition-colors">Политика</button>
              <button className="hover:text-white/60 transition-colors">Контакты</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
