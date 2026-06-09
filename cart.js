cart.js

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cart-items-container');
    const summaryList = document.getElementById('summary-items-list');
    const totalDisplay = document.getElementById('total-price-display');

    function renderCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        container.innerHTML = '';
        summaryList.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            container.innerHTML = '<p style="text-align:center;">Ваша корзина пуста</p>';
            totalDisplay.innerText = 'Итого: 0 ₸';
            return;
        }

        cart.forEach((item, index) => {
            total += item.price;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'product-card'; 
            itemDiv.innerHTML = `
                <div class="product-main-info">
                    <img class="product-thumb" src="${item.image}" alt="${item.name}">
                    <div class="product-text-details">
                        <b class="product-name">${item.name}</b>
                        <div class="product-meta">
                            <span>1 шт</span>
                            <div class="vertical-divider"></div>
                        </div>
                    </div>
                </div>
                <div class="product-actions">
                    <b class="product-price">${item.price.toLocaleString()} ₸</b>
                    <button class="action-btn">Удалить</button>
                </div>
            `;
            
            itemDiv.querySelector('.action-btn').onclick = () => removeFromCart(index);
            container.appendChild(itemDiv);

            const row = document.createElement('div');
            row.className = 'summary-row';
            row.innerHTML = `<span>${item.name}</span> <b>${item.price.toLocaleString()} ₸</b>`;
            summaryList.appendChild(row);
        });

        totalDisplay.innerText = `Итого: ${total.toLocaleString()} ₸`;
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    renderCart();
});