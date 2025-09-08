// Banner slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}
// Initial display
showSlide(currentSlide);

// Auto slide every 4 seconds
setInterval(nextSlide, 4000);

// Show welcome message after page load
window.addEventListener('load', function() {
    const message = document.getElementById('welcome-message');
    if (message) {
        message.style.display = 'block';

        // Auto-hide after 8 seconds
        setTimeout(() => {
            message.style.display = 'none';
        }, 8000);
    }
});

// Manual close with X icon
const closeWelcome = document.getElementById('close-welcome');
if (closeWelcome) {
    closeWelcome.addEventListener('click', function() {
        const message = document.getElementById('welcome-message');
        if (message) {
            message.style.display = 'none';
        }
    });
}

//Toggle search box and Live Search functionality
const searchToggle = document.getElementById('search-toggle');
const searchBox = document.getElementById('search-box');
const searchInput = document.getElementById('search-input');
const searchResultsContainer = document.getElementById('search-results-container');

if (searchToggle && searchBox) {
    searchToggle.addEventListener('click', function(e) {
        e.preventDefault();
        searchBox.classList.add('active-search');
        searchInput.focus();
    });

    document.addEventListener('click', function(e) {
        // If the click is outside the search area, close the search box
        if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
            searchBox.classList.remove('active-search');
            searchResultsContainer.style.display = 'none';
        }
    });
}

// Sample product data
const products = [
    { id: 1, name: 'ফেসিয়াল ক্লিনজার', category: 'স্কিনকেয়ার', image: 'images/product1.jpg', price: 2000 },
    { id: 2, name: 'হাইড্রেটিং ময়েশ্চারাইজার', category: 'স্কিনকেয়ার', image: 'images/product2.jpg', price: 3500 },
    { id: 3, name: 'লিপস্টিক সেট', category: 'মেকআপ', image: 'images/product3.jpg', price: 1500 },
    { id: 4, name: 'মাস্কারা', category: 'মেকআপ', image: 'images/product4.jpg', price: 1200 },
    { id: 5, name: 'ডিপ কন্ডিশনার', category: 'হেয়ারকেয়ার', image: 'images/product5.jpg', price: 2200 },
    { id: 6, name: 'আইলাইনার', category: 'মেকআপ', image: 'images/product6.jpg', price: 950 },
    { id: 7, name: 'সানস্ক্রিন', category: 'স্কিনকেয়ার', image: 'images/product7.jpg', price: 1800 },
    { id: 8, name: 'সেটিং স্প্রে', category: 'মেকআপ', image: 'images/product8.jpg', price: 2500 },
];

