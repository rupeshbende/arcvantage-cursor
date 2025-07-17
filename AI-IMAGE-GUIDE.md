# 🎨 ArcVantage AI Image Generation Guide

This guide provides comprehensive instructions for generating realistic architectural and design images for the ArcVantage Design Studios website using AI services.

## 🚀 Quick Start

### 1. Set Up AI Service API Keys

Choose one or more AI services and set up your API keys:

#### OpenAI DALL-E (Recommended)
```bash
export OPENAI_API_KEY="your-openai-api-key-here"
```

#### Stability AI
```bash
export STABILITY_API_KEY="your-stability-api-key-here"
```

#### Replicate
```bash
export REPLICATE_API_KEY="your-replicate-api-key-here"
```

### 2. Generate Images

```bash
# Activate virtual environment
source venv/bin/activate

# Generate all images with AI
python3 ai-image-generator.py
```

## 📋 Image Requirements

### Hero Section
- **File**: `images/hero/hero-background.jpg`
- **Size**: 1920x1080px minimum
- **Style**: Modern architectural facade with curved elements
- **Quality**: High resolution, professional photography style

### Project Portfolio (6 images)
- **Files**: `images/projects/[project-name].jpg`
- **Size**: 800x600px minimum
- **Style**: Architectural photography of completed projects
- **Projects**:
  - Serenity Heights (luxury residential)
  - Urban Arc Office (commercial)
  - Heritage Renovation (restoration)
  - Riverside Villa (residential)
  - Innovation Campus (educational)
  - Coastal Retreat (vacation home)

### Blog Featured Images (6 images)
- **Files**: `images/blog/[blog-name].jpg`
- **Size**: 800x400px minimum
- **Style**: Abstract design concepts and interior photography
- **Topics**:
  - Arc-Based Design
  - Natural Light
  - Creating Flow
  - Color Psychology
  - Sustainable Design
  - Small Spaces

### Team Photos (2 images)
- **Files**: `images/team/[member-name].jpg`
- **Size**: 400x400px minimum
- **Style**: Professional headshots in modern office setting
- **Members**:
  - Sarah Chen (Architect)
  - Marcus Rodriguez (Interior Designer)

## 🎯 AI Service Comparison

### OpenAI DALL-E 3
- **Best for**: High-quality, realistic architectural photography
- **Strengths**: Excellent detail, professional quality, consistent style
- **Cost**: ~$0.04 per image
- **Speed**: 10-30 seconds per image

### Stability AI
- **Best for**: Creative architectural concepts and artistic interpretations
- **Strengths**: Highly customizable, artistic control, multiple models
- **Cost**: ~$0.02 per image
- **Speed**: 15-45 seconds per image

### Replicate
- **Best for**: Open-source models and custom workflows
- **Strengths**: Multiple models, cost-effective, community-driven
- **Cost**: ~$0.01-0.03 per image
- **Speed**: 20-60 seconds per image

## 📝 Optimized Prompts

### Hero Image
```
Modern architectural hero image for ArcVantage Design Studios:
Elegant curved building facade with glass and steel construction,
natural light streaming through curved windows,
minimalist design with clean lines,
professional architectural photography style,
soft warm lighting, high resolution professional quality,
suitable for website hero section, 4K quality
```

### Project Images
```
Modern luxury residential building with curved balconies and floor-to-ceiling windows, 
architectural photography, natural lighting, elegant design, professional quality, 
exterior view, modern architecture, curved design elements
```

### Blog Images
```
Abstract architectural design concept with curved elements, 
modern design illustration, professional graphic design, 
architectural visualization, clean minimalist style
```

### Team Images
```
Professional headshot of a female architect in modern office setting, 
professional photography, business attire, confident pose, 
architectural background, natural lighting, high quality
```

## 🔧 Customization Options

### Image Dimensions
Modify the `size` parameter in the AI service calls:
- Hero: 1920x1080 or 2048x1024
- Projects: 1024x768 or 1200x900
- Blog: 1024x512 or 1200x600
- Team: 512x512 or 600x600

### Style Variations
Add style modifiers to prompts:
- `photorealistic, highly detailed`
- `architectural photography, professional lighting`
- `modern minimalist design`
- `curved architectural elements`
- `natural light, soft shadows`

