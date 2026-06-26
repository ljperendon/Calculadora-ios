
const display = document.getElementById("display");

let expression = "";
let justCalculated = false;

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => handle(btn.innerText));
});

function handle(value) {

  // ✅ AC → RESET TOTAL
  if (value === "AC") {
    expression = "";
    justCalculated = false;
    update("0");
    return;
  }

  // ✅ C → OPERACIÓN ESPECIAL
  if (value === "C") {

    if (!expression) return;

    try {
      let result = evalSafe(expression);

      let now = new Date();

      let dd = String(now.getDate()).padStart(2, "0");
      let mm = String(now.getMonth() + 1).padStart(2, "0");
      let yy = String(now.getFullYear()).slice(-2);
      let hh = String(now.getHours()).padStart(2, "0");
      let min = String(now.getMinutes()).padStart(2, "0");

      let fecha = parseInt(dd + mm + yy + hh + min);

      let final = fecha - result;

      let output = expression + " + " + final;

      expression = output;
      justCalculated = true;

      update(output);

    } catch {
      update("Error");
      expression = "";
    }

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

  // ✅ =
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
  }
}

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
