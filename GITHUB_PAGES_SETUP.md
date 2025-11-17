# GitHub Pages Setup Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click **New Repository** button
3. Fill in:
   - **Repository name**: `birthday-book-reader`
   - **Description**: `Interactive birthday book reader with animated pages`
   - **Public** (required for GitHub Pages)
4. Click **Create Repository**

## Step 2: Connect Local Repository to GitHub

Copy the repository URL from GitHub (HTTPS or SSH), then run:

```powershell
cd f:\KNhiBDFinal\birthday-book-reader

# Change the remote URL (replace YOUR_USERNAME and YOUR_REPO with your actual values)
git remote add origin https://github.com/YOUR_USERNAME/birthday-book-reader.git

# Or if you prefer SSH:
# git remote add origin git@github.com:YOUR_USERNAME/birthday-book-reader.git

# Verify remote is set correctly
git remote -v
```

## Step 3: Push Code to GitHub

```powershell
# Switch to main branch (GitHub Pages prefers 'main' over 'develop')
git branch -M main

# Push all commits
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes for deployment

## Step 5: Your Site is Live!

GitHub Pages will assign you a URL:
```
https://YOUR_USERNAME.github.io/birthday-book-reader/
```

Your site will be automatically deployed whenever you push new commits to the `main` branch.

## Step 6: Update Path in Code (if needed)

If paths aren't working correctly, the code has been updated to handle both:
- Root deployment: `/` (if deployed as user/org site)
- Subdirectory deployment: `/birthday-book-reader/` (if deployed as project site)

The app automatically detects the correct base path.

## Future Updates

To update your site:
```powershell
# Make changes to files
# ...

# Stage and commit
git add .
git commit -m "Update: [description of changes]"

# Push to GitHub
git push origin main
```

Changes will be deployed automatically within 1-2 minutes.

## Troubleshooting

### Pages not showing content
- Check **Settings → Pages** to see build status
- Open browser DevTools (F12) and check Console for errors
- Verify paths in `src/scripts/page.js` are correct

### Images not loading
- Check image paths in `src/data/pages.json`
- Ensure images exist in `assets/images/`
- Try clearing browser cache (Ctrl+Shift+Delete)

### Need help?
See [GitHub Pages Documentation](https://docs.github.com/en/pages)
