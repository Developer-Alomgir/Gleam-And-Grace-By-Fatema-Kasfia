# Gleam and Geace - Jewelry & Cosmetics Shop

A stunning, fully-functional e-commerce web shop built with modern HTML, CSS, and JavaScript.

## ✨ Features

- 🎨 Modern dark theme with purple/black gradients
- 💎 Multiple product categories (Jewelry, Cosmetics, Watches, Bags, Pendants, Rings, Earrings, Crafting)
- 🛒 Shopping cart with checkout functionality
- 💳 Payment options: Bkash & Cash on Delivery
- 📦 Order tracking system
- 🖼️ Image upload for products and shop logo
- 📱 Fully responsive (Mobile & Desktop)
- ✨ Exclusive collection carousels with RTL animation
- 👆 Touch-enabled scrolling on carousels
- 🎭 Typewriter animation effects
- 💫 Animated backgrounds and shimmer effects

## 🚀 Quick Start

1. Clone this repository
2. Open `index.html` in your browser
3. That's it! No build process required.

## 📁 Project Structure
```
gleam-geace-shop/
├── index.html          # Main HTML file (contains all code)
├── vercel.json        # Vercel deployment configuration
├── package.json       # Project configuration
└── README.md          # This file
```

## 🌐 Deploy to Vercel

### Method 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to your project directory:
```bash
cd your-project-folder
```

3. Deploy:
```bash
vercel
```

### Method 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

Your site will be live at: `https://your-project-name.vercel.app`

## 🐙 Deploy to GitHub Pages

1. Create a new repository on GitHub

2. Initialize git in your project folder:
```bash
git init
git add .
git commit -m "Initial commit"
```

3. Add your GitHub repository as remote:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

4. Push to GitHub:
```bash
git branch -M main
git push -u origin main
```

5. Enable GitHub Pages:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "main" branch as source
   - Click "Save"

Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO`

## 📱 Mobile Optimization

The shop is fully optimized for mobile devices with:
- Responsive grid layouts
- Touch-enabled carousel scrolling
- Mobile-friendly navigation
- Optimized font sizes and spacing
- Single-column layout on small screens

## 🛠️ Customization

### Update Shop Information

Edit the hero section in `index.html`:
```javascript
// Change shop name, address, contact info
```

### Add/Edit Products

Modify the products array in the JavaScript section:
```javascript
const products = [
    { id: 1, name: 'Product Name', price: 15000, category: 'jewelry', featured: true },
    // Add more products...
];
```

### Change Colors

Modify the CSS variables and gradient colors in the `<style>` section.

## 📞 Contact

- **Address:** Gandaria New Road, Dhaka South City Corporation, Bangladesh
- **Email:** gleamgeace@email.com
- **Phone:** +880 1XXX-XXXXXX

## 👨‍💻 Developer

Built by **ALOMGIR HOSSEN**

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!
```

## 📥 How to Use These Files:

1. **Copy the index.html** from the artifact above
2. **Create these 3 new files** in the same folder:
   - `vercel.json` - Copy the first code block
   - `package.json` - Copy the second code block  
   - `README.md` - Copy the third code block

3. **Your folder structure should look like:**
```
gleam-geace-shop/
├── index.html       ← From the artifact
├── vercel.json      ← Create this
├── package.json     ← Create this
└── README.md        ← Create this