'use strict';
/*
function calcAge(birthYear) {
  const age = new Date().getFullYear() - birthYear;
  // console.log(firstName);
  // console.log(lasstName); // variable not defined error as it has not been defined in the project

  function printAge() {
    const output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);
    if (birthYear >= 1991 && birthYear < 1996) {
      const str = `Oh, and you are a milenial ${firstName}`;
      var milenial = `Oh, and you are a milenial ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // add(1, 2); //function is defined within the block scope
    // console.log(str) //when creating a variable within block scope with let and const the variable will live only within that scope
    console.log(milenial); // var definition within a block scope will be asigned to its parent scope
  }
  printAge();
  return age;
}
// calcAge(1991); //Variable firstName is declared after this function call so it will not find the variable in the global scope

const firstName = 'Eduardo';
calcAge(1991);
*/
/*
console.log(me);
// console.log(job);
// console.log(year);
console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3)); //este error es por que debido a hoisting addArrow es igual a undefined, y se esta tratando de llamar a undefined como una funcion

//hoisting with variables
var me = 'Eduardo';
let job = 'programmer';
const year = 1991;

//hoisting with functions
function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => {
  a + b;
};

function deleteShoppingCart() {
  console.log('all products deleted');
}

if (!numProducts) {
  //due to hoisting this is creating a bug, because the var is not been initialied yet it is equal to undefined that is a falsy value, and will delete the shopping cart at every nstance
  deleteShoppingCart();
}
var numProducts = 10;

*/
/*
const edo = {
  name: 'Eduardo',
  age: 30,
  natianolity: 'somewher',
  printName: function () {
    console.log(this);
    console.log(this.name);
  },
};
console.log(edo.printName());

const funcCall = function () {
  return this; // si usamos strict mode va a retornar undefined, si no lo usamos this va a apuntar al global scope, en caso del browser sera el window object
};
console.log(funcCall());

const arrowFunc = () => {
  return this; // este this va a apuntar al this de su funcion padre
};
console.log(arrowFunc());

const matilda = {
  name: 'Matilda',
  year: 2017,
};
matilda.printName = edo.printName;
matilda.printName();
*/
/*
// remaining
const edo = {
  firstName: 'Eduardo',
  birthYear: 1991,
  calcAge: function () {
    console.log(this);
    console.log(new Date().getFullYear() - this.birthYear);
    const self = this;

    const isMillenial = function () {
      //this es undefined por que la funcion isMillenial no le pertenece a nadie y hay 2 soluciones a este problema, la primera es convertir la funcion a un arrow functions, y this va a apuntar al this de la funcion padre, y la segunda es la asignacion de la variable self = this en la funcion padre
      console.log(this);
      console.log(self);
      console.log(self.year >= 1981 && self.year <= 1996);
    };
    // const isMillenial = () => {
    //  // second solution
    //   console.log(this);
    //   console.log(this.year >= 1981 && this.year <= 1996);
    // };
    isMillenial();
  },
  greet: () => `hey ${this.firstName}`,
};

edo.calcAge();
console.log(edo.greet());

// arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(1, 2);

// arrow functions do not have an arguments keyword
const addArrow = (a, b) => arguments;
console.log(addArrow());
*/

//this tends to confuse people
let age = 30;
let oldAge = age;
age = 31;
console.log(age, oldAge); // oldAge es una copia de age, una variable totalmente diferente (esto ocurre con los primitive types)

const me = {
  name: 'Eduardo',
  age: 30,
};
const friend = me;

friend.age = 50;
console.log(me.age, friend.age); // no crea una copia del object, apunta hacia el object original que se esta asignando, debido a como son guardados en memoria los objects son references types

// primitive values
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
//podemos hacer esto por la manera en la que se guardan estas variables en  memoria, se guardan en el call stack, y cada variable apunta a una direccion den memoria que contiene el valor guardado(estos valores en memoria no se pueden modificar), al asignar una valiable a otra estamos pasandole la direccion en memoria, pero al asignarle un valor distinto, se asigna una nueva variable en memoria y se la iguala a esa.
console.log(lastName, oldLastName);

// objects or reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log(jessica);
console.log(marriedJessica);

//Con objects y reference types no se guarda las variables en el call stack sino en otro entorno del js engine, y las variables creadas en memoria del callstack apuntan a una referencia en el heap, ej: call stack{id:00001, valor:d00001(esto seria como el id para encontrarlo en el heap) heap{id: d00001, value:{ firstName:'xxx', lastName:'xxx'}}}

//copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
//Object assign creates a shallow copy of the object, only the first level and not the deeper ones, we could preserve the last name but the deeply nested object(an array is an object) was not preserved
jessicaCopy.lastName = 'Davis';
jessicaCopy.family.push('Alan', 'Mary');
console.log(jessica2);
console.log(jessicaCopy);
