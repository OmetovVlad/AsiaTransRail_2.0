/* Проверка на мобольное устройство */
export const isMobile = () => {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    (('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
      window.innerWidth < 768)
  );
};

if (isMobile()) {
  document.documentElement.classList.add('_touch');
} else {
  document.documentElement.classList.add('_pc');
}

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  // Добавление класса _webp или _no-webp для HTML
  testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}

// Блокировка скролла
export const bodyLock = (e) => {
  document.querySelector('body').classList.add('_lock');
  let widthScrollBar = window.innerWidth - document.documentElement.clientWidth;
  // document.querySelector('.header').style.marginRight = widthScrollBar + 'px';
  document.querySelector('body').style.marginRight = widthScrollBar + 'px';
};

// Удаление блокировки скролла
export const bodyUnLock = (e) => {
  document.querySelector('body').style.marginRight = '0px';
  // document.querySelector('.header').style.marginRight = '0px';
  document.querySelector('body').classList.remove('_lock');
};

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.open_menu');
  if (!btn) return;

  const headerEl = btn.closest('.mobile-header');

  btn.addEventListener('click', () => {
    headerEl.classList.toggle('open');
    btn.classList.toggle('open');

    if ( headerEl.classList.contains('open') ) {
      bodyLock();
    } else {
      bodyUnLock();
    }

  });
});