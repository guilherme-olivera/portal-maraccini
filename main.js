/* FONTE DO SABER - Lógica Principal & Interatividade */

// 1. CARREGAMENTO DINÂMICO DE PRODUTOS
let products = [];

async function loadProductsData() {
  try {
    const response = await fetch('/products.json');
    if (response.ok) {
      products = await response.json();
    }
  } catch (err) {
    console.error('Erro ao carregar products.json:', err);
  }
  renderProducts();
}

// DATASET DE MAPAS MENTAIS INTERATIVOS REAL DA PROFª. JULIANA MARACCINI
const mindmapData = {
  biologia: {
    title: 'Biologia Celular & BNCC EF06CI05 (Profª. Juliana Maraccini)',
    root: 'Citologia & Teoria Celular',
    nodes: [
      {
        id: 'n1',
        title: 'Descoberta das Células',
        badge: 'História (1665)',
        icon: 'microscope',
        color: '#06B6D4',
        tip: 'Descobridor: **Robert Hooke (1665)** ao analisar fatias de cortiça (*Cellula = pequeno compartimento*).',
        details: 'A cortiça é um tecido vegetal morto. O termo foi criado para descrever as pequenas cavidades observadas no microscópio primitivo.'
      },
      {
        id: 'n2',
        title: 'Teoria Celular: 3 Pilares',
        badge: 'Fundamental',
        icon: 'shield',
        color: '#10B981',
        tip: '1. **Formação** (menor unidade viva) | 2. **Função** (unidades funcionais) | 3. **Origem** (toda célula vem de outra pré-existente).',
        details: 'Todos os seres vivos são constituídos por células (exceto os vírus, que são acelulares e parasitas intracelulares obrigatórios).'
      },
      {
        id: 'n3',
        title: 'Organização Corporal',
        badge: 'Hierarquia',
        icon: 'layers',
        color: '#F59E0B',
        tip: '**Célula ➔ Tecido ➔ Órgão ➔ Sistema ➔ Organismo.**',
        details: 'Seres Unicelulares possuem 1 única célula (Bactérias e Protozoários). Pluricelulares possuem múltiplas células (Animais, Plantas e Fungos).'
      },
      {
        id: 'n4',
        title: 'Procariontes vs Eucariontes',
        badge: 'Cai Sempre em Provas',
        icon: 'git-branch',
        color: '#6366F1',
        tip: 'Procariontes: **DNA Solto (sem carioteca)**. Eucariontes: **DNA dentro do Núcleo com organelas membranosa**.',
        details: 'Bactérias são procariontes. Animais, plantas, fungos e protozoários são eucariontes com organelas complexas.'
      },
      {
        id: 'n5',
        title: 'Nutrição de Microrganismos',
        badge: 'Metabolismo',
        icon: 'sun',
        color: '#8B5CF6',
        tip: 'Autotróficos: **Produzem o próprio alimento (fotossíntese)** | Heterotróficos: **Obtêm alimento do meio**.',
        details: 'Cianobactérias e algas são autotróficas. Bactérias decompositoras e fungos são heterotróficos essenciais para a reciclagem da matéria.'
      }
    ]
  },
  direito: {
    title: 'Direito Constitucional: Artigo 5º & Direitos Fundamentais',
    root: 'Artigo 5º CF/88',
    nodes: [
      {
        id: 'd1',
        title: 'Remédios Constitucionais',
        badge: 'Mnemônico Ouro',
        icon: 'shield',
        color: '#6366F1',
        tip: 'Mnemônico: **Habeas Corpus** (Liberdade de Ir e Vir) | **Habeas Data** (Informações Pessoais).',
        details: 'Mandado de Segurança protege Direito Líquido e Certo não amparado por HC ou HD. Ação Popular: qualquer cidadão é parte legítima.'
      },
      {
        id: 'd2',
        title: 'Inviolabilidade do Domicílio',
        badge: 'Jurisprudência STF',
        icon: 'home',
        color: '#06B6D4',
        tip: 'Regra: Durante o dia com mandado judicial. Qualquer hora em flagrante delito ou desastre.',
        details: 'A entrada sem mandado à noite exige justa causa prévia comprovada fundamentada em elementos concretos.'
      },
      {
        id: 'd3',
        title: 'Crimes Imprescritíveis',
        badge: 'Pegadinha de Prova',
        icon: 'lock',
        color: '#EF4444',
        tip: 'Mnemônico: **RA-ÇÃO** (Raciocínio: Racismo e Ação de Grupos Armados).',
        details: 'São imprescritíveis e inafiançáveis. Já o crime de Tortura e Tráfico são insuscetíveis de graça ou anistia (TTT).'
      },
      {
        id: 'd4',
        title: 'Direito de Propriedade',
        badge: 'Função Social',
        icon: 'file-text',
        color: '#10B981',
        tip: 'Desapropriação por necessidade/utilidade pública com prévia e justa indenização em dinheiro.',
        details: 'Exceção: Glebas com culturas ilegais (plantas psicotrópicas) são expropriadas sem indenização.'
      }
    ]
  },
  quimica: {
    title: 'Química Orgânica: Funções & Isomeria',
    root: 'Química Orgânica',
    nodes: [
      {
        id: 'q1',
        title: 'Funções Oxigenadas',
        badge: 'Identificação',
        icon: 'droplet',
        color: '#8B5CF6',
        tip: 'Álcool (OH em C saturado) | Fenol (OH no Anel Aromático) | Enol (OH em C insaturado).',
        details: 'Cetona possui carbonila (C=O) entre dois carbonos. Aldeído possui carbonila na ponta da cadeia (C=O ligado a H).'
      },
      {
        id: 'q2',
        title: 'Funções Nitrogenadas',
        badge: 'Caráter Ácido-Base',
        icon: 'zap',
        color: '#06B6D4',
        tip: 'Aminas são BASES orgânicas (par de elétrons livre no Nitrogênio).',
        details: 'Basicidade das aminas: Amina Secundária > Amina Primária > Amina Terciária (em meio aquoso por impedimento estérico).'
      },
      {
        id: 'q3',
        title: 'Isomeria Plana',
        badge: 'Mnemônico',
        icon: 'git-commit',
        color: '#F59E0B',
        tip: 'Mnemônico: **PF-CMT** (Posição, Função, Cadeia, Metameria, Tautometria).',
        details: 'Tautometria é o equilíbrio dinâmico entre enol/aldeído ou enol/cetona.'
      },
      {
        id: 'q4',
        title: 'Isomeria Óptica',
        badge: 'Carbono Quiral',
        icon: 'compass',
        color: '#10B981',
        tip: 'Carbono Quiral (C*) está ligado a 4 ligantes DIFERENTES.',
        details: 'Fórmula de Isômeros Ópticos Ativos = 2^n (onde n é o número de carbonos quirais). Mistura Racêmica é inativa por compensação externa.'
      }
    ]
  }
};

