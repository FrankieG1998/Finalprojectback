import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const Firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export const Providers = {google: new GoogleAuthProvider()}
