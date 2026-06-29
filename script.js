const display = document.getElementById("display");

let expression = "";
let justCalculated = false;
let locked = false;

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => handle(btn.innerText));
});

function handle(value) {

  // 🔒 BLOQUEO INVISIBLE
  if (locked && value !== "=") return;

  // AC
  if (value === "AC") {
    expression = "";
    update("0");
    justCalculated = false;
    return;
  }

  // C → función con retardo
  if (value === "C") {

    if (!expression) return;

    locked = true;

    setTimeout(() => {

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

        expression = expression + " + " + final;

        update(expression);

      } catch {
        update("Error");
      }

      locked = false;

    }, 10000);

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

  if (["+", "−", "×", "÷"].includes(value)) {

    let last = expression.slice(-1);

    if (["+", "−", "×", "÷"].includes(last)) {
      expression = expression.slice(0, -1);
    }

    expression += value;
    update(expression);
  }
}

// ✅ scroll automático tipo iPhone
function update(value) {

  display.innerText = value || "0";

  // desplazamiento automático hacia la derecha
  display.scrollLeft = display.scrollWidth;

  // ajuste fuente
  let length = display.innerText.length;

  if (length <= 8) display.style.fontSize = "80px";
  else if (length <= 10) display.style.fontSize = "65px";
  else if (length <= 12) display.style.fontSize = "50px";
  else display.style.fontSize = "40px";
}

function evalSafe(expr) {
  return eval(
    expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
  );
}
``
