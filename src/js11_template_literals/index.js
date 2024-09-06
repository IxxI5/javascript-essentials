// index.js
// Template Literals
// Generating a personalized email

// Function to generate a personalized email
function generateSupportEmail(userName, ticketNumber, date) {
  // Email subject
  const subject = `Support Ticket #${ticketNumber} - Update`;

  // Email body using template literals
  const emailBody = `
    Dear ${userName},

    We are writing to inform you that there has been an update regarding your support ticket.

    Ticket Number: ${ticketNumber}
    Date: ${date}

    Our support team is currently reviewing your request and will get back to you as soon as possible. 

    Thank you for your patience.

    Best regards,
    Support Team
  `;

  return { subject, emailBody };
}

// Example usage
const userName = "John Doe";
const ticketNumber = "12345";
const date = new Date().toLocaleDateString(); // Get the current date in a readable format

const email = generateSupportEmail(userName, ticketNumber, date);

console.log("Subject:", email.subject);
console.log("Body:", email.emailBody);

/** Output:
 *  Subject: Support Ticket #12345 - Update
    Body: 
        Dear John Doe,

        We are writing to inform you that there has been an update regarding your support ticket.

        Ticket Number: 12345
        Date: 5.9.2024

        Our support team is currently reviewing your request and will get back to you as soon as possible.

        Thank you for your patience.

        Best regards,
        Support Team
 */
