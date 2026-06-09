const API_URL = "https://flowers-shop.free.beeceptor.com";

async function handleAuth(event) {
    event.preventDefault();
    const form = event.target;
    
    const isRegister = form.id === 'registerForm';
    const endpoint = isRegister ? "/register" : "/login";
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (isRegister && data.password !== data.confirmPassword) {
        alert("Ошибка: Пароли не совпадают!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            localStorage.setItem("userAuth", "true");
            alert(isRegister ? "Регистрация успешна!" : "Вход выполнен!");
            window.location.href = "index.html"; 
        } else {
            alert("Ошибка сервера: " + response.status);
        }
    } catch (error) {
        console.error("Ошибка сети:", error);
        alert("Сервер недоступен.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) loginForm.addEventListener('submit', handleAuth);
    if (registerForm) registerForm.addEventListener('submit', handleAuth);
});