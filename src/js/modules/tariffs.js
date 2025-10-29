const fromSelect = document.getElementById('fromSelect');
const toSelects = document.querySelectorAll('#tariffs .routes__selects-group .routes__select');
const tables = document.querySelectorAll('#tariffs .table');

let currentFrom = document.querySelector('#fromSelect').value;
let currentTo = document.querySelector('.routes__selects-group select option:checked').value;

showTable(currentFrom, currentTo);

// показываем нужный селект "куда"
fromSelect.addEventListener('change', e => {
  currentFrom = e.target.value;

  // скрываем все селекты "куда"
  toSelects.forEach(select => {
    select.classList.remove('active');
    select.value = '';
  });

  // показываем нужный
  if (currentFrom) {
    const target = document.getElementById(currentFrom);
    if (target) {
      target.classList.add('active');
      target.querySelector('select').selectedIndex = 0;

      showTable(currentFrom, target.querySelector('select').value);
    }
  }

  hideAllTables();
});

// выбираем "куда"
toSelects.forEach(select => {
  select.addEventListener('change', e => {
    currentTo = e.target.value;
    showTable(currentFrom, currentTo);
  });
});

function hideAllTables() {
  tables.forEach(table => table.classList.remove('active'));
}

function showTable(from, to) {
  hideAllTables();
  if (from && to) {
    const tableId = `${from}_${to}`;
    const table = document.getElementById(tableId);

    if (table) table.classList.add('active');
  }
}
