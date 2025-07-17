const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
let currentInput = "";

const toggleThemeBtn = document.getElementById("toggle-theme");
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
})

function addToHistory(expression, result) {
  const history = document.getElementById("history");
  const entry = document.createElement("div")
  entry.textContent = `${expression} = ${result}`;
  history.prepend(entry); //newest on the top
}

function evaluateExpression() {
  try {
    let expression = currentInput.replace(/x/g, "*").replace(/÷/g, "/");
    const lastChar = expression.slice(-1);

    if ("+-*/%".includes(lastChar)) {
      currentInput = currentInput.slice(0, -1);
      alert("Invalid expression.");
      return;
    }

    let result = eval(expression);
    display.value = result;

    addToHistory(currentInput, result)
    
    currentInput = result.toString();
  } catch (e) {
    display.value = "Error";
    currentInput = "";
  }
  return;
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;
    if (value === "=") {
      evaluateExpression();
      return;
    }
    // clear
    if (value === "C" || value === "CE") {
      currentInput = "";
      display.value = "";
      return;
    }
    // backspace
    if (value === "<-") {
      if (typeof currentInput !== "string") {
        currentInput = currentInput.toString();
      }
      if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
      }
      return;
    }
    if (value === ".") {
      const lastNumber = currentInput.split(/[-+*/%]/).pop();
      if (lastNumber.includes(".")) {
        alert("Decimal already used in this number");
        return;
      }
    }
    // input handling
    const lastChar = currentInput.slice(-1);
    if ("+-*/%".includes(lastChar) && "+-*/%".includes(value)) {
      currentInput = currentInput.slice(0, -1);
    }
    currentInput += value;
    display.value = currentInput;
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if ("0123456789+-*/.%".includes(key)) {
    currentInput += key;90
    display.value = currentInput;
  } else if (key === "Enter") {
    evaluateExpression();
  }else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  }
});
