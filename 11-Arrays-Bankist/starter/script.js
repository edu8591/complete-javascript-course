'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
const displayMovements = function (account, sort = false) {
  const movements = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;
  containerMovements.innerHTML = '';
  movements.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${movement}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accounts) {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const calcPrintbalance = function (account) {
  const balance = account.movements.reduce(
    (accumulator, current) => accumulator + current
  );
  labelBalance.textContent = `$ ${balance}`;
};
const updateUi = function (account) {
  displayMovements(account);
  calculateDisplaySummary(account);
  calcPrintbalance(account);
};
const calculateDisplaySummary = function (account) {
  const deposits = account.movements.filter(mov => mov > 0);
  labelSumIn.textContent = `$ ${deposits.reduce((acc, mov) => acc + mov)}`;

  const withdrawals = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `$ ${Math.abs(withdrawals)}`.padStart(6, ' ');
  const interest = deposits
    .map(mov => mov * (account.interestRate / 100))
    .filter(inter => inter >= 1)
    .reduce((acc, mov) => acc + mov);
  labelSumInterest.textContent = `$ ${Math.abs(interest)}`.padStart(6, ' ');
};

//event handlers
let currentAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );
  const pin = inputLoginPin.value;

  if (currentAccount?.pin == pin) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    updateUi(currentAccount);
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    containerApp.style.opacity = 100;
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const transferTo = accounts.find(
    account =>
      account.username.toLowerCase() ===
      inputTransferTo.value.trim().toLowerCase()
  );
  let balance = currentAccount.movements.reduce((acum, cur) => acum + cur);
  console.log(balance, amount, currentAccount.movements);

  if (
    transferTo &&
    balance >= amount &&
    amount > 0 &&
    currentAccount !== transferTo
  ) {
    currentAccount.movements.push(-amount);
    transferTo.movements.push(amount);
    updateUi(currentAccount);
  } else {
    if (currentAccount === transferTo) {
      alert("Please select an account other than your's");
    } else if (amount === 0) {
      alert('Please input a value higher than 0');
    } else {
      alert('Not enought funds');
    }
  }
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const loan = Number(inputLoanAmount.value);
  if (
    currentAccount.movements.some(deposit => deposit >= loan * 0.1) &&
    loan > 0
  ) {
    currentAccount.movements.push(loan);
    updateUi(currentAccount);
  } else {
    alert('Not subject to that loan');
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  const username = inputCloseUsername.value.toLowerCase();
  const pin = Number(inputClosePin.value);

  if (currentAccount.username === username && pin === currentAccount.pin) {
    // const index = accounts.findIndex(
    //   account => account.username === currentAccount.username
    // );
    const index = accounts.indexOf(currentAccount);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  } else {
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', e => {
  sorted = !sorted;
  e.preventDefault();
  displayMovements(currentAccount, sorted);
});
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = account1.movements.map(mov => mov); //[200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// ******************* Basic array methods *******************
/*
let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
function resetArr() {
  arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
}

//slice method
//is similar than the one from string, we take a slice of the array without modifying the arr, and returns a new array with the extracted parts. the arguments ar index of where to start and index of ending(is exclusive)

console.log(arr.slice(1));
console.log(arr.slice(1, 3));
console.log(arr.slice(-1)); // with a negative value we start from the end of the array
console.log(arr.slice(-2));
console.log(arr.slice(1, -1)); //starts with the second one and copies until the las(exclusive)
console.log(arr.slice()); // making a shallow copy of an array
console.log([...arr]); // making a shallow copy of an array

// splice method
// very similar to slice, but the difference is that it modifies the original array
// it will remove the parts especified by the splice and returns it, the original will loose the selection of splice

console.log(arr.splice(2));
console.log(arr);
resetArr();
console.log(`arr variable was reset`);
console.log(arr.splice(-1)); // remove the last element
console.log(arr);
console.log(arr.splice(1, 2)); // using parameter like this for the splice method will work different than the slice one, it says standing on the first element remove the next 2
console.log(arr);

// reverse
// returns the reversed array and mutates the original array
console.log('Reset the arr avriable');
resetArr();

console.log('Reverse method returns', arr.reverse());
console.log('mutated arr variable', arr);

// concat
//used to concatenate 2 arrays (join 2 arrays), it does not modify the original array
console.log('Reset the arr avriable');
resetArr();

const letters = arr.concat(['i', 'j', 'k']);
console.log(arr); // original array was not modified
console.log(letters);
// we can also use the new operators to do this without the concat method
console.log([...arr, ...['i', 'j', 'k']]);

// Join
// will join all the elements of an array into a string using the desired character separator, it does not modify the original array
console.log(arr.join('-'));
console.log(arr);
*/

