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
    title: "Айбар Ержуман: ИИ-автоматизация, внутренние инструменты и сайты для бизнеса",
    description:
      "Пять продуктов, запущенных в 2026 году, каждый открывается по ссылке. Что я могу собрать для вашей компании и с каких вопросов начать.",
    nav: ["Чем помогу", "Работы", "Для VEVA", "Как работаю", "Контакт"],
    hero: {
      label: "Айбар Ержуман · Астана",
      title: ["ИИ.", "АВТОМАТИЗАЦИЯ.", "ПРОДУКТ."],
      lead:
        "Рутину, которую в компании делают руками, может делать система. Я собираю такие системы: ИИ-интеграции, внутренние инструменты и сайты. В 2026 году запустил пять продуктов, все в одиночку, и каждый открывается по ссылке ниже.",
      cta: { label: "Обсудить задачу в Telegram", href: CONTACT.telegram.href },
      cta2: { label: "Посмотреть, что запущено", href: "#work" },
    },
    help: {
      label: "01 · Чем помогу",
      title: "ЧЕМ ПОМОГУ",
      items: [
        {
          title: "ИИ-автоматизации и интеграции",
          text: "Модель читает письма, таблицы и Airtable и отвечает по правилам, которые задали вы. Результат проверяет код. Доступа к базе у модели нет.",
          ev: "Hackathon-Ops, Pain Signal Agent",
        },
        {
          title: "Внутренние инструменты",
          text: "Одна панель под один процесс: отбор резюме, рассылка, учёт заявок. Открыли, сделали, закрыли.",
          ev: "Strata, Antitrash",
        },
        {
          title: "Агентные системы",
          text: "Многошаговые задачи, где модель решает, что делать дальше, а код проверяет каждый шаг.",
          ev: "Klip, Scout",
        },
        {
          title: "Сайты и лендинги",
          text: "Страница на трёх языках с формой, которая пишет заявку в базу и присылает письмо. Грузится за секунду, без плагинов.",
          ev: "Resona, EduReview",
        },
        {
          title: "Данные и сбор информации",
          text: "Списки компаний и контактов из 2ГИС, Google Maps и открытых сайтов. С учётом robots.txt и согласий, чтобы письма не уходили в спам.",
          ev: "Outreach engine, Scout",
        },
      ],
    },
    work: {
      label: "02 · Работы",
      title: "ЧТО СДЕЛАЛ",
      intro: "Шесть проектов: задача, что собрано, на чём, и результат, который можно проверить. Каждая ссылка открывается без регистрации.",
      fields: { problem: "Задача", built: "Что собрал", stack: "Стек и объём", result: "Результат" },
      items: [
        {
          name: "Resona",
          status: "работает · ранняя стадия",
          image: "resona",
          problem: "Клиент спрашивает ChatGPT или Perplexity, к кому обратиться, и идёт к тому, кого назвали. Бизнес об этом даже не узнаёт.",
          built: "Сервис, который показывает, что ИИ говорит о компании: бесплатная проверка, отчёт по ссылке, еженедельный трекинг доли упоминаний в категории.",
          stack: "Next.js, Supabase, OpenAI / Gemini / Perplexity API, Resend, Google Sheets. Соло: дизайн, код, тексты.",
          result: "Сайт и проверка работают, первые пилоты идут в Астане. Цифры покажу на встрече, не на сайте.",
          proof: { label: "resona.work", href: LINKS.resona },
        },
        {
          name: "Outreach engine",
          status: "развёрнут · отправка выключена",
          plateText: STATUS_JSON,
          problem: "Холодный поиск клиентов вручную: часы в 2ГИС, таблицы, потерянные ответы и письма, которые уходят в спам.",
          built: "Движок рассылок. Собирает компании из 2ГИС и Google Maps, находит контакты с учётом robots.txt, проверяет согласия по странам (KZ, UK, US), шлёт с лимитами через пул ящиков, читает ответы из IMAP, отписывает в один клик, выгружает в Google Sheets. Есть аварийный стоп.",
          stack: "TypeScript, Next.js API, Supabase, Scrapy, SMTP / IMAP, WhatsApp Cloud API. Автотесты без сети.",
          result: "Развёрнут. По ссылке видно статус: рассылка выключена и не включится без ручного решения.",
          proof: { label: "статус сервиса (JSON)", href: LINKS.outreach },
        },
        {
          name: "Klip",
          status: "работает · на паузе с июля",
          image: "klip",
          problem: "Из часового подкаста нужно десять вертикальных клипов. Монтажёр тратит на это день.",
          built: "Вставляете ссылку на видео, получаете клипы: транскрипция, выбор моментов моделью, перекадровка 9:16, субтитры и хуки, рендер, ссылка для шаринга. RU/EN, оплата, панель бренда.",
          stack: "Next.js, FastAPI, Celery, Deepgram, Gemini, Claude, Remotion, Docker на GCP. CI с проверкой утечек секретов.",
          result: "Работает по ссылке. Собран за восемь недель в инкубаторе nFactorial 2026, финалист (25 из 72 команд).",
          proof: { label: "klip.website", href: LINKS.klip },
        },
        {
          name: "Hackathon-Ops",
          status: "прототип",
          image: "hackathon-ops",
          problem: "Спонсорам нужен отчёт по воронке участников из Airtable. Руками это часы каждую неделю.",
          built: "Airtable синхронизируется в базу, SQL-представления считают цифры, модель пишет по ним текст отчёта. К базе у модели доступа нет, только к проверенным числам.",
          stack: "Next.js, Supabase, Airtable API, OpenAI-совместимый API, Playwright-тесты.",
          result: "Развёрнуто. Собрано за два дня на тестовых данных; та же схема работает с любой таблицей или CRM.",
          proof: { label: "hackathon-ops.vercel.app", href: LINKS.hackathonOps },
        },
        {
          name: "Scout",
          status: "работает · на паузе",
          image: "scout",
          problem: "Стипендии, гранты и хакатоны разбросаны по сотням сайтов. Дедлайны пропускаются.",
          built: "33 сборщика данных, ранжирование по профилю через эмбеддинги, письма о дедлайнах, панель модерации.",
          stack: "Next.js, FastAPI, Celery, Postgres + pgvector, Scrapy, Playwright. Vercel + Railway.",
          result: "Работает по ссылке. 45 миграций базы, 120+ файлов тестов.",
          proof: { label: "tryscout.study", href: LINKS.scout },
        },
        {
          name: "Strata",
          status: "прототип · февраль 2026",
          image: "strata",
          problem: "HR получает сотни резюме и проверяет каждое вручную по одним и тем же критериям.",
          built: "Загружаете резюме, получаете таблицу кандидатов с оценкой по правилам и объяснением, почему оценка такая.",
          stack: "Next.js, Gemini API. Код открыт.",
          result: "Демо работает по ссылке. Разовый прототип, дальше не развивался.",
          proof: { label: "strata-delta.vercel.app", href: LINKS.strata },
          proof2: { label: "код", href: LINKS.strataCode },
        },
      ],
      alsoLabel: "Ещё запущено",
      also: [
        { name: "Sharpki", text: "Русские шашки с ИИ-тренером: сыграли партию, тренер разобрал ошибки.", proof: { label: "sharpki.online", href: LINKS.sharpki } },
        { name: "Antitrash", text: "Админка Telegram-рассылок для сообщества: массовые отправки, опросы, цепочки сообщений.", proof: { label: "открыть", href: LINKS.antitrash } },
        { name: "EduReview", text: "Лендинг на трёх языках (RU/EN/KK): формы пишут в базу и присылают письмо-подтверждение.", proof: { label: "sharedureview.site", href: LINKS.edureview } },
        { name: "Pain Signal Agent", text: "Агент, который каждое утро собирает жалобы с Reddit, оценивает их моделью и присылает отчёт. Шесть недель без участия человека, 38 отчётов.", proof: null },
      ],
    },
    veva: {
      label: "03 · Для VEVA",
      title: "ЧТО МОЖНО ОБСУДИТЬ",
      intro:
        "Я прочитал veva.kz: консалтинг, бухгалтерия, кадры, право, направление «IT | Автоматизация» и курс для предпринимателей. Это не диагноз. Это вопросы, с которых я бы начал разговор с вашей командой.",
      items: [
        ["Входящие заявки", "Форма на сайте, WhatsApp, Telegram, звонки. Куда они попадают и кто напоминает о повторном контакте, если клиент не ответил?"],
        ["Общение с клиентами", "Клиентам на бухгалтерском и кадровом обслуживании нужно напоминать о документах и сроках. Сколько времени это занимает у команды сейчас?"],
        ["База знаний команды", "Налоговые, кадровые и юридические справочники как ассистент для сотрудников: вопрос, ответ, ссылка на источник."],
        ["Отчётность", "Управленческие отчёты из выгрузок и таблиц могут собираться сами. Человек проверяет, а не набирает."],
        ["Направление «IT | Автоматизация»", "От ТЗ до рабочего прототипа за дни, а не недели. Для модулей, которые вы уже продаёте клиентам."],
        ["Цифровые продукты", "Курс из шести модулей: посадочная, запись, материалы. И проверка, называет ли ИИ VEVA, когда предприниматель в Астане спрашивает, кому доверить бухгалтерию."],
      ],
    },
    how: {
      label: "04 · Как работаю",
      title: "КАК Я РАБОТАЮ",
      steps: [
        ["Понять задачу", "Полчаса разговора и один документ: что болит, что считается результатом, что трогать нельзя."],
        ["Собрать полезную версию", "Рабочий прототип за дни, не презентация. Показываю по ссылке, вы кликаете сами."],
        ["Проверить и улучшить", "Тесты, реальные данные, правки по факту использования. Пока не работает у вас, не считается сделанным."],
      ],
      facts: [
        ["РИТМ", "Прогресс показываю раз в неделю"],
        ["ВЛАДЕНИЕ", "Код, домены и аккаунты остаются у вас"],
        ["ОБЪЁМ", "Сначала фиксируем задачу, потом сроки и цену"],
      ],
    },
    contact: {
      label: "05 · Контакт",
      title: "НАПИШИТЕ МНЕ",
      items: [
        ["TELEGRAM", CONTACT.telegram],
        ["WHATSAPP", CONTACT.whatsapp],
        ["EMAIL", CONTACT.email],
        ["GITHUB", CONTACT.github],
        ["LINKEDIN", CONTACT.linkedin],
      ],
    },
    footer: {
      veva: { label: "veva.kz", href: LINKS.veva },
    },
  },

  en: {
    lang: "en",
    path: "/en/",
    title: "Aibar Yerzhuman: AI automation, internal tools and websites for business",
    description:
      "Five products launched in 2026, each one link away. What I can build for your company and which questions I would start with.",
    nav: ["What I do", "Work", "For VEVA", "How I work", "Contact"],
    hero: {
      label: "Aibar Yerzhuman · Astana",
      title: ["AI.", "AUTOMATION.", "PRODUCT."],
      lead:
        "The routine your company does by hand can be done by a system. I build those systems: AI integrations, internal tools and websites. In 2026 I launched five products, all solo, and each one opens from a link below.",
      cta: { label: "Discuss a task on Telegram", href: CONTACT.telegram.href },
      cta2: { label: "See what is live", href: "#work" },
    },
    help: {
      label: "01 · What I can help with",
      title: "WHAT I CAN HELP WITH",
      items: [
        {
          title: "AI automations and integrations",
          text: "The model reads your email, spreadsheets and Airtable and answers by rules you set. Code checks the result. The model never touches the database.",
          ev: "Hackathon-Ops, Pain Signal Agent",
        },
        {
          title: "Internal tools",
          text: "One panel for one process: CV screening, mailing lists, request tracking. Open it, do the job, close it.",
          ev: "Strata, Antitrash",
        },
        {
          title: "Agentic systems",
          text: "Multi-step tasks where the model decides what to do next and code checks every step.",
          ev: "Klip, Scout",
        },
        {
          title: "Websites and landing pages",
          text: "A page in three languages with a form that writes the request to a database and sends an email. Loads in a second, no plugins.",
          ev: "Resona, EduReview",
        },
        {
          title: "Data and scraping workflows",
          text: "Lists of companies and contacts from 2GIS, Google Maps and public websites, respecting robots.txt and consent rules so your emails stay out of spam.",
          ev: "Outreach engine, Scout",
        },
      ],
    },
    work: {
      label: "02 · Work",
      title: "WHAT I HAVE BUILT",
      intro: "Six projects: the problem, what I built, what it runs on, and a result you can check. Every link opens without signing up.",
      fields: { problem: "Problem", built: "What I built", stack: "Stack and scope", result: "Result" },
      items: [
        {
          name: "Resona",
          status: "live · early stage",
          image: "resona",
          problem: "A customer asks ChatGPT or Perplexity who to go to, then goes to whoever was named. The business never finds out.",
          built: "A service that shows what AI says about a company: a free check, a report by link, weekly tracking of share of mentions in the category.",
          stack: "Next.js, Supabase, OpenAI / Gemini / Perplexity APIs, Resend, Google Sheets. Solo: design, code, copy.",
          result: "The site and the check are live, first pilots are running in Astana. I will show numbers in person, not on the site.",
          proof: { label: "resona.work", href: LINKS.resona },
        },
        {
          name: "Outreach engine",
          status: "deployed · sending off",
          plateText: STATUS_JSON,
          problem: "Cold prospecting by hand: hours in 2GIS, spreadsheets, lost replies and emails that land in spam.",
          built: "A sending engine. It collects companies from 2GIS and Google Maps, finds contacts while respecting robots.txt, checks consent rules per country (KZ, UK, US), sends through a mailbox pool with limits, reads replies from IMAP, unsubscribes in one click and exports to Google Sheets. There is a kill switch.",
          stack: "TypeScript, Next.js API routes, Supabase, Scrapy, SMTP / IMAP, WhatsApp Cloud API. Offline test suite.",
          result: "Deployed. The link shows the status: sending is off and stays off until someone decides to turn it on.",
          proof: { label: "service status (JSON)", href: LINKS.outreach },
        },
        {
          name: "Klip",
          status: "live · paused since July",
          image: "klip",
          problem: "A one-hour podcast needs ten vertical clips. An editor spends a day on it.",
          built: "Paste a video link, get clips: transcription, the model picks the moments, 9:16 reframe, captions and hooks, render, share link. RU/EN, billing, brand panel.",
          stack: "Next.js, FastAPI, Celery, Deepgram, Gemini, Claude, Remotion, Docker on GCP. CI with secret-leak scanning.",
          result: "Live at the link. Built in eight weeks at the nFactorial Incubator 2026, finalist (25 of 72 teams).",
          proof: { label: "klip.website", href: LINKS.klip },
        },
        {
          name: "Hackathon-Ops",
          status: "prototype",
          image: "hackathon-ops",
          problem: "Sponsors want a report on the participant funnel out of Airtable. By hand that is hours every week.",
          built: "Airtable syncs into a database, SQL views compute the numbers, the model writes the report text from them. The model has no access to the database, only to verified numbers.",
          stack: "Next.js, Supabase, Airtable API, OpenAI-compatible API, Playwright tests.",
          result: "Deployed. Built in two days on test data; the same pattern works with any spreadsheet or CRM.",
          proof: { label: "hackathon-ops.vercel.app", href: LINKS.hackathonOps },
        },
        {
          name: "Scout",
          status: "live · paused",
          image: "scout",
          problem: "Scholarships, grants and hackathons are scattered across hundreds of sites. Deadlines get missed.",
          built: "33 scrapers, embedding-based ranking against a profile, deadline emails, a moderation panel.",
          stack: "Next.js, FastAPI, Celery, Postgres + pgvector, Scrapy, Playwright. Vercel + Railway.",
          result: "Live at the link. 45 database migrations, 120+ test files.",
          proof: { label: "tryscout.study", href: LINKS.scout },
        },
        {
          name: "Strata",
          status: "prototype · February 2026",
          image: "strata",
          problem: "HR gets hundreds of CVs and checks each one by hand against the same criteria.",
          built: "Upload the CVs, get a candidate table with a rule-based score and the reason behind it.",
          stack: "Next.js, Gemini API. Open source.",
          result: "Demo is live at the link. One-off prototype, not developed further.",
          proof: { label: "strata-delta.vercel.app", href: LINKS.strata },
          proof2: { label: "code", href: LINKS.strataCode },
        },
      ],
      alsoLabel: "Also shipped",
      also: [
        { name: "Sharpki", text: "Russian draughts with an AI coach: play a game, the coach reviews your mistakes.", proof: { label: "sharpki.online", href: LINKS.sharpki } },
        { name: "Antitrash", text: "Telegram mailing admin for a community: mass sends, polls, message chains.", proof: { label: "open", href: LINKS.antitrash } },
        { name: "EduReview", text: "Landing page in three languages (RU/EN/KK): forms write to a database and send a confirmation email.", proof: { label: "sharedureview.site", href: LINKS.edureview } },
        { name: "Pain Signal Agent", text: "An agent that collects complaints from Reddit every morning, scores them with a model and emails a report. Six weeks without a human touching it, 38 reports.", proof: null },
      ],
    },
    veva: {
      label: "03 · For VEVA",
      title: "WHAT WE COULD DISCUSS",
      intro:
        "I read veva.kz: consulting, accounting, HR, legal, the IT | Automation line and the course for business owners. This is not a diagnosis. These are the questions I would open the conversation with.",
      items: [
        ["Incoming requests", "Website form, WhatsApp, Telegram, phone calls. Where do they land, and who reminds the team to follow up when a client goes quiet?"],
        ["Client communication", "Accounting and HR clients need reminders about documents and deadlines. How much of the team's time does that take today?"],
        ["Team knowledge base", "Tax, HR and legal reference material as an assistant for staff: question, answer, link to the source."],
        ["Reporting", "Management reports from exports and spreadsheets can assemble themselves. A person checks instead of typing."],
        ["The IT | Automation line", "From specification to working prototype in days, not weeks. For the modules you already sell to clients."],
        ["Digital products", "The six-module course: landing page, enrolment, materials. And a check of whether AI names VEVA when a business owner in Astana asks who to trust with accounting."],
      ],
    },
    how: {
      label: "04 · How I work",
      title: "HOW I WORK",
      steps: [
        ["Understand the problem", "Half an hour of conversation and one document: what hurts, what counts as done, what must not be touched."],
        ["Build a useful version", "A working prototype in days, not a slide deck. I show it at a link and you click through it yourself."],
        ["Check and improve", "Tests, real data, changes based on actual use. Until it works on your side, it is not done."],
      ],
      facts: [
        ["CADENCE", "Progress shown once a week"],
        ["OWNERSHIP", "Code, domains and accounts stay with you"],
        ["SCOPE", "We fix the task first, then timeline and price"],
      ],
    },
    contact: {
      label: "05 · Contact",
      title: "WRITE TO ME",
      items: [
        ["TELEGRAM", CONTACT.telegram],
        ["WHATSAPP", CONTACT.whatsapp],
        ["EMAIL", CONTACT.email],
        ["GITHUB", CONTACT.github],
        ["LINKEDIN", CONTACT.linkedin],
      ],
    },
    footer: {
      veva: { label: "veva.kz", href: LINKS.veva },
    },
  },
};
