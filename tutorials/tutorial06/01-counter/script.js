// The current count (start at 0).
let count = 0;


// The counter display element (#counter).
const counterEl = document.querySelector('#counter');
// The increment button (#incrementBtn).
const incBtn = document.querySelector('#incrementBtn');
// The decrement button (#decrementBtn).
const decBtn = document.querySelector('#decrementBtn');
// The reset button (#resetBtn).
const resetBtn = document.querySelector('#resetBtn');

console.log(counterEl, incBtn, decBtn, resetBtn);




function increment() {
  count = count + 1;
  updateDisplay();
}

function decrement() {
  count = count - 1;
  updateDisplay();
}

function reset() {
  count = 0;
  updateDisplay();
}

function updateDisplay() {
  counterEl.textContent = count;

  if (count > 0) {
    counterEl.style.color = '#4CAF50';
  } else if (count < 0) {
    counterEl.style.color = '#f44336';
  } else {
    counterEl.style.color = '#666';
  }
}




incBtn.addEventListener('click', increment);
decBtn.addEventListener('click', decrement);
resetBtn.addEventListener('click', reset);

updateDisplay();