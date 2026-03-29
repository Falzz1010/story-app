// Import our custom CSS and Bootstrap
import '../sass/main.scss';

// Import bootstrap javascript logic (for offcanvas, etc)
import * as bootstrap from 'bootstrap';

// Import web components
import './components/index.js';

const init = async () => {
  const path = window.location.pathname;
  
  // Highlight active nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === path || (path === '/' && link.getAttribute('href') === '/index.html')) {
      link.classList.add('active');
    }
  });

  // Render Dashboard
  if (path === '/' || path.includes('index.html')) {
    await renderDashboard();
  }

  // Handle Add Story
  if (path.includes('add-story.html')) {
    const storyForm = document.querySelector('story-form');
    if (storyForm) {
      storyForm.addEventListener('story-submitted', (e) => {
        if (e.detail.success) {
          alert('Story has been successfully published!');
          window.location.href = '/';
        }
      });
    }
  }
};

const renderDashboard = async () => {
  const container = document.getElementById('story-container');
  if (!container) return;

  try {
    const response = await fetch('./data/DATA.json');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const responseJson = await response.json();
    const stories = responseJson.listStory;
    
    // Clear the loading indicator
    container.innerHTML = '';

    stories.forEach(story => {
      const col = document.createElement('div');
      col.className = 'col-12 col-md-6 col-lg-4 mb-4';
      
      const storyCard = document.createElement('story-card');
      storyCard.setAttribute('storyId', story.id);
      storyCard.setAttribute('name', story.name);
      storyCard.setAttribute('description', story.description);
      storyCard.setAttribute('photoUrl', story.photoUrl);
      storyCard.setAttribute('createdAt', story.createdAt);
      
      col.appendChild(storyCard);
      container.appendChild(col);
    });

  } catch (error) {
    console.error('Error fetching stories:', error);
    container.innerHTML = '<div class="col-12"><div class="alert alert-danger alert-custom">Failed to load stories. Please try again later.</div></div>';
  }
};

document.addEventListener('DOMContentLoaded', init);
