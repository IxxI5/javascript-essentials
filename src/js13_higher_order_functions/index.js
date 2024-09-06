// index.js
// Higher-Order Functions (functions that take other functions as arguments or return functions as results)
// Performing operations on an array of products example.

// Array of products
const products = [
  { name: "Laptop", price: 1200, category: "Electronics" },
  { name: "Headphones", price: 100, category: "Electronics" },
  { name: "Coffee Maker", price: 60, category: "Appliances" },
  { name: "Blender", price: 80, category: "Appliances" },
  { name: "Smartphone", price: 800, category: "Electronics" },
];

// Higher-order function to filter products using a predicate function
const filterProducts = (products, predicate) => products.filter(predicate);

// Higher-order function to create a discount function
const createDiscountFunction = (discountPercentage) => (product) => ({
  ...product,
  price: product.price * (1 - discountPercentage),
  discountedName: `${product.name} (Discounted)`,
});

// Higher-order function to calculate total price using a reducer function
const calculateTotal = (products, reducer) => products.reduce(reducer, 0);

// Predicate function to filter electronics
const isElectronics = (product) => product.category === "Electronics";

// Reducer function to calculate total price
const sumPrice = (total, product) => total + product.price;

// Create a 10% discount function
const tenPercentDiscount = createDiscountFunction(0.1);

// Filter products by category
const electronics = filterProducts(products, isElectronics);
console.log("Electronics:", electronics);

// Apply 10% discount to the filtered electronics
const discountedElectronics = electronics.map(tenPercentDiscount);
console.log("Discounted Electronics:", discountedElectronics);

// Calculate total price of discounted electronics
const totalDiscountedPrice = calculateTotal(discountedElectronics, sumPrice);
console.log("Total Price of Discounted Electronics:", totalDiscountedPrice);

/** Output:
 *  Electronics: [
    { name: 'Laptop', price: 1200, category: 'Electronics' },
    { name: 'Headphones', price: 100, category: 'Electronics' },
    { name: 'Smartphone', price: 800, category: 'Electronics' }
  ]
  Discounted Electronics: [
    {
      name: 'Laptop',
      price: 1080,
      category: 'Electronics',
      discountedName: 'Laptop (Discounted)'
    },
    {
      name: 'Headphones',
      price: 90,
      category: 'Electronics',
      discountedName: 'Headphones (Discounted)'
    },
    {
      name: 'Smartphone',
      price: 720,
      category: 'Electronics',
      discountedName: 'Smartphone (Discounted)'
    }
  ]
  Total Price of Discounted Electronics: 1890
 */
