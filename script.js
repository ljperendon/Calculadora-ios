
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

  // ✅ AC (reset total)
  else if (value === "AC") {
    expression = "";
    justCalculated = false;
    update("0");
  }

  // ✅ IGUAL
  else if (value === "=") {

    if (expression === "") return;

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
      expression = "";
    }
  }

  // ✅ OPERADORES
  else {

    if (expression === "") return;

    let lastChar = expression.slice(-1);

    // si el último ya es operador → reemplaza
    if (["+", "−", "×", "÷"].includes(lastChar)) {
      expression = expression.slice(0, -1) + value;
    } else {
      expression += value;
    }

    justCalculated = false;

    update();
  }
}

// ✅ ACTUALIZAR DISPLAY SIN BUG
function update(value) {
  if (value !== undefined) {
    display.innerText = value;
  } else if (expression !== "") {
    display.innerText = expression;
  } else {
    display.innerText = "0";
  }
}
