// Function to load or hide image based on the URL
window.onload = function() {
  const path = window.location.pathname;
  const imageElement = document.getElementById('firebase-image');

  // Check if we are on the correct path to show the image
  if (path === '/images' || path === '/profile') {
    getImageFromFirebase('Michael-Jordan.jpg', 'firebase-image');
    imageElement.style.display = ''; // This will reset any inline display settings, reverting to default or CSS-defined styles.
  } else {
    imageElement.style.display = 'none'; // This hides the image element.
  }
};
