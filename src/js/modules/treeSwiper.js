import {EffectFade, Navigation, Pagination} from "swiper/modules";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import { gsap } from 'gsap';
import Swiper from 'swiper';

const remToPx = rem => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

const canvasSize = remToPx(30.85714285714286);

const imagesWrapper = document.getElementById('three-canvas');
// const images = document.getElementById('three-canvas').querySelectorAll('img');
//
// function showImage(index) {
//   images.forEach((image, i) => {
//     if (i === index) {
//       image.classList.add('active');
//     } else {
//       image.classList.remove('active');
//     }
//   })
// }

// 🔹 Canvas и сцена
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, canvasSize/canvasSize, 0.1, 100);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(canvasSize, canvasSize);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.sortObjects = true; // важно для прозрачных объектов
// обновляем камеру под новый размер
camera.aspect = 1; // квадрат
camera.updateProjectionMatrix();

// 🔹 Освещение
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // мягкий свет
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 🔹 Loader
// const loader = new GLTFLoader();

const loader = new GLTFLoader();

// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('/files/draco/');
// loader.setDRACOLoader(dracoLoader);

// 🔹 Хранение моделей
const models = {};
const idleTweens = {};

// 🔹 Idle-анимация
function startIdleAnimation(model, index) {
  idleTweens[index] = gsap.to(model.rotation, {
    y: "+=0.6",          // вращение влево-вправо
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(model.position, {
    y: "+=0.05",          // колебание вверх-вниз
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

function pauseIdle(index) {
  if (idleTweens[index]) idleTweens[index].pause();
}

function resumeIdle(index) {
  if (idleTweens[index]) idleTweens[index].resume();
}

function stopIdleAnimation(index) {
  if (idleTweens[index]) idleTweens[index].kill();
}

// 🔹 Загрузка одной модели
function loadModel(path) {
  return new Promise(resolve => {
    loader.load(path, gltf => {
      const model = gltf.scene;
      model.traverse(child => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 0;
          child.material.depthWrite = false; // для корректной прозрачности
        }
      });
      resolve(model);
    });
  });
}

// 🔹 Подгружаем все модели заранее
async function loadAllModels() {
  const slides = document.querySelectorAll('.threeSlider .swiper-slide');
  for (let i = 0; i < slides.length; i++) {
    const path = slides[i].dataset.model;
    const model = await loadModel(path);

    // Центрируем модель
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    // Доп. настройки

    if (i === 0) {
      model.scale.set(1.5, 1.5, 1.5);
      model.position.x -= 0.1;
    }
    if (i === 1) {
      model.scale.set(0.7, 0.7, 0.7);
    }
    if (i === 2) {
      model.scale.set(1.5, 1.5, 1.5);
    }
    if (i === 3) {
      model.scale.set(1.5, 1.5, 1.5);
      model.position.x -= 0.1;
    }
    if (i === 4) {
      model.scale.set(1.1, 1.1, 1.1);
      model.position.x -= 0.05;
    }
    if (i === 5) {
      model.scale.set(1.6, 1.6, 1.6);
      model.position.x -= 0.1;
    }


    model.position.z = 1;
    model.rotation.y = -1.2;

    models[i] = model;
    scene.add(model);
    startIdleAnimation(model, i);
  }
}


// 🔹 Показ активной модели
function showModel(index) {
  Object.entries(models).forEach(([i, model]) => {
    i = +i;

    // Сначала ставим на паузу все idle
    pauseIdle(i);

    model.traverse(child => {
      if (child.isMesh) {
        if (i === index) {
          // Плавная прозрачность
          gsap.to(child.material, { opacity: 1, duration: 0.75, ease: "power2.out" });
          child.material.depthWrite = true;
        } else {
          gsap.to(child.material, { opacity: 0, duration: 0.75, ease: "power2.out" });
          child.material.depthWrite = false;
        }

        // Вращение на 360 градусов при появлении
        gsap.fromTo(model.rotation,
          { y: model.rotation.y },
          { y: model.rotation.y + Math.PI*2, duration: 0.75, ease: "power2.out",
            onComplete: () => resumeIdle(i) // возобновляем idle после анимации
          }
        );

      }
    });
  });
}

// 🔹 Swiper
const swiper = new Swiper('.threeSlider', {
  modules: [Pagination, Navigation, EffectFade],
  effect: 'fade',
  loop: false,
  speed: 800,
  autoHeight: true,
  pagination: {
    el: "#services .swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: "#services .swiper-button-next",
    prevEl: "#services .swiper-button-prev",
  },
  on: {
    init: function() {
      updateCurrentSlide(this);
      const index = this.realIndex;
      showModel(index);
      // showImage(index);
    },
    slideChange: function() {
      updateCurrentSlide(this);
      const index = this.realIndex;
      showModel(index);
      // showImage(index);
    }
  },
});

function updateCurrentSlide(swiper) {
  const current = swiper.realIndex + 1; // Номер активного слайда
  const formatted = current.toString().padStart(2, '0');
  document.querySelector('#services .current_slide').textContent = `(${formatted})`;
}

const total = swiper.slides.length;
document.querySelector('#services .total').textContent = `(${total.toString().padStart(2, '0')})`;

// 🔹 Рендер
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// 🔹 Инициализация
loadAllModels().then(() => {
  const firstIndex = swiper.realIndex;
  showModel(firstIndex);
});
