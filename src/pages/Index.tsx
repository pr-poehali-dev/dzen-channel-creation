import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/7bd7cf71-9877-4ed8-9d70-3cd182f94736/files/1472e120-e9c5-4de8-b826-96a32335a385.jpg";

function useInView(threshold = 0.15) {
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
    icon: "BarChart3",
    title: "Аналитика и консалтинг",
    desc: "Глубокий анализ бизнес-процессов, выявление точек роста и разработка стратегии масштабирования.",
  },
  {
    icon: "Shield",
    title: "Управление рисками",
    desc: "Комплексная оценка рисков, разработка превентивных мер и антикризисное сопровождение.",
  },
  {
    icon: "Users",
    title: "Операционная поддержка",
    desc: "Оптимизация внутренних процессов, автоматизация рутинных задач и повышение эффективности команды.",
  },
  {
    icon: "Globe",
    title: "Выход на новые рынки",
    desc: "Исследование рынков, адаптация продукта и сопровождение экспансии на новые территории.",
  },
  {
    icon: "Zap",
    title: "Цифровая трансформация",
    desc: "Внедрение современных технологий, цифровизация процессов и обучение команды.",
  },
  {
    icon: "FileText",
    title: "Юридическое сопровождение",
    desc: "Договорная работа, защита интересов компании и сопровождение сложных сделок.",
  },
];

const plans = [
  {
    name: "Самостоятельный материал",
    price: "7 600",
    period: "руб",
    desc: "Готовые материалы для самостоятельного запуска канала",
    features: [
      "Полный обучающий курс",
      "Шаблоны контент-плана",
      "Чек-листы по запуску",
      "Доступ к базе знаний",
      "Поддержка в чате",
    ],
    highlighted: false,
  },
  {
    name: "Личное ведение",
    price: "12 500",
    period: "руб",
    desc: "Никита лично помогает развивать ваш канал",
    features: [
      "Персональные созвоны",
      "Разбор вашего канала",
      "Стратегия роста под вас",
      "Проверка контента",
      "Обратная связь 24/7",
      "Месяц сопровождения",
    ],
    highlighted: true,
  },
  {
    name: "Канал под ключ",
    price: "33 900",
    period: "руб",
    desc: "Никита создаёт и запускает канал полностью за вас",
    features: [
      "Создание канала с нуля",
      "Разработка стратегии",
      "Производство контента",
      "Оформление и упаковка",
      "Запуск и продвижение",
      "Сопровождение 3 месяца",
    ],
    highlighted: false,
  },
];

const stats = [
  { value: "12+", label: "лет на рынке" },
  { value: "380", label: "клиентов B2B" },
  { value: "98%", label: "удержание клиентов" },
  { value: "47", label: "эксперта в команде" },
];

