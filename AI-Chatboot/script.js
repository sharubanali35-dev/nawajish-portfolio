const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const clearBtn = document.getElementById("clear-btn");

// Display messages
function addMessage(message, sender) {
    const messageDiv = document.createElement("div");

    messageDiv.className =
        sender === "user" ? "user-message" : "bot-message";

    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Generate chatbot responses
function getBotResponse(message) {
    const text = message.toLowerCase().trim();

    if (/\b(hi|hello|hey)\b/.test(text)) {
        return "Hello! Welcome to NA AI. How can I help you?";
    }

    if (text.includes("your name")) {
        return "My name is NA AI, created by Nawajish Ali!";
    }

    if (text.includes("html")) {
        return "HTML is used to create the structure of websites.";
    }

    if (text.includes("css")) {
        return "CSS is used to style websites with colours, layouts and animations.";
    }

    if (text.includes("javascript")) {
        return "JavaScript makes websites interactive!";
    }

    if (text.includes("time")) {
        return "The current time is " +
            new Date().toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata"
            });
    }

    if (text.includes("date")) {
        return "Today's date is " +
            new Date().toLocaleDateString("en-IN", {
                timeZone: "Asia/Kolkata"
            });
    }

    if (text.includes("thank")) {
        return "You're welcome! Happy coding!";
    }

    if (text.includes("bye")) {
        return "Goodbye! Keep learning and creating!";
    }

    return "That's an interesting question! I'm still learning, so I don't know the answer yet.";
}

// Send a message
function sendMessage() {
    const message = userInput.value.trim();

    if (message === "") return;

    addMessage(message, "user");

    userInput.value = "";

    // Show typing indicator
    const typing = document.createElement("div");
    typing.className = "bot-message";
    typing.textContent = "NA AI is typing...";

    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        typing.remove();

        const response = getBotResponse(message);
        addMessage(response, "bot");
    }, 800);
}

// Send button
sendBtn.addEventListener("click", sendMessage);

// Enter key
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Clear conversation
clearBtn.addEventListener("click", () => {
    chatBox.innerHTML = "";
    addMessage("Hello! I'm NA AI. How can I help you today?", "bot");
});