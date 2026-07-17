const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `${import.meta.env.VITE_GEMINI_API_URL}${import.meta.env.VITE_GEMINI_API_URL.includes('?') ? '&' : '?'}key=${GEMINI_API_KEY}`;

export const generateContent = async (message) => {
    if(!GEMINI_API_KEY){
        throw new Error("GEMINI_API_KEY is not defined in environment variables.");
    }
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${GEMINI_API_KEY}`, // Uncomment if required by your API
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: message,
                            },
                        ],
                    },
                ],
            })
        })
        if(!response.ok){
            const errorText = await response.text();
            console.log("API Error Response:", errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        if(!data || !data.candidates || data.candidates.length === 0 ){
            throw new Error("No candidates found in the response");
        }
        return data.candidates[0].content.parts[0].text;
    }catch (error){
        console.error("Error generating content:", error);
        throw error;
    }
};