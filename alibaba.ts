import { createAlibaba } from '@ai-sdk/alibaba';
import { generateText } from 'ai';
import dotenv from 'dotenv';

dotenv.config();

const alibaba = createAlibaba({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
});

async function main() {
  const { text } = await generateText({
    model: alibaba('qwen3.5-omni-flash'),
    prompt: '用一句话介绍杭州',
  });

  console.log(text);
}

main().catch(console.error);
