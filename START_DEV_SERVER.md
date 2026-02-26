# How to Start and Check the Dev Server

## Step 1: Open Terminal

On Mac:
- Press `Cmd + Space` to open Spotlight
- Type "Terminal" and press Enter
- Or go to Applications → Utilities → Terminal

## Step 2: Navigate to Project Folder

In the terminal, type:
```bash
cd ~/Desktop/agent-generator-main
```

Press Enter.

## Step 3: Start the Dev Server

Type this command:
```bash
npm run dev
```

Press Enter.

## Step 4: Check if it's Running

You should see output like this:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

✅ **If you see this, the server is running!**

## Step 5: Open in Browser

1. Copy the URL: `http://localhost:5173`
2. Open your web browser (Chrome, Safari, Firefox, etc.)
3. Paste the URL in the address bar
4. Press Enter

## Step 6: Access the Prototype

Once the page loads, change the URL to:
```
http://localhost:5173/prototype
```

Or click the 🧪 icon in the header (if visible).

## How to Check if Server is Already Running

### Method 1: Check the Terminal
- Look for a terminal window that shows "VITE" output
- If you see it, the server is running

### Method 2: Try Opening the URL
- Open `http://localhost:5173` in your browser
- If the page loads, the server is running
- If you get "can't connect", it's not running

### Method 3: Check Port (Advanced)
In terminal, type:
```bash
lsof -ti:5173
```
- If you see a number, the server is running
- If you see nothing, it's not running

## Troubleshooting

### If `npm run dev` doesn't work:

1. **Check if Node.js is installed:**
   ```bash
   node --version
   ```
   If you get an error, install Node.js from nodejs.org

2. **Check if npm is installed:**
   ```bash
   npm --version
   ```
   If you get an error, npm needs to be installed

3. **Install dependencies (if needed):**
   ```bash
   npm install
   ```
   Run this once before starting the dev server

### If port 5173 is already in use:

The server will automatically try the next port (5174, 5175, etc.)
Check the terminal output for the actual URL.

### To Stop the Server:

1. Go to the terminal where it's running
2. Press `Ctrl + C` (or `Cmd + C` on Mac)
3. The server will stop

## Quick Start Checklist

- [ ] Terminal is open
- [ ] In the project folder (`cd ~/Desktop/agent-generator-main`)
- [ ] Dependencies installed (`npm install` - run once)
- [ ] Dev server started (`npm run dev`)
- [ ] Browser opened to `http://localhost:5173/prototype`
