const tocItems = [
  { id: 'intro', title: 'Введение', icon: '🌐' },
  { id: 'pbs', title: 'PBS', icon: '🧩' },
  { id: 'fbs', title: 'FBS', icon: '⚙️' },
  { id: 'gbs', title: 'GBS', icon: '🎯' },
  { id: 'processes', title: 'Процессы УК', icon: '🔁' },
  { id: 'tools', title: 'Инструменты', icon: '🗃️' },
  { id: 'cases', title: 'Кейсы', icon: '📌' }
];

const abbreviations = [
  { term: 'ЭК', desc: 'Элемент конфигурации (конкретный HW/SW/DOC объект)' },
  { term: 'Baseline', desc: 'Утверждённый набор ЭК на срез времени' },
  { term: 'CMDB', desc: 'База данных конфигурации' },
  { term: 'CR / ЗИ', desc: 'Change Request / запрос на изменение' },
  { term: 'FCA', desc: 'Functional Configuration Audit' },
  { term: 'PCA', desc: 'Physical Configuration Audit' },
  { term: 'PBS', desc: 'Product Breakdown Structure' },
  { term: 'FBS', desc: 'Functional Breakdown Structure' },
  { term: 'GBS', desc: 'Goal (Requirements) Breakdown Structure' },
  { term: 'ККС', desc: 'Класс качества системы (для ранжирования аудитов)' }
];

const timelineStages = [
  { title: '1. Подготовка', text: 'Определяем цели УК, контур стенда, правила идентификации и ведения CMDB.' },
  { title: '2. Базовые линии', text: 'Устанавливаем исходный Baseline 1.0 (HW, SW, DOC) для стенда.' },
  { title: '3. Управление изменениями', text: 'Вводим регистр CR/ЗИ, процесс оценки влияния и трассировку.' },
  { title: '4. Аудиты', text: 'Проводим FCA/PCA, проверяем полноту и соответствие baseline.' },
  { title: '5. Обучение и улучшения', text: 'Разбираем кейсы, пополняем справочник, усиливаем автоматизацию CM.' }
];

const pbsTree = [
  {
    name: 'ЛСАР',
    role: 'Продукт',
    children: [
      {
        name: 'Аппаратная часть (HW)',
        role: 'Насос, нагрев, датчики, плата',
        children: [
          { name: 'LSAR-HW-01 Насос 24В', role: 'Перекачка', type: 'node' },
          { name: 'LSAR-HW-03 Нагреватель', role: 'Тепловой контур', type: 'node' },
          { name: 'LSAR-HW-04 Радиатор+вентиляторы', role: 'Отвод тепла', type: 'node' },
          { name: 'LSAR-HW-05 Датчики температуры', role: 'Измерения', type: 'node' },
          { name: 'LSAR-HW-06 Датчик давления', role: 'Безопасность', type: 'node' },
          { name: 'LSAR-HW-07 Расходомер', role: 'Контроль потока', type: 'node' }
        ]
      },
      {
        name: 'Программная часть (SW)',
        role: 'ESP32, PID, логирование',
        children: [
          { name: 'LSAR-SW-01 Прошивка ESP32', role: 'Оркестрация задач', type: 'node' },
          { name: 'LSAR-SW-03 PID-регулятор', role: 'Удержание температуры', type: 'node' },
          { name: 'LSAR-SW-04 Драйверы датчиков', role: 'Связь с HW', type: 'node' },
          { name: 'LSAR-SW-05 Диагностический UI', role: 'Поддержка тестов', type: 'node' }
        ]
      },
      {
        name: 'Документация (DOC)',
        role: 'Эксплуатация и доказательства',
        children: [
          { name: 'LSAR-DOC-01 ФТТ', role: 'Функциональные требования', type: 'node' },
          { name: 'LSAR-DOC-02 ПМИ', role: 'Программа испытаний', type: 'node' },
          { name: 'LSAR-DOC-03 Паспорт', role: 'Серийные данные', type: 'node' },
          { name: 'LSAR-DOC-04 Электрическая схема', role: 'Состав HW', type: 'node' },
          { name: 'LSAR-DOC-07 Журнал изменений', role: 'История CR', type: 'node' }
        ]
      }
    ]
  }
];