// ******************* "At" method *******************
/*
const arr = [1, 24, 53, 12];

// this method is the same as using braquet notation with a more modern looking method
console.log(arr[0]);
console.log(arr.at(0));
// when using the at PaymentMethodChangeEvent, we are able to use -1 to get the last element
console.log(arr.at(-1));
// without the new at method the way to solve this issue was as follows
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
//at method also works with strings
console.log('edo'.at(-1))
*/

// ******************* For each method*******************
/*
console.log(movements);

movements.forEach((element, index, array) => {
  console.log(
    `Movement #${index}: you ${
      element > 0 ? 'withdrew' : 'deposited'
    } ${Math.abs(element)}`
  );
  console.log(index);
  console.log(array);
});

// when shoud we use a for each and a for loop? when we want to break out of a loop at certain point without looping through all of it we should use the for loop, forEach will not allow for breaking out of the loop
*/

// ******************* For each method in sets and maps!!*******************
//using forEach with a map
/*
console.log(currencies);

currencies.forEach(function (value, key, map) {
  console.log(value);
  console.log(key);
  console.log(map);
});

//using forEach with a set
const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'USD', 'EUR', 'GBP']);
console.log(currenciesUnique);

currenciesUnique.forEach((value, key, set) => {
  // key and value are the same because sets do not have keys, it is made so that the kays are the same as value
  console.log(`${key}: ${value}`);
  console.log(set);
});
*/

// *************** Coding Challenge #1 ***************

// Coding Challenge #1

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (julia, kate) {
  const juliaCopy = julia.slice(1, -2);
  const joinedData = [...juliaCopy, ...kate];
  joinedData.forEach((age, i) => {
    console.log(
      `Dog number ${i + 1} is an ${
        age >= 3 ? 'adult' : 'puppy'
      }, and is ${age} years old`
    );
  });
};

checkDogs(dogsJulia, dogsKate);
*/

// *************** The map method***************
/*
const arr = [200, 300, 150, 250, 72]; // this array contain value in ueros!
const eurToUsd = 1.1;

const test = arr.map(value => value + 1);
console.log(test);
const test2 = arr.map(function (value) {
  return value * eurToUsd;
});
console.log(test2);
//doing the same but with a for of loop
const test3 = [];
for (const mov of arr) test3.push(mov * eurToUsd);

console.log(test3);

// the map method has access to 3 parameters( the current index and the whole array)

const test4 = movements.map(
  (movement, i, arr) =>
    `Movement #${i + 1}: You ${
      movement > 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(movement)}`
);
console.log(test4);
*/
// *************** The map method part 2***************
/*
console.log(account1);
const user = account1.owner
  .split(' ')
  .map(name => name[0])
  .join('')
  .toLowerCase();

const createUsernames = function (accounts) {
  accounts.forEach(account => {
    account.userName = account.owner
      .split(' ')
      .map(name => name[0])
      .join('')
      .toLowerCase();
  });
};
createUsernames(accounts);
console.log(account1.userName);
*/

// *************** The Filter Method***************

// the filter method is used to select the elements ni an array that satisfy a certain condition
/*
const arr = movements;

const deposits = arr.filter(current => current > 0);
deposits;

const withdrawals = arr.filter(current => current < 0);

withdrawals;
*/

// *************** The Reduce Method***************
//the reduce method is used to boil down all the elements of an array into a single value
/*
const arr = movements;

console.log(
  arr.reduce(function (accumulator, current, i, arr) {
    console.log(accumulator);
    return accumulator + current;
  }, 0)
);

// The reduce method recieves can recieve 2 parameters, the callback function and a value to set the accumulator to start arr.reduce(callback, startingValue) the second argument can be omited

//maximum number from an array
const maximum = arr.reduce((max, current) => (current > max ? current : max));
maximum;
*/

