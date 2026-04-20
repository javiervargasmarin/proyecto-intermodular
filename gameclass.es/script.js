// Elementos dinámicos en la página
const timeElement = document.getElementById('current-time');
const weatherIconElement = document.getElementById('weather-icon');
const weatherTextElement = document.getElementById('weather-text');
const themeToggleButton = document.getElementById('theme-toggle');
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');
const contactForm = document.getElementById('contact-form');
const contactFeedback = document.getElementById('contact-feedback');

function getPreferredTheme() {
  const saved = window.localStorage.getItem('gc-theme');
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
  document.body.dataset.theme = theme;
  window.localStorage.setItem('gc-theme', theme);
  if (themeToggleButton) {
    themeToggleButton.textContent = theme === 'dark' ? 'Claro' : 'Oscuro';
    themeToggleButton.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
}

if (themeToggleButton) {
  setTheme(getPreferredTheme());
  themeToggleButton.addEventListener('click', function () {
    const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
}

// Actualiza la hora en pantalla cada segundo
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  if (timeElement) {
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

function updateWeather() {
  // Determina un icono y texto de clima simple según la hora local
  const hour = new Date().getHours();
  let icon = '☀️';
  let description = 'Despejado';

  if (hour >= 19 || hour < 6) {
    icon = '🌙';
    description = 'Noche tranquila';
  } else if (hour >= 16) {
    icon = '🌤️';
    description = 'Tarde tranquila';
  } else if (hour >= 12) {
    icon = '☀️';
    description = 'Soleado';
  } else if (hour >= 8) {
    icon = '🌥️';
    description = 'Cielo claro';
  }

  if (weatherIconElement) {
    weatherIconElement.textContent = icon;
  }
  if (weatherTextElement) {
    weatherTextElement.textContent = description;
  }
}

if (timeElement) {
  setInterval(updateTime, 1000);
  updateTime();
}

if (weatherIconElement || weatherTextElement) {
  updateWeather();
}

// Solo añadimos el comportamiento de login si el formulario existe en la página
if (loginForm) {
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value;

    const validUser = 'cliente@gc.com';
    const validPass = 'GameClass2026!';

    if (user === validUser && pass === validPass) {
      if (loginMessage) {
        loginMessage.textContent = 'Bienvenido al área de clientes. Acceso concedido.';
        loginMessage.className = 'login-message success';
      }
      loginForm.reset();
    } else {
      if (loginMessage) {
        loginMessage.textContent = 'Usuario o contraseña incorrectos. Usa cliente@gc.com / GameClass2026!';
        loginMessage.className = 'login-message error';
      }
    }
  });
}

// Manejo del formulario de contacto, muestra mensajes en la interfaz
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      if (contactFeedback) {
        contactFeedback.textContent = 'Por favor completa todos los campos.';
        contactFeedback.className = 'contact-feedback error';
      }
      return;
    }

    if (contactFeedback) {
      contactFeedback.textContent = '¡Gracias! Tu mensaje ha sido enviado correctamente.';
      contactFeedback.className = 'contact-feedback success';
    }
    contactForm.reset();
  });
}
