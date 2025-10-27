import Swiper from 'swiper';
import {Navigation, EffectFade, EffectCreative, Controller, Pagination} from 'swiper/modules';
import SwiperGL from './modules/swiper-gl.js';

import * as functions from './modules/baseFunctions.js';
import './modules/phoneInputMask.js';
import './modules/gsapAnimations.js';

import './modules/chart.js';


functions.isWebp();

const phoneInputs = document.querySelectorAll('.phone');
const maskOptions = {
  mask: '+{7} (000) 000-00-00'
};

phoneInputs.forEach((phoneInput) => {
  const mask = IMask(phoneInput, maskOptions);
})

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.open_menu');
  if (!btn) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
  });
});

const remToPx = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};


Swiper.use([Navigation, SwiperGL, Controller, EffectFade, EffectCreative, Pagination]);

const swiper = new Swiper(".mobile_services_list", {
  slidesPerView: 1.34,
  spaceBetween: remToPx(1.142857142857143),
});

const imageSlider = new Swiper('.imageSlider', {
  modules: [Navigation, Controller],
  speed: 500,
  loop: false,
  effect: 'gl',
  gl: {
    shader: ['wave-x'],
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  breakpoints: {
    768: {
      loop: true,
    }
  }
});

const textSlider = new Swiper('.textSlider', {
  modules: [Navigation, EffectFade],
  spaceBetween: 0,
  speed: 500,
  effect: 'fade',
  loop: true,
  navigation: {
    nextEl: '#aboutSlider .swiper-button-next',
    prevEl: '#aboutSlider .swiper-button-prev',
  },
});

const navSlider = new Swiper('.navSlider .slider', {
  modules: [EffectFade],
  spaceBetween: 0,
  speed: 500,
  loop: true,
  grabCursor: true,
  effect: 'fade',
  autoHeight: true,
});

textSlider.controller.control = [imageSlider, navSlider];
imageSlider.controller.control = textSlider;
navSlider.controller.control = textSlider;

const storySlider = new Swiper(".storySlider", {
  modules: [Navigation],
  slidesPerView: 2.5,
  // centeredSlides: true,
  spaceBetween: remToPx(1.142857142857143),
  freeMode: true,            // свободный режим
  freeModeMomentum: false,   // без инерции
  // autoHeight: true,
  navigation: {
    nextEl: '.storySlider_nav .swiper-button-next',
    prevEl: '.storySlider_nav .swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 5.3,
      // centeredSlides: false,
      spaceBetween: remToPx(6.428571428571429),
    }
  }
});

const marquees = document.querySelectorAll(".marquee");
