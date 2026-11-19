# Gerador de Contrato de Locação

Next.js app: edit landlord / tenant / property / terms in a form (live preview), then click **Gerar Google Doc** to create a brand-new Google Doc in your Drive.

## Setup

1. `npm install`
2. Google Cloud Console → create a project → enable **Google Drive API**.
3. OAuth consent screen → add yourself as a test user.
4. Credentials → **OAuth client ID** (Web application)
   - Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
5. `cp .env.example .env.local` and fill in `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET` (`openssl rand -base64 32`).
6. `npm run dev` → http://localhost:3000

## How it works

- `lib/contract.ts` – the contract template (from your example). Edit the clause text here.
- `lib/defaults.ts` – initial form values (the example's data).
- `app/api/generate/route.ts` – converts the contract to HTML and uploads it to Drive as a Google Doc (Drive converts it).
- Scope used: `drive.file` (the app can only access files it creates).
- Form data is stored in the browser's localStorage only.

## Deploying

Set the same env vars, change `NEXTAUTH_URL`, and add the production redirect URI
(`https://YOUR_DOMAIN/api/auth/callback/google`) in Google Cloud.
