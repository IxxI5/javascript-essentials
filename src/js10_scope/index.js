// index.js
// Scope (Global, Function, Block)
// Scope demonstration example

// Global Scope
const globalVariable = "I am a global variable";

function demonstrateScopes() {
  // Function Scope
  const functionVariable = "I am a function variable";

  console.log("Inside function:");
  console.log(globalVariable); // Accessible
  console.log(functionVariable); // Accessible

  if (true) {
    // Block Scope
    let blockVariable = "I am a block variable";
    const blockConstant = "I am a block constant";

    console.log("Inside block:");
    console.log(globalVariable); // Accessible
    console.log(functionVariable); // Accessible
    console.log(blockVariable); // Accessible
    console.log(blockConstant); // Accessible
  }

  // Trying to access block-scoped variables outside the block
  console.log("Outside block, but inside function:");
  console.log(globalVariable); // Accessible
  console.log(functionVariable); // Accessible
  try {
    console.log(blockVariable); // Error: blockVariable is not defined
  } catch (error) {
    console.log("Error:", error.message);
  }
  try {
    console.log(blockConstant); // Error: blockConstant is not defined
  } catch (error) {
    console.log("Error:", error.message);
  }
}

// Call the function to demonstrate scope behavior
demonstrateScopes();

// Trying to access function-scoped variable outside the function
console.log("Outside function:");
console.log(globalVariable); // Accessible
try {
  console.log(functionVariable); // Error: functionVariable is not defined
} catch (error) {
  console.log("Error:", error.message);
}

/** Output:
 *  Inside function:
    I am a global variable
    I am a function variable
    Inside block:
    I am a global variable
    I am a function variable
    I am a block variable
    I am a block constant
    Outside block, but inside function:
    I am a global variable
    I am a function variable
    Error: blockVariable is not defined
    Error: blockConstant is not defined
    Outside function:
    I am a global variable
    Error: functionVariable is not defined
 */