const team = [
  {
    name: "Александр Ветров",
    role: "Генеральный директор",
    exp: "22 года в консалтинге",
  },
  {
    name: "Марина Соколова",
    role: "Директор по развитию",
    exp: "Экс-McKinsey, 15 лет",
  },
  {
    name: "Дмитрий Орлов",
    role: "Технический директор",
    exp: "Архитектор корпоративных систем",
  },
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy-950/98 backdrop-blur-md shadow-2xl" : "bg-transparent"
      }`} style={{ background: scrolled ? "rgba(20, 23, 32, 0.98)" : "transparent" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center" style={{ background: "#2563b0" }}>
                <span className="font-display font-bold text-lg leading-none text-white">Н</span>
              </div>
              <div>
                <span className="font-display font-bold text-white text-xl tracking-wide">Никита Варакин</span>
                <span className="block text-[10px] tracking-[0.2em] uppercase leading-none mt-0.5" style={{ color: "#4e9cf0" }}>Telegram-каналы</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {[
                { id: "home", label: "Главная" },
                { id: "services", label: "Услуги" },
                { id: "about", label: "О нас" },
                { id: "pricing", label: "Тарифы" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-sm tracking-wide transition-colors duration-200 relative group"
                  style={{ color: activeNav === item.id ? "#4e9cf0" : "#cbd5e1" }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: "#2563b0", width: activeNav === item.id ? "100%" : "0" }} />
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => scrollTo("pricing")}
                className="px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200"
                style={{ background: "#2563b0", color: "#ffffff" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#3b82d4")}
                onMouseLeave={e => (e.currentTarget.style.background = "#2563b0")}
              >
                Начать работу
              </button>
            </div>

            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t px-6 py-4" style={{ background: "#141720", borderColor: "#2563b0" }}>
            {[
              { id: "home", label: "Главная" },
              { id: "services", label: "Услуги" },
              { id: "about", label: "О нас" },
              { id: "pricing", label: "Тарифы" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left py-3 border-b last:border-0 text-slate-300 hover:text-white"
                style={{ borderColor: "#253050" }}
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
          <img src={HERO_IMAGE} alt="Команда" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #141720 0%, #1e2330 55%, #253050 100%)", opacity: 0.92 }} />
          <div className="absolute inset-0 bg-subtle-pattern opacity-40" />
        </div>

        <div ref={heroSection.ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl">
            <div className={`${heroSection.inView ? "animate-fade-in" : "opacity-0"}`}>
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase font-medium mb-6" style={{ color: "#4e9cf0" }}>
                <span className="w-8 h-px" style={{ background: "#2563b0" }} />
                Создание Telegram-каналов
              </span>
            </div>

            <h1 className={`font-display text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 ${heroSection.inView ? "animate-fade-in animate-delay-100" : "opacity-0"}`}>
              Никита Варакин<br />
              <span className="text-gradient-gold">создаёт каналы</span>
            </h1>

            <p className={`text-lg md:text-xl leading-relaxed mb-10 max-w-xl text-slate-300 ${heroSection.inView ? "animate-fade-in animate-delay-200" : "opacity-0"}`}>
              Запускаю Telegram-каналы с нуля — от стратегии до контента. Самостоятельное обучение, личное ведение или канал полностью под ключ.
            </p>

            <div className={`flex flex-wrap gap-4 ${heroSection.inView ? "animate-fade-in animate-delay-300" : "opacity-0"}`}>
              <button
                onClick={() => scrollTo("pricing")}
                className="px-8 py-4 font-semibold text-sm tracking-wide flex items-center gap-2 transition-all duration-200"
                style={{ background: "#2563b0", color: "#ffffff" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#3b82d4")}
                onMouseLeave={e => (e.currentTarget.style.background = "#2563b0")}
              >
                Выбрать тариф
                <Icon name="ArrowRight" size={16} />
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="px-8 py-4 border text-white font-medium text-sm tracking-wide transition-all duration-200 hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                Узнать об услугах
              </button>
            </div>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t ${heroSection.inView ? "animate-fade-in animate-delay-500" : "opacity-0"}`}
            style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            {stats.map((s) => (
              <div key={s.value} className="text-center md:text-left">
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">{s.value}</div>
                <div className="text-sm mt-1 tracking-wide text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 bg-white">
        <div ref={servicesSection.ref} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`mb-16 ${servicesSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "#2563b0" }}>Что я предлагаю</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" style={{ color: "#1e2330" }}>
              Наши услуги
            </h2>
            <div className="divider-gold mb-5" />
            <p className="text-muted-foreground text-lg max-w-xl">
              Комплексное сопровождение бизнеса на каждом этапе развития
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`group p-8 border bg-white card-hover cursor-pointer ${servicesSection.inView ? "animate-fade-in" : "opacity-0"}`}
                style={{ borderColor: "#e2e8f0", animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-blue-600"
                  style={{ background: "#eff6ff" }}>
                  <Icon name={s.icon} size={22} className="transition-colors duration-300 group-hover:text-white" style={{ color: "#2563b0" }} fallback="Briefcase" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3" style={{ color: "#1e2330" }}>{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "#2563b0" }}>
                  <span>Подробнее</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #141720 0%, #1e2330 60%, #253050 100%)" }}>
        <div className="absolute inset-0 bg-subtle-pattern opacity-20" />
        <div ref={aboutSection.ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`${aboutSection.inView ? "animate-fade-in" : "opacity-0"}`}>
              <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "#4e9cf0" }}>Обо мне</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Никита Варакин</h2>
              <div className="divider-gold mb-6" />
              <p className="text-lg leading-relaxed mb-6 text-slate-300">
                Создаю и развиваю Telegram-каналы с 2020 года. Прошёл путь от нуля до каналов с десятками тысяч подписчиков — и помогаю сделать то же самое для вас.
              </p>
              <p className="leading-relaxed mb-8 text-slate-400">
                Работаю в трёх форматах: обучаю через готовые материалы, лично сопровождаю рост вашего канала или создаю канал полностью с нуля под ключ.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Опыт создания каналов с 2020 года",
                  "Понятная стратегия роста под вашу нишу",
                  "Результат — живая аудитория и монетизация",
                  "Работаю лично, без делегирования помощникам",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ background: "#2563b0" }}>
                      <Icon name="Check" size={12} style={{ color: "#ffffff" }} />
                    </div>
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${aboutSection.inView ? "animate-slide-in-right animate-delay-200" : "opacity-0"}`}>
              <div className="space-y-4">
                {team.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center gap-5 p-5 border backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
                    style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 border" style={{ background: "#253050", borderColor: "rgba(255,255,255,0.2)" }}>
                      <Icon name="User" size={20} style={{ color: "#4e9cf0" }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold font-display text-lg">{member.name}</div>
                      <div className="text-xs tracking-wide mt-0.5" style={{ color: "#4e9cf0" }}>{member.role}</div>
                      <div className="text-xs mt-1 text-slate-500">{member.exp}</div>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-slate-500" />
                  </div>
                ))}

                <div className="p-5 border" style={{ borderColor: "rgba(37,99,176,0.4)", background: "rgba(37,99,176,0.08)" }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,99,176,0.25)" }}>
                      <Icon name="Award" size={18} style={{ color: "#4e9cf0" }} />
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">Результаты работы</div>
                      <div className="text-sm text-slate-400">Каналы от 500 до 80 000+ подписчиков · Монетизация · Разные ниши</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANAGER SUPPORT BANNER */}
      <section className="py-16" style={{ background: "#2563b0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
                <Icon name="Send" size={28} style={{ color: "#ffffff" }} />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white">Telegram-канал, который работает</div>
                <div className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>Никита лично занимается каждым проектом</div>
              </div>
            </div>
            <button
              onClick={() => scrollTo("pricing")}
              className="px-8 py-3.5 font-semibold text-sm tracking-wide flex items-center gap-2 flex-shrink-0 transition-colors duration-200 text-white"
              style={{ background: "#141720" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1e2330")}
              onMouseLeave={e => (e.currentTarget.style.background = "#141720")}
            >
              Выбрать формат
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-28 bg-background">
        <div ref={pricingSection.ref} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`mb-16 text-center ${pricingSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "#2563b0" }}>Стоимость</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" style={{ color: "#1e2330" }}>
              Тарифные планы
            </h2>
            <div className="divider-gold mx-auto mb-5" />
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Прозрачное ценообразование без скрытых платежей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative flex flex-col ${pricingSection.inView ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="text-xs font-bold tracking-widest uppercase px-5 py-1.5" style={{ background: "#2563b0", color: "#ffffff" }}>
                      Популярный
                    </span>
                  </div>
                )}
                <div className="flex flex-col flex-1 p-8 border-2" style={{
                  borderColor: plan.highlighted ? "#2563b0" : "#e2e8f0",
                  background: plan.highlighted ? "#1e2330" : "white"
                }}>
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase font-medium mb-1" style={{ color: plan.highlighted ? "#e8c04a" : "#94a3b8" }}>
                      {plan.name}
                    </div>
                    <div className="flex items-end gap-1 mb-2">
                      <span className="font-display text-4xl font-bold" style={{ color: plan.highlighted ? "white" : "#0e2458" }}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-sm mb-1.5" style={{ color: plan.highlighted ? "#94a3b8" : "#94a3b8" }}>
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-sm mb-6" style={{ color: plan.highlighted ? "#94a3b8" : "#94a3b8" }}>
                      {plan.desc}
                    </p>
                    <div className="h-px mb-6" style={{ background: plan.highlighted ? "rgba(255,255,255,0.1)" : "#f1f5f9" }} />
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0"
                            style={{ background: plan.highlighted ? "rgba(78,156,240,0.2)" : "#eff6ff" }}>
                            <Icon name="Check" size={10} style={{ color: plan.highlighted ? "#4e9cf0" : "#2563b0" }} />
                          </div>
                          <span className="text-sm" style={{ color: plan.highlighted ? "#cbd5e1" : "#475569" }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="mt-auto w-full py-3.5 font-semibold text-sm tracking-wide transition-all duration-200"
                    style={plan.highlighted
                      ? { background: "#2563b0", color: "#ffffff" }
                      : { border: "2px solid #1e2330", color: "#1e2330", background: "transparent" }}
                    onMouseEnter={e => {
                      if (plan.highlighted) e.currentTarget.style.background = "#3b82d4";
                      else { e.currentTarget.style.background = "#1e2330"; e.currentTarget.style.color = "white"; }
                    }}
                    onMouseLeave={e => {
                      if (plan.highlighted) e.currentTarget.style.background = "#2563b0";
                      else { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1e2330"; }
                    }}
                  >
                    {plan.price === "По запросу" ? "Обсудить условия" : "Подключить"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-12 p-6 border flex flex-col md:flex-row items-center gap-4 bg-white ${pricingSection.inView ? "animate-fade-in animate-delay-400" : "opacity-0"}`}
            style={{ borderColor: "#e2e8f0" }}>
            <Icon name="Info" size={20} className="flex-shrink-0" style={{ color: "#2563b0" }} />
            <p className="text-slate-500 text-sm">
              Все форматы включают <strong style={{ color: "#1e2330" }}>личное участие Никиты</strong>. Оплата разовая, доступ к материалам — бессрочный. Есть вопросы? Напишите перед покупкой.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#141720" }}>
        <div className="absolute inset-0 bg-subtle-pattern opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "#4e9cf0" }}>Начните сегодня</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-5">
            Готовы запустить канал?
          </h2>
          <p className="text-lg mb-10 max-w-lg mx-auto text-slate-400">
            Выберите подходящий формат и напишите Никите — он ответит и поможет определиться.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-10 py-4 font-semibold text-sm tracking-wide transition-colors duration-200"
              style={{ background: "#2563b0", color: "#ffffff" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#3b82d4")}
              onMouseLeave={e => (e.currentTarget.style.background = "#2563b0")}
            >
              Написать Никите
            </button>
            <button
              className="px-10 py-4 border text-white text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              <Icon name="Phone" size={16} />
              +7 (495) 000-00-00
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t" style={{ background: "#000000", borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 flex items-center justify-center" style={{ background: "#2563b0" }}>
                <span className="font-display font-bold text-sm text-white">Н</span>
              </div>
              <span className="font-display text-white font-semibold">Никита Варакин</span>
            </div>
            <div className="text-xs" style={{ color: "#475569" }}>
              © 2024 Никита Варакин. Все права защищены.
            </div>
            <div className="flex gap-6 text-xs" style={{ color: "#475569" }}>
              <button className="hover:text-slate-400 transition-colors">Политика конфиденциальности</button>
              <button className="hover:text-slate-400 transition-colors">Реквизиты</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}