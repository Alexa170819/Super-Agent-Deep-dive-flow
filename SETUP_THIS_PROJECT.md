# GitHub Setup for This Project

This project includes:
- ✅ Story Card Modal with 3 options (Teaser, Impact, Driver)
- ✅ Personalizable Playlists feature
- ✅ End-to-end user flows

## Quick Setup Commands

Run these commands **one by one** in your terminal:

### Step 1: Make sure you're in the right directory
```bash
cd ~/Desktop/agent-generator-main
```

### Step 2: Initialize Git (if not already done)
```bash
git init
```

You should see: `Initialized empty Git repository in ...`

### Step 3: Add all files
```bash
git add .
```

### Step 4: Commit
```bash
git commit -m "Initial prototype: Story Card Modal (3 options) + Personalizable Playlists"
```

### Step 5: Create GitHub Repository

1. Open https://github.com in your browser
2. Sign in
3. Click **"+"** (top right) → **"New repository"**
4. Fill in:
   - **Repository name**: `agent-generator` (or `aily-insights-prototype`)
   - **Description**: "AilyLabs Insights Platform - Story Card Modal (3 options) + Personalizable Playlists"
   - **Visibility**: Private (recommended) or Public
   - **DO NOT** check "Add a README" (we already have files)
5. Click **"Create repository"**

### Step 6: Connect to GitHub

After creating the repo, GitHub shows commands. Copy and run these (replace `YOUR-USERNAME`):

```bash
git remote add origin https://github.com/YOUR-USERNAME/agent-generator.git
git branch -M main
git push -u origin main
```

**Note**: When `git push` asks for password, use a **Personal Access Token** (not your password).

### Step 7: Create Personal Access Token (if needed)

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name: "Agent Generator Project"
4. Check **"repo"** scope
5. Click **"Generate token"**
6. **Copy the token** and use it as your password when pushing

---

## Troubleshooting

### "fatal: not a git repository"
→ Run `git init` first

### "Permission denied" when pushing
→ Use Personal Access Token, not password

### "Repository not found"
→ Check the repository URL is correct

---

## What's Included in This Repository

- **Story Card Modal**: 3 variants (Teaser, Impact, Driver)
- **Personalizable Playlists**: Create, edit, and manage playlists
- **AI Integration Points**: Ready for AI team to connect real APIs
- **Documentation**: Integration guides for AI team

---

**Start with Step 1 above!** 🚀
