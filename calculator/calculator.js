const calculator = document.querySelector("#calculator");
const display = document.querySelector('.display');
const buttons = calculator.querySelectorAll("button");
let currentValue = '0';
let operator = '';
let prevValue = '';

const updateDisplay = () => {
  display.innerText = currentValue;
};

const handleNumberClick = (value) => {
  if (currentValue === '0' || currentValue === '-0') {
    currentValue = value;
  } else {
    currentValue += value;
  }
  updateDisplay();
};

const handleOperatorClick = (value) => {
  if (value === 'clear') {
    currentValue = '0';
    operator = '';
    prevValue = '';
  } else if (value === 'backspace') {
    currentValue = currentValue.slice(0, -1) || '0';
  } else if (value === '+/-') {
    currentValue = (parseFloat(currentValue) * -1).toString();
  } else if (value === '=') {
    currentValue = calculate();
    operator = '';
    prevValue = '';
  } else {
    if (operator && prevValue) {
      currentValue = calculate();
      prevValue = currentValue;
    } else {
      prevValue = currentValue;
    }
    operator = value;
    currentValue = '0';
  }
  updateDisplay();
};

const calculate = () => {
  const num1 = parseFloat(prevValue);
  const num2 = parseFloat(currentValue);
  switch (operator) {
    case '+':
      return (num1 + num2).toString();
    case '-':
      return (num1 - num2).toString();
    case '*':
      return (num1 * num2).toString();
    case '/':
      return num2 !== 0 ? (num1 / num2).toString() : 'Error';
    case '%':
      return (num1 % num2).toString();
    default:
      return currentValue;
  }
};

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.value;
    if (!isNaN(value) || value === '.') {
      handleNumberClick(value);
    } else {
      handleOperatorClick(value);
    }
  });
});
  