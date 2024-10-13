import { GoogleGenerativeAI } from "@google/generative-ai";

export async function fetchResponseFromAi(prompt) {
    try {
        const safetySettings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_NONE",
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_NONE",
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_NONE",
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_NONE",
            },
        ]

        const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAi.getGenerativeModel({ model: 'gemini-pro' ,safetySettings: safetySettings});
        const finalPrompt=process.env.CONTEXT + prompt;
        console.log("Prompt sent to AI",finalPrompt);

        const result = await model.generateContent(finalPrompt);
        const response = result.response;
        const output = response.text().toLowerCase();
        console.log("Response from AI:", output);

        return output;
    } catch (error) {
        console.error(error);
    }
}