// index.js
// for Loops e.g. for, for in, for of, forEach
// An e-commerce shopping cart

// Sample products in the shopping cart
const shoppingCart = [
  { id: 1, name: "Laptop", price: 1000, quantity: 2 },
  { id: 2, name: "Headphones", price: 100, quantity: 4 },
  { id: 3, name: "Keyboard", price: 50, quantity: 1 },
  { id: 4, name: "Mouse", price: 25, quantity: 3 },
];

// 1. Using the basic for loop to calculate the total cost of items in the cart
let totalCost = 0;
for (let i = 0; i < shoppingCart.length; i++) {
  totalCost += shoppingCart[i].price * shoppingCart[i].quantity;
}
console.log(`Total cost (using for loop): $${totalCost}`);

// 2. Using for...of loop to display all product details
console.log("\nProduct details (using for...of loop):");
for (const product of shoppingCart) {
  console.log(
    `Product: ${product.name}, Price: $${product.price}, Quantity: ${product.quantity}`
  );
}

// 3. Using forEach to list products and their respective total item cost (price * quantity)
console.log("\nItem-wise total cost (using forEach loop):");
shoppingCart.forEach((product) => {
  const itemTotal = product.price * product.quantity;
  console.log(`${product.name}: $${itemTotal}`);
});

// 4. Using for...in to iterate over object properties (keys) of a single product
const firstProduct = shoppingCart[0];
console.log("\nProperties of the first product (using for...in loop):");
for (const key in firstProduct) {
  console.log(`${key}: ${firstProduct[key]}`);
}

// 5. Iterating over arrays with for...of, to extract just the product names
const productNames = [];
for (const product of shoppingCart) {
  productNames.push(product.name);
}
console.log(
  `\nProduct names (using for...of loop): ${productNames.join(", ")}`
);

// 6. Using for...in to iterate over an object's properties (keys)
const user = {
  name: "Alice",
  email: "alice@example.com",
  age: 30,
};

console.log("\nUser details (using for...in loop):");
for (const key in user) {
  console.log(`${key}: ${user[key]}`);
}

// 7. Using a classic for loop to filter products that cost more than $100
console.log("\nProducts costing more than $100 (using for loop):");
for (let i = 0; i < shoppingCart.length; i++) {
  if (shoppingCart[i].price > 100) {
    console.log(shoppingCart[i].name);
  }
}

// 8. Nested for loop: Calculate and display the total quantity of items in the cart by category
const productCategories = {
  Electronics: [
    { name: "Laptop", quantity: 2 },
    { name: "Headphones", quantity: 4 },
  ],
  Accessories: [
    { name: "Keyboard", quantity: 1 },
    { name: "Mouse", quantity: 3 },
  ],
};

console.log("\nTotal quantities by category (using nested for loop):");
for (const category in productCategories) {
  let totalQuantity = 0;
  for (const product of productCategories[category]) {
    totalQuantity += product.quantity;
  }
  console.log(`${category}: ${totalQuantity} items`);
}

/** Output:
 *  Total cost (using for loop): $2525

    Product details (using for...of loop):
    Product: Laptop, Price: $1000, Quantity: 2
    Product: Headphones, Price: $100, Quantity: 4
    Product: Keyboard, Price: $50, Quantity: 1
    Product: Mouse, Price: $25, Quantity: 3

    Item-wise total cost (using forEach loop):
    Laptop: $2000
    Headphones: $400
    Keyboard: $50
    Mouse: $75

    Properties of the first product (using for...in loop):
    id: 1
    name: Laptop
    price: 1000
    quantity: 2

    Product names (using for...of loop): Laptop, Headphones, Keyboard, Mouse

    User details (using for...in loop):
    name: Alice
    email: alice@example.com
    age: 30

    Products costing more than $100 (using for loop):
    Laptop

    Total quantities by category (using nested for loop):
    Electronics: 6 items
    Accessories: 4 items
 */
