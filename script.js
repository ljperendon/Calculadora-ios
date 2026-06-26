
let display = document.getElementById("display");

let current = "";
let operator = "";
let previous = "";

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.innerText));
});

function handleInput(value) {
  if (!isNaN(value) || value === ".") {
    current += value;
    update();
  } else if (value === "AC") {
    current = "";
    previous = "";
    operator = "";
    update("0");
  } else if (value === "=") {
    calculate();
    update();
  } else {
    operator = value;
    previous = current;
    current = "";
  }
}

function calculate() {
  let result;
  let a = parseFloat(previous);
  let b = parseFloat(current);

  switch (operator) {
    case "+": result = a + b; break;
    case "−": result = a - b; break;
    case "×": result = a * b; break;
    case "÷": result = a / b; break;
  }

  current = result.toString();
}

function update(val = current) {
  display.innerText = val || "0";
}
``
