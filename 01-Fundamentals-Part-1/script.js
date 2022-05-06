//**************************Values and variables**************************/

// let js = "Amazing";
// // if (js == "Amazing") {
// // 	alert("JavaScript is FUN");
// // }

// console.log("Eduardo");
// let age = 30;
// console.log(age);
// console.log(name);

// let myFirstJob = "Resale";
// let myCurrentJob = "Programmer";

// /*Practice assignment */
// let country = "Ecuador";
// let continent = "South America";
// let population = 16000000;
// console.log(
// 	`${country} is located in ${continent} and has a population of approximately ${population} people.`
// );

/**************************Data types**************************/
// there are objects and primitive values
// there are 7 primimitve values: number, strings, boolean, undefined, null, symbol(value that is unique and cannot be changed), BigInt(for large numbers)

/*
let jsIsFun = true;
console.log(jsIsFun);
console.log(
	typeof jsIsFun,
	typeof false,
	typeof 5,
	typeof "hola",
	typeof null,
	typeof undefined
);
console.log(typeof true);
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof "this is a string");
console.log(typeof 5);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(year);
console.log(typeof year);
*/

/**************************let, const and va**************************/

// let age = 30;
// age = 31;

// const birthYear = 1991;
// birthYear = 1992; const variable cannot be declared empty or be re-asigned

/**************************Basic Operators**************************/

/*
const now = 2022;
const ageEdo = now - 1991;
const ageAchan = now - 1996;
console.log(ageEdo, ageAchan);
console.log(ageEdo * 2, ageEdo / 2, 2 ** 3);

const firstName = "Eduardo";
const lastName = "Serrano";
console.log(firstName + " " + lastName);
console.log(`${firstName} ${lastName}`);
typeof firstName;

let x = 10 + 5; //the = sign is also an operator

x += 10; //add 10 to the current value of x is the same as writing x = x + 10
x *= 4; // same as previous one but multiplying
x++; //adds 1 to to x
x--;

//comparison operators
console.log(ageEdo > ageAchan);
console.log(ageEdo >= ageAchan);
console.log(ageEdo < ageAchan);
console.log(ageEdo <= ageAchan);
console.log(ageEdo != ageAchan);
console.log(ageEdo >= ageAchan);
console.log(ageAchan >= 18);

*/

/**************************Coding Challenge**************************/
// Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula:
// BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter).
// Your tasks:
// 1. StoreMark's and John's mass and height in variables
// 2. CalculateboththeirBMIsusingtheformula(youcanevenimplementboth
// versions)
// 3. CreateaBooleanvariable'markHigherBMI'containinginformationabout
// whether Mark has a higher BMI than John.
// Test data:
// § Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
// § Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

// const bmiCalculator = (mass, height) => {
// 	let bmi = mass / height ** 2;
// 	return bmi;
// };

// let marksBmi = bmiCalculator(78, 1.69);
// let johnsBmi = bmiCalculator(92, 1.95);
// let markHigherBMI = marksBmi > johnsBmi;
// console.log(marksBmi, johnsBmi, markHigherBMI);

// marksBmi = bmiCalculator(95, 1.88);
// johnsBmi = bmiCalculator(85, 1.75);
// markHigherBMI = marksBmi > johnsBmi;
// console.log(marksBmi, johnsBmi, markHigherBMI);

/**************************String and template literal**************************/

/*
const firstName = "Eduardo";
const job = "Web developer";
const birthYear = 1991;
const year = 2022;

const edo =
	"I'm " + firstName + ", a " + (year - birthYear) + " years old " + job + ".";

console.log(edo);

// multiline string
console.log("String with \n\
multile \n\
lines");

console.log(`Template literal allows for
new lines without ending it with n\ character`);
*/

/**************************If Statements**************************/
/*
const age = 17;

if (age >= 18) {
	console.log("akari can get a drivers licence");
} else {
	console.log("Akari can't get a driver's licence yet");
}

const birthYear = 1991;
let century;
if (birthYear <= 2000) {
	century = 20;
} else {
	century = 21;
}

century;
*/

