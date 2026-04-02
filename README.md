# ICS LMS

Modern, friendly UI for the ICS LMS experience, built with React + Vite.

## [*] Highlights

- Clean, responsive UI across core LMS sections
- Component-driven pages for easy iteration
- Fast local dev powered by Vite

## [*] Tech Stack

- React
- Vite
- CSS
- Express (local API)

## [*] Quick Start

```powershell
cd D:\All Projects\ICS-LMS
npm install
npm run dev
```

Open `http://localhost:5173`

## [*] Local API (optional)

```powershell
npm run dev:server
```

Server runs at `http://localhost:5175`.

### Environment Variables

Create a `.env` file in the project root if you use meetings or tokens:

```
RAPIDAPI_KEY=your_key
RAPIDAPI_HOST=your_host
VIDEOSDK_SECRET_KEY=your_secret
```

## [*] Project Structure

- `src/App.jsx` - App entry
- `src/main.jsx` - React bootstrap
- `src/sections/` - Feature sections and pages

## [*] Scripts

- `npm run dev` - Start local development
- `npm run dev:server` - Start local API server
- `npm run build` - Create production build
- `npm run preview` - Preview production build

## [*] Deploy to Vercel

1. Push your latest changes to GitHub.
2. In Vercel, click **New Project** and import `ICS-LMS`.
3. Build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy.

Vercel will redeploy on every push to the default branch.

> Note: The API server in `server.js` is for local development. Host it separately if you need API endpoints in production.
