// Select elements
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.custom-overlay-link');
  const overlay = document.getElementById('overlay');
  const overlayImage = document.getElementById('overlay-image');
  const overlayClose = document.getElementById('overlay-close'); // Close button
  const zoomInButton = document.getElementById('zoom-in'); // Zoom In button
  const zoomOutButton = document.getElementById('zoom-out'); // Zoom Out button

  let currentZoom = 1; // Initial zoom level

  // Handle clicks on custom-overlay-link
  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault(); // Prevent navigation to the href URL
      const imageUrl = link.getAttribute('href'); // Get image URL
      overlayImage.src = imageUrl; // Set image source
      overlay.style.display = 'block'; // Ensure overlay is visible
      setTimeout(() => {
        overlay.classList.add('active'); // Show overlay with fade-in
        overlayImage.classList.add('active'); // Slide in the image
      }, 50); // Small delay for better effect
    });
  });

  // Close button functionality
  const closeOverlay = () => {
    overlayImage.classList.remove('active'); // Fade-out the image
    overlay.classList.remove('active'); // Fade-out the overlay
    setTimeout(() => {
      overlay.style.display = 'none'; // Hide after fade-out
      overlayImage.src = ''; // Clear image source
      currentZoom = 1; // Reset zoom
      overlayImage.style.transform = 'scale(1)'; // Reset image scale
    }, 1000); // Match fade-out duration
  };

  // Close overlay when clicking the close button
  overlayClose.addEventListener('click', closeOverlay);

  // Close overlay if user clicks outside the image
  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      closeOverlay();
    }
  });

  // Zoom In functionality
  zoomInButton.addEventListener('click', () => {
    currentZoom += 0.1; // Increase zoom level
    overlayImage.style.transform = `scale(${currentZoom})`; // Apply zoom
  });

  // Zoom Out functionality
  zoomOutButton.addEventListener('click', () => {
    currentZoom = Math.max(0.1, currentZoom - 0.1); // Decrease zoom level, prevent negative or zero
    overlayImage.style.transform = `scale(${currentZoom})`; // Apply zoom
  });
});
