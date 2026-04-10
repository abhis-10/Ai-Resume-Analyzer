require("dotenv").config();
const OpenAI = require("openai");


const openai = new OpenAI({
   apiKey: ""
});

const analyzeResume = async(text , userQuery) =>{
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                {
                    role : "system",
                    content: "You are a resume analyzer. Extract structured data."
                },
                {
                    role : "user",
                    content : `
                     ${userQuery}

                     Resume:
                     ${text}
                    `
                }
            ]
        });
        return response.choices[0].message.content;
    } catch (error) {
        throw new Error("AI Error: " + error.message);
    }
}

module.exports = analyzeResume;