/**************************Coding Challenge 2**************************/
// Use the BMI example from Challenge #1, and the code you already wrote, and improve it.
// Your tasks:
// 1. Printaniceoutputtotheconsole,sayingwhohasthehigherBMI.Themessage is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
// 2. UseatemplateliteraltoincludetheBMIvaluesintheoutputs.Example:"Mark's BMI (28.3) is higher than John's (23.9)!"
// Hint: Use an if/else statement 😉
/*
const bmiCalculator = (mass, height) => {
	let bmi = mass / height ** 2;
	return bmi;
};

let marksBmi = bmiCalculator(78, 1.69);
let johnsBmi = bmiCalculator(92, 1.95);
if (marksBmi > johnsBmi) {
	console.log(`Mark's BMI (${marksBmi}) is higher than John's(${johnsBmi})!`);
} else {
	console.log(`Johns's BMI (${johnsBmi}) is higher than Mark's(${marksBmi})!`);
}
marksBmi = bmiCalculator(95, 1.88);
johnsBmi = bmiCalculator(85, 1.75);

if (marksBmi > johnsBmi) {
	console.log(`Mark's BMI (${marksBmi}) is higher than John's(${johnsBmi})!`);
} else {
	console.log(`Johns's BMI (${johnsBmi}) is higher than Mark's(${marksBmi})!`);
}
*/

/**************************type cohersion and type conversion**************************/
/*
const inputYear = "1991";
console.log(Number(inputYear));
let year = 1991;
console.log(String(year));
year = year.toString();
console.log(year);
console.log(typeof year);

// type coercion

console.log("hello i am " + 30 + " years old.");

console.log("20" + "10" + 3);
console.log("20" - "10" - 3);
// si se suma se convierte a string, restando se convierte a number

let n = "1" + 1;
n = n - 1;

console.log(n);
n = 2 + 3 + 4 + "5";

n = "10" - "4" - "3" - 2 + "5";
*/

/**************************Truthy and falsy values**************************/
// there are only 5 falsy values in js ; '', 0, undefined, null and NaN
/*
console.log(Boolean(""));
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean(NaN));
console.log(`Boolean({}));
console.log(Boolean("Eduardo"));

const money = 0;

if (money) {
	console.log("Don't spend it all");
} else {
	console.log("You should get a job.");
}
// Js will use type coercion on the if statement clause to convert the value to to a boolean

let height;
if (height) {
	console.log("Height is defined");
} else {
	console.log("Height is not defined");
}
*/

/**************************equality operators  == vs === **************************/
/*
const age = 18;
if (age === 18) console.log("you just became an adult");
// the ===(equality operator) will only result true if they are exactly equal triple equal is the strict equality operator and does not do type coercion

console.log(18 === "18");
// th ==(double equality operator) will perform type coercionis also known as loose equality operator

let favorite = prompt("whats your favorite number?");
// the prompt will ask user for input

if (favorite === 23) {
	console.log("strictly equal");
} else if (favorite == 23) {
	console.log("loosely equal");
} else {
	console.log("is not equal");
}
*/

/**************************Boolean logic**************************/
/*
// conditions are to have a drivers license and have a good vision

// when using the "and"(&&) operator will only return true only if all the evaluations are true

// when using th "or"(||) operator will return true if only one of the evaluations returns true
let hasDriversLicense = true;
let hasGoodVision = false;
let isTired = true;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense && !hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);

const shouldDrive = hasDriversLicense && hasGoodVision;

if (shouldDrive) {
	console.log("Is able to drive");
} else {
	console.log("Someone else should drive");
}

hasGoodVision = true;
isTired = false;

if (hasDriversLicense && hasGoodVision && !isTired) {
	console.log(true);
} else {
	console.log(false);
}
*/

