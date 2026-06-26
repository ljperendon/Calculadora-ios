const display = document.getElementById("display");

let expression = "";
let justCalculated = false;

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => handle(btn.innerText));
});

function handle(value) {

  // Números
  if (!isNaN(value) || value === ".") {
    if (justCalculated) {
      expression = value;
      justCalculated = false;
    } else {
      expression += value;
    }
    update();
  }

  // AC
  else if (value === "AC") {
    expression = "";
    update("0");
  }

  // Igual
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
      expression = "";
    }
  }

  // Operadores
  else {
    if (expression === "") return;

    let last = expression.slice(-1);

    if (["+", "-", "*", "/"].includes(last)) {
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
