'use strict';
/******************Constructor fucntions and the new operator ******************/
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
