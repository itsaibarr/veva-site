// All copy for both languages. Every card claim is limited to what the linked
// page shows. test.mjs greps the built HTML for the red list below and checks
// every external link, so a claim that cannot be opened cannot ship.

export const RED_LIST = [
  // owner's standing prohibitions (profile/cv-fact-inventory.md §7, outsource-agency red list)
  "Hive", "contributor", "top 10", "топ-10", "top-10",
  "subscriber", "подписчик", "revenue", "выручк", "$",
  "reply rate", "48%", "Cornell", "sci-MI",
  "16 years", "мне 16", "I'm 16", "years old",
  "wacli", "proxy", "прокси",
  "TODO",
];

const CONTACT = {
  telegram: { href: "https://t.me/aibarerzhuman", value: "@aibarerzhuman" },
  whatsapp: { href: "https://wa.me/77079526141", value: "+7 707 952 61 41" },
  email: { href: "mailto:a.yerzhuman@spectrum.edu.kz", value: "a.yerzhuman@spectrum.edu.kz" },
  github: { href: "https://github.com/itsaibarr", value: "github.com/itsaibarr" },
  linkedin: { href: "https://www.linkedin.com/in/aibar-yerzhuman", value: "in/aibar-yerzhuman" },
};

const LINKS = {
  resona: "https://resona.work",
  outreach: "https://outreach-gamma-opal.vercel.app",
  klip: "https://klip.website",
  hackathonOps: "https://hackathon-ops.vercel.app",
  scout: "https://www.tryscout.study",
  strata: "https://strata-delta.vercel.app",
  strataCode: "https://github.com/itsaibarr/HR_manager",
  sharpki: "https://sharpki.online",
  antitrash: "https://antitrash-mailing.vercel.app",
  edureview: "https://www.sharedureview.site",
  veva: "https://veva.kz",
};

export const BUILT_ON = "2026-09-07";

// Section order, shared by the nav, the template and the test.
export const SECTIONS = ["help", "work", "veva", "how", "contact"];

// The outreach engine's public status document, shown on its card instead of a screenshot.
export const STATUS_JSON = `{
  "service": "resona-outreach",
  "killSwitch": "on",
  "sendEnabled": false
}`;

