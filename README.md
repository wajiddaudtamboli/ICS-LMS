# ICS LMS

Modern, friendly UI for the ICS LMS experience, built with React + Vite.

## Highlights

- Clean, responsive UI across multiple LMS sections
- Component-based structure for easy iteration
- Fast local dev with Vite

## Tech Stack

- React
- Vite
- CSS

## Getting Started

```powershell
cd D:\All Projects\ICS-LMS
npm install
npm run dev
```

Open `http://localhost:5173`

## Project Structure

- `src/App.jsx` - App entry
- `src/main.jsx` - React bootstrap
- `src/sections/` - Feature sections and pages

## Scripts

- `npm run dev` - Start local development
- `npm run build` - Create production build
- `npm run preview` - Preview production build

## Deploy to Vercel

1. Push your latest changes to GitHub.
2. Go to Vercel and click **New Project**.
3. Import `ICS-LMS` from GitHub.
4. Set the build settings:
	- Framework: Vite
	- Build Command: `npm run build`
	- Output Directory: `dist`
5. Click **Deploy**.

Vercel will redeploy automatically on every push to your default branch.
