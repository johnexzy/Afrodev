# Portfolio Export Guide

This guide explains how to export your portfolio as a static website for sharing, deployment, or offline viewing.

## 🚀 Quick Export

### Export as Static Website
```bash
npm run export
```
This generates a complete static site in the `.output/public` directory.

### Export to Custom Directory
```bash
npm run export:portfolio
```
This exports your portfolio to a `portfolio-export` directory.

### Export as PDF
Visit your portfolio page (`/portfolio`) and click the **"Export to PDF"** button to generate a professional PDF version of your portfolio. Features:
- ✅ **One-click PDF generation** directly from the browser
- ✅ **Professional formatting** optimized for print and digital sharing
- ✅ **Clean layout** without background animations or navigation elements
- ✅ **High-quality rendering** with proper typography and spacing
- ✅ **Automatic filename**: `John_Oba_Portfolio.pdf`

## 📁 What Gets Exported

Your static export includes:
- ✅ **Portfolio page** with all projects and experience
- ✅ **Blog posts** and articles
- ✅ **Fluid organic background** animations
- ✅ **Dark mode** functionality
- ✅ **All images** and assets
- ✅ **SEO optimization** and meta tags
- ✅ **Responsive design** for all devices

## 🌐 Deployment Options

### 1. **Static Hosting** (Recommended)
Deploy the exported files to:
- **Netlify** - Drag & drop the export folder
- **Vercel** - Connect your GitHub repo
- **GitHub Pages** - Upload to `gh-pages` branch
- **Cloudflare Pages** - Direct upload

### 2. **Traditional Web Hosting**
Upload the exported files to any web server:
- **cPanel/Shared Hosting** - Upload to `public_html`
- **VPS/Dedicated Server** - Upload to web directory

### 3. **Preview Locally**
```bash
npm run preview:export
```
This starts a local server to preview your exported portfolio.

## 📋 Export Checklist

Before exporting:
- [ ] Update your resume link
- [ ] Verify all project links work
- [ ] Check that images load properly
- [ ] Test dark/light mode toggle
- [ ] Confirm contact information is current

## 🎨 Customization for Export

### Custom Base URL
If deploying to a subdirectory, update `nuxt.config.ts`:
```typescript
app: {
  baseURL: '/your-subdirectory/'
}
```

### Disable Analytics (Optional)
For exported versions, you might want to remove analytics:
Comment out the Hotjar script in `nuxt.config.ts`

## 🔧 Troubleshooting

### Images Not Loading
Ensure all images use relative paths or are in the `public/` directory.

### Background Animation Issues
The fluid organic background uses p5.js and should work in static exports. If issues occur, check browser console for errors.

### Missing Pages
Add any custom routes to the prerender list in `nuxt.config.ts`:
```typescript
nitro: {
  prerender: {
    routes: ['/portfolio', '/blog', '/your-custom-page']
  }
}
```

## 📤 Sharing Your Portfolio

### Professional Sharing
1. **PDF Export** → Visit `/portfolio` and click "Export to PDF" for instant professional document
2. **Static Export** → `npm run export:portfolio` 
3. **Zip** the `portfolio-export` folder (for static hosting)
4. **Share** PDF via email or upload to cloud storage
5. **Deploy** static files to hosting platform

### Quick Demo
1. **Live Preview** → `npm run preview:export`
2. **PDF Preview** → Use the export button on portfolio page
3. **Share** the local URL or PDF for immediate viewing

---

Your exported portfolio is completely self-contained and ready for professional presentation! 🎉
