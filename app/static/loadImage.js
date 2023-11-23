// loadImage.js
import { ref, listAll, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { uploadImageToFirebase } from './firebase.js'; // Adjust the path as necessary

document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname;
  const auth = getAuth();

  auth.onAuthStateChanged((user) => {
    if (user && (path === '/images' || path === '/profile')) {
      loadUserImages(user.email.replace('@', '_at_')); // Use the user's email as the identifier
    }
  });

  const uploadButton = document.getElementById('uploadButton');
  const imageUploadInput = document.getElementById('imageUpload');
  
  uploadButton.addEventListener('click', function() {
    const file = imageUploadInput.files[0];
    if (file && auth.currentUser) {
      const userId = auth.currentUser.email.replace('@', '_at_'); // Use the user's email as the identifier
      
      uploadImageToFirebase(userId, file, (url) => {
        console.log('File available at', url);
        // Close the modal programmatically if using Bootstrap's JS
        // Update the UI with the new image URL
      });
    } else {
      console.error('No file selected or no user logged in!');
    }
  });
});

function loadUserImages(userId) {
  const storage = getStorage();
  const userImagesRef = ref(storage, `images/${userId}/`);

  listAll(userImagesRef).then((result) => {
    result.items.forEach((imageRef) => {
      getDownloadURL(imageRef).then((url) => {
        displayImage(url); // Display each image in the UI
      });
    });
  }).catch((error) => {
    console.error("Error loading user's images: ", error);
  });
}

function displayImage(imageUrl) {
  // Implement the logic to display images in the UI
  const gallery = document.getElementById('imageGallery'); // Make sure this element exists
  const img = document.createElement('img');
  img.src = imageUrl;
  img.classList.add('gallery-image'); // Add any necessary CSS classes
  gallery.appendChild(img);
}
