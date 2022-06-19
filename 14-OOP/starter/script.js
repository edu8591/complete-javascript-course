'use strict';

/******************Constructor fucntions and the new operator ******************/
/*
// we can use constructor functions to create objects with a functions, the only difference between a nomar function and a constructor function is that we use the new keyword with the constructor

const Person = function (name, birthYear) {
  this.name = name;
  this.birthYear = birthYear;
  // we can create methods like this, but doing it this way is not recomended as all the instances will have a copy of this method which will impact the eficiency
  // to solve this issue we will use inheritance
  this.calcAge = function () {
    const year = new Date().getFullYear();
    console.log(year - this.birthYear);
  };
};

const edo = new Person('edo', 1991);
const jack = new Person('jack', 1960);
const mathilda = new Person('Mathilda', 1999);
//when we use the new keyword there are lots of things going on;
// there are 4 steps that we go through when we use the new keyword

// 1) a new empty object is created {}
// 2) function is called and the this keyword is asigned the newly created object
// 3) this new object {}is linked to aa prototype
// 4) the created object is automatically returned at the end of the function

console.log(edo, jack, mathilda);

console.log(edo instanceof Person);
*/

/******************Prototypes******************/
/*
const Person = function (name, birthYear) {
  this.name = name;
  this.birthYear = birthYear;

  // we should not add functions here in the constructor because it will create a copy of the function on every instance, we should create it on the prototype
  // this.calcAge = function () {
  //   console.log(new Date().getFullYear() - this.birthYear);
  // };
};
// Person.prototype is basically an object so we can add methods to it in the following way
Person.prototype.calcAge = function () {
  console.log(new Date().getFullYear() - this.birthYear);
};

// here we can see the methods that are in the prototype
console.log('Person.prototye:', Person.prototype);
// now all instances of person have access to the calcAge method but do NOT have a copy of the method
const edo = new Person('edo', 1991);
edo.calcAge();
// we can now use the calcAge method on edo even though it does not contain the calcAge method but we still have access to it thanks to prototypal inheritance. if we check any instance of person we will se it does not have calcAge, but if we look into the __proto__ element we will find it
console.log("edo's instance: ", edo, "edo's prototype:", edo.__proto__);

// we can check that the prototype of the instace of person is the same as the Person prototype
console.log(edo.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(edo));

// but Person. prototype is not the prototype of Person, but instead it is what is going to be used as prototype for all the instances that will be created from the Person constructor
console.log(Person.prototype.isPrototypeOf(Person));

// we can also set properties on the prototypes

Person.prototype.species = 'Homo Sapiens';

console.log(edo.species);

// this new property is not this instance own property, the own property of an instance are those specified in the constructo, to check to for this we do as follow:
console.log(edo.hasOwnProperty('name'), edo.hasOwnProperty('species'));
// this is because the species property is not inside the edo object but inside the Person.prototype
*/

/******************Prototypal inheritance in built in objects******************/
/*
const Person = function (name, birthYear) {
  this.name = name;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  console.log(new Date().getFullYear() - this.birthYear);
};
Person.prototype.species = 'Homo Sapiens';

const mathilda = new Person('Mathilda', 1980);
const edo = new Person('Edo', 1991);

console.log(edo.__proto__);
console.log(edo.__proto__.__proto__); // this is getting the prototype for the Person constructor which is the Object prototype, here we can see that there are some methods inherited that all instances of class Person will also receive
console.log(edo.__proto__.__proto__.__proto__); // this returns null because we already reached the Object constructor, as it is the parent it does not have a prototype other than the object it will use to create instances
console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor); // we use console.dir to inspect the function

const arr = [1, 2, 3, 4, 5];
console.log(arr.__proto__); // we can also check the proto of an array
// the arr.__proto__ is equal to array.prototype
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

const h1 = document.querySelector('h1');
console.dir(h1); // to inspect the element

console.dir(x => x);
*/

/******************Challenge #1******************/

