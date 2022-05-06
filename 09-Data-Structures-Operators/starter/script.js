'use strict';

// Data needed for a later exercise

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 1,
    time = '20:00',
    address,
  }) {
    console.log(
      `order recieved! ${this.starterMenu[starterIndex]}, ${this.mainMenu[mainIndex]}, will be delivered to ${address} at ${time}`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`
    );
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    return [mainIngredient, otherIngredients];
  },
};
/*

console.log(restaurant.order(2, 2));
// calling functions while passing objects as arguments
const objTest = {
  starterIndex: 2,
  mainIndex: 2,
  time: '22:30',
  address: 'via samborondon',
};
restaurant.orderDelivery(objTest);
*/
// ***************************** destructuring arrays
/*
const arr = [1, 2, 3, 4, 5];
const [first, second] = arr; // we use square braquets because we are destructuring an array
const [, , , third, , fifth] = arr; // we can skip an array element by leaving it empty in the declaration

//to switch the value of variables found inside an array is easier with destructuring
const foods = ['pizza', 'pasta'];
let [main, secondary] = foods;
//how we would do it whitout destructuring
// const temp = main
// main = secondary
// secondary = temp
// console.log(main, secondary);
//doing it with destructuring
console.log(main, secondary);
[main, secondary] = [secondary, main];
console.log(main, secondary);

function returnArr() {
  return ['first', 'second'];
}
const [one, two] = returnArr(); // we can also do this with return values from a function as long as they are an array

const nested = [1, 2, [3, 4]];
let [x, , y] = nested;
console.log(x, y);
let [, , [a, b]] = nested; // we can destructure nested arrays as well, using this format
console.log(a, b);

//we can also set default values
[a, b, x] = [1, 2];
console.log(a, b, x);
[a = 1, b = 1, x = 1] = [1, 2];
console.log(a, b, x);
*/

// ***************************** destructuring objects
//when destructuring objects is similar than when doing it with arrays, but we uset {} curly braces this time
//when doing destructuring with objects to extract the variable we use its name ex: let{name} = restaurant to extract restaurant.name
/*
let { name, location, openingHours, categories } = restaurant;
console.log(name, location, openingHours, categories);

// to use variables different than the object key
let {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, tags, hours);
//to set default values uncoment next 2 lines
// let { menu = [], starterMenu: starter = [] } = restaurant; // restaurants object does not contain a menu key so it we get the default value
// console.log(menu, starter);

//mutating variables
// default values
let { menu = [], starterMenu: starter = [] } = restaurant;

//mutating values
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

// we cant use const {a,b} = obj because those variables are already decleared
// we cant use let {a,b} = obj because it would create new variables
// we should reassign values by surrounding them in a parenthesis
({ a, b } = obj);
console.log(a, b);

// deconstructed nested objects
let { sat } = openingHours;
console.log(sat);
let {
  fri: { open, close },
} = openingHours;
console.log(open, close);
*/

// ***************************** the spread operator '...'
/*
//el spread operator saca todos los elementos del array y escribiendolos manualmente
const arr = [3, 4, 5];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const goodNewArr = [1, 2, ...arr];
console.log(goodNewArr);
console.log(...goodNewArr); // al hacer asi estamos logeando todos los elementos del array de manera individual

const newMenu = [...restaurant.mainMenu, 'Gnocci']; // al hacer esto estamos creando un nuevo array y no manipulamos el primero
console.log(newMenu);
//the spread operator is used to create shallow copies of arrays and merging arrays together
//shallow copy
const mainMenuCopy = [...restaurant.mainMenu];
//join 2 arrays together
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

//the spread operator work on all the iterables not only arrays, iterables are: arrays, strings maps, sets but not objects
const str = 'Eduardo';
const letters = [...str];
console.log(letters);
const ingridients = [
  prompt("Let's make pasta, ingridient 1"),
  prompt('ingridient 2'),
  prompt('ingridient 3'),
];
restaurant.orderPasta(...ingridients);

//since es2018 the spread operator also works on objects
const newRestaurant = { foundedIn: 1990, ...restaurant, founder: 'Eduardo' };
const restaurantCopy = { ...restaurant }; // making a copy of the restaurant
*/

// ***************************** the rest pattern and parameters
/*
//the rest pattern uses the same syntax as the spread operator, the rest packs elements to an array oposite than the spread that unpacks it. spread goes to the right side of the asignment(=) operator

//1) destructuring
const arr = [1, 2, ...[3, 4]]; //this is the spread
const [a, b, ...others] = [1, 2, 3, 4, 5]; // this is the rest as its on the left side, and will create an array of the remainding elements
console.log(a, b, others); //its called rest because it takes the rest of the array elements

//we can use the ... on both sides of the asignment operator(=)
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood); // it collects al elements after risotto, not the skipped ones

// rest also works with objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

//2) functions
// this is called the rest parameters syntax
const add = function (...numbers) {
  return numbers.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
};
console.log(add(2, 3));
console.log(add(5, 3, 7, 2));
console.log(add(8, 2, 5, 3, 2, 1, 4));

const x = [23, 5, 7]; // if I am using rest parameters for a function and I want to pass an array, I should use the spread operator to pass it
console.log(add(...x));
let [mainIngridient, otherIngredients] = restaurant.orderPizza(
  'peperoni',
  'sausage',
  'ham'
  );
  console.log(mainIngridient, otherIngredients);
  */

// ***************************** short circuiting(&& and ||)
/*
//logical operators can use any data type, and can return any data type, are able to do chort circuit evaluation
//short circuit with the || operator, if the first value assesd is truthy it will return it or the next truthy value
console.log('edo' || 10);
console.log(0 || 'edo');
console.log(null || undefined || 0 || false || 'edo');
console.log(null || undefined || 0); // will return the last value if all the evaluations are false
const guest = restaurant.numGuests || 10;
console.log(guest);

//shor circuit with && operator
//it will stop at the first falsy value it finds and return it, if no falsy values it will continue running until it finishes and return the last value
console.log(null && 'eduardo');
console.log('test' && null && 'eduardo');
console.log('test' && 10 && 'eduardo');

//practical examples
if (restaurant.orderPizza) {
  console.log(restaurant.orderPizza('cheese', 'tomatoes'));
}
// the previous if statement is done in order to check if we have said method on the restaurant object and we can write it like this

restaurant.orderPizza && restaurant.orderPizza('cheese', 'tomatoes'); // it will check if the method exists, if it does it will return truthy and run the function, if not it will stop and return the undefined
*/

// ***************************** nullish coalescing operator(??)
/*
const numGuests = 0;
// here we need the actual number of guests asigned on the numGuests variable, but because its a falsy value the the || short circuit will skip it and set the default
let guests = numGuests || 10;
guests;

//the nullish coalescing operator (??) works with the idea of nullish values instead of falsy values, nullish values are 'null' and 'undefined'
guests = numGuests ?? 10;
guests;
*/

// ***************************** logical assignment operators
/*
const rest1 = {
  name: 'Mika',
  numGuests: 20,
};

const rest2 = {
  name: 'El gordo',
  owner: 'Ramon',
};

rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 0;
console.log(rest1.numGuests, rest2.numGuests);

// we could replace the short circuit by usign the following line
// this operator asigns value to a variable if its value is falsy. but will bring issues if the current value is 0
rest2.address ||= 'Por ahi';
// rest2.numGuests ||= 10; // we can use the nullish assignment operator to prevent this error
rest2.numGuests ??= 10;
console.log(rest2.address, rest2.numGuests);

rest1.owner = rest1.owner && '<ANONYMOUS>';
rest2.owner = rest2.owner && '<ANONYMOUS>';
// we can replace the previous lines with the following code
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';
console.log(rest1.owner, rest2.owner);
*/

// ***************************** Coding challenge # 1
/*
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. Create one player array for each team (variables 'players1' and 'players2')
const [players1, players2] = game.players;
// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
const [gk, ...fieldPlayers] = players1;
// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
const allPlayers = [...players1, ...players2];
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// const { team1, x: draw, team2 } = game.odds;
const {
  odds: { team1, x: draw, team2 },
} = game;
// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
function printGoals(...players) {
  players.forEach(player => console.log(player));
  console.log(`${players.length} goals were scored`);
}
printGoals(...game.scored);
// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('team2 is more likely to win');

// TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
*/
/*
// ***************************** Looping arrays for-of loop

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const meal of menu) console.log(meal);

// if we also need the index we could use the following

for (const [index, meal] of menu.entries()) {
  //we can destructure in this step
  // the entries() is an array method that will return an array for each element of the original array containing its index value and content, ex ['name','lastName','age'].entries() => [0,'name'],[1,'lastName'],[2,'age']
  // const [index, dish] = meal;
  console.log(meal);
  console.log(`${index + 1}: ${meal}`);
}

console.log(menu.entries());
*/
// ***************************** Enhanced object literals
/*
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const family = {
  brother: 'pepito',
  sister: 'carlita',
  mother: 'maria',
  father: 'julio',
};

const eduardo = {
  firstName: 'Eduardo',
  lastName: 'Serrano',
  // before ES6 to add the family object inside this one we had to do as follow
  // family:family
  //with enhanced object literals we dont need to set the value to something else as it already exists
  family,
  // from ES6 onwards we dont need to use function expressions (create a variable and asign a function to it) but we can do it directly
  printFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  favoriteDays: {
    //we can now compute values while asigning new keys
    [days[1]]: true,
    [`${days[2]}-4`]: false,
    [`day-5`]: days[4],
  },
};

console.log(eduardo.family);
console.log(eduardo.printFullName());
console.log(eduardo.favoriteDays);
*/

// ***************************** Optional chaining(?.)
/*
//we dont have a mon defined within restaurants so it will return undefined, and an error after adding .open because mon is undefined

// console.log(restaurant.openingHours.mon.open);

// to avoid the error we must do something like this

if (restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}
// it could also be the case that we dont know if the restaurant object has an openingHours, se we might have to check for that as well

if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}
// instead of using the if statements we can apply the optional chaining method which will return undefined in case the is an error.
//how does optional chaining works? it will check if the variable or value on the level the ? is placed exists (will check is undefined or null) and if so return undefined, else will continue the operation

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'we are closed';
  console.log(
    `On ${day} ${typeof open == 'number' ? `we open at ${open}` : open}`
  );
}
//we can also use the optional chaining to call a method if it exists

console.log(restaurant.order?.(1, 1) ?? ' method does not exist');
console.log(restaurant.ord?.(1, 1) ?? ' method does not exist');

// optional chaining also works on arrays
const users = [{ name: 'edo', email: 'hotmail.com' }];
console.log(users[0]?.name);
console.log(users[1]?.name ?? 'user does not exist');
*/

// ***************************** Looping objects
/*
const obj = { first: 1, second: 2, third: 3 };
// looping over property names
console.log('looping property names');
console.log('-----------------------');

for (const item of Object.entries(obj)) {
  console.log(item);
}

// looping property values
console.log('looping property values');
console.log('-----------------------');

for (const itemValue of Object.values(obj)) {
  console.log(itemValue);
}

//looping key and value
console.log('looping property key and value');
console.log('-----------------------');

for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}
const entries = Object.entries(restaurant.openingHours);

// console.log(entries);
for (const [day, { open, close }] of entries) {
  console.log(`on ${day} we open at:${open} and close at:${close}`);
}
*/
/////////////////// Coding Challenge #2

/*
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

/*const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
for (const [goal, player] of game.scored.entries()) {
  console.log(`Goal ${goal + 1}: ${player}`);
}
// 2
const odds = Object.values(game.odds);
console.log(
  odds.reduce((previous, current) => previous + current) / odds.length
);

// 3
for (const [key, value] of Object.entries(game.odds)) {
  console.log(
    `odds of ${
      key === 'x' ? `draw: ${value}` : `victory ${game[key]}: ${value}`
    }`
  );
}

// bonus
let scorers = {};
for (const player of game.scored) {
  // scorers[player] ||= 0;
  // scorers[player]++;
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);
*/

// ********************************* Sets
/*
// sets are a collection of unique values, they can have no duplicates
const arr = ['pasta', 'pizza', 'risotto', 'pasta'];
const ordersSet = new Set(arr);
console.log(ordersSet);

//to make a set we must pass an iterable, strings are also iterables so we can do this
console.log(new Set('eduardo'));
// it can also be empty
console.log(new Set());
// we can also see the size of a set (for sets we use size and not length) which is the count of different elements
console.log(`the ordersSet has a size of ${ordersSet.size}`);

// we can check if there is an element inside a set using the .has method, if will return a boolean
console.log(`does orderSet has pizza?: ${ordersSet.has('pizza')}`);
console.log(`does orderSet has lasagna?: ${ordersSet.has('lasagna')}`);

// we can add new elements to a set with the .add method
console.log(ordersSet);
console.log(`adding bread to the set: ${ordersSet.add('bread')}`);
console.log(ordersSet);
// we can also delete elements from a set with .delete method
console.log(`deleting 'bread' from the ordersSet`, ordersSet.delete('bread'));
console.log(ordersSet);

//retrieve values from a set
// we can't retrieve values like we do from an array it will return undefined
console.log(
  'we cant retrieve values from a set like we do from an array result of ordersSet[0]:',
  ordersSet[0]
);
// there are no indexes in sets and there is no way to get data out of it becaue if all values are unique and all values are unordered the only thing we need is to check if a value is on the set or not with the .has method

// we can also clear all the data of a set with the .clear method
console.log('Clearing data from the ordersSet with ordersSet.clear()');
ordersSet.clear();
console.log('ordersSet:', ordersSet);

//sets are also iterables so we can loop through them
arr.forEach(element => ordersSet.add(element));

console.log('constructing ordersSet again:', ordersSet);

console.log('looping all its elements with a for-of loop');
for (const order of ordersSet) console.log(order);

// normally sets are used to remove uplicate values from arrays
//example
const restaurantStaff = [
  'waiter',
  'chef',
  'waiter',
  'manager',
  'chef',
  'waiter',
];
// const restaurantStaffRoles = new Set(restaurantStaff);
//to convert it directly to an array
const restaurantStaffRoles = [...new Set(restaurantStaff)];

console.log(restaurantStaffRoles);
*/
// ********************************* Maps
/*
// maps are data structures to map values to keys, like objects data is stored in key value pairs, but the difference is that map keys can be any type while objects can only be strings

// the easiest way to create a map is to create an empty on and fill it after with the set method
const rest = new Map();
// to ad an element to the map we use the .set method(), which takes in 2 arguments, key, and value
rest.set('name', 'classico Italiano');
console.log('set the name element to the rest map:', rest);
rest.set(1, 'Firenze, Italy');

// the set method returns the updated map
console.log(
  "the set method returns the updated map rest.set(2,'Lisbon, Portugal'): ",
  rest.set(2, 'Lisbon, Portugal')
);

// because set returns the updated map we can chain it
rest
  .set('categories', [...restaurant.categories])
  .set('open', 11)
  .set('close', 23);
// we can also use booleans as the key values
rest.set(true, 'We are open').set(false, 'We are closed');
console.log(rest);

// to access data from a map we need to use the .get method
console.log(
  'retrieve data with .get method, rest.get(name):',
  rest.get('name')
);

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// to ckeck if a map contains a certain key we use the .has method

console.log('rest.has(false):', rest.has(false));

// and we delete with the .delete() method
console.log(
  'delete element from a map rest.delete(false):',
  rest.delete(false)
);
console.log('rest.has(false):', rest.has(false));

// just like sets we can see the size of a map with . size() method
console.log('rest.size', rest.size);

// clear all elements from a map

console.log('clear the map with rest.clear()', rest.clear());
console.log(rest);

// we can also set an array as a key
console.log(
  "setting an array as key rest.set([1,2], 'value'):",
  rest.set([1, 2], 'value')
);
// but when we try to get it we get undefined because the way javascript store objects, as when we pass another array it will not be the same one
console.log('we get undefined when rest.get([1,2]):', rest.get([1, 2]));
//
// to make it work we shoud create an array and tass it as a key and use it to read the value with map
const arr = [1, 2, 3];
console.log(
  "const arr =[1,2,3] rest.set(arr,'value2'):",
  rest.set(arr, 'value2')
);

console.log('now we can use the getter rest.get(arr):', rest.get(arr));
// we can also use dom elements which are a special type of objects

rest.set(document.querySelector('h1'), 'this is the heading');
console.log(rest);
*/

// ********************************* Maps second part
/*
//there are other ways to populate a map other than the set method
// we create a new map and pass it an array that contain arrays, each nested array must contain 2 values, the first will be the key and the second the value in the map ex: new Map([[1,'first value'],[2,'second value']])
const question = new Map([
  ['question', 'what is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaSript'],
  ['Correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
]);
console.log(question);
//converting objects to maps
console.log(
  'we can easily convert objects to maps with the entries method as it gives the same format a map requires'
);
const hoursMap = new Map(Object.entries(restaurant.openingHours));
console.log(
  'const hoursMap = new Map(restaurant.openingHours.entries()):',
  hoursMap
);

// iteration is possible in maps because they are iterables, we can use the for loop

console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key == 'number') console.log(`Answer ${key}: ${value}`);
}
const answer = Number(prompt('What is your answer?'));
console.log(question.get(answer === question.get('Correct')));

// convert map to an array
console.log('[...question]', [...question]);
console.log('Maps also have access to array methods');
console.log('question.entries():', question.entries());
console.log('question.values():', question.values());
console.log('question.keys():', question.keys());
*/

// ********************************* Coding Challenge # 3
/*
// 1. Create an array 'events' of the different game events that happened (no duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL

// GOOD LUCK 😀

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);
//1)
const events = [...new Set(gameEvents.values())];
//2)
gameEvents.delete(64);
console.log(gameEvents);
//3)
const time = [...gameEvents.keys()].pop(); // removes and returnes the last element of the array

console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);
for (const [minute, event] of gameEvents) {
  const moment = minute <= 45 ? '[FIRST HALF]' : '[SECOND HALF]';
  console.log(`${moment} ${minute}: ${event}`);
}
*/

// ********************************* Working with String 1
/*
const airline = 'American Airlines';
const plane = 'B737 Max';
//we can get access to each letter in a strin the same way we access elements of an array
console.log('plane[0]:', plane[0]);
console.log('plane[1]:', plane[1]);
console.log('plane[2]:', plane[2]);
console.log('airline[0]:', airline[0]);
console.log('airline[1]:', airline[1]);

//strings have many methods similar than the array ones
console.log('airline.length:', airline.length);
console.log("airline.indexOf('n'):", airline.indexOf('n'));
console.log("airline.lastIndexOf('A'):", airline.lastIndexOf('A'));
console.log("airline.indexOf('Airlines'):", airline.indexOf('Airlines'));
console.log(airline.slice(9));
console.log(airline.slice(0, 8));
console.log(airline.split(' ')[0]);
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.indexOf(' ') + 1));

function checkMiddleSeat(seat) {
  const place = seat.slice(-1);
  if (place === 'B' || place === 'E') console.log('You got a middle seat');
  else console.log('You got lucky');
}

checkMiddleSeat('11B');
checkMiddleSeat('11C');
checkMiddleSeat('11D');
checkMiddleSeat('11E');
*/

// ********************************* Working with String 2

/*
const airline = 'American Airlines';

console.log(
  'Turn string to lower case airline.toLowerCase():',
  airline.toLowerCase()
);

console.log(
  'turn string to upper case airline.toUpperCase():',
  airline.toUpperCase()
);

// fix capitalization

const passenger = 'EDuaRdo';
const passengerLower = passenger.toLowerCase(); // 'eduardo
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// comparing emails
const email = 'hello@test.com';
const loginEmail = ' Hello@test.com \n';
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log('Comparing emails');
console.log(email, loginEmail);
console.log('after toLowerCase() an trim():', trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

// there is also trimStart and trimEnd
console.log("'   hello there'.trimStart():", '   hello there'.trimStart());
console.log("'hello there   '.trimEnd():", 'hello there   '.trimStart());

// replacing parts of a string
const priceGB = '£288,97';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

// replace entire words
const announcement =
  'All passengers come to boarding door 23, Boarding door 23';

console.log(announcement.replaceAll('door', 'gate'));

//without replaceAll, using regex

console.log('replacing using regex ', announcement.replace(/door/g, 'gate')); //g flag stands for global

// boolean string methods

const plane = 'Airbus A320neo';
console.log("'Airbus A320neo'.includes('320'):", plane.includes('320'));
console.log("'Airbus A320neo'.includes('neo'):", plane.includes('neo'));
console.log("'Airbus A320neo'.includes('Neo'):", plane.includes('Neo'));
console.log("'Airbus A320neo'.includes('Boeing'):", plane.includes('Boeing'));
console.log("'Airbus A320neo'.startsWith('Ai'):", plane.startsWith('Ai'));
console.log("'Airbus A320neo'.startsWith('ai'):", plane.startsWith('ai'));
console.log("'Airbus A320neo'.startsWith('Aib'):", plane.startsWith('aib'));

if (
  plane.toLowerCase().includes('airbus') &&
  plane.toLowerCase().endsWith('neo')
) {
  console.log('Part of the new Airbus family');
}

// practice

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    return 'you are not allowed to board with that item';
  } else {
    return 'welcome aboard';
  }
};

console.log(checkBaggage('I have a laptop, some Food, and a pocket Knife'));
console.log(checkBaggage('a camera'));
console.log(checkBaggage('got some snacks and a gun for protection'));
*/

// ********************************* Working with String 3

/*
//using the split() method
console.log(
  "'a+very+nice+sprinc'.split('+'):",
  'a+very+nice+sprinc'.split('+')
);

const [firstName, lastName] = 'Eduardo Serrano'.split(' ');
console.log(firstName);

// there is a join method which is the opposite of split()
const newName = ['Mr.', firstName, lastName].join(' ');
console.log(newName);

const passenger = 'jessica ann smith davis';

const capitalizeName = function (name) {
  const namesArray = name.split(' ');
  const nameCapitalized = [];
  for (const word of namesArray) {
    // nameCapitalized.push(word[0].toUpperCase() + word.slice(1));
    nameCapitalized.push(word.replace(word[0], word[0].toUpperCase()));
  }
  return nameCapitalized.join(' ');
};
console.log(capitalizeName(passenger));

// padding a string
// adding certain amount of characters until the string reaches desired length

const message = 'Go to gate 23!';
console.log(message.padStart(25, '+'));
console.log(message.padEnd(25, '+'));

const maskCreditCard = function (number) {
  const normalizedNumber = number.replaceAll(' ', '').replaceAll('-', '');
  console.log(normalizedNumber.length);
  return normalizedNumber.slice(-4).padStart(normalizedNumber.length, '*');
};

console.log(maskCreditCard('0897 7908-1234 1234'));

// repeat
// will allow us to repeat the same string x ammount of times

const message2 = 'bad weather all departures delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
};
planesInLine(5);
*/

// ********************************* Coding Challenge # 4

/*
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const btn = document.querySelector('button');
const textArea = document.querySelector('textarea');

btn.addEventListener('click', e => {
  const text = [];
  const lines = textArea.value.split('\n');
  for (const line of lines) {
    text.push(snakeToCamelCase(line));
  }
  for (const [i, line] of text.entries()) {
    console.log(`${line.padEnd(20)} ${'✅'.repeat(i + 1)}`);
  }
});

function snakeToCamelCase(snakeCase) {
  let splittedWords = snakeCase.toLowerCase().trim().split('_');
  let camelCase = [];
  for (const [i, word] of splittedWords.entries()) {
    if (i > 0) {
      camelCase.push(
        splittedWords[i].replace(
          splittedWords[i][0],
          splittedWords[i][0].toUpperCase()
        )
      );
    } else {
      camelCase.push(splittedWords[i]);
    }
  }
  return camelCase.join('');
}
*/

// const flights = '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const flightsArr = flights.split('+');

for (const flight of flightsArr) {
  const [status, origin, destination, time] = flight.split(';');

  const output = ` ${status.includes('Delayed') ? '⛔️' : ''}${status
    .replaceAll('_', ' ')
    .trim()} from ${origin.slice(0, 3).toLocaleUpperCase()} to ${destination
    .slice(0, 3)
    .toLocaleUpperCase()} (${time.replace(':', 'h')})`.padStart('44');
  console.log(output);
}
//
//
//
//
//
const remaining = [17].reduce((previous, current) => previous + current) / 60;

console.log(calculateRemaining());

function calculateRemaining() {
  let rounded = Math.trunc(remaining);

  return `${rounded} hours and ${Math.trunc(
    (remaining - rounded) * 60
  )} minutes remaining`;
}
