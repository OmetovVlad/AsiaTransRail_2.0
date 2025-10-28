import * as functions from './modules/baseFunctions.js';
import 'bootstrap'

import Swiper from 'swiper';
import SwiperGL from './modules/swiper-gl.js';
import {Navigation, EffectFade, EffectCreative, Controller, Pagination, Autoplay} from 'swiper/modules';

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";

import './modules/phoneInputMask.js';
import './modules/gsapAnimations.js';

import './modules/chart.js';

functions.isWebp();
gsap.registerPlugin(ScrollTrigger);

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


Swiper.use([Navigation, SwiperGL, Controller, EffectFade, EffectCreative, Pagination, Autoplay]);


const mobileServicesList = new Swiper(".mobile_services_list", {
  slidesPerView: 1.34,
  spaceBetween: remToPx(1.142857142857143),
});

const progressBar = document.querySelector('#aboutSlider .swiper-pagination span');
const imageSlider = new Swiper('.imageSlider', {
  modules: [Navigation, Controller],
  speed: 500,
  loop: false,
  effect: 'gl',
  gl: {
    shader: ['wave-x'],
  },
  pagination: {
    el: '#aboutSlider .pagination .current_slide',
    clickable: true,
    renderBullet: function (index, className) {
      const num = (index + 1).toString().padStart(2, '0');
      return `<span class="${className}">(${num})</span>`;
    },
  },
  breakpoints: {
    768: {
      loop: true,
    }
  },
});

const textSlider = new Swiper('.textSlider', {
  modules: [Navigation, EffectFade, Autoplay],
  spaceBetween: 0,
  speed: 500,
  effect: 'fade',
  loop: true,
  navigation: {
    nextEl: '#aboutSlider .swiper-button-next',
    prevEl: '#aboutSlider .swiper-button-prev',
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressBar.style.width = `${(1 - progress) * 100}%`;
    }
  }
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

textSlider.params.autoplay = {
  delay: 5000,
  disableOnInteraction: false,
};

// Включаем autoplay, когда дошли до блока
ScrollTrigger.create({
  trigger: "#aboutSlider",
  start: "top center",
  onEnter: () => textSlider.autoplay.start(),
  onLeave: () => textSlider.autoplay.stop(),
  onLeaveBack: () => textSlider.autoplay.stop(), // если хочешь, чтобы останавливался при прокрутке вверх
});

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

const progressBar1Day = document.querySelector('#day1 .swiper-pagination span');
const day1Slider = new Swiper('#day1 .day1Slider', {
  modules: [Navigation, Controller, Autoplay],
  slidesPerView: 1,
  speed: 500,
  loop: false,
  spaceBetween: remToPx(1.1428571429),
  pagination: {
    el: '#day1 .pagination .current_slide',
    clickable: true,
    renderBullet: function (index, className) {
      const num = (index + 1).toString().padStart(2, '0');
      return `<span class="${className}">(${num})</span>`;
    },
  },
  breakpoints: {
    768: {
      slidesPerView: 6,
      spaceBetween: remToPx(1.714285714285714),
    }
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressBar1Day.style.width = `${(1 - progress) * 100}%`;
    }
  }
});

day1Slider.params.autoplay = {
  delay: 5000,
  disableOnInteraction: false,
};

// Включаем autoplay, когда дошли до блока
ScrollTrigger.create({
  trigger: "#day1",
  start: "top center",
  onEnter: () => day1Slider.autoplay.start(),
  onLeave: () => day1Slider.autoplay.stop(),
  onLeaveBack: () => day1Slider.autoplay.stop(), // если хочешь, чтобы останавливался при прокрутке вверх
});