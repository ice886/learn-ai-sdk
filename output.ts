import { z } from 'zod';
import { generateText, Output } from 'ai';
import { deepseek } from '@ai-sdk/deepseek';
import dotenv from 'dotenv';

dotenv.config();

const result = await generateText({
  model: deepseek('deepseek-v4-pro'),
  output: Output.object({
    schema: z.object({
      name: z.string(),
      age: z.number(),
      skill: z.array(z.string()),
    }),
  }),
  prompt: '生成一个程序员的简历',
});

console.log(result.output)