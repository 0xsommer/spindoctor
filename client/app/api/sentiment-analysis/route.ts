import { NextResponse } from 'next/server';
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { input } = await request.json();

  try {
    const responseSentiment = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a sentiment analysis assistant. Respond with only 'neutral', 'negative', or 'positive'." },
        { role: "user", content: `What sentiment does the title: "${input}" indicate?` }
      ],
      temperature: 0.5,
      max_tokens: 21,
    });

    const rawSentiment = responseSentiment.choices[0]?.message?.content?.trim() ?? '';
    const sentiment = normalizeSentiment(rawSentiment);

    const responseReason = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a sentiment analysis assistant. Provide a short explanation for the sentiment classification." },
        { role: "user", content: `You said the title "${input}" has a ${sentiment} sentiment. Provide one short sentence with a reason for your classification focused on the words used. Answer in the language the title was written, default to english if unsure:` }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const reason = responseReason.choices[0]?.message?.content?.trim() ?? '';

    return NextResponse.json({
      sentiment: sentiment,
      reason: reason,
      input: input,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred during sentiment analysis' }, { status: 500 });
  }
}

function normalizeSentiment(sentiment: string): string {
  if (/^(neautral|Neutral|neautrally|neautralness|neautrality)$/.test(sentiment)) {
    return "neutral";
  } else if (/^(negitive|Negative|negitively|negitiveness|negitivity)$/.test(sentiment)) {
    return "negative";
  } else if (/^(positve|Positive|positvely|positveness|positvity)$/.test(sentiment)) {
    return "positive";
  }
  return sentiment === "positive" || sentiment === "negative" ? sentiment : "neutral";
}