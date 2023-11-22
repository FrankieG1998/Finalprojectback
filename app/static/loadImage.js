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

// loadImage.js

document.addEventListener('DOMContentLoaded', function() {
  const uploadButton = document.getElementById('uploadButton');
  const imageUploadInput = document.getElementById('imageUpload');
  
  uploadButton.addEventListener('click', function() {
    const file = imageUploadInput.files[0];
    if (file) {
      // Get the current user's ID
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userId = user.uid;
          uploadImageToFirebase(userId, file);
        } else {
          console.error('No user signed in.');
        }
      });
    } else {
      console.error('No file selected!');
    }
  });
});

function uploadImageToFirebase(userId, file) {
  const storageRef = ref(getStorage(), `images/${userId}/${file.name}`);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    // Close the modal programmatically
    const uploadImageModal = bootstrap.Modal.getInstance(document.getElementById('uploadImageModal'));
    uploadImageModal.hide();
    
    // Optionally, you can retrieve the URL of the uploaded file
    getDownloadURL(snapshot.ref).then((url) => {
      console.log('File available at', url);
      // Here you can update the UI with the new image
    });
  }).catch((error) => {
    console.error("Error uploading image: ", error);
  });
}


function getCurrentUserId() {
  // This is a placeholder function. You need to replace it with actual logic to get the user's ID.
  // For example, you might get it from the server session or a cookie.
  return 'some-user-id'; // Replace with actual user ID retrieval logic
}
