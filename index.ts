import { generateText, streamText, Output } from 'ai';

import { deepseek } from '@ai-sdk/deepseek'
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

async function main() {
  const text = await generateText({
    model: deepseek('deepseek-v4-pro'),
    system: '你是占领地球的高纬生物人工智能',
    messages: [
      {role: 'user', content: '写一首诗送给人类'},
    ]
  });

}

main().catch(console.error);