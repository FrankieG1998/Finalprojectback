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

// Function to get the image URL
export const getImageUrl = async (imageName) => {
  const storageRef = storage.ref(imageName);
  try {
    const url = await storageRef.getDownloadURL();
    return url;
  } catch (error) {
    console.error("Error fetching image from Firebase:", error);
    throw new Error(error);
  }

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
