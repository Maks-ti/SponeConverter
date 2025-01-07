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

    // check on correct data
    if (!rubles || !coins || isNaN(rubles) || isNaN(coins)) {
        alert("Пожалуйста, введите корректные значения.");
        return;
    }

    const data = {
        rubles: parseFloat(rubles),
        coins: parseFloat(coins)
    };

    // send data to bot
    console.log("Отправка данных в бот:", data); 
    window.Telegram.WebApp.sendData(JSON.stringify(data));
    console.log("Данные отправлены"); 

    window.Telegram.WebApp.close();
}

// Сообщаем Telegram, что Web App готово к использованию
console.log(window);
console.log(window.Telegram);

window.Telegram.WebApp.ready();
