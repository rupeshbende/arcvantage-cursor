#!/usr/bin/env python3
"""
ArcVantage Design Studios - Advanced AI Image Generator
Integrates with multiple AI services for realistic architectural images
"""

import os
import requests
import json
import base64
from PIL import Image, ImageDraw, ImageFont
import io
from datetime import datetime
import time

class AIImageGenerator:
    def __init__(self):
        self.images_dir = "images"
        self.projects_dir = "images/projects"
        self.blog_dir = "images/blog"
        self.team_dir = "images/team"
        self.hero_dir = "images/hero"
        
        # Create directories
        for directory in [self.images_dir, self.projects_dir, self.blog_dir, self.team_dir, self.hero_dir]:
            os.makedirs(directory, exist_ok=True)
        
        # AI Service configurations
        self.services = {
            "openai": {
                "name": "OpenAI DALL-E",
                "api_key": os.getenv("OPENAI_API_KEY"),
                "endpoint": "https://api.openai.com/v1/images/generations"
            },
            "stability": {
                "name": "Stability AI",
                "api_key": os.getenv("STABILITY_API_KEY"),
                "endpoint": "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"
            },
            "replicate": {
                "name": "Replicate",
                "api_key": os.getenv("REPLICATE_API_KEY"),
                "endpoint": "https://api.replicate.com/v1/predictions"
            }
        }
    
    def generate_with_openai(self, prompt, filename, directory):
        """Generate image using OpenAI DALL-E"""
        if not self.services["openai"]["api_key"]:
            return self._create_placeholder(prompt, filename, directory, "OpenAI DALL-E")
        
        headers = {
            "Authorization": f"Bearer {self.services['openai']['api_key']}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "dall-e-3",
            "prompt": prompt,
            "size": "1024x1024",
            "quality": "standard",
            "n": 1
        }
        
        try:
            response = requests.post(
                self.services["openai"]["endpoint"],
                headers=headers,
                json=data
            )
            
            if response.status_code == 200:
                result = response.json()
                image_url = result["data"][0]["url"]
                
                # Download the image
                img_response = requests.get(image_url)
                if img_response.status_code == 200:
                    filepath = os.path.join(directory, filename)
                    with open(filepath, "wb") as f:
                        f.write(img_response.content)
                    
                    print(f"✅ Generated with OpenAI: {filepath}")
                    return {"status": "success", "service": "OpenAI", "path": filepath}
            
            return self._create_placeholder(prompt, filename, directory, "OpenAI DALL-E")
            
        except Exception as e:
            print(f"❌ OpenAI error: {str(e)}")
            return self._create_placeholder(prompt, filename, directory, "OpenAI DALL-E")
    
    def generate_with_stability(self, prompt, filename, directory):
        """Generate image using Stability AI"""
        if not self.services["stability"]["api_key"]:
            return self._create_placeholder(prompt, filename, directory, "Stability AI")
        
        headers = {
            "Authorization": f"Bearer {self.services['stability']['api_key']}",
            "Content-Type": "application/json"
        }
        
        data = {
            "text_prompts": [{"text": prompt}],
            "cfg_scale": 7,
            "height": 1024,
            "width": 1024,
            "samples": 1,
            "steps": 30
        }
        
        try:
            response = requests.post(
                self.services["stability"]["endpoint"],
                headers=headers,
                json=data
            )
            
            if response.status_code == 200:
                result = response.json()
                image_data = result["artifacts"][0]["base64"]
                
                # Decode and save image
                image_bytes = base64.b64decode(image_data)
                filepath = os.path.join(directory, filename)
                with open(filepath, "wb") as f:
                    f.write(image_bytes)
                
                print(f"✅ Generated with Stability AI: {filepath}")
                return {"status": "success", "service": "Stability AI", "path": filepath}
            
            return self._create_placeholder(prompt, filename, directory, "Stability AI")
            
        except Exception as e:
            print(f"❌ Stability AI error: {str(e)}")
            return self._create_placeholder(prompt, filename, directory, "Stability AI")
    
    def generate_with_replicate(self, prompt, filename, directory):
        """Generate image using Replicate"""
        if not self.services["replicate"]["api_key"]:
            return self._create_placeholder(prompt, filename, directory, "Replicate")
        
        headers = {
            "Authorization": f"Token {self.services['replicate']['api_key']}",
            "Content-Type": "application/json"
        }
        
        data = {
            "version": "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            "input": {
                "prompt": prompt,
                "width": 1024,
                "height": 1024
            }
        }
        
        try:
            # Start prediction
            response = requests.post(
                self.services["replicate"]["endpoint"],
                headers=headers,
                json=data
            )
            
            if response.status_code == 201:
                prediction = response.json()
                prediction_id = prediction["id"]
                
                # Poll for completion
                while True:
                    status_response = requests.get(
                        f"https://api.replicate.com/v1/predictions/{prediction_id}",
                        headers=headers
                    )
                    
                    if status_response.status_code == 200:
                        status_result = status_response.json()
                        
                        if status_result["status"] == "succeeded":
                            image_url = status_result["output"][0]
                            
                            # Download image
                            img_response = requests.get(image_url)
                            if img_response.status_code == 200:
                                filepath = os.path.join(directory, filename)
                                with open(filepath, "wb") as f:
                                    f.write(img_response.content)
                                
                                print(f"✅ Generated with Replicate: {filepath}")
                                return {"status": "success", "service": "Replicate", "path": filepath}
                        
                        elif status_result["status"] == "failed":
                            break
                    
                    time.sleep(1)
            
            return self._create_placeholder(prompt, filename, directory, "Replicate")
            
        except Exception as e:
            print(f"❌ Replicate error: {str(e)}")
            return self._create_placeholder(prompt, filename, directory, "Replicate")
    
    def _create_placeholder(self, prompt, filename, directory, service_name):
        """Create a placeholder image with service information"""
        img = Image.new('RGB', (1024, 1024), color='#1a365d')
        draw = ImageDraw.Draw(img)
        
        # Add gradient effect
        for y in range(1024):
            r = int(26 + (y / 1024) * 20)
            g = int(54 + (y / 1024) * 30)
            b = int(93 + (y / 1024) * 40)
            draw.line([(0, y), (1024, y)], fill=(r, g, b))
        
        # Add architectural elements
        self._draw_architectural_elements(draw, 1024, 1024)
        
        # Add text
        try:
            title_font = ImageFont.truetype("Arial", 48)
            body_font = ImageFont.truetype("Arial", 24)
        except:
            title_font = ImageFont.load_default()
            body_font = ImageFont.load_default()
        
        # Add title
        draw.text((512, 200), "ArcVantage Design Studios", fill='white', anchor="mm", font=title_font)
        
        # Add service info
        draw.text((512, 300), f"AI Service: {service_name}", fill='#38b2ac', anchor="mm", font=body_font)
        
        # Add prompt info
        prompt_lines = self._wrap_text(prompt, 80)
        y_offset = 400
        for line in prompt_lines:
            draw.text((512, y_offset), line, fill='#d69e2e', anchor="mm", font=body_font)
            y_offset += 30
        
        # Add filename
        draw.text((512, 900), f"Generated: {filename}", fill='white', anchor="mm", font=body_font)
        
        # Save image
        filepath = os.path.join(directory, filename)
        img.save(filepath, 'JPEG', quality=95)
        print(f"📝 Created placeholder for {service_name}: {filepath}")
        
        return {"status": "placeholder", "service": service_name, "path": filepath}
    
    def _draw_architectural_elements(self, draw, width, height):
        """Draw architectural elements on the placeholder"""
        # Curved building facade
        draw.rectangle([width * 0.1, height * 0.3, width * 0.9, height * 0.8], fill='#2d3748', outline='#38b2ac', width=3)
        
        # Curved elements
        draw.arc([width * 0.2, height * 0.2, width * 0.8, height * 0.6], 0, 180, fill='#38b2ac', width=5)
        
        # Windows
        for i in range(5):
            x = width * 0.15 + i * width * 0.15
            draw.rectangle([x, height * 0.35, x + width * 0.1, height * 0.6], fill='#f7fafc', outline='#1a365d', width=2)
        
        # Decorative elements
        draw.ellipse([width * 0.3, height * 0.7, width * 0.7, height * 0.9], fill='#d69e2e', outline='#1a365d', width=2)
    
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
    
    def generate_hero_image(self, service="openai"):
        """Generate hero background image"""
        prompt = """
        Modern architectural hero image for ArcVantage Design Studios:
        Elegant curved building facade with glass and steel construction,
        natural light streaming through curved windows,
        minimalist design with clean lines,
        professional architectural photography style,
        soft warm lighting, high resolution professional quality,
        suitable for website hero section, 4K quality
        """
        
        filename = "hero-background.jpg"
        
        if service == "openai":
            return self.generate_with_openai(prompt, filename, self.hero_dir)
        elif service == "stability":
            return self.generate_with_stability(prompt, filename, self.hero_dir)
        elif service == "replicate":
            return self.generate_with_replicate(prompt, filename, self.hero_dir)
        else:
            return self._create_placeholder(prompt, filename, self.hero_dir, "Placeholder")
    
    def generate_project_images(self, service="openai"):
        """Generate project portfolio images"""
        projects = [
            {
                "name": "serenity-heights",
                "prompt": "Modern luxury residential building with curved balconies and floor-to-ceiling windows, architectural photography, natural lighting, elegant design, professional quality"
            },
            {
                "name": "urban-arc-office",
                "prompt": "Contemporary office building with curved glass facade, modern workspace design, architectural photography, professional lighting, corporate environment"
            },
            {
                "name": "heritage-renovation",
                "prompt": "Renovated heritage building with modern curved additions, architectural photography, before and after style, elegant transformation, historical preservation"
            },
            {
                "name": "riverside-villa",
                "prompt": "Luxury villa with curved architecture overlooking water, modern residential design, architectural photography, natural surroundings, waterfront property"
            },
            {
                "name": "innovation-campus",
                "prompt": "Modern innovation campus with curved buildings, contemporary architecture, architectural photography, professional campus design, technology hub"
            },
            {
                "name": "coastal-retreat",
                "prompt": "Coastal retreat with curved architecture, modern beach house design, architectural photography, ocean views, luxury vacation home"
            }
        ]
        
        results = []
        for project in projects:
            filename = f"{project['name']}.jpg"
            
            if service == "openai":
                result = self.generate_with_openai(project['prompt'], filename, self.projects_dir)
            elif service == "stability":
                result = self.generate_with_stability(project['prompt'], filename, self.projects_dir)
            elif service == "replicate":
                result = self.generate_with_replicate(project['prompt'], filename, self.projects_dir)
            else:
                result = self._create_placeholder(project['prompt'], filename, self.projects_dir, "Placeholder")
            
            results.append(result)
        
        return results
    
    def generate_blog_images(self, service="openai"):
        """Generate blog article featured images"""
        blog_posts = [
            {
                "name": "arc-based-design",
                "prompt": "Abstract architectural design concept with curved elements, modern design illustration, professional graphic design, architectural visualization"
            },
            {
                "name": "natural-light",
                "prompt": "Interior space with abundant natural light through curved windows, architectural photography, bright and airy design, modern interior"
            },
            {
                "name": "creating-flow",
                "prompt": "Open floor plan with curved walls creating natural flow, architectural photography, modern interior design, seamless transitions"
            },
            {
                "name": "color-psychology",
                "prompt": "Interior design with thoughtful color palette, curved architectural elements, architectural photography, color theory in design, harmonious spaces"
            },
            {
                "name": "sustainable-design",
                "prompt": "Green building with sustainable features and curved architecture, architectural photography, eco-friendly design, LEED certified building"
            },
            {
                "name": "small-spaces",
                "prompt": "Small space design with curved elements maximizing functionality, architectural photography, compact living solutions, efficient design"
            }
        ]
        
        results = []
        for blog in blog_posts:
            filename = f"{blog['name']}.jpg"
            
            if service == "openai":
                result = self.generate_with_openai(blog['prompt'], filename, self.blog_dir)
            elif service == "stability":
                result = self.generate_with_stability(blog['prompt'], filename, self.blog_dir)
            elif service == "replicate":
                result = self.generate_with_replicate(blog['prompt'], filename, self.blog_dir)
            else:
                result = self._create_placeholder(blog['prompt'], filename, self.blog_dir, "Placeholder")
            
            results.append(result)
        
        return results
    
    def generate_team_images(self, service="openai"):
        """Generate professional team member photos"""
        team_members = [
            {
                "name": "sarah-chen",
                "prompt": "Professional headshot of a female architect in modern office setting, professional photography, business attire, confident pose, architectural background"
            },
            {
                "name": "marcus-rodriguez",
                "prompt": "Professional headshot of a male interior designer in modern office setting, professional photography, business attire, confident pose, design studio background"
            }
        ]
        
        results = []
        for member in team_members:
            filename = f"{member['name']}.jpg"
            
            if service == "openai":
                result = self.generate_with_openai(member['prompt'], filename, self.team_dir)
            elif service == "stability":
                result = self.generate_with_stability(member['prompt'], filename, self.team_dir)
            elif service == "replicate":
                result = self.generate_with_replicate(member['prompt'], filename, self.team_dir)
            else:
                result = self._create_placeholder(member['prompt'], filename, self.team_dir, "Placeholder")
            
            results.append(result)
        
        return results
    
    def generate_all_images(self, service="openai"):
        """Generate all images using specified AI service"""
        print(f"🚀 Starting ArcVantage AI Image Generation with {service.upper()}...")
        print("=" * 60)
        
        results = {
            "hero": [],
            "projects": [],
            "blog": [],
            "team": []
        }
        
        # Generate hero image
        print(f"\n🏠 Generating Hero Image with {service.upper()}...")
        results["hero"].append(self.generate_hero_image(service))
        
        # Generate project images
        print(f"\n🏗️ Generating Project Images with {service.upper()}...")
        results["projects"] = self.generate_project_images(service)
        
        # Generate blog images
        print(f"\n📝 Generating Blog Images with {service.upper()}...")
        results["blog"] = self.generate_blog_images(service)
        
        # Generate team images
        print(f"\n👥 Generating Team Images with {service.upper()}...")
        results["team"] = self.generate_team_images(service)
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 Generation Summary:")
        print(f"Hero images: {len(results['hero'])}")
        print(f"Project images: {len(results['projects'])}")
        print(f"Blog images: {len(results['blog'])}")
        print(f"Team images: {len(results['team'])}")
        print("=" * 60)
        
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
        
        with open("ai-image-manifest.json", "w") as f:
            json.dump(manifest, f, indent=2)
        
        print("📋 AI Image manifest created: ai-image-manifest.json")
        return manifest

def main():
    """Main function to generate all images"""
    generator = AIImageGenerator()
    
    # Check available services
    available_services = []
    for service_name, service_config in generator.services.items():
        if service_config["api_key"]:
            available_services.append(service_name)
    
    if not available_services:
        print("⚠️  No AI service API keys found. Using placeholder images.")
        print("💡 To use real AI generation, set environment variables:")
        print("   - OPENAI_API_KEY for OpenAI DALL-E")
        print("   - STABILITY_API_KEY for Stability AI")
        print("   - REPLICATE_API_KEY for Replicate")
        service = "placeholder"
    else:
        print(f"✅ Available AI services: {', '.join(available_services)}")
        service = available_services[0]  # Use first available service
    
    # Generate all images
    results = generator.generate_all_images(service)
    
    # Create manifest
    generator.create_image_manifest(results)
    
    print("\n🎉 AI Image generation complete!")
    print("\n📁 Images saved in:")
    print("  - images/hero/")
    print("  - images/projects/")
    print("  - images/blog/")
    print("  - images/team/")
    
    print("\n💡 Next steps:")
    print("1. Review generated images")
    print("2. Update website to use new images")
    print("3. Test website with new images")
    print("4. Deploy to GitHub Pages")

if __name__ == "__main__":
    main() 