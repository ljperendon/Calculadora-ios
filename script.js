const display = document.getElementById("display");

let expression = "";
let justCalculated = false;
let locked = false;

// ✅ evitar doble tap zoom (lo mantenemos)
let lastTouch = 0;
document.addEventListener("touchend", function (event) {
  const now = new Date().getTime();
  if (now - lastTouch <= 300) {
    event.preventDefault();
  }
  lastTouch = now;
}, false);

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => handle(btn.innerText));
});

function handle(value) {

  // bloqueo invisible
  if (locked && value !== "=") return;

  // AC
  if (value === "AC") {
    expression = "";
    update("0");
    justCalculated = false;
    return;
  }

  // C → función especial
  if (value === "C") {

    if (!expression) return;

    // ✅ muestra + inmediatamente
    expression = expression + "+";
    update(expression);

    locked = true;

    setTimeout(() => {

      try {
        let currentExpression = expression.slice(0, -1);

        let result = evalSafe(currentExpression);

        let now = new Date();

        let dd = String(now.getDate()).padStart(2, "0");
        let mm = String(now.getMonth() + 1).padStart(2, "0");
        let yy = String(now.getFullYear()).slice(-2);
        let hh = String(now.getHours()).padStart(2, "0");
        let min = String(now.getMinutes()).padStart(2, "0");

        let fecha = parseInt(dd + mm + yy + hh + min);

        let final = fecha - result;

        expression = currentExpression + "+" + final;

        update(expression);

      } catch {
        update("Error");
      }

      locked = false;

    }, 5000);

    return;
  }

  // números
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

  // igual
  if (value === "=") {

    if (!expression) return;

    try {
      let result = evalSafe(expression);
      expression = result.toString();
      update(expression);
      justCalculated = true;
    } catch {
      update("Error");
    }

    return;
  }

  // operadores
  if (["+", "−", "×", "÷"].includes(value)) {

    let last = expression.slice(-1);

    if (["+", "−", "×", "÷"].includes(last)) {
      expression = expression.slice(0, -1);
    }

    expression += value;
    update(expression);
  }
}

function update(value) {

  display.innerText = value || "0";

  // ✅ scroll automático
  display.scrollLeft = display.scrollWidth;

  // ✅ 🔥 AJUSTE DINÁMICO DE FUENTE (CORREGIDO)
  let length = display.innerText.length;

  if (length <= 6) {
    display.style.fontSize = "80px";
  } else if (length <= 8) {
    display.style.fontSize = "70px";
  } else if (length <= 10) {
    display.style.fontSize = "60px";
  } else if (length <= 12) {
    display.style.fontSize = "50px";
  } else if (length <= 14) {
    display.style.fontSize = "45px";
  } else {
    display.style.fontSize = "40px";
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