export const CONTENT = {
  ru: {
    lang: "ru",
    path: "/",
    title: "Айбар Ержуман — ИИ-системы, автоматизация, цифровые продукты",
    description:
      "Собираю ИИ-интеграции, внутренние инструменты и сайты, которыми бизнес реально пользуется. Пять продуктов на своих доменах в 2026 году, все в одиночку.",
    nav: ["Чем помогу", "Работы", "Для VEVA", "Как работаю", "Контакт"],
    hero: {
      label: "Айбар Ержуман · Астана",
      title: ["ИИ.", "АВТОМАТИЗАЦИЯ.", "ПРОДУКТ."],
      lead:
        "Собираю ИИ-интеграции, внутренние инструменты и сайты, которыми бизнес реально пользуется. В 2026 году запустил пять продуктов на своих доменах, все в одиночку, каждый открывается по ссылке.",
      meta: [
        ["ГДЕ", "Астана, GMT+5"],
        ["СТЕК", "TypeScript · Python · LLM API"],
        ["2026", "5 продуктов на своих доменах"],
      ],
      cta: { label: "Написать в Telegram", href: CONTACT.telegram.href },
      cta2: { label: "Смотреть работы", href: "#work" },
    },
    help: {
      label: "01 — Чем помогу",
      title: "ЧЕМ ПОМОГУ",
      items: [
        {
          title: "ИИ-автоматизации и интеграции",
          text: "Подключаю языковые модели к тому, что уже есть: почта, таблицы, Airtable, мессенджеры. Модель получает проверенные данные, а не доступ к базе.",
          ev: "Hackathon-Ops, Pain Signal Agent",
        },
        {
          title: "Внутренние инструменты и процессы",
          text: "Небольшие панели под конкретный процесс: скрининг резюме, рассылки, учёт заявок. Без лишних экранов.",
          ev: "Strata, Antitrash",
        },
        {
          title: "Агентные системы",
          text: "Конвейеры, где модель принимает решения по шагам, а результат проверяет код и тесты.",
          ev: "Klip, Scout",
        },
        {
          title: "Сайты и лендинги",
          text: "Быстрые многоязычные страницы с формами, которые пишут в базу и отправляют письма. Без WordPress-плагинов.",
          ev: "Resona, EduReview",
        },
        {
          title: "Данные и сбор информации",
          text: "Сбор компаний и контактов из 2ГИС, Google Maps и открытых сайтов с учётом robots.txt и согласий на рассылку.",
          ev: "Outreach engine, Scout",
        },
      ],
    },
    work: {
      label: "02 — Работы",
      title: "ЧТО СДЕЛАЛ",
      intro: "Шесть проектов. У каждого — задача, что собрано, стек и проверяемый результат. Все ссылки открываются без регистрации.",
      fields: { problem: "Задача", built: "Что собрал", stack: "Стек и объём", result: "Результат" },
      items: [
        {
          id: "resona",
          name: "Resona",
          status: "работает · ранняя стадия",
          image: "resona",
          problem: "Малый бизнес не знает, называют ли его ChatGPT, Perplexity и другие ИИ-ассистенты, когда клиент спрашивает «к кому обратиться».",
          built: "Сервис аудита видимости в ИИ-поиске: бесплатная проверка, отчёты клиентам по ссылке, еженедельное отслеживание доли упоминаний по категории.",
          stack: "Next.js, Supabase, OpenAI / Gemini / Perplexity API, Resend, Google Sheets. Соло: дизайн, код, тексты.",
          result: "Сайт и аудит работают, идут первые пилоты в Астане. Цифры не публикую, расскажу на встрече.",
          proof: { label: "resona.work", href: LINKS.resona },
        },
        {
          id: "outreach",
          name: "Outreach engine",
          status: "развёрнут · отправка выключена",
          plateText: STATUS_JSON,
          problem: "Холодный поиск клиентов вручную: часы в 2ГИС, таблицы, потерянные ответы и риск попасть в спам.",
          built: "Сбор компаний из 2ГИС и Google Maps → поиск контактов с учётом robots.txt → фильтр согласий по странам (KZ, UK, US) → пул почтовых ящиков с лимитами → ответы из IMAP → отписка в один клик → выгрузка в Google Sheets. Аварийный стоп.",
          stack: "TypeScript, Next.js API, Supabase, Scrapy, SMTP / IMAP, WhatsApp Cloud API. Автотесты без сети.",
          result: "Развёрнут. Публичный статус показывает, что рассылка выключена, пока её не включат вручную.",
          proof: { label: "статус сервиса (JSON)", href: LINKS.outreach },
        },
        {
          id: "klip",
          name: "Klip",
          status: "работает · на паузе с июля",
          image: "klip",
          problem: "Из часового подкаста нужно десять вертикальных клипов. Вручную это день работы монтажёра.",
          built: "Ссылка на видео → транскрипция → модель выбирает моменты → перекадровка 9:16 → субтитры и хуки → рендер → ссылка для шаринга. RU/EN, оплата, панель бренда.",
          stack: "Next.js, FastAPI, Celery, Deepgram, Gemini, Claude, Remotion, Docker на GCP. CI с проверкой утечек секретов.",
          result: "Работает по ссылке. Собран за восемь недель инкубатора nFactorial 2026, финалист (25 из 72 команд).",
          proof: { label: "klip.website", href: LINKS.klip },
        },
        {
          id: "hackathon-ops",
          name: "Hackathon-Ops",
          status: "прототип",
          image: "hackathon-ops",
          problem: "Организаторам нужны отчёты по воронке участников из Airtable для спонсоров. Руками это часы каждую неделю.",
          built: "Синхронизация Airtable → SQL-представления → типизированный JSON → текстовый отчёт от модели. Модель не видит базу, только проверенные цифры.",
          stack: "Next.js, Supabase, Airtable API, OpenAI-совместимый API, Playwright-тесты.",
          result: "Развёрнуто, собрано за два дня на тестовых данных. Схема переносится на любую таблицу или CRM.",
          proof: { label: "hackathon-ops.vercel.app", href: LINKS.hackathonOps },
        },
        {
          id: "scout",
          name: "Scout",
          status: "работает · на паузе",
          image: "scout",
          problem: "Стипендии, гранты и хакатоны разбросаны по сотням сайтов, дедлайны пропускаются.",
          built: "33 сборщика данных, ранжирование по профилю через эмбеддинги, письма о дедлайнах, панель модерации.",
          stack: "Next.js, FastAPI, Celery, Postgres + pgvector, Scrapy, Playwright. Vercel + Railway.",
          result: "Работает по ссылке. 45 миграций базы, 120+ файлов тестов.",
          proof: { label: "tryscout.study", href: LINKS.scout },
        },
        {
          id: "strata",
          name: "Strata",
          status: "прототип · февраль 2026",
          image: "strata",
          problem: "HR получает сотни резюме и проверяет каждое вручную на одни и те же критерии.",
          built: "Загрузка резюме → структурированная оценка по правилам → таблица кандидатов с объяснением решения.",
          stack: "Next.js, Gemini API. Код открыт.",
          result: "Демо работает по ссылке. Разовый прототип, не развивается.",
          proof: { label: "strata-delta.vercel.app", href: LINKS.strata },
          proof2: { label: "код", href: LINKS.strataCode },
        },
      ],
      alsoLabel: "Ещё запущено",
      also: [
        { name: "Sharpki", text: "Русские шашки с ИИ-тренером: играете, тренер разбирает партию.", proof: { label: "sharpki.online", href: LINKS.sharpki } },
        { name: "Antitrash", text: "Админка Telegram-рассылок для сообщества: массовые отправки, опросы, цепочки сообщений.", proof: { label: "открыть", href: LINKS.antitrash } },
        { name: "EduReview", text: "Трёхъязычный лендинг (RU/EN/KK) с формами в базу и письмами-подтверждениями.", proof: { label: "sharedureview.site", href: LINKS.edureview } },
        { name: "Pain Signal Agent", text: "Ежедневный агент: собирает жалобы с Reddit, оценивает моделью, присылает отчёт. Отработал шесть недель без участия, 38 отчётов.", proof: null },
      ],
    },
    veva: {
      label: "03 — Для VEVA",
      title: "ЧТО МОЖНО ОБСУДИТЬ",
      intro:
        "Я изучил veva.kz: консалтинг, бухгалтерия, кадры, право, направление «IT | Автоматизация» и курс для предпринимателей. Ниже не диагноз, а вопросы, с которых я бы начал разговор с командой.",
      items: [
        ["Входящие заявки", "Форма на сайте, WhatsApp, Telegram и звонки. Как они попадают в одну очередь и кто напоминает о повторном контакте?"],
        ["Общение с клиентами", "Напоминания о документах и статусах для клиентов на бухгалтерском и кадровом обслуживании: шаблоны, сроки, каналы."],
        ["База знаний команды", "Налоговые, кадровые и юридические справочники как поисковый ассистент для сотрудников, с ссылкой на источник в каждом ответе."],
        ["Отчётность", "Регулярные управленческие отчёты из выгрузок и таблиц: собираются сами, проверяются человеком."],
        ["Направление «IT | Автоматизация»", "От ТЗ до рабочего прототипа за дни, а не недели, для модулей, которые вы уже продаёте клиентам."],
        ["Цифровые продукты", "Курс из шести модулей: посадочная, запись, материалы. И видимость VEVA, когда предприниматель спрашивает у ИИ, кому доверить бухгалтерию в Астане."],
      ],
      note: "Источник: открытые страницы veva.kz, сентябрь 2026.",
    },
    how: {
      label: "04 — Как работаю",
      title: "КАК Я РАБОТАЮ",
      steps: [
        ["Понять задачу", "Полчаса разговора и один документ: что болит, что считается результатом, что нельзя трогать."],
        ["Собрать полезную версию", "Рабочий прототип за дни, а не презентация. Показываю по ссылке, а не на слайдах."],
        ["Проверить и улучшить", "Тесты, реальные данные, правки по факту использования. Пока не работает у вас, не считается сделанным."],
      ],
      facts: [
        ["РИТМ", "Показываю прогресс раз в неделю"],
        ["ВЛАДЕНИЕ", "Код, домены и аккаунты остаются у вас"],
        ["ОБЪЁМ", "Сначала фиксируем задачу, потом сроки и цену"],
      ],
    },
    contact: {
      label: "05 — Контакт",
      title: "НАПИШИТЕ МНЕ",
      intro: "Есть задача или идея: напишите, отвечу в тот же день. Быстрее всего в Telegram.",
      items: [
        ["TELEGRAM", CONTACT.telegram],
        ["WHATSAPP", CONTACT.whatsapp],
        ["EMAIL", CONTACT.email],
        ["GITHUB", CONTACT.github],
        ["LINKEDIN", CONTACT.linkedin],
      ],
    },
    footer: {
      line: `Собрано ${BUILT_ON} к встрече с VEVA. Без фреймворков: HTML, CSS и один скрипт сборки.`,
      veva: { label: "veva.kz", href: LINKS.veva },
    },
  },

  en: {
    lang: "en",
    path: "/en/",
    title: "Aibar Yerzhuman — AI systems, automation, digital products",
    description:
      "I build AI integrations, internal tools and websites a business actually uses. Five products on their own domains in 2026, all built solo.",
    nav: ["What I do", "Work", "For VEVA", "How I work", "Contact"],
    hero: {
      label: "Aibar Yerzhuman · Astana",
      title: ["AI.", "AUTOMATION.", "PRODUCT."],
      lead:
        "I build AI integrations, internal tools and websites a business actually uses. In 2026 I launched five products on their own domains, all solo, each one link away.",
      meta: [
        ["WHERE", "Astana, GMT+5"],
        ["STACK", "TypeScript · Python · LLM APIs"],
        ["2026", "5 products on their own domains"],
      ],
      cta: { label: "Message me on Telegram", href: CONTACT.telegram.href },
      cta2: { label: "See the work", href: "#work" },
    },
    help: {
      label: "01 — What I can help with",
      title: "WHAT I CAN HELP WITH",
      items: [
        {
          title: "AI automations and integrations",
          text: "I connect language models to what you already have: email, spreadsheets, Airtable, messengers. The model gets verified data, not database access.",
          ev: "Hackathon-Ops, Pain Signal Agent",
        },
        {
          title: "Internal tools and workflows",
          text: "Small panels built around one process: CV screening, mailing lists, request tracking. No extra screens.",
          ev: "Strata, Antitrash",
        },
        {
          title: "Agentic systems",
          text: "Pipelines where the model makes step-by-step decisions and code plus tests check the result.",
          ev: "Klip, Scout",
        },
        {
          title: "Websites and landing pages",
          text: "Fast multilingual pages with forms that write to a database and send emails. No WordPress plugins.",
          ev: "Resona, EduReview",
        },
        {
          title: "Data and scraping workflows",
          text: "Collecting companies and contacts from 2GIS, Google Maps and public websites, respecting robots.txt and consent rules.",
          ev: "Outreach engine, Scout",
        },
      ],
    },
    work: {
      label: "02 — Selected work",
      title: "WHAT I HAVE BUILT",
      intro: "Six projects. Each one has a problem, what was built, the stack and a result you can check. Every link opens without signing up.",
      fields: { problem: "Problem", built: "What I built", stack: "Stack and scope", result: "Result" },
      items: [
        {
          id: "resona",
          name: "Resona",
          status: "live · early stage",
          image: "resona",
          problem: "Small businesses do not know whether ChatGPT, Perplexity and other AI assistants name them when a customer asks who to go to.",
          built: "An AI-search visibility audit service: free check, client reports by link, weekly tracking of share of mentions per category.",
          stack: "Next.js, Supabase, OpenAI / Gemini / Perplexity APIs, Resend, Google Sheets. Solo: design, code, copy.",
          result: "Site and audit are live, first pilots in Astana. I do not publish numbers; I will share them in person.",
          proof: { label: "resona.work", href: LINKS.resona },
        },
        {
          id: "outreach",
          name: "Outreach engine",
          status: "deployed · sending off",
          plateText: STATUS_JSON,
          problem: "Manual cold prospecting: hours in 2GIS, spreadsheets, lost replies and a real risk of landing in spam.",
          built: "Company sourcing from 2GIS and Google Maps → contact discovery that respects robots.txt → per-country consent gate (KZ, UK, US) → mailbox pool with pacing → replies synced from IMAP → one-click unsubscribe → export to Google Sheets. Kill switch.",
          stack: "TypeScript, Next.js API routes, Supabase, Scrapy, SMTP / IMAP, WhatsApp Cloud API. Offline test suite.",
          result: "Deployed. The public status endpoint shows sending is off until someone turns it on by hand.",
          proof: { label: "service status (JSON)", href: LINKS.outreach },
        },
        {
          id: "klip",
          name: "Klip",
          status: "live · paused since July",
          image: "klip",
          problem: "A one-hour podcast needs ten vertical clips. By hand that is a day of an editor's time.",
          built: "Video link → transcription → the model picks moments → 9:16 reframe → captions and hooks → render → share link. RU/EN, billing, brand panel.",
          stack: "Next.js, FastAPI, Celery, Deepgram, Gemini, Claude, Remotion, Docker on GCP. CI with secret-leak scanning.",
          result: "Live at the link. Built in the eight-week nFactorial Incubator 2026, finalist (25 of 72 teams).",
          proof: { label: "klip.website", href: LINKS.klip },
        },
        {
          id: "hackathon-ops",
          name: "Hackathon-Ops",
          status: "prototype",
          image: "hackathon-ops",
          problem: "Organisers need participant-funnel reports out of Airtable for sponsors. Doing it by hand costs hours every week.",
          built: "Airtable sync → SQL views → typed JSON → narrative report written by the model. The model never sees the database, only verified numbers.",
          stack: "Next.js, Supabase, Airtable API, OpenAI-compatible API, Playwright tests.",
          result: "Deployed; built in two days on test data. The pattern transfers to any spreadsheet or CRM.",
          proof: { label: "hackathon-ops.vercel.app", href: LINKS.hackathonOps },
        },
        {
          id: "scout",
          name: "Scout",
          status: "live · paused",
          image: "scout",
          problem: "Scholarships, grants and hackathons are scattered across hundreds of sites and deadlines get missed.",
          built: "33 scrapers, embedding-based ranking against a profile, deadline emails, a moderation panel.",
          stack: "Next.js, FastAPI, Celery, Postgres + pgvector, Scrapy, Playwright. Vercel + Railway.",
          result: "Live at the link. 45 database migrations, 120+ test files.",
          proof: { label: "tryscout.study", href: LINKS.scout },
        },
        {
          id: "strata",
          name: "Strata",
          status: "prototype · February 2026",
          image: "strata",
          problem: "HR receives hundreds of CVs and checks each one by hand against the same criteria.",
          built: "CV upload → structured rule-based scoring → candidate table with the reasoning shown.",
          stack: "Next.js, Gemini API. Open source.",
          result: "Demo is live at the link. One-off prototype, not maintained.",
          proof: { label: "strata-delta.vercel.app", href: LINKS.strata },
          proof2: { label: "code", href: LINKS.strataCode },
        },
      ],
      alsoLabel: "Also shipped",
      also: [
        { name: "Sharpki", text: "Russian draughts with an AI coach: you play, the coach reviews the game.", proof: { label: "sharpki.online", href: LINKS.sharpki } },
        { name: "Antitrash", text: "Telegram mailing admin for a community: mass sends, polls, message chains.", proof: { label: "open", href: LINKS.antitrash } },
        { name: "EduReview", text: "Trilingual landing page (RU/EN/KK) with forms into a database and confirmation emails.", proof: { label: "sharedureview.site", href: LINKS.edureview } },
        { name: "Pain Signal Agent", text: "Daily agent: collects complaints from Reddit, scores them with a model, emails a report. Ran unattended for six weeks, 38 reports.", proof: null },
      ],
    },
    veva: {
      label: "03 — For VEVA",
      title: "WHAT WE COULD DISCUSS",
      intro:
        "I read veva.kz: consulting, accounting, HR, legal, the IT | Automation line and the course for business owners. What follows is not a diagnosis but the questions I would open the conversation with.",
      items: [
        ["Incoming requests", "Website form, WhatsApp, Telegram and phone calls. How do they land in one queue, and who reminds the team to follow up?"],
        ["Client communication", "Document and status reminders for accounting and HR clients: templates, deadlines, channels."],
        ["Team knowledge base", "Tax, HR and legal reference material as a search assistant for staff, with a source link in every answer."],
        ["Reporting", "Recurring management reports from exports and spreadsheets: assembled automatically, checked by a person."],
        ["The IT | Automation line", "From specification to working prototype in days rather than weeks, for the modules you already sell to clients."],
        ["Digital products", "The six-module course: landing page, enrolment, materials. And VEVA's visibility when a business owner asks an AI who to trust with accounting in Astana."],
      ],
      note: "Source: public pages of veva.kz, September 2026.",
    },
    how: {
      label: "04 — How I work",
      title: "HOW I WORK",
      steps: [
        ["Understand the problem", "Half an hour of conversation and one document: what hurts, what counts as done, what must not be touched."],
        ["Build a useful version", "A working prototype in days, not a slide deck. I show it at a link, not in a presentation."],
        ["Validate and improve", "Tests, real data, changes based on actual use. Until it works on your side, it is not done."],
      ],
      facts: [
        ["CADENCE", "Progress shown once a week"],
        ["OWNERSHIP", "Code, domains and accounts stay with you"],
        ["SCOPE", "We fix the task first, then timeline and price"],
      ],
    },
    contact: {
      label: "05 — Contact",
      title: "WRITE TO ME",
      intro: "Have a task or an idea? Write and I will answer the same day. Telegram is fastest.",
      items: [
        ["TELEGRAM", CONTACT.telegram],
        ["WHATSAPP", CONTACT.whatsapp],
        ["EMAIL", CONTACT.email],
        ["GITHUB", CONTACT.github],
        ["LINKEDIN", CONTACT.linkedin],
      ],
    },
    footer: {
      line: `Built ${BUILT_ON} for a meeting with VEVA. No frameworks: HTML, CSS and one build script.`,
      veva: { label: "veva.kz", href: LINKS.veva },
    },
  },
};
