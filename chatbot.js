// ==========================================
// LUNE LOUNGE AI CHATBOT ASSISTANT
// ==========================================

// Business Knowledge Base
const businessKnowledge = {
    name: "Lune Lounge",
    location: "Al Wasl Rd, Jumeirah 2, Dubai, UAE",
    phone: "+971 4 223 9544",
    email: "info@lunelounge.ae",
    hours: "Open Daily - Closes at 3:00 AM",
    website: "www.lunelounge.ae",
    
    about: "Lune Lounge is Dubai's premier destination for exceptional coffee and exquisite dining with breathtaking views of the iconic Burj Khalifa, located in the heart of Jumeirah.",
    
    services: [
        "Dine-In with stunning views",
        "Drive-Through service",
        "Delivery to your home",
        "Rooftop Dining with Burj Khalifa views"
    ],
    
    specialties: [
        "Cortado Colombiano - Rich Colombian coffee with silky milk foam",
        "Classic Tiramisu - Traditional Italian dessert",
        "Crème Brûlée - Smooth custard with crispy caramelized top",
        "Iced Kymex - Chilled pour-over coffee perfection",
        "Rose Latte - Aromatic latte with delicate rose essence",
        "Cappuccino - Classic Italian coffee with perfect foam ratio"
    ],
    
    price_range: "AED 50 - 100 per person",
    
    highlights: [
        "Premium Quality Coffee",
        "Artisan-Crafted Desserts",
        "Stunning City Views",
        "Welcoming Staff",
        "Multiple Service Options"
    ],
    
    faqs: {
        "Can I make a reservation?": "Yes! We accept reservations. You can call us at +971 4 223 9544 or use our website to book a table. We recommend reserving in advance, especially for peak hours.",
        "Do you have a dress code?": "Lune Lounge maintains a smart casual dress code. We want our guests to enjoy a sophisticated atmosphere.",
        "Can I host events?": "Absolutely! We offer private dining and event hosting for special occasions. Please contact us via phone or email for details.",
        "Is parking available?": "Yes, we have convenient parking available for our guests.",
        "Do you offer WiFi?": "Yes, complimentary high-speed WiFi is available throughout the venue.",
        "Are there vegetarian options?": "Yes, we offer a variety of vegetarian and vegan options. Please let us know your preferences.",
        "Can I order for delivery?": "Yes! We offer delivery service. You can place orders through our website or by calling us.",
        "Do you accommodate dietary restrictions?": "Of course! Please inform us about any dietary restrictions, and our team will be happy to accommodate you.",
        "What is your cancellation policy?": "Cancellations must be made at least 2 hours in advance. Please call us at +971 4 223 9544.",
        "Do you offer group discounts?": "Yes, for large groups we offer special rates. Contact us to discuss your requirements."
    }
};

// Chatbot State
let chatbotState = {
    isOpen: false,
    userInfo: {
        name: null,
        email: null,
        phone: null,
        date: null,
        time: null,
        guests: null
    },
    conversationPhase: "greeting"
};

// Initialize Chatbot
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('chatbotClose');
    const input = document.getElementById('chatbotInput');

    toggle.addEventListener('click', toggleChatbot);
    closeBtn.addEventListener('click', toggleChatbot);

    // Hide notification after user interaction
    setTimeout(() => {
        const badge = document.getElementById('notificationBadge');
        if (badge) badge.style.display = 'none';
    }, 3000);
});

// Toggle Chatbot Window
function toggleChatbot() {
    const window = document.getElementById('chatbotWindow');
    window.classList.toggle('active');
    chatbotState.isOpen = !chatbotState.isOpen;
    
    if (chatbotState.isOpen) {
        document.getElementById('chatbotInput').focus();
    }
}

// Handle Enter Key
function handleChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Send Message
function sendMessage(message = null) {
    const input = document.getElementById('chatbotInput');
    const userMessage = message || input.value.trim();

    if (!userMessage) return;

    // Display user message
    displayMessage(userMessage, 'user');
    input.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Get AI response with delay for natural feel
    setTimeout(() => {
        removeTypingIndicator();
        const aiResponse = generateAIResponse(userMessage);
        displayMessage(aiResponse.text, 'bot', aiResponse.options);
    }, 600 + Math.random() * 400);
}

