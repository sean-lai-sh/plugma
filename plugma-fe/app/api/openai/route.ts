import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Setup OpenAI config
const agent = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY});

// ✅ Named export for POST (App Router requirement)
export async function POST(req: Request) {
  try {
    const { userPrompt } = await req.json();

    if (!userPrompt) {
      return NextResponse.json({ error: 'No prompt provided.' }, { status: 400 });
    }

    // Load system prompt from /prompts/prompt.txt
    const promptPath = path.join(process.cwd(), 'prompts', 'prompt.txt');
    const systemPrompt = fs.readFileSync(promptPath, 'utf8');

    const response = await agent.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: [{ type: 'text', text: systemPrompt }] },
        { role: 'user', content: [{ type: 'text', text: userPrompt }] },
      ],
      max_tokens: 250,
    });

    return NextResponse.json({
      result: response.choices[0].message?.content,
    });
  } catch (err: any) {
    console.error('[OpenAI Route Error]', err.message);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
