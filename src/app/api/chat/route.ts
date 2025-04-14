import { openai } from '@ai-sdk/openai';
import { streamText, tool,generateText } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

const celularSchema = z.object({
  name: z.string().describe('El nombre del celular'),
  price: z.number().describe('El precio del celular'),
  brand: z.string().describe('La marca del celular'),
  description: z.string().describe('La descripción del celular'),
  image: z.string().describe('La URL de la imagen del celular'),
});

export async function GET(req: Request) {


  const result = await generateText({
    model: openai('gpt-4o-mini'),
    tools: {
      celular: tool({
        parameters: celularSchema,
      }),
    },
    prompt:'Devuelve un celular recomendado en relación calidad/precio.',
  });

  return Response.json(result);
}
