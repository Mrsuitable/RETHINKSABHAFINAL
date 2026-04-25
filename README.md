<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Rethink Sabha

Rethink Sabha is a student-led platform for structured debate practice, argument research, and communication skill building.

View your app in AI Studio: https://ai.studio/apps/0886ccf9-73bd-43ea-9575-c3ff41491167

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## AI Debate Coach

The coach calls the Vercel serverless route at `/api/coach`, which reads `OPENAI_API_KEY` from server environment variables.
Do not put private AI API keys in frontend source code or commit them to GitHub.

Required Vercel environment variable:

`OPENAI_API_KEY`

Optional Vercel environment variable:

`OPENAI_MODEL` (defaults to `gpt-4.1-mini`)
