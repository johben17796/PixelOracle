import express from 'express';
import type { Request, Response } from 'express';

import { GoogleGenerativeAI } from '@google/generative-ai';

import * as dotenv from 'dotenv';
dotenv.config();

const key = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(key || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


function parseJsonArray(input: string): any {
    const cleanedString = input.replace(/```json\s|\s```$/g, '').trim();
    return JSON.parse(cleanedString);
}

const router = express.Router();

//get response based on variable
router.get('/', async (_req: Request, res: Response) => {
    try {

        // TODO: PULL GAMES FROM SQL
        const games = [''];
        const gameInject = games.toString();

        const prompt = `My favorite video games are ${gameInject}.
         As a modern video game reviewer with a wide knowledge of video games both popular and obscure, please recommend me three more games to play, and explain why I should play them.
         You should recommend a wide variety of games related to the user's choices, and games that you are less likely to recommend repeatedly.
         Deliver your response as a JSON object which contains three paragraphs summarizing each of your reccomendations under the object name 'recomendations',
         the paragraphs should be named 'summary', and should be accompanied by the title of the recommended game, named 'title'.
         Never include backticks in your response, only the JSON data.
         `;

        const result = await model.generateContent(prompt);

       const cleanResult = parseJsonArray(result.response.text());

        // res.status(200).json(result);

        res.status(200).send(cleanResult);
        console.log('Gemini says:', cleanResult );

    } catch (error) {

        res.status(500).json({ error });

    }
})

export { router as geminiRouter };
