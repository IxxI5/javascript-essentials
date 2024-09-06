// index.js
// Type Coercion and Conversion (Implicit and Explicit)
// A simple user registration system example.

// Simulating user input
let userInputAge = "25"; // Age as a string
let userInputHeight = 180; // Height as a number
let userInputIsAdmin = "true"; // Admin status as a string
let userInputEmail = "user@example.com"; // Email as a string

// 1. Implicit Type Coercion
console.log("Implicit Type Coercion:");

// Implicit conversion during arithmetic operations
let totalAge = userInputAge + 5; // "25" + 5 => "255"
console.log(`Total Age: ${totalAge}`); // Outputs: Total Age: 255

// Implicit conversion in comparisons
let isEqualAge = userInputAge == 25; // "25" == 25 => true (loose equality)
console.log(`Is age equal to 25? ${isEqualAge}`); // Outputs: Is age equal to 25? true

let isNotEqualHeight = userInputHeight != "180"; // 180 != "180" => false (loose equality)
console.log(`Is height not equal to "180"? ${isNotEqualHeight}`); // Outputs: Is height not equal to "180"? false

// Type coercion in Boolean context
let isUserAdmin = userInputIsAdmin == true; // "true" == true => false (loose equality)
console.log(`Is user an admin? ${isUserAdmin}`); // Outputs: Is user an admin? false

// 2. Explicit Type Conversion
console.log("\nExplicit Type Conversion:");

// Convert string to number
let ageNumber = Number(userInputAge); // Convert "25" to 25
let totalAgeExplicit = ageNumber + 5; // 25 + 5 => 30
console.log(`Total Age (explicit conversion): ${totalAgeExplicit}`); // Outputs: Total Age (explicit conversion): 30

// Convert number to string
let heightString = String(userInputHeight); // Convert 180 to "180"
let combinedInfo = "Height: " + heightString; // "Height: " + "180" => "Height: 180"
console.log(combinedInfo); // Outputs: Height: 180

// Convert string to Boolean
let isAdminBoolean = userInputIsAdmin === "true"; // Strict equality check
console.log(`Is user an admin (explicit conversion): ${isAdminBoolean}`); // Outputs: Is user an admin (explicit conversion): true

// Convert Boolean to string
let isAdminString = String(isAdminBoolean); // Convert true to "true"
console.log(`Is user an admin (as string): ${isAdminString}`); // Outputs: Is user an admin (as string): true

// Convert number to Boolean
let heightBoolean = Boolean(userInputHeight); // Convert 180 to true (non-zero number is true)
console.log(`Is height non-zero? ${heightBoolean}`); // Outputs: Is height non-zero? true

/** Output:
 *  Implicit Type Coercion:
    Total Age: 255
    Is age equal to 25? true
    Is height not equal to "180"? false
    Is user an admin? false

    Explicit Type Conversion:
    Total Age (explicit conversion): 30
    Height: 180
    Is user an admin (explicit conversion): true
    Is user an admin (as string): true
    Is height non-zero? true
 * 
 */
