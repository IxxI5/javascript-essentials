// index.js
// ES5 Prototypes and Inheritance
// Animal Kingdom example

// Base prototype - Animal
// Constructor function to create an Animal object
function Animal(name) {
  this.name = name; // Each Animal has a name property
}

// Adding a method to Animal's prototype
// This method will be available to all instances of Animal
Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound.`);
};

// Derived prototype - Dog
// Constructor function to create a Dog object
function Dog(name, breed) {
  // Call the parent constructor (Animal) to initialize the name property
  Animal.call(this, name);
  this.breed = breed; // Each Dog has an additional breed property
}

// Inherit from Animal
// Create a new object with Animal.prototype as its prototype
Dog.prototype = Object.create(Animal.prototype);
// Set the constructor property to refer to Dog, not Animal
Dog.prototype.constructor = Dog;

// Adding a method specific to Dog
Dog.prototype.bark = function () {
  console.log(`${this.name} barks.`);
};

// Derived prototype - Cat
// Constructor function to create a Cat object
function Cat(name, color) {
  // Call the parent constructor (Animal) to initialize the name property
  Animal.call(this, name);
  this.color = color; // Each Cat has an additional color property
}

// Inherit from Animal
// Create a new object with Animal.prototype as its prototype
Cat.prototype = Object.create(Animal.prototype);
// Set the constructor property to refer to Cat, not Animal
Cat.prototype.constructor = Cat;

// Adding a method specific to Cat
Cat.prototype.meow = function () {
  console.log(`${this.name} meows.`);
};

// Create instances of Dog and Cat
const myDog = new Dog("Rex", "Labrador");
const myCat = new Cat("Whiskers", "Tabby");

// Use the methods
myDog.speak(); // Rex makes a sound.
myDog.bark(); // Rex barks.

myCat.speak(); // Whiskers makes a sound.
myCat.meow(); // Whiskers meows.

// Check the prototype chain
console.log(myDog instanceof Dog); // true, myDog is an instance of Dog
console.log(myDog instanceof Animal); // true, myDog is also an instance of Animal

console.log(myCat instanceof Cat); // true, myCat is an instance of Cat
console.log(myCat instanceof Animal); // true, myCat is also an instance of Animal

// Check the constructor property
console.log(myDog.constructor === Dog); // true, myDog's constructor is Dog
console.log(myCat.constructor === Cat); // true, myCat's constructor is Cat

/** Output:
 *  Rex makes a sound.
    Rex barks.
    Whiskers makes a sound.
    Whiskers meows.
    true
    true
    true
    true
    true
    true
 */
