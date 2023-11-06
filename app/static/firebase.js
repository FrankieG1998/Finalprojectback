import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js';
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

const app = initializeApp(firebaseConfig);
