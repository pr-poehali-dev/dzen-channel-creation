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
    name: "Старт",
    price: "49 000",
    period: "/ месяц",
    desc: "Для компаний на старте роста",
    features: [
      "Личный менеджер",
      "Техническая поддержка 8×5",
      "Ежемесячный отчёт",
      "До 3 консультаций в месяц",
      "Доступ к базе знаний",
    ],
    highlighted: false,
  },
  {
    name: "Бизнес",
    price: "129 000",
    period: "/ месяц",
    desc: "Для активно развивающихся компаний",
    features: [
      "Выделенный менеджер",
      "Техническая поддержка 24×7",
      "Еженедельный отчёт",
      "Неограниченные консультации",
      "Приоритетная обработка задач",
      "Аналитическая панель",
    ],
    highlighted: true,
  },
  {
    name: "Корпорат",
    price: "По запросу",
    period: "",
    desc: "Индивидуальное решение для крупного бизнеса",
    features: [
      "Команда из 3+ менеджеров",
      "Поддержка 24×7 + SLA",
      "Ежедневный отчёт",
      "Полный консалтинг",
      "Выезд специалистов",
      "Кастомная интеграция",
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
      }`} style={{ background: scrolled ? "rgba(6, 15, 40, 0.98)" : "transparent" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center" style={{ background: "#d4a820" }}>
                <span className="font-display font-bold text-lg leading-none" style={{ color: "#060f28" }}>П</span>
              </div>
              <div>
                <span className="font-display font-bold text-white text-xl tracking-wide">ПрофиГрупп</span>
                <span className="block text-[10px] tracking-[0.2em] uppercase leading-none mt-0.5" style={{ color: "#e8c04a" }}>B2B Solutions</span>
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
                  style={{ color: activeNav === item.id ? "#e8c04a" : "#cbd5e1" }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: "#d4a820", width: activeNav === item.id ? "100%" : "0" }} />
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => scrollTo("pricing")}
                className="px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200"
                style={{ background: "#d4a820", color: "#060f28" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#e8c04a")}
                onMouseLeave={e => (e.currentTarget.style.background = "#d4a820")}
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
          <div className="md:hidden border-t px-6 py-4" style={{ background: "#060f28", borderColor: "#1a4a8a" }}>
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
                style={{ borderColor: "#1a4a8a" }}
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
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #060f28 0%, #0e2458 50%, #1a4a8a 100%)", opacity: 0.9 }} />
          <div className="absolute inset-0 bg-subtle-pattern opacity-40" />
        </div>

        <div ref={heroSection.ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl">
            <div className={`${heroSection.inView ? "animate-fade-in" : "opacity-0"}`}>
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase font-medium mb-6" style={{ color: "#e8c04a" }}>
                <span className="w-8 h-px" style={{ background: "#d4a820" }} />
                Профессиональные B2B решения
              </span>
            </div>

            <h1 className={`font-display text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 ${heroSection.inView ? "animate-fade-in animate-delay-100" : "opacity-0"}`}>
              Надёжный партнёр<br />
              <span className="text-gradient-gold">для вашего бизнеса</span>
            </h1>

            <p className={`text-lg md:text-xl leading-relaxed mb-10 max-w-xl text-slate-300 ${heroSection.inView ? "animate-fade-in animate-delay-200" : "opacity-0"}`}>
              Личный менеджер и техническая поддержка 24/7 для каждого клиента. Решаем задачи корпоративного уровня с гарантией результата.
            </p>

            <div className={`flex flex-wrap gap-4 ${heroSection.inView ? "animate-fade-in animate-delay-300" : "opacity-0"}`}>
              <button
                onClick={() => scrollTo("pricing")}
                className="px-8 py-4 font-semibold text-sm tracking-wide flex items-center gap-2 transition-all duration-200"
                style={{ background: "#d4a820", color: "#060f28" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#e8c04a")}
                onMouseLeave={e => (e.currentTarget.style.background = "#d4a820")}
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
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "#b8900a" }}>Что мы делаем</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" style={{ color: "#0e2458" }}>
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
                <div className="w-12 h-12 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-amber-400"
                  style={{ background: "#f0f4fa" }}>
                  <Icon name={s.icon} size={22} className="transition-colors duration-300" style={{ color: "#1a4a8a" }} fallback="Briefcase" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3" style={{ color: "#0e2458" }}>{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "#b8900a" }}>
                  <span>Подробнее</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #060f28 0%, #0e2458 50%, #1a4a8a 100%)" }}>
        <div className="absolute inset-0 bg-subtle-pattern opacity-20" />
        <div ref={aboutSection.ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`${aboutSection.inView ? "animate-fade-in" : "opacity-0"}`}>
              <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "#e8c04a" }}>Кто мы</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 mb-4">О компании</h2>
              <div className="divider-gold mb-6" />
              <p className="text-lg leading-relaxed mb-6 text-slate-300">
                ПрофиГрупп — ведущая консалтинговая компания в сфере B2B. Более 12 лет мы помогаем бизнесу расти, оптимизировать процессы и выходить на новые рынки.
              </p>
              <p className="leading-relaxed mb-8 text-slate-400">
                Наш подход основан на глубоком понимании специфики каждого клиента. За каждой компанией закрепляется персональный менеджер, который знает ваш бизнес изнутри и доступен круглосуточно.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Персональный менеджер для каждого клиента",
                  "Техническая поддержка 24/7 без ожидания",
                  "Гарантия результата по договору",
                  "Конфиденциальность и безопасность данных",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ background: "#d4a820" }}>
                      <Icon name="Check" size={12} style={{ color: "#060f28" }} />
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
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 border" style={{ background: "#1a4a8a", borderColor: "rgba(255,255,255,0.2)" }}>
                      <Icon name="User" size={20} style={{ color: "#e8c04a" }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold font-display text-lg">{member.name}</div>
                      <div className="text-xs tracking-wide mt-0.5" style={{ color: "#e8c04a" }}>{member.role}</div>
                      <div className="text-xs mt-1 text-slate-500">{member.exp}</div>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-slate-500" />
                  </div>
                ))}

                <div className="p-5 border" style={{ borderColor: "rgba(212,168,32,0.3)", background: "rgba(212,168,32,0.05)" }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,168,32,0.2)" }}>
                      <Icon name="Award" size={18} style={{ color: "#e8c04a" }} />
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">Лицензии и сертификаты</div>
                      <div className="text-sm text-slate-400">ISO 9001:2015 · Член ТПП РФ · Аккредитация Минэкономразвития</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANAGER SUPPORT BANNER */}
      <section className="py-16" style={{ background: "#d4a820" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0" style={{ background: "rgba(6,15,40,0.2)" }}>
                <Icon name="Headphones" size={28} style={{ color: "#060f28" }} />
              </div>
              <div>
                <div className="font-display text-2xl font-bold" style={{ color: "#060f28" }}>Личный менеджер и поддержка 24/7</div>
                <div className="text-sm mt-0.5" style={{ color: "#1a4a8a" }}>Ваш персональный специалист доступен в любое время суток</div>
              </div>
            </div>
            <button
              onClick={() => scrollTo("pricing")}
              className="px-8 py-3.5 font-semibold text-sm tracking-wide flex items-center gap-2 flex-shrink-0 transition-colors duration-200 text-white"
              style={{ background: "#060f28" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#0e2458")}
              onMouseLeave={e => (e.currentTarget.style.background = "#060f28")}
            >
              Получить менеджера
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-28 bg-background">
        <div ref={pricingSection.ref} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`mb-16 text-center ${pricingSection.inView ? "animate-fade-in" : "opacity-0"}`}>
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "#b8900a" }}>Стоимость услуг</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4" style={{ color: "#0e2458" }}>
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
                    <span className="text-xs font-bold tracking-widest uppercase px-5 py-1.5" style={{ background: "#d4a820", color: "#060f28" }}>
                      Популярный
                    </span>
                  </div>
                )}
                <div className="flex flex-col flex-1 p-8 border-2" style={{
                  borderColor: plan.highlighted ? "#d4a820" : "#e2e8f0",
                  background: plan.highlighted ? "#060f28" : "white"
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
                            style={{ background: plan.highlighted ? "rgba(212,168,32,0.2)" : "#f0f4fa" }}>
                            <Icon name="Check" size={10} style={{ color: plan.highlighted ? "#e8c04a" : "#1a4a8a" }} />
                          </div>
                          <span className="text-sm" style={{ color: plan.highlighted ? "#cbd5e1" : "#475569" }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="mt-auto w-full py-3.5 font-semibold text-sm tracking-wide transition-all duration-200"
                    style={plan.highlighted
                      ? { background: "#d4a820", color: "#060f28" }
                      : { border: "2px solid #0e2458", color: "#0e2458", background: "transparent" }}
                    onMouseEnter={e => {
                      if (plan.highlighted) e.currentTarget.style.background = "#e8c04a";
                      else { e.currentTarget.style.background = "#0e2458"; e.currentTarget.style.color = "white"; }
                    }}
                    onMouseLeave={e => {
                      if (plan.highlighted) e.currentTarget.style.background = "#d4a820";
                      else { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0e2458"; }
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
            <Icon name="Info" size={20} className="flex-shrink-0" style={{ color: "#b8900a" }} />
            <p className="text-slate-500 text-sm">
              Все тарифы включают <strong className="text-navy-800" style={{ color: "#0e2458" }}>персонального менеджера</strong> и <strong style={{ color: "#0e2458" }}>техническую поддержку</strong>. Для корпоративных клиентов действуют индивидуальные условия. Оплата ежемесячно или ежеквартально.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#060f28" }}>
        <div className="absolute inset-0 bg-subtle-pattern opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "#e8c04a" }}>Начните сегодня</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-5">
            Готовы к сотрудничеству?
          </h2>
          <p className="text-lg mb-10 max-w-lg mx-auto text-slate-400">
            Оставьте заявку — ваш персональный менеджер свяжется в течение 2 часов в рабочее время.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-10 py-4 font-semibold text-sm tracking-wide transition-colors duration-200"
              style={{ background: "#d4a820", color: "#060f28" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#e8c04a")}
              onMouseLeave={e => (e.currentTarget.style.background = "#d4a820")}
            >
              Оставить заявку
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
              <div className="w-7 h-7 flex items-center justify-center" style={{ background: "#d4a820" }}>
                <span className="font-display font-bold text-sm" style={{ color: "#060f28" }}>П</span>
              </div>
              <span className="font-display text-white font-semibold">ПрофиГрупп</span>
            </div>
            <div className="text-xs" style={{ color: "#475569" }}>
              © 2024 ПрофиГрупп. Все права защищены.
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