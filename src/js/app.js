import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

import * as functions from './modules/baseFunctions.js';
import 'bootstrap'

import Swiper from 'swiper';
import SwiperGL from './modules/swiper-gl.js';
import {Navigation, EffectFade, EffectCreative, Controller, Pagination, Autoplay} from 'swiper/modules';

import './modules/treeSwiper.js';

import './modules/phoneInputMask.js';
import './modules/gsapAnimations.js';

import './modules/chart.js';
import './modules/form.js';
import './modules/tariffs.js';
import './modules/tooltips.js';

functions.isWebp();

const remToPx = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

gsap.registerPlugin(ScrollTrigger);

Swiper.use([Navigation, SwiperGL, Controller, EffectFade, EffectCreative, Pagination, Autoplay]);

const mobileServicesList = new Swiper(".mobile_services_list", {
  slidesPerView: 1.34,
  spaceBetween: remToPx(1.142857142857143),
});

const progressBar = document.querySelector('#aboutSlider .swiper-pagination span');
const imageSlider = new Swiper('.imageSlider', {
  modules: [Navigation, Controller],
  speed: 300,
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

  if (document.querySelector('#aboutSlider')) {
    ScrollTrigger.create({
      trigger: "#aboutSlider",
      start: "top center",
      onEnter: () => textSlider.autoplay.start(),
      onLeave: () => textSlider.autoplay.stop(),
      onLeaveBack: () => textSlider.autoplay.stop(), // если хочешь, чтобы останавливался при прокрутке вверх
    });
  }


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
  modules: [Navigation, Controller],
  slidesPerView: 1,
  speed: 500,
  loop: false,
  spaceBetween: remToPx(1.1428571429),
  pagination: {
    el: "#day1 .swiper-pagination",
    type: "progressbar",
  },
  breakpoints: {
    768: {
      slidesPerView: 6,
      spaceBetween: remToPx(1.714285714285714),
    }
  },
  on: {
    init: function() {
      updateCurrentSlide(this);
    },
    slideChange: function() {
      updateCurrentSlide(this);
    }
  },
});

function updateCurrentSlide(swiper) {
  const current = swiper.realIndex + 1; // Номер активного слайда
  const formatted = current.toString().padStart(2, '0'); // Преобразуем в формат 01, 02, ...
  document.querySelector('#day1 .current_slide').textContent = `(${formatted})`;
}

const total = day1Slider.slides.length; // если loop = false, можно просто swiper.slides.length
document.querySelector('#day1 .total').textContent = `(${total.toString().padStart(2, '0')})`;

window.addEventListener("scroll", () => {
  const blocks = document.querySelectorAll(".info__block");
  const blocksWrapper = document.querySelector(".info__blocks");
  const imageWrapper = document.querySelector(".info__image-wrapper");

  const images = document.querySelectorAll(".info__image-wrapper img");
  let currentImg = document.querySelector(".info__image-wrapper img.active");

  let activeBlock = blocks[0];

  const triggerOffset = window.innerWidth > 768
    ? imageWrapper.getBoundingClientRect().bottom
    : remToPx(19.4285714286);

  let found = false;

  blocks.forEach((block, i) => {
    const rect = block.getBoundingClientRect();

    if (window.innerWidth > 768) {
      // DESKTOP
      if (rect.top + 1 <= triggerOffset) {
        activeBlock = block;
        found = true;
      }
    } else {
      // MOBILE (sticky)
      if (rect.top <= triggerOffset && rect.bottom > triggerOffset) {
        activeBlock = block;
        found = true;

        const lastBlock = blocks[blocks.length - 1];
        imageWrapper.style.marginBottom = lastBlock.offsetHeight + "px";
        blocksWrapper.style.marginTop = "-" + lastBlock.offsetHeight + "px";
      }
    }
  });

  // ❗ ЕСЛИ НИ ОДИН БЛОК НЕ НАЙДЕН — НЕ МЕНЯЕМ КАРТИНКУ
  // Это защищает от возврата к 1-й картинке
  if (!found) return;

  // Меняем картинку
  const newId = activeBlock.dataset.img;
  const newImg = document.getElementById(newId);

  if (newImg && newImg !== currentImg) {
    currentImg.classList.remove("active");
    newImg.classList.add("active");
  }
});



const mapGroups = document.querySelectorAll('#geography svg #map_elements > g');
const mapTooltips = document.querySelectorAll('#geography svg #Tooltips > g');
const mapPopups = document.querySelectorAll('#geography .popup_map');
mapGroups.forEach(mapElement => {

  const id = mapElement.getAttribute('id');

  mapElement.addEventListener('click', () => {
    mapGroups.forEach(el => {
      el.classList.remove('active');
    })
    mapPopups.forEach(mapPopup => {
      mapPopup.classList.remove('active');
    })
    mapElement.classList.add('active');
    document.getElementById(id + '_popup').classList.add('active');
  })

  mapElement.addEventListener('mouseover', (e) => {
    document.getElementById(id + '_tooltip').classList.add('active');
  })

  mapElement.addEventListener('mouseout', (e) => {
    mapTooltips.forEach(mapTooltip => {
      mapTooltip.classList.remove('active');
    })
  })
})

mapPopups.forEach(mapPopup => {
  mapPopup.querySelector('.close').addEventListener('click', () => {
    mapGroups.forEach(el => {
      el.classList.remove('active');
    })
    mapPopups.forEach(mapPopup => {
      mapPopup.classList.remove('active');
    })
  })
})








