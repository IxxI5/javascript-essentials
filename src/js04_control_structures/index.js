// index.js
// Control Structures (if, else, switch, for, while, do-while)

// Number Guessing Game
// Function to generate a random number between 1 and 10
function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

// Function to start the guessing game
function startGame() {
  const randomNumber = generateRandomNumber(); // Random number to guess
  let guess; // User's guess
  let attempts = 0; // Number of attempts
  const maxAttempts = 5; // Maximum number of attempts
  const closeRange = 2; // Define a range to be considered "close"

  // Use a do-while loop to ensure the user gets at least one attempt
  let isGuessedCorrectly = false;
  let attemptCount = 0;

  do {
    // Simulate the user input with an array of guesses
    const simulatedGuesses = [1, 3, 5, 7, 9]; // Example guesses
    guess = simulatedGuesses[attemptCount];
    attemptCount++;

    // Check if the guess is valid (within the expected range)
    if (guess < 1 || guess > 10) {
      console.log("Guess must be between 1 and 10.");
      continue; // Skip to the next iteration if guess is invalid
    }

    // Check if the guess is correct
    if (guess === randomNumber) {
      isGuessedCorrectly = true;
    }

    // Use a switch statement to provide feedback based on the guess
    switch (true) {
      case guess === randomNumber:
        console.log(`Correct! The number was ${randomNumber}.`);
        break;
      case Math.abs(guess - randomNumber) <= closeRange:
        console.log(`So close! The number was ${randomNumber}.`);
        break;
      default:
        console.log(`Incorrect guess: ${guess}.`);
        break;
    }

    attempts++;

    // Use a switch statement to provide feedback based on the number of attempts
    switch (true) {
      case isGuessedCorrectly:
        console.log(`You guessed correctly in ${attempts} attempt(s).`);
        break;
      case attempts < maxAttempts:
        console.log(`You have ${maxAttempts - attempts} attempt(s) left.`);
        break;
      default:
        console.log("No more attempts left.");
        break;
    }
  } while (attempts < maxAttempts && !isGuessedCorrectly); // Continue until the max attempts or correct guess

  // Final message based on whether the user guessed correctly or not
  if (!isGuessedCorrectly) {
    console.log(`Game over. The correct number was ${randomNumber}.`);
  }
}

// Start the game
startGame();

/** Output:
 *  So close! The number was 2.
    You have 4 attempt(s) left.
    So close! The number was 2.
    You have 3 attempt(s) left.
    Incorrect guess: 5.
    You have 2 attempt(s) left.
    Incorrect guess: 7.
    You have 1 attempt(s) left.
    Incorrect guess: 9.
    No more attempts left.
    Game over. The correct number was 2.
 */
