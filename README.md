# Demo Brand - Nail Salon Website

A modern, responsive website template for nail salons built with HTML, CSS, and JavaScript. This template uses placeholder content inspired by professional nail salon designs and can be easily customized for any nail salon business.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Easy Customization**: Configuration-based content management
- **Image Gallery**: Interactive lightbox gallery for showcasing nail art
- **Contact Form**: Built-in contact form with validation
- **Smooth Scrolling**: Enhanced navigation experience
- **Mobile Menu**: Responsive hamburger menu for mobile devices

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a web browser to view the site
3. Customize the content using the methods described below

## Project Structure

```
nail-salon-app/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── config.json         # Configuration file for easy customization
└── README.md          # This file
```

## Customization Guide

### Easy Asset Swapping

The website is designed for easy customization without touching the code:

#### 1. Using config.json (Recommended)

Edit `config.json` to update:
- Branding (name, tagline, description)
- Contact information
- Services and pricing
- Hero slider content
- Gallery images
- Social media links
- Color theme

#### 2. CSS Variables

Update colors and styling in `styles.css`:

```css
:root {
    --primary-color: #000;          /* Main brand color */
    --secondary-color: #fff;        /* Background color */
    --accent-color: #f8f8f8;        /* Light accent color */
    --text-color: #333;             /* Main text color */
    --light-text: #666;             /* Secondary text color */
}
```

#### 3. Image Replacement

Replace placeholder images with your own:
- Hero section images: Update `heroSlides` in `config.json`
- Service images: Update `services` array in `config.json`
- Gallery images: Update `gallery` array in `config.json`
- About section image: Replace the Unsplash URL in `index.html`

### Content Sections

#### Services
Update the services section by modifying the `services` array in `config.json`:

```json
{
  "id": "service-id",
  "name": "Service Name",
  "description": "Service description",
  "price": 35,
  "duration": "45 minutes",
  "image": "image-url"
}
```

#### Contact Information
Update contact details in `config.json`:

```json
{
  "contact": {
    "address": {
      "street": "Your Street Address",
      "city": "Your City",
      "state": "State",
      "zip": "12345"
    },
    "phone": "(555) 123-4567",
    "email": "your-email@domain.com",
    "hours": {
      "monday": "9AM-7PM",
      // ... other days
    }
  }
}
```

#### Gallery
Add or modify gallery images in `config.json`:

```json
{
  "id": "gallery-1",
  "image": "image-url",
  "alt": "Image description",
  "category": "nail-art"
}
```

## Image Sources

Current placeholder images are sourced from:
- [Unsplash](https://unsplash.com) - Free stock photos
- All images are optimized for web use with appropriate dimensions

### Recommended Image Sizes

- Hero slider: 800x600px
- Service cards: 400x300px  
- Gallery: 400x400px (square)
- About section: 500x600px

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The website is optimized for performance with:
- Optimized images via Unsplash URLs
- Minimal JavaScript
- CSS animations using transforms
- Lazy loading for gallery images

## Deployment

### Static Hosting
Upload all files to any web server or static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting

### Local Development
For local development with live reload, you can use:
- Live Server extension in VS Code
- Python: `python -m http.server 8000`
- Node.js: `npx serve`

## Customization Examples

### Changing Brand Colors
```css
:root {
    --primary-color: #d4af37;  /* Gold */
    --accent-color: #f5f5dc;   /* Beige */
}
```

### Adding New Services
```json
{
  "id": "pedicure",
  "name": "Luxury Pedicure",
  "description": "Complete foot care with relaxing massage",
  "price": 40,
  "duration": "60 minutes",
  "image": "your-image-url"
}
```

### Updating Social Media
```json
{
  "socialMedia": {
    "instagram": "https://instagram.com/yoursalon",
    "facebook": "https://facebook.com/yoursalon",
    "twitter": "https://twitter.com/yoursalon"
  }
}
```

## License

This template is provided as-is for educational and commercial use. Images from Unsplash follow their respective licenses.

## Support

For questions or issues with customization:
1. Check this README for guidance
2. Review the `config.json` structure
3. Examine the CSS variables in `styles.css`

---

**Note**: This template uses "Demo Brand" as placeholder branding. Replace all instances with your actual business information before going live.