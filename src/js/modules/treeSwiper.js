import { EffectFade, Navigation, Pagination } from "swiper/modules";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap';
import Swiper from 'swiper';

const remToPx = rem => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
const canvasSize = remToPx(30.85714285714286);

// 🔹 Canvas и сцена
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, canvasSize / canvasSize, 0.1, 100);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(canvasSize, canvasSize);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.sortObjects = true;
camera.aspect = 1;
camera.updateProjectionMatrix();

// 🔹 Освещение
scene.add(new THREE.AmbientLight(0xffffff, 1));
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 🔹 Прелоадер
// Добавь в HTML:
// <div id="loader"><div id="progress">0%</div></div>
const loaderDiv = document.getElementById("loader");
const progressText = document.getElementById("progress");

// 🔹 Loading Manager
const manager = new THREE.LoadingManager();
manager.onProgress = (url, itemsLoaded, itemsTotal) => {
  const progress = Math.round((itemsLoaded / itemsTotal) * 100);
  progressText.textContent = `${progress}%`;
};
manager.onLoad = () => {
  gsap.to(loaderDiv, { opacity: 0, duration: 0.5, onComplete: () => loaderDiv.remove() });
};

// 🔹 GLTF Loader с менеджером
const loader = new GLTFLoader(manager);

// 🔹 Хранилище моделей
const models = {};
const idleTweens = {};

// 🔹 Idle-анимация
function startIdleAnimation(model, index) {
  idleTweens[index] = gsap.to(model.rotation, {
    y: "+=0.6",
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(model.position, {
    y: "+=0.05",
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}
function pauseIdle(index) { if (idleTweens[index]) idleTweens[index].pause(); }
function resumeIdle(index) { if (idleTweens[index]) idleTweens[index].resume(); }
function stopIdleAnimation(index) { if (idleTweens[index]) idleTweens[index].kill(); }

// 🔹 Загрузка одной модели
function loadModel(path) {
  return new Promise(resolve => {
    loader.load(path, gltf => {
      const model = gltf.scene;
      model.traverse(child => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 0;
          child.material.depthWrite = false;
        }
      });
      resolve(model);
    });
  });
}

// 🔹 Загрузка всех моделей
async function loadAllModels() {
  const slides = document.querySelectorAll('.threeSlider .swiper-slide');
  for (let i = 0; i < slides.length; i++) {
    const path = slides[i].dataset.model;
    const model = await loadModel(path);

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    // Индивидуальные настройки
    const scaleMap = [1.5, 0.8, 1.5, 1.5, 1.2, 1.5];
    model.scale.setScalar(scaleMap[i] || 1.2);
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
    pauseIdle(i);
    model.traverse(child => {
      if (child.isMesh) {
        if (i === index) {
          gsap.to(child.material, { opacity: 1, duration: 0.75, ease: "power2.out" });
          child.material.depthWrite = true;
        } else {
          gsap.to(child.material, { opacity: 0, duration: 0.75, ease: "power2.out" });
          child.material.depthWrite = false;
        }
        gsap.fromTo(model.rotation,
          { y: model.rotation.y },
          { y: model.rotation.y + Math.PI * 2, duration: 0.75, ease: "power2.out",
            onComplete: () => resumeIdle(i)
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
    init() {
      updateCurrentSlide(this);
      showModel(this.realIndex);
    },
    slideChange() {
      updateCurrentSlide(this);
      showModel(this.realIndex);
    }
  },
});

function updateCurrentSlide(swiper) {
  const current = swiper.realIndex + 1;
  document.querySelector('#services .current_slide').textContent = `(${current.toString().padStart(2, '0')})`;
}
document.querySelector('#services .total').textContent =
  `(${swiper.slides.length.toString().padStart(2, '0')})`;

// 🔹 Рендер
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// 🔹 Инициализация
loadAllModels().then(() => {
  showModel(swiper.realIndex);
});
