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

  // Цифры
  if (!action) {
    if (displayedNum === '0' || waitingForSecond) {
      display.textContent = keyContent;
      waitingForSecond = false;
    } else {
      display.textContent = displayedNum + keyContent;
    }
    return;
  }

  // Точка
  if (action === 'decimal') {
    if (!displayedNum.includes('.')) display.textContent = displayedNum + '.';
    return;
  }

  // Операторы + - * /
  if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
    firstValue = displayedNum;
    operator = action;
    waitingForSecond = true;
    return;
  }

  // Равно
  if (action === 'calculate') {
    if (firstValue && operator) {
      display.textContent = calculate(firstValue, operator, displayedNum);
      firstValue = '';
      operator = '';
      waitingForSecond = true;
    }
    return;
  }

  // Очистка
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