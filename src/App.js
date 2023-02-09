import Button from "./Button";
import MailInput from "./MailInput";
import { useState, useEffect } from "react";
import AttendanceCard from "./AttendanceCard";
import Navbar from "./Navbar";
import MessageToast from "./MessageToast";

function App() {

  // const [userLocation, setUserLocation] = useState();

  // const [pressedButton, setPressedButton] = useState();
  const [mail, setMail] = useState(JSON.parse(localStorage.getItem('mail')) || null);
  // const [mail, setMail] = useState(null);

  // const [todaysAttendance, setTodaysAttendance] = useState([]);
  // const [showFlag, setShowFlag] = useState(null);

  /*
  useEffect(() => {

    console.log("IDENTIFYING user location.");

    fetch('http://ip-api.com/json')
      .then(response => response.json())
      .then((result) => {
        console.log("LOCATION API:", 'city:', result.city, result);
        // console.log("LOCATION API CITY:", result.city);
        const city = result.city;
        setUserLocation(city);
      })
      .catch(error => console.log("FAILED to get user's location:", error));

  }, [userLocation]);
  */


  useEffect(() => {
    if (mail) {
      console.log("In useEffect - mail");
      // getAttendanceData();
    }
  }, [mail]);


  /*
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

    console.log("POST attempt to save attendance: ", raw);

    fetch("https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/", requestOptions)
      .then(response => response.text())
      .then((result) => {
        console.log("POST SUCCESS", JSON.parse(result).body);
        setPressedButton(payload);
        updateLocalAttendance(payload);
        setShowFlag(true);
        // alert(JSON.parse(result).body)
      }
      )
      .catch(error => console.log('FAILED to POST attendance, error:', error));

  }
*/

/*
  function updateLocalAttendance(payload) {
    console.log("Updating internal attendance, after button-press event", payload);
    var matchFlag = false;
    for (const item of todaysAttendance) {
      console.log(item);
      if (item.SK === mail) {
        matchFlag = true;
      }
      if (item.SK === mail && item.PK === getFormattedDate() && item.WorkLocation !== payload) {
        console.log("Updated internal attendance of", mail, "from", item.WorkLocation, "to", payload);
        item.WorkLocation = payload;
        matchFlag = true;
      }
    }
    if (!matchFlag) {
      // insert new entry
      var obj = {
        "SK": mail,
        "WorkLocation": payload,
        "PK": getFormattedDate()
      }
      todaysAttendance.push(obj);
    }
  }
  */


  /*
  function getFormattedDate() {

    const months = ["Jan", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let today = new Date()
    const day = today.toString().substring(0, 3)
    let formatted_date = day + "-" + today.getDate() + "-" + months[today.getMonth()] + "-" + today.getFullYear();
    formatted_date = formatted_date.toUpperCase();

    return formatted_date;
  }
  */

  /*
  function getUserFormattedDate() {

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let today = new Date()
    const day = today.toString().substring(0, 3)
    let formatted_date = day + ", " + today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear();

    return formatted_date;
  }*/



  /*
  function getAttendanceData() {

    console.log("Getting attendance data from server");

    const fDate = getFormattedDate();

    var url = "https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/attendance?date=" + fDate;
    url = url + "&mail=" + mail;

    // working
    fetch(url)
      .then(response => response.json())
      .then((result) => {
        console.log("Received from server:", result.body);
        console.log(JSON.stringify(result.body));

        if (JSON.stringify(result.body) !== JSON.stringify(todaysAttendance)) {
          console.log("Received attendance is different than local attendance, updating local attendance.");
          setTodaysAttendance(result.body);
        } else {
          console.log("Received attendance is same as local attendance");
        }

        for (const item of result.body) {
          console.log(item.SK, 'comparing with', mail, fDate);
          // setTodaysAttendance(result.body);

          if (item.SK === mail && item.PK === fDate) {
            // console.log("Attendance is already marked for", mail, "as", pressedButton);
            if (pressedButton !== item.WorkLocation) {
              setPressedButton(pressedButton => item.WorkLocation);
              console.log("Attendance updated for", mail, "from", pressedButton, "to", item.WorkLocation);
              break;
            }
          }
        }

      })
      .catch(error => console.log('FAILED to GET attendance, error', error));

  }
  */

  function handleMailClick(payload) {

    setMail(payload);
    localStorage.setItem('mail', JSON.stringify(payload));
    console.log('User input mail: ' + payload);
    //getAttendanceData();
    // localStorage.setItem('mail', payload);

  }

  /*
  function handleButtonSubmit(payload) {

    console.log("Button pressed:", payload);
    // send attendance if pressed button is different that current selection
    if (payload !== pressedButton) {
      storeAttendance(payload);
    }

  }
  */


  return (

    <div className="App" >

      <Navbar mail={mail}></Navbar>

      <div className="container">
        {/* <nav className="navbar justify-content-center">
          <div className="badge bg-secondary text-wrap">
            {getUserFormattedDate()}
          </div>
        </nav>

        <br></br> */}

        {!mail &&
          <MailInput onMailSubmit={handleMailClick} />
        }

        {mail &&
          // <AttendanceCard mail={mail} value={todaysAttendance}></AttendanceCard>
          <AttendanceCard ></AttendanceCard>
        }

        <br></br>
        <br></br>
        <br></br>
        {/* {mail &&
          <nav className="navbar fixed-bottom justify-content-center navbar-light bg-dark">
            <Button name="Office" onButtonSubmit={handleButtonSubmit} pressedButton={pressedButton} />
            <Button name="Anywhere" onButtonSubmit={handleButtonSubmit} pressedButton={pressedButton} />
            <Button name="Meeting" onButtonSubmit={handleButtonSubmit} pressedButton={pressedButton} />
          </nav>
        } */}

        {/* <MessageToast showFlag={showFlag} onToastClose={() => setShowFlag(false)} ></MessageToast> */}

      </div>

    </div>

  );
}

export default App;
