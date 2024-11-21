import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBcNh531X5bOIUtRk39x0CVUugcyPdLy8U",
  authDomain: "metodologias-a506d.firebaseapp.com",
  projectId: "metodologias-a506d",
  storageBucket: "metodologias-a506d.appspot.com",
  messagingSenderId: "297838995915",
  appId: "1:297838995915:web:b17ff9595e759855f7ee4e"
};

const app = initializeApp(firebaseConfig);
export default app;