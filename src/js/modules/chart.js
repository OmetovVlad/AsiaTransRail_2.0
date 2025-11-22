import Chart from 'chart.js/auto';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

const ctx = document.querySelector('#aboutCompany #chart');
const legendContainer = document.getElementById('chartLegend');

const remToPx = rem => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

const data = [40, 30, 30];
const labels = ['Мультимодальные/контейнерные', 'Авиа', 'Авто'];
const colors = ['#E9492C', '#3B82F6', '#14B8A6'];
const total = data.reduce((a, b) => a + b, 0);

// 🔹 легенда создаётся сразу
legendContainer.innerHTML = labels
  .map((label, i) => {
    const percent = ((data[i] / total) * 100).toFixed(0);
    return `
      <div class="label" style="color:${colors[i]};">
        <div class="dot" style="background-color:${colors[i]};"></div>
        <span class="name">${label}</span>
        <span class="percent">${percent}%</span>
      </div>
    `;
  })
  .join('');

// 🔹 анимация только канваса
let chartInstance = null;

function createChart() {
  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderColor: '#4C5866',
          borderWidth: remToPx(0.1428571428571429),
        },
      ],
    },
    options: {
      rotation: 20,
      cutout: '70%',
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1500,
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    },
  });
}

// 🔹 создаём диаграмму только при скролле
ScrollTrigger.create({
  trigger: '#aboutCompany',
  start: 'top top',
  once: true,
  onEnter: () => {
    gsap.from(ctx, { opacity: 0, scale: 0.8, duration: 0.6, ease: 'power2.out' });
    createChart();
  },
});
