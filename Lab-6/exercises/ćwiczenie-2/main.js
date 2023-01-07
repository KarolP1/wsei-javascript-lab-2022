let maxCountDigit = 14;
const historyDisplay = document.getElementById("history-display");
const memoryDisplay = document.getElementById("memory-display");
const memoryReadBtn = document.getElementById("memory-read-btn");
const memoryAddBtn = document.getElementById("memory-add-btn");
const memorySubBtn = document.getElementById("memory-sub-btn");
const memoryClearBtn = document.getElementById("memory-clear-btn");
const displayClearBtn = document.getElementById("display-clear-btn");
const digitButtons = document.querySelectorAll(".digit-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const changeSignBtn = document.getElementById("change-sign-btn");
const operatorInput = "operator";
const digitInput = "digit";

const mainDisplay = {
  element: document.getElementById("main-display"),
  clear() {
    this.element.innerText = "0";
  },
  addDigit(digit) {
    if (calculator.lastInput === operatorInput) {
      this.clear();
      if (calculator.operator === "=") {
        calculator.clear();
      }
      calculator.lastInput = digitInput;
    }
    let content = this.element.innerText;
    if (digit === "." && content.includes(".")) {
      return;
    }
    if (content === "0" && digit !== "0" && digit !== ".") {
      content = digit;
      this.element.innerText = content;
      return;
    }
    content += content.length < maxCountDigit ? digit : "";
    this.element.innerText = content;
  },
  removeDigit() {
    this.element.innerText = this.element.innerText.slice(0, -1);
  },
  set(value) {
    let s = value.toString();
    if (s.length > maxCountDigit) {
      s = value.toPrecision(maxCountDigit);
    }
    this.element.innerText = s;
  },
  get() {
    return this.element.innerText;
  },
  changeSign() {
    this.element.innerText = (-Number(this.element.innerText)).toString();
  },
};

const calculator = {
  lastInput: digitInput,
  arg1: null,
  arg2: null,
  operator: null,
  operators: new Map([
    ["+", (a, b) => a + b],
    ["-", (a, b) => a - b],
    ["/", (a, b) => a / b],
    ["*", (a, b) => a * b],
    ["=", (a, b) => a],
  ]),
  clear() {
    this.arg1 = null;
    this.arg2 = null;
    this.operator = null;
  },
  hasOperator() {
    return !!this.operator;
  },
  calc() {
    let result = this.operators.get(this.operator)(this.arg1, this.arg2);
    this.arg1 = result;
    this.arg2 = null;
    this.operator = null;
    return result;
  },
  valid() {
    return (
      this.operators.has(this.operator) &&
      this.arg1 &&
      this.arg2 &&
      !isNaN(this.arg1) &&
      !isNaN(this.arg2)
    );
  },
  setArgument(arg) {
    if (this.arg1 === null) {
      this.arg1 = arg;
      return;
    }
    if (this.arg2 === null) {
      this.arg2 = arg;
      return;
    }
  },
};

const digitBtnListener = (e) => {
  mainDisplay.addDigit(e.target.value);
};
const displayClearBtnListener = (e) => {
  calculator.clear();
  mainDisplay.clear();
};
const operatorBtnLister = (e) => {
  let fun = e.currentTarget.value;
  let val = Number(mainDisplay.get());
  if (calculator.lastInput === operatorInput) {
    calculator.operator = fun;
    return;
  }
  if (calculator.lastInput === digitInput) {
    calculator.setArgument(val);
    if (!calculator.hasOperator()) {
      calculator.operator = fun;
    }
  }
  if (calculator.valid()) {
    let r = calculator.calc();
    mainDisplay.set(r);
    calculator.clear();
    calculator.setArgument(Number(mainDisplay.get()));
    calculator.operator = fun;
  }
  calculator.lastInput = operatorInput;
};
/**
 * Wewnątrz funkcji obsługi zdarzenia `onlodad` umieść
 * powiązanie przycisków kalkulatora dla zdarzenia 'click' z odpowiednimi funkcjami:
 * - do każdgo przycisku z kolekcji digitButtons przypisz funkcję digitBtnListener
 * - do każdego przycisku z kolekcji operatorButtons przypisz funkcję operatorBtnListener
 * - do przycisku displayClearBtn funkcję displayClearBtnListener
 * Samodzielnie dodaj obsługę zdarzeń klawiatury:
 * - klawisze z cyframi powinny uruchamiać identyczne akcje co  przyciski z cyframi
 * - klawisze z operatorami powinny uruchamiać identyczne akcje co przyciski z operatorami
 * - klwwisz z literą C powinien działać tak samo jak przycisk clearDisplayBtn
 * Opis zdarzeń klawiatury: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
 * Uwaga!
 * Nie można zmianiać pliku calculator.html!!!
 */

window.onload = function () {
  digitButtons.forEach((button) => {
    button.addEventListener("click", digitBtnListener);
  });
  operatorButtons.forEach((button) => {
    button.addEventListener("click", operatorBtnLister);
  });
  displayClearBtn.addEventListener("click", displayClearBtnListener);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
      mainDisplay.removeDigit();
    }

    if (e.key >= "0" && e.key <= "9") {
      digitBtnListener({ target: { value: e.key } });
    } else if (calculator.operators.has(e.key)) {
      operatorBtnLister({ currentTarget: { value: e.key } });
    } else if (e.key === "c" || e.key === "C") {
      displayClearBtnListener();
    }
  });
};
