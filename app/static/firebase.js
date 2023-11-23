import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getStorage, ref, getDownloadURL, uploadBytes} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyCWDDT0J11CZXCglIVTYXRjpC9--X62A94",
  authDomain: "frankie-s-sports-images.firebaseapp.com",
  projectId: "frankie-s-sports-images",
  storageBucket: "frankie-s-sports-images.appspot.com",
  messagingSenderId: "565582224329",
  appId: "1:565582224329:web:b53eaecc880b505117a618"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

window.getImageFromFirebase = function(imageName, elementId) {
  const storageRef = ref(storage, imageName);
  getDownloadURL(storageRef)
    .then((url) => {
      const img = document.getElementById(elementId);
      img.src = url;
    })
    .catch((error) => {
      console.error("Error loading image: ", error);
    });
};



window.uploadImageToFirebase = function(userId, file) {
  // Create a storage reference with the user's ID and the file name
  const storageRef = ref(storage, `images/${userId}/${file.name}`);
  
  // Upload the file to Firebase Storage
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    
    // Retrieve the URL of the uploaded file
    getDownloadURL(snapshot.ref).then((url) => {
      console.log('File available at', url);
      // Here you can call a function to update the UI with the new image URL
    });
  }).catch((error) => {
    console.error("Error uploading image: ", error);
  });
};

