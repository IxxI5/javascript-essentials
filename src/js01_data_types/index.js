// index.js
// Variables and Data Types

// 1. Using 'var' to declare a variable (function-scoped or globally scoped)
// It's not recommended due to some issues like hoisting
var storeName = "John's Grocery"; // String
console.log(storeName); // Output: "John's Grocery"

// 2. Using 'let' to declare a block-scoped variable
let customersToday = 25; // Number
console.log(customersToday); // Output: 25

// 3. Using 'const' to declare a constant, block-scoped variable (cannot be reassigned)
const MAX_CAPACITY = 50; // Number (constant)
console.log(MAX_CAPACITY); // Output: 50

// 4. Example of 'String'
let welcomeMessage = `Welcome to ${storeName}! We have ${
  MAX_CAPACITY - customersToday
} spots left for today.`;
console.log(welcomeMessage); // Output: "Welcome to John's Grocery! We have 25 spots left for today."

// 5. Example of 'Number'
let pricePerItem = 2.99; // Number (floating-point)
let quantity = 3; // Number (integer)
let totalCost = pricePerItem * quantity;
console.log(totalCost); // Output: 8.97

// 6. Example of 'Boolean'
let isStoreOpen = true; // Boolean
console.log(isStoreOpen); // Output: true

// 7. Example of 'Array' (used to hold a list of items)
let shoppingCart = ["Milk", "Bread", "Eggs"]; // Array of Strings
shoppingCart.push("Butter");
console.log(shoppingCart); // Output: ["Milk", "Bread", "Eggs", "Butter"]

// 8. Example of 'Object' (a collection of key-value pairs)
let customer = {
  // Object with properties
  name: "Alice",
  age: 32,
  isMember: true,
  cartItems: shoppingCart, // Nested Array
};
console.log(customer); // Output: {name: "Alice", age: 32, isMember: true, cartItems: ["Milk", "Bread", "Eggs", "Butter"]}

// 9. Example of 'null' (explicitly no value)
let deliveryDate = null; // This could later be assigned a date value
console.log(deliveryDate); // Output: null

// 10. Example of 'undefined' (a variable declared but not initialized)
let receipt; // Declared but not yet assigned a value
console.log(receipt); // Output: undefined

// 11. Example of 'Symbol' (unique, immutable identifier)
const orderID = Symbol("orderID"); // Symbol
const order = {
  [orderID]: 12345, // Symbol used as a property key
  customerName: "Alice",
  items: shoppingCart,
};
console.log(order); // Output: {customerName: "Alice", items: ["Milk", "Bread", "Eggs", "Butter"], Symbol(orderID): 12345}
console.log(order[orderID]); // Output: 12345

// 12. Example of dynamic type conversion
let totalItems = "3"; // String
let convertedTotalItems = Number(totalItems); // Converting String to Number
console.log(convertedTotalItems); // Output: 3
console.log(typeof convertedTotalItems); // Output: "number"

// 13. Using let within a block scope
if (customersToday < MAX_CAPACITY) {
  let spotsAvailable = MAX_CAPACITY - customersToday;
  console.log(`We still have ${spotsAvailable} spots available today.`); // Block-scoped variable
}
// console.log(spotsAvailable);  // Error: spotsAvailable is not defined (outside block scope)

/** Output:
 *  John's Grocery
    25
    50
    Welcome to John's Grocery! We have 25 spots left for today.
    8.97
    true
    [ 'Milk', 'Bread', 'Eggs', 'Butter' ]
    {
      name: 'Alice',
      age: 32,
      isMember: true,
      cartItems: [ 'Milk', 'Bread', 'Eggs', 'Butter' ]
    }
    null
    undefined
    {
      customerName: 'Alice',
      items: [ 'Milk', 'Bread', 'Eggs', 'Butter' ],
      [Symbol(orderID)]: 12345
    }
    12345
    3
    number
    We still have 25 spots available today.
 */
