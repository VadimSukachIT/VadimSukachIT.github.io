// pwa-install.js — переиспользуемый для всех лендингов
(function () {
  const source = document.currentScript.dataset.source || 'unknown-landing';

  // Регистрируем service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }

  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = document.getElementById('install-btn');
    if (btn) {
      btn.classList.add('visible');
    }
  });

  window.addEventListener('afterinstallprompt', (e) => {
    e.preventDefault();
    const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true; // для iOS
  
    if (isStandalone) {
      window.location.href = '/';
      return;
    }
  });

  window.installApp = function () {
    if (!deferredPrompt) return;

    // Опционально: лог установки
    
    // fetch('/api/pwa', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ source })
    // });

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('✅ Установлено');
      } else {
        console.log('❌ Отказ');
      }
      deferredPrompt = null;
    });
  };
})();

// setInterval(() => {

//   const isStandalone =
//   window.matchMedia('(display-mode: standalone)').matches ||
//   window.navigator.standalone === true; // для iOS

//   if (isStandalone) {
//     window.location.href = '/';
//     return;
//   }
// }, 500)