const fbsFunctions = [
  {
    title: 'Поддержание температуры',
    desc: 'Замкнутый контур PID, управление нагревателем и вентиляторами.',
    tied: ['LSAR-SW-03', 'LSAR-HW-03', 'LSAR-HW-04', 'LSAR-HW-05']
  },
  {
    title: 'Измерение давления/расхода',
    desc: 'Драйверы датчиков и контроль аварийных порогов.',
    tied: ['LSAR-HW-06', 'LSAR-HW-07', 'LSAR-SW-04']
  },
  {
    title: 'Защита и аварийные режимы',
    desc: 'Отработка порогов, аварийное отключение, сигнализация.',
    tied: ['LSAR-SW-01', 'LSAR-HW-06', 'LSAR-HW-01']
  },
  {
    title: 'Логирование и телеметрия',
    desc: 'Сбор архивов, экспорт в CMDB/Confluence, протоколы ПМИ.',
    tied: ['LSAR-SW-05', 'LSAR-DOC-07']
  }
];

const gbsGoals = [
  {
    title: 'Безопасность',
    detail: 'Защита от перегрева и сверхдавления, безопасное выключение.',
    requirements: ['Давление < 0.4 МПа', 'Температура < 80°C', 'Автоотключение насоса при сухом ходе']
  },
  {
    title: 'Точность',
    detail: '±1°C по температуре, контролируемый поток и стабильность PID.',
    requirements: ['Погрешность измерений ≤0.2°C', 'Разгон без перерегулирования >5%', 'Калибровка датчиков документирована']
  },
  {
    title: 'Надёжность',
    detail: 'Работа 8 часов без аварий, резервные сценарии.',
    requirements: ['MTBF > 500 ч. на стенд', 'Дублирование датчиков ключевых узлов', 'Тесты восстановления после сброса питания']
  },
  {
    title: 'Учебная ценность',
    detail: 'Прозрачные связи PBS/FBS/CMDB, понятные отчёты аудита.',
    requirements: ['Открытые трассировки требований', 'Скрипты демонстраций в ПМИ', 'Слайды для разбора кейсов']
  }
];

const cmProcesses = [
  {
    id: 'ident',
    title: 'Идентификация ЭК',
    steps: ['Каталогизация HW/SW/DOC', 'Присвоение кодов LSAR-XXX', 'Регистрация версий и серий', 'Связь с требованиями (FBS/GBS)']
  },
  {
    id: 'change',
    title: 'Управление изменениями',
    steps: ['CR инициируется и описывает влияние', 'Оценка влияния на baseline', 'CAB/технический совет одобряет', 'Выпуск, валидация, обновление CMDB']
  },
  {
    id: 'status',
    title: 'Учёт статуса',
    steps: ['Статус ЭК в CMDB', 'Матрица трассируемости', 'Отчёты о внедрении CR', 'Дашборд по рискам ККС']
  },
  {
    id: 'audit',
    title: 'Аудит конфигурации',
    steps: ['План аудита (FCA/PCA)', 'Сверка с baseline', 'Нарушения и корректирующие действия', 'Фиксация результатов в журналах']
  }
];

const toolChain = [
  { name: 'Git', role: 'Версии кода (SW)', detail: 'Фиксация коммитов, тегирование релизов, ветки CR.' },
  { name: 'Jira', role: 'Заявки на изменения', detail: 'Workflow CR, ссылки на тесты и требования.' },
  { name: 'Confluence / CMDB', role: 'Хранилище знаний', detail: 'Карточки ЭК, таблицы baselines, журналы аудитов.' },
  { name: 'Документы', role: 'Файловое хранилище', detail: 'Паспорт, схемы, протоколы ПМИ, отчёты аудитов.' }
];

