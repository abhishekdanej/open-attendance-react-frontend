import Button from "./Button";
import MailInput from "./MailInput";
import { useState, useEffect } from "react";

function App() {

  // const [isMailVisible, setIsMailVisible] = useState(true);
  // const [isButtonVisible, setButtonVisible] = useState(false);

  const [pressedButton, setPressedButton] = useState(JSON.parse(localStorage.getItem('pressedButton')) || null);
  const [mail, setMail] = useState(JSON.parse(localStorage.getItem('mail')) || null);

  useEffect(() => {
    localStorage.setItem('mail', JSON.stringify(mail));
  }, [mail]);

  useEffect(() => {
    localStorage.setItem('pressedButton', JSON.stringify(pressedButton));
  }, [pressedButton]);

  function handleMailClick(payload) {
    // setIsMailVisible(false);
    // setButtonVisible(true);

    setMail(payload);
    console.log('App mail: ' + payload);
   // localStorage.setItem('mail', payload);
    
  }
  
  function handleButtonSubmit(payload) {
    setPressedButton(payload);
    console.log("pressed: " + payload);
    // localStorage.setItem('pressedButton', payload);
  }

  return (

    <div className="App" >

      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1 p-2">Open Attendance</span>
      </nav>


      <div className="container">

        {!mail && 
          <MailInput onMailSubmit={handleMailClick} />
        }

        {mail &&
          <nav className="navbar fixed-bottom justify-content-center navbar-light bg-dark">
            <Button name="Office" onButtonSubmit={handleButtonSubmit} pressedButton={pressedButton} />
            <Button name="Anywhere" onButtonSubmit={handleButtonSubmit} pressedButton={pressedButton} />
            <Button name="Meeting" onButtonSubmit={handleButtonSubmit} pressedButton={pressedButton} />
          </nav>
        }

      </div>

    </div>

  );
}

export default App;
