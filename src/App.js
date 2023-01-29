import Button from "./Button";
import MailInput from "./MailInput";
import { useState, useEffect } from "react";
import AttendanceCard from "./AttendanceCard";

function App() {


  const [pressedButton, setPressedButton] = useState(JSON.parse(localStorage.getItem('pressedButton')) || null);
  const [mail, setMail] = useState(JSON.parse(localStorage.getItem('mail')) || null);
  // const [mail, setMail] = useState(null);

  const [todaysAttendance, setTodaysAttendance] = useState([]);

  useEffect(() => {
    if(mail) {
      getAttendanceData();
    }
  },[mail, pressedButton]);

  /*
  // need to see why getting called when app loads for first time
  useEffect(() => {

    const months = ["Jan", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let today = new Date()
    const day = today.toString().substring(0, 3)
    let formatted_date = day + "-" + today.getDate() + "-" + months[today.getMonth()] + "-" + today.getFullYear();
    formatted_date = formatted_date.toUpperCase();

    var url = "https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/attendance?date=" + formatted_date;

    // working
    fetch(url)
      .then(response => response.json())
      .then((result) => {
        console.log(result.body)
        for (const item of result.body) {
          console.log(item.SK, ' comparing with ', mail, formatted_date);
          // setTodaysAttendance(result.body);

          if (item.SK === mail && item.PK === formatted_date) {
            console.log("Attendance is already marked for " + mail);
            if(pressedButton !== item.WorkLocation) {
              setPressedButton(item.WorkLocation);
            }
            break;
          }
        }

      })
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


  }, [pressedButton])
*/



  // useEffect(() => {
  //   localStorage.setItem('mail', JSON.stringify(mail));
  // }, [mail]);

  /*
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
    if (mail && pressedButton && false) {

      fetch("https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/", requestOptions)
        .then(response => response.text())
        .then(result => alert(JSON.parse(result).body))
        .catch(error => console.log('error', error));

    }


  }, [pressedButton]);
  */


  function storeAttendance(payload) {

    setPressedButton(payload);
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({ "mail": mail, "workLocation": payload });
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // make API call with parameters and use promises to get response

    console.log("POST to store attendance: ", raw);

    fetch("https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/", requestOptions)
      .then(response => response.text())
      .then(result => alert(JSON.parse(result).body))
      .catch(error => console.log('error', error));



  }

  function getAttendanceData() {

    console.log("Getteng attendance data from server");

    const months = ["Jan", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let today = new Date()
    const day = today.toString().substring(0, 3)
    let formatted_date = day + "-" + today.getDate() + "-" + months[today.getMonth()] + "-" + today.getFullYear();
    formatted_date = formatted_date.toUpperCase();

    var url = "https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/attendance?date=" + formatted_date;

    // working
    fetch(url)
      .then(response => response.json())
      .then((result) => {
        console.log(result.body);
        setTodaysAttendance(result.body);
        for (const item of result.body) {
          console.log(item.SK, 'comparing with', mail, formatted_date);
          // setTodaysAttendance(result.body);

          if (item.SK === mail && item.PK === formatted_date) {
            console.log("Attendance is already marked for " + mail);
            setPressedButton(item.WorkLocation);
            break;
          }
        }

      })
      .catch(error => console.log('error', error));

  }

  function handleMailClick(payload) {

    setMail(payload);
    localStorage.setItem('mail', JSON.stringify(payload));
    console.log('User input mail: ' + payload);
    //getAttendanceData();
    // localStorage.setItem('mail', payload);

  }

  function handleButtonSubmit(payload) {

    console.log("pressed: " + payload);
    storeAttendance(payload);

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
          <AttendanceCard value={todaysAttendance}></AttendanceCard>
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
