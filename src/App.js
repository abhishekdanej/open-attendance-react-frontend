import Button from "./Button";
import MailInput from "./MailInput";
import { useState, useEffect } from "react";

function App() {

  // const [isMailVisible, setIsMailVisible] = useState(true);
  // const [isButtonVisible, setButtonVisible] = useState(false);

  const [location, setLocation] = useState(null);
  const [pressedButton, setPressedButton] = useState(JSON.parse(localStorage.getItem('pressedButton')) || null);
  const [mail, setMail] = useState(JSON.parse(localStorage.getItem('mail')) || null);


  useEffect(() => {

    var url = "https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/attendance?mail=ad@gmail.com";

    // working
    fetch(url)
    .then(response => response.json())
    .then(result => console.log(result.body))
    .catch(error => console.log('error', error));

    //working
    // fetch(urlat )
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       console.log(result.body.PK);
    //     },

    //     (error) => {
    //       console.log(error);
    //     }
    //   )


  }, [])


  useEffect(() => {
    localStorage.setItem('mail', JSON.stringify(mail));
  }, [mail]);

  useEffect(() => {
    localStorage.setItem('pressedButton', JSON.stringify(pressedButton));

    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({ "mail": mail, "workLocation": pressedButton });
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    if (mail && pressedButton) {

      fetch("https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/", requestOptions)
        .then(response => response.text())
        .then(result => alert(JSON.parse(result).body))
        .catch(error => console.log('error', error));

    }


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
