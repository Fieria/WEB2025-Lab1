// Массив товаров
let products = [
    { id: 1, name: 'Товар № 1', price: 1000, image: '' },
    { id: 2, name: 'Товар № 2', price: 1000, image: '' },
    { id: 3, name: 'Товар № 3', price: 1000, image: '' },
    { id: 4, name: 'Товар № 4', price: 1000, image: '' },
    { id: 5, name: 'Товар № 5', price: 1000, image: '' },
    { id: 6, name: 'Товар № 6', price: 1000, image: '' },
    { id: 7, name: 'Товар № 7', price: 1000, image: '' },
    { id: 8, name: 'Товар № 8', price: 1000, image: '' },
    { id: 9, name: 'Товар № 9', price: 1000, image: '' },
    { id: 10, name: 'Товар № 10', price: 1000, image: '' },
    { id: 11, name: 'Товар № 11', price: 1000, image: '' },
    { id: 12, name: 'Товар № 12', price: 1000, image: '' }
];

// Массив корзины
let cart = [];

// Функция для сохранения корзины в localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функция для загрузки корзины из localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Функция для добавления товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    saveCartToLocalStorage();
    renderCart();
}

// Функция для удаления товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    renderCart();
}

// Функция для изменения количества товара
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    // Если количество стало 0 или меньше, удаляем товар
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    saveCartToLocalStorage();
    renderCart();
}

// Функция для отображения корзины
function renderCart() {
    const cartContent = document.getElementById('cartContent');
    const totalAmount = document.getElementById('totalAmount');
    
    if (cart.length === 0) {
        cartContent.innerHTML = '<p class="cart__empty">Корзина пуста</p>';
        totalAmount.textContent = '0';
        return;
    }
    
    cartContent.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart__item';
        cartItem.innerHTML = `
            <p class="cart__item-name">${item.name}</p>
            <div class="cart__item-controls">
                <button class="cart__item-remove" data-id="${item.id}">&times;</button>
                <button class="cart__item-decrease" data-id="${item.id}">-</button>
                <span class="cart__item-quantity">${item.quantity}</span>
                <button class="cart__item-increase" data-id="${item.id}">+</button>
                <span class="cart__item-total">${itemTotal} ₽</span>
            </div>
        `;
        
        cartContent.appendChild(cartItem);
    });
    
    totalAmount.textContent = total;
    
    // Добавляем обработчики для кнопок изменения количества
    cartContent.querySelectorAll('.cart__item-increase').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            updateQuantity(productId, 1);
        });
    });
    
    cartContent.querySelectorAll('.cart__item-decrease').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            updateQuantity(productId, -1);
        });
    });
    
    // Добавляем обработчики для кнопок удаления
    cartContent.querySelectorAll('.cart__item-remove').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Функция для отображения товаров
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const li = document.createElement('li');
        li.className = 'products__item';
        
        li.innerHTML = `
            <article class="product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-card__image">
                <h3 class="product-card__title">${product.name}</h3>
                <p class="product-card__price">${product.price} ₽</p>
                <button class="product-card__button" type="button" data-id="${product.id}">Добавить в корзину</button>
            </article>
        `;
        
        productsGrid.appendChild(li);
    });
    
    // Добавляем обработчики для кнопок "Добавить в корзину"
    productsGrid.querySelectorAll('.product-card__button').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Отображение товаров при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    renderProducts();
    renderCart();
});

// Открытие модального окна
const checkoutButton = document.getElementById('checkoutButton');
const orderModal = document.getElementById('orderModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const orderForm = document.getElementById('orderForm');
const successMessage = document.getElementById('successMessage');
const cancelButton = document.getElementById('cancelButton');

// Открытие модального окна при нажатии на кнопку "Оформить заказ"
checkoutButton.addEventListener('click', () => {
    orderModal.classList.add('active');
});

// Закрытие модального окна при нажатии на крестик
modalClose.addEventListener('click', () => {
    orderModal.classList.remove('active');
});

// Закрытие модального окна при клике на overlay
modalOverlay.addEventListener('click', () => {
    orderModal.classList.remove('active');
});

// Закрытие модального окна при нажатии на кнопку "Отмена"
cancelButton.addEventListener('click', () => {
    orderModal.classList.remove('active');
    orderForm.reset();
});

// Обработка отправки формы
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Закрываем модальное окно
    orderModal.classList.remove('active');
    
    // Показываем сообщение об успешном создании заказа
    successMessage.classList.add('active');
    
    // Скрываем сообщение через 3 секунды
    setTimeout(() => {
        successMessage.classList.remove('active');
    }, 3000);
    
    // Очищаем форму
    orderForm.reset();
});

