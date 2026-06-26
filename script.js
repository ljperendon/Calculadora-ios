
let display = document.getElementById("display");

let current = "0";
let previous = null;
let operator = null;

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.innerText));
});

function handleInput(value) {
  if (!isNaN(value) || value === ".") {
    if (current === "0") {
      current = value;
    } else {
      current += value;
    }
    update();
  } 
  else if (value === "AC") {
    current = "0";
    previous = null;
    operator = null;
    update();
  } 
  else if (value === "=") {
    calculate();
    update();
    operator = null;
  } 
  else {
    // operador + - × ÷
    if (previous !== null) {
      calculate();
    }
    operator = value;
    previous = parseFloat(current);
    current = "0";
  }
}

function calculate() {
  let a = previous;
  let b = parseFloat(current);
  let result = 0;

  switch (operator) {
    case "+": result = a + b; break;
    case "−": result = a - b; break;
    case "×": result = a * b; break;
    case "÷": result = a / b; break;
  }

  current = result.toString();
  previous = null;
}

function update() {
  display.innerText = current;
}

