import { generateText } from 'ai';
import { deepseek } from '@ai-sdk/deepseek';
import { readFileSync } from "fs";
import dotenv from 'dotenv';
import { createAlibaba } from '@ai-sdk/alibaba';

dotenv.config();

const systemPrompt =
  `You will receive an image. ` +
  `Please create an alt text for the image. ` +
  `Be concise. ` +
  `Use adjectives only when necessary. ` +
  `Do not pass 160 characters. ` +
  `Use simple language. `;

const alibaba = createAlibaba({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
});
export const describeImage = async (
  imageUrl: string,
) => {
  // const imageAsUint8Array = readFileSync(imagePath);
  // const base64 = imageAsUint8Array.toString('base64');
  // const ext = imagePath.split('.').pop()?.toLowerCase() ?? 'jpeg';
  // const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : ext === 'gif' ? 'image/gif' : 'image/jpeg';
  // const dataUrl = `data:${mimeType};base64,${base64}`;

  const { text } = await generateText({
    model: alibaba('qwen3.5-omni-flash'),
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe this image." },
          { type: "image", image: new URL(imageUrl),},
        ],
      },
    ],
  });

  return text;
};

const description = await describeImage(
  "https://github.com/ai-hero-dev/ai-hero/blob/main/internal/assets/image.jpg?raw=true",
);

console.log(description);