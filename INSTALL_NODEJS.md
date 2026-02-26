# How to Install Node.js on Mac

Node.js is required to run the development server. Here's how to install it:

## Method 1: Download from Official Website (Easiest)

1. **Open your web browser** (Safari, Chrome, etc.)

2. **Go to:** https://nodejs.org/

3. **Download the LTS version** (Long Term Support - recommended)
   - Look for the big green button that says "LTS" 
   - It will download a `.pkg` file

4. **Install the package:**
   - Open the downloaded file (usually in your Downloads folder)
   - Follow the installation wizard
   - Click "Continue" through all the steps
   - Enter your Mac password when prompted
   - Click "Install"

5. **Verify installation:**
   - Open Terminal again
   - Type: `node --version`
   - Press Enter
   - You should see a version number like `v20.x.x` or `v18.x.x`
   - Type: `npm --version`
   - Press Enter
   - You should see a version number like `10.x.x`

6. **Restart Terminal** (close and reopen it)

## Method 2: Using Homebrew (If you have it)

If you already have Homebrew installed, you can use:

```bash
brew install node
```

To check if you have Homebrew:
```bash
brew --version
```

If you get "command not found", use Method 1 instead.

## After Installation

Once Node.js is installed:

1. **Close and reopen Terminal** (important!)

2. **Navigate to your project:**
   ```bash
   cd ~/Desktop/agent-generator-main
   ```

3. **Install project dependencies:**
   ```bash
   npm install
   ```
   (This only needs to be done once)

4. **Start the dev server:**
   ```bash
   npm run dev
   ```

5. **Open your browser to:**
   ```
   http://localhost:5173/prototype
   ```

## Troubleshooting

### If you still get "command not found" after installing:

1. **Close Terminal completely** and reopen it
2. **Check your PATH** - sometimes you need to restart your Mac
3. **Try the full path:**
   ```bash
   /usr/local/bin/node --version
   ```

### If the download doesn't work:

- Make sure you're downloading from nodejs.org (not a third-party site)
- Try a different browser
- Check your internet connection

### Need Help?

If you're stuck, let me know:
- What error message you see
- Which step you're on
- What happens when you try to install
