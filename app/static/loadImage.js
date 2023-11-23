import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js';
import { getImageFromFirebase, uploadImageToFirebase } from './firebase.js'; // Adjust the path as necessary

document.addEventListener('DOMContentLoaded', function() {
  const imageElement = document.getElementById('firebase-image');
  const path = window.location.pathname;
  
  if (imageElement && (path === '/images' || path === '/profile')) {
    getImageFromFirebase('Michael-Jordan.jpg', 'firebase-image');
  }

  const uploadButton = document.getElementById('uploadButton');
  const imageUploadInput = document.getElementById('imageUpload');
  
  uploadButton.addEventListener('click', function() {
    const file = imageUploadInput.files[0];
    if (file) {
      const userEmailElement = document.getElementById('userEmail');
      const userEmail = userEmailElement.textContent.split(': ')[1].trim();
      const userId = userEmail.replace('@', '_at_'); // This may need additional sanitization
      
      uploadImageToFirebase(userId, file, (url) => {
        console.log('File available at', url);
        // Update the UI with the new image URL
        // Hide the modal if using Bootstrap's JS
        const uploadImageModal = new bootstrap.Modal(document.getElementById('uploadImageModal'));
        uploadImageModal.hide();
      });
    } else {
      console.error('No file selected!');
    }
  });
});