// ESTADO GLOBAL DA APLICAÇÃO
let activeFilter = 'all';
let searchQuery = '';
let activeMindMapSubject = 'biologia';
let selectedProductForModal = null;

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  loadProductsData();
  setupEventListeners();
  loadMindMapSubject('biologia');
  updateStudyCalculator();
  startSocialProofToasts();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// 2. RENDERIZAÇÃO DO CATÁLOGO DE PRODUTOS
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = products.filter(p => {
    const matchesFilter = activeFilter === 'all' || p.category === activeFilter;
    const matchesSearch = searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center glass-card rounded-2xl p-8">
        <i data-lucide="search-x" class="w-12 h-12 text-cyan-400 mx-auto mb-3 opacity-60"></i>
        <h3 class="text-lg font-bold text-white">Nenhum material encontrado</h3>
        <p class="text-xs text-slate-400 mt-1">Tente pesquisar por outros termos como "Biologia", "Direito", "Combo" ou limpe os filtros.</p>
        <button onclick="clearSearch()" class="mt-4 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold">
          Limpar Filtros de Busca
        </button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  grid.innerHTML = filtered.map(product => {
    // Formatação de Preço com Ancoragem (De R$ XX por R$ YY)
    const hasOriginalPrice = product.originalPrice && product.originalPrice.trim() !== '';
    const priceDisplay = hasOriginalPrice
      ? `<div class="text-xs text-slate-400 font-medium">De <span class="line-through text-slate-500">${product.originalPrice}</span> por</div>`
      : `<div class="text-xs text-slate-400 font-medium">Por apenas</div>`;

    const guaranteeBadge = product.hasGuarantee !== false
      ? `<span class="text-[10px] uppercase font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1"><i data-lucide="shield-check" class="w-3 h-3"></i> ${product.guaranteeText || 'Garantia 7 Dias'}</span>`
      : `<span class="text-[10px] uppercase font-extrabold text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30 flex items-center gap-1"><i data-lucide="zap" class="w-3 h-3"></i> ${product.guaranteeText || 'Acesso Imediato'}</span>`;

    return `
    <div class="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative border border-slate-800">
      
      <div>
        <!-- Badge Superior -->
        <div class="flex items-center justify-between mb-4">
          <span class="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${product.badgeColor}">
            ${product.badge}
          </span>
          <div class="flex items-center text-amber-400 text-xs font-bold">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 mr-1"></i>
            <span>5.0</span>
          </div>
        </div>

        <!-- Título & Descrição -->
        <h3 class="text-xl font-bold font-display text-white mb-2 leading-snug">${product.title}</h3>
        <p class="text-xs sm:text-sm text-slate-400 mb-5 line-clamp-2">${product.desc}</p>

        <!-- Lista de Recursos Rápidos -->
        <div class="space-y-2 mb-6">
          ${product.features.slice(0, 3).map(feat => `
            <div class="flex items-start gap-2 text-xs text-slate-300">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5"></i>
              <span>${feat}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <!-- Preços & Ancoragem (De R$ 19,90 por R$ 9,90) -->
        <div class="pt-4 border-t border-slate-800/80 mb-5 flex items-baseline justify-between">
          <div>
            ${priceDisplay}
            <div class="text-2xl sm:text-3xl font-black font-display bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
              ${product.price}
            </div>
          </div>
          <div class="text-right">
            ${guaranteeBadge}
            <span class="text-[11px] text-slate-400 block mt-1">${product.installments}</span>
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="grid grid-cols-2 gap-2">
          <button onclick="openProductModal('${product.id}')" class="w-full py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
            <i data-lucide="eye" class="w-3.5 h-3.5 text-cyan-400"></i>
            Amostra & Tópicos
          </button>
          
          <button onclick="openCheckoutChoice('${product.id}')" class="w-full py-3 px-3 rounded-xl btn-gradient-primary text-xs font-bold flex items-center justify-center gap-1.5">
            <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
            Comprar Agora
          </button>
        </div>
      </div>

    </div>
  `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

// 3. EVENT LISTENERS E CONTROLES DE FILTRO
function setupEventListeners() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-slate-950', 'shadow-glow-cyan');
        b.classList.add('bg-slate-900', 'border', 'border-slate-800', 'text-slate-300');
      });

      btn.classList.remove('bg-slate-900', 'border', 'border-slate-800', 'text-slate-300');
      btn.classList.add('bg-cyan-500', 'text-slate-950', 'shadow-glow-cyan');

      activeFilter = btn.getAttribute('data-filter') || 'all';
      renderProducts();
    });
  });

  const searchInput = document.getElementById('catalogSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }
}

function clearSearch() {
  searchQuery = '';
  const searchInput = document.getElementById('catalogSearch');
  if (searchInput) searchInput.value = '';
  renderProducts();
}

// 4. DEGUSTADOR INTERATIVO DE MAPAS MENTAIS
function loadMindMapSubject(subjectKey) {
  activeMindMapSubject = subjectKey;
  const data = mindmapData[subjectKey];
  if (!data) return;

  document.querySelectorAll('.mm-subject-tab').forEach(tab => {
    if (tab.getAttribute('data-subject') === subjectKey) {
      tab.classList.add('bg-cyan-500', 'text-slate-950', 'font-bold');
      tab.classList.remove('bg-slate-900', 'text-slate-400');
    } else {
      tab.classList.remove('bg-cyan-500', 'text-slate-950', 'font-bold');
      tab.classList.add('bg-slate-900', 'text-slate-400');
    }
  });

  const rootTitle = document.getElementById('mmRootTitle');
  if (rootTitle) rootTitle.textContent = data.root;

  const nodesGrid = document.getElementById('mmNodesGrid');
  if (!nodesGrid) return;

  nodesGrid.innerHTML = data.nodes.map((node, idx) => `
    <div onclick="selectMindMapNode('${subjectKey}', '${node.id}')" class="mindmap-node glass-card p-4 rounded-2xl border border-slate-700/60 hover:border-cyan-400 relative transition-all cursor-pointer ${idx === 0 ? 'active-node' : ''}" id="mmNode_${node.id}">
      <div class="flex items-center justify-between mb-2">
        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style="background:${node.color}22; color:${node.color}; border:1px solid ${node.color}55">
          ${node.badge}
        </span>
        <i data-lucide="${node.icon}" class="w-4 h-4 text-cyan-400"></i>
      </div>
      <h4 class="text-sm font-bold text-white mb-1">${node.title}</h4>
      <p class="text-[11px] text-slate-400 line-clamp-1">${node.tip.replace(/\*\*/g, '')}</p>
    </div>
  `).join('');

  selectMindMapNode(subjectKey, data.nodes[0].id);

  if (window.lucide) window.lucide.createIcons();
}

function selectMindMapNode(subjectKey, nodeId) {
  const data = mindmapData[subjectKey];
  if (!data) return;

  const node = data.nodes.find(n => n.id === nodeId);
  if (!node) return;

  document.querySelectorAll('.mindmap-node').forEach(el => el.classList.remove('active-node'));
  const activeEl = document.getElementById(`mmNode_${nodeId}`);
  if (activeEl) activeEl.classList.add('active-node');

  const detailBox = document.getElementById('mmDetailContent');
  if (detailBox) {
    detailBox.innerHTML = `
      <div class="space-y-4 animate-in fade-in duration-300">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full" style="background:${node.color}"></span>
          <span class="text-xs font-bold text-cyan-400 uppercase tracking-widest">${node.badge}</span>
        </div>
        <h3 class="text-xl font-extrabold font-display text-white">${node.title}</h3>
        
        <div class="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed font-medium">
          <i data-lucide="zap" class="w-4 h-4 inline mr-1 text-cyan-400"></i>
          <strong>Dica da Profª. Juliana Maraccini:</strong> ${node.tip.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')}
        </div>

        <div class="text-xs text-slate-300 leading-relaxed">
          <strong class="text-slate-100 block mb-1">Como este tema cai na prova:</strong>
          ${node.details}
        </div>

        <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Sintetizado em 1 Mapa Mental</span>
          <a href="#catalogo" class="text-cyan-400 hover:underline font-semibold flex items-center gap-1">
            Ver Combo Completo <i data-lucide="arrow-right" class="w-3 h-3"></i>
          </a>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }
}

// 5. CALCULADORA INTERATIVA DE TEMPO E RETENÇÃO DE ESTUDO
function updateStudyCalculator() {
  const slider = document.getElementById('studyHoursSlider');
  const hoursValueDisplay = document.getElementById('studyHoursValue');
  const savedHoursDisplay = document.getElementById('savedHoursDisplay');
  const pagesSavedDisplay = document.getElementById('pagesSavedDisplay');

  if (!slider) return;

  const hours = parseInt(slider.value, 10);
  if (hoursValueDisplay) hoursValueDisplay.textContent = `${hours}h`;

  const hoursSavedPerMonth = Math.round(hours * 18.5);
  const pagesReduced = Math.round(hours * 75);

  if (savedHoursDisplay) savedHoursDisplay.textContent = `+${hoursSavedPerMonth} Horas economizadas/mês`;
  if (pagesSavedDisplay) pagesSavedDisplay.textContent = `${pagesReduced} páginas condensadas em mapas`;
}

// 6. MODAL DE DETALHES DO PRODUTO & SELEÇÃO DE PLATAFORMA DE CHECKOUT
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  selectedProductForModal = product;
  const modal = document.getElementById('productModal');
  const content = document.getElementById('modalContent');
  if (!modal || !content) return;

  const hasOriginalPrice = product.originalPrice && product.originalPrice.trim() !== '';
  const priceDisplayModal = hasOriginalPrice
    ? `<div class="text-xs text-slate-400">De <span class="line-through text-slate-500">${product.originalPrice}</span> por</div>`
    : `<div class="text-xs text-slate-400">Por apenas</div>`;

  const modalGuaranteeDisplay = product.hasGuarantee !== false
    ? `<span class="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1"><i data-lucide="shield-check" class="w-4 h-4"></i> ${product.guaranteeText || 'Garantia de 7 dias'}</span>`
    : `<span class="text-xs font-bold text-cyan-300 flex items-center justify-end gap-1"><i data-lucide="zap" class="w-4 h-4 text-cyan-400"></i> ${product.guaranteeText || 'Download Digital Imediato'}</span>`;

  content.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-center gap-3">
        <span class="text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border ${product.badgeColor}">
          ${product.badge}
        </span>
        <span class="text-xs text-amber-400 font-bold flex items-center gap-1">
          <i data-lucide="star" class="w-4 h-4 fill-amber-400"></i> Avaliação 5.0 (500+ alunos)
        </span>
      </div>

      <div>
        <h2 class="text-2xl sm:text-3xl font-black font-display text-white mb-2">${product.title}</h2>
        <p class="text-sm text-slate-300 leading-relaxed">${product.desc}</p>
      </div>

      <!-- Preview Visual do Produto -->
      <div class="relative rounded-2xl overflow-hidden border border-cyan-500/30 max-h-60">
        <img src="${product.previewImg}" alt="${product.title}" class="w-full h-full object-cover object-center">
        <div class="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent"></div>
        <span class="absolute bottom-3 left-3 text-[11px] font-bold text-cyan-300 bg-slate-950/80 px-3 py-1 rounded-lg border border-cyan-500/40">
          ✨ Mapa Mental da Profª. Juliana Maraccini (PDF Alta Resolução)
        </span>
      </div>

      <!-- Conteúdo Detalhado -->
      <div class="space-y-3">
        <h4 class="text-xs uppercase tracking-wider font-extrabold text-cyan-400">O que você vai receber:</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${product.features.map(f => `
            <div class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200">
              <i data-lucide="check" class="w-4 h-4 text-cyan-400 shrink-0"></i>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Módulos da Matéria -->
      <div class="space-y-2 pt-2 border-t border-slate-800">
        <h4 class="text-xs uppercase tracking-wider font-extrabold text-slate-400">Conteúdos Inclusos no Material:</h4>
        <ul class="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
          ${product.detailedTopics.map(topic => `<li>${topic}</li>`).join('')}
        </ul>
      </div>

      <!-- Área de Preço & Escolha de Checkout -->
      <div class="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-950 border border-cyan-500/40 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            ${priceDisplayModal}
            <span class="text-3xl font-black font-display text-white">${product.price}</span>
            <span class="text-xs text-cyan-300 block font-medium mt-0.5">${product.installments}</span>
          </div>
          <div class="text-right">
            ${modalGuaranteeDisplay}
            <span class="text-[10px] text-slate-400 block mt-1">Download Imediato por E-mail</span>
          </div>
        </div>

        <div>
          <a href="${product.checkoutUrl || product.checkoutKiwify}" target="_blank" class="w-full py-4 px-6 rounded-xl btn-gradient-primary font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-glow-cyan transition-all hover:scale-[1.01]">
            <i data-lucide="shopping-bag" class="w-5 h-5"></i>
            Garantir Acesso Imediato no Checkout Seguro
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.add('hidden');
}

function openCheckoutChoice(productId) {
  const product = products.find(p => p.id === productId);
  const targetUrl = product ? (product.checkoutUrl || product.checkoutKiwify) : null;
  if (targetUrl) {
    window.open(targetUrl, '_blank');
  } else {
    openProductModal(productId);
  }
}

// 7. CAPTAÇÃO DE LEADS & AMOSTRA GRÁTIS EM PDF INTERATIVA
function handleLeadSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById('leadName');
  const emailInput = document.getElementById('leadEmail');
  const feedback = document.getElementById('leadFeedback');

  if (!nameInput || !emailInput) return;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name && email) {
    if (feedback) {
      feedback.classList.remove('hidden');
      feedback.textContent = `✨ Parabéns, ${name}! Sua amostra da Profª. Juliana Maraccini foi gerada com sucesso! Abrindo leitor em PDF...`;
    }

    const leads = JSON.parse(localStorage.getItem('fonte_saber_leads') || '[]');
    leads.push({ name, email, date: new Date().toISOString() });
    localStorage.setItem('fonte_saber_leads', JSON.stringify(leads));

    setTimeout(() => {
      openSamplePreviewModal(name);
      nameInput.value = '';
      emailInput.value = '';
      if (feedback) feedback.classList.add('hidden');
    }, 1200);
  }
}

function openSamplePreviewModal(userName) {
  const modal = document.getElementById('sampleReaderModal');
  const title = document.getElementById('sampleReaderGreeting');

  if (title) {
    title.textContent = `Amostra VIP Destravada para ${userName}!`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }
}

function closeSampleReaderModal() {
  const modal = document.getElementById('sampleReaderModal');
  if (modal) modal.classList.add('hidden');
}

// 8. NOTIFICAÇÕES SOCIAIS DINÂMICAS (SOCIAL PROOF TOASTS)
const socialProofNotifications = [
  { name: 'Mariana S.', city: 'São Paulo - SP', action: 'acabou de baixar a Amostra da Profª. Juliana Maraccini 🎁' },
  { name: 'Lucas Gabriel', city: 'Belo Horizonte - MG', action: 'adquiriu o Combo Supremo 2026 ⭐' },
  { name: 'Beatriz Lima', city: 'Curitiba - PR', action: 'adquiriu o Pack Biologia Celular & BNCC 🧬' },
  { name: 'Rafael Torres', city: 'Rio de Janeiro - RJ', action: 'adquiriu o Manual de Redação Nota 1000 ✍️' },
  { name: 'Camila Ribeiro', city: 'Fortaleza - CE', action: 'adquiriu o Combo Decorando Formulas ⚖️' }
  //criar mais algumas
];

let toastIndex = 0;

function startSocialProofToasts() {
  const toast = document.getElementById('socialProofToast');
  if (!toast) return;

  setInterval(() => {
    const item = socialProofNotifications[toastIndex];
    toastIndex = (toastIndex + 1) % socialProofNotifications.length;

    const toastName = document.getElementById('toastName');
    const toastAction = document.getElementById('toastAction');

    if (toastName) toastName.textContent = `${item.name} (${item.city})`;
    if (toastAction) toastAction.textContent = item.action;

    toast.classList.remove('toast-hidden');
    toast.classList.add('toast-visible');

    setTimeout(() => {
      toast.classList.remove('toast-visible');
      toast.classList.add('toast-hidden');
    }, 5000);
  }, 14000);
}

// 9. FAQ ACCORDION INTERATIVO E BUSCA DE DÚVIDAS
function toggleFaq(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('[data-lucide="chevron-down"]');

  if (!content) return;

  const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

  document.querySelectorAll('.faq-content').forEach(c => c.style.maxHeight = '0px');
  document.querySelectorAll('#faqList [data-lucide="chevron-down"]').forEach(i => i.style.transform = 'rotate(0deg)');

  if (!isOpen) {
    content.style.maxHeight = content.scrollHeight + 'px';
    if (icon) icon.style.transform = 'rotate(180deg)';
  }
}

function filterFaq(query) {
  const items = document.querySelectorAll('#faqList > div');
  const q = query.toLowerCase();

  items.forEach(item => {
    const text = item.textContent ? item.textContent.toLowerCase() : '';
    if (text.includes(q)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// 10. TOGGLE MENU MOBILE
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// EXPORTAR FUNÇÕES PARA O GLOBAL
window.filterProducts = function (cat) {
  activeFilter = cat;
  renderProducts();
};
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.openCheckoutChoice = openCheckoutChoice;
window.loadMindMapSubject = loadMindMapSubject;
window.selectMindMapNode = selectMindMapNode;
window.updateStudyCalculator = updateStudyCalculator;
window.handleLeadSubmit = handleLeadSubmit;
window.openSamplePreviewModal = openSamplePreviewModal;
window.closeSampleReaderModal = closeSampleReaderModal;
window.toggleFaq = toggleFaq;
window.filterFaq = filterFaq;
window.toggleMobileMenu = toggleMobileMenu;
window.clearSearch = clearSearch;