### Quality Settings
- **Standard**: Good quality, faster generation
- **HD**: Higher quality, slower generation
- **4K**: Maximum quality, longest generation time

## 🚀 Advanced Usage

### Batch Generation
```python
# Generate specific image types
generator = AIImageGenerator()

# Generate only hero image
hero_result = generator.generate_hero_image("openai")

# Generate only project images
project_results = generator.generate_project_images("stability")

# Generate only blog images
blog_results = generator.generate_blog_images("replicate")
```

### Custom Prompts
```python
# Use custom prompts for specific needs
custom_prompt = """
Modern office building with curved glass facade,
architectural photography, professional lighting,
corporate environment, modern workspace design,
high resolution, professional quality
"""

result = generator.generate_with_openai(custom_prompt, "custom-image.jpg", "images/projects/")
```

### Multiple Services
```python
# Generate with multiple services and choose the best
services = ["openai", "stability", "replicate"]
results = {}

for service in services:
    results[service] = generator.generate_hero_image(service)
```

## 📊 Quality Control

### Image Validation
- Check resolution and aspect ratio
- Verify color accuracy and lighting
- Ensure architectural elements are clear
- Confirm professional quality standards

### Optimization
- Compress images for web use (JPEG quality 85-90%)
- Create multiple sizes for responsive design
- Add alt text for accessibility
- Optimize loading speed

### Backup Strategy
- Keep original high-resolution images
- Create multiple variations for A/B testing
- Store prompts and settings for regeneration
- Maintain version control for image updates

## 💰 Cost Optimization

### Budget Planning
- **OpenAI DALL-E**: ~$0.04 per image (15 images = ~$0.60)
- **Stability AI**: ~$0.02 per image (15 images = ~$0.30)
- **Replicate**: ~$0.01-0.03 per image (15 images = ~$0.15-0.45)

### Cost-Saving Tips
- Use standard quality for initial testing
- Generate multiple variations in one session
- Reuse successful prompts for similar images
- Consider bulk generation for better rates

## 🔄 Integration with Website

### Update Image References
After generating images, update the website files:

1. **HTML**: Update image src attributes
2. **CSS**: Adjust background-image properties
3. **JavaScript**: Update image paths in galleries
4. **JSON**: Update data files with new image paths

### Responsive Images
Create multiple sizes for responsive design:
- Desktop: 1920x1080 (hero), 800x600 (projects)
- Tablet: 1024x768 (hero), 600x450 (projects)
- Mobile: 768x432 (hero), 400x300 (projects)

## 🎯 Best Practices

### Prompt Engineering
- Be specific about architectural style
- Include lighting and mood requirements
- Specify image composition and framing
- Mention professional quality standards

### Quality Assurance
- Review each generated image
- Ensure consistency across the set
- Check for architectural accuracy
- Verify brand alignment

### Performance Optimization
- Compress images appropriately
- Use lazy loading for galleries
- Implement progressive loading
- Cache images for faster loading

## 🆘 Troubleshooting

### Common Issues
1. **API Key Errors**: Verify API keys are set correctly
2. **Rate Limits**: Implement delays between requests
3. **Quality Issues**: Adjust prompts or try different services
4. **Size Problems**: Check image dimensions and aspect ratios

### Debugging
```python
# Enable debug mode
import logging
logging.basicConfig(level=logging.DEBUG)

# Check API key status
print(f"OpenAI API Key: {'Set' if os.getenv('OPENAI_API_KEY') else 'Not Set'}")
print(f"Stability API Key: {'Set' if os.getenv('STABILITY_API_KEY') else 'Not Set'}")
print(f"Replicate API Key: {'Set' if os.getenv('REPLICATE_API_KEY') else 'Not Set'}")
```

## 📞 Support

For issues with image generation:
1. Check API key configuration
2. Verify internet connection
3. Review service-specific error messages
4. Try alternative AI services
5. Use placeholder images as fallback

---

**Next Steps**: 
1. Set up your preferred AI service API key
2. Run the image generator
3. Review and optimize generated images
4. Update the website with new images
5. Test the website with new images
6. Deploy to GitHub Pages 