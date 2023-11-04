import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCWDDT0J11CZXCglIVTYXRjpC9--X62A94",
  authDomain: "frankie-s-sports-images.firebaseapp.com",
  projectId: "frankie-s-sports-images",
  storageBucket: "frankie-s-sports-images.appspot.com",
  messagingSenderId: "565582224329",
  appId: "1:565582224329:web:b53eaecc880b505117a618"
};

window.getImageFromFirebase = function(imageName, elementId) {
  const storageRef = storage.ref(imageName);
  storageRef.getDownloadURL()
    .then((url) => {
      // Get the image element by id
      const img = document.getElementById(elementId);
      img.src = url;
    })
    .catch((error) => {
      console.error("Error loading image: ", error);
    });
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