// Display Message
function displayMessage(text, sender, options = null) {
    const messagesContainer = document.getElementById('chatbotMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = text;
    
    messageDiv.appendChild(contentDiv);
    
    // Add quick options if provided
    if (options && options.length > 0) {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'quick-options';
        
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'quick-btn';
            btn.textContent = option;
            btn.onclick = () => sendMessage(option);
            optionsDiv.appendChild(btn);
        });
        
        contentDiv.appendChild(optionsDiv);
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show Typing Indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `
        <div class="typing-indicator">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>
    `;
    
    typingDiv.appendChild(contentDiv);
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Remove Typing Indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

// Generate AI Response
function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Greeting & Pleasantries
    if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i)) {
        return {
            text: `Hello! 👋 Welcome to Lune Lounge. I'm your AI assistant. How can I help you today? I can help with:
            <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                <li>📅 Making reservations</li>
                <li>🍰 Menu information</li>
                <li>📍 Location & hours</li>
                <li>❓ FAQs</li>
                <li>📞 Contact information</li>
            </ul>`,
            options: ['Make a Reservation', 'Tell me about the Menu', 'Hours & Location', 'FAQs']
        };
    }

    // Reservation Requests
    if (message.match(/reservation|booking|book|reserve|table for/i)) {
        return {
            text: `Perfect! I'd be happy to help you make a reservation at Lune Lounge. 📅<br><br>To secure your table, I'll need a few details:
            <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                <li>📅 Your preferred date</li>
                <li>⏰ Your preferred time</li>
                <li>👥 Number of guests</li>
                <li>📧 Your contact information</li>
            </ul><br>Or you can call us directly at <strong>+971 4 223 9544</strong> for immediate booking.`,
            options: ['Provide Details Now', 'Call for Booking', 'Back to Menu']
        };
    }

    // Menu Information
    if (message.match(/menu|food|drink|coffee|dessert|specialty|what.*serve|order/i)) {
        const specialties = businessKnowledge.specialties
            .map(s => `<li>☕ ${s}</li>`)
            .join('');
        
        return {
            text: `Our featured specialties at Lune Lounge are absolutely delicious! 🍰☕<br><br>
            <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">${specialties}</ul><br>
            We also offer a complete menu with premium coffee, artisan desserts, and innovative beverages. Price range: <strong>${businessKnowledge.price_range}</strong>`,
            options: ['Make a Reservation', 'More About Coffee', 'Dietary Requirements']
        };
    }

    // Location & Hours
    if (message.match(/location|address|where|hours|time|open|close|timing/i)) {
        return {
            text: `📍 <strong>Location:</strong> ${businessKnowledge.location}<br>
            ⏰ <strong>Hours:</strong> ${businessKnowledge.hours}<br>
            📞 <strong>Phone:</strong> ${businessKnowledge.phone}<br>
            🌐 <strong>Website:</strong> ${businessKnowledge.website}<br><br>
            We're conveniently located in Jumeirah with stunning Burj Khalifa views! We'd love to see you soon.`,
            options: ['Make a Reservation', 'Get Directions', 'Contact Us']
        };
    }

    // Services
    if (message.match(/services|facilities|what.*offer|dine-in|delivery|drive-through|rooftop/i)) {
        const services = businessKnowledge.services
            .map(s => `<li>✨ ${s}</li>`)
            .join('');
        
        return {
            text: `We offer multiple services to ensure your comfort:<br>
            <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">${services}</ul><br>
            Choose the perfect service option for your occasion!`,
            options: ['Make a Reservation', 'Menu Info', 'Contact Us']
        };
    }

    // About Lune Lounge
    if (message.match(/about|who|company|what.*lune|why.*lune/i)) {
        return {
            text: `About Lune Lounge 🌙<br><br>
            ${businessKnowledge.about}<br><br>
            ✨ Our highlights:<br>
            <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
            ${businessKnowledge.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>`,
            options: ['Make a Reservation', 'See Our Services', 'Contact Us']
        };
    }

    // FAQs
    if (message.match(/faq|question|help|discount|vegetarian|wifi|parking|dress|event|dietary|cancellation/i)) {
        const faqKeys = Object.keys(businessKnowledge.faqs);
        let answerFound = false;
        
        for (let key of faqKeys) {
            if (message.match(new RegExp(key.replace(/\?/, ''), 'i'))) {
                return {
                    text: `<strong>Q: ${key}</strong><br><br>A: ${businessKnowledge.faqs[key]}`,
                    options: ['More FAQs', 'Make a Reservation', 'Contact Us']
                };
            }
        }

        // If no specific match, show FAQ options
        return {
            text: `Great question! Here are our common FAQs:<br><br>What would you like to know?`,
            options: Object.keys(businessKnowledge.faqs).slice(0, 4)
        };
    }

    // Contact Information
    if (message.match(/contact|call|phone|email|reach|get in touch/i)) {
        return {
            text: `📞 <strong>Contact Information:</strong><br><br>
            ☎️ Phone: <strong>${businessKnowledge.phone}</strong><br>
            📧 Email: <strong>${businessKnowledge.email}</strong><br>
            📍 Address: <strong>${businessKnowledge.location}</strong><br><br>
            Feel free to reach out anytime! We're here to help.`,
            options: ['Make a Reservation', 'Hours & Location', 'Back to Menu']
        };
    }

    // Default Response with AI-like intelligence
    return {
        text: `That's a great question! 🤔 While I'm expertly trained in all things Lune Lounge, I want to make sure I give you the most accurate information about that topic.<br><br>For detailed assistance, I recommend:<br>
        <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
            <li>📞 Calling us at <strong>${businessKnowledge.phone}</strong></li>
            <li>📧 Emailing: <strong>${businessKnowledge.email}</strong></li>
            <li>🌐 Visiting: <strong>${businessKnowledge.website}</strong></li>
        </ul><br>Our team is standing by to assist you!`,
        options: ['Make a Reservation', 'FAQs', 'Contact Us']
    };
}

// Sentiment Analysis for Professional Conversation
function analyzeSentiment(message) {
    if (message.match(/thank|thanks|appreciate|grateful|excellent|great|awesome|love|amazing/i)) {
        return 'positive';
    }
    if (message.match(/bad|terrible|awful|hate|worst|disappointed|upset|angry/i)) {
        return 'negative';
    }
    return 'neutral';
}

// Professional Closing Message
function generateClosingMessage() {
    return `Thank you for chatting with us! We look forward to welcoming you very soon. Have a wonderful day! 🌙✨`;
}

// Add Professional Touch
console.log('%c🤖 Lune Lounge AI Assistant Active', 'color: #d4a574; font-size: 14px; font-weight: bold;');
console.log('%cPowered by Advanced Conversational AI', 'color: #2c1810; font-size: 12px;');