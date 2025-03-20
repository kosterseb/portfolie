$(window).scroll(function() {
  if ($(this).scrollTop()> 20) {
      $('.scroll-arrow').fadeOut();
   }
  else {
    $('.scroll-arrow').fadeIn();
   }
});

// Revised script for better section tracking and arrow hiding
document.addEventListener('DOMContentLoaded', function() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    // Get all major content sections - including nested articles
    const sections = [
      document.querySelector('section:nth-of-type(1)'),
      document.querySelector('section:nth-of-type(2) article:nth-of-type(1)'),
      document.querySelector('section:nth-of-type(2) article:nth-of-type(2)'),
      document.querySelector('section:nth-of-type(2) article:nth-of-type(3)'),
      document.querySelector('section:nth-of-type(2) article:nth-of-type(4)')
    ];
    
    let currentSectionIndex = 0;
    
    // Update current section index based on scroll position
    function updateCurrentSectionIndex() {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if we're at or near the bottom of the page
      if (scrollPosition + windowHeight >= documentHeight - 50) {
        // We're at the bottom of the page
        scrollArrow.classList.add('fade-out');
        return;
      }
      
      for (let i = 0; i < sections.length; i++) {
        if (!sections[i]) continue; // Skip if section doesn't exist
        
        const sectionTop = sections[i].offsetTop;
        const sectionBottom = sectionTop + sections[i].offsetHeight;
        
        if (scrollPosition >= sectionTop - windowHeight/2 && scrollPosition < sectionBottom - windowHeight/2) {
          currentSectionIndex = i;
          scrollArrow.classList.remove('fade-out');
          break;
        }
      }
    }
    
    // Listen for scroll to update the current section
    window.addEventListener('scroll', updateCurrentSectionIndex);
    
    // Initialize
    updateCurrentSectionIndex();
    
    scrollArrow.addEventListener('click', function() {
      // Move to the next section
      currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
      
      // Scroll to the next section
      if (sections[currentSectionIndex]) {
        sections[currentSectionIndex].scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      
      // Check if we've reached the last section
      if (currentSectionIndex >= sections.length - 1) {
        // Set a timeout to allow the scroll to complete before checking
        setTimeout(function() {
          updateCurrentSectionIndex();
        }, 1000);
      }
    });
  });

