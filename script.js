const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < 65; i++) {
    particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.2
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#d4af37";
        ctx.globalAlpha = 0.6;
        ctx.fill();

        p.y -= p.speed;

        if (p.y < 0) {
            p.y = canvas.height;
            p.x = Math.random() * canvas.width;
        }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
}

animate();
// Typing Animation

const words = [
    "Future Software Developer",
    "Web Developer",
    "Tech Enthusiast",
    "Creative Programmer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing-text");

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {
        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {
        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();
// Live Digital Clock

function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true
    });

    document.getElementById("clock").textContent = time;
}

updateClock();
setInterval(updateClock, 1000);
// NA AI Chatbot Toggle

const aiToggle = document.getElementById("ai-toggle");
const aiWidget = document.getElementById("ai-widget");
const aiClose = document.getElementById("ai-close");

aiToggle.addEventListener("click", () => {
    aiWidget.classList.toggle("open");
});

aiClose.addEventListener("click", () => {
    aiWidget.classList.remove("open");
});
// NA AI ADVANCED CHAT SYSTEM

const naInput = document.getElementById("ai-input");
const naSend = document.getElementById("ai-send");
const naChat = document.getElementById("ai-chat-box");
const naClear = document.getElementById("ai-clear");

const STORAGE_KEY = "naAIChatHistory";

let naMessages = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "null"
) || [
    {
        text: "Hello! I'm NA AI. How can I help you today?",
        sender: "bot",
        time: new Date().toLocaleTimeString()
    }
];

// Save chat history
function naSaveChat() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(naMessages)
    );
}

// Display messages
function naRenderChat() {

    naChat.innerHTML = "";

    naMessages.forEach(message => {

        const div = document.createElement("div");

        div.className = message.sender === "user"
            ? "ai-user-message"
            : "ai-bot-message";

        const text = document.createElement("span");
        text.textContent = message.text;

        const time = document.createElement("small");
        time.className = "ai-timestamp";
        time.textContent = message.time;

        div.appendChild(text);
        div.appendChild(time);

        naChat.appendChild(div);

    });

    naChat.scrollTop = naChat.scrollHeight;
}

// Add a message
function naAddMessage(message, sender) {

    naMessages.push({
        text: message,
        sender: sender,
        time: new Date().toLocaleTimeString()
    });

    naSaveChat();
    naRenderChat();
}

// Chatbot responses
function naGetResponse(message) {

    const text = message.toLowerCase();

    if (/\b(hi|hello|hey)\b/.test(text))
        return "Hello! Welcome back to NA AI!";

    if (text.includes("your name"))
        return "I'm NA AI, created by Nawajish Ali!";

    if (text.includes("who is nawajish"))
        return "Nawajish Ali is an aspiring developer passionate about technology!";

    if (text.includes("html"))
        return "HTML creates the structure of websites.";

    if (text.includes("css"))
        return "CSS makes websites beautiful with colours and animations.";

    if (text.includes("javascript"))
        return "JavaScript makes websites interactive!";

    if (text.includes("portfolio"))
        return "You're exploring Nawajish Ali's developer portfolio!";

    if (text.includes("time"))
        return "Current time: " + new Date().toLocaleTimeString();

    if (text.includes("thank"))
        return "You're welcome! Happy coding!";

    if (text.includes("bye"))
        return "Goodbye! Keep learning and creating!";

    return "Interesting question! I'm still learning. Try asking me about HTML, CSS or JavaScript.";
}

// Typing animation
function naShowTyping() {

    const typing = document.createElement("div");

    typing.className = "ai-bot-message ai-typing";

    typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    naChat.appendChild(typing);

    naChat.scrollTop = naChat.scrollHeight;

    return typing;
}

// Send message
function naSendMessage() {

    const message = naInput.value.trim();

    if (!message) return;

    naAddMessage(message, "user");

    naInput.value = "";

    const typing = naShowTyping();

    setTimeout(() => {

        typing.remove();

        const response = naGetResponse(message);

        naAddMessage(response, "bot");

    }, 1000);
}