/*
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
/*

function Car(make, speed) {
  this.make = make;
  this.speed = `${speed} km/h`;
}
Car.prototype.accelerate = function () {
  this.speed = `${Number.parseInt(this.speed) + 10} km/h`;
  console.log(this.speed);
};
Car.prototype.brake = function () {
  this.speed = `${Number.parseInt(this.speed) - 5} km/h`;
  if (Number.parseInt(this.speed) < 0) this.speed = '0 km/h';
  console.log(this.speed);
};
const bmw = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);

console.log(bmw.speed);
bmw.accelerate();
bmw.brake();

console.log(Mercedes.speed);
Mercedes.accelerate();
Mercedes.brake();

console.log((21 + 10 + 14 + 15 + 11 + 15 + 7) / 60);
*/

/******************ES6 Classes******************/
/*
// with this class sintax, is the same as using the constructors behind the scenes so its called sintactic sugar.
// this new sintax is mainly to make life easier to people that come from other programing languages by giving the sintax similar to what they are used to

// Class Expression
// const PersonExp = class {
//   constructor(name, birthYear) {
//     this.name = name;
//     this.birthYear = birthYear;
//   }
//   species = 'Homo Sapiens';
// };

// Class Declaration
class Person {
  constructor(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(new Date().getFullYear() - this.birthYear);
  }
  species = 'Homo Sapiens';
}

const edo = new Person('Edo', 1991);
console.log(edo);

// we can still manipulate the prototype even if we use the class declaration
Person.prototype.greet = function () {
  console.log(`Hey ${this.name}!`);
};

edo.greet();

// keep in mind about classes
// 1) classes are not hoisted even if they are class declarations, unlike functions declarations that are
// 2) Class are firs-class citizens, meaning we can pass them to functions and return them from functions
// 3) Classes are allways executed in strict mode, even if we dont activate strict mode at the begining of the file
*/

/******************Getters and Setters******************/
/*
// getters and setters are functions made to manipulate data inside an object without directly accessing it

const account = {
  owner: 'Edo',
  movements: [200, 530, 120, 300],
  get latest() {
    // const arr = this.movements;
    // const [last, ...rest] = arr.reverse();
    // return last;
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    return this.movements.push(mov);
  },
};
console.log(account.latest);

console.log((account.latest = 100));
console.log(account.latest);

// now using getter on classes

class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log();
  }
  get age() {
    return new Date().getFullYear() - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this.fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }
}
const edo = new Person('edo serr', 1991);

console.log(edo.age);
*/
/******************Static Methods(class methods)******************/
/*
const PersonCl = function (fullName, birthYear) {
  this.fullName = fullName;
  this.birthYear = birthYear;
};
//to add a static method
PersonCl.hey = function () {
  console.log('hey');
};
// now instances of PersonCl will not inherit the hey method because it is not in the prototype

// another example using the class keyword to define a Person class ans set static methods

class Person {
  constructor(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  }

  get calcAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  // we can use the static keyword to create static methods
  static greet(time = '') {
    console.log(this);
    if (time.toLowerCase() === 'morning') return 'Good Morning';
    if (time.toLowerCase() === 'afternoon') return 'Good Afternoon';
    return 'Hello There';
  }
}

const edo = new Person('edo', 1991);

console.log(edo.calcAge);
console.log(Person.greet('morning'));
*/

/******************Object.create******************/

// after constructor functions and es6 classes, there is a third way to implement prototypal inheritance

// with the object.create there is still the idea of prototypal inheritance but there are no prototype properties and no constructor function or new operator

// we can manually set the prototype of an object to any other object that we want

// class PersonProto {
//   constructor(name, birthYear) {
//     this.name = name;
//     this.birthYear = birthYear;
//   }
//   get calcAge() {
//     return new Date().getFullYear() - this.birthYear;
//   }
// }
/*
const PersonProto = {
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const steven = Object.create(PersonProto);
steven.name = 'steven';
steven.birthYear = 1991;
// console.log(steven);
console.log(steven.calcAge());

const sarah = Object.create(PersonProto);
sarah.init('sarah', 1999);

console.log(sarah.calcAge());
*/
/******************coding challenge #2******************/

/*
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
/*
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.speed} Km/h`);
    return `${this.speed} Km/h`;
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.speed} Km/h`);
  }
  get speedUS() {
    console.log(`${this.speed / 1.6} Mi/h`);
    return `${this.speed / 1.6} Mi/h`;
  }
  set speedUS(change) {
    console.log(change);
    this.speed = change * 1.6;
    return this.speedUS;
  }
}

const ford = new Car('ford', 120);

ford.speedUS;
ford.accelerate();
ford.brake();
ford.brake();
*/

