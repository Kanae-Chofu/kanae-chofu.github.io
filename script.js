document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    const taxRate = 0.1; // 税率10%
  
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        handleInput(button.textContent);
      });
    });
  
    document.addEventListener("keydown", (event) => {
      if (event.key >= 0 && event.key <= 9) {
        handleInput(event.key);
      } else if (event.key === "Backspace") {
        handleInput("←");
      } else if (event.key === "Enter" || event.key === "=") {
        handleInput("=");
      } else if (event.key === "Escape") {
        handleInput("C");
      } else if (event.key === "+" || event.key === "-" || event.key === "×" || event.key === "/" || event.key === "^") {
        handleInput(event.key);
      } else if (event.key === ".") {
        handleInput(".");
      }
    });
  
    function handleInput(input) {
      if (input === "C") {
        display.value = "";
      } else if (input === "←") {
        display.value = display.value.slice(0, -1);
      } else if (input === "=") {
        try {
          display.value = evaluateExpression(display.value);
        } catch {
          display.value = "Error";
        }
      } else if (input === "税込") {
        try {
          display.value = (parseFloat(display.value) * (1 + taxRate)).toFixed(2);
        } catch {
          display.value = "Error";
        }
      } else if (input === "税抜") {
        try {
          display.value = (parseFloat(display.value) / (1 + taxRate)).toFixed(2);
        } catch {
          display.value = "Error";
        }
      } else {
        display.value += input;
      }
    }
  
    function evaluateExpression(expression) {
      expression = expression.replace(/\×/g, "*"); // ×を*に変換
      expression = expression.replace(/\^/g, "**"); // ^を**に変換
      return eval(expression);
    }
  });
  
  