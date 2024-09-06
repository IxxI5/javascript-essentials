// index.js
// Destructuring, Default Parameters, Rest and Spread Operators
// A system that processes orders.

// Example data representing products in the system
const product1 = { name: "Laptop", price: 1000, category: "Electronics" };
const product2 = { name: "Shoes", price: 50, category: "Clothing" };
const product3 = { name: "Watch", price: 200, category: "Accessories" };

// Function to process an order
function processOrder(
  { customerName, products = [], discount = 0 }, // Destructuring order object, with default parameters for products ([]) and discount (0)
  ...extraCharges // Rest operator to collect all additional charges passed after the first argument
) {
  // Destructuring the first product object to extract name, price, and category with a default value for category
  // If the first product has no category, it defaults to "Miscellaneous"
  const [
    {
      name: prod1Name,
      price: prod1Price,
      category: prod1Category = "Miscellaneous",
    },
    ...otherProducts
  ] = products;

  // Using the rest operator `...otherProducts` to collect the remaining products from the array after destructuring the first one

  // Calculate total of all extra charges (like shipping, taxes) passed as additional arguments
  const totalExtraCharges = extraCharges.reduce(
    (sum, charge) => sum + charge,
    0
  );

  // Using the reduce method and destructuring to sum up the total price of the products
  // Spread operator in action: 'products' is an array of objects, and we spread each product's price
  const totalPrice =
    products.reduce((total, { price }) => total + price, 0) +
    totalExtraCharges - // Add extra charges (rest operator)
    discount; // Subtract discount (if any)

  // Output the order summary
  console.log(`Order Summary for ${customerName}:`);

  // Display details of the first product
  console.log(
    `- First Product: ${prod1Name}, Price: $${prod1Price}, Category: ${prod1Category}`
  );

  // Display details of the remaining products (if any)
  console.log(
    `- Other Products: ${
      otherProducts.length > 0
        ? otherProducts.map((p) => p.name).join(", ")
        : "None"
    }`
  );

  // Display the calculated total price, including the discount and extra charges
  console.log(
    `- Total Price (after discount of $${discount} and extra charges of $${totalExtraCharges}): $${totalPrice}`
  );
}

// Example order object, spreading products into an array
const order = {
  customerName: "John Doe",
  products: [product1, product2, product3], // Spread products array
  discount: 100, // Apply a $100 discount
};

// Call the function, passing the order object and extra charges (e.g., shipping and tax)
// The extra charges use the rest operator to be collected as an array in the function
processOrder(order, 20, 10); // Extra charges: $20 (shipping), $10 (tax)

/** Output:
 *  Order Summary for John Doe:
    - First Product: Laptop, Price: $1000, Category: Electronics
    - Other Products: Shoes, Watch
    - Total Price (after discount of $100 and extra charges of $30): $1180
 */
