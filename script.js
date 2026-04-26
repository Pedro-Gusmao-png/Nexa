// =====================================
// ⚙️ CONFIGURAÇÃO DO EVENTO
// Edite apenas esta seção
// =====================================

// 📍 Coordenadas do local (mais profissional que endereço)
const MAP_LAT = "-8.0476";
const MAP_LNG = "-34.8770";

// 🔗 Link universal (abre escolha de apps no celular)
const MAP_URL = `geo:0,0?q=${MAP_LAT},${MAP_LNG}`;

// 📱 WhatsApp (DDI + DDD + número, sem espaços)
const WHATSAPP_NUMBER = "5581999999999";

// 💬 Mensagem padrão
const WHATSAPP_MESSAGE = "Quero confirmar minha presença!";


// =====================================
// 🚀 INICIALIZAÇÃO
// =====================================

window.addEventListener("load", () => {
  const fadeElement = document.querySelector(".fade");

  if (fadeElement) {
    fadeElement.style.opacity = "1";
    fadeElement.style.transform = "translateY(0)";
  }
});


// =====================================
// 📍 BOTÃO MAPA (PROFISSIONAL)
// =====================================

const mapButton = document.getElementById("btnMapa");

if (mapButton) {
  mapButton.onclick = (event) => {
    event.preventDefault();

    // 📱 Mobile → abre seletor de apps (Waze, Maps, etc.)
    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
      window.location.href = MAP_URL;
    } 
    // 💻 Desktop → abre Google Maps no navegador
    else {
      const desktopMap = `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}`;
      window.open(desktopMap, "_blank");
    }
  };
}


// =====================================
// 📱 BOTÃO WHATSAPP
// =====================================

const whatsappButton = document.getElementById("btnWhats");

if (whatsappButton) {
  whatsappButton.onclick = (event) => {
    event.preventDefault();

    whatsappButton.style.opacity = "0.7";
    whatsappButton.innerText = "Abrindo...";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

    setTimeout(() => {
      window.open(url, "_blank");

      whatsappButton.style.opacity = "1";
      whatsappButton.innerHTML = `<i class="fab fa-whatsapp"></i> Confirmar presença`;
    }, 500);
  };
}


// =====================================
// ⏳ CONTADOR REGRESSIVO
// =====================================

function iniciarContador() {
  const countdownElement = document.getElementById("countdown");
  if (!countdownElement) return;

  const dataEvento = new Date(
    `${countdownElement.dataset.ano}-${countdownElement.dataset.mes}-${countdownElement.dataset.dia}T${countdownElement.dataset.hora}:${countdownElement.dataset.minuto}`
  ).getTime();

  function atualizarContador() {
    const agora = Date.now();
    const diferenca = dataEvento - agora;

    if (diferenca <= 0) {
      countdownElement.innerText = "Evento iniciado";
      return;
    }

    const dias = Math.floor(diferenca / 86400000);
    const horas = Math.floor((diferenca / 3600000) % 24);
    const minutos = Math.floor((diferenca / 60000) % 60);

    if (dias === 0 && horas <= 5) {
      countdownElement.innerText = `🔥 Começa em ${horas}h ${minutos}min`;
    } else {
      countdownElement.innerText = `Faltam ${dias}d ${horas}h ${minutos}min`;
    }
  }

  atualizarContador();
  setInterval(atualizarContador, 1000);
}

iniciarContador();
