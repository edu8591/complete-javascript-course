"use strict";
/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;

if (hasDriversLicense) console.log("I can drive.");
*/

/******************Functions ******************/
/*
function logger() {
	console.log("my name is Edo");
}

//calling running or invoking the function
logger();

function foodProcessor(apples, oranges) {
	console.log(apples, oranges);
	let juice = "";
	if (apples && oranges) {
		juice = `Juice with ${apples} apples and ${oranges} oranges.`;
	} else if (apples) {
		juice = `Juice with ${apples} apples.`;
	} else if (oranges) {
		juice = `Juice with ${oranges} oranges.`;
	} else {
		juice = "There are no fruits to make juice.";
	}
	return juice;
}

let juice = foodProcessor(0, 5);
juice;
*/
/******************Function declarations vs function expression******************/
/*
// function declaration
function calcAge(birthYear) {
	return 2022 - birthYear;
}
// function expression
const calcAge2 = function (birthYear) {
	return 2022 - birthYear;
};
// function declaration can be called in the code before they are defined

console.log(calcAge(1991));
console.log(calcAge2(1990));
*/
/******************Arrow functions******************/
/*
const calcAge = (birthYear) => 2022 - birthYear;
console.log(calcAge(1989));

const yearsUntilRetirement = (birthYear, firstName) => {
	const age = 2022 - birthYear;
	const retirementAge = 65;
	return `${firstName} retires in ${retirementAge - age} years`;
};
console.log(yearsUntilRetirement(1991, "edo"));
*/
/******************Functions calling other functions(recursive functions)******************/
/*
function cutFruitPieces(fruit) {
	return fruit * 4;
}

function fruitProcessor(apples, oranges) {
	const applepieces = cutFruitPieces(apples);
	const orangepieces = cutFruitPieces(oranges);
	console.log(apples, oranges);
	let juice = "";
	if (apples && oranges) {
		juice = `Juice with ${applepieces} apple pieces and ${orangepieces} orange pieces.`;
	} else if (apples) {
		juice = `Juice with ${applepieces} applee pieces.`;
	} else if (oranges) {
		juice = `Juice with ${orangepieces} orange pieces.`;
	} else {
		juice = "There are no fruits to make juice.";
	}
	return juice;
}
console.log(fruitProcessor(1,2))
*/
/******************Functions review******************/
/*
const calcAge = function (birthYear) {
	return 2022 - birthYear;
};

const yearsUntilRetirement = function (birthYear, firstName) {
	const age = calcAge(birthYear);
	const retirement = 65 - age;
	if (retirement > 0) {
		return `${firstName} retires in ${retirement} ${
			retirement > 1 ? "years" : "year"
		}.`;
	} else {
		return `${firstName} is already retired.`;
	}
};

console.log(yearsUntilRetirement(1957, "edo"));
*/
/******************Coding Challenge 1******************/
/*
// Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
// Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
// A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!

// 1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
// 2. Use the function to calculate the average for both teams
// 3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)".
// 4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
// 5. Ignore draws this time.

// TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
// TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

const calcAverage = (scoresArray) => {
	const sumOfScores = scoresArray.reduce(
		(previous, current) => previous + current
	);
	return sumOfScores / scoresArray.length;
};

const checkWinner = function (dolphinsScores, koalasScores) {
	const avgDolphins = calcAverage(dolphinsScores);
	const avgKoalas = calcAverage(koalasScores);

	if (avgDolphins >= avgKoalas * 2) {
		return `Dolphins win (${avgDolphins} vs. ${avgKoalas})`;
	} else if (avgKoalas >= avgDolphins * 2) {
		return `Dolphins win (${avgKoalas} vs. ${avgDolphins})`;
	} else {
		return "No team wins";
	}
};

console.log(checkWinner([44, 23, 71], [65, 54, 49]));
console.log(checkWinner([85, 54, 41], [23, 34, 27]));
*/

/******************Arrays******************/
/*
const friend1 = "Edo";
const friend2 = "Juan";
const friend3 = "Carlos";
const friends = [friend1, friend2, friend3];

const otherFriends = new Array("Ivan", "David", "Sebastian");

friends;
friends[0] = "James";
friends.push("Karl");
// you can mutate arrays even if they were created as a const
friends;

otherFriends;
console.log(otherFriends.length);
console.log(otherFriends[otherFriends.length - 1]);

const edo = ["Eduardo", "Serrano", 1991, "male", friends];

console.log(edo[4]);
*/
/******************Basic array operators (methods)******************/
/*
const friends = ["Ivan", "David", "Sebastian"];
friends.push("Juan");
// push adds a new element at the end of the array, it does have a return value which is the length of the new array
friends.unshift("John");
// unshift adds anew element at the begining of the array
friends.pop();
// pop is the oposite of push, it will remove the last element of the array, it returns the removed element
friends.shift();
// oposite of unshift, removes the first element of the arary, and returns the removed element
console.log(friends.indexOf("David"));
console.log(friends.indexOf("Julio"));
// indexOf returns the position of the element in the array, if the element passed to the function does not exist within the array it will return -1
console.log(friends.includes("Ivan"));
console.log(friends.includes("ivan"));
// includes method will return a boolean depending if the array contains the element "it uses strict equality ==="

console.log(friends);
*/
/******************Coding Challenge #2******************/

/*
Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.

1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.
2. And now let's use arrays! So create an array 'bills' containing the test data below.
3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before.
4. BONUS: Create an array 'total' containing the total values, so the bill + tip.

TEST DATA: 125, 555 and 44

HINT: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array)
*/
/*
const calcTip = function (bill) {
	return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};
const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

*/

