// --- Countdown Timer ---
const countdown = document.getElementById('countdown-timer');

if (countdown) {
    const countdownEndDateKey = 'countdownEndDate';
    let countdownEndDate = localStorage.getItem(countdownEndDateKey);

    // Check if the end date is already in localStorage
    if (!countdownEndDate) {
        // If not, set a new date (today + 46 days) and save it
        const openDate = new Date();
        openDate.setDate(openDate.getDate() + 46);
        countdownEndDate = openDate.getTime();
        localStorage.setItem(countdownEndDateKey, countdownEndDate);
    } else {
        // If it exists, parse it from the string
        countdownEndDate = parseInt(countdownEndDate);
    }

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownEndDate - now;

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById('countdown-timer').innerHTML = "<h2>We're Open! Shop Now!</h2>";
            localStorage.removeItem(countdownEndDateKey); // Remove the key so it resets next time needed
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

// --- Banner Slider ---
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
showSlide(currentSlide);
setInterval(nextSlide, 4000);

// --- Welcome Message ---
const welcomeMessage = document.getElementById('welcome-message');
const closeWelcomeBtn = document.getElementById('close-welcome');

window.addEventListener('load', function() {
    if (welcomeMessage) {
        welcomeMessage.style.display = 'block';
        setTimeout(() => {
            welcomeMessage.style.display = 'none';
        }, 8000);
    }
});

if (closeWelcomeBtn) {
    closeWelcomeBtn.addEventListener('click', function() {
        if (welcomeMessage) {
            welcomeMessage.style.display = 'none';
        }
    });
}

// --- Chatbot Functionality ---
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotContainer = document.getElementById('chatbot-container');
const closeChatbotBtn = document.getElementById('close-chatbot');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatbotBody = document.getElementById('chatbot-body');

if (chatbotIcon && chatbotContainer && closeChatbotBtn) {
    chatbotIcon.addEventListener('click', () => {
        chatbotContainer.style.display = 'flex';
        chatbotIcon.style.display = 'none';
    });

    closeChatbotBtn.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
        chatbotIcon.style.display = 'flex';
    });

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
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

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
        } else if (userMessage.includes("thank")) {
            return "You're most welcome! I'm happy to help. Is there anything else you'd like to know?";
        } else {
            return "I'm still learning! Could you please ask about beauty tips, products, or shipping information?";
        }
    }

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

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
}

// --- New Header JavaScript ---
const hamburgerMenu = document.getElementById('hamburgerMenu');
const headerNavMenu = document.getElementById('headerNavMenu');
const megaDropdowns = document.querySelectorAll('.mega-dropdown');

if (hamburgerMenu && headerNavMenu) {
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        headerNavMenu.classList.toggle('active');
    });
}

megaDropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('a:first-child');
    dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            const megaContent = dropdown.querySelector('.mega-content');
            if (megaContent) {
                megaContent.style.display = megaContent.style.display === 'flex' ? 'none' : 'flex';
            }
        }
    });
});

if (headerNavMenu) {
    headerNavMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburgerMenu.classList.remove('active');
                headerNavMenu.classList.remove('active');
                megaDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const megaContent = dropdown.querySelector('.mega-content');
                    if (megaContent) megaContent.style.display = 'none';
                });
            }
        });
    });
}
    
// --- Launching Soon Pop-up functionality ---
const launchingSoonPopup = document.getElementById('launchingSoonPopup');
const closePopupBtn = document.getElementById('closePopup');

window.addEventListener('load', () => {
    if (!sessionStorage.getItem('launchingSoonPopupClosed')) {
        launchingSoonPopup.classList.add('show');
    }
});

closePopupBtn.addEventListener('click', () => {
    launchingSoonPopup.classList.remove('show');
    sessionStorage.setItem('launchingSoonPopupClosed', 'true');
});

window.addEventListener('click', (event) => {
    if (event.target == launchingSoonPopup) {
        launchingSoonPopup.classList.remove('show');
        sessionStorage.setItem('launchingSoonPopupClosed', 'true');
    }
});

