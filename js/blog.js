// Blog functionality for ArcVantage Design Studios

// Blog data and functionality
let blogPosts = [];
let filteredPosts = [];

// Initialize blog functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeBlog();
});

function initializeBlog() {
    loadBlogPosts();
    initializeBlogSearch();
    initializeBlogCategories();
    initializeBlogModals();
}

// Load blog posts from JSON file
async function loadBlogPosts() {
    try {
        const response = await fetch('data/blog-posts.json');
        blogPosts = await response.json();
        filteredPosts = [...blogPosts];
        displayBlogPosts(filteredPosts);
    } catch (error) {
        console.error('Error loading blog posts:', error);
        // Fallback to sample blog posts
        loadSampleBlogPosts();
    }
}

// Load sample blog posts
function loadSampleBlogPosts() {
    blogPosts = [
        {
            id: '1',
            title: 'The Art of Arc-Based Design: Creating Serene Living Spaces',
            excerpt: 'Discover how the strategic use of arcs and curves can transform ordinary spaces into extraordinary sanctuaries that promote peace and harmony.',
            content: `
                <h2>The Art of Arc-Based Design: Creating Serene Living Spaces</h2>
                <p class="blog-meta">
                    <span><i class="fas fa-user"></i> Sarah Chen</span>
                    <span><i class="fas fa-calendar"></i> January 15, 2024</span>
                    <span><i class="fas fa-tag"></i> Design Tips</span>
                </p>
                
                <p>In the world of architectural design, few elements have the power to transform a space quite like the arc. At ArcVantage Design Studios, we've made it our mission to harness the natural flow and serenity that curved elements bring to living environments.</p>
                
                <h3>The Psychology of Curves</h3>
                <p>Research has shown that curved lines and shapes have a profound psychological impact on human perception. Unlike sharp angles and straight lines, which can create tension and stress, curves naturally guide the eye and create a sense of movement and flow. This is why arc-based design has become increasingly popular in creating serene living spaces.</p>
                
                <h3>Key Principles of Arc Integration</h3>
                <ul>
                    <li><strong>Natural Flow:</strong> Curved walls and doorways create natural pathways that guide movement through a space</li>
                    <li><strong>Visual Continuity:</strong> Arcs eliminate harsh transitions and create seamless visual connections</li>
                    <li><strong>Emotional Comfort:</strong> Curved elements evoke feelings of safety and comfort</li>
                    <li><strong>Functional Beauty:</strong> Arc-based design serves both aesthetic and practical purposes</li>
                </ul>
                
                <h3>Practical Applications</h3>
                <p>From arched doorways that welcome visitors to curved seating areas that encourage conversation, arc-based design can be integrated into every aspect of your living space. Consider these applications:</p>
                
                <ul>
                    <li>Curved accent walls that serve as focal points</li>
                    <li>Arched windows that frame natural light beautifully</li>
                    <li>Circular gathering spaces that promote social interaction</li>
                    <li>Curved kitchen islands that facilitate workflow</li>
                </ul>
                
                <h3>Creating Your Serene Sanctuary</h3>
                <p>The key to successful arc-based design lies in balance and proportion. Too many curves can create a chaotic feeling, while too few may not achieve the desired effect. Our design philosophy emphasizes the strategic placement of curved elements to create harmony and flow.</p>
                
                <p>Whether you're renovating an existing space or building from the ground up, consider how arc-based design can enhance your living environment. The result will be a space that not only looks beautiful but feels inherently peaceful and welcoming.</p>
            `,
            author: 'Sarah Chen',
            publishDate: '2024-01-15',
            category: 'design-tips',
            tags: ['arcs', 'serenity', 'interior-design', 'curves'],
            featuredImage: 'blog-1.jpg'
        },
        {
            id: '2',
            title: 'Maximizing Natural Light Through Arc Architecture',
            excerpt: 'Learn how arc-based architectural elements can enhance natural lighting and create brighter, more inviting living spaces.',
            content: `
                <h2>Maximizing Natural Light Through Arc Architecture</h2>
                <p class="blog-meta">
                    <span><i class="fas fa-user"></i> Marcus Rodriguez</span>
                    <span><i class="fas fa-calendar"></i> January 10, 2024</span>
                    <span><i class="fas fa-tag"></i> Architecture</span>
                </p>
                
                <p>Natural light is one of the most important elements in creating a welcoming and healthy living environment. At ArcVantage Design Studios, we've discovered that arc-based architectural elements can dramatically enhance how natural light interacts with your space.</p>
                
                <h3>The Science of Light and Curves</h3>
                <p>Curved surfaces have unique properties when it comes to light reflection and diffusion. Unlike flat surfaces that reflect light in predictable patterns, curved elements scatter and soften light, creating a more natural and comfortable illumination.</p>
                
                <h3>Strategic Arc Placement</h3>
                <p>When designing with natural light in mind, we consider several key factors:</p>
                
                <ul>
                    <li><strong>Window Arches:</strong> Arched windows not only look elegant but also allow for larger glass surfaces</li>
                    <li><strong>Curved Walls:</strong> These can redirect and diffuse light throughout a space</li>
                    <li><strong>Circular Skylights:</strong> Provide overhead illumination while maintaining visual interest</li>
                    <li><strong>Curved Mirrors:</strong> Can amplify and redirect natural light effectively</li>
                </ul>
                
                <h3>Practical Tips for Light Enhancement</h3>
                <p>Here are some practical ways to enhance natural light through arc-based design:</p>
                
                <ol>
                    <li>Position arched windows to capture morning and afternoon light</li>
                    <li>Use curved wall surfaces to bounce light into darker corners</li>
                    <li>Consider circular skylights for dramatic overhead lighting</li>
                    <li>Incorporate curved mirrors to amplify existing light sources</li>
                </ol>
                
                <p>By thoughtfully integrating arc-based elements into your design, you can create spaces that feel naturally bright and welcoming throughout the day.</p>
            `,
            author: 'Marcus Rodriguez',
            publishDate: '2024-01-10',
            category: 'architecture',
            tags: ['natural-light', 'arcs', 'windows', 'skylights'],
            featuredImage: 'blog-2.jpg'
        },
        {
            id: '3',
            title: 'Creating Flow: The Role of Curves in Modern Living Spaces',
            excerpt: 'Explore how curved design elements can create natural flow and improve the functionality of contemporary living spaces.',
            content: `
                <h2>Creating Flow: The Role of Curves in Modern Living Spaces</h2>
                <p class="blog-meta">
                    <span><i class="fas fa-user"></i> Sarah Chen</span>
                    <span><i class="fas fa-calendar"></i> January 5, 2024</span>
                    <span><i class="fas fa-tag"></i> Living Spaces</span>
                </p>
                
                <p>In modern architecture, the concept of flow is crucial to creating functional and beautiful living spaces. Arc-based design elements play a vital role in achieving this flow, guiding movement and creating natural pathways through your home.</p>
                
                <h3>Understanding Spatial Flow</h3>
                <p>Flow in architecture refers to how people naturally move through a space. Curved elements can guide this movement in ways that straight lines cannot, creating more intuitive and comfortable navigation patterns.</p>
                
                <h3>Key Areas for Arc Integration</h3>
                <p>Consider these areas where arc-based design can enhance flow:</p>
                
                <ul>
                    <li><strong>Entryways:</strong> Curved foyers create welcoming transitions</li>
                    <li><strong>Corridors:</strong> Gentle curves eliminate harsh turns</li>
                    <li><strong>Living Areas:</strong> Curved seating arrangements encourage conversation</li>
                    <li><strong>Kitchens:</strong> Curved islands and counters improve workflow</li>
                </ul>
                
                <h3>Design Principles for Flow</h3>
                <p>When incorporating arc-based elements for better flow, consider these principles:</p>
                
                <ol>
                    <li>Use curves to guide natural movement patterns</li>
                    <li>Create focal points with curved architectural elements</li>
                    <li>Balance curved and straight elements for visual interest</li>
                    <li>Consider the scale and proportion of curved elements</li>
                </ol>
                
                <p>The result is a space that feels naturally intuitive to navigate, promoting comfort and functionality in your daily life.</p>
            `,
            author: 'Sarah Chen',
            publishDate: '2024-01-05',
            category: 'living-spaces',
            tags: ['flow', 'curves', 'modern-design', 'functionality'],
            featuredImage: 'blog-3.jpg'
        },
        {
            id: '4',
            title: 'The Psychology of Color in Arc-Based Design',
            excerpt: 'Discover how color psychology works in harmony with curved design elements to create truly serene environments.',
            content: `
                <h2>The Psychology of Color in Arc-Based Design</h2>
                <p class="blog-meta">
                    <span><i class="fas fa-user"></i> Marcus Rodriguez</span>
                    <span><i class="fas fa-calendar"></i> December 28, 2023</span>
                    <span><i class="fas fa-tag"></i> Design Tips</span>
                </p>
                
                <p>Color and form work together to create the overall feeling of a space. When arc-based design is combined with thoughtful color choices, the result can be truly transformative for your living environment.</p>
                
                <h3>Color Harmony with Curves</h3>
                <p>Curved surfaces interact with light differently than flat surfaces, which means colors appear differently on curved elements. Understanding this relationship is key to successful design.</p>
                
                <h3>Recommended Color Palettes</h3>
                <p>For arc-based designs, we recommend these color approaches:</p>
                
                <ul>
                    <li><strong>Earthy Tones:</strong> Warm browns and beiges that complement natural curves</li>
                    <li><strong>Soft Blues:</strong> Calming colors that enhance the peaceful feeling of curves</li>
                    <li><strong>Neutral Grays:</strong> Sophisticated backgrounds that let curved forms shine</li>
                    <li><strong>Accent Colors:</strong> Strategic pops of color to highlight curved elements</li>
                </ul>
                
                <h3>Practical Application</h3>
                <p>When choosing colors for your arc-based space, consider:</p>
                
                <ol>
                    <li>How light will interact with curved surfaces</li>
                    <li>The mood you want to create in each area</li>
                    <li>The relationship between different curved elements</li>
                    <li>The overall flow of color throughout the space</li>
                </ol>
                
                <p>By thoughtfully combining arc-based design with appropriate color choices, you can create spaces that are both visually stunning and emotionally comforting.</p>
            `,
            author: 'Marcus Rodriguez',
            publishDate: '2023-12-28',
            category: 'design-tips',
            tags: ['color-psychology', 'arcs', 'interior-design', 'mood'],
            featuredImage: 'blog-4.jpg'
        }
    ];
    
    filteredPosts = [...blogPosts];
    displayBlogPosts(filteredPosts);
}