/******************Objects******************/
/*
const eduardo = {
	firstName: "Eduardo",
	lastName: "Serrano",
	age: 30,
	job: "?",
};
console.log(eduardo["firstName"]);
console.log(eduardo.lastName);

const nameKey = "Name";
console.log(eduardo["first" + nameKey]);
console.log(eduardo["last" + nameKey]);
// console.log(eduardo.('first'+nameKey));

let interestedIn = prompt("What do you want to know about me?");
interestedIn = "age";
console.log(eduardo.interestedIn);
console.log(eduardo[interestedIn]);
*/
/******************Objects methods******************/
/*
const eduardo = {
	firstName: "Eduardo",
	lastName: "Serrano",
	birthYear: 1991,
	hasDriversLicence: true,
	//  calcAge: () => 2022 - this.birthYear,
	// calcAge: function () {
	// 	return 2022 - this.birthYear;
	// },
	calcAge: function () {
		this.age = 2022 - this.birthYear;
		return this.age;
	},
	getSummary: function () {
		return `${
			this.firstName
		} is a ${this.calcAge()} years old programmer and he has ${
			this.hasDriversLicence ? "a" : "no"
		} drivers licence.`;
	},
};

console.log(eduardo.calcAge());
console.log(eduardo.age);
console.log(eduardo.getSummary());
*/

/******************Coding Challenge #3******************/

/*
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter)

1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a property, and also return it from the method.
3. Log to the console who has the higher BMI, together with the full name and the respective BMI. Example: "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!"

TEST DATA: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
*/
/*
const mark = {
	firstName: "Mark",
	lastName: "Miller",
	mass: 78,
	height: 1.69,
	fullName() {
		return `${this.firstName} ${this.lastName}`;
	},
	calcBMI() {
		return this.bmi ? this.bmi : (this.bmi = this.mass / this.height ** 2);
	},
};
const john = {
	firstName: "John",
	lastName: "Smith",
	mass: 92,
	height: 1.95,
	fullName() {
		return `${this.firstName} ${this.lastName}`;
	},
	calcBMI() {
		return this.bmi ? this.bmi : (this.bmi = this.mass / this.height ** 2);
	},
};
if (mark.calcBMI() > john.calcBMI()) {
	console.log(
		`${mark.fullName()}'s BMI (${mark
			.calcBMI()
			.toFixed(2)}) is higher than ${john.fullName()}'s BMI (${john
			.calcBMI()
			.toFixed(2)})`
	);
} else if (john.calcBMI() > mark.calcBMI()){
	console.log(
		`${john.fullName()}'s BMI (${john
			.calcBMI()
			.toFixed(2)}) is higher than ${mark.fullName()}'s BMI (${mark
			.calcBMI()
			.toFixed(2)})`
	);
} else {
	console.log(`Both ${mark.fullName()} and ${john.fullName()} have the same BMI!`)
}
// "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!
*/

/******************Loops******************/
// for loop keeps runing while condition == true
/*
for (let i = 0; i <= 10; i++) {
	console.log(`Lifting weights repetition ${i}`);
}
const eduardo = [
	"Eduardo",
	"Serrano",
	30,
	"programmer",
	["akari", "juan", "carlos"],
];

const types = [];

for (let i = 0; i < eduardo.length; i++) {
	console.log(eduardo[i]);
	types.push(typeof eduardo[i]);
}

const years = [1991, 1987, 2020, 1941];
const ages = [];

for (let i = 0; i < years.length; i++) {
	ages[i] = 2022 - years[i];
}
ages;
// continue and break, continue will exti the current itteration and go to the next one, exit will end the entire loop
const drivers = [];
for (let i = 0; i < ages.length; i++) {
	if (ages[i] < 18) continue;
	drivers.push(ages[i]);
}
drivers;
// will skip all ages under 18
*/
/******************Looping backwards and nested loops******************/
/*
const eduardo = [
	"Eduardo",
	"Serrano",
	30,
	"programmer",
	["akari", "juan", "carlos"],
];

for (let i = eduardo.length - 1; i >= 0; i--) {
	console.log(eduardo[i]);
}

// nested loops
for (let exercise = 1; exercise < 4; exercise++) {
	console.log(`starting exercise #${exercise}`);
	for (let rep = 1; rep < 6; rep++) {
		console.log(`Lifting weights repetition #${rep}`);
	}
}
*/

/******************While loops******************/
/*
for (let i = 0; i < 11; i++) {
	console.log(`doing repetition #${i}`);
}

let i = 0;
while (i < 11) {
	console.log(`doing repetition #${i}`);
	i++;
}

let die = Math.trunc(Math.random() * 6 + 1);
while (die !== 6) {
	console.log(`die value:${die}`);
	die = Math.trunc(Math.random() * 6 + 1);
}
die;
*/

/******************Coding Challenge #4******************/

// Coding Challenge #4

/*
Let's improve Steven's tip calculator even more, this time using loops!

1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!

TEST DATA: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52

HINT: Call calcTip in the loop and use the push method to add values to the tips and totals arrays 😉

4. BONUS: Write a function 'calcAverage' which takes an array called 'arr' as an argument. This function calculates the average of all numbers in the given array. This is a DIFFICULT challenge (we haven't done this before)! Here is how to solve it:
  4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together
  4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
  4.3. Call the function with the 'totals' array
*/
/*
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];
const calcTip = (bill) => {
	tips.push(bill * (bill >= 50 && bill <= 300 ? 0.15 : 0.2));
};
const calcAverage = (arr) => {
	const totalSum = arr.reduce(
		(previousValue, currentValue) => previousValue + currentValue
	);
	return totalSum / arr.length;
};


for (let i = 0; i < bills.length; i++) {
	calcTip(bills[i]);
	totals.push(tips[i] + bills[i]);
}
console.log(calcAverage(totals));
*/
