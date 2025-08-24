const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Load saved data from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedValue = localStorage.getItem('calculatorInput');
  if (savedValue !== null) {
    display.value = savedValue;
  }
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('clear')) {
      display.value = '';
    } else if (button.classList.contains('back')) {
      display.value = display.value.slice(0, -1);
    } else if (button.classList.contains('equal')) {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = 'Error';
      }
    } else {
      display.value += value;
    }

    // Save current input after every change (except on error)
    if (display.value !== 'Error') {
      localStorage.setItem('calculatorInput', display.value);
    }
  });
});
