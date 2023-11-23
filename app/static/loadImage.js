// loadImage.js
import { getStorage, ref, listAll, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js';
import { uploadImageToFirebase } from './firebase.js'; // Adjust the path as necessary

document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname;
  
  if (path === '/images' || path === '/profile') {
    loadUserImages();
  }

  const uploadButton = document.getElementById('uploadButton');
  const imageUploadInput = document.getElementById('imageUpload');
  
  uploadButton.addEventListener('click', function() {
    const file = imageUploadInput.files[0];
    if (file) {
      const userEmailElement = document.getElementById('userEmail');
      const userEmail = userEmailElement.textContent.split(': ')[1].trim();
      const userId = userEmail.replace('@', '_at_'); // Basic sanitization for file path
      
      uploadImageToFirebase(userId, file, (url) => {
        console.log('File available at', url);
        // Hide the modal if using Bootstrap's JS
        const uploadImageModal = new bootstrap.Modal(document.getElementById('uploadImageModal'));
        uploadImageModal.hide();
      });
    } else {
      console.error('No file selected!');
    }
  });
});

function loadUserImages() {
  const userEmailElement = document.getElementById('userEmail');
  const userEmail = userEmailElement.textContent.split(': ')[1].trim();
  const userId = userEmail.replace('@', '_at_'); // Basic sanitization for file path
  const userImagesRef = ref(getStorage(), `images/${userId}`);

  listAll(userImagesRef).then((res) => {
    res.items.forEach((itemRef) => {
      getDownloadURL(itemRef).then((url) => {
        // Here, append the images to your page
        const img = document.createElement('img');
        img.src = url;
        img.style.width = '100px'; // Set a width or style as needed
        img.style.height = '100px'; // Set a height or style as needed
        document.body.appendChild(img); // Append to a specific element as needed
      });
    });
  }).catch((error) => {
    console.error("Error loading user images: ", error);
  });
}
