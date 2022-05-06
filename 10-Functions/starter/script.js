'use strict';
// **********************************Default Parameters**********************************
/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // Old way of assigning default values
  // numPassengers ||= 1;
  // price ||= 199
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  bookings.push(booking);
  return booking;
};

console.log(createBooking('LH123'));
console.log(bookings);

console.log(createBooking('LH123', 2, 500));
console.log(bookings);

console.log(createBooking('LH123', 1, 250));
console.log(bookings.length);

// createBooking('LH123',250); we can't skip arguments, here250 will be set to numPassengers to skip a variable, we can set it to undefined
console.log(createBooking('LH123', undefined, 250));
console.log(bookings.length);

*/

// **********************************Arguments: value Vs Reference**********************************

/*
const flight = 'LH234';
const passenger = {
  firstName: 'Edo',
  passportNum: 12345678910,
};

const checkIn = function (flightNum, passenger) {
  // this is bad practice should never change the parameter of a function, but this is for sake of learning
  flightNum = 'LH999';
  passenger.firstName = 'Mr. ' + passenger.firstName;

  if (passenger.passportNum === 12345678910) {
    return 'Checked in';
  } else {
    return 'Wrong passport!';
  }
};

console.log(checkIn(flight, passenger));
// the function gets for the first parameter a copy of the data inside the flight variable it would be the same as doing flightNum = flight, so even if we modify the flightNum variable it will not modify the flight one
// but the second variable as it is an object, so what we are passing is the reference to the object in memory so we are working with the same object we passed as an argument

console.log(flight);
console.log(passenger);
// when we pass an object to a function every change made unto it will impact the original object

const newPassport = function (person) {
  person.passportNum = Math.trunc(Math.random() * 10000000000000000);
};
console.log(passenger.passportNum);
newPassport(passenger);
// we changed the passport number before calling the checkIn function
// we have to be wary to NOT modify objects with function because it can lead to bugs
console.log(checkIn(flight, passenger));
*/

// **********************************First-Class and Higher-Order functions**********************************

// first class functions means that functionas are treated as values, as they are "objects", functions also have methods!
// higher order functions is a functions that recieves another function as an argument or returns a function, an example of this is the addEventListener('action',greet) (lets imagine we defined a greet function)

// functions that accept another function as input

// *************** Higher order functions ***************
/*
const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  // const firstWord = str.split(' ')[0];
  // return str.replace(firstWord, firstWord.toUpperCase());

  const [firstWord, ...rest] = str.split(' ');

  return [firstWord.toUpperCase(), ...rest].join(' ');
};

// higher order function, because it takes another function as a parameter
const transformer = function (str, fn) {
  console.log(`Function used: ${fn.name}`);
  console.log(`OriginalString: ${str}`);
  console.log(`Modified string: ${fn(str)}`);
};
transformer('Javascript is the best', upperFirstWord);
transformer('Javascript is the best', oneWord);
*/

// *************** Functions Returning Functions ***************
/*
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey');
// these type of functions are able to work like this thanks to closures, by calling the function greet to a variable, we asign that variable the returning function with access to the scope of its father function, hence it will still be able to access to the greeting argument passed, and later we can call the returning function passing it a new argument
greeterHey('Edo');
greeterHey('Jonas');

greet('hello'); // this is a function so we can call inmediately
greet('Hello')('my friend');

const greetArr = greeting => name => `${greeting} ${name}`;

console.log(greetArr("what's up")('dude'));
*/

// *************** The call and apply methods ***************
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, passengerName) {
    console.log(
      `${passengerName} booked a seat on ${this.airline} flight: ${this.iataCode}${flightNum}`
    );
    this.bookings.push([
      { flight: `${this.iataCode}${flightNum}` },
      passengerName,
    ]);
  },
};

lufthansa.book(344, 'Eduardo');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// book(23, 'edo') // if we call the function now like this it will not work because it no longer has access to the 'this' keyword, it is not a method anymore, it is just a regular function
// so how should we tell js that where we want the this keyword to point to?
// there are 3 functions to do this call, apply and bind!

book.call(eurowings, 2443, 'Sarah williams'); // the first argument is where we want this to pint to, and the rest continue as normal
book.apply(eurowings, [453, 'edo']); // we pass where the this points to, and a second argument of an array containing the arguments for the function
console.log(eurowings.bookings);
console.log(lufthansa.bookings);

//if we have the arguments for the function in an array, before we would use the apply method but now we can unpack the array eith the ... operator and still us the call method

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

const flightData = [445, 'George Cooper'];

book.call(swiss, ...flightData);
console.log(swiss);
// *************** The bind method ***************

// just like call and apply methods the bind also asigns the this value to a function, but the difference from the other methods is that it does not inmediatelly calls the function, but returns a function where the this value has been assigned

const bookEW = book.bind(eurowings);
console.log(eurowings.bookings);
bookEW(994, 'Williams');
console.log(eurowings.bookings);

// we can do this for all the airlines
const bookLH = book.bind(lufthansa);
const bookSwiss = book.bind(swiss);

// We can pass more than one arguent to the bind method, the first will always be the this keyword, and the rest will take place of the other arguments needed to call the function, so each time the function is called it will always be done with the same arguments

