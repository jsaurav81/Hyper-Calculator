class Calculator {
  constructor(dataPreviousOperand, dataCurrentOperand) {
    this.dataPreviousOperand = dataPreviousOperand;
    this.dataCurrentOperand = dataCurrentOperand;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let result;
    const current = parseFloat(this.currentOperand);
    const previous = parseFloat(this.previousOperand);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        result = current + previous;
        break;
      case "-":
        result = previous - current;
        break;
      case "*":
        result = previous * current;
        break;
      case "÷":
        result = previous / current;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }
  formatNumber(num) {}
  updateDisplay() {
    console.log("In update me");
    this.dataCurrentOperand.innerText = formatNumber(this.currentOperand);
    if (this.operation !== undefined) {
      this.dataPreviousOperand.innerText = `${formatNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else
      this.dataPreviousOperand.innerText = formatNumber(this.previousOperand);
  }
}
const dataNumber = document.querySelectorAll("[data-number]");
const dataOperation = document.querySelectorAll("[data-operation]");
const dataEquals = document.querySelector("[data-equals]");
const dataAllClear = document.querySelector("[data-all-clear]");
const dataDelete = document.querySelector("[data-delete]");
const dataPreviousOperand = document.querySelector("[data-previous-operand]");
const dataCurrentOperand = document.querySelector("[data-current-operand]");

const calculator = new Calculator(dataPreviousOperand, dataCurrentOperand);

dataNumber.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

dataOperation.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

dataEquals.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

dataAllClear.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

dataDelete.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
