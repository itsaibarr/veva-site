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
    title: "Айбар Ержуман. ИИ-системы, автоматизация, продукты",
    description: "Пять продуктов в 2026 году. В одиночку. Все открываются по ссылке. Что собираю и с чего начать.",
    nav: ["Что делаю", "Работы", "Для VEVA", "Процесс", "Контакт"],
    hero: {
      label: "Айбар Ержуман · Астана",
      title: ["ИИ.", "АВТОМАТИЗАЦИЯ.", "ПРОДУКТ."],
      lead: "Собираю ИИ-интеграции, внутренние инструменты и сайты. Пять продуктов в 2026 году. В одиночку. Все открываются по ссылке.",
      cta: { label: "Написать в Telegram", href: CONTACT.telegram.href },
      cta2: { label: "Работы", href: "#work" },
    },
    help: {
      label: "01 · Что делаю",
      title: "ЧТО ДЕЛАЮ",
      items: [
        { title: "ИИ-интеграции", text: "Модель читает почту, таблицы, Airtable. Отвечает по правилам. Код проверяет. Доступа к базе нет.", ev: "Hackathon-Ops, Pain Signal Agent" },
        { title: "Внутренние инструменты", text: "Одна панель на один процесс. Резюме, рассылки, заявки. Лишних экранов нет.", ev: "Strata, Antitrash" },
        { title: "Агентные системы", text: "Модель выбирает следующий шаг. Код проверяет каждый.", ev: "Klip, Scout" },
        { title: "Сайты", text: "Три языка, форма в базу, письмо. Секунда на загрузку. Плагинов нет.", ev: "Resona, EduReview" },
        { title: "Данные", text: "Компании и контакты из 2ГИС, Google Maps и открытых сайтов. robots.txt и согласия соблюдаются.", ev: "Outreach engine, Scout" },
      ],
    },
    work: {
      label: "02 · Работы",
      title: "СДЕЛАНО",
      intro: "Шесть проектов. Задача, что собрано, стек, результат. Ссылки открываются без регистрации.",
      fields: { problem: "Задача", built: "Собрано", stack: "Стек", result: "Результат" },
      items: [
        {
          name: "Resona", status: "работает · ранняя стадия", image: "resona",
          problem: "Клиент спрашивает ChatGPT, к кому идти. Идёт к тому, кого назвали. Бизнес не в курсе.",
          built: "Сервис показывает, что ИИ говорит о компании. Бесплатная проверка, отчёт по ссылке, недельный трекинг упоминаний по категории.",
          stack: "Next.js, Supabase, OpenAI / Gemini / Perplexity API, Resend, Google Sheets. Дизайн, код, тексты.",
          result: "Работает. Первые пилоты в Астане. Цифры на встрече.",
          proof: { label: "resona.work", href: LINKS.resona },
        },
        {
          name: "Outreach engine", status: "развёрнут · отправка выключена", plateText: STATUS_JSON,
          problem: "Холодный поиск клиентов руками: часы в 2ГИС, таблицы, потерянные ответы, спам.",
          built: "Компании из 2ГИС и Google Maps. Контакты с учётом robots.txt. Согласия по странам: KZ, UK, US. Пул ящиков с лимитами. Ответы из IMAP. Отписка в один клик. Выгрузка в Google Sheets. Аварийный стоп.",
          stack: "TypeScript, Next.js API, Supabase, Scrapy, SMTP / IMAP, WhatsApp Cloud API. Автотесты без сети.",
          result: "Развёрнут. Отправка выключена, включается только вручную. Статус по ссылке.",
          proof: { label: "статус сервиса (JSON)", href: LINKS.outreach },
        },
        {
          name: "Klip", status: "работает · на паузе с июля", image: "klip",
          problem: "Час подкаста, десять вертикальных клипов. Монтажёр тратит день.",
          built: "Ссылка на видео на входе, клипы на выходе. Транскрипция, выбор моментов, 9:16, субтитры, рендер, ссылка. RU/EN, оплата, панель бренда.",
          stack: "Next.js, FastAPI, Celery, Deepgram, Gemini, Claude, Remotion, Docker на GCP. CI с проверкой утечек секретов.",
          result: "Работает. Восемь недель nFactorial 2026. Финалист, 25 из 72.",
          proof: { label: "klip.website", href: LINKS.klip },
        },
        {
          name: "Hackathon-Ops", status: "прототип", image: "hackathon-ops",
          problem: "Спонсорам нужна воронка из Airtable. Руками это часы в неделю.",
          built: "Airtable в базу. SQL считает. Модель пишет отчёт по цифрам. Доступа к базе у модели нет.",
          stack: "Next.js, Supabase, Airtable API, OpenAI-совместимый API, Playwright-тесты.",
          result: "Развёрнуто. Два дня, тестовые данные. Переносится на любую таблицу или CRM.",
          proof: { label: "hackathon-ops.vercel.app", href: LINKS.hackathonOps },
        },
        {
          name: "Scout", status: "работает · на паузе", image: "scout",
          problem: "Стипендии и гранты на сотнях сайтов. Дедлайны теряются.",
          built: "33 сборщика. Ранжирование по профилю через эмбеддинги. Письма о дедлайнах. Модерация.",
          stack: "Next.js, FastAPI, Celery, Postgres + pgvector, Scrapy, Playwright. Vercel + Railway.",
          result: "Работает. 45 миграций, 120+ файлов тестов.",
          proof: { label: "tryscout.study", href: LINKS.scout },
        },
        {
          name: "Strata", status: "прототип · февраль 2026", image: "strata",
          problem: "Сотни резюме, одни критерии, ручная проверка.",
          built: "Резюме на входе. Таблица кандидатов с оценкой и объяснением на выходе.",
          stack: "Next.js, Gemini API. Код открыт.",
          result: "Демо работает. Разовый прототип.",
          proof: { label: "strata-delta.vercel.app", href: LINKS.strata },
          proof2: { label: "код", href: LINKS.strataCode },
        },
      ],
      alsoLabel: "Ещё",
      also: [
        { name: "Sharpki", text: "Русские шашки с ИИ-тренером. Партия, разбор.", proof: { label: "sharpki.online", href: LINKS.sharpki } },
        { name: "Antitrash", text: "Админка Telegram-рассылок: массовые отправки, опросы, цепочки.", proof: { label: "открыть", href: LINKS.antitrash } },
        { name: "EduReview", text: "Лендинг на трёх языках. Формы в базу, письмо-подтверждение.", proof: { label: "sharedureview.site", href: LINKS.edureview } },
        { name: "Pain Signal Agent", text: "Каждое утро собирает жалобы с Reddit, оценивает моделью, шлёт отчёт. Шесть недель без человека. 38 отчётов.", proof: null },
      ],
    },
    veva: {
      label: "03 · Для VEVA",
      title: "ДЛЯ VEVA",
      intro: "Прочитал veva.kz: консалтинг, бухгалтерия, кадры, право, IT-автоматизация, курс. Не диагноз. Вопросы для первого разговора.",
      items: [
        ["Заявки", "Форма, WhatsApp, Telegram, звонки. Куда попадают. Кто напоминает, если клиент молчит."],
        ["Клиенты", "Документы и сроки по бухгалтерии и кадрам. Сколько времени команды уходит на напоминания."],
        ["База знаний", "Налоги, кадры, право. Ассистент для сотрудников: вопрос, ответ, ссылка на источник."],
        ["Отчёты", "Управленческие отчёты из выгрузок собираются сами. Человек проверяет."],
        ["IT | Автоматизация", "От ТЗ до прототипа за дни. Для модулей, которые уже продаются."],
        ["Цифровые продукты", "Курс из шести модулей: посадочная, запись, материалы. И проверка, называет ли ИИ VEVA на вопрос про бухгалтерию в Астане."],
      ],
    },
    how: {
      label: "04 · Процесс",
      title: "ПРОЦЕСС",
      steps: [
        ["Понять", "Полчаса разговора, один документ. Что болит, что считается результатом, что не трогать."],
        ["Собрать", "Прототип за дни. По ссылке, не в слайдах."],
        ["Проверить", "Тесты, реальные данные, правки по факту. Не работает у вас, значит не сделано."],
      ],
      facts: [
        ["РИТМ", "Прогресс раз в неделю"],
        ["ВЛАДЕНИЕ", "Код, домены, аккаунты у вас"],
        ["ОБЪЁМ", "Сначала задача, потом сроки и цена"],
      ],
    },
    contact: {
      label: "05 · Контакт",
      title: "КОНТАКТ",
      items: [
        ["TELEGRAM", CONTACT.telegram],
        ["WHATSAPP", CONTACT.whatsapp],
        ["EMAIL", CONTACT.email],
        ["GITHUB", CONTACT.github],
        ["LINKEDIN", CONTACT.linkedin],
      ],
    },
    footer: { veva: { label: "veva.kz", href: LINKS.veva } },
  },

  en: {
    lang: "en",
    path: "/en/",
    title: "Aibar Yerzhuman. AI systems, automation, products",
    description: "Five products in 2026. Solo. All open from a link. What I build and where to start.",
    nav: ["What I do", "Work", "For VEVA", "Process", "Contact"],
    hero: {
      label: "Aibar Yerzhuman · Astana",
      title: ["AI.", "AUTOMATION.", "PRODUCT."],
      lead: "I build AI integrations, internal tools and websites. Five products in 2026. Solo. All open from a link.",
      cta: { label: "Message on Telegram", href: CONTACT.telegram.href },
      cta2: { label: "Work", href: "#work" },
    },
    help: {
      label: "01 · What I do",
      title: "WHAT I DO",
      items: [
        { title: "AI integrations", text: "The model reads email, spreadsheets, Airtable. Answers by rules. Code checks. No database access.", ev: "Hackathon-Ops, Pain Signal Agent" },
        { title: "Internal tools", text: "One panel per process. CVs, mailings, requests. No extra screens.", ev: "Strata, Antitrash" },
        { title: "Agentic systems", text: "The model picks the next step. Code checks each one.", ev: "Klip, Scout" },
        { title: "Websites", text: "Three languages, form to database, email. One second to load. No plugins.", ev: "Resona, EduReview" },
        { title: "Data", text: "Companies and contacts from 2GIS, Google Maps and public sites. robots.txt and consent respected.", ev: "Outreach engine, Scout" },
      ],
    },
    work: {
      label: "02 · Work",
      title: "BUILT",
      intro: "Six projects. Problem, what was built, stack, result. Links open without signing up.",
      fields: { problem: "Problem", built: "Built", stack: "Stack", result: "Result" },
      items: [
        {
          name: "Resona", status: "live · early stage", image: "resona",
          problem: "A customer asks ChatGPT who to go to. Goes to whoever was named. The business never knows.",
          built: "Shows what AI says about a company. Free check, report by link, weekly tracking of mentions per category.",
          stack: "Next.js, Supabase, OpenAI / Gemini / Perplexity APIs, Resend, Google Sheets. Design, code, copy.",
          result: "Live. First pilots in Astana. Numbers in person.",
          proof: { label: "resona.work", href: LINKS.resona },
        },
        {
          name: "Outreach engine", status: "deployed · sending off", plateText: STATUS_JSON,
          problem: "Cold prospecting by hand: hours in 2GIS, spreadsheets, lost replies, spam.",
          built: "Companies from 2GIS and Google Maps. Contacts, robots.txt respected. Consent rules per country: KZ, UK, US. Mailbox pool with limits. Replies from IMAP. One-click unsubscribe. Export to Google Sheets. Kill switch.",
          stack: "TypeScript, Next.js API routes, Supabase, Scrapy, SMTP / IMAP, WhatsApp Cloud API. Offline test suite.",
          result: "Deployed. Sending is off and only a human turns it on. Status at the link.",
          proof: { label: "service status (JSON)", href: LINKS.outreach },
        },
        {
          name: "Klip", status: "live · paused since July", image: "klip",
          problem: "One hour of podcast, ten vertical clips. An editor spends a day.",
          built: "Video link in, clips out. Transcription, moment selection, 9:16, captions, render, share link. RU/EN, billing, brand panel.",
          stack: "Next.js, FastAPI, Celery, Deepgram, Gemini, Claude, Remotion, Docker on GCP. CI with secret-leak scanning.",
          result: "Live. Eight weeks at nFactorial 2026. Finalist, 25 of 72.",
          proof: { label: "klip.website", href: LINKS.klip },
        },
        {
          name: "Hackathon-Ops", status: "prototype", image: "hackathon-ops",
          problem: "Sponsors want the funnel out of Airtable. By hand, hours a week.",
          built: "Airtable into a database. SQL does the counting. The model writes the report from the numbers. No database access for the model.",
          stack: "Next.js, Supabase, Airtable API, OpenAI-compatible API, Playwright tests.",
          result: "Deployed. Two days, test data. Moves to any spreadsheet or CRM.",
          proof: { label: "hackathon-ops.vercel.app", href: LINKS.hackathonOps },
        },
        {
          name: "Scout", status: "live · paused", image: "scout",
          problem: "Scholarships and grants across hundreds of sites. Deadlines slip.",
          built: "33 scrapers. Embedding ranking against a profile. Deadline emails. Moderation.",
          stack: "Next.js, FastAPI, Celery, Postgres + pgvector, Scrapy, Playwright. Vercel + Railway.",
          result: "Live. 45 migrations, 120+ test files.",
          proof: { label: "tryscout.study", href: LINKS.scout },
        },
        {
          name: "Strata", status: "prototype · February 2026", image: "strata",
          problem: "Hundreds of CVs, same criteria, manual review.",
          built: "CVs in. A candidate table with a score and the reason out.",
          stack: "Next.js, Gemini API. Open source.",
          result: "Demo live. One-off prototype.",
          proof: { label: "strata-delta.vercel.app", href: LINKS.strata },
          proof2: { label: "code", href: LINKS.strataCode },
        },
      ],
      alsoLabel: "Also",
      also: [
        { name: "Sharpki", text: "Russian draughts with an AI coach. Play, get the review.", proof: { label: "sharpki.online", href: LINKS.sharpki } },
        { name: "Antitrash", text: "Telegram mailing admin: mass sends, polls, chains.", proof: { label: "open", href: LINKS.antitrash } },
        { name: "EduReview", text: "Landing page in three languages. Forms to database, confirmation email.", proof: { label: "sharedureview.site", href: LINKS.edureview } },
        { name: "Pain Signal Agent", text: "Collects Reddit complaints every morning, scores them with a model, emails a report. Six weeks without a human. 38 reports.", proof: null },
      ],
    },
    veva: {
      label: "03 · For VEVA",
      title: "FOR VEVA",
      intro: "Read veva.kz: consulting, accounting, HR, legal, IT automation, a course. Not a diagnosis. Questions for the first conversation.",
      items: [
        ["Requests", "Form, WhatsApp, Telegram, calls. Where they land. Who follows up when a client goes quiet."],
        ["Clients", "Documents and deadlines for accounting and HR clients. How much team time goes to reminders."],
        ["Knowledge base", "Tax, HR, legal. An assistant for staff: question, answer, source link."],
        ["Reports", "Management reports from exports assemble themselves. A person checks."],
        ["IT | Automation", "Specification to prototype in days. For modules already being sold."],
        ["Digital products", "The six-module course: landing page, enrolment, materials. And whether AI names VEVA when asked about accounting in Astana."],
      ],
    },
    how: {
      label: "04 · Process",
      title: "PROCESS",
      steps: [
        ["Understand", "Half an hour, one document. What hurts, what counts as done, what not to touch."],
        ["Build", "A prototype in days. At a link, not in slides."],
        ["Check", "Tests, real data, fixes from actual use. If it does not work on your side, it is not done."],
      ],
      facts: [
        ["CADENCE", "Progress once a week"],
        ["OWNERSHIP", "Code, domains, accounts stay with you"],
        ["SCOPE", "Task first, then timeline and price"],
      ],
    },
    contact: {
      label: "05 · Contact",
      title: "CONTACT",
      items: [
        ["TELEGRAM", CONTACT.telegram],
        ["WHATSAPP", CONTACT.whatsapp],
        ["EMAIL", CONTACT.email],
        ["GITHUB", CONTACT.github],
        ["LINKEDIN", CONTACT.linkedin],
      ],
    },
    footer: { veva: { label: "veva.kz", href: LINKS.veva } },
  },
};
