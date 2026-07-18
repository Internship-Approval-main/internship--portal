// chatbot.js
// If you are using a Python script or C file for your chatbot, you can invoke it here using child_process.
// For now, here is a clean JavaScript baseline:

function getBotResponse(userMessage) {
    const text = userMessage.toLowerCase().trim();
    
    if (text.includes("hello") || text.includes("hi")) {
        return "Hello! I am your internship portal assistant. How can I help you today?";
    }
    if (text.includes("status") || text.includes("approval")) {
        return "You can check your internship application status on the 'Internship Status' page in the dashboard.";
    }
    if (text.includes("form") || text.includes("apply")) {
        return "Please fill out the form under the Internship Form section with your company details, role, and manager's email.";
    }
    
    return "I'm here to help with your internship portal queries! Could you please rephrase that?";
}

module.exports = { getBotResponse };