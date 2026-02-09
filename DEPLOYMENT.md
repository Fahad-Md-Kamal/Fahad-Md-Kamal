# 🚀 Deployment Guide

This guide will walk you through deploying your portfolio to GitHub Pages for **free hosting**.

## Prerequisites

- GitHub account
- Git installed on your computer
- Your portfolio files ready

## Step 1: Repository Setup

1. **Create a new repository on GitHub**:
   - Go to [GitHub](https://github.com) and click "New repository"
   - Name it `portfolio` (or any name you prefer)
   - Make sure it's **public** (required for free GitHub Pages)
   - Don't initialize with README (we already have files)

2. **Update your configuration**:
   - Open `vite.config.ts`
   - Change `base: '/portfolio/'` to match your repository name
   - If your repo is named `my-website`, use `base: '/my-website/'`

3. **Update package.json**:
   - Change `"homepage": "https://your-username.github.io/portfolio"`
   - Replace `your-username` with your GitHub username
   - Replace `portfolio` with your actual repository name

## Step 2: Initialize Git and Push

```bash
# Navigate to your portfolio folder
cd /home/bjit/Desktop/portfolio

# Initialize git repository
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial portfolio setup"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. **Go to your repository on GitHub**
2. **Click "Settings" tab**
3. **Scroll to "Pages" in the left sidebar**
4. **Under "Source", select "GitHub Actions"**
5. **Save the settings**

## Step 4: Automatic Deployment

The GitHub Action is already configured! Every time you push changes to the main branch:

1. **The workflow will automatically**:
   - Install dependencies
   - Build your project
   - Deploy to GitHub Pages

2. **Your site will be available at**:
   `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME`

## Step 5: Enable GitHub Pages (Alternative Method)

If you prefer manual deployment:

1. **Build your project locally**:
   ```bash
   npm run build
   ```

2. **Install gh-pages** (if not already installed):
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy manually**:
   ```bash
   npm run deploy
   ```

## 🔄 Updating Your Portfolio

### To add a new project:

1. **Edit `src/data/projects.json`**
2. **Add your project images to `public/images/projects/`**
3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add new project: Your Project Name"
   git push
   ```
4. **Wait 2-3 minutes for deployment**

### To update personal info:

1. **Edit `src/data/profile.json`**
2. **Replace `public/resume.pdf` with your latest resume**
3. **Commit and push changes**

## 🛠️ Troubleshooting

### Common Issues:

1. **404 Error after deployment**:
   - Check that `base` in `vite.config.ts` matches your repository name
   - Ensure repository is public
   - Wait a few minutes after enabling GitHub Pages

2. **Images not loading**:
   - Ensure images are in the `public/images/` directory
   - Use paths starting with `/images/` in your JSON files
   - Check image file names match exactly (case-sensitive)

3. **Build fails**:
   - Check the Actions tab in your GitHub repository
   - Look for error messages in the workflow run
   - Common fix: ensure all image paths in JSON files are correct

### Build Optimization:

- **Images**: Use optimized images (WebP format recommended)
- **File sizes**: Keep images under 1MB for best performance
- **Alt text**: Add descriptive alt text for accessibility

## 🎨 Custom Domain (Optional)

To use your own domain:

1. **Buy a domain** from any registrar
2. **Add CNAME file** to `public/` directory with your domain
3. **Configure DNS** with your domain provider:
   - Add CNAME record: `www` → `your-username.github.io`
   - Add A records for apex domain to GitHub's IPs
4. **Update GitHub Pages settings** with your custom domain

## 📊 Analytics (Optional)

Add Google Analytics:

1. **Create Google Analytics account**
2. **Add tracking code to `index.html`**:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

## ✅ Success Checklist

- [ ] Repository created and configured
- [ ] All files pushed to GitHub
- [ ] GitHub Pages enabled 
- [ ] First deployment successful
- [ ] Site accessible at GitHub Pages URL
- [ ] All sections loading correctly
- [ ] Images displaying properly
- [ ] Mobile responsive
- [ ] Contact form working
- [ ] Resume download working

## 🆘 Need Help?

1. **Check GitHub Actions**: Look at the "Actions" tab for deployment logs
2. **Browser Console**: Open developer tools to check for errors
3. **GitHub Issues**: Create an issue in the repository for bugs
4. **Documentation**: Refer to the main README.md for configuration help

---

**🎉 Congratulations!** Your professional portfolio is now live and accessible to potential employers and clients worldwide!

**Next Steps**:
1. Share your portfolio URL on social media
2. Add it to your resume and LinkedIn profile  
3. Keep it updated with new projects and achievements
4. Monitor analytics to see visitor engagement