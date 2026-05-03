// import "dotenv/config";

// const getOpenAIAPIResponse = async(message) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [{
//                 role: "user",
//                 content: message
//             }]
//         })
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();
//         return data.choices[0].message.content; //reply
//     } catch(err) {
//         console.log(err);
//     }
// }

// export default getOpenAIAPIResponse;

import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getOpenAIAPIResponse = async (message) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(message);
    const response = await result.response;

    const text = response.text();



    // ✅ SAFETY CHECK
    if (!text || typeof text !== "string") {
      console.error("Invalid Gemini response:", text);
      return null;
    }

    return text;

  } catch (err) {
    console.error("Gemini Error:", err.message);
    return "⚠️ AI service unavailable";
  }
};

export default getOpenAIAPIResponse;