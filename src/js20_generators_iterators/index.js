// index.js
// Generators and Iterators
// Warehouse Inventory System example

// A class to represent a Warehouse
class Warehouse {
  constructor() {
    this.items = []; // Store items in the warehouse
  }

  // Add an item to the warehouse
  addItem(item) {
    this.items.push(item);
  }

  // Implement the iterator protocol for Warehouse
  [Symbol.iterator]() {
    let index = 0;
    const items = this.items; // Access the warehouse items inside the iterator

    // Return an object with a next method to allow iteration
    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false }; // Provide the current item and move to the next one
        } else {
          return { done: true }; // Signal the end of the iteration
        }
      },
    };
  }

  // Create a generator to batch process items (useful for large datasets)
  *batchGenerator(batchSize) {
    let index = 0;

    while (index < this.items.length) {
      yield this.items.slice(index, index + batchSize); // Generate a batch of items
      index += batchSize; // Move to the next batch
    }
  }

  // Create a generator to filter items based on a condition
  *filterGenerator(condition) {
    for (let item of this.items) {
      if (condition(item)) {
        yield item; // Yield only items that meet the condition
      }
    }
  }
}

// Example usage of iterators and generators

// Step 1: Creating a warehouse and adding items
const warehouse = new Warehouse();
warehouse.addItem({ id: 1, name: "Laptop", quantity: 50 });
warehouse.addItem({ id: 2, name: "Phone", quantity: 120 });
warehouse.addItem({ id: 3, name: "Monitor", quantity: 30 });
warehouse.addItem({ id: 4, name: "Tablet", quantity: 75 });
warehouse.addItem({ id: 5, name: "Headphones", quantity: 200 });

// ---------------------- Custom Iterator Example ----------------------
// Step 2: Iterating over warehouse items using custom iterator (Symbol.iterator)
console.log("Iterating over all items using custom iterator:");
for (let item of warehouse) {
  // The for...of loop uses the warehouse's iterator to go over each item
  console.log(item); // Output each item in the warehouse
}

// ---------------------- Generator Example (Batch Processing) ----------------------
// Step 3: Using generator to process items in batches (e.g., for pagination)
console.log("\nProcessing items in batches of 2:");
const batchIterator = warehouse.batchGenerator(2); // Create a generator with batch size 2

for (let batch of batchIterator) {
  // Iterate over each batch of items
  console.log("Batch:", batch); // Output the current batch
}

// ---------------------- Generator Example (Filtering Items) ----------------------
// Step 4: Filtering items using a generator function
console.log("\nFiltering items with quantity greater than 50:");
const filteredItemsIterator = warehouse.filterGenerator(
  (item) => item.quantity > 50
); // Generator that filters items based on a condition

for (let item of filteredItemsIterator) {
  // Iterate over filtered items
  console.log(item); // Output items that meet the filtering condition
}

// ---------------------- Manual Iteration (for Custom Control) ----------------------
// Step 5: Manual iteration using the iterator interface
console.log("\nManually iterating over warehouse items:");

const manualIterator = warehouse[Symbol.iterator](); // Manually get the iterator for the warehouse

let result = manualIterator.next(); // Manually advance the iterator
while (!result.done) {
  // Keep going until `done` is true
  console.log(result.value); // Output the current item
  result = manualIterator.next(); // Move to the next item
}

// ---------------------- Simple Generator Resembling a State Machine ----------------
// A generator function that generates numbers between a start and end, and automatically restarts
function* stateMachineGenerator(start, end) {
  let current = start;

  while (true) {
    // Infinite loop to allow automatic restart
    if (current > end) {
      current = start; // Reset to the start value when exceeding the end value
    }
    yield current++; // Yield the current value and increment
  }
}

// Create a generator instance starting at 3 and ending at 6
const gen = stateMachineGenerator(3, 6);

console.log(
  "\nManually iterate using the next() method, simulating a state machine:"
);

// Manually iterate using the next() method, simulating a state machine
console.log(gen.next().value); // Output: 3 (starts from 3)
console.log(gen.next().value); // Output: 4
console.log(gen.next().value); // Output: 5
console.log(gen.next().value); // Output: 6
console.log(gen.next().value); // Output: 3 (automatically restarts from 3)
console.log(gen.next().value); // Output: 4
console.log(gen.next().value); // Output: 5
console.log(gen.next().value); // Output: 6 (reaches the end and restarts again)
console.log(gen.next().value); // Output: 3

/** Output:
 *  Iterating over all items using custom iterator:
    { id: 1, name: 'Laptop', quantity: 50 }
    { id: 2, name: 'Phone', quantity: 120 }
    { id: 3, name: 'Monitor', quantity: 30 }
    { id: 4, name: 'Tablet', quantity: 75 }
    { id: 5, name: 'Headphones', quantity: 200 }

    Processing items in batches of 2:
    Batch: [
    { id: 1, name: 'Laptop', quantity: 50 },
    { id: 2, name: 'Phone', quantity: 120 }
    ]
    Batch: [
    { id: 3, name: 'Monitor', quantity: 30 },
    { id: 4, name: 'Tablet', quantity: 75 }
    ]
    Batch: [ { id: 5, name: 'Headphones', quantity: 200 } ]

    Filtering items with quantity greater than 50:
    { id: 2, name: 'Phone', quantity: 120 }
    { id: 4, name: 'Tablet', quantity: 75 }
    { id: 5, name: 'Headphones', quantity: 200 }

    Manually iterating over warehouse items:
    { id: 1, name: 'Laptop', quantity: 50 }
    { id: 2, name: 'Phone', quantity: 120 }
    { id: 3, name: 'Monitor', quantity: 30 }
    { id: 4, name: 'Tablet', quantity: 75 }
    { id: 5, name: 'Headphones', quantity: 200 }

    Manually iterate using the next() method, simulating a state machine:
    3
    4
    5
    6
    3
    4
    5
    6
    3
 */
