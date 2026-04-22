// API кілтін енгізу өрісі
const apiKeyInput = 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('apiKey');
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const requestCountSpan = document.getElementById('requestCount');

// Санауыш
let requestCount = 0;

/**
 * Чатқа хабарлама қосу
 * @param {string} text - хабарлама мәтіні
 * @param {string} sender - 'user' немесе 'bot'
 */
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * API сұранысын жіберу (OpenAI үлгісі)
 * @param {string} userMessage - пайдаланушы сұрағы
 * @returns {Promise<string>} - ЖИ жауабы
 */
async function fetchAIResponse(userMessage) {
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
        throw new Error('API кілті енгізілмеген');
    }

    // Мысал: OpenAI Chat Completions
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Сіз қазақ тілінде жауап беретін көмекшісіз.' },
                { role: 'user', content: userMessage }
            ],
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API қатесі');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

/**
 * Жіберу батырмасының әрекеті
 */
async function handleSend() {
    const message = userInput.value.trim();
    if (!message) return;

    // Пайдаланушы хабарламасын көрсету
    appendMessage(message, 'user');
    userInput.value = '';

    // Санауышты арттыру
    requestCount++;
    requestCountSpan.textContent = requestCount;

    try {
        const aiReply = await fetchAIResponse(message);
        appendMessage(aiReply, 'bot');
    } catch (error) {
        appendMessage(`❌ Қате: ${error.message}`, 'bot');
        console.error(error);
    }
}

// Оқиғаларды байланыстыру
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});
