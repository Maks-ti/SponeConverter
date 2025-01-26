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

// // // swap if sell
// Получаем параметр type из URL
const op_type = urlParams.get('type');
console.log(op_type)
// Проверяем, что параметр есть
if (op_type != 'sell' && op_type != 'buy') {
    document.body.innerHTML = `
        <h3 style="color: red;">Ошибка: Некорректный тип операции.</h3>
        <p>Пожалуйста, перезапустите приложение с правильными параметрами.</p>
    `;
    throw new Error("Некорректный тип операции. Завершение приложения.");
}
// Если type === "sell", меняем местами блоки
if (op_type === 'sell') {
    const rubField = document.getElementById('rubInput');
    const coinField = document.getElementById('coinInput');
    const inputGroup = rubField.parentElement;

    // Меняем их местами
    inputGroup.insertBefore(coinField, rubField);
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

// Активируем MainButton после взаимодействия пользователя
function activateMainButton() {
    window.Telegram.WebApp.MainButton.setParams({
        text: "Отправить данные",
        color: "#4CAF50",
        isVisible: true,
        isActive: true
    });

    window.Telegram.WebApp.MainButton.show();

    // Сообщаем Telegram, что WebApp готово к использованию
    window.Telegram.WebApp.ready();
}

// Обработчик нажатия MainButton
window.Telegram.WebApp.MainButton.onClick(() => {
    const rubles = document.getElementById('rubInput').value;
    const coins = document.getElementById('coinInput').value;

    // Проверка корректности данных
    if (!rubles || !coins || isNaN(rubles) || isNaN(coins)) {
        alert("Пожалуйста, введите корректные значения.");
        return;
    }

    const data = {
        rubles: parseFloat(rubles),
        coins: parseFloat(coins)
    };

    console.log("Отправка данных в бот:", data);
    window.Telegram.WebApp.sendData(JSON.stringify(data));
    console.log("Данные отправлены");
});
