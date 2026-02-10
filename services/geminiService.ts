
import { GoogleGenAI, Type } from "@google/genai";
import { ILesson } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const verbSchema = {
    type: Type.OBJECT,
    properties: {
        verb: { type: Type.STRING },
        v1: { type: Type.STRING },
        v2: { type: Type.STRING },
        v3: { type: Type.STRING },
        hindiMeaning: { type: Type.STRING },
        example: {
            type: Type.OBJECT,
            properties: {
                englishSentence: { type: Type.STRING },
                hindiSentence: { type: Type.STRING },
            },
            required: ['englishSentence', 'hindiSentence']
        }
    },
    required: ['verb', 'v1', 'v2', 'v3', 'hindiMeaning', 'example']
};


const lessonSchema = {
    type: Type.OBJECT,
    properties: {
        day: { type: Type.NUMBER },
        theme: { type: Type.STRING },
        vocabulary: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    englishWord: { type: Type.STRING },
                    hindiMeaning: { type: Type.STRING },
                    englishSentence: { type: Type.STRING },
                    hindiSentence: { type: Type.STRING },
                },
                required: ['englishWord', 'hindiMeaning', 'englishSentence', 'hindiSentence']
            }
        },
        verbs: {
            type: Type.ARRAY,
            items: verbSchema
        },
        spokenPractice: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                englishParagraph: { type: Type.STRING },
                hindiParagraph: { type: Type.STRING },
            },
            required: ['title', 'englishParagraph', 'hindiParagraph']
        },
        dailyTask: { type: Type.STRING }
    },
    required: ['day', 'theme', 'vocabulary', 'verbs', 'spokenPractice', 'dailyTask']
};


export const generateLessonForDay = async (day: number): Promise<ILesson> => {
  const prompt = `
    You are an expert English language tutor creating a lesson plan for a beginner Hindi speaker.
    The user wants to learn English for daily and office life.
    Generate a complete lesson for Day ${day} of a 365-day course. 
    The difficulty should gradually increase with the day number. For early days like Day ${day}, keep it simple and foundational.
    The lesson must cover vocabulary (20 words), verbs (20 verbs), spoken practice, and a daily task.
    Provide all text in both English and its Hindi translation.
    The response must be a JSON object that strictly adheres to the provided schema.

    - The 'theme' should be relevant to a beginner, e.g., "Basic Greetings", "Introducing Yourself", "At the Supermarket", "Office Vocabulary".
    - The 'vocabulary' should contain 20 common English words.
    - The 'verbs' should contain 20 common verbs with their three forms (v1, v2, v3), Hindi meaning, and an example sentence.
    - The 'spokenPractice' should be a short, practical dialogue or paragraph.
    - The 'dailyTask' should be a simple, actionable task to practice the day's learning.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: lessonSchema,
            temperature: 0.5,
        },
    });

    const jsonText = response.text.trim();
    const lessonData = JSON.parse(jsonText);

    // Basic validation to ensure the parsed data looks like our lesson
    if (lessonData && typeof lessonData.day === 'number' && Array.isArray(lessonData.vocabulary) && Array.isArray(lessonData.verbs)) {
        return lessonData as ILesson;
    } else {
        throw new Error("Received malformed lesson data from API.");
    }

  } catch (error) {
    console.error("Error generating lesson:", error);
    throw new Error("Failed to fetch lesson data from Gemini API.");
  }
};
