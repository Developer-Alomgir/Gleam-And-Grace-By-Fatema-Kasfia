
        // Typewriter Effect
        const phrases = ['Welcome to Gleam and Geace!', 'Discover Beauty & Elegance', 'Premium Quality Products'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const element = document.getElementById('typewriter');
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                element.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }

            setTimeout(typeWriter, isDeleting ? 50 : 100);
        }

        typeWriter();

        // Products Data
        const products = [
            { id: 1, name: 'Diamond Necklace', price: 15000, category: 'jewelry', featured: true },
            { id: 2, name: 'Gold Earrings', price: 8000, category: 'earring', featured: true },
            { id: 3, name: 'Premium Lipstick', price: 1200, category: 'cosmetics', featured: true },
            { id: 4, name: 'Pearl Bracelet', price: 5000, category: 'jewelry', featured: true },
            { id: 5, name: 'Face Serum', price: 2500, category: 'cosmetics', featured: true },
            { id: 6, name: 'Ruby Ring', price: 12000, category: 'ring', featured: true },
            { id: 15, name: 'Luxury Watch', price: 18000, category: 'watch', featured: true },
            { id: 16, name: 'Designer Handbag', price: 9500, category: 'bag', featured: true },
            { id: 17, name: 'Emerald Pendant', price: 14000, category: 'pendant', featured: true },
            { id: 18, name: 'Diamond Ring', price: 22000, category: 'ring', featured: true },
            { id: 19, name: 'Crystal Earrings', price: 6000, category: 'earring', featured: true },
            { id: 20, name: 'Handmade Beads', price: 1500, category: 'crafting', featured: true },
            { id: 7, name: 'Premium Watch', price: 25000, category: 'watch', exclusive: true },
            { id: 8, name: 'Designer Perfume', price: 5000, category: 'cosmetics', exclusive: true },
            { id: 9, name: 'Platinum Chain', price: 30000, category: 'jewelry', exclusive: true },
            { id: 10, name: 'Premium Makeup Kit', price: 8000, category: 'cosmetics', exclusive: true },
            { id: 21, name: 'Leather Bag', price: 15000, category: 'bag', exclusive: true },
            { id: 22, name: 'Gold Pendant', price: 18000, category: 'pendant', exclusive: true },
            { id: 11, name: 'Sapphire Pendant', price: 35000, category: 'pendant', luxury: true },
            { id: 12, name: 'Anti-Aging Cream', price: 6500, category: 'cosmetics', luxury: true },
            { id: 13, name: 'Sapphire Brooch', price: 28000, category: 'jewelry', luxury: true },
            { id: 14, name: 'Luxury Skincare Set', price: 12000, category: 'cosmetics', luxury: true },
            { id: 23, name: 'Swiss Watch', price: 45000, category: 'watch', luxury: true },
            { id: 24, name: 'Designer Bag', price: 32000, category: 'bag', luxury: true },
            { id: 25, name: 'Platinum Ring', price: 38000, category: 'ring', luxury: true },
            { id: 26, name: 'Pearl Earrings', price: 15000, category: 'earring', luxury: true },
            { id: 27, name: 'Premium Craft Kit', price: 8500, category: 'crafting', luxury: true }
        ];

        let cart = [];
        let selectedPayment = '';
        let orderCounter = 1000;
        let orders = {};
        let currentFilter = 'all';

        // Hero Image Upload with LocalStorage
        document.getElementById('heroImageUpload').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const heroImage = document.getElementById('heroImage');
                    const placeholder = document.getElementById('heroPlaceholder');
                    const imageData = event.target.result;
                    
                    heroImage.src = imageData;
                    heroImage.classList.add('active');
                    placeholder.style.display = 'none';
                    
                    // Save to LocalStorage
                    try {
                        localStorage.setItem('heroImage', imageData);
                        showNotification('Shop logo saved!');
                    } catch (e) {
                        console.error('Image too large for localStorage');
                        showNotification('Image saved temporarily (too large to persist)');
                    }
                };
                reader.readAsDataURL(file);
            }
        });

        // Load hero image on page load
        window.addEventListener('DOMContentLoaded', function() {
            const savedHeroImage = localStorage.getItem('heroImage');
            if (savedHeroImage) {
                const heroImage = document.getElementById('heroImage');
                const placeholder = document.getElementById('heroPlaceholder');
                heroImage.src = savedHeroImage;
                heroImage.classList.add('active');
                placeholder.style.display = 'none';
            }
            
            // Load product images
            loadProductImages();
        });

        function filterProducts(category) {
            currentFilter = category;
            
            // Update active button
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Re-render products
            renderProducts();
        }

        function handleImageUpload(productId, event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.querySelector(`#product-${productId} .product-image`);
                    const placeholder = document.querySelector(`#product-${productId} .upload-placeholder`);
                    img.src = e.target.result;
                    img.classList.add('active');
                    placeholder.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        }

        function renderProducts() {
            const featuredContainer = document.getElementById('featuredProducts');
            const exclusiveContainer = document.getElementById('exclusiveCarousel');
            const luxuryContainer = document.getElementById('luxuryCarousel');

            let featured = products.filter(p => p.featured);
            const exclusive = products.filter(p => p.exclusive);
            const luxury = products.filter(p => p.luxury);

            // Apply category filter to featured products
            if (currentFilter !== 'all') {
                featured = featured.filter(p => p.category === currentFilter);
            }

            featuredContainer.innerHTML = featured.map(product => `
                <div class="product-card" id="product-${product.id}">
                    <div class="product-image-container" onclick="document.getElementById('file-${product.id}').click()">
                        <img class="product-image" alt="${product.name}">
                        <div class="upload-placeholder">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            <p>Click to upload image</p>
                        </div>
                    </div>
                    <input type="file" id="file-${product.id}" class="file-input" accept="image/*" onchange="handleImageUpload(${product.id}, event)">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">৳${product.price}</p>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `).join('');

            // Duplicate exclusive items for seamless loop
            const exclusiveHTML = exclusive.map(product => `
                <div class="exclusive-card" id="exclusive-${product.id}">
                    <div class="exclusive-badge">EXCLUSIVE</div>
                    <div class="product-image-container" onclick="document.getElementById('file-ex-${product.id}').click()">
                        <img class="product-image" alt="${product.name}">
                        <div class="upload-placeholder">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            <p>Upload Image</p>
                        </div>
                    </div>
                    <input type="file" id="file-ex-${product.id}" class="file-input" accept="image/*" onchange="handleImageUpload('exclusive-${product.id}', event)">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">৳${product.price}</p>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `).join('');

            // Duplicate for infinite scroll
            exclusiveContainer.innerHTML = exclusiveHTML + exclusiveHTML;

            // Render Luxury Collection
            const luxuryHTML = luxury.map(product => `
                <div class="exclusive-card" id="luxury-${product.id}">
                    <div class="exclusive-badge">LUXURY</div>
                    <div class="product-image-container" onclick="document.getElementById('file-lux-${product.id}').click()">
                        <img class="product-image" alt="${product.name}">
                        <div class="upload-placeholder">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            <p>Upload Image</p>
                        </div>
                    </div>
                    <input type="file" id="file-lux-${product.id}" class="file-input" accept="image/*" onchange="handleImageUpload('luxury-${product.id}', event)">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">৳${product.price}</p>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `).join('');

            // Duplicate for infinite scroll
            luxuryContainer.innerHTML = luxuryHTML + luxuryHTML;
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateCartUI();
            showNotification('Added to cart!');
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartUI();
            renderCart();
        }

        function updateCartUI() {
            const cartCount = document.querySelector('.cart-count');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        function renderCart() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');

            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
                cartTotal.textContent = '0';
                return;
            }

            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>৳${item.price} x ${item.quantity}</p>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = total;
        }

        function toggleCart() {
            const modal = document.getElementById('cartModal');
            modal.classList.toggle('active');
            if (modal.classList.contains('active')) {
                renderCart();
            }
        }

        function selectPayment(method) {
            selectedPayment = method;
            document.querySelectorAll('.payment-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            event.target.closest('.payment-option').classList.add('selected');
        }

        function placeOrder() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            if (!selectedPayment) {
                alert('Please select a payment method!');
                return;
            }

            const name = document.getElementById('customerName').value.trim();
            const phone = document.getElementById('customerPhone').value.trim();
            const email = document.getElementById('customerEmail').value.trim();
            const address = document.getElementById('customerAddress').value.trim();
            const notes = document.getElementById('orderNotes').value.trim();

            if (!name || !phone || !address) {
                alert('Please fill in all required fields (Name, Phone, Address)!');
                return;
            }

            // Validate phone number
            if (phone.length < 11) {
                alert('Please enter a valid phone number!');
                return;
            }

            const orderId = `ORD${orderCounter++}`;
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            orders[orderId] = {
                id: orderId,
                items: [...cart],
                customer: { name, phone, email, address, notes },
                payment: selectedPayment,
                total: total,
                status: 'Order Placed',
                date: new Date().toLocaleString()
            };

            cart = [];
            updateCartUI();
            toggleCart();

            const paymentMethod = selectedPayment === 'bkash' ? 'Bkash' : 'Cash on Delivery';
            alert(`✅ Order placed successfully!আমাদের কাছ থেকে কেনাকাটা করার জন্য ধন্যবাদ।\n\n📦 Order ID: ${orderId}\n💰 Total: ৳${total}\n💳 Payment: ${paymentMethod}\n\n👤 Customer: ${name}\n📱 Phone: ${phone}\n📍 Address: ${address}\n\nYou can track your order using the Order ID.আপনি অর্ডার আইডি ব্যবহার করে আপনার অর্ডার ট্র্যাক করতে পারেন।`);

            // Reset form
            document.getElementById('customerName').value = '';
            document.getElementById('customerPhone').value = '';
            document.getElementById('customerEmail').value = '';
            document.getElementById('customerAddress').value = '';
            document.getElementById('orderNotes').value = '';
            selectedPayment = '';
            document.querySelectorAll('.payment-option').forEach(opt => {
                opt.classList.remove('selected');
            });
        }

        function trackOrder() {
            const trackingId = document.getElementById('trackingId').value.trim();
            const resultDiv = document.getElementById('trackingResult');

            if (!trackingId) {
                resultDiv.innerHTML = '<p style="color: #ef4444;">Please enter an order ID</p>';
                return;
            }

            const order = orders[trackingId];

            if (!order) {
                resultDiv.innerHTML = '<p style="color: #ef4444;">Order not found. Please check your order ID.</p>';
                return;
            }

            const statusSteps = [
                { name: 'Order Placed', completed: true },
                { name: 'Processing', completed: order.status !== 'Order Placed' },
                { name: 'Out for Delivery', completed: order.status === 'Delivered' },
                { name: 'Delivered', completed: order.status === 'Delivered' }
            ];

            resultDiv.innerHTML = `
                <div class="order-status">
                    <h3>Order: ${order.id}</h3>
                    <p>Date: ${order.date}</p>
                    <p>Total: ৳${order.total}</p>
                    <p>Payment: ${order.payment === 'bkash' ? 'Bkash' : 'Cash on Delivery'}</p>
                    <hr style="margin: 20px 0; border-color: rgba(139, 92, 246, 0.3);">
                    ${statusSteps.map(step => `
                        <div class="status-step">
                            <div class="status-icon ${step.completed ? 'completed' : ''}">
                                ${step.completed ? '✓' : '○'}
                            </div>
                            <div>
                                <strong>${step.name}</strong>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        function showNotification(message) {
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: linear-gradient(135deg, #8b5cf6, #ec4899);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                z-index: 3000;
                animation: slideIn 0.3s ease;
                box-shadow: 0 5px 15px rgba(139, 92, 246, 0.5);
            `;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }

        // Initialize
        renderProducts();
        initCarouselDrag();

        // Carousel Drag/Touch Functionality
        function initCarouselDrag() {
            const carousels = document.querySelectorAll('.carousel-container');
            
            carousels.forEach(carousel => {
                const track = carousel.querySelector('.carousel-track');
                let isDown = false;
                let startX;
                let scrollLeft;
                let velocity = 0;
                let lastX = 0;
                let lastTime = Date.now();

                // Mouse events
                carousel.addEventListener('mousedown', (e) => {
                    isDown = true;
                    carousel.classList.add('dragging');
                    track.classList.add('no-animation');
                    startX = e.pageX - carousel.offsetLeft;
                    scrollLeft = track.style.transform ? 
                        parseInt(track.style.transform.replace(/[^\d-]/g, '')) : 0;
                    lastX = e.pageX;
                    lastTime = Date.now();
                });

                carousel.addEventListener('mouseleave', () => {
                    if (isDown) {
                        isDown = false;
                        carousel.classList.remove('dragging');
                        track.classList.remove('no-animation');
                    }
                });

                carousel.addEventListener('mouseup', () => {
                    isDown = false;
                    carousel.classList.remove('dragging');
                    track.classList.remove('no-animation');
                });

                carousel.addEventListener('mousemove', (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - carousel.offsetLeft;
                    const walk = (x - startX);
                    track.style.transform = `translateX(${scrollLeft + walk}px)`;
                    
                    const now = Date.now();
                    velocity = (e.pageX - lastX) / (now - lastTime);
                    lastX = e.pageX;
                    lastTime = now;
                });

                // Touch events for mobile
                carousel.addEventListener('touchstart', (e) => {
                    isDown = true;
                    carousel.classList.add('dragging');
                    track.classList.add('no-animation');
                    startX = e.touches[0].pageX - carousel.offsetLeft;
                    scrollLeft = track.style.transform ? 
                        parseInt(track.style.transform.replace(/[^\d-]/g, '')) : 0;
                    lastX = e.touches[0].pageX;
                    lastTime = Date.now();
                }, { passive: true });

                carousel.addEventListener('touchend', () => {
                    isDown = false;
                    carousel.classList.remove('dragging');
                    track.classList.remove('no-animation');
                }, { passive: true });

                carousel.addEventListener('touchmove', (e) => {
                    if (!isDown) return;
                    const x = e.touches[0].pageX - carousel.offsetLeft;
                    const walk = (x - startX);
                    track.style.transform = `translateX(${scrollLeft + walk}px)`;
                    
                    const now = Date.now();
                    velocity = (e.touches[0].pageX - lastX) / (now - lastTime);
                    lastX = e.touches[0].pageX;
                    lastTime = now;
                }, { passive: true });
            });
        }

        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    