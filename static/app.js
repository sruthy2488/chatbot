async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const userMessage = userInput.value.trim();

    if (userMessage === "") return; // Don't send empty messages

    // Display the user message
    displayMessage(userMessage, "user-message");

    // Clear input field
    userInput.value = "";

    // Show loading indicator
    displayMessage("Typing...", "bot-message", true);

    // Send user message to backend
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });
        const data = await response.json();

        // Remove loading indicator and display bot response
        removeLoadingIndicator();
        displayMessage(data.response, "bot-message");
    } catch (error) {
        removeLoadingIndicator();
        displayMessage("Error: Could not connect to the server.", "bot-message");
    }
}

function displayMessage(message, className, isTemporary = false) {
    const messagesDiv = document.getElementById("messages");
    const messageParagraph = document.createElement("p");
    messageParagraph.className = `message ${className}`;
    messageParagraph.textContent = message;

    messagesDiv.appendChild(messageParagraph);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the latest message

    if (isTemporary) messageParagraph.classList.add("loading-indicator");
}

function removeLoadingIndicator() {
    const loadingIndicator = document.querySelector(".loading-indicator");
    if (loadingIndicator) loadingIndicator.remove();
}

// Send message on Enter key press
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});
