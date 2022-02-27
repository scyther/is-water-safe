import React, { useEffect } from 'react';
import "./css/main.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Form from "./Components/Form";
import alanBtn from "@alan-ai/alan-sdk-web";

function App() {
  useEffect(() => {
    alanBtn({
      key: '59376954317c1619813d63acd83795d52e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'go:back') {
          // Call the client code that will react to the received command
        }
      }
    });
  }, []);
  return (
    <div className="App">
      <Header />
      <Form />

      <Footer />
    </div>
  );
}

export default App;
