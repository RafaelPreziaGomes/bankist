"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  name: "Jonas Schedmann",
  owner: "js",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  name: "Jessica Davis",
  owner: "jd",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  name: "Steven Toronto Willians",
  owner: "stw",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  name: "Stuart Smith",
  owner: "ss",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// calculate current balance

function calculateCurrentBalance(acc) {
  // get movements from acc
  var sum = 0;
  for (i = 0; i < acc.movements.length; i++) {
    sum = sum + acc.movements[i];
  }
  return sum;
}

// display current balance

function displayCurrentBalance(balance) {
  document.querySelector(".balance__value").textContent = balance + "€";
}

// calculcate summary

// calculate negative int

var calculateNegativeInt = function (acc) {
  const result = acc.movements.filter((value) => value < 0);
  const initialValue = 0;
  var summedResult = result.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  return summedResult;
};

// calculate interest

function calculateInterest(acc, balance) {
  return acc.interestRate * balance - balance;
}

//  display summary

var displaySummary = function (balance, negativeInt, interest) {
  document.querySelector(".summary__value--interest").textContent =
    interest + "€";

  document.querySelector(".summary__value--out").textContent =
    negativeInt + "€";

  document.querySelector(".summary__value--in").textContent = balance + "€";
};

//  display movemements

function dispalyMovements(movementType, movementDate, movement) {
  // External Division
  var div = document.createElement("div");
  div.setAttribute("class", "movements__row");
  document.querySelector(".movements").appendChild(div);

  // Inner div 1
  var innerDiv1 = document.createElement("div");
  innerDiv1.setAttribute(
    "class",
    "movements__type movements__type--withdrawal"
  );
  innerDiv1.innerHTML = movementType;
  document
    .querySelectorAll(".movements__row")
    [document.querySelectorAll(".movements__row").length - 1].appendChild(
      innerDiv1
    );

  // Inner div 2
  var innerDiv2 = document.createElement("div");
  innerDiv2.setAttribute("class", "movements__date");
  innerDiv2.innerHTML = movementDate;
  document
    .querySelectorAll(".movements__row")
    [document.querySelectorAll(".movements__row").length - 1].appendChild(
      innerDiv2
    );

  // Inner div 3
  var innerDiv3 = document.createElement("div");
  innerDiv3.setAttribute("class", "movements__value");
  innerDiv3.innerHTML = movement;
  document
    .querySelectorAll(".movements__row")
    [document.querySelectorAll(".movements__row").length - 1].appendChild(
      innerDiv3
    );
}

// after the arrow button is pressed

let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  //  get data from input boxes
  let user = document.querySelector(".login__input").value;
  let pin = document.querySelector(".login__input--pin").value;

  console.log(user);
  console.log(pin);

  //  for users in bank

  accounts.forEach(function createAccount(acc = accounts) {
    if (acc.owner == user && acc.pin == pin) {
      labelWelcome.textContent = `Welcome back, ${acc.name}`;

      containerApp.style.opacity = 100;

      inputLoginUsername.value = inputLoginPin.value = "";
      inputLoginPin.blur();

      updateUI(currentAccount);
    }
  });
});
