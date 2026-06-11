import { SarvamAIClient } from "sarvamai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the SarvamAI client with your API key
const client = new SarvamAIClient({
    apiSubscriptionKey: process.env.SARVAM_API_KEY
});

async function main() {
    const response = await client.chat.completions({
        model: "sarvam-105b",
        messages: [
            {
                role: "user",
                content: "What is the capital of India?"
            }
        ]
    });
    console.log(response.choices[0].message.content);
}

main();
