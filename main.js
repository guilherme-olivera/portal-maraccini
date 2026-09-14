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

// ESTADO GLOBAL DA APLICAÇÃO
let activeFilter = 'all';
let searchQuery = '';
let selectedProductForModal = null;

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  loadProductsData();
  setupEventListeners();
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
    let matchesFilter = activeFilter === 'all';

    if (!matchesFilter) {
      const fk = activeFilter.toLowerCase();
      const cat = (p.category || '').toLowerCase();
      const tags = Array.isArray(p.tags) ? p.tags.map(t => t.toLowerCase()) : [];
      const title = (p.title || '').toLowerCase();
      const desc = (p.desc || '').toLowerCase();
      const feats = Array.isArray(p.features) ? p.features.join(' ').toLowerCase() : '';
      const topics = Array.isArray(p.detailedTopics) ? p.detailedTopics.join(' ').toLowerCase() : '';
      const fullText = `${title} ${desc} ${feats} ${topics}`;

      matchesFilter = cat === fk || tags.includes(fk);

      if (!matchesFilter) {
        if (fk === 'biologia' && (fullText.includes('biologia') || fullText.includes('citologia') || fullText.includes('celular'))) matchesFilter = true;
        if (fk === 'ciencias' && (fullText.includes('ciência') || fullText.includes('ciencias'))) matchesFilter = true;
        if (fk === 'fisica' && (fullText.includes('física') || fullText.includes('fisica'))) matchesFilter = true;
        if (fk === 'quimica' && (fullText.includes('química') || fullText.includes('quimica'))) matchesFilter = true;
        if (fk === 'matematica' && (fullText.includes('matemática') || fullText.includes('matematica'))) matchesFilter = true;
        if (fk === 'saresp' && fullText.includes('saresp')) matchesFilter = true;
        if (fk === 'provapaulista' && (fullText.includes('paulista') || fullText.includes('prova paulista'))) matchesFilter = true;
        if (fk === 'mapas' && (fullText.includes('mapa') || fullText.includes('resumo') || cat === 'mapas')) matchesFilter = true;
        if (fk === 'simulados' && (fullText.includes('simulado') || fullText.includes('questõ') || fullText.includes('caderno') || cat === 'simulados')) matchesFilter = true;
      }
    }

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
        <!-- Preços & Ancoragem -->
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

// 4. MODAL DE DETALHES DO PRODUTO & SELEÇÃO DE PLATAFORMA DE CHECKOUT
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

// 5. CAPTAÇÃO DE LEADS & AMOSTRA GRÁTIS EM PDF INTERATIVA
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

// 6. NOTIFICAÇÕES SOCIAIS DINÂMICAS (SOCIAL PROOF TOASTS)
const socialProofNotifications = [
  { name: 'Mariana S.', city: 'São Paulo - SP', action: 'acabou de baixar a Amostra da Profª. Juliana Maraccini 🎁' },
  { name: 'Lucas Gabriel', city: 'Belo Horizonte - MG', action: 'adquiriu o Combo Supremo 2026 ⭐' },
  { name: 'Beatriz Lima', city: 'Curitiba - PR', action: 'adquiriu o Pack Biologia Celular & BNCC 🧬' },
  { name: 'Rafael Torres', city: 'Rio de Janeiro - RJ', action: 'adquiriu o Manual de Redação Nota 1000 ✍️' },
  { name: 'Camila Ribeiro', city: 'Fortaleza - CE', action: 'adquiriu o Combo Decorando Fórmulas ⚖️' },
  { name: 'Fernanda Rocha', city: 'Campinas - SP', action: 'adquiriu o E-book Visual Humanas Express 📜' },
  { name: 'Thiago Mendes', city: 'Salvador - BA', action: 'baixou a Amostra Grátis de Citologia 🎁' },
  { name: 'Amanda Alencar', city: 'Recife - PE', action: 'adquiriu o Caderno de 600 Questões Comentadas 📝' },
  { name: 'Gabriel Vasconcelos', city: 'Porto Alegre - RS', action: 'adquiriu o Combo Supremo ENEM & Vestibulares ⭐' },
  { name: 'Juliana P.', city: 'Goiânia - GO', action: 'baixou a Amostra VIP de Teoria Celular 🎁' },
  { name: 'Matheus Oliveira', city: 'Florianópolis - SC', action: 'adquiriu o Pack Mapas Mentais de Biologia 🧬' },
  { name: 'Larissa Martins', city: 'Manaus - AM', action: 'adquiriu o Manual Visual de Redação Nota 1000 ✍️' },
  { name: 'Rodrigo S.', city: 'Brasília - DF', action: 'adquiriu o Combo Carreiras Administrativas & Tribunais ⚖️' },
  { name: 'Carla Dias', city: 'Vitória - ES', action: 'adquiriu o E-book Visual Humanas Express 📜' },
  { name: 'Felipe N.', city: 'Belém - PA', action: 'baixou o Mapa Mental Ilustrado de Citologia 🎁' },
  { name: 'Isabela Souza', city: 'Ribeirão Preto - SP', action: 'adquiriu o Combo Supremo 2026 ⭐' },
  { name: 'Diego Ferreira', city: 'Natal - RN', action: 'adquiriu o Caderno de 600 Questões Comentadas 📝' },
  { name: 'Carolina Mendes', city: 'Maceió - AL', action: 'adquiriu o Pack Biologia Celular & BNCC 🧬' },
  { name: 'Vinícius Ramos', city: 'João Pessoa - PB', action: 'adquiriu o Manual de Redação Nota 1000 ✍️' }
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

// 7. FAQ ACCORDION INTERATIVO E BUSCA DE DÚVIDAS
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

// 8. TOGGLE MENU MOBILE
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
window.handleLeadSubmit = handleLeadSubmit;
window.openSamplePreviewModal = openSamplePreviewModal;
window.closeSampleReaderModal = closeSampleReaderModal;
window.toggleFaq = toggleFaq;
window.filterFaq = filterFaq;
window.toggleMobileMenu = toggleMobileMenu;
window.clearSearch = clearSearch;
