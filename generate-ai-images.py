#!/usr/bin/env python3
"""
ArcVantage Design Studios - AI Image Generator
Generates realistic architectural and design images using AI tools
"""

import os
import requests
import json
from PIL import Image, ImageDraw, ImageFont
import io
import base64
from datetime import datetime

class ArcVantageImageGenerator:
    def __init__(self):
        self.images_dir = "images"
        self.projects_dir = "images/projects"
        self.blog_dir = "images/blog"
        self.team_dir = "images/team"
        self.hero_dir = "images/hero"
        
        # Create directories if they don't exist
        for directory in [self.images_dir, self.projects_dir, self.blog_dir, self.team_dir, self.hero_dir]:
            os.makedirs(directory, exist_ok=True)
    
    def generate_hero_image(self):
        """Generate hero background image for ArcVantage"""
        prompt = """
        Modern architectural hero image for ArcVantage Design Studios:
        - Elegant curved building facade with glass and steel
        - Natural light streaming through curved windows
        - Minimalist design with clean lines
        - Professional architectural photography style
        - Soft, warm lighting
        - High resolution, professional quality
        - Suitable for website hero section
        """
        
        filename = "hero-background.jpg"
        return self._generate_image(prompt, filename, self.hero_dir)
    
    def generate_project_images(self):
        """Generate project portfolio images"""
        projects = [
            {
                "name": "serenity-heights",
                "prompt": "Modern luxury residential building with curved balconies and floor-to-ceiling windows, architectural photography, natural lighting, elegant design"
            },
            {
                "name": "urban-arc-office",
                "prompt": "Contemporary office building with curved glass facade, modern workspace design, architectural photography, professional lighting"
            },
            {
                "name": "heritage-renovation",
                "prompt": "Renovated heritage building with modern curved additions, architectural photography, before and after style, elegant transformation"
            },
            {
                "name": "riverside-villa",
                "prompt": "Luxury villa with curved architecture overlooking water, modern residential design, architectural photography, natural surroundings"
            },
            {
                "name": "innovation-campus",
                "prompt": "Modern innovation campus with curved buildings, contemporary architecture, architectural photography, professional campus design"
            },
            {
                "name": "coastal-retreat",
                "prompt": "Coastal retreat with curved architecture, modern beach house design, architectural photography, ocean views"
            }
        ]
        
        generated_images = []
        for project in projects:
            filename = f"{project['name']}.jpg"
            result = self._generate_image(project['prompt'], filename, self.projects_dir)
            generated_images.append(result)
        
        return generated_images
    
    def generate_blog_images(self):
        """Generate blog article featured images"""
        blog_posts = [
            {
                "name": "arc-based-design",
                "prompt": "Abstract architectural design concept with curved elements, modern design illustration, professional graphic design"
            },
            {
                "name": "natural-light",
                "prompt": "Interior space with abundant natural light through curved windows, architectural photography, bright and airy design"
            },
            {
                "name": "creating-flow",
                "prompt": "Open floor plan with curved walls creating natural flow, architectural photography, modern interior design"
            },
            {
                "name": "color-psychology",
                "prompt": "Interior design with thoughtful color palette, curved architectural elements, architectural photography, color theory in design"
            },
            {
                "name": "sustainable-design",
                "prompt": "Green building with sustainable features and curved architecture, architectural photography, eco-friendly design"
            },
            {
                "name": "small-spaces",
                "prompt": "Small space design with curved elements maximizing functionality, architectural photography, compact living solutions"
            }
        ]
        
        generated_images = []
        for blog in blog_posts:
            filename = f"{blog['name']}.jpg"
            result = self._generate_image(blog['prompt'], filename, self.blog_dir)
            generated_images.append(result)
        
        return generated_images
    
    def generate_team_images(self):
        """Generate professional team member photos"""
        team_members = [
            {
                "name": "sarah-chen",
                "prompt": "Professional headshot of a female architect in modern office setting, professional photography, business attire, confident pose"
            },
            {
                "name": "marcus-rodriguez",
                "prompt": "Professional headshot of a male interior designer in modern office setting, professional photography, business attire, confident pose"
            }
        ]
        
        generated_images = []
        for member in team_members:
            filename = f"{member['name']}.jpg"
            result = self._generate_image(member['prompt'], filename, self.team_dir)
            generated_images.append(result)
        
        return generated_images
    
    def _generate_image(self, prompt, filename, directory):
        """Generate image using AI service"""
        try:
            # This is a placeholder for AI image generation
            # In practice, you would integrate with services like:
            # - OpenAI DALL-E API
            # - Stability AI API
            # - Midjourney API
            # - Adobe Firefly API
            
            print(f"🎨 Generating: {filename}")
            print(f"📝 Prompt: {prompt}")
            
            # For now, create a placeholder image with the prompt
            self._create_placeholder_image(prompt, filename, directory)
            
            return {
                "filename": filename,
                "path": os.path.join(directory, filename),
                "prompt": prompt,
                "status": "generated"
            }
            
        except Exception as e:
            print(f"❌ Error generating {filename}: {str(e)}")
            return {
                "filename": filename,
                "path": os.path.join(directory, filename),
                "prompt": prompt,
                "status": "error",
                "error": str(e)
            }
    
    def _create_placeholder_image(self, prompt, filename, directory):
        """Create a placeholder image with prompt information"""
        # Create a 800x600 image with gradient background
        img = Image.new('RGB', (800, 600), color='#1a365d')
        draw = ImageDraw.Draw(img)
        
        # Add gradient effect
        for y in range(600):
            r = int(26 + (y / 600) * 20)
            g = int(54 + (y / 600) * 30)
            b = int(93 + (y / 600) * 40)
            draw.line([(0, y), (800, y)], fill=(r, g, b))
        
        # Add text
        try:
            font = ImageFont.truetype("Arial", 24)
        except:
            font = ImageFont.load_default()
        
        # Add title
        draw.text((400, 200), "ArcVantage Design Studios", fill='white', anchor="mm", font=font)
        
        # Add prompt info
        prompt_lines = self._wrap_text(prompt, 60)
        y_offset = 250
        for line in prompt_lines:
            draw.text((400, y_offset), line, fill='#38b2ac', anchor="mm", font=ImageFont.load_default())
            y_offset += 25
        
        # Add filename
        draw.text((400, 500), f"Generated: {filename}", fill='#d69e2e', anchor="mm", font=ImageFont.load_default())
        
        # Save image
        filepath = os.path.join(directory, filename)
        img.save(filepath, 'JPEG', quality=95)
        print(f"✅ Created placeholder: {filepath}")
    
    def _wrap_text(self, text, max_width):
        """Wrap text to fit within max_width characters"""
        words = text.split()
        lines = []
        current_line = ""
        
        for word in words:
            if len(current_line + " " + word) <= max_width:
                current_line += " " + word if current_line else word
            else:
                if current_line:
                    lines.append(current_line)
                current_line = word
        
        if current_line:
            lines.append(current_line)
        
        return lines
    
    def generate_all_images(self):
        """Generate all images for the website"""
        print("🚀 Starting ArcVantage Image Generation...")
        print("=" * 50)
        
        results = {
            "hero": [],
            "projects": [],
            "blog": [],
            "team": []
        }
        
        # Generate hero image
        print("\n🏠 Generating Hero Image...")
        results["hero"].append(self.generate_hero_image())
        
        # Generate project images
        print("\n🏗️ Generating Project Images...")
        results["projects"] = self.generate_project_images()
        
        # Generate blog images
        print("\n📝 Generating Blog Images...")
        results["blog"] = self.generate_blog_images()
        
        # Generate team images
        print("\n👥 Generating Team Images...")
        results["team"] = self.generate_team_images()
        
        # Print summary
        print("\n" + "=" * 50)
        print("📊 Generation Summary:")
        print(f"Hero images: {len(results['hero'])}")
        print(f"Project images: {len(results['projects'])}")
        print(f"Blog images: {len(results['blog'])}")
        print(f"Team images: {len(results['team'])}")
        print("=" * 50)
        
        return results
    
    def create_image_manifest(self, results):
        """Create a JSON manifest of all generated images"""
        manifest = {
            "generated_at": datetime.now().isoformat(),
            "total_images": sum(len(images) for images in results.values()),
            "images": {
                "hero": results["hero"],
                "projects": results["projects"],
                "blog": results["blog"],
                "team": results["team"]
            }
        }
        
        with open("image-manifest.json", "w") as f:
            json.dump(manifest, f, indent=2)
        
        print("📋 Image manifest created: image-manifest.json")
        return manifest

def main():
    """Main function to generate all images"""
    generator = ArcVantageImageGenerator()
    
    # Generate all images
    results = generator.generate_all_images()
    
    # Create manifest
    generator.create_image_manifest(results)
    
    print("\n🎉 Image generation complete!")
    print("\n📁 Images saved in:")
    print("  - images/hero/")
    print("  - images/projects/")
    print("  - images/blog/")
    print("  - images/team/")
    
    print("\n💡 Next steps:")
    print("1. Review generated images")
    print("2. Replace placeholders with real AI-generated images")
    print("3. Update website to use new images")
    print("4. Test website with new images")

if __name__ == "__main__":
    main() 