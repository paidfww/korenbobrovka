// ========== API КІЛТІҢІЗДЫ ОСЫ ЖЕРГЕ ҚОЙЫҢЫЗ ==========
const API_KEY = "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";  // <-- ӨЗ КІЛТІҢІЗДІ ҚОЙЫҢЫЗ
// ====================================================

// ChatGPT API арқылы жауап алу функциясы
async function getAIResponse(question) {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",  // ең арзан модель
                messages: [
                    {
                        role: "user",
                        content: question
                    }
                ],
                max_tokens: 500
            })
        });
        
        const data = await response.json();
        
        // Қате болса тексеру
        if (data.error) {
            console.error("API қатесі:", data.error);
            return "Қате кетті: " + data.error.message;
        }
        
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Байланыс қатесі:", error);
        return "Интернет байланысын тексеріңіз!";
    }
}