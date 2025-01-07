// Получение курса из параметров URL
const urlParams = new URLSearchParams(window.location.search);
const exchangeRate = parseFloat(urlParams.get('course'));

// Проверяем, что курс задан и является корректным числом
if (isNaN(exchangeRate) || exchangeRate <= 0) {
    document.body.innerHTML = `
        <h3 style="color: red;">Ошибка: Некорректный курс валют.</h3>
        <p>Пожалуйста, перезапустите приложение с правильными параметрами.</p>
    `;
    throw new Error("Некорректный курс валют. Завершение приложения.");
}

function convertToCoins() {
    const rubles = parseFloat(document.getElementById('rubInput').value);
    if (!isNaN(rubles)) {
        document.getElementById('coinInput').value = (rubles / exchangeRate).toFixed(6);
    }
}

function convertToRubles() {
    const coins = parseFloat(document.getElementById('coinInput').value);
    if (!isNaN(coins)) {
        document.getElementById('rubInput').value = (coins * exchangeRate).toFixed(6);
    }
}

function confirmTransaction() {
    const rubles = document.getElementById('rubInput').value;
    const coins = document.getElementById('coinInput').value;

    // Отправка данных обратно в Telegram бот
    Telegram.WebApp.sendData(JSON.stringify({ rubles, coins }));
}

// Сообщаем Telegram, что Web App готово к использованию
Telegram.WebApp.ready();
