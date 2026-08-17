const dialog = document.querySelector('.welcome-dialog');
const dialogText = document.querySelector('#dialog-text');
const dialogTitle = document.querySelector('#dialog-title');

const messages = {
  signup: {
    title: 'Vamos criar juntas?',
    text: 'Seu espaço para descobrir ideias, registrar projetos e fazer parte de uma comunidade que ama criar está quase pronto.'
  },
  login: {
    title: 'Bem-vinda de volta!',
    text: 'Que tal retomar suas laçadas e ver o que a comunidade preparou hoje?'
  }
};

document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
});

document.querySelectorAll('.close-dialog, .close-cta').forEach((button) => {
  button.addEventListener('click', () => dialog.close());
});
