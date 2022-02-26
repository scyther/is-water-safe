<<<<<<< HEAD
// import { initializeApp } from "firebase/app";
// import firebaseConfig from "../firebaseConfig";
import './App.css';
=======
import "./css/main.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HeroSection from "./Components/HeroSection";
>>>>>>> 6d6513bec79afcc0a5fbfec15b5f827432942925


function App() {
  // const app = initializeApp(firebaseConfig);
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
}

export default App;
