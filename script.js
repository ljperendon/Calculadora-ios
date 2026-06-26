
let display = document.getElementById("display");

let expression = "";
let justCalculated = false;

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.innerText));
});

function handleInput(value) {

  // ✅ NÚMEROS
  if (!isNaN(value) || value === ".") {

    if (justCalculated) {
      expression = value;
      justCalculated = false;
    } else {
      expression += value;
    }

    update();
  }

  // ✅ RESET
  else if (value === "AC") {
    expression = "";
    justCalculated = false;
    update("0");
  }

  // ✅ IGUAL
  else if (value === "=") {

    try {
      let result = eval(
        expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-")
      );

      expression = result.toString();
      justCalculated = true;

      update(expression);

    } catch {
      update("Error");
    }
  }

  // ✅ OPERADORES
  else {

    if (expression === "") return;

    // evitar operadores duplicados
    let lastChar = expression.trim().slice(-1);
    if (["+", "−", "×", "÷"].includes(lastChar)) {
      expression = expression.slice(0, -1) + value;
    } else {
      expression += value;
    }

    justCalculated = false;

    update();
  }
}

function update(value) {
  display.innerText = value || expression || "0";
}