// Display blog posts
function displayBlogPosts(posts) {
    const blogGrid = document.getElementById('blog-grid');
    
    if (!blogGrid) return;
    
    blogGrid.innerHTML = '';
    
    posts.forEach(post => {
        const blogCard = createBlogCard(post);
        blogGrid.appendChild(blogCard);
    });
}

// Create blog card element
function createBlogCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.setAttribute('data-category', post.category);
    
    const publishDate = new Date(post.publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="blog-image">
            <img src="images/blog/${post.featuredImage}" alt="${post.title}" loading="lazy">
        </div>
        <div class="blog-content">
            <h3>${post.title}</h3>
            <div class="blog-meta">
                <span><i class="fas fa-user"></i> ${post.author}</span>
                <span><i class="fas fa-calendar"></i> ${publishDate}</span>
                <span><i class="fas fa-tag"></i> ${getCategoryDisplayName(post.category)}</span>
            </div>
            <p class="blog-excerpt">${post.excerpt}</p>
            <span class="blog-category">${getCategoryDisplayName(post.category)}</span>
        </div>
    `;
    
    // Add click event to open modal
    card.addEventListener('click', function() {
        openBlogModal(post);
    });
    
    return card;
}

// Get category display name
function getCategoryDisplayName(category) {
    const categoryMap = {
        'design-tips': 'Design Tips',
        'living-spaces': 'Living Spaces',
        'architecture': 'Architecture'
    };
    return categoryMap[category] || category;
}

// Initialize blog search
function initializeBlogSearch() {
    const searchInput = document.getElementById('blog-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            filterBlogPosts(searchTerm);
        });
    }
}

// Initialize blog categories
function initializeBlogCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active category button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter by category
            filterBlogByCategory(category);
        });
    });
}

// Initialize blog modals
function initializeBlogModals() {
    const blogModal = document.getElementById('blog-modal');
    const modalClose = document.querySelector('.blog-modal .modal-close');
    
    // Modal close functionality
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            blogModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === blogModal) {
            blogModal.style.display = 'none';
        }
    });
}

// Filter blog posts by search term
function filterBlogPosts(searchTerm) {
    if (!searchTerm) {
        filteredPosts = [...blogPosts];
    } else {
        filteredPosts = blogPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm) ||
            post.author.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    displayBlogPosts(filteredPosts);
}

// Filter blog posts by category
function filterBlogByCategory(category) {
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
        searchInput.value = ''; // Clear search when filtering by category
    }
    
    if (category === 'all') {
        filteredPosts = [...blogPosts];
    } else {
        filteredPosts = blogPosts.filter(post => post.category === category);
    }
    
    displayBlogPosts(filteredPosts);
}

// Open blog modal
function openBlogModal(post) {
    const blogModal = document.getElementById('blog-modal');
    const modalBody = document.querySelector('.blog-modal .modal-body');
    
    const publishDate = new Date(post.publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    modalBody.innerHTML = `
        <div class="blog-modal-content">
            <div class="blog-modal-header">
                <h2>${post.title}</h2>
                <div class="blog-meta">
                    <span><i class="fas fa-user"></i> ${post.author}</span>
                    <span><i class="fas fa-calendar"></i> ${publishDate}</span>
                    <span><i class="fas fa-tag"></i> ${getCategoryDisplayName(post.category)}</span>
                </div>
            </div>
            <div class="blog-modal-image">
                <img src="images/blog/${post.featuredImage}" alt="${post.title}" loading="lazy">
            </div>
            <div class="blog-modal-body">
                ${post.content}
            </div>
            <div class="blog-modal-footer">
                <div class="blog-tags">
                    <strong>Tags:</strong>
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="blog-share">
                    <strong>Share:</strong>
                    <a href="#" onclick="shareBlogPost('${post.title}', window.location.href)" aria-label="Share on Facebook">
                        <i class="fab fa-facebook"></i>
                    </a>
                    <a href="#" onclick="shareBlogPost('${post.title}', window.location.href, 'twitter')" aria-label="Share on Twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" onclick="shareBlogPost('${post.title}', window.location.href, 'linkedin')" aria-label="Share on LinkedIn">
                        <i class="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    blogModal.style.display = 'block';
}

