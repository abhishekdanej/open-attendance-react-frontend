// import Button from "./Button";
import MailInput from "./MailInput";
import { useState, useEffect, createContext } from "react";
import AttendanceCard from "./AttendanceCard";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav.js";
import { useNavigate, Route, Routes } from "react-router-dom";
import HistoryPane from "./HistoryPane";
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
  const [myHistory, setMyHistory] = useState({})
  const querySet = new Set(["mcw", "m2w", "m4w", "tcw"])

  // HOME
  const [todaysAttendance, setTodaysAttendance] = useState([]);

  // TEAM NEW
  const [ teamWeek, setTeamWeek] = useState([])


  useEffect(() => {
    console.log("In useEffect mail")
    if (!mail) {
      console.log("Login not found, redirecting to Login page")
      navigate("/login");
    } else {
      navigate("/home")

      console.log("GET attendance attempt from server");

      const fDate = getFormattedDate();

      var url = "https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/attendance?date=" + fDate;
      url = url + "&mail=" + mail;

      // working
      fetch(url)
        .then(response => response.json())
        .then((result) => {
          console.log("Received from server (no query):", result.body);
          console.log(JSON.stringify(result.body));

          if (JSON.stringify(result.body) !== JSON.stringify(todaysAttendance)) {
            console.log("Received attendance is different than local attendance, updating local attendance.");
            setTodaysAttendance(result.body);
          } else {
            console.log("Received attendance is same as local attendance");
          }

        })
        .catch(error => console.log('FAILED to GET attendance, error', error));


    }

  }, [mail])


  // TEAM NEW - WEEK Pane
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
        console.log("Received from server for query [tcw]:", result.body);
        console.log(JSON.stringify(result.body));

        if (JSON.stringify(result.body) !== JSON.stringify(myHistory)) {
          console.log("Received team attendance history is different than local attendance history, updating local attendance.");
          setTeamWeek(result.body);
        } else {
          console.log("Received team attendance history is same as local attendance history");
        }

      })
      .catch(error => console.log('FAILED to GET team attendance, error', error));

  },[mail])


  // MY HISTORY
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

        if (JSON.stringify(result.body) !== JSON.stringify(myHistory)) {
          console.log("Received attendance history is different than local attendance history, updating local attendance.");
          setMyHistory(result.body);
        } else {
          console.log("Received attendance history is same as local attendance history");
        }

      })
      .catch(error => console.log('FAILED to GET attendance, error', error));

  }, [query])




  function handleMailClick(payload) {

    // setMail(payload);
    localStorage.setItem('mail', JSON.stringify(payload));
    console.log('User input mail: ' + payload);
    setMail(mail => payload)
    navigate("/home")
    //getAttendanceData();
    // localStorage.setItem('mail', payload);

  }



  return (

    <div className="App" >

      <Navbar mail={mail}></Navbar>

      <div className="container">

        {/* {!mail &&
          <MailInput onMailSubmit={handleMailClick} />
        } */}

        <Routes>
          
          <Route path="/home" element={
            <TeamContext.Provider value={{ mail, todaysAttendance, setTodaysAttendance, teamWeek }}>
              <AttendanceCard />
            </TeamContext.Provider>
          } />

          <Route path="/me" element={
            <MeContext.Provider value={{ query, setQuery, myHistory, mail }}>
              <HistoryPane />
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
