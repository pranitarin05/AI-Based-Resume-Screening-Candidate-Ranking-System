import { json } from "express";
import ai from "../config/ai.js";
import Resume from "../models/Resume.js";

// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required data" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPEN_AI_MODEL,
            temperature: 0.7,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Enhance the professional summary of a resume. The summary should be 1–2 sentences highlighting key skills, experience, and career objectives. Make it compelling, ATS-friendly, and return only the text.",
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        return res.status(200).json({
            enhancedContent: response.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required data" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPEN_AI_MODEL,
            temperature: 0.7,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Enhance the job description of a resume. The description should be 1–2 sentences highlighting key responsibilities and achievements. Use strong action verbs and quantifiable results where possible. Make it ATS-friendly and return only the text.",
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        return res.status(200).json({
            enhancedContent: response.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: "Missing required data" });
        }

        const systemPrompt =
            "You are an expert AI agent that extracts structured resume data.";

        const userPrompt = `
Extract structured data from the following resume text.

Return ONLY valid JSON. Do not include explanations or formatting.

JSON format:
{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [],
  "project": [],
  "education": [],
  "certifications": []
}

Resume text:
${resumeText}
`;

        const response = await ai.chat.completions.create({
            model: process.env.OPEN_AI_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
        });

        let parsedData;
        try {
            parsedData = JSON.parse(response.choices[0].message.content);
        } catch {
            return res.status(500).json({
                message: "AI returned invalid resume data",
            });
        }

        const newResume = await Resume.create({
            userId,
            title: title || "Uploaded Resume",
            ...parsedData,
        });

        return res.json({ resumeId: newResume._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
