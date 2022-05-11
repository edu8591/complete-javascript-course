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
