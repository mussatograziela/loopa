const form = document.querySelector('#login-form');
const password = document.querySelector('#password');
const message = document.querySelector('#message');
let messageTimer;

document.querySelector('#toggle-password').addEventListener('click', () => {
  const visible = password.type === 'text';
  password.type = visible ? 'password' : 'text';
  document.querySelector('#toggle-password').setAttribute('aria-label', visible ? 'Mostrar senha' : 'Ocultar senha');
});

function showMessage(text) {
  message.textContent = text;
  message.classList.add('show');
  clearTimeout(messageTimer);
  messageTimer = setTimeout(() => message.classList.remove('show'), 2400);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  showMessage('Acesso realizado. Preparando seu ateliê…');
  setTimeout(() => { window.location.href = 'projetos.html'; }, 650);
});

document.querySelector('#create-account').addEventListener('click', (event) => {
  event.preventDefault();
  showMessage('O cadastro será disponibilizado em breve. Você já pode conhecer o ateliê!');
});
