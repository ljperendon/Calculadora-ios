
const display = document.getElementById("display");

let expression = "";
let justCalculated = false;

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => handle(btn.innerText));
});

function handle(value) {

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

  // ✅ RESET TOTAL (AC)
  else if (value === "AC") {
    expression = "";
    justCalculated = false;
    update("0");
  }

  // ✅ BORRAR (⌫)
  else if (value === "⌫") {
    if (expression.length > 0) {
      expression = expression.slice(0, -1);
      update();
    } else {
      update("0");
    }
  }

  // ✅ +/-
  else if (value === "+/-") {
    if (expression) {
      expression = (-eval(expression)).toString();
      update(expression);
    }
  }

  // ✅ %
  else if (value === "%") {
    if (expression) {
      expression = (eval(expression) / 100).toString();
      update(expression);
    }
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

    let last = expression.slice(-1);

    if (["+", "−", "×", "÷"].includes(last)) {
      expression = expression.slice(0, -1);
    }

    expression += value;
    justCalculated = false;

    update();
  }
}

function update(value) {
  display.innerText = value !== undefined ? value : (expression || "0");
}
``