// *************** Coding Challenge #2 ***************

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = function (dogAges) {
  const ageInHuman = dogAges.map(age => (age > 2 ? 16 + age * 4 : age * 2));
  const olderDogs = ageInHuman.filter(age => age >= 18);
  const average = olderDogs.reduce(
    (acc, curr, i, arr) => acc + curr / arr.length,
    0
  );

  return average;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/

// *************** Method Chaining ***************
/*
const eurToUsd = 1.1;
const depositsInUsd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((accum, current) => accum + current);
console.log(depositsInUsd);
*/

// *************** Coding Challenge #3 ***************
//repeat challege 2 but with method chaining
/*
const calcAverageHumanAge = dogAges =>
  dogAges
    .map(age => (age > 2 ? 16 + age * 4 : age * 2))
    .filter(age => age >= 18)
    .reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/

// *************** The Find Method ***************
/*
const firstWithdrawal = movements.find(element => element < 0);
console.log(firstWithdrawal);
// find returns only the first element that matches the condiftion, and returns the value of said element , while the filter will return a new array with all the elements that matched the condition

console.log(accounts);
const account = accounts.find(
  account => account.owner.toLowerCase() === 'jessica davis'
);
console.log(account);

let example;
for (const account of accounts) {
  if (account.owner.toLowerCase() === 'jessica davis') example = account;
}
example;
*/

// *************** Some and Every methods ***************
/*
console.log(movements);
console.log(movements.includes(200));
console.log(movements.includes(100));
// the includes method checks only for equality, but if we want to look for a condition we should use the some method

// we can check if there are any positive values inside the array
console.log(movements.some(value => value > 0));
// Check if there is any deposit over 5000
console.log(movements.some(value => value > 5000));

// the every method is similar to the some method, but they differ is in that tat the some method to return true at least one of the the elements is evaluated as true, while every need all the elements satisfy the desired condition

console.log(movements.every(mov => mov > 0));
account4; // all elements on this account's movements are positive
console.log(account4.movements.every(mov => mov > 0));
*/

// *************** flat and flatMap methods ***************
/*
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
//converts a array with nested arrays to a singular array
console.log(arr.flat());

const arrDeep = [
  [
    [1, 2],
    [3, 4],
    [5, 6],
  ],
  [
    [
      [7, 8],
      [9, 10],
    ],
  ],
];
// we can pass the flat method how deep we want it to go into the arrays, by default if look for one deeper level
console.log(arrDeep.flat(2));
console.log(arrDeep.flat(3));

const accountsMovements = accounts.map(acc => acc.movements);

console.log(accountsMovements);
//now we have an array that contains arrays with all the movements, to convert to a simple array we should use the flat method
const allMovements = accountsMovements.flat();
console.log(allMovements);

const overallBalance = allMovements.reduce(
  (sum, current, _, arr) => sum + current
);

console.log(overallBalance);

const chainedBalance = accountsMovements
  .flat()
  .reduce((sum, current) => sum + current);

console.log(chainedBalance);

// most of the times we use the flat method is after usingt the map, we should use the flatMap method, this method can only flaten 1 level deep, if its needed to be done deeper it should be done separetely

const usingFlatMap = accounts
  .flatMap(account => account.movements)
  .reduce((sum, current) => sum + current);
console.log(usingFlatMap);
*/

// *************** Sorting arrays ***************
/*
const owners = accounts.flatMap(account => account.owner);
console.log(owners);
// strings
owners.sort();
console.log(owners);
// the sort method WILL modify the original

//with numbers
movements;
console.log(movements);
console.log(movements.sort());
//sort method does the sorting based on strings, it converts everything to string and the sorts them
// in order to sort numbers we must give it a callback, how this callback works is by giving it 2 parameters a and b, which are consecutive numbers in the array, if a-b returns negative b will go first, the value of the substraction does not matter, only that it is possitive or neative
//ascending order
movements.sort((a, b) => a - b);
movements;

//it is the same as writing as follows
movements.sort((a, b) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
});
movements;
//to sort in descending order

movements.sort((a, b) => b - a);
movements;
movements.sort((a, b) => {
  if (a > b) {
    return -1;
  }
  if (a < b) {
    return 1;
  }
});
movements;

*/

// *************** More ways to create and fill arrays ***************
/*
// here we lern how to programatically create and fill arrays
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);

arr = new Array(9); // creating an array like this will create an array with 9 empty elements, we can only call the fill method on this array
console.log(arr);

arr.fill(1);
console.log(arr);

//the fill methos is similar to the slice method the first argument will indicate with which value we want to fill the array, the second starting from which index

arr.fill(3, 3, 5);
arr;

//array.from
let arr2 = Array.from({ length: 7 }, () => 1);

arr2 = Array.from({ length: 9 }, (_, i) => i + 1);
arr2;

const diceRollArr = Array.from({ length: 1000 }, () =>
  Math.ceil(Math.random() * 6)
);
// diceRollArr;

// the Array.from was actually created to generate arrays from other itterables like maps or sets, another array like structure is the retur of the querySelectorAll which does not return an array but comething similar to an array, and to use array methods on it we should convert it to one

labelBalance.addEventListener('click', () => {
  const movementsUI = document.querySelectorAll('.movements__value');
  console.log(movementsUI);
  const movementsArray = Array.from(movementsUI);
  console.log(movementsArray);
  console.log(movementsArray.replace('$', ''));
});
*/

// *************** Array Method Practice ***************
/*
// 1 calculate total deposits in the bank
const allMovements = accounts.flatMap(account => account.movements);

const allDeposits = allMovements.filter(mov => mov > 0);

const bankDepositSum = allDeposits.reduce((acc, cur) => acc + cur, 0);

console.log(bankDepositSum);

// 2 Count how many deposits have been with at least 1000
const numDeposits1000 = allDeposits.filter(mov => mov >= 1000).length;

const numDeposits1000v2 = allDeposits.reduce((acc, cur) => {
  console.log(acc);
  if (cur >= 1000) {
    acc++;
  }
  return acc;
}, 0);

const numDeposits1000v3 = allDeposits.reduce(
  (acc, cur) => (cur > 999 ? acc + 1 : acc),
  0
);
console.log(numDeposits1000);
console.log(numDeposits1000v2);
console.log(numDeposits1000v3);
//no podemos usar el cur++ por que no retorna el valor sumado, pero el numero antes de modificarlo, pero si lo usamos antes del de la variable que queremosmodificar, prefixed++ ++cur va a retornar el numero que se suma
let a = 10;
console.log(a++);
a = 10;
console.log(++a);

const numDeposits1000v4 = allDeposits.reduce(
  (acc, cur) => (cur > 999 ? ++acc : acc),
  0
);
console.log(numDeposits1000v4);

// 3 use reduce to create an object

const sums = allMovements.reduce(
  (acc, cur) => {
    if (cur > 0) {
      acc.deposits += cur;
    } else {
      acc.withdrawals += cur;
    }
    return acc;
  },
  {
    deposits: 0,
    withdrawals: 0,
  }
);
console.log(sums);

const sumsv2 = allMovements.reduce(
  (acc, cur) => {
    cur > 0 ? (acc.deposits += cur) : (acc.withdrawals += cur);
    return acc;
  },
  {
    deposits: 0,
    withdrawals: 0,
  }
);
console.log(sumsv2);

//in the version 3 we have a more dry code, as we prevent the repeating of the action acc += cur
const sumsv3 = allMovements.reduce(
  (acc, cur) => {
    acc[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
    return acc;
  },
  {
    deposits: 0,
    withdrawals: 0,
  }
);
console.log(sumsv3);

// 4 convert a string to title case
// ex: this is a nice title -> This Is a Nice Title (notice how the a did not capitalize)

const titleCaseify = function (string) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'and'];
  const words = string.toLowerCase().split(' ');
  const title = words
    .map(word =>
      !exceptions.includes(word)
        ? word.replace(word[0], word[0].toUpperCase())
        : word
    )
    .join(' ');
  return title.replace(title[0], title[0].toUpperCase());
};

console.log(titleCaseify('this is a nice title'));
console.log(titleCaseify('this is a long title but not too long'));
console.log(titleCaseify('and is a long title but not too long'));
/
*/

// *************** Coding challenge #4 ***************
/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
/*

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
dogs.forEach(dog => (dog.recomendedFood = Math.trunc(dog.weight ** 0.75 * 28)));

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

dogs.forEach(dog => {
  if (dog.owners.includes('Sarah')) {
    if (dog.curFood > dog.recomendedFood * 1.1) {
      console.log('Dog eats too much');
    } else if (dog.curFood < dog.recomendedFood * 0.9) {
      console.log('Dog eats too litle');
    } else {
      console.log('Dog eats an ok amount');
    }
  }
});

// this is the course solution
// const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(
//   `Sarahs dog is eating too ${
//     dogSarah.curFood > dogSarah.recomendedFood ? 'much' : 'litle'
//   }!`
// );

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
const ownerEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recomendedFood * 1.1)
  .flatMap(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recomendedFood * 0.9)
  .flatMap(dog => dog.owners);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

console.log(`${ownerEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

//my solution, should only return one boolean value not one for each dog
// dogs.forEach(dog => {
//   console.log(dog.recomendedFood === dog.curFood);
// });

console.log(dogs.some(dog => dog.curFood === dog.recomendedFood));

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

//my solution, should only return one boolean value not one for each dog
// dogs.forEach(dog => {
//   console.log(
//     dog.curFood < dog.recomendedFood * 1.1 &&
//       dog.curFood > dog.recomendedFood * 0.9
//   );
// });

const checkOkDiet = dog =>
  dog.curFood < dog.recomendedFood * 1.1 &&
  dog.curFood > dog.recomendedFood * 0.9;

console.log(dogs.some(checkOkDiet));
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const okFoodDogs = dogs.filter(checkOkDiet);
console.log(okFoodDogs);
// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
const sortedArr = dogs
  .slice()
  .sort((first, second) => first.recomendedFood - second.recomendedFood);
sortedArr;
*/