// Share blog post function
function shareBlogPost(title, url, platform = 'facebook') {
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Add CSS for blog modal
const blogStyle = document.createElement('style');
blogStyle.textContent = `
    .blog-modal-content {
        max-width: 100%;
    }
    
    .blog-modal-header {
        margin-bottom: var(--spacing-xl);
    }
    
    .blog-modal-header h2 {
        color: var(--primary);
        margin-bottom: var(--spacing-md);
    }
    
    .blog-modal-image {
        margin-bottom: var(--spacing-xl);
    }
    
    .blog-modal-image img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: var(--radius-lg);
    }
    
    .blog-modal-body {
        line-height: 1.8;
        color: var(--text);
    }
    
    .blog-modal-body h3 {
        color: var(--primary);
        margin-top: var(--spacing-xl);
        margin-bottom: var(--spacing-md);
    }
    
    .blog-modal-body ul,
    .blog-modal-body ol {
        margin-left: var(--spacing-xl);
        margin-bottom: var(--spacing-lg);
    }
    
    .blog-modal-body li {
        margin-bottom: var(--spacing-sm);
    }
    
    .blog-modal-footer {
        margin-top: var(--spacing-2xl);
        padding-top: var(--spacing-xl);
        border-top: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--spacing-lg);
    }
    
    .blog-tags {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        flex-wrap: wrap;
    }
    
    .tag {
        padding: var(--spacing-xs) var(--spacing-sm);
        background-color: var(--accent);
        color: var(--white);
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
    }
    
    .blog-share {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
    }
    
    .blog-share a {
        width: 40px;
        height: 40px;
        background-color: var(--primary);
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--white);
        text-decoration: none;
        transition: background-color var(--transition-fast);
    }
    
    .blog-share a:hover {
        background-color: var(--secondary);
    }
    
    @media (max-width: 768px) {
        .blog-modal-footer {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .blog-modal-image img {
            height: 200px;
        }
    }
`;
document.head.appendChild(blogStyle); 