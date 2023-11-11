// Function to check if the current URL is /images or /profile
function shouldLoadImage() {
  const path = window.location.pathname;
  return path === '/images' || path === '/profile';
}

// Modified window.load event listener
window.addEventListener('load', function() {
  if (shouldLoadImage()) {
    getImageFromFirebase('Michael-Jordan.jpg', 'firebase-image');
  }
});

