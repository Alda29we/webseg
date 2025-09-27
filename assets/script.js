// script.js - Animaciones, funcionalidad del menú y PWA

document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }

  // Scroll suave para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Formulario
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Gracias por tu mensaje. Te responderé pronto.");
      form.reset();
    });
  }

  // PWA instalación
  let deferredPrompt;
  const btnInstall = document.getElementById("btn-instalar");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btnInstall.style.display = "block";

    btnInstall.addEventListener("click", () => {
      btnInstall.style.display = "none";
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Instalación aceptada");
        }
        deferredPrompt = null;
      });
    });
  });

  // Registrar Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
      console.log("SW registrado correctamente");
    }).catch(err => {
      console.error("Fallo en el registro del SW:", err);
    });
  }
});