const bookEw23 = book.bind(eurowings, 23); // this way the flightNum will always be 23 and we only need to pass the passengerName
bookEw23('Juan');
bookEw23('Martha Cooper');

// partially specifying part of the arguments beforehand is a pattern called partial application, meaning that a part of the arguments of the original function are already set

// another useful application of the bind method is when objects are used with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// partial application
//many times in partial application we are not interested on the this value

const addTax = (rate, value) => value + rate * value;

console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.12); //with this we can reuse the previous addTax function with a set rate value

console.log(addVAT(100));

const calculateTax = function (rate) {
  return value => value + value * rate;
};

const calcVAT = calculateTax(0.12);
console.log(calcVAT(100));
*/
// *************** Coding Challenge #1 ***************

/*
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)

  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
/*
const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer =
      Number(prompt(`${this.question}\n${this.options.join('\n')}`)) ??
      undefined;

    if (typeof answer == 'number') {
      if (answer <= 3 && answer >= 0) {
        this.answers[answer]++;
        this.displayResults();
      } else {
        console.log('Please enter a number from 0-3');
      }
    }
  },
  displayResults(type = 'array') {
    if (type.toLowerCase() === 'array') {
      console.log(this.answers);
    } else if (type.toLowerCase() === 'string') {
      console.log(`Poll results are: ${this.answers.join(', ')}`);
    } else {
      console.log('Please pass either string or array to the function');
    }
  },
};

const testObj1 = {
  answers: [5, 2, 3],
};

const testObj2 = {
  answers: [1, 5, 3, 9, 6, 1],
};

const displayResults = poll.displayResults;

displayResults.call(testObj1);
displayResults.apply(testObj2, ['string']);

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

let i = 1;
while (i < 101) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log('fizzBuzz');
  } else if (i % 3 === 0) {
    console.log('Fizz');
  } else if (i % 5 === 0) {
    console.log('Buzz');
  } else {
    console.log(i);
  }
  i++;
}
*/
// *************** immediately invoked function expressions (IIFE) ***************
/*
(function () {
  console.log('this function will only run once!');
})();

(() => {
  console.log('this function will also only run once!');
  const isPrivate = 23;
})();

// this pattern is created for data privacy and encapsulation, its important to hide variables and a scope is a good wat to do ir
// creatin variables with let and const inside a bock also creates them within that scope making the variables private, meaning that they wont be accessible to outer scopes, or global scope

{
  // for current javascript it is not necesary to create an IIFE to hide a variable as we can create a scope like this, as long as the variable is created using var or const
  const isPrivate = 23;
  var notPrivate = 50;
}
*/

// *************** Closures ***************
/*
const secureBooking = function () {
  //closures is not a feature we explicetely use, closures happen automatically in certain situations
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(passengerCount);
  };
};

const booker = secureBooking();

booker();
booker();
booker();
// the booker function has access to the passengerCount variable because it is the returning functions of secureBooking, and as every function has access to the variable environment of the execution context in which it was created even if taht execution contet has finished. That is a closure, the variable environment that is attached to the function.
// js will always look first for the closure before going to the blobal scope
let passengerCount = 0;
booker();
console.log(passengerCount); // that is why this passenger count will never be modified by the booker function

//different scope definitions
// * a closure is the closed-over variable environment of the execution context in which a function was created, even after that execution context is gone

// - less format - a closure gives a function access to all the variables of its parent function, even after that parent function has returned. the function keeps a reference to its outer scopre, which preserves the scope chain throughout time.

// - analogy a closure makes sure that a function doesn't loose connection to variables that existed at the functions birth place

// analogy a closure is like a backpack that a function carries around wherever it goes. this backpack has all the variables that were present in the environment where the function was created

console.dir(booker); // we use this to chec the scope of the functions, and to check the scope
*/

// *************** More Closure, now with examples ***************

/*
//Example 1
// We don't necesarily need to return a function to use closures, but we can reasign a value to one
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b);
  };
};

// calling this function we will assign f value to a function created from the g scope
g();
f(); // this runs the console log of a*23 defined in the g funciton scope

h(); // this should assign a another function to f
f();
console.dir(f);

//Example 2

const boardPassenger = function (n, wait) {
  const perGroup = n / 3;
  //use a timer
  // this callback function was running completely separated from the boardpassenger, so it got access to the perGroup variable and the arguments thanks to closures
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`there are 3 groups, each with ${perGroup} passenges`);
  }, wait * 1000); //Whatever is inside the function will execute after the time runs out, time is given in milliseconds
  console.log(`Will start boarding in ${wait} seconds`);
};
const perGroup = 1000; // the closure has preference over the global scope, thats why it will no use perGroup defined in the global scope but will go to the variable defined within the boardPassenger function
boardPassenger(180, 5);
*/

// *************** Coding Challenge #2 ***************

/*
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

*/
let togleColors;
(function () {
  const header = document.querySelector('h1');
  togleColors = function () {
    if (header.style.color === 'red') {
      header.style.color = 'blue';
    } else {
      header.style.color = 'red';
    }
  };
  togleColors();
})();

document.querySelector('body').addEventListener('click', togleColors);

// this works thanks to closures, the immediately invoked function expression was used to the the vatue of togleColors to a function which was created under the same scope as the header variable hence said new function will have permanent access to that variable environment
