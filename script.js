
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

  // ✅ BOTÓN C (reset total)
  else if (value === "C") {
    expression = "";
    justCalculated = false;
    update("0");
  }

  // ✅ BOTÓN AC (funcionalidad especial)
  else if (value === "AC") {

    if (expression === "") return;

    try {
      // resultado de operaciones previas
      let result = eval(
        expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-")
      );

      // fecha/hora → DDMMAAAAHHMM
      let now = new Date();

      let dd = String(now.getDate()).padStart(2, "0");
      let mm = String(now.getMonth() + 1).padStart(2, "0");
      let yyyy = now.getFullYear();
      let hh = String(now.getHours()).padStart(2, "0");
      let min = String(now.getMinutes()).padStart(2, "0");

      let fechaNumero = parseInt(dd + mm + yyyy + hh + min);

      // operación final
      let finalResult = fechaNumero - result;

      // mostrar resultado completo
      let output = expression + " + " + finalResult;

      expression = output;
      justCalculated = true;

      update(output);

    } catch {
      update("Error");
      expression = "";
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