if (searchToggle && searchBox && searchInput && searchResultsContainer) {
    // Toggle the search box visibility
    searchToggle.addEventListener('click', function(e) {
        e.preventDefault();
        searchBox.classList.toggle('show-search');
        // Clear previous results when the box is toggled off
        if (!searchBox.classList.contains('show-search')) {
            searchResultsContainer.style.display = 'none';
        }
    });

    // Live search functionality
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        searchResultsContainer.innerHTML = ''; // Clear previous results

        if (query.length > 1) { // Only search if more than one character is typed
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
            );

            if (filteredProducts.length > 0) {
                searchResultsContainer.style.display = 'block';
                filteredProducts.forEach(product => {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('search-result-item');
                    resultItem.dataset.id = product.id; // Store product ID for redirection
                    resultItem.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="search-product-details">
        <h4>${product.name}</h4>
        <p class="search-price">৳ ${product.price}</p>
    </div>
`;
                    searchResultsContainer.appendChild(resultItem);
                });
            } else {
                searchResultsContainer.style.display = 'none';
            }
        } else {
            searchResultsContainer.style.display = 'none';
        }
    });

    // Handle clicks on search results to redirect
    searchResultsContainer.addEventListener('click', function(e) {
        const clickedItem = e.target.closest('.search-result-item');
        if (clickedItem) {
            const productId = clickedItem.dataset.id;
            // Redirect to a product page. You can change this URL structure.
            window.location.href = `product.html?id=${productId}`;
        }
    });
}

// Scroll to contact section
const contactLink = document.querySelector('a[href="#contact-info"]');
const contactInfo = document.getElementById('contact-info');
if (contactLink && contactInfo) {
    contactLink.addEventListener('click', function(e) {
        e.preventDefault();
        contactInfo.scrollIntoView({ behavior: 'smooth' });
    });
}

// Functionality to open and close the chatbot
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotContainer = document.getElementById('chatbot-container');
const closeButton = document.getElementById('close-chatbot');

if (chatbotIcon && chatbotContainer && closeButton) {
    chatbotIcon.addEventListener('click', () => {
        chatbotContainer.style.display = 'flex';
        chatbotIcon.style.display = 'none';
    });
    
    closeButton.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
        chatbotIcon.style.display = 'flex';
    });

    // Functionality to handle user messages
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatbotBody = document.getElementById('chatbot-body');

    // Function to add a message to the chatbot body
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        if (isUser) {
            messageDiv.classList.add('user-message');
            messageDiv.innerHTML = `<p>${text}</p>`;
        } else {
            messageDiv.classList.add('bot-message');
            messageDiv.innerHTML = `<div class="bot-avatar"><i class="fas fa-user-circle"></i></div><p>${text}</p>`;
        }
        chatbotBody.appendChild(messageDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight; // Auto-scroll to the bottom
    }

    // Function to get a bot response
    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase().trim();
        if (userMessage.includes("hello") || userMessage.includes("hi")) {
            return "Hello there! I'm Sultana, your beauty assistant. How can I help you today? Try asking about skincare tips or makeup products.";
        } else if (userMessage.includes("skincare tips") || userMessage.includes("skin care")) {
            return "For glowing skin, remember to cleanse, moisturize, and use sunscreen daily. Don't forget to drink plenty of water!";
        } else if (userMessage.includes("makeup tips") || userMessage.includes("make up")) {
            return "Start with a clean, moisturized face. Use a primer to make your makeup last longer, and blend your foundation well for a flawless look.";
        } else if (userMessage.includes("hair care") || userMessage.includes("hair")) {
            return "Regular oiling and using a good quality shampoo and conditioner are key. Also, try to use a heat protectant before styling your hair.";
        } else if (userMessage.includes("products")) {
            return "We have a wide range of makeup, skincare, and hair products. Which category are you interested in?";
        } else if (userMessage.includes("shipping") || userMessage.includes("delivery")) {
            return "Our shipping process usually takes 3-5 business days. Would you like to know more about our policy?";
        } else if (userMessage.includes("Sadiya") || userMessage.includes("Sadia")) {
            return "আপনি কি Sadia সম্পর্কে জানতে চাইছেন? 😊 তিনি আমাদের Marketing & Social Media Shop Manager।  আপনার অর্ডার, অফার বা যে কোনো তথ্যের জন্য Sadia আপনাকে সাহায্য করবেন।👉 Facebook Page বা WhatsApp-এ নক করুন।?";
        } else if (userMessage.includes("thank")) {
            return "You're most welcome! I'm happy to help. Is there anything else you'd like to know?";
        } else {
            return "I'm still learning! Could you please ask about beauty tips, products, or shipping information?";
        }
    }

    // Event listener for sending a message
    sendButton.addEventListener('click', () => {
        const messageText = userInput.value;
        if (messageText.trim() === '') return;

        addMessage(messageText, true);
        userInput.value = '';

        setTimeout(() => {
            const botResponse = getBotResponse(messageText);
            addMessage(botResponse, false);
        }, 1000);
    });

    // Allow sending messages with 'Enter' key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
    // Countdown Timer Logic
const countdown = document.getElementById('countdown-timer');

if (countdown) {
    // Set the opening date to 30 days from now
    // Set a fixed end date for the countdown
// Format: "Month Day, Year HH:MM:SS"
const openDate = new Date();
openDate.setDate(openDate.getDate() + 46);

    const countdownFunction = setInterval(() => {
        const today = new Date().getTime();
        const distance = openDate - today;

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById('countdown-timer').innerHTML = "<h2>We're Open! Shop Now!</h2>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

    }, 1000);
}

}

