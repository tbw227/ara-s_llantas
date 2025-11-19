# Ara's Llanta's Frontend

React frontend application for Ara's Llanta's tire shop.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm start
```

The app will open at `http://localhost:3000`

### Production Build

Build for production:

```bash
npm run build
```

**Important:** The build output goes to the `build/` directory at the root of the frontend folder, **NOT** `public/build/`.

- ✅ Correct: `frontend/build/` (created by `npm run build`)
- ❌ Wrong: `frontend/public/build/` (should not exist)

The `public/` folder contains source files (images, index.html, etc.) that get copied into `build/` during the build process.

### Project Structure

```
frontend/
├── public/          # Source static assets (images, index.html, etc.)
├── src/             # React source code
├── build/           # Build output (created by npm run build, gitignored)
├── package.json     # Dependencies
└── vercel.json      # Vercel deployment config
```

## 📦 Deployment

This project is configured for Vercel deployment. The `vercel.json` file specifies:
- Build command: `npm run build`
- Output directory: `build`

See the root `VERCEL_DEPLOYMENT.md` for detailed deployment instructions.

## 🛠️ Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production (outputs to `build/`)
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## 📝 Notes

- The `build/` directory is gitignored and should not be committed
- The `public/build/` directory should not exist - if you see it, it's from a previous misconfiguration and can be safely deleted
- Source images are in `public/images/` and get copied to `build/images/` during build

