import './modules/swiperEffects.js';

import Swiper from 'swiper';

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

var swiper = new Swiper(".mobile_services_list", {
  slidesPerView: 1.34,
  spaceBetween: remToPx(1.142857142857143),
});