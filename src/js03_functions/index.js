// index.js
// Functions (Function declaration, Function expressions, Arrow functions)

// 1. Function Declaration: Define a function to add items to the cart
function addToCart(cart, item, quantity = 1) {
  cart.push({ item, quantity });
  console.log(`${quantity} ${item} added to the cart.`);
}

// 2. Function Expression: Define a function to remove an item from the cart
const removeFromCart = function (cart, item) {
  const index = cart.findIndex((cartItem) => cartItem.item === item);
  if (index !== -1) {
    console.log(`${cart[index].item} removed from the cart.`);
    cart.splice(index, 1);
  } else {
    console.log(`${item} not found in the cart.`);
  }
};

// 3. Arrow Function: Define a function to calculate the total price
const calculateTotal = (cart, priceList) => {
  return cart.reduce((total, cartItem) => {
    return total + priceList[cartItem.item] * cartItem.quantity;
  }, 0);
};

// 4. Callback function: Define a function that takes a callback to apply a discount
const applyDiscount = (total, discountCallback) => {
  return discountCallback(total);
};

// 5. Higher-order Function: Define a function that generates a discount function
const discountGenerator = (percentage) => {
  return (total) => total - total * percentage;
};

// 6. Immediately-Invoked Function Expression (IIFE): Initialize the price list
const priceList = (function () {
  return {
    Apple: 1.5,
    Banana: 0.8,
    Orange: 1.2,
    Milk: 2.0,
  };
})();

// 7. Testing the functions with the cart
let shoppingCart = []; // Initialize an empty cart

addToCart(shoppingCart, "Apple", 2); // Add 2 Apples to the cart
addToCart(shoppingCart, "Milk", 1); // Add 1 Milk to the cart
addToCart(shoppingCart, "Orange", 3); // Add 3 Oranges to the cart

console.log("Cart:", shoppingCart);

removeFromCart(shoppingCart, "Banana"); // Attempt to remove Banana (not in the cart)
removeFromCart(shoppingCart, "Milk"); // Remove Milk from the cart

console.log("Cart after removing items:", shoppingCart);

// Calculate the total price
const total = calculateTotal(shoppingCart, priceList);
console.log(`Total Price: $${total.toFixed(2)}`);

// Apply a 10% discount using a generated discount function
const tenPercentDiscount = discountGenerator(0.1);
const discountedTotal = applyDiscount(total, tenPercentDiscount);
console.log(`Total Price after 10% discount: $${discountedTotal.toFixed(2)}`);

/** Output:
 *  2 Apple added to the cart.
    1 Milk added to the cart.
    3 Orange added to the cart.
    Cart: [
      { item: 'Apple', quantity: 2 },
      { item: 'Milk', quantity: 1 },
      { item: 'Orange', quantity: 3 }
    ]
    Banana not found in the cart.
    Milk removed from the cart.
    Cart after removing items: [ { item: 'Apple', quantity: 2 }, { item: 'Orange', quantity: 3 } ]
    Total Price: $6.60
    Total Price after 10% discount: $5.94
 */
