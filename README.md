# ArcVantage Design Studios Website

A modern, responsive website for ArcVantage Design Studios, an architecture firm specializing in innovative arc-based living space design. The website showcases the firm's expertise in creating serene environments through architectural excellence.

## 🌟 Features

### Design & User Experience
- **Modern Arc-Inspired Design**: Clean lines, elegant typography, and strategic use of arc-inspired visual elements
- **Responsive Layout**: Fully responsive design that works seamlessly across all devices (mobile, tablet, desktop)
- **Smooth Animations**: Subtle animations and transitions that enhance user experience
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support

### Content Sections
- **Hero Section**: Compelling introduction with animated arc elements
- **About Section**: Firm story, philosophy, and team showcase
- **Projects Gallery**: Dynamic portfolio with filtering and modal views
- **Services Section**: Comprehensive service offerings with interactive cards
- **Blog Section**: Informative articles about arc-based design with search and filtering
- **Contact Section**: Multiple contact methods with form validation

### Technical Features
- **Single Page Application**: Smooth scrolling navigation between sections
- **Dynamic Content Loading**: Projects and blog posts loaded from JSON files
- **Form Validation**: Client-side validation with user-friendly error messages
- **Lazy Loading**: Optimized image loading for better performance
- **Cross-Browser Compatible**: Works on all modern browsers

## 🚀 Quick Start

### Prerequisites
- A modern web browser
- Git (for deployment)
- GitHub account (for hosting)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/arcvantage-website.git
   cd arcvantage-website
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     
     # Using PHP
     php -S localhost:8000
     ```

3. **View the website**
   - Navigate to `http://localhost:8000` (or the port shown by your server)

## 📁 Project Structure

```
arcvantage-website/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Main stylesheet with design system
│   └── responsive.css      # Responsive design rules
├── js/
│   ├── main.js            # Core functionality (navigation, forms, projects)
│   └── blog.js            # Blog-specific functionality
├── data/
│   ├── projects.json      # Project portfolio data
│   └── blog-posts.json    # Blog content data
├── images/
│   ├── projects/          # Project images
│   ├── blog/              # Blog post images
│   ├── team/              # Team member photos
│   ├── hero/              # Hero section images
│   └── icons/             # Icons and logos
└── README.md              # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep Navy (#1a365d) - Professional, trustworthy
- **Secondary**: Warm Gold (#d69e2e) - Luxury, sophistication
- **Accent**: Soft Teal (#38b2ac) - Calm, serenity
- **Neutral**: Light Gray (#f7fafc) - Clean backgrounds
- **Text**: Charcoal (#2d3748) - Readable, modern

### Typography
- **Headings**: Montserrat (Google Fonts) - Modern, geometric
- **Body Text**: Open Sans (Google Fonts) - Readable, friendly
- **Accent Text**: Playfair Display - Elegant, architectural

### Arc-Inspired Elements
- Curved borders and rounded corners throughout
- Arc-shaped dividers between sections
- Circular image frames for team photos
- Curved navigation elements
- Arc-based loading animations

## 🔧 Customization

### Adding New Projects
1. Edit `data/projects.json`
2. Add your project data following the existing structure
3. Add project images to `images/projects/`
4. The website will automatically load and display new projects

### Adding New Blog Posts
1. Edit `data/blog-posts.json`
2. Add your blog post data following the existing structure
3. Add blog images to `images/blog/`
4. The website will automatically load and display new posts

### Modifying Content
- **Text Content**: Edit the HTML directly in `index.html`
- **Styling**: Modify `css/styles.css` for design changes
- **Functionality**: Edit JavaScript files in the `js/` directory

## 🌐 Deployment

### GitHub Pages Deployment

1. **Create a new repository on GitHub**
   - Go to GitHub and create a new repository
   - Name it `arcvantage-website` or your preferred name

2. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/arcvantage-website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "GitHub Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Your website will be live at**
   - `https://yourusername.github.io/arcvantage-website`

### Custom Domain (Optional)
1. Purchase a domain name
2. In GitHub repository settings, add your custom domain
3. Configure DNS settings with your domain provider
4. Your site will be accessible at your custom domain

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔍 Performance

The website is optimized for:
- **Fast Loading**: Optimized images and minified assets
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Mobile Performance**: Responsive images and touch-friendly interactions
- **Accessibility**: ARIA labels and keyboard navigation

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks, lightweight and fast
- **Google Fonts**: Typography
- **Font Awesome**: Icons
- **JSON**: Data storage for dynamic content

### Key Features
- **Progressive Enhancement**: Works without JavaScript
- **Graceful Degradation**: Fallbacks for older browsers
- **Mobile-First**: Responsive design approach
- **Performance Optimized**: Lazy loading and efficient code

## 📞 Support

For questions or support:
- **Email**: hello@arcvantage.com
- **Phone**: +1 (555) 123-4567
- **Office**: 123 Design District, San Francisco, CA 94102

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📈 Future Enhancements

- [ ] Image gallery with lightbox
- [ ] Contact form backend integration
- [ ] Blog CMS integration
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Advanced animations
- [ ] SEO optimization tools
- [ ] Analytics integration

---

**ArcVantage Design Studios** - Creating serene living environments through innovative arc-based architectural design. 