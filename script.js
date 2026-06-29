const display = document.getElementById("display");

let expression = "";
let justCalculated = false;
let locked = false;

// ✅ evitar doble tap zoom iOS
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

  if (locked && value !== "=") return;

  if (value === "AC") {
    expression = "";
    update("0");
    justCalculated = false;
    return;
  }

  if (value === "C") {

    if (!expression) return;

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

    }, 10000);

    return;
  }

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

function update(value) {
  display.innerText = value || "0";
  display.scrollLeft = display.scrollWidth;
}

function evalSafe(expr) {
  return eval(
    expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
  );
}
