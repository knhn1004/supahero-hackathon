const axios = require("axios");
const path = require("path");
const Groq = require("groq-sdk");

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const groq = new Groq();

const config = {
    method: "POST",
    url: "https://api.jigsawstack.com/v1/ai/scrape",
    data: {
      "url":"https://vissles.com/collections/keyboard",
      "element_prompts":["products", "prices"]
    },
    headers: {
      "content-type":"application/json",
      "x-api-key":process.env.JIGSAW_API_KEY
    }
};

async function summarize(json_out) {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "Given data from web scraper, turn into useful information for this format:\n{\nproduct: \"\",\nproduct_desc: \"\",\nproduct_price:\"\"\n}\n\ngive the final data in json and nothing else\n\n"
      },
      {
        "role": "user",
        "content": JSON.stringify(json_out)
      }
    ],
    "model": "llama-3.1-70b-versatile",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": false,
    "stop": null
  });

  console.log(chatCompletion.choices[0].message.content);
}

axios(config)
  .then((response) => {
    console.log("Scraper output:", JSON.stringify(response.data));
    return summarize(response.data);
  })
  .catch((error) => {
    console.log("Error:", error);
  });