
let display = document.getElementById("display");
let historyDisplay = document.getElementById("history");

let current = "0";
let previous = null;
let operator = null;
let history = "";
let justCalculated = false;

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.innerText));
});

function handleInput(value) {

  // NÚMEROS
  if (!isNaN(value) || value === ".") {

    if (justCalculated) {
      current = value;
      history = "";
      justCalculated = false;
    } else {
      if (current === "0") {
        current = value;
      } else {
        current += value;
      }
    }

    update();
  }

  // RESET
  else if (value === "AC") {
    current = "0";
    previous = null;
    operator = null;
    history = "";
    justCalculated = false;
    update();
  }

  // IGUAL (comportamiento iPhone)
  else if (value === "=") {
    if (operator !== null) {
      calculate();
    }

    history = ""; // ✅ BORRA historial al terminar
    update();

    operator = null;
    previous = null;
    justCalculated = true;
  }

  // OPERADORES
  else {
    if (operator !== null && !justCalculated) {
      calculate();
    }

    operator = value;
    previous = parseFloat(current);

    history += (history ? " " : "") + current + " " + operator;

    current = "0";
    justCalculated = false;

    update();
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
}

function update() {
  display.innerText = current;
  historyDisplay.innerText = history;
}
