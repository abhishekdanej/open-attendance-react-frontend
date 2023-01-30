import Button from "./Button";
import MailInput from "./MailInput";
import { useState, useEffect } from "react";
import AttendanceCard from "./AttendanceCard";
import Navbar from "./Navbar";

function App() {


  const [pressedButton, setPressedButton] = useState();
  const [mail, setMail] = useState(JSON.parse(localStorage.getItem('mail')) || null);
  // const [mail, setMail] = useState(null);

  const [todaysAttendance, setTodaysAttendance] = useState([]);

  useEffect(() => {
    if (mail) {
      console.log("In useEffect");
      getAttendanceData();
    }
  }, [mail, pressedButton]);


  function storeAttendance(payload) {

    // setPressedButton(payload);
    // add content type header to object
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({
      "mail": mail,
      "workLocation": payload,
      "date": getFormattedDate()
    });
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // make API call with parameters and use promises to get response

    console.log("POST to save attendance: ", raw);

    fetch("https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/", requestOptions)
      .then(response => response.text())
      .then((result) => {
        console.log(JSON.parse(result).body);
        setPressedButton(payload);
        // alert(JSON.parse(result).body)
      }
      )
      .catch(error => console.log('FAILED to POST attendance, error:', error));



  }


  function getFormattedDate() {

    const months = ["Jan", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let today = new Date()
    const day = today.toString().substring(0, 3)
    let formatted_date = day + "-" + today.getDate() + "-" + months[today.getMonth()] + "-" + today.getFullYear();
    formatted_date = formatted_date.toUpperCase();

    return formatted_date;
  }

  function getAttendanceData() {

    console.log("Getting attendance data from server");

    const fDate = getFormattedDate();

    var url = "https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/attendance?date=" + fDate;

    // working
    fetch(url)
      .then(response => response.json())
      .then((result) => {
        console.log(result.body);
        setTodaysAttendance(result.body);
        for (const item of result.body) {
          console.log(item.SK, 'comparing with', mail, fDate);
          // setTodaysAttendance(result.body);

          if (item.SK === mail && item.PK === fDate) {
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

      <Navbar mail={mail}></Navbar>

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
