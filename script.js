class Calculator {
  constructor(currentOperandElement, receivedOperandElement) {
    this.currentOperandElement = currentOperandElement;
    this.receivedOperandElement = receivedOperandElement;
    this.accuracy = 10;
    this.priorityOperations = ["^", "*", "/", "+", "-"];
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.receivedOperand = "";
    this.arrayMathElements = "";
    this.readinessClear = false;
    this.readinessRoot = false;
    this.updateDisplay();
  }

  delete() {
    if (this.currentOperand != "") {
      if (this.currentOperand.slice(-1) == this.arrayMathElements.slice(-1)) {
        this.arrayMathElements = this.arrayMathElements.slice(0, -1);
      }
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
  }

  appendNumbers(number) {
    if (this.readinessClear) {
      this.clear();
    }
    this.currentOperand += number.toString();
    if (this.currentOperand.length > 1) {
      let a = this.currentOperand
        .split(/[^0-9.]/)
        .slice(-1)
        .toString();
      if (a.length > 1 && a[0] == "0" && a.indexOf(".") == -1) {
        this.currentOperand = this.currentOperand.slice(0, -2) + this.currentOperand.slice(-1);
      }
    }
  }

  appendOperations(operation) {
    if (this.readinessClear) {
      this.receivedOperand = "";
      this.arrayMathElements = "";
      this.readinessClear = false;
    }
    if (this.currentOperand == "") {
      this.currentOperand = "0";
    }
    if (this.currentOperand.slice(-1) == ".") {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
    if (this.currentOperand.slice(-1) == "-" && this.arrayMathElements.indexOf(this.currentOperand.slice(-2, -1)) != -1) {
      this.currentOperand = this.currentOperand.slice(0, -2) + operation;
      this.arrayMathElements = this.arrayMathElements.slice(0, -1) + operation;
    } else {
      if (this.arrayMathElements.indexOf(this.currentOperand.slice(-1)) == -1) {
        this.currentOperand += operation.toString();
        this.arrayMathElements += operation.toString();
      } else {
        this.currentOperand = this.currentOperand.slice(0, -1) + operation;
        this.arrayMathElements = this.arrayMathElements.slice(0, -1) + operation;
      }
    }
  }

  appendMinus() {
    if (this.readinessClear) {
      this.receivedOperand = "";
      this.arrayMathElements = "";
      this.readinessClear = false;
    }
    if (this.currentOperand.slice(-1) == ".") {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
    if (this.currentOperand.slice(-1) == "-" && !Number.isInteger(+this.currentOperand.slice(-2, -1))) {
      this.currentOperand = this.currentOperand.slice(0, -1);
    } else if (this.arrayMathElements.indexOf(this.currentOperand.slice(-1)) == -1) {
      this.currentOperand += "-";
      this.arrayMathElements += "-";
    } else {
      this.currentOperand += "-";
    }
  }

  appendDot() {
    if (
      this.currentOperand
        .split(/[^0-9.]/)
        .slice(-1)
        .toString()
        .indexOf(".") == -1
    ) {
      if (
        this.currentOperand.toString != "" &&
        this.arrayMathElements.indexOf(this.currentOperand.slice(-1)) == -1 &&
        this.currentOperand.slice(-1) != "-"
      ) {
        this.currentOperand += ".";
      } else {
        this.currentOperand += "0.";
      }
    }
  }

  appendPow() {
    if (this.readinessClear) {
      this.receivedOperand = "";
      this.arrayMathElements = "";
      this.readinessClear = false;
    }
    if (this.currentOperand.slice(-1) == ".") {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
    if (this.currentOperand == "") {
      this.currentOperand = "0";
    }
    if (this.currentOperand.slice(-1) == "-" && this.arrayMathElements.indexOf(this.currentOperand.slice(-2, -1)) != -1) {
      this.currentOperand = this.currentOperand.slice(0, -2) + "^";
      this.arrayMathElements = this.arrayMathElements.slice(0, -1) + "^";
    } else {
      if (this.arrayMathElements.indexOf(this.currentOperand.slice(-1)) == -1) {
        this.currentOperand += "^";
        this.arrayMathElements += "^";
      } else {
        this.currentOperand = this.currentOperand.slice(0, -1) + "^";
        this.arrayMathElements = this.arrayMathElements.slice(0, -1) + "^";
      }
    }
  }

  appendSquareRoot() {
    if (!Number.isInteger(+this.currentOperand.slice(-1)) && this.currentOperand != "") {
      this.currentOperand = this.currentOperand.slice(0, -1);
      this.arrayMathElements = this.arrayMathElements.slice(0, -1);
    }
    this.readinessClear = true;
    this.readinessRoot = true;
    this.equally();
  }

  updateDisplay() {
    if (typeof +this.receivedOperand == "number" && this.receivedOperand != "Infinity" && this.receivedOperand != "NaN") {
      this.lineBreak();
      this.currentOperandElement.innerText = this.currentOperand;
      this.receivedOperandElement.innerText = this.receivedOperand;
      if (this.receivedOperand != "") {
        this.currentOperand = this.receivedOperand;
        this.receivedOperand = "";
        this.arrayMathElements = "";
      }
      this.readinessRoot = false;
    } else {
      if (this.readinessRoot) {
        this.receivedOperandElement.innerText = "Root of a negative number, Caaarl!?";
        this.readinessRoot = false;
        this.readinessClear = true;
      } else {
        this.receivedOperandElement.innerText = this.receivedOperand + ", You Shall Not Pass!";
      }
      this.currentOperand = "";
      this.arrayMathElements = "";
      this.currentOperandElement.innerText = "";
    }
    this.removingSpaces();
  }

  equally() {
    if (!Number.isInteger(+this.currentOperand.slice(-1)) && this.currentOperand != "") {
      this.currentOperand = this.currentOperand.slice(0, -1);
      this.arrayMathElements = this.arrayMathElements.slice(0, -1);
    }
    if (this.arrayMathElements.length != 0) {
      let equallySolution = this.selectOfNegative(this.currentOperand.split(/[^0-9.]/));
      this.receivedOperand = this.determOfOrder(equallySolution, this.arrayMathElements.split(""));
    } else {
      this.receivedOperand = this.currentOperand;
    }
    if (this.readinessRoot) {
      this.receivedOperand = this.trimmingZeros(Math.pow(this.receivedOperand, 0.5).toFixed(this.accuracy));
      this.currentOperand = "";
    }
    this.updateDisplay();
  }

  selectOfNegative(array) {
    while (array.indexOf("") != -1) {
      array.splice(array.indexOf(""), 2, -array[array.indexOf("") + 1]);
    }
    return array;
  }

  determOfOrder(arrayOfNumbers, arrayOfOperations) {
    let result = 0;
    for (let i = 0; i < this.priorityOperations.length; i++) {
      while (arrayOfOperations.indexOf(this.priorityOperations[i]) != -1) {
        let j = arrayOfOperations.indexOf(this.priorityOperations[i]);
        result = this.operationSelection(this.priorityOperations[i], arrayOfNumbers[j], arrayOfNumbers[j + 1]);
        arrayOfNumbers.splice(j, 2, result);
        arrayOfOperations.splice(j, 1);
      }
    }
    this.readinessClear = true;
    return result;
  }

  operationSelection(operation, num1, num2) {
    let result = 0;
    switch (operation) {
      case "^":
        result = Math.pow(+num1, +num2);
        break;
      case "*":
        result = +num1 * +num2;
        break;
      case "/":
        result = +num1 / +num2;
        break;
      case "+":
        result = +num1 + +num2;
        break;
      case "-":
        result = +num1 - +num2;
        break;
    }
    return this.trimmingZeros(result.toFixed(this.accuracy).toString());
  }

  trimmingZeros(number) {
    while (number.slice(-1) == "0" || number.slice(-1) == ".") {
      if (number.slice(-1) == ".") {
        number = number.slice(0, -1);
        break;
      } else {
        number = number.slice(0, -1);
      }
    }
    return number;
  }

  lineBreak() {
    let index = this.getIndexBreak(this.currentOperand);
    if (index && this.currentOperand.indexOf(" ") == -1) {
      this.currentOperand =
        this.currentOperand.slice(0, index) + " " + this.currentOperand.slice(index, this.currentOperand.length);
    }
  }

  getIndexBreak(string) {
    let length = 0;
    for (let i = 0; i < string.length; i++) {
      if (string[i] == "1" || string[i] == ".") {
        length += 11.6;
      } else if (string[i] == "4") {
        length += 21.3;
      } else if (string[i] == "3" || string[i] == "9") {
        length += 18.7;
      } else if (string[i] == "5" || string[i] == "6" || string[i] == "8") {
        length += 18.5;
      } else {
        length += 17.5;
      }
      if (length > 278) {
        return i;
      }
    }
    return 0;
  }

  removingSpaces() {
    while (this.currentOperand.indexOf(" ") != -1) {
      this.currentOperand = this.currentOperand.replace(" ", "");
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const dotButton = document.querySelector("[data-dot]");
const minusButton = document.querySelector("[data-minus]");
const squareRootButton = document.querySelector("[data-square-root]");
const powButton = document.querySelector("[data-pow]");
const currentOperandElement = document.querySelector("[data-current-operand]");
const receivedOperandElement = document.querySelector("[data-previous-operand]");

const calculator = new Calculator(currentOperandElement, receivedOperandElement);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumbers(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendOperations(button.innerText);
    calculator.updateDisplay();
  });
});

dotButton.addEventListener("click", (button) => {
  calculator.appendDot();
  calculator.updateDisplay();
});

minusButton.addEventListener("click", (button) => {
  calculator.appendMinus();
  calculator.updateDisplay();
});

powButton.addEventListener("click", (button) => {
  calculator.appendPow();
  calculator.updateDisplay();
});

squareRootButton.addEventListener("click", (button) => {
  calculator.appendSquareRoot();
});

equalsButton.addEventListener("click", (button) => {
  calculator.equally();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
