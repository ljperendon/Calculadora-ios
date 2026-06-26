
const display = document.getElementById("display");

let expression = "";
let justCalculated = false;

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => handle(btn.innerText));
});

function handle(value) {

  // ✅ BORRAR (⌫)
  if (value === "⌫") {
    if (expression.length > 0) {
      expression = expression.slice(0, -1);
      update(expression);
    } else {
      update("0");
    }
    return;
  }

  // ✅ RESET TOTAL (AC)
  if (value === "AC") {
    expression = "";
    justCalculated = false;
    update("0");
    return;
  }

  // ✅ NÚMEROS
  if (!isNaN(value) || value === ".") {
    if (justCalculated) {
      expression = value;
      justCalculated = false;
    } else {
      expression += value;
    }
    update(expression);
    return;
  }

  // ✅ +/-
  if (value === "+/-") {
    if (expression) {
      expression = (-evalSafe(expression)).toString();
      update(expression);
    }
    return;
  }

  // ✅ %
  if (value === "%") {
    if (expression) {
      expression = (evalSafe(expression) / 100).toString();
      update(expression);
    }
    return;
  }

  // ✅ IGUAL
  if (value === "=") {
    if (!expression) return;

    try {
      let result = evalSafe(expression);
      expression = result.toString();
      justCalculated = true;
      update(expression);
    } catch {
      update("Error");
      expression = "";
    }
    return;
  }

  // ✅ OPERADORES
  if (["+", "−", "×", "÷"].includes(value)) {
    if (!expression) return;

    let last = expression.slice(-1);

    if (["+", "−", "×", "÷"].includes(last)) {
      expression = expression.slice(0, -1);
    }

    expression += value;
    justCalculated = false;

    update(expression);
    return;
  }
}

// ✅ FUNCIÓN SEGURA
function evalSafe(expr) {
  return eval(
    expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
  );
}

function update(value) {
  display.innerText = value !== undefined ? value : (expression || "0");
}
``
