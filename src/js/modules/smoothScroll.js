import { bodyUnLock } from './baseFunctions.js';

const links = document.querySelectorAll('[data-anchor]');
const isMainPage = window.location.pathname === '/';

// Функция для плавного скролла к элементу
const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    let elementPosition = element.getBoundingClientRect().top + window.scrollY;

    if (document.documentElement.classList.contains('_touch')) {
      elementPosition =
        elementPosition - document.querySelector('header.header').clientHeight;
    }

    // Закрытие меню и разблокировка body, если требуется
    document.querySelector('.header')?.classList.remove('opened');
    // Убираем активность кнопки открытого меню
    document.querySelector('.mobile-menu-button').classList.remove('opened');
    bodyUnLock?.();

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });
  }
};

// Обработка кликов на ссылки
links?.forEach((link) => {
  const anchor = link.dataset.anchor;

  if (isMainPage) {
    // На главной странице выполняем скролл
    link.addEventListener('click', (event) => {
      if (anchor) {
        event.preventDefault();
        scrollToElement(anchor);

        // Закрытие навигации (если требуется)
        document.querySelector('.nav')?.classList.remove('opened');
        // Убираем активность кнопки открытого меню
        document
          .querySelector('.mobile-menu-button')
          .classList.remove('opened');
        bodyUnLock?.();
      }
    });
  } else {
    // На других страницах сохраняем секцию в localStorage
    link.addEventListener('click', () => {
      if (anchor) {
        localStorage.setItem('scrollToSection', anchor);
      }
    });
  }
});

// Скроллим к секции после полной загрузки страницы
if (isMainPage) {
  const savedAnchor = localStorage.getItem('scrollToSection');
  if (savedAnchor) {
    window.addEventListener('load', () => {
      localStorage.removeItem('scrollToSection'); // Очищаем после использования
      scrollToElement(savedAnchor);
    });
  }
}

// Обработчик кликов вне элемента
export function clickOut() {
  document.addEventListener('mouseup', function (e) {
    let modalWindow = document.querySelector('.modal.open .window');

    if (modalWindow) {
      if (!modalWindow.contains(e.target)) {
        modalWindow.closest('.modal').classList.remove('open');
        document.querySelector('html').classList.remove('_lock');
      }
    }
  });
}
