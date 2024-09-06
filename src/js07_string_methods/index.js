// index.js
// String Methods (concat, split, replace, match, search, trim)
// A simple text-processing utility example

// Sample user feedback text
const feedback =
  "   This is an amazing product! I have been using it for months. The only issue is that the battery life could be better.   ";

// Step 1: Trim the whitespace from the beginning and end of the string
const trimmedFeedback = feedback.trim();
console.log("Trimmed Feedback:", trimmedFeedback);

// Step 2: Replace "amazing" with "fantastic" to improve the tone
const updatedFeedback = trimmedFeedback.replace("amazing", "fantastic");
console.log("Updated Feedback:", updatedFeedback);

// Step 3: Split the feedback into words
const words = updatedFeedback.split(" ");
console.log("Words:", words);

// Step 4: Search for the keyword "battery" in the feedback
const batteryIndex = updatedFeedback.search("battery");
console.log("Index of 'battery':", batteryIndex);

// Step 5: Match all words that are longer than 3 characters
const longWords = updatedFeedback.match(/\b\w{4,}\b/g);
console.log("Long Words:", longWords);

// Step 6: Concatenate a follow-up message to the feedback
const followUpMessage =
  "Thank you for your feedback! We will look into the battery issue.";
const completeMessage = updatedFeedback.concat(" ", followUpMessage);
console.log("Complete Message:", completeMessage);

// Step 7: Extract a substring (for example, extracting the issue part)
const issuePart = updatedFeedback.substring(
  updatedFeedback.indexOf("issue"),
  updatedFeedback.length
);
console.log("Issue Part:", issuePart);

// Step 8: Find the number of occurrences of the word "product"
const productCount = (updatedFeedback.match(/product/g) || []).length;
console.log("Number of occurrences of 'product':", productCount);

/** Output:
 *  Trimmed Feedback: This is an amazing product! I have been using it for months. The only issue is that the battery life could be better.
    Updated Feedback: This is an fantastic product! I have been using it for months. The only issue is that the battery life could be better.
    Words: [
    'This',      'is',       'an',
    'fantastic', 'product!', 'I',
    'have',      'been',     'using',
    'it',        'for',      'months.',
    'The',       'only',     'issue',
    'is',        'that',     'the',
    'battery',   'life',     'could',
    'be',        'better.'
    ]
    Index of 'battery': 90
    Long Words: [
    'This',    'fantastic',
    'product', 'have',
    'been',    'using',
    'months',  'only',
    'issue',   'that',
    'battery', 'life',
    'could',   'better'
    ]
    Complete Message: This is an fantastic product! I have been using it for months. The only issue is that the battery life could be better. Thank you for your feedback! We 
    will look into the battery issue.
    Issue Part: issue is that the battery life could be better.
    Number of occurrences of 'product': 1
 */
