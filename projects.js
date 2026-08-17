const colors = ['#f66eae', '#7651df', '#a373ef', '#ff9ac5', '#4f8ee9'];
let selectedColor = colors[0];
let activeProject;
let toastTimer;
const projects = [
  { id: 1, name: 'Manta Ondas do Mar', color: '#f66eae', row: 42, total: 120, note: 'Repita o ponto onda a cada 12 carreiras. Troque para o novelo azul petróleo na carreira 60.', materials: ['Novelo azul petróleo · 3 un', 'Novelo branco · 1 un', 'Agulha de crochê 4,5 mm'] },
  { id: 2, name: 'Amigurumi Coelho', color: '#a373ef', row: 15, total: 40, note: 'Faça seis aumentos por carreira até a carreira 6. Coloque o enchimento antes de fechar.', materials: ['Novelo rosa bebê · 1 un', 'Enchimento fiberfill', 'Olhos de segurança 8 mm'] },
  { id: 3, name: 'Cachecol Trança', color: '#7651df', row: 8, total: 0, note: 'Ponto trança a cada quatro carreiras. Mantenha a largura de 24 pontos.', materials: ['Novelo lã mesclada · 2 un'] }
];
const $ = (selector) => document.querySelector(selector);

function renderList() {
  $('#project-list').innerHTML = projects.map((project) => {
    const progress = project.total ? Math.round(project.row / project.total * 100) : '—';
    return `<button class="project-card" data-id="${project.id}"><span class="ball" style="background:${project.color}"></span><span class="card-copy"><strong>${project.name}</strong><span>Carreira ${project.row}${project.total ? ` de ${project.total}` : ''}</span></span><span class="percentage">${progress}${project.total ? '%' : ''}</span></button>`;
  }).join('');
  document.querySelectorAll('.project-card').forEach((card) => card.addEventListener('click', () => openProject(Number(card.dataset.id))));
}
function openProject(id) { activeProject = projects.find((p) => p.id === id); updateProject(); $('.dashboard').classList.remove('is-active'); $('.project-view').classList.add('is-active'); }
function updateProject() {
  const p = activeProject; const pct = p.total ? Math.min(100, p.row / p.total * 100) : Math.min(100, p.row / 30 * 100);
  $('#project-name').textContent = p.name; $('#count').textContent = p.row; $('#total').textContent = p.total ? `de ${p.total}` : 'sem meta';
  $('.counter-circle').style.setProperty('--progress', `${pct}%`); $('#progress-note').textContent = p.total ? `${Math.round(pct)}% da sua criação concluída` : 'Cada ponto conta.';
  $('#recipe-text').textContent = p.note; $('#materials').innerHTML = p.materials.map((m) => `<li>${m}</li>`).join('');
}
function showToast(text) { $('#toast').textContent = text; $('#toast').classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 1800); }
function openForm() { $('#project-form').classList.add('show'); $('#overlay').classList.add('show'); $('#new-name').focus(); }
function closeForm() { $('#project-form').classList.remove('show'); $('#overlay').classList.remove('show'); }
function renderColors() { $('#color-picker').innerHTML = colors.map((color, index) => `<button type="button" class="color ${index === 0 ? 'selected' : ''}" data-color="${color}" style="background:${color}" aria-label="Selecionar cor"></button>`).join(''); document.querySelectorAll('.color').forEach((color) => color.addEventListener('click', () => { selectedColor = color.dataset.color; document.querySelectorAll('.color').forEach((item) => item.classList.toggle('selected', item === color)); })); }

$('#open-form').addEventListener('click', openForm); $('#close-form').addEventListener('click', closeForm); $('#overlay').addEventListener('click', closeForm);
$('#back-to-list').addEventListener('click', () => { $('.project-view').classList.remove('is-active'); $('.dashboard').classList.add('is-active'); renderList(); });
$('#increase').addEventListener('click', () => { activeProject.row++; updateProject(); showToast('Carreira salva automaticamente'); });
$('#decrease').addEventListener('click', () => { activeProject.row = Math.max(0, activeProject.row - 1); updateProject(); });
$('#sync-status').addEventListener('click', () => showToast('Tudo salvo no seu aparelho'));
document.querySelectorAll('.tabs button').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('.tabs button').forEach((item) => item.classList.toggle('is-selected', item === button)); document.querySelectorAll('.tab').forEach((tab) => tab.classList.toggle('is-visible', tab.id === button.dataset.tab)); }));
$('#project-form').addEventListener('submit', (event) => { event.preventDefault(); const name = $('#new-name').value.trim(); if (!name) return; const total = Number($('#new-total').value) || 0; const project = { id: Date.now(), name, color: selectedColor, row: 0, total, note: 'Adicione aqui as anotações da sua receita.', materials: ['Adicione seus materiais'] }; projects.unshift(project); closeForm(); event.target.reset(); openProject(project.id); });
renderColors(); renderList();
