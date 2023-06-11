// import Button from "./Button";
import MailInput from "./MailInput";
import { useState, useEffect, createContext } from "react";
import AttendanceCard from "./AttendanceCard";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav.js";
import { useNavigate, Route, Routes } from "react-router-dom";
import MyAtPane from "./MyAtPane";
import { getFormattedDate, getISOFormattedDate } from "./Utilities";
import TeamPane from "./TeamPane";
// import MessageToast from "./MessageToast";

export const MeContext = createContext();
export const TeamContext = createContext();
export const Team2Context = createContext();

function App() {

  const [mail, setMail] = useState(JSON.parse(localStorage.getItem('mail')) || null);
  const navigate = useNavigate();

  // ME
  const [query, setQuery] = useState(null)
  const [atHistory, setAtHistory] = useState({})
  const querySet = new Set(["mcw", "m2w", "m4w", "tcw"])

  // TEAM
  const [todaysAttendance, setTodaysAttendance] = useState([]);

  // TEAM NEW
  const [ teamWeek, setTeamWeek] = useState([])


  useEffect(() => {
    console.log("In useEffect mail")
    if (!mail) {
      console.log("Login not found, redirecting to Login page")
      navigate("/login");
    } else {
      navigate("/team")

      console.log("GET attendance attempt from server");

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
            // updateAtLists(result.body);
          } else {
            console.log("Received attendance is same as local attendance");
          }

        })
        .catch(error => console.log('FAILED to GET attendance, error', error));


    }

  }, [mail])


  // TEAM NEW
  useEffect(() => {

    console.log("In useEffect - teamWeek", teamWeek);
    if (!mail) {
      console.log("Login not found, redirecting to Login page")
      navigate("/login");
      return
    }

    const teamQuery = "tcw"

    console.log("GET team history attendance attempt from server", teamQuery);

    if (!querySet.has(teamQuery)) {
      console.log("Invalid query", teamQuery, ", quitting.")
      return
    }

    const date = getISOFormattedDate();

    var url = "https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/attendance?date=" + date;
    url = url + "&mail=" + mail;
    url = url + "&query=" + teamQuery

    // working
    fetch(url)
      .then(response => response.json())
      .then((result) => {
        console.log("Received from server:", result.body);
        console.log(JSON.stringify(result.body));

        if (JSON.stringify(result.body) !== JSON.stringify(atHistory)) {
          console.log("Received team attendance history is different than local attendance history, updating local attendance.");
          setTeamWeek(result.body);
          // updateAtLists(result.body);
        } else {
          console.log("Received team attendance history is same as local attendance history");
        }

      })
      .catch(error => console.log('FAILED to GET team attendance, error', error));

  },[mail])


  // ME
  useEffect(() => {

    console.log("In useEffect - query", query);
    if (!mail) {
      console.log("Login not found, redirecting to Login page")
      navigate("/login");
      return
    }

    console.log("GET query attendance attempt from server", query);

    if (!querySet.has(query)) {
      console.log("Invalid query", query, ", quitting.")
      return
    }

    const date = getISOFormattedDate();

    var url = "https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/attendance?date=" + date;
    url = url + "&mail=" + mail;
    url = url + "&query=" + query

    // working
    fetch(url)
      .then(response => response.json())
      .then((result) => {
        console.log("Received from server:", result.body);
        console.log(JSON.stringify(result.body));

        if (JSON.stringify(result.body) !== JSON.stringify(atHistory)) {
          console.log("Received attendance history is different than local attendance history, updating local attendance.");
          setAtHistory(result.body);
          // updateAtLists(result.body);
        } else {
          console.log("Received attendance history is same as local attendance history");
        }

      })
      .catch(error => console.log('FAILED to GET attendance, error', error));

  }, [query])


  // const [pressedButton, setPressedButton] = useState();
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


  // useEffect(() => {
  //   if (mail) {
  //     console.log("In useEffect - mail");
  //     // getAttendanceData();
  //   }
  // }, [mail]);


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

    // setMail(payload);
    localStorage.setItem('mail', JSON.stringify(payload));
    console.log('User input mail: ' + payload);
    setMail(mail => payload)
    navigate("/team")
    //getAttendanceData();
    // localStorage.setItem('mail', payload);

  }

  // function handleQuerySelect(payload) {
  //   console.log('User query select: ' + payload);
  //   setQuery(payload)
  // }

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

        {/* {!mail &&
          <MailInput onMailSubmit={handleMailClick} />
        } */}

        <Routes>
          <Route path="/team" element={
            <TeamContext.Provider value={{ mail, todaysAttendance, setTodaysAttendance }}>
              <AttendanceCard />
            </TeamContext.Provider>

          } />
          {/* <Route path="/me" element={<MyAtPane handleQuerySelect={handleQuerySelect} query={query}/>} /> */}
          <Route path="/me" element={
            <MeContext.Provider value={{ query, setQuery, atHistory, mail }}>
              <MyAtPane />
            </MeContext.Provider>
          } />
          <Route path="/login" element={<MailInput onMailSubmit={handleMailClick} />} />

          <Route path="/teamnew" element={
            <Team2Context.Provider value={{ mail, teamWeek }}>
              <TeamPane />
            </Team2Context.Provider>
          } />
        </Routes>

        <br></br>
        <br></br>
        <br></br>

        <BottomNav></BottomNav>

      </div>

    </div>

  );
}

export default App;
