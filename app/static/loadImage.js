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

document.addEventListener('DOMContentLoaded', function() {
  const uploadButton = document.getElementById('uploadButton');
  const imageUploadInput = document.getElementById('imageUpload');
  
  uploadButton.addEventListener('click', function() {
    const file = imageUploadInput.files[0];
    if (file) {
      // Assuming you have a function to get the current user's ID
      const userId = getCurrentUserId(); // Implement this function to get the logged-in user's ID
      uploadImageToFirebase(userId, file);
    } else {
      console.log('No file selected!');
    }
  });
});

function getCurrentUserId() {
  // This is a placeholder function. You need to replace it with actual logic to get the user's ID.
  // For example, you might get it from the server session or a cookie.
  return 'some-user-id'; // Replace with actual user ID retrieval logic
}
