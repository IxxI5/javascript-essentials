// index.js
// Closures: Thisa a feature in JavaScript that allows functions to remember the environment in which they were created.
// A shopping cart example

// Create a shopping cart function using closures
function createCart() {
  // Private variable to hold the cart items
  let cartItems = [];

  // Function to add an item to the cart
  function addItem(item, quantity) {
    const existingItem = cartItems.find((i) => i.item === item);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ item, quantity });
    }
  }

  // Function to remove an item from the cart
  function removeItem(item) {
    cartItems = cartItems.filter((i) => i.item !== item);
  }

  // Function to view all items in the cart
  function viewCart() {
    return cartItems.slice(); // Return a copy of the cart items
  }

  // Return an object exposing only the necessary functions
  return {
    addItem,
    removeItem,
    viewCart,
  };
}

// Create a new shopping cart
const myCart = createCart();

// Use the cart functions
myCart.addItem("Apple", 3);
myCart.addItem("Banana", 2);
myCart.addItem("Orange", 1);

// View cart contents
console.log("Cart Contents:", myCart.viewCart());

// Remove an item and view cart contents again
myCart.removeItem("Banana");
console.log("Cart Contents after removing Banana:", myCart.viewCart());

// Try adding and viewing again
myCart.addItem("Apple", 2);
console.log("Cart Contents after adding more Apples:", myCart.viewCart());

/** Output:
 *  Cart Contents: [
    { item: 'Apple', quantity: 3 },
    { item: 'Banana', quantity: 2 },
    { item: 'Orange', quantity: 1 }
  ]
    Cart Contents after removing Banana: [ { item: 'Apple', quantity: 3 }, { item: 'Orange', quantity: 1 } ]
    Cart Contents after adding more Apples: [ { item: 'Apple', quantity: 5 }, { item: 'Orange', quantity: 1 } ]
 */

/** Explanation:
 *  Cart Creation: The createCart function creates a new shopping cart instance. It defines a private variable cartItems that stores the items in the cart.

    Closures: The functions addItem, removeItem, and viewCart have access to the cartItems variable even after createCart has finished executing. This is because they form closures around cartItems.

    Encapsulation: The cartItems array is not accessible from outside the createCart function directly. Only the functions returned by createCart (i.e., addItem, removeItem, viewCart) can interact with it.

    State Management: Each instance of the cart created by createCart maintains its own state, which is independent of other instances.
 */
