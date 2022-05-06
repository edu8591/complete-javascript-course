'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-04-15T17:01:17.194Z',
    '2022-04-20T23:36:17.929Z',
    '2022-04-21T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const resetTimer = function () {
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const startLogOutTimer = function () {
  let time = 300;
  const second = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    // on each call print the remaining time to the UI
    labelTimer.textContent = `${min}:${seconds}`;
    // decrease 1 second
    //when time reaches 0 stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get startd';
      containerApp.style.opacity = 0;
    }
    time--;
  };
  // Setting time to 5 minutes
  // call timer every second
  second();
  const timer = setInterval(second, 1000);
  return timer;
};

// experimenting with API
const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   weekday: 'long',
// };
// const locale = navigator.language;
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago.`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
    // const day = String(date.getDate()).padStart(2, 0);
    // const month = String(date.getMonth() + 1).padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
  }
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, currentAccount.locale);
    const options = {
      style: 'currency',
      currency: acc.currency,
    };
    const formattedMovement = formatCur(mov, acc.locale, acc.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date"> ${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
  resetTimer();
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// fake allways logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //current date
    const now = new Date();

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    const day = String(now.getDate()).padStart(2, 0);
    const month = String(now.getMonth() + 1).padStart(2, 0);
    const year = now.getFullYear();
    const hour = String(now.getHours()).padStart(2, 0);
    const minutes = String(now.getMinutes()).padStart(2, 0);

    // labelDate.innerText = `${day}/${month}/${year}, ${hour}:${minutes}`;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // Update UI
    updateUI(currentAccount);
    //reset timer
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // reset timer
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
  //reset timer
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/***************Converting and checking numberss ***************/
/*
// all numbers in JS are floating point number, meaning they decimals

console.log(23 === 23.0);

// base 10 are numbers from 0-9
// Binary is base 2 from 0-1
// there are many numbers that are dificult to represent with binary like fractions
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

// how to convert a string to a number
//conversion
// we can use the Number() method
console.log(typeof Number('23'));
console.log(typeof +'23');

//parsing
console.log(typeof Number.parseInt('30px')); // will get the integer number out of a string, only if the string starts with a number
console.log(Number.parseInt('30px'));
console.log(Number.parseInt('a30px'));

console.log(Number.parseFloat('2.5rem'));
console.log(parseFloat('2.5rem')); // parsefloat and parsein are global functions so they dont need to be called on the number object

// Check if value is NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20x'));
console.log(Number.isNaN(20 / 0));
// isNaN is not the best solution for check if a number is onr not a number because it does not take into account infinity

// Use to check if value is a numerical finite value
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
// the best method to check is a value is a number and not a string is the isFinite()

// use to check is a number is an integer value
console.log(Number.isInteger(2));
console.log(Number.isInteger(2.0));
console.log(Number.isInteger(2.5));
console.log(Number.isInteger('2.432'));
*/

/***************Math and rounding***************/
/*
// the square root is part of the Math object, but we can also do it with the exponential operator
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));
//Math.max will give us the maximum value from a set of numbers, it does type cohercion, so if one of the value is of type string it will convert it to a number, but it will not parse it so if the number is acompanied with a letter it will not work
console.log(Math.max(...[1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(Math.max(...[1, '2', 3, 4, 5, 6, 7, 8, 9]));
console.log(Math.max(...[1, '2a', 3, 4, 5, 6, 7, 8, 9]));

// just like max we have min
console.log(Math.min(...[1, '2', 3, 4, 5, 6, 7, 8, 9]));

console.log(Math.PI);
//calculatee the area of a circle
const radius = 10;
console.log(Math.PI * radius ** 2);

// trunc removes the decimal part
console.log(Math.trunc(Math.random() * 6));
console.log(Math.trunc(2.9));

// Ceil will always round up
console.log(Math.ceil(2.1));

//floor will round down
console.log(Math.floor(2.9));
//all these ronding methods do type cohersion
console.log(Math.floor('2.9'));

//rounding decimals
//toFixed allows us to choose how many decimals and round decimals, but returns a string instead of a number
console.log((2.7).toFixed(2));
console.log((2.7).toFixed(0));
console.log((2.7865).toFixed(2));
*/

/***************Remainder or modulo operator***************/
/*
console.log(5 % 2); // 5 = 2 * 2 + 1(what we sum is the remainder)
console.log(8 % 3); // 8 = 3 * 2 + 2
console.log(10 % 7); // 10 = 7 * 1 + 3

// another usecase for the modulo is to check if numbers are even, if the remainder is 0 it is an even number

console.log(8 % 2);
console.log(10 % 2);
console.log(5 % 2); // not even

const isEven = n => n % 2 === 0;

console.log(isEven(4));
console.log(isEven(5));

const changeRowColor = function () {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 2 !== 0) {
      console.log(row);
      row.style.backgroundColor = 'blue';
    }
  });
};
*/

/***************Numeric Separators***************/
//we can add separators in large numbers to facilitate the reading
// are just underscore between numbert to make it easier to read
/*
const largeDiameter = 287_460_000_000;

const price = 345_99; // with this we might know that the price is in cents and not dollars
console.log(price);
const transferFee = 1_500; // we can easily see that the number is 1,500

const PI = 3.14_15; //the underscore can only be placed between numbers, not at the begining, end, next to a special character like a dor

// when we convert string to number with an underscore it will not convert them

console.log(Number('1234567'));
console.log(Number('123_456'));
*/

/***************Working with BigInt***************/

/*
//BigInt is one of the new primitive datatypes introduced in es2020

// Number are represented internally in 64bits, meaning that there are 64 1 or 0 to represent the number, of these 64 bits only 53 are used to store the number y the remaining to position the decimal point and the sign

// the following is the highest number js can safely use to work
//we use 2 because numbers are represented in binary 1-0 only 2 nmbers 53 because is the ammount of bits used to store the number and -1 because the numbers start at 0
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);

console.log(typeof 98098092343423423480980980948503948039485n);
console.log(typeof BigInt(98098092343423423480980980948503948039485));

// Operations work the same as with normal numbers
console.log(1000n + 1000n);

// but we can't mix BigInt with number

const big = 1000n;
const num = 23;
// console.log(big + num)
console.log(big + BigInt(num));

//but we can use different types for comparisons

console.log(big > num);
console.log(big < num);
console.log(100n == 100); // this will make type coehrsion and compare them
console.log(100n === 100); // this will return false because it will alse compare the type of the values wich are different

console.log(big + ' this is a BigInt'); // will still work with string concatenation

// The Math methods will not work with BigInts
// Math.sqrt(10n)
console.log(10n / 3n); // This operations will cut the decimal part
console.log(10 / 3);
*/

/***************Creating Dates***************/

/*
// There are 4 ways to create a date in js
// first
const now = new Date();
console.log(now);

// second is parsing a date from a date string
const nowv2 = new Date('may 20 2022 11:00:00');
console.log(nowv2);
const christmas = new Date('december 25 2020');
console.log(christmas);
console.log(new Date(account1.movementsDates[0]));

// we can also pass arguments in the following order year, month(0-11 0 being january 11 december), day, hour, minutes, seconds
console.log(new Date(2022, 11, 12, 23, 59, 59));

// we can also pass milliseconds
console.log(new Date(5000)); // it will start counting milliseconds starting from dec 31 1969 at 7pm
//to start 3 days later
console.log(new Date(3 * 24 * 60 * 60 * 1000));

// dates have their own methods

const future = new Date(2030, 11, 8, 15, 10, 59);

console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth()); // remember that this is 0 based
console.log(future.getDate()); // returns the day of the month
console.log(future.getDay()); // returns the day of the week in number also 0 based starting on sunday
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime()); // milliseconds passing since 31 1969 at 7pm
console.log(future.getTime()) // we use this method to convert the date to milliseconds

// there are also setter methods for dates, exactly as the getter

future.setFullYear(1991);
console.log(future);
*/
/*
const first = new Date(account1.movementsDates[0]);
first;

const second = new Date(account1.movementsDates[1]);
second;
const date1 = second - first;

console.log(date1 / (1000 * 60 * 60 * 24));
*/

/***************Formating numbers with the Intl***************/
/*
const num = 3884764.23;
const options = {
  // style:'percent',
  style: 'currency',
  // style: 'unit',
  // unit:'mile-per-hour'
  unit: 'celsius',
  currency: 'USD',
  // useGrouping: false
  // check out mdn documentation to find more options
};
console.log('US:', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany:', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:', new Intl.NumberFormat('ar-sy').format(num));
console.log('Browser:', new Intl.NumberFormat(navigator.language).format(num));
*/

/***************Timers, setTimeOut and setInterval***************/

// setTimeOut to execute some code at some point in the future
setTimeout(() => console.log('here is your pizza'), 5000); // we will call this function after 5 seconds
const ingredients = ['olives', 'ham', 'peperoni'];
const pizza = setTimeout(
  (ing1, ing2) => console.log(`here is your pizza with ${ing1} and ${ing2}.`),
  2000,
  ...ingredients
); // all the arguments passed after the time will be arguments that will pass to the callback
if (ingredients.includes('olives')) clearTimeout(pizza);

// setInterval is used to run code every specified ammount of time
// setInterval(() => {
//   const date = new Date();
//   console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
// }, 1000);
