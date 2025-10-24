import Swiper from 'swiper';
import {EffectFade, Controller, Pagination} from 'swiper/modules';
import SwiperGL from './modules/swiper-gl.js';

import * as functions from './modules/baseFunctions.js';
import './modules/phoneInputMask.js';
import './modules/gsapAnimations.js';


functions.isWebp();

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


Swiper.use([SwiperGL, Controller, EffectFade, Pagination]);

const swiper = new Swiper(".mobile_services_list", {
  slidesPerView: 1.34,
  spaceBetween: remToPx(1.142857142857143),
});

// const slider = new Swiper('.mainSlider', {
//   loop: true,
//   speed: 1000,
//   effect: 'gl',
//   gl: { shader: 'morph-x' },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// });

const imageSlider = new Swiper('.imageSlider', {
  modules: [Controller],
  speed: 500,
  effect: 'gl',
  gl: {
    shader: ['morph-x'],
  },
});

const textSlider = new Swiper('.textSlider', {
  modules: [EffectFade, Controller],
  effect: 'fade',
  spaceBetween: 0,
  speed: 500,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
});

imageSlider.controller.control = textSlider;
textSlider.controller.control = imageSlider;