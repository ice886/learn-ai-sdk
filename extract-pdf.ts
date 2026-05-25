import { deepseek } from '@ai-sdk/deepseek';
import { generateText, Output } from 'ai';
import dotenv from 'dotenv';
import { z } from 'zod';
import { readFileSync } from 'fs';
import { PDFParse } from 'pdf-parse';

dotenv.config();

const model = deepseek('deepseek-chat');

const schema = z
  .object({
    total: z
      .number()
      .describe("发票总金额。"),
    currency: z
      .string()
      .describe("总金额的货币类型。"),
    invoiceNumber: z
      .string()
      .describe("发票编号。"),
    companyAddress: z
      .string()
      .describe("销售方/开票方的地址。在发票的'销售方信息'或'开票方'区域查找。"),
    companyName: z
      .string()
      .describe("销售方/开票方的公司名称。在发票的'销售方信息'或'开票方'区域查找。"),
    invoiceeAddress: z
      .string()
      .describe("购买方/收票方的地址。在发票的'购买方信息'或'收票方'区域查找。"),
  })
  .describe("从发票中提取的数据。");

export const extractDataFromInvoice = async (
  invoicePath: string,
) => {
  const pdfBuffer = readFileSync(invoicePath);
  const parser = new PDFParse({ data: pdfBuffer });
  const pdfData = await parser.getText();
  const pdfText = pdfData.text;

  const { output } = await generateText({
    model,
    system:
      `你是一个发票数据提取助手。` +
      `请仔细阅读发票文本，提取所有指定字段。` +
      `每个字段都必须填写，如果找不到对应信息，用空字符串 "" 代替。` +
      `地址信息通常在发票顶部或底部的'销售方'和'购买方'区域。`,
    output: Output.object({
      schema,
    }),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `以下是发票的文本内容：\n\n${pdfText}`,
          },
        ],
      },
    ],
  });

  return output;
};

const result = await extractDataFromInvoice(
  "./invoice.pdf",
);

console.dir(result, { depth: null });
