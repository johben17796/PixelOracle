import express from 'express';
import type { Request, Response } from 'express';

import { GoogleGenerativeAI } from '@google/generative-ai';

import * as dotenv from 'dotenv';
dotenv.config();

const key = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(key || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//DO NOT TAKE OUT THE CONSOLE LOGS. CODE BREAKS WITHOUT CONSOLE LOGS FOR SOME REASON.
function extractJsonString(input: string): string {
    const extract = input.toString().replace(/`/g, '');
    console.log('EXTRACT', extract);
    const extract1 = extract.toString().replace(/json/g, '');
    console.log('EXTRACT 1', extract1);
    const extract2 = extract1.trim();
    console.log('EXTRACT 2', extract2);
    return extract2;
}

function parseJsonArray(input: string): any {
    try {
        const cleanedString = extractJsonString(input);
        return JSON.parse(cleanedString);
    } catch (error) {
        console.error("Failed to parse JSON:", error, input);
        throw error;
    }
}

const router = express.Router();

//get response based on variable
router.get('/:favorites', async (_req: Request, res: Response) => {

    let { favorites } = _req.params;
    console.log('Favs recieved:', favorites);

    try {

        let gameInject = favorites.toString();

        if (gameInject === '') {
            gameInject = 'widely varied, with no specific selections.'
        }

        const prompt = `My favorite video games are ${gameInject}.
        As a modern video game reviewer with a wide knowledge of video games both popular and obscure, please recommend me three more games to play, and explain why I should play them.
        You should recommend a wide variety of games related to the user's choices, and games that you are less likely to recommend repeatedly.
        Deliver your response as a JSON object which contains a single paragraph summarizing all three reccomendations, accompanied by a title.
        Do not include anything besides the title of your paragraph and the paragraph itself, no further formatting is needed.
        Never include backticks in your response, only the JSON data.
        DO NOT SURROUND THE RESPONSE WITH NORMAL INDICATIONS OF CODE. RETURN ONLY THE TITLE LABELED TITLE, AND THE SUMMARY LABELLED SUMMARY.
        `;

        const result = await model.generateContent(prompt);

        const cleanResult = parseJsonArray(result.response.text());

        // res.status(200).json(result);

        res.status(200).send(cleanResult);
        console.log('Gemini says:', cleanResult);

    } catch (error) {

        res.status(500).json({ error });

    }
})

export { router as geminiRouter };
