// Remember, we're gonna use strict mode in all scripts now!
'use strict';
/*
let arr = [0, 1, 2, 3, 4, 5, 6, 7];
console.log;
function tempAmplitude(arr) {
	let lowest = null;
	let highest = null;
	for (let i = 0; i < arr.length; i++) {
		if (typeof arr[i] === 'number') {
			if (lowest === null && highest === null) {
				highest = arr[i];
				lowest = arr[i];
			} else if (arr[i] < lowest) {
				lowest = arr[i];
			} else if (arr[i] > highest) {
				highest = arr[i];
			}
		} else {
			continue;
		}
	}
	return highest - lowest;
}
console.log(tempAmplitude([3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5]));
*/
/*
const measureKelvin = function () {
	const measurement = {
		type: 'temp',
		unit: 'celsius',
		value: Number(prompt('Degrees celsius')),
	};
	const kelvin = measurement.value + 273;
	return kelvin;
};
*/

// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

const thermometer = function (temperatures) {
	const strings = [];
	for (let i = 0; i < temperatures.length; i++) {
		strings.push(
			`... ${temperatures[i]}ºC in ${i + 1} ${i + 1 > 1 ? 'days' : 'day'} ${
				i + 1 === temperatures.length ? '...' : ''
			}`
		);
	}
	return strings.join('');
};
console.log(thermometer([17, 21, 23]));
console.log(thermometer([12, 5, -5, 0, 4]));

//timer until chapter ends

const remaining = [15].reduce((previous, current) => previous + current) / 60;

console.log(calculateRemaining());

function calculateRemaining() {
	let rounded = Math.trunc(remaining);

	return `${rounded} hours and ${Math.trunc(
		(remaining - rounded) * 60
	)} minutes remaining`;
}
