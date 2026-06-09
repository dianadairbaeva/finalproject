const flowerList = document.getElementById('flower-list');
const cartCountElem = document.getElementById('cart-count');
const API_URL = 'https://flower-shop.free.beeceptor.com/flowers'; 

async function loadFlowers() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    try {
        const response = await fetch(API_URL, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error('Ошибка API');
        
        const data = await response.json();
        render(data);
    } catch (error) {
        console.warn("Загрузка локальных данных из-за ошибки или задержки API");
        
        const localFlowers = [
            { id: 1, name: "РОЗЫ", price: 8000, image: "public/rose-flower-png-isolated-transparent-background-191095-12176-1@2x.png" },
            { id: 2, name: "ЛИЛИИ", price: 15000, image: "public/pngtree-pink-lily-flower-transparent-background-png-image-20420612-1@2x.png" },
            { id: 3, name: "ПИОНЫ", price: 10000, image: "public/edd742125412f8bc20f10090b7249a1f-1@2x.png" },
            { id: 4, name: "ТЮЛЬПАНЫ", price: 6000, image: "public/pngtree-single-red-tulip-bloom-png-image-16204894-1@2x.png" },
            { id: 5, name: "ГОРТЕНЗИИ", price: 12000, image: "public/pngtree-a-lush-white-hydrangea-bloom-with-delicate-petals-and-green-leaves-png-image-15318783-1@2x.png" },
            { id: 6, name: "ОРХИДЕИ", price: 20000, image: "public/pngtree-orchid-isolated-on-transparent-background-png-image-16977048-1@2x.png" }
        ];
        
        render(localFlowers);
    }
}

function render(flowers) {
    if (!flowerList) return;
    
    flowerList.innerHTML = flowers.map(f => `
        <div class="catalog-item">
            <div class="image-box">
                <img src="${f.image}" class="flower-img" alt="${f.name}" 
                     onerror="this.src='https://via.placeholder.com/200?text=Error'">
            </div>
            <h3>${f.name}</h3>
            <p>${f.price.toLocaleString()} ₸</p>
            <button class="buy-btn" onclick="addToCart('${f.name}', ${f.price}, '${f.image}')">В корзину</button>
        </div>
    `).join('');
}

window.addToCart = (name, price, image) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.push({ name: name, price: price, image: image }); 
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(name + " добавлен в корзину!");
    updateCartCount();
};

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cartCountElem) cartCountElem.innerText = cart.length;
}


loadFlowers();
updateCartCount();