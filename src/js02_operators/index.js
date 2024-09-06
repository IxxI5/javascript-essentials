// index.js
// Operators (Arithmetic, Comparison, Logical, Assignmen)
// Shopping cart example

// Item prices (in USD)
let priceItem1 = 49.99;
let priceItem2 = 29.99;
let priceItem3 = 19.99;

// Number of items in the cart
let quantityItem1 = 2;
let quantityItem2 = 1;
let quantityItem3 = 3;

// Discount and taxes
let discountPercentage = 10; // 10% discount on total
let taxPercentage = 8.5; // 8.5% tax

// Calculate the subtotal using arithmetic operators (+, *, etc.)
let subtotal =
  priceItem1 * quantityItem1 +
  priceItem2 * quantityItem2 +
  priceItem3 * quantityItem3;
console.log(`Subtotal: $${subtotal}`); // 199.94

// Calculate discount (Assignment operator += and arithmetic -)
let discountAmount = (subtotal * discountPercentage) / 100;
subtotal -= discountAmount; // Apply discount
console.log(
  `Subtotal after ${discountPercentage}% discount: $${subtotal.toFixed(2)}`
);

// Apply taxes using assignment and arithmetic operators
let taxAmount = (subtotal * taxPercentage) / 100;
let total = subtotal + taxAmount; // Final total with tax
console.log(`Total after tax: $${total.toFixed(2)}`);

// Comparison operators to check if we qualify for free shipping
let freeShippingThreshold = 100;
let qualifiesForFreeShipping = total >= freeShippingThreshold; // Using comparison operator
console.log(
  qualifiesForFreeShipping
    ? "You qualify for free shipping!"
    : "You need to pay for shipping."
);

// Logical operators to check if we have a valid cart
let isValidCart = subtotal > 0 && quantityItem1 > 0 && quantityItem2 > 0; // Logical AND
console.log(isValidCart ? "Valid Cart!" : "Invalid Cart!");

// Ternary operator for determining if discount can be applied
let hasDiscount = subtotal > 50 ? true : false;
console.log(hasDiscount ? "Discount applied!" : "No discount available.");

// Increment and decrement operators for adding and removing items
quantityItem1++; // Adding one more item of item 1
quantityItem2--; // Removing one item of item 2
console.log(
  `Updated quantity for Item 1: ${quantityItem1}, Item 2: ${quantityItem2}`
);

// Nullish Coalescing Operator (??) to handle possible undefined values
let shippingAddress = null;
let defaultShippingAddress = "123 Main Street";
let finalShippingAddress = shippingAddress ?? defaultShippingAddress;
console.log(`Shipping to: ${finalShippingAddress}`);

// Optional Chaining (?.) operator for safe property access
let customer = {
  name: "John Doe",
  address: {
    street: "456 Oak Street",
    city: "New York",
  },
};

let city = customer?.address?.city; // Will not throw an error if address is undefined
console.log(`Customer city: ${city}`);

// Bitwise operator example (checking odd or even quantities)
let isOddQuantity1 = quantityItem1 & 1; // Bitwise AND to check if odd
console.log(
  isOddQuantity1 ? "Quantity of Item 1 is odd" : "Quantity of Item 1 is even"
);

/** Output:
 *  Subtotal: $189.94
    Subtotal after 10% discount: $170.95
    Total after tax: $185.48
    You qualify for free shipping!
    Valid Cart!
    Discount applied!
    Updated quantity for Item 1: 3, Item 2: 0
    Shipping to: 123 Main Street
    Customer city: New York
    Quantity of Item 1 is odd
 */
