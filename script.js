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