/**************************CODING CHALLENGE 3**************************/
/*
// There are two gymnastics teams, Dolphins and Koalas.They compete against each other 3 times.The winner with the highest average score wins a trophy!
// 1.- Calculate the average score for each team, using the test data below

// 2. - Compare the team's average scores to determine the winner of the competition, and print it to the console. Don't forget that there can be a draw, so test for that as well (draw means they have the same average score)

// 3. - Bonus1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a higher score than the other team, and the same time a score of at least 100 points.Hint: Use a logical operator to test for minimum score, as well as multiple else -if blocks.

// 4. - Bonus2: Minimum score also applies toadraw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points.Otherwise, no team wins the trophy

// Test data:

// Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110

// Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123

// Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

let dolphinsAverage1 = (96 + 108 + 89) / 3;
let dolphinsAverage2 = (97 + 112 + 101) / 3;
let dolphinsAverage3 = (97 + 112 + 101) / 3;

let koalaAverage1 = (88 + 91 + 110) / 3;
let koalaAverage2 = (109 + 95 + 123) / 3;
let koalaAverage3 = (109 + 95 + 106) / 3;

const winer = (dolphins, koalas) => {
	if (dolphins > koalas && dolphins >= 100) {
		return "Dolfins win the game";
	} else if (koalas > dolphins && koalas >= 100) {
		return "Koalas win the game";
	} else if (koalas == dolphins && koalas >= 100 && dolphins >= 100) {
		return "it is a draw!";
	} else {
		return "None of the teams has a minimum score of 100";
	}
};
console.log(winer(dolphinsAverage1, koalaAverage1));
console.log(winer(dolphinsAverage2, koalaAverage2));
console.log(winer(dolphinsAverage3, koalaAverage3));
*/

/**************************switch statement **************************/
/*
const day = "Monday";

switch (day.toLowerCase()) {
	case "monday":
		console.log("plan course structure");
		console.log("Go to coding meetup");
		break;
	case "tuesday":
		console.log("prepare theory videos");
		break;
	case "wednesday":
	case "thursday":
		console.log("write code examples");
		break;
	case "friday":
		console.log("record videos");
		break;
	case "saturday":
	case "sunday":
		console.log("enjoy the weekend");
		break;
	default:
		console.log("not a valid day");
}

if (day.toLowerCase() == "monday") {
	console.log("plan course structure");
	console.log("Go to coding meetup");
} else if (day.toLowerCase() == "tuesday") {
	console.log("prepare theory videos");
} else if (
	day.toLowerCase() == "wednesday" ||
	day.toLowerCase() == "thursday"
) {
	console.log("write code examples");
} else if (day.toLowerCase() == "friday") {
	console.log("record videos");
} else if (day.toLowerCase() == "saturnday" || day.toLowerCase() == "sunday") {
	console.log("enjoy the weekend");
} else {
	console.log("not a valid day");
}
*/

/**************************ternary operator **************************/
/*
const age = 23;
console.log(age >= 18 ? "is full age" : "is not full age");
*/

/**************************coding challenge 4 **************************/
/*
`Steven wants to build a very simple tip calculator for whenever he goes eating in a restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and 300. If the value is different, the tip is 20%.`;

`Your tasks:
1. Calculate the tip, depending on the bill value.Create a variable called 'tip' for this. It's not allowed to use an if/else statement 😅 (If it's easier for you, you can start with an if/else statement, and then try to convert it to a ternary operator!)
2. Print a string to the console containing the bill value, the tip, and the final value (bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value 316.25”`;

`Test data:
§ Data 1: Test for bill values 275, 40 and 430`;
const bill1 = 275;
const tip1 = bill1 >= 50 && bill1 <= 300 ? bill1 * 0.15 : bill1 * 0.2;
console.log(
	`The bill was $${bill1}, the tip was $${tip1}, and the total value $${
		bill1 + tip1
	}`
);

const bill2 = 40;
const tip2 = bill2 >= 50 && bill2 <= 300 ? bill2 * 0.15 : bill2 * 0.2;
console.log(
	`The bill was $${bill2}, the tip was $${tip2}, and the total value $${
		bill2 + tip2
	}`
);

const bill3 = 430;
const tip3 = bill3 >= 50 && bill3 <= 300 ? bill3 * 0.15 : bill3 * 0.2;
console.log(
	`The bill was $${bill3}, the tip was $${tip3}, and the total value $${
		bill3 + tip3
	}`
);
*/