/******************Inheritance between classes: constructor functions******************/
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  console.log(new Date().getFullYear() - this.birthYear);
};
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

// with this the Student.prototype is now an object that inherits from the Person.prototype

// Why do we need to use Object.create? -> we could have also use the following "Student.prototype = Person.prototype", but by doing so whenever we we add a new method to the Student.prototype we will be also adding it to the Person.proto because Student.proto will be a copy to the location in memory on Person.proto, meaning that it will be the exact same object Person is using

Student.prototype.constructor = Student;

// we have to set back the constructor to student so that the instances of the classes are of type Student, it changed to Person when we used the Object.create

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName}, and  study ${this.course}`);
};

const mike = new Student('Mike', 2000, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike instanceof Student);
*/

/******************Challenge #3******************/

/*
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
/*
// Car is the iplementation of challenge 1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%'`
  );
};

const tesla = new EV('Tesla', 120, 23);

tesla.chargeBattery(100);
tesla.accelerate();
*/

/******************Inheritance for ES6 classes******************/
/*
class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(new Date().getFullYear() - this.birthYear);
  }
  greet() {
    console.log(`Hello, my name is ${this.fullName}`);
  }
  get age() {
    return new Date().getFullYear() - this.birthYear;
  }
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }
  get fullName() {
    return this._fullName;
  }
  static hey() {
    console.log('Hey there');
  }
}

class Student extends Person {
  constructor(fullName, birthYear, course) {
    // this needs to happen first because the supper function is responsible for creating the 'this' keyword
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName}, and I study ${this.course}`);
  }
  // ti override a method we have to declare it again
  calcAge() {
    console.log(
      `I am ${
        new Date().getFullYear() - this.birthYear
      } years old, but as a student I fill more like ${
        new Date().getFullYear() - this.birthYear + 10
      }`
    );
  }
}

// if the new child element has only the exact same attributes as its parent there is no neede to use the constructor function call
// class Student extends Person {}
// const martha new Student('martha jones' 1990)

const martha = new Student('martha jones', 1990, 'computer sciense');

martha.introduce();
martha.calcAge();
*/

/******************Inheritance between classes using Object.create******************/
/*
const PersonProto = {
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
  calcAge() {
    const age = new Date().getFullYear() - this.birthYear;
    // console.log(age);
    return age;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(
    `Hi my name is ${
      this.firstName[0].toUpperCase() + this.firstName.slice(1)
    }, I am ${this.calcAge()} years old, and study ${this.course}`
  );
};

const jay = Object.create(StudentProto);
jay.init('jay', 2000, 'Computer Science');
jay.introduce();
jay.calcAge();
console.log(jay);
*/

/******************Other class Example******************/
/*
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening a new account with us ${this.owner}.`);
  }

  // Public interface
  set deposit(amount) {
    this.movements.push(amount);
  }
  set withdraw(amount) {
    this.movements.push(amount > 0 ? -amount : amount);
  }
  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit = 100;
      console.log(`Loan for ${val} approved.`);
    }
  }
}

const acc1 = new Account('Jonas', 'Euro', 1111);
acc1.deposit = 100;
acc1.withdraw = 50;
console.log(acc1);

acc1.requestLoan(100);
// at the moment we have no data privacy becase we can also call the approveLoan method which should be a private one
console.log(acc1.approveLoan(10)); // we should not be able to do this
console.log(acc1);
*/
/******************Encapsulation: Private Class Fields and Methods******************/

//there are 8 types of fields
// 1) public fields: we can think of a field as a property that will be on all instances
// 2) private fields
// 3) public methods
// 4) private methods
// 5) public static fields
// 6) private static fields
// 7) public static method
// 8) private static method
class Account {
  // 1) Public field declaration
  locale = navigator.language;

  // 2) Private fields
  #movements = [];
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;
  }
  // 3) public methods
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    return this.#movements.push(val);
  }

  withdraw(val) {
    return this.#movements.push(val > 0 ? -val : val);
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Your loan request for ${val} was approved.`);
    }
  }
  // 4) private methods
  // are still not supported by any browser as of today
  // #approveLoan(val) {
  //   return true;
  // }
  _approveLoan(val) {
    return true;
  }
}

const ex = new Account('edo', 'eur', 1111);

console.log(ex);

ex.requestLoan(50);
