'use server'

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as path from 'path';
import { Groq } from 'groq-sdk';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const groq = new Groq();

interface ScraperConfig {
  method: string;
  url: string;
  data: {
    url: string;
    element_prompts: string[];
  };
  headers: {
    'content-type': string;
    'x-api-key': string | undefined;
  };
}

const config: AxiosRequestConfig = {
  method: "POST",
  url: "https://api.jigsawstack.com/v1/ai/scrape",
  data: {
    "url": "https://vissles.com/collections/keyboard",
    "element_prompts": ["products", "prices"]
  },
  headers: {
    "content-type": "application/json",
    "x-api-key": process.env.JIGSAW_API_KEY
  }
};

interface ProductData {
  product: string;
  product_desc: string;
  product_price: string;
}

async function summarize(json_out: any): Promise<string> {
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

  return chatCompletion.choices[0]?.message?.content ?? '';
}

export async function scrapeAndSummarize(): Promise<string> {

  try {
    const response: AxiosResponse = await axios(config);
    console.log("Scraper output:", JSON.stringify(response.data));
    const summary = await summarize(response.data);
    return summary || ''; // Return an empty string if summary is null
  } catch (error) {
    console.error("Error:", error);
    throw new Error('Failed to scrape and summarize data');
  }
}
