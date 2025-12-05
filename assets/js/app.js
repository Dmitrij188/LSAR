// === Исходные данные: эмуляция CMDB для ЭК ===
    const ecData = [
      { code: 'LSAR-HW-01', category: 'HW', name: 'Насос 24 В', desc: 'Циркуляционный насос 24 В для контура охлаждения', version: 'Rev A', status: 'утверждено' },
      { code: 'LSAR-HW-03', category: 'HW', name: 'Погружной нагреватель', desc: 'Основной нагреватель теплоносителя', version: 'Rev A', status: 'утверждено' },
      { code: 'LSAR-HW-04', category: 'HW', name: 'Радиатор с вентиляторами', desc: 'Блок охлаждения с регулируемой скоростью', version: 'Rev B', status: 'утверждено' },
      { code: 'LSAR-HW-05', category: 'HW', name: 'Датчики температуры DS18B20', desc: 'Цифровые датчики температуры в контуре', version: 'Rev A', status: 'утверждено' },
      { code: 'LSAR-HW-06', category: 'HW', name: 'Датчики давления EN837-1', desc: 'Манометрические датчики давления', version: 'Rev A', status: 'утверждено' },
      { code: 'LSAR-HW-07', category: 'HW', name: 'Расходомер', desc: 'Датчик расхода теплоносителя', version: 'Rev A', status: 'разрабатывается' },
      { code: 'LSAR-HW-09', category: 'HW', name: 'Плата MOSFET силовой коммутации', desc: 'Модуль коммутации нагрузок', version: 'Rev A', status: 'утверждено' },
      { code: 'LSAR-SW-01', category: 'SW', name: 'Прошивка ESP32 (основной контроллер)', desc: 'Программное обеспечение управления стендом', version: 'v1.0', status: 'утверждено' },
      { code: 'LSAR-SW-03', category: 'SW', name: 'PID-регулятор температуры', desc: 'Алгоритм управления нагревателем и радиатором', version: 'v1.0', status: 'утверждено' },
      { code: 'LSAR-DOC-03', category: 'DOC', name: 'Паспорт изделия ЛСАР', desc: 'Эксплуатационная документация', version: 'Ред.1', status: 'утверждено' },
      { code: 'LSAR-DOC-04', category: 'DOC', name: 'Электрическая схема', desc: 'Принципиальная схема стенда', version: 'Ред.1', status: 'утверждено' },
      { code: 'LSAR-DOC-05', category: 'DOC', name: 'Гидравлическая схема', desc: 'Схема гидравлической части', version: 'Ред.1', status: 'утверждено' },
      { code: 'LSAR-DOC-07', category: 'DOC', name: 'Журнал изменений конфигурации', desc: 'История изменений и релизов', version: 'Ред.1', status: 'утверждено' }
    ];

    // Карточки ЭК: детализация атрибутов и связей
    const ecCards = {
      'LSAR-SW-03': {
        req: 'Поддержание температуры с точностью ±1°C',
        tests: 'ПМИ – Тест 3.1, 3.2, 3.3',
        jira: true,
        git: true
      }
    };

    // Baseline с перечнем версий ЭК
    const baselines = [
      {
        name: 'Baseline 1.0',
        date: '01.09.2025',
        description: 'Первая эксплуатационная конфигурация',
        items: [
          { code: 'LSAR-SW-01', version: 'v1.0', comment: 'Базовая прошивка' },
          { code: 'LSAR-SW-03', version: 'v1.0', comment: 'Базовый PID' },
          { code: 'LSAR-DOC-03', version: 'Ред.1', comment: 'Паспорт' },
          { code: 'LSAR-DOC-04', version: 'Ред.1', comment: 'Электрическая схема' },
          { code: 'LSAR-DOC-05', version: 'Ред.1', comment: 'Гидравлическая схема' }
        ]
      },
      {
        name: 'Baseline 1.1',
        date: '01.12.2025',
        description: 'Обновление PID и части документации',
        items: [
          { code: 'LSAR-SW-01', version: 'v1.1', comment: 'Прошивка ESP32 v1.1' },
          { code: 'LSAR-SW-03', version: 'v1.1', comment: 'PID улучшенная стабильность' },
          { code: 'LSAR-DOC-03', version: 'Ред.2', comment: 'Паспорт обновлён' },
          { code: 'LSAR-DOC-04', version: 'Ред.1', comment: 'Электросхема без изменений' },
          { code: 'LSAR-DOC-05', version: 'Ред.1', comment: 'Гидросхема без изменений' }
        ]
      }
    ];

    // ЗИ (CR) – упрощённый журнал изменений
    const changeRequests = [
      {
        number: 'CR-1',
        date: '2025-10-15',
        author: 'Петров',
        desc: 'Обновление прошивки до v1.1 для улучшения стабильности PID',
        reason: 'Повышение устойчивости регулирования при нагрузках',
        urgency: 'средняя',
        impacted: ['LSAR-SW-01', 'LSAR-SW-03', 'LSAR-DOC-03'],
        reqImpact: true,
        status: 'Одобрено'
      }
    ];

    // Аудиты конфигурации
    const audits = [
      {
        id: 'INT-2025-1',
        date: '01.12.2025',
        type: 'PCA / FCA',
        object: 'Экземпляр №1, Baseline 1.1',
        status: 'Завершён',
        goal: 'Проверка полноты и корректности реализации конфигурации по baseline 1.1',
        scope: 'Аппаратная часть, ПО контроллера, эксплуатационная документация',
        findings: [
          'NC-1 – На плате LSAR-HW-09 отсутствует маркировка ревизии',
          'NC-2 – Паспорт LSAR-DOC-03 не содержит информации о замене датчика давления'
        ],
        conclusion: 'В целом соответствует, выявлено 2 несоответствия (Minor/Major).'
      }
    ];

    // === Интерактивная модель схемы ===
    // schemeNodesHW – узлы электрической схемы; маркеры позиционируются по процентам
    const schemeNodesHW = [
      {
        id: 'ESP32',
        label: 'ESP32 DevKit',
        ecCodes: ['LSAR-SW-01', 'LSAR-SW-03', 'LSAR-DOC-04'],
        type: 'HW',
        xPercent: 28,
        yPercent: 52,
        description: 'Контроллер ESP32, управляющий насосом, вентиляторами, нагревателем и сбором данных с датчиков.',
        history: [
          '2025-09-01: установка базовой прошивки v1.0',
          '2025-12-01: обновление до прошивки v1.1 (улучшение PID)'
        ],
        audits: ['INT-2025-1']
      },
      {
        id: 'PUMP',
        label: 'Циркуляционный насос 24В',
        ecCodes: ['LSAR-HW-01'],
        type: 'HW',
        xPercent: 24,
        yPercent: 70,
        description: 'Насос циркуляционный 24 В, 19 Вт, обеспечивает поток теплоносителя в контуре.',
        history: [],
        audits: ['INT-2025-1']
      },
      {
        id: 'HEATER',
        label: 'Погружной нагреватель',
        ecCodes: ['LSAR-HW-03'],
        type: 'HW',
        xPercent: 63,
        yPercent: 72,
        description: 'Основной нагреватель теплоносителя в баке.',
        history: ['2025-08-15: монтаж нагревателя Rev A'],
        audits: []
      },
      {
        id: 'RADIATOR',
        label: 'Радиатор с вентиляторами',
        ecCodes: ['LSAR-HW-04'],
        type: 'HW',
        xPercent: 82,
        yPercent: 26,
        description: 'Блок охлаждения с двумя вентиляторами для сброса тепла.',
        history: ['2025-10-01: калибровка оборотов вентиляторов'],
        audits: []
      },
      {
        id: 'TEMP',
        label: 'Датчики температуры',
        ecCodes: ['LSAR-HW-05'],
        type: 'HW',
        xPercent: 70,
        yPercent: 55,
        description: 'Цифровые датчики DS18B20 в контуре и баке.',
        history: ['2025-11-10: проверка калибровки датчиков'],
        audits: ['INT-2025-1']
      },
      {
        id: 'PRESSURE',
        label: 'Датчик давления EN837-1',
        ecCodes: ['LSAR-HW-06'],
        type: 'HW',
        xPercent: 52,
        yPercent: 38,
        description: 'Манометрический датчик давления на подаче.',
        history: [],
        audits: []
      },
      {
        id: 'FLOW',
        label: 'Расходомер',
        ecCodes: ['LSAR-HW-07'],
        type: 'HW',
        xPercent: 42,
        yPercent: 76,
        description: 'Датчик расхода теплоносителя для контроля потока.',
        history: ['2025-11-20: калибровка расходомера'],
        audits: []
      },
      {
        id: 'MOSFET',
        label: 'Плата MOSFET силовой коммутации',
        ecCodes: ['LSAR-HW-09'],
        type: 'HW',
        xPercent: 18,
        yPercent: 45,
        description: 'Модуль коммутации нагрузок (насос, вентиляторы, нагреватель).',
        history: ['2025-10-05: добавлена маркировка каналов'],
        audits: ['INT-2025-1']
      }
    ];

    // schemeNodesSW – узлы программной схемы (блок-диаграмма)
    const schemeNodesSW = [
      {
        id: 'SW_MAIN',
        label: 'main() / инициализация',
        ecCodes: ['LSAR-SW-01'],
        type: 'SW',
        description: 'Старт ESP32, настройка периферии, запуск задач FreeRTOS.',
        history: ['v1.0: базовая инициализация', 'v1.1: добавлены проверки питания'],
        audits: ['INT-2025-1']
      },
      {
        id: 'SW_TASKS',
        label: 'Задачи FreeRTOS',
        ecCodes: ['LSAR-SW-01', 'LSAR-SW-02'],
        type: 'SW',
        description: 'Набор задач RTOS, реализующих управление насосом, вентиляторами, температурой и логированием.',
        history: ['2025-09-01: базовая структура задач', '2025-12-01: добавлены проверки таймаутов'],
        audits: ['INT-2025-1']
      },
      {
        id: 'SW_PUMP',
        label: 'Task_PumpCtrl',
        ecCodes: ['LSAR-HW-01', 'LSAR-SW-01'],
        type: 'SW',
        description: 'Управляет насосом через MOSFET, реагируя на давление и расход.',
        history: ['v1.0: базовый контроль включения', 'v1.1: добавлены аварийные пороги'],
        audits: []
      },
      {
        id: 'SW_FANS',
        label: 'Task_FansCtrl',
        ecCodes: ['LSAR-HW-04', 'LSAR-SW-01'],
        type: 'SW',
        description: 'Регулирует обороты вентиляторов радиатора и следит за перегревом.',
        history: ['v1.0: ШИМ-регулирование', 'v1.1: плавный разгон/торможение'],
        audits: []
      },
      {
        id: 'SW_TEMP',
        label: 'Task_TempControl',
        ecCodes: ['LSAR-SW-03', 'LSAR-HW-05', 'LSAR-HW-03', 'LSAR-HW-04'],
        type: 'SW',
        description: 'Оркестрирует PID и исполнительные механизмы нагрева/охлаждения.',
        history: ['v1.0: базовый цикл', 'v1.1: адаптивные пределы температуры'],
        audits: ['INT-2025-1']
      },
      {
        id: 'SW_LOG',
        label: 'Task_Logging',
        ecCodes: ['LSAR-SW-01'],
        type: 'SW',
        description: 'Собирает телеметрию, пишет в UART/файл и помечает события для аудитов.',
        history: ['v1.0: лог в UART', 'v1.1: буферизация с отметкой времени'],
        audits: []
      },
      {
        id: 'SW_PID',
        label: 'PID-регулятор температуры',
        ecCodes: ['LSAR-SW-03'],
        type: 'SW',
        description: 'Алгоритм PID, поддерживающий температуру с точностью ±1°C.',
        history: ['v1.0: базовый алгоритм', 'v1.1: улучшена устойчивость'],
        audits: ['INT-2025-1']
      },
      {
        id: 'SW_DRIVERS',
        label: 'Драйверы датчиков',
        ecCodes: ['LSAR-HW-05', 'LSAR-HW-06', 'LSAR-HW-07', 'LSAR-SW-01'],
        type: 'SW',
        description: 'Драйверы DS18B20, EN837-1, расходомера; калибровка измерений.',
        history: ['v1.0: базовые драйверы', 'v1.1: проверка таймаутов датчиков'],
        audits: []
      },
      {
        id: 'SW_CONFIG',
        label: 'Конфигурация и калибровки',
        ecCodes: ['LSAR-SW-01', 'LSAR-SW-03'],
        type: 'SW',
        description: 'Хранение коэффициентов PID, порогов и настроек порта диагностики.',
        history: ['v1.0: EEPROM параметры', 'v1.1: резервное копирование конфигурации'],
        audits: []
      },
      {
        id: 'SW_DIAG',
        label: 'Интерфейс диагностики',
        ecCodes: ['LSAR-SW-01'],
        type: 'SW',
        description: 'Вывод логов, сервисные команды, контроль состояния датчиков.',
        history: ['v1.0: базовый CLI', 'v1.1: добавлены команды самодиагностики'],
        audits: []
      }
    ];

    // schemeNodesDOC – узлы схемы документации и связей
    const schemeNodesDOC = [
      {
        id: 'DOC_REQ',
        label: 'Требования (LSAR-REQ)',
        ecCodes: ['LSAR-SW-03', 'LSAR-HW-05', 'LSAR-HW-04', 'LSAR-HW-03'],
        type: 'DOC',
        description: 'Базовые требования к точности температуры и безопасности.',
        history: ['Ред.1: утверждены требования к PID'],
        audits: []
      },
      {
        id: 'DOC_FTT',
        label: 'ФТТ (LSAR-DOC-01)',
        ecCodes: ['LSAR-SW-01', 'LSAR-HW-03'],
        type: 'DOC',
        description: 'Функционально-технические требования на стенд.',
        history: ['Ред.1: первичное описание функций стенда'],
        audits: []
      },
      {
        id: 'DOC_PMI',
        label: 'ПМИ (LSAR-DOC-02)',
        ecCodes: ['LSAR-SW-03', 'LSAR-HW-05', 'LSAR-HW-04', 'LSAR-HW-03'],
        type: 'DOC',
        description: 'Программа и методика испытаний, содержит тесты по проверке точности температуры.',
        history: [],
        audits: []
      },
      {
        id: 'DOC_PASSPORT',
        label: 'Паспорт изделия (LSAR-DOC-03)',
        ecCodes: ['LSAR-HW-01', 'LSAR-HW-03', 'LSAR-HW-04', 'LSAR-HW-05', 'LSAR-HW-06', 'LSAR-HW-07', 'LSAR-SW-01', 'LSAR-SW-03'],
        type: 'DOC',
        description: 'Основной документ по изделию ЛСАР, содержит состав и конфигурацию стенда.',
        history: ['Ред.1: Baseline 1.0', 'Ред.2: обновление под Baseline 1.1'],
        audits: ['INT-2025-1']
      },
      {
        id: 'DOC_ELEC',
        label: 'Электрическая схема (LSAR-DOC-04)',
        ecCodes: ['LSAR-HW-01', 'LSAR-HW-03', 'LSAR-HW-04', 'LSAR-HW-05', 'LSAR-HW-06', 'LSAR-HW-09'],
        type: 'DOC',
        description: 'Принципиальная схема стенда с узлами силовой и сигнальной частей.',
        history: ['Ред.1: первичная схема'],
        audits: []
      },
      {
        id: 'DOC_HYDRO',
        label: 'Гидравлическая схема (LSAR-DOC-05)',
        ecCodes: ['LSAR-HW-01', 'LSAR-HW-03', 'LSAR-HW-07'],
        type: 'DOC',
        description: 'Схема гидравлической части с указанием потоков и датчиков.',
        history: ['Ред.1: базовый контур'],
        audits: []
      },
      {
        id: 'DOC_JOURNAL',
        label: 'Журнал изменений (LSAR-DOC-07)',
        ecCodes: ['LSAR-SW-01', 'LSAR-SW-03', 'LSAR-DOC-03'],
        type: 'DOC',
        description: 'История изменений, фиксирует привязку ЗИ к ЭК.',
        history: ['Ред.1: создан под Baseline 1.0'],
        audits: ['INT-2025-1']
      },
      {
        id: 'DOC_BASE10',
        label: 'Baseline 1.0',
        ecCodes: ['LSAR-SW-01', 'LSAR-SW-03', 'LSAR-DOC-03', 'LSAR-DOC-04', 'LSAR-DOC-05'],
        type: 'DOC',
        description: 'Первая эксплуатационная конфигурация стенда.',
        history: ['01.09.2025: утверждение baseline'],
        audits: []
      },
      {
        id: 'DOC_BASE11',
        label: 'Baseline 1.1',
        ecCodes: ['LSAR-SW-01', 'LSAR-SW-03', 'LSAR-DOC-03', 'LSAR-DOC-04', 'LSAR-DOC-05'],
        type: 'DOC',
        description: 'Обновление PID и паспорта изделия.',
        history: ['01.12.2025: обновление под итог аудита INT-2025-1'],
        audits: ['INT-2025-1']
      }
    ];

    // === Вспомогательные функции отрисовки таблиц ===
    const ecTableBody = document.querySelector('#ecTable tbody');
    const cmdbEcTableBody = document.querySelector('#cmdbEcTable tbody');
    const searchEcInput = document.getElementById('searchEc');

    function switchMainTab(targetId) {
      document.querySelectorAll('#mainTabs .tab-btn').forEach(b => b.classList.toggle('active', b.dataset.target === targetId));
      document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
      document.getElementById(targetId)?.classList.remove('hidden');
    }

    function renderEcTable(filter = '') {
      const rows = ecData
        .filter(ec => ec.code.toLowerCase().includes(filter) || ec.name.toLowerCase().includes(filter))
        .map(ec => `<tr><td>${ec.code}</td><td>${ec.category}</td><td>${ec.name}</td><td>${ec.desc}</td><td>${ec.version}</td><td>${ec.status}</td></tr>`)
        .join('');
      ecTableBody.innerHTML = rows || '<tr><td colspan="6">Ничего не найдено</td></tr>';
      cmdbEcTableBody.innerHTML = rows || '<tr><td colspan="6">Ничего не найдено</td></tr>';
    }


    // === Интерактивные схемы: работа с DOM, маркерами и панелью ===
    const schemeContainer = document.getElementById('scheme-container');
    const schemeImage = document.getElementById('lsar-scheme');
    const schemeInfoTitle = document.getElementById('schemeInfoTitle');
    const schemeInfoDesc = document.getElementById('schemeInfoDesc');
    const schemeInfoContent = document.getElementById('schemeInfoContent');
    const schemeSubmenu = document.getElementById('schemeSubmenu');
    const schemeSwDiagram = document.getElementById('scheme-sw-diagram');
    const schemeDocDiagram = document.getElementById('scheme-doc-diagram');
    let selectedNodeId = null;
    let activeSchemeMode = 'HW';

    function getSchemeNodesByMode(mode) {
      if (mode === 'SW') return schemeNodesSW;
      if (mode === 'DOC') return schemeNodesDOC;
      return schemeNodesHW;
    }

    function getAllSchemeNodes() {
      return [...schemeNodesHW, ...schemeNodesSW, ...schemeNodesDOC];
    }

    function hideSchemeTooltip(marker) {
      const tooltip = marker.querySelector('.scheme-tooltip');
      if (tooltip) tooltip.remove();
    }

    function showSchemeTooltip(marker, node) {
      hideSchemeTooltip(marker);
      const tooltip = document.createElement('div');
      tooltip.className = 'scheme-tooltip';
      tooltip.innerHTML = `<strong>${node.label}</strong><div>${node.description}</div><div>ЭК: ${node.ecCodes.join(', ')}</div>`;
      marker.appendChild(tooltip);
    }

    function updateSchemeHighlights(node, mode) {
      const relatedCodes = new Set(node.ecCodes);
      const container = mode === 'HW' ? schemeContainer : mode === 'SW' ? schemeSwDiagram : schemeDocDiagram;
      if (!container) return;
      const selector = mode === 'HW' ? '.scheme-node-marker' : '.diagram-node';
      container.querySelectorAll(selector).forEach(marker => {
        const markerId = marker.dataset.nodeId;
        const markerNode = getSchemeNodesByMode(mode).find(n => n.id === markerId);
        marker.classList.toggle('selected', markerId === node.id);
        const hasIntersection = markerNode && markerNode.ecCodes.some(code => relatedCodes.has(code));
        marker.classList.toggle('related-node', markerId !== node.id && hasIntersection);
      });
    }

    function showSchemeNodeDetails(node, mode = activeSchemeMode) {
      schemeInfoTitle.textContent = `${node.label} (${node.ecCodes.join(', ')})`;
      schemeInfoDesc.textContent = node.description;

      const linkedEcBadges = node.ecCodes
        .map(code => {
          const ec = ecData.find(item => item.code === code);
          const category = ec ? ec.category : '—';
          return `<span class="badge" data-ec-code="${code}">${code} (${category})</span>`;
        })
        .join(' ');

      const historyHtml = node.history?.length
        ? node.history.map(item => `<li>${item}</li>`).join('')
        : '<li>История пока пуста</li>';

      const nodeCr = changeRequests.filter(cr => cr.impacted.some(code => node.ecCodes.includes(code)));
      const crHtml = nodeCr.length
        ? nodeCr.map(cr => `<li><a href="#" data-cr-link="${cr.number}">${cr.number}</a> — ${cr.desc}</li>`).join('')
        : '<li>Нет связанных ЗИ</li>';

      const nodeAudits = audits.filter(a => node.audits?.includes(a.id));
      const auditHtml = nodeAudits.length
        ? nodeAudits.map(a => `<li><a href="#" data-audit-link="${a.id}">${a.id}</a> — ${a.object}</li>`).join('')
        : '<li>Нет связанных аудитов</li>';

      schemeInfoContent.innerHTML = `
        <p><strong>Описание:</strong> ${node.description}</p>
        <p><strong>Связанные ЭК:</strong> ${linkedEcBadges || '—'}</p>
        <p><strong>История изменений:</strong></p>
        <ul class="scheme-panel-list">${historyHtml}</ul>
        <p><strong>Связанные ЗИ / CR:</strong></p>
        <ul class="scheme-panel-list">${crHtml}</ul>
        <p><strong>Аудиты:</strong></p>
        <ul class="scheme-panel-list">${auditHtml}</ul>
        <div class="scheme-actions">
          <button class="btn" id="createCrFromNode">Создать ЗИ по этому ЭК</button>
          <button class="ghost-btn" id="openEcCardFromNode">Перейти к ЭК</button>
        </div>
      `;

      schemeInfoContent.querySelectorAll('[data-ec-code]').forEach(el => {
        el.addEventListener('click', () => goToEcCard(el.dataset.ecCode));
      });

      schemeInfoContent.querySelectorAll('[data-cr-link]').forEach(el => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          openCrByNumber(el.dataset.crLink);
        });
      });

      schemeInfoContent.querySelectorAll('[data-audit-link]').forEach(el => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          openAudit(el.dataset.auditLink);
        });
      });

      const createCrBtn = document.getElementById('createCrFromNode');
      if (createCrBtn) createCrBtn.addEventListener('click', () => prefillCrFromNode(node));
      const openEcBtn = document.getElementById('openEcCardFromNode');
      if (openEcBtn) openEcBtn.addEventListener('click', () => goToEcCard(node.ecCodes[0]));

      updateSchemeHighlights(node, mode);
    }

    function selectSchemeNode(nodeId, mode = activeSchemeMode) {
      const nodes = getSchemeNodesByMode(mode);
      const node = nodes.find(n => n.id === nodeId);
      if (!node) {
        const fallbackMode = ['HW', 'SW', 'DOC'].find(m => getSchemeNodesByMode(m).some(n => n.id === nodeId));
        if (fallbackMode && fallbackMode !== mode) {
          switchSchemeView(fallbackMode);
          selectSchemeNode(nodeId, fallbackMode);
        }
        return;
      }
      selectedNodeId = node.id;
      showSchemeNodeDetails(node, mode);
    }

    function createMarker(node) {
      const marker = document.createElement('div');
      marker.className = 'scheme-node-marker';
      marker.dataset.nodeId = node.id;
      marker.style.left = `${node.xPercent}%`;
      marker.style.top = `${node.yPercent}%`;
      marker.title = `${node.label} (${node.ecCodes.join(', ')})`;
      marker.addEventListener('mouseenter', () => showSchemeTooltip(marker, node));
      marker.addEventListener('mouseleave', () => hideSchemeTooltip(marker));
      marker.addEventListener('click', (e) => {
        e.stopPropagation();
        selectSchemeNode(node.id, 'HW');
      });
      return marker;
    }

    function attachDiagramHandlers(container, nodes, mode) {
      if (!container) return;
      container.querySelectorAll('.diagram-node').forEach(block => {
        const nodeId = block.dataset.nodeId;
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return;
        block.addEventListener('mouseenter', () => showSchemeTooltip(block, node));
        block.addEventListener('mouseleave', () => hideSchemeTooltip(block));
        block.addEventListener('click', () => selectSchemeNode(nodeId, mode));
      });
    }

    function renderSchemeMarkers(containerElement, imageElement, nodesArray, mode) {
      if (!containerElement) return;

      if (mode === 'HW') {
        containerElement.querySelectorAll('.scheme-node-marker').forEach(m => m.remove());
        nodesArray.forEach(node => {
          const marker = createMarker(node);
          containerElement.appendChild(marker);
        });
      } else {
        containerElement.querySelectorAll('.diagram-node').forEach(block => {
          block.classList.remove('selected', 'related-node');
        });
        attachDiagramHandlers(containerElement, nodesArray, mode);
      }

      if (selectedNodeId) {
        selectSchemeNode(selectedNodeId, mode);
      }
    }

    function switchSchemeView(mode) {
      activeSchemeMode = mode;
      selectedNodeId = null;
      document.querySelectorAll('.scheme-view').forEach(view => view.classList.add('hidden'));
      document.querySelectorAll('#schemeSubmenu .tab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.schemeTarget === mode));
      const targetView = document.getElementById(`scheme-${mode.toLowerCase()}`);
      if (targetView) targetView.classList.remove('hidden');

      if (mode === 'HW') {
        renderSchemeMarkers(schemeContainer, schemeImage, schemeNodesHW, 'HW');
        if (schemeNodesHW.length) selectSchemeNode(schemeNodesHW[0].id, 'HW');
      } else if (mode === 'SW') {
        renderSchemeMarkers(schemeSwDiagram, null, schemeNodesSW, 'SW');
        if (schemeNodesSW.length) selectSchemeNode(schemeNodesSW[0].id, 'SW');
      } else {
        renderSchemeMarkers(schemeDocDiagram, null, schemeNodesDOC, 'DOC');
        if (schemeNodesDOC.length) selectSchemeNode(schemeNodesDOC[0].id, 'DOC');
      }
    }

    if (schemeSubmenu) {
      schemeSubmenu.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchSchemeView(btn.dataset.schemeTarget));
      });
    }

    // === Логика добавления ЭК (эмуляция записи в CMDB) ===
    const addEcForm = document.getElementById('addEcForm');
    addEcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = document.getElementById('ecCode').value.trim();
      const category = document.getElementById('ecCategory').value;
      const name = document.getElementById('ecName').value.trim();
      const desc = document.getElementById('ecDesc').value.trim();
      const version = document.getElementById('ecVersion').value.trim();
      const status = document.getElementById('ecStatus').value;

      // Простая валидация код/категория/статус
      const allowedCategories = ['HW', 'SW', 'DOC'];
      const allowedStatuses = ['разрабатывается', 'утверждено', 'снято', 'архив'];
      if (!code || !allowedCategories.includes(category) || !allowedStatuses.includes(status)) {
        alert('Проверьте корректность кода, категории или статуса.');
        return;
      }

      ecData.push({ code, category, name, desc, version, status });
      renderEcTable(searchEcInput.value.trim().toLowerCase());
      populateEcCardSelect();
      renderCrEcCheckboxes();
      addEcForm.reset();
    });

    searchEcInput.addEventListener('input', (e) => {
      renderEcTable(e.target.value.trim().toLowerCase());
    });

    // === Верхний уровень: переключение разделов SPA ===
    document.querySelectorAll('#mainTabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switchMainTab(btn.dataset.target);
      });
    });

    // === Внутренние табы CMDB ===
    function switchCmdbTab(targetId) {
      document.querySelectorAll('#cmdbTabs .tab-btn').forEach(b => b.classList.toggle('active', b.dataset.target === targetId));
      document.querySelectorAll('.cmdb-block').forEach(block => block.classList.add('hidden'));
      document.getElementById(targetId)?.classList.remove('hidden');
    }

    document.querySelectorAll('#cmdbTabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switchCmdbTab(btn.dataset.target);
      });
    });

    // === Карточка ЭК ===
    const cardSelect = document.getElementById('cardSelect');
    const cardDetails = document.getElementById('cardDetails');

    function populateEcCardSelect() {
      cardSelect.innerHTML = ecData.map(ec => `<option value="${ec.code}">${ec.code} – ${ec.name}</option>`).join('');
      if (ecData.length) {
        cardSelect.value = ecData[0].code;
        renderCard(ecData[0].code);
      }
    }

    function renderCard(code) {
      const ec = ecData.find(item => item.code === code);
      if (!ec) return;
      const card = ecCards[code] || {};
      const linkedNodes = getAllSchemeNodes().filter(node => node.ecCodes.includes(code));
      const linkedNodesHtml = linkedNodes.length
        ? linkedNodes.map(node => `<span class="badge" data-scheme-node="${node.id}">${node.label}</span>`).join(' ')
        : '—';
      cardDetails.innerHTML = `
        <h3>${ec.code} – ${ec.name}</h3>
        <p><strong>Категория:</strong> ${ec.category}</p>
        <p><strong>Текущая версия/ревизия:</strong> ${ec.version || 'н/д'}</p>
        <p><strong>Описание:</strong> ${ec.desc || 'н/д'}</p>
        <p><strong>Связанные требования:</strong> ${card.req || '—'}</p>
        <p><strong>Связанные тесты / ПМИ:</strong> ${card.tests || '—'}</p>
        <p><strong>Ссылки:</strong> Jira: <input type="checkbox" disabled ${card.jira ? 'checked' : ''}/> Git: <input type="checkbox" disabled ${card.git ? 'checked' : ''}/></p>
        <p><strong>Привязанные узлы схемы:</strong> ${linkedNodesHtml}</p>
      `;

      cardDetails.querySelectorAll('[data-scheme-node]').forEach(el => {
        el.addEventListener('click', () => {
          switchMainTab('tab-interactive-schemes');
          const targetMode = ['HW', 'SW', 'DOC'].find(m => getSchemeNodesByMode(m).some(n => n.id === el.dataset.schemeNode));
          if (targetMode) switchSchemeView(targetMode);
          selectSchemeNode(el.dataset.schemeNode, targetMode || activeSchemeMode);
        });
      });
    }

    cardSelect.addEventListener('change', (e) => renderCard(e.target.value));

    function goToEcCard(code) {
      switchMainTab('tab-cmdb');
      switchCmdbTab('cmdb-card');
      if (cardSelect.querySelector(`option[value="${code}"]`)) {
        cardSelect.value = code;
        renderCard(code);
      }
    }

    // === Baseline ===
    const baselineSelect = document.getElementById('baselineSelect');
    const baselineTitle = document.getElementById('baselineTitle');
    const baselineTableBody = document.querySelector('#baselineTable tbody');

    function populateBaselines() {
      baselineSelect.innerHTML = baselines.map((b, idx) => `<option value="${idx}">${b.name} (${b.date})</option>`).join('');
      renderBaseline(0);
    }

    function renderBaseline(index) {
      const base = baselines[index];
      if (!base) return;
      baselineTitle.textContent = `${base.name} – ${base.date}: ${base.description}`;
      baselineTableBody.innerHTML = base.items.map(item => `<tr><td>${item.code}</td><td>${item.version}</td><td>${item.comment}</td></tr>`).join('');
    }

    baselineSelect.addEventListener('change', (e) => renderBaseline(e.target.value));

    // === ЗИ / CR ===
    const crForm = document.getElementById('crForm');
    const crNumberInput = document.getElementById('crNumber');
    const crDateInput = document.getElementById('crDate');
    const crTableBody = document.querySelector('#crTable tbody');
    const crDetailsContent = document.getElementById('crDetailsContent');
    const crEcList = document.getElementById('crEcList');

    function prefillCrFromNode(node) {
      switchMainTab('tab-cr');
      crDesc.value = `Изменение элемента ${node.label} (ЭК: ${node.ecCodes.join(', ')})`;
      Array.from(crEcList.querySelectorAll('input')).forEach(cb => {
        cb.checked = node.ecCodes.includes(cb.value);
      });
    }

    function openCrByNumber(number) {
      switchMainTab('tab-cr');
      renderCrDetails(number);
      const row = crTableBody.querySelector(`tr[data-cr="${number}"]`);
      if (row) row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function renderCrEcCheckboxes() {
      crEcList.innerHTML = ecData.map(ec => `<label class="inline"><input type="checkbox" value="${ec.code}" /> ${ec.code}</label>`).join('');
    }

    function nextCrNumber() {
      const nextId = changeRequests.length + 1;
      return `CR-${nextId}`;
    }

    function renderCrTable() {
      crTableBody.innerHTML = changeRequests.map(cr => `
        <tr data-cr="${cr.number}">
          <td>${cr.number}</td>
          <td>${cr.date}</td>
          <td>${cr.author}</td>
          <td>${cr.desc}</td>
          <td>
            <select class="status-select" data-cr="${cr.number}">
              ${['Новый', 'На рассмотрении ККС', 'Одобрено', 'Отклонено', 'В работе', 'Закрыто'].map(status => `<option ${cr.status === status ? 'selected' : ''}>${status}</option>`).join('')}
            </select>
          </td>
        </tr>`).join('');
    }

    function renderCrDetails(number) {
      const cr = changeRequests.find(c => c.number === number);
      if (!cr) return;
      crDetailsContent.innerHTML = `
        <p><strong>Номер:</strong> ${cr.number}</p>
        <p><strong>Дата:</strong> ${cr.date}</p>
        <p><strong>Инициатор:</strong> ${cr.author}</p>
        <p><strong>Срочность:</strong> ${cr.urgency}</p>
        <p><strong>Влияние на требования:</strong> ${cr.reqImpact ? 'Да' : 'Нет'}</p>
        <p><strong>Описание:</strong> ${cr.desc}</p>
        <p><strong>Обоснование:</strong> ${cr.reason}</p>
        <p><strong>Затрагиваемые ЭК:</strong> ${cr.impacted.join(', ')}</p>
        <p><strong>Статус:</strong> ${cr.status}</p>
      `;
    }

    crForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const number = nextCrNumber();
      const author = document.getElementById('crAuthor').value.trim();
      const date = crDateInput.value || new Date().toISOString().slice(0, 10);
      const desc = document.getElementById('crDesc').value.trim();
      const reason = document.getElementById('crReason').value.trim();
      const urgency = document.getElementById('crUrgency').value;
      const reqImpact = document.getElementById('crReqImpact').checked;
      const impacted = Array.from(crEcList.querySelectorAll('input:checked')).map(i => i.value);

      if (!author || !desc || !reason) {
        alert('Заполните обязательные поля: инициатор, описание, обоснование.');
        return;
      }

      changeRequests.push({ number, date, author, desc, reason, urgency, reqImpact, impacted, status: 'Новый' });
      renderCrTable();
      crNumberInput.value = nextCrNumber();
      crForm.reset();
    });

    crTableBody.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      if (row) renderCrDetails(row.dataset.cr);
    });

    crTableBody.addEventListener('change', (e) => {
      if (e.target.classList.contains('status-select')) {
        const number = e.target.dataset.cr;
        const cr = changeRequests.find(c => c.number === number);
        if (cr) {
          cr.status = e.target.value;
          renderCrDetails(number);
        }
      }
    });

    // === Аудиты ===
    const auditTableBody = document.querySelector('#auditTable tbody');
    const auditDetails = document.getElementById('auditDetails');

    function openAudit(id) {
      switchMainTab('tab-audit');
      renderAuditReport(id);
      const row = auditTableBody.querySelector(`tr[data-audit="${id}"]`);
      if (row) row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function renderAudits() {
      auditTableBody.innerHTML = audits.map(audit => `
        <tr data-audit="${audit.id}">
          <td>${audit.id}</td>
          <td>${audit.date}</td>
          <td>${audit.type}</td>
          <td>${audit.object}</td>
          <td>${audit.status}</td>
        </tr>`).join('');
    }

    function renderAuditReport(id) {
      const audit = audits.find(a => a.id === id);
      if (!audit) return;
      auditDetails.innerHTML = `
        <p><strong>Цель аудита:</strong> ${audit.goal}</p>
        <p><strong>Область:</strong> ${audit.scope}</p>
        <p><strong>Обнаруженные несоответствия:</strong></p>
        <ul>${audit.findings.map(f => `<li>${f}</li>`).join('')}</ul>
        <p><strong>Заключение:</strong> ${audit.conclusion}</p>
      `;
    }

    auditTableBody.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      if (row) renderAuditReport(row.dataset.audit);
    });

    // === Инициализация страницы ===
    function init() {
      renderEcTable();
      populateEcCardSelect();
      populateBaselines();
      renderCrEcCheckboxes();
      renderCrTable();
      crNumberInput.value = nextCrNumber();
      crDateInput.value = new Date().toISOString().slice(0, 10);
      renderAudits();
      renderAuditReport(audits[0].id);
      renderCrDetails(changeRequests[0].number);
      switchSchemeView('HW');

      const helpLink = document.getElementById('openHelp');
      if (helpLink) {
        helpLink.addEventListener('click', () => window.open('help.html', '_blank'));
      }
    }

    document.addEventListener('DOMContentLoaded', init);
