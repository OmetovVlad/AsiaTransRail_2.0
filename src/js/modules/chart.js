import Chart from 'chart.js/auto';

const ctx = document.querySelector('#aboutCompany #chart');

const remToPx = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

const myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Мультимодальные/контейнерные', 'Авиа', 'Авто'],
    datasets: [
      {
        label: 'Проекты',
        data: [40, 30, 30],
        backgroundColor: [
          '#E9492C',
          '#3B82F6',
          '#14B8A6',
        ],
        borderColor: '#4C5866',
        borderWidth: remToPx(0.1428571428571429),
      },
    ],
  },
  options: {
    rotation: 20,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
        labels: {
          generateLabels: (chart) =>
            chart.data.labels.map((label, i) => ({
              text: label,
              fillStyle: chart.data.datasets[0].backgroundColor[i],
            })),
        },
      },
      tooltip: { enabled: false },
    },
  }
});

// 👉 Генерация легенды вручную
const legendContainer = document.getElementById('chartLegend');
const labels = myChart.data.labels;
const data = myChart.data.datasets[0].data;
const colors = myChart.data.datasets[0].backgroundColor;

const total = data.reduce((a, b) => a + b, 0);

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