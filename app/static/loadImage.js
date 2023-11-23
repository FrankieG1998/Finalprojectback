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

  let container = document.querySelector('.images-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'images-container';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.padding = '0 50px'; // Adjust padding as needed
    document.body.appendChild(container); // Append container to the body or another parent element
  }
  
  listAll(userImagesRef).then((res) => {
  res.items.forEach((itemRef) => {
      getDownloadURL(itemRef).then((url) => {
        // Create an image element
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('user-image');
        document.querySelector('.images-container').appendChild(img); 
      });
    });
    }).catch((error) => {
      console.error("Error loading user images: ", error);
    });
}
