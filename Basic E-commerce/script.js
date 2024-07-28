document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    function displayMessage(message, isSuccess) {
        const messageDiv = document.getElementById('message');
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.style.color = isSuccess ? 'green' : 'red';
        }
    }

    // SignUp page
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Sign-up form submitted');

            let name = document.getElementById('name').value;
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            let confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                displayMessage('Passwords do not match', false);
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                displayMessage('User already exists with this email', false);
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            displayMessage('Sign-up successful! Redirecting to login page...', true);
            setTimeout(() => window.location.href = 'login.html', 2000);
        });
    }

    // Login page
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Login form submitted');

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email);

            if (!user) {
                displayMessage('Email not found', false);
                return;
            }

            if (user.password !== password) {
                displayMessage('Incorrect password', false);
                return;
            }

            localStorage.setItem('currentUser', JSON.stringify(user));

            displayMessage('Login successful. Redirecting to dashboard...', true);
            setTimeout(() => window.location.href = 'dashboard.html', 2000);
        });
    }

    // Dashboard page
    const cartCount = document.getElementById('cartCount');
    const wishlistCount = document.getElementById('wishlistCount');
    const cartButton = document.getElementById('cartButton');
    const wishlistButton = document.getElementById('wishlistButton');
    const logoutBtn = document.getElementById('logoutBtn');
    const userIcon = document.getElementById('userIcon');
    const closePopup = document.getElementById('closePopup');
    const userPopup = document.getElementById('userPopup');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const buyButtons = document.querySelectorAll('.buyBtn');
    const cartButtons = document.querySelectorAll('.addToCartBtn');
    const wishlistButtons = document.querySelectorAll('.addToWishlistBtn');

    if (cartCount && wishlistCount && cartButton && wishlistButton && logoutBtn && userIcon && closePopup && userPopup && welcomeMessage) {
        updateCounts();

        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            welcomeMessage.textContent = `Welcome, ${user.name}`;
        } else {
            window.location.href = 'login.html';
        }

        buyButtons.forEach((button, index) => {
            button.addEventListener('click', function () {
                buyProduct(`Product ${index + 1}`);
            });
        });

        cartButtons.forEach((button, index) => {
            button.addEventListener('click', function () {
                addToCart(`Product ${index + 1}`);
            });
        });

        wishlistButtons.forEach((button, index) => {
            button.addEventListener('click', function () {
                addToWishlist(`Product ${index + 1}`);
            });
        });

        userIcon.addEventListener('click', function () {
            userPopup.style.display = 'block';
        });

        closePopup.addEventListener('click', function () {
            userPopup.style.display = 'none';
        });

        logoutBtn.addEventListener('click', function () {
            logout();
        });

        cartButton.addEventListener('click', function () {
            window.location.href = 'checkout.html';
        });

        wishlistButton.addEventListener('click', function () {
            window.location.href = 'checkout.html';
        });

        function updateCounts() {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
            cartCount.textContent = cartItems.length;
            wishlistCount.textContent = wishlistItems.length;
        }

        function buyProduct(item) {
            alert(`You have bought ${item}`);
        }

        function addToCart(item) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCounts();
            alert(`${item} has been added to your cart`);
        }

        function addToWishlist(item) {
            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            wishlist.push(item);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateCounts();
            alert(`${item} has been added to your wishlist`);
        }

        function logout() {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        }
    }
});