// Send button
naSend.addEventListener("click", naSendMessage);

// Enter key
naInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        naSendMessage();
    }

});

// Clear conversation
naClear.addEventListener("click", () => {

    naMessages = [
        {
            text: "Hello! I'm NA AI. How can I help you today?",
            sender: "bot",
            time: new Date().toLocaleTimeString()
        }
    ];

    naSaveChat();
    naRenderChat();

});

// Load saved messages
naRenderChat();

// Display chat messages
function naAddMessage(message, sender) {
    const div = document.createElement("div");

    div.className = sender === "user"
        ? "ai-user-message"
        : "ai-bot-message";

    div.textContent = message;

    naChat.appendChild(div);
    naChat.scrollTop = naChat.scrollHeight;
}

// Generate responses
function naGetResponse(message) {
    const text = message.toLowerCase();

    if (/\b(hi|hello|hey)\b/.test(text)) {
        return "Hello! Welcome to NA AI. How can I help you?";
    }

    if (text.includes("your name")) {
        return "I'm NA AI, created by Nawajish Ali!";
    }

    if (text.includes("who is nawajish")) {
        return "Nawajish Ali is an aspiring developer who loves technology and creating websites!";
    }

    if (text.includes("html")) {
        return "HTML creates the structure of websites.";
    }

    if (text.includes("css")) {
        return "CSS makes websites beautiful with colours, layouts and animations.";
    }

    if (text.includes("javascript")) {
        return "JavaScript makes websites interactive!";
    }

    if (text.includes("portfolio")) {
        return "You're currently exploring Nawajish Ali's developer portfolio!";
    }

    if (text.includes("thank")) {
        return "You're welcome! Keep exploring!";
    }

    if (text.includes("bye")) {
        return "Goodbye! Have a wonderful day!";
    }

    return "That's an interesting question! I'm still learning. Try asking me about HTML, CSS or JavaScript.";
}

// Send message
function naSendMessage() {
    const message = naInput.value.trim();

    if (!message) return;

    naAddMessage(message, "user");

    naInput.value = "";

    const typing = document.createElement("div");
    typing.className = "ai-bot-message";
    typing.textContent = "NA AI is typing...";

    naChat.appendChild(typing);

    naChat.scrollTop = naChat.scrollHeight;

    setTimeout(() => {
        typing.remove();

        const reply = naGetResponse(message);

        naAddMessage(reply, "bot");
    }, 800);
}

// Send button
naSend.addEventListener("click", naSendMessage);

// Enter key
naInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        naSendMessage();
    }
});
// NA Premium Page Loader

window.addEventListener("load", function () {
    const loader = document.getElementById("page-loader");

    if (loader) {
        setTimeout(function () {
            loader.classList.add("loader-hidden");
        }, 1200);
    }
});
// ===== GOLDEN CUSTOM CURSOR =====

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (cursorDot && cursorOutline) {
    document.addEventListener("mousemove", function (e) {
        cursorDot.style.left = e.clientX + "px";
        cursorDot.style.top = e.clientY + "px";

        cursorOutline.style.left = e.clientX + "px";
        cursorOutline.style.top = e.clientY + "px";
    });

    document.querySelectorAll("a, button").forEach(function (element) {
        element.addEventListener("mouseenter", function () {
            cursorOutline.style.width = "45px";
            cursorOutline.style.height = "45px";
        });

        element.addEventListener("mouseleave", function () {
            cursorOutline.style.width = "32px";
            cursorOutline.style.height = "32px";
        });
    });
}
// ===== 3D PROJECT CARD TILT =====

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });

});
// ===== SCROLL REVEAL ANIMATION =====

const revealElements = document.querySelectorAll(
    ".about, .skill-card, .project-card, .contact"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});
// ===== SKILLS SCROLL ANIMATION =====

const skillsSection = document.querySelector("#skills");

if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillsSection.classList.add("skills-visible");
                skillsObserver.unobserve(skillsSection);
            }
        });
    }, {
        threshold: 0.3
    });

    skillsObserver.observe(skillsSection);
}