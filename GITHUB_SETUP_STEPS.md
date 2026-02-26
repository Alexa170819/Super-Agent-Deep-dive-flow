# Step-by-Step GitHub Setup Guide

Follow these steps in your terminal to set up GitHub for sharing the prototype.

## Prerequisites

✅ Make sure you have:
- A GitHub account (create one at https://github.com if you don't have one)
- Git installed on your computer (usually comes with macOS)

---

## Step 1: Open Terminal

1. Press `Cmd + Space` to open Spotlight
2. Type "Terminal" and press Enter
3. Terminal will open

---

## Step 2: Navigate to Your Project

In Terminal, type this command and press Enter:

```bash
cd ~/Desktop/agent-generator-main
```

You should see your prompt change to show you're in that directory.

---

## Step 3: Check if Git is Installed

Type this command:

```bash
git --version
```

You should see something like `git version 2.x.x`. If you see an error, you need to install Git first.

---

## Step 4: Configure Git (First Time Only)

If this is your first time using Git, set your name and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and email address.

---

## Step 5: Initialize Git Repository

Initialize a new Git repository in your project:

```bash
git init
```

You should see: `Initialized empty Git repository in ...`

---

## Step 6: Check What Files Will Be Added

See what files Git will track:

```bash
git status
```

You should see a list of files. Files in red are not yet tracked.

---

## Step 7: Add All Files to Git

Add all your project files to Git:

```bash
git add .
```

This adds all files (respecting your `.gitignore` file, so `node_modules` won't be added).

---

## Step 8: Create Your First Commit

Save this snapshot of your code:

```bash
git commit -m "Initial prototype with Personalizable Playlists feature"
```

You should see a message about files being committed.

---

## Step 9: Create GitHub Repository

### Option A: Using GitHub Website (Easiest)

1. Go to https://github.com and sign in
2. Click the **"+"** icon in the top right
3. Click **"New repository"**
4. Fill in:
   - **Repository name**: `agent-generator` (or any name you like)
   - **Description**: "AilyLabs Insights Platform - Personalizable Playlists Prototype"
   - **Visibility**: Choose **Private** (recommended) or **Public**
   - **DO NOT** check "Initialize with README" (we already have files)
5. Click **"Create repository"**

### Option B: Using GitHub CLI (If you have it installed)

```bash
gh repo create agent-generator --private --source=. --remote=origin --push
```

---

## Step 10: Connect Local Repository to GitHub

After creating the repository on GitHub, you'll see a page with setup instructions. 

**Copy the commands from the section that says "push an existing repository from the command line"**

It will look something like this (but with YOUR username):

```bash
git remote add origin https://github.com/YOUR-USERNAME/agent-generator.git
git branch -M main
git push -u origin main
```

**Run these commands one by one in your terminal:**

1. First command (adds GitHub as remote):
```bash
git remote add origin https://github.com/YOUR-USERNAME/agent-generator.git
```
*(Replace YOUR-USERNAME with your actual GitHub username)*

2. Second command (renames branch to main):
```bash
git branch -M main
```

3. Third command (pushes code to GitHub):
```bash
git push -u origin main
```

**Note**: When you run `git push`, GitHub will ask for your username and password. 
- **Username**: Your GitHub username
- **Password**: You'll need a **Personal Access Token** (not your regular password)

---

## Step 11: Create Personal Access Token (If Needed)

If GitHub asks for a password, you need to create a Personal Access Token:

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name like "Agent Generator Project"
4. Select scopes: Check **"repo"** (this gives full repository access)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this token as your password when pushing

---

## Step 12: Verify Upload

After pushing, refresh your GitHub repository page. You should see all your files!

---

## Step 13: Share with AI Team

### Option A: Add Collaborators

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Click **"Collaborators"** in the left sidebar
4. Click **"Add people"**
5. Enter the GitHub usernames or email addresses of your AI team members
6. They'll receive an invitation email

### Option B: Share Repository Link

1. Go to your repository on GitHub
2. Click the green **"Code"** button
3. Copy the repository URL
4. Share this URL with your AI team (they'll need access if it's private)

---

## Step 14: AI Team Clones Repository

Your AI team members will run:

```bash
git clone https://github.com/YOUR-USERNAME/agent-generator.git
cd agent-generator
npm install
npm run dev
```

---

## Troubleshooting

### "Permission denied" error
- Make sure you're using a Personal Access Token, not your password
- Check that the token has "repo" scope

### "Repository not found" error
- Verify the repository URL is correct
- Make sure the repository exists and you have access

### "Already up to date" when pushing
- This is normal if you haven't made changes
- Try making a small change and committing again

### Can't find the repository
- Check https://github.com/YOUR-USERNAME?tab=repositories
- Make sure you're logged into the correct GitHub account

---

## Quick Command Reference

```bash
# Navigate to project
cd ~/Desktop/agent-generator-main

# Initialize git
git init

# Add files
git add .

# Commit
git commit -m "Initial prototype"

# Add GitHub remote (replace with your URL)
git remote add origin https://github.com/YOUR-USERNAME/agent-generator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Next Steps After Setup

1. ✅ Verify all files are on GitHub
2. ✅ Share repository with AI team
3. ✅ Point them to `AI_TEAM_INTEGRATION_GUIDE.md`
4. ✅ Schedule a kickoff meeting

---

**Need Help?** 
- GitHub Docs: https://docs.github.com
- Git Basics: https://git-scm.com/book/en/v2/Getting-Started-Git-Basics
