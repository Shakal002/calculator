const display = document.querySelector('.calculator__display');
const keys = document.querySelector('.calculator__keys');

let firstValue = '';
let operator = '';
let waitingForSecond = false;

keys.addEventListener('click', e => {
  if (!e.target.matches('button')) return;
  const key = e.target;
  const action = key.dataset.action;
  const keyContent = key.textContent;
  const displayedNum = display.textContent;

  if (!action) {
    if (displayedNum === '0' || waitingForSecond) {
      display.textContent = keyContent;
      waitingForSecond = false;
    } else {
      display.textContent = displayedNum + keyContent;
    }
    return;
  }

  if (action === 'decimal') {
    if (!displayedNum.includes('.')) display.textContent = displayedNum + '.';
    return;
  }

  if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
    firstValue = displayedNum;
    operator = action;
    waitingForSecond = true;
    return;
  }

  if (action === 'calculate') {
    if (firstValue && operator) {
      const result = calculate(firstValue, operator, displayedNum);
      display.textContent = result;
      saveToHistory(firstValue, operator, displayedNum, result);
      firstValue = '';
      operator = '';
      waitingForSecond = true;
    }
    return;
  }

  if (action === 'clear') {
    display.textContent = '0';
    firstValue = '';
    operator = '';
    waitingForSecond = false;
  }
});

function calculate(n1, operator, n2) {
  const a = parseFloat(n1);
  const b = parseFloat(n2);
  if (operator === 'add') return a + b;
  if (operator === 'subtract') return a - b;
  if (operator === 'multiply') return a * b;
  if (operator === 'divide') return b === 0 ? 'Ошибка' : a / b;
}

// ===== «База данных»: localStorage =====
const DB_KEY = 'calc_history';

function saveToHistory(a, op, b, result) {
  const history = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
  history.unshift({
    id: Date.now(),
    a: a,
    operator: op,
    b: b,
    result: String(result),
    createdAt: new Date().toISOString()
  });
  localStorage.setItem(DB_KEY, JSON.stringify(history.slice(0, 50)));
}