// --- Products Integration ---
const productsSection = document.getElementById('products-container');
const productsApiUrl = 'https://script.google.com/macros/s/AKfycbxAH023YvFyTyWj8FXhZdEJ9-E-WF5A1VFJkkoIGVs3Ml-1u_k0_BTAPGAZkSQOs38Veg/exec';

const modal = document.getElementById('product-details-popup');
const closeBtn = document.querySelector('.close-btn');
const cartCountElement = document.querySelector('.cart-count');

// Sections
const newProductsSection = document.getElementById('new-products');
const saleProductsSection = document.getElementById('sale-products');
const allProductsSection = document.getElementById('all-products');

let cart = [];

if (closeBtn) {
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

fetch(productsApiUrl)
    .then(response => response.json())
    .then(data => {
        const validProducts = data.filter(product => product['Product Name'] && product['Product Name'].trim() !== '');

        if (validProducts.length === 0) {
            productsSection.innerHTML = '<p>Sorry, no products available right now.</p>';
            return;
        }

        validProducts.forEach(product => {

            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            const isDiscounted = product['Discount Price'] && product['Price'] > product['Discount Price'];
            let discountPercentage = 0;
            if (isDiscounted) {
                discountPercentage = Math.round(((product['Price'] - product['Discount Price']) / product['Price']) * 100);
            }

            const priceHtml = isDiscounted
                ? `<span class="original-price">৳${product['Price']}</span> <span class="discounted-price">৳${product['Discount Price']}</span>`
                : `<span class="price">৳${product['Price']}</span>`;

            const imageUrl = product.Thumbnail && product.Thumbnail.trim() !== ''
                ? product.Thumbnail
                : 'https://via.placeholder.com/280x250.png?text=Image+Not+Found';

            let badgeHtml = '';
            if (product.Tag) {
                const tag = product.Tag.toLowerCase();
                if (tag === 'sale' || tag === 'new') {
                    const tagStyle = (tag === 'new') ? 'background-color: #20a247;' : '';
                    badgeHtml = `
                        <div class="discount-badge-container">
                            ${isDiscounted ? `<span class="discount-percentage">${discountPercentage}% Off</span>` : ''}
                            <span class="sale-badge" style="${tagStyle}">${tag.charAt(0).toUpperCase() + tag.slice(1)}</span>
                        </div>`;
                } else {
                    badgeHtml = `
                        <div class="discount-badge-container">
                            ${isDiscounted ? `<span class="discount-percentage">${discountPercentage}% Off</span>` : ''}
                            <span class="sale-badge">${product.Tag}</span>
                        </div>`;
                }
            } else if (isDiscounted) {
                badgeHtml = `
                    <div class="discount-badge-container">
                        <span class="discount-percentage">${discountPercentage}% Off</span>
                    </div>`;
            }

            productCard.innerHTML = `
                <div class="product-image-container">
                    <img src="${imageUrl}" alt="${product['Product Name']}">
                    ${badgeHtml}
                </div>
                <div class="product-info">
                    <h3>${product['Product Name']}</h3>
                    <div class="price-container">
                        ${priceHtml}
                    </div>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;

            // ✅ Append in correct section
            if (product.Tag && product.Tag.toLowerCase() === 'new') {
                newProductsSection.appendChild(productCard);
            } else if (product.Tag && product.Tag.toLowerCase() === 'sale') {
                saleProductsSection.appendChild(productCard);
            } else {
                productsSection.appendChild(productCard);
            }

            // --- Add to cart ---
            const addToCartBtn = productCard.querySelector('.add-to-cart');
            addToCartBtn.addEventListener('click', (e) => {
                e.stopPropagation();

                const productName = product['Product Name'];
                const productPrice = isDiscounted ? product['Discount Price'] : product['Price'];
                const productImage = imageUrl;

                const existingItem = cart.find(item => item.name === productName);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        name: productName,
                        price: productPrice,
                        originalPrice: product['Price'],
                        image: productImage,
                        quantity: 1
                    });
                }

                if (cartCountElement) {
                    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                    cartCountElement.textContent = totalItems;
                }

                alert(`${productName} কার্টে যোগ করা হয়েছে!`);
            });

            // --- Product details popup ---
            productCard.addEventListener('click', (e) => {
                if (e.target.closest('.add-to-cart')) return;

                document.getElementById('popup-image').src = imageUrl;
                document.getElementById('popup-title').innerText = product['Product Name'];
                document.getElementById('popup-description').innerText = product.ProductDescription || '';

                if (isDiscounted) {
                    document.getElementById('popup-original-price').style.display = 'inline';
                    document.getElementById('popup-original-price').innerText = `৳${product['Price']}`;
                    document.getElementById('popup-discounted-price').innerText = `৳${product['Discount Price']}`;
                } else {
                    document.getElementById('popup-original-price').style.display = 'none';
                    document.getElementById('popup-discounted-price').innerText = `৳${product['Price']}`;
                }

                modal.style.display = "block";
            });
        });

        // ✅ init sliders after products load
        initSlider("new-products");
        initSlider("sale-products");
    })
    .catch(error => {
        console.error('Error fetching products:', error);
        productsSection.innerHTML = '<p>Sorry, we could not load the products. Please try again later.</p>';
    });


// --- Slider Logic ---
function initSlider(sectionId) {
    const slider = document.getElementById(sectionId);
    const products = slider.children;
    const totalProducts = products.length;
    let currentIndex = 0;
    const itemsPerPage = 4;

    function showSlide() {
        for (let i = 0; i < totalProducts; i++) {
            products[i].style.display = "none";
        }
        for (let i = currentIndex * itemsPerPage; i < (currentIndex + 1) * itemsPerPage && i < totalProducts; i++) {
            products[i].style.display = "flex";
        }
    }

    showSlide();

    const prevBtn = document.querySelector(`.prev-btn[data-target="${sectionId}"]`);
    const nextBtn = document.querySelector(`.next-btn[data-target="${sectionId}"]`);

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                showSlide();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if ((currentIndex + 1) * itemsPerPage < totalProducts) {
                currentIndex++;
                showSlide();
            }
        });
    }
}


// --- Cart Popup Logic ---
const cartLink = document.querySelector('.cart-link');
const cartPopup = document.getElementById('cart-popup');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

if (cartLink && cartPopup) {
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        renderCart();
        cartPopup.style.display = 'flex';
    });
}

if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
        cartPopup.style.display = 'none';
    });
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalSavings = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align:center; padding:20px; color:#e91e63; font-weight:600;">
                🛒 Your cart is empty.<br>Please add some products!
            </div>
        `;
        cartTotalElement.textContent = '0';
        return;
    }

    cart.forEach((item, index) => {
        item.quantity = item.quantity || 1;
        const originalPrice = item.originalPrice || item.price;
        const itemTotal = item.price * item.quantity;
        const itemOriginalTotal = originalPrice * item.quantity;
        const itemSavings = itemOriginalTotal - itemTotal;

        total += itemTotal;
        totalSavings += itemSavings;

        const priceDisplay = item.price < originalPrice
            ? `<span style="text-decoration: line-through; color: #999;">৳${itemOriginalTotal.toLocaleString()}</span>
               <span style="color: #20a247; font-weight: bold;">৳${itemTotal.toLocaleString()}</span>`
            : `<span style="color: #333; font-weight: bold;">৳${itemTotal.toLocaleString()}</span>`;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${index}, -1)">–</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <p>${priceDisplay}</p>
            </div>
        `;

        cartItemsContainer.appendChild(itemDiv);
    });

    cartTotalElement.textContent = total.toLocaleString();

    if (totalSavings > 0) {
        const savingsMessage = document.createElement('div');
        savingsMessage.style = "margin-top:10px; text-align:right; color:#e91e63; font-weight:600;";
        savingsMessage.innerHTML = `🎉 You saved ৳${totalSavings.toLocaleString()}!`;
        cartItemsContainer.appendChild(savingsMessage);
    }
}

window.updateQuantity = function(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    renderCart();

    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
};

checkoutBtn.addEventListener('click', () => {
    alert("Proceeding to payment... You can integrate a payment gateway here.");
});
