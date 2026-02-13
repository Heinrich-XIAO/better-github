# Better GitHub

A Chrome browser extension that enhances your GitHub experience with convenient navigation features.

## Features

### 🍴 Fork Navigation Button
When viewing a repository owned by someone else, a **"Go to Fork"** or **"Fork This Repo"** button is automatically added to the repository header. This lets you quickly navigate to your fork or create one if you haven't already.

### 📂 Recent Repositories on Dashboard
Replaces the Copilot chat input on your GitHub dashboard with a list of your 5 most recent repositories for quick access.

## Installation

### From Source

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Build the extension:
   ```bash
   bun run build
   ```
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" in the top right
6. Click "Load unpacked" and select the `dist/` folder

## Privacy

Better GitHub respects your privacy:

- **No data collection** - All data is stored locally on your device
- **No external servers** - No data is transmitted to third parties
- **Local storage only** - Stores only your username and recent repositories list

See [PRIVACY.md](PRIVACY.md) for the full privacy policy.

## Permissions

- **`storage`**: To save your recent repositories list
- **`github.com` access**: To inject content scripts and enhance GitHub pages

## Tech Stack

- **Vite** - Build tool and dev server
- **CRXJS** - Chrome extension Vite plugin
- **Vanilla JavaScript** - No frameworks, minimal dependencies

## Development

```bash
# Start development server
bun run dev

# Build for production
bun run build
```