const cases = [
  {
    code: 'CR-5: улучшение PID',
    summary: 'Повышение устойчивости в диапазоне 40–60°C.',
    details: ['ЭК: LSAR-SW-03, LSAR-SW-01, LSAR-DOC-02', 'Требования: точность ±1°C, устойчивость перерегулирования <5%', 'Тесты: ПМИ 3.1/3.2 повторно', 'CMDB: новая запись Baseline 1.1, ссылка на git-tag v1.1']
  },
  {
    code: 'Замена датчика давления',
    summary: 'Переход на новый сенсор с улучшенной точностью.',
    details: ['ЭК: LSAR-HW-06 → LSAR-HW-10', 'CR: влияние на FBS «Безопасность»', 'Требуется обновление паспорта и схемы', 'Тесты: проверка аварийного отключения, калибровка']
  },
  {
    code: 'Внеплановый аудит после инцидента',
    summary: 'Зафиксирован перегрев при закрытом вентиле.',
    details: ['Аудит PCA: сверка фактического монтажа', 'Проверка исполнения CR-4', 'Дополнение ПМИ аварийными сценариями', 'Корректировка CMDB и отчёт в Confluence']
  }
];

function buildToc() {
  const toc = document.getElementById('toc');
  toc.innerHTML = tocItems.map(item => `
    <button class="toc-btn" data-target="${item.id}">${item.icon} ${item.title}</button>
  `).join('');
  toc.addEventListener('click', (e) => {
    const btn = e.target.closest('.toc-btn');
    if (!btn) return;
    const block = document.getElementById(btn.dataset.target);
    if (block) block.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function buildLegend() {
  const list = document.getElementById('legendList');
  list.innerHTML = abbreviations.map(item => `<li><strong>${item.term}</strong><span>${item.desc}</span></li>`).join('');
}

function buildTimeline() {
  const holder = document.getElementById('timeline');
  holder.innerHTML = timelineStages.map(stage => `
    <div class="timeline-item">
      <div class="dot"></div>
      <div>
        <div class="timeline-title">${stage.title}</div>
        <div class="timeline-text">${stage.text}</div>
      </div>
    </div>
  `).join('');
}

function renderPbsTree(nodes) {
  return nodes.map(node => `
    <div class="pbs-node">
      <div class="pbs-card">
        <div class="pbs-name">${node.name}</div>
        <div class="pbs-role">${node.role}</div>
      </div>
      ${node.children ? `<div class="pbs-children">${renderPbsTree(node.children)}</div>` : ''}
    </div>
  `).join('');
}

function renderFbs() {
  return fbsFunctions.map(func => `
    <div class="fbs-card">
      <div class="fbs-title">${func.title}</div>
      <p>${func.desc}</p>
      <div class="badge-row">${func.tied.map(code => `<span class="badge tooltip" data-tip="Связанная ЭК">${code}</span>`).join('')}</div>
    </div>
  `).join('');
}

function renderGbs() {
  return gbsGoals.map(goal => `
    <div class="gbs-card">
      <div class="gbs-title">${goal.title}</div>
      <p>${goal.detail}</p>
      <ul>${goal.requirements.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>
  `).join('');
}

function renderProcesses() {
  return cmProcesses.map(proc => `
    <div class="process-card" id="proc-${proc.id}">
      <div class="process-title">${proc.title}</div>
      <div class="process-steps">${proc.steps.map(step => `<div class="process-step">${step}</div>`).join('')}</div>
    </div>
  `).join('');
}

function renderToolchain() {
  return `
    <div class="tool-grid">
      ${toolChain.map(tool => `
        <div class="tool-card">
          <div class="tool-head">${tool.name}</div>
          <div class="tool-role">${tool.role}</div>
          <p>${tool.detail}</p>
        </div>`).join('')}
      <div class="tool-arrow">Источники данных ↔ CMDB ↔ Аудиты/отчёты</div>
    </div>
  `;
}

function renderCases() {
  return cases.map(caseItem => `
    <div class="case-card" tabindex="0">
      <div class="case-header">
        <div>
          <div class="case-code">${caseItem.code}</div>
          <div class="case-summary">${caseItem.summary}</div>
        </div>
        <span class="case-toggle">Развернуть</span>
      </div>
      <div class="case-details hidden">${caseItem.details.map(d => `<div>• ${d}</div>`).join('')}</div>
    </div>
  `).join('');
}

const slides = [
  {
    id: 'intro',
    title: 'Введение в УК стенда',
    body: `
      <div class="slide-grid">
        <div>
          <h4>Зачем УК для ЛСАР?</h4>
          <ul>
            <li>Оборудование + ПО + документы управляются как единая система.</li>
            <li>Быстрый анализ воздействия: какая ЭК, baseline и тесты затронуты.</li>
            <li>Прозрачные аудиты для учебного стенда и реальных проектов.</li>
          </ul>
        </div>
        <div>
          <h4>Ключевые элементы</h4>
          <div class="pill">Идентификация ЭК</div>
          <div class="pill">Трассировка требований ↔ ЭК ↔ тесты</div>
          <div class="pill">Базовые линии и журналы CR</div>
        </div>
      </div>
    `
  },
  {
    id: 'pbs',
    title: 'PBS – структура продукта',
    body: `<p class="section-lead">Дерево продукта показывает, что именно контролируется в CMDB и какие ЭК входят в baseline.</p>
      <div class="pbs-tree">${renderPbsTree(pbsTree)}</div>`
  },
  {
    id: 'fbs',
    title: 'FBS – функциональная декомпозиция',
    body: `<p class="section-lead">Функции стенда связаны с конкретными ЭК. Наведите, чтобы увидеть подсказки, как функция реализуется.</p>
      <div class="fbs-grid">${renderFbs()}</div>`
  },
  {
    id: 'gbs',
    title: 'GBS – цели и требования',
    body: `<p class="section-lead">Цели → требования → ссылки на тесты и аудиты. Этот блок помогает обосновывать изменения.</p>
      <div class="gbs-grid">${renderGbs()}</div>`
  },
  {
    id: 'processes',
    title: 'Ключевые процессы УК',
    body: `<p class="section-lead">Четыре основных процесса, отражённых в Плане УК ЛСАР.</p>
      <div class="process-grid">${renderProcesses()}</div>`
  },
  {
    id: 'tools',
    title: 'Инфраструктура и инструменты',
    body: `<p class="section-lead">Связка инструментов показывает, где живут данные и как проходят аудиты.</p>
      ${renderToolchain()}`
  },
  {
    id: 'cases',
    title: 'Примеры и кейсы',
    body: `<p class="section-lead">Практические истории показывают, как работает УК в реальных ситуациях.</p>
      <div class="cases-grid">${renderCases()}</div>`
  }
];

function buildSlides() {
  const container = document.getElementById('helpSections');
  container.innerHTML = slides.map(slide => `
    <section class="card slide" id="${slide.id}">
      <div class="slide-header">
        <h3>${slide.title}</h3>
        <button class="accordion-btn" aria-expanded="true">Свернуть</button>
      </div>
      <div class="slide-body">${slide.body}</div>
    </section>
  `).join('');
}

function enableAccordions() {
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slide = btn.closest('.slide');
      const body = slide.querySelector('.slide-body');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      body.classList.toggle('collapsed');
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      btn.textContent = expanded ? 'Развернуть' : 'Свернуть';
    });
  });
}

function enableCaseToggles() {
  document.querySelectorAll('.case-card').forEach(card => {
    const details = card.querySelector('.case-details');
    const toggle = card.querySelector('.case-toggle');
    const toggleAction = () => {
      const isHidden = details.classList.contains('hidden');
      details.classList.toggle('hidden');
      toggle.textContent = isHidden ? 'Свернуть' : 'Развернуть';
    };
    card.addEventListener('click', toggleAction);
    card.addEventListener('keypress', (e) => { if (e.key === 'Enter') toggleAction(); });
  });
}

function animateOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.slide, .timeline-item, .fbs-card, .gbs-card, .process-card, .tool-card, .case-card').forEach(el => observer.observe(el));
}

function applySmoothScroll() {
  document.documentElement.style.scrollBehavior = 'smooth';
}

function initHelp() {
  buildToc();
  buildLegend();
  buildTimeline();
  buildSlides();
  enableAccordions();
  enableCaseToggles();
  applySmoothScroll();
  animateOnScroll();
}

document.addEventListener('DOMContentLoaded', initHelp);
