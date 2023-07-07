// import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect, useContext } from 'react';
import { getUserFormattedDate, getFormattedDate, getISOFormattedDate } from "./Utilities";
import DateSelectionModal from './AttendanceCard/DateSelectionModal';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MessageToast from "./MessageToast";
import { useNavigate } from 'react-router-dom';
import { TeamContext } from './App';
import ButtonCanvas from './AttendanceCard/ButtonCanvas';

export default function AttendanceCard() {

    const [show, setShow] = useState(false);
    const [attendanceDate, setAttendanceDate] = useState(getISOFormattedDate());


    // const { mail, todaysAttendance, setTodaysAttendance, teamWeek, setRefreshCounter } = useContext(TeamContext)
    const { mail, teamWeek, setRefreshCounter } = useContext(TeamContext)


    const handleClose = () => {
        setShow(false);
        setTempNotes(tempNotes => notes)
        setNotesError(notesError => null)
    }

    const navigate = useNavigate();

    const handleShow = () => setShow(true);
    const [pressedButton, setPressedButton] = useState();
    const [showFlag, setShowFlag] = useState(null);
    // const [mail, setMail] = useState(JSON.parse(localStorage.getItem('mail')) || null);
    // const [mail, setMail] = useState(() => {
    //     return JSON.parse(localStorage.getItem('mail')) || null
    // })

    // const [todaysAttendance, setTodaysAttendance] = useState([]);

    const [remoteList, setRemoteList] = useState([]);
    const [officeList, setOfficeList] = useState([]);
    const [meetingList, setMeetingList] = useState([]);
    const [dayoffList, setDayoffList] = useState([]);
    const [notes, setNotes] = useState(null);
    const [tempNotes, setTempNotes] = useState(null);
    const [notesError, setNotesError] = useState(null);

    // with teamWeek
    useEffect(() => {
        console.log("In useEffect teamWeek")

        const fDate = getISOFormattedDate();
        var mList = [];
        var rList = [];
        var oList = [];
        var dList = [];

        teamWeek.forEach(personWeek => {
            console.log("iterating for person", personWeek.SK)

            for (const day of Object.values(personWeek.WEEKDATA)) {
                console.log("iterating",day["DATE"], day["NOTES"], day["WORKLOCATION"])
                if (fDate === day['DATE']) {

                    setNotes(notes => day["NOTES"])
                    setTempNotes(tempNotes => day["NOTES"])
                    setPressedButton(pressedButton => day["WORKLOCATION"])

                    if (day['WORKLOCATION'] === 'Remote') rList.push(<li key={personWeek.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{personWeek.SK}</li>)
                    if (day['WORKLOCATION'] === 'Meeting') mList.push(<li key={personWeek.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{personWeek.SK}</li>)
                    if (day['WORKLOCATION'] === 'Office') oList.push(<li key={personWeek.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{personWeek.SK}</li>)
                    if (day['WORKLOCATION'] === 'Day Off') dList.push(<li key={personWeek.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{personWeek.SK}</li>)

                }
            }

        })

        setMeetingList(meetingList => mList)
        setRemoteList(remoteList => rList)
        setOfficeList(officeList => oList)
        setDayoffList(dayoffList => dList)

        console.log(
            "Office size:", oList.length,
            ", Remote size:", rList.length,
            ", Meeting size:", mList.length,
            ", Day Off size:", dList.length);

    }, [teamWeek])


    /*
    useEffect(() => {
        // updateAtLists();

        console.log("In useEffect todaysAttendance")

        const fDate = getFormattedDate();
        // var mCount = 0;
        // var oCount = 0;
        // var rCount = 0;
        var mList = [];
        var rList = [];
        var oList = [];
        var dList = [];

        for (const item of todaysAttendance) {
            console.log("COMPARING received [", item.SK, '] with local -', mail, fDate);
            // setTodaysAttendance(result.body);

            if (item.SK === mail && item.PK === fDate) {
                // console.log("Attendance is already marked for", mail, "as", pressedButton);
                if (pressedButton !== item.WorkLocation) {
                    setPressedButton(pressedButton => item.WorkLocation);
                    console.log("Local attendance updated for", mail, "from [", pressedButton, "] to [", item.WorkLocation, "]");
                    // break;
                }

                if (notes !== item.NOTES) {
                    console.log("Local notes updated for", mail, "from [", notes, "] to [", item.NOTES, "]");
                    setNotes(notes => item.NOTES)
                    setTempNotes(tempNotes => item.NOTES)
                }

                // break;

            }


            // var t = item.WorkLocation === 'Remote' ? (rCount++) : null
            // t = item.WorkLocation === 'Meeting' ? (mCount++) : null
            if (item.WorkLocation === 'Remote') rList.push(<li key={item.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{item.SK}</li>)
            if (item.WorkLocation === 'Meeting') mList.push(<li key={item.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{item.SK}</li>)
            if (item.WorkLocation === 'Office') oList.push(<li key={item.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{item.SK}</li>)
            if (item.WorkLocation === 'Day Off') dList.push(<li key={item.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{item.SK}</li>)
        }

        // setMeetingCount(meetingCount => mCount)
        // setRemoteCount(remoteCount => rCount)
        // setOfficeCount(officeCount => oCount)
        setMeetingList(meetingList => mList)
        setRemoteList(remoteList => rList)
        setOfficeList(officeList => oList)
        setDayoffList(dayoffList => dList)

        // console.log("Office count:", oCount, ", Remote count:", rCount, ", Meeting count:", mCount);
        console.log(
            "Office size:", oList.length,
            ", Remote size:", rList.length,
            ", Meeting size:", mList.length,
            ", Day Off size:", dList.length);

    }, [todaysAttendance]);
    */


    useEffect(() => {

        console.log("In useEffect - mail");
        if (!mail) {
            console.log("Login not found, redirecting to Login page")
            navigate("/login");
            return
        }

    }, [mail])


    function storeAttendance(payload) {

        // add content type header to object
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // using built in JSON utility package turn object to string and store in a variable
        var raw = JSON.stringify({
            "mail": mail,
            "workLocation": payload,
            "date": getFormattedDate(),
            "notes": tempNotes,
            "attendanceDate": attendanceDate
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
                // if (attendanceDate === getISOFormattedDate()) { updateLocalAttendance(payload, tempNotes); }
                setShowFlag(true);
                if (attendanceDate === getISOFormattedDate()) { setNotes(tempNotes); }
                setRefreshCounter(Math.random())
                // alert(JSON.parse(result).body)
            }
            )
            .catch(error => console.log('FAILED to POST attendance, error:', error));

    }


    function handleButtonSubmit(payload) {

        console.log("Button pressed:", payload, ", temp-notes:", tempNotes, ", notes:", notes);
        // send attendance if pressed button is different that current selection
        if (notesError === null && (payload !== pressedButton || tempNotes !== notes)) {
            // setNotes(notes => tempNotes);
            // setTempNotes(tempNotes => notes)
            storeAttendance(payload);
            setShow(false);
        }

    }


    /*
    function updateLocalAttendance(payload, newNotes) {
        console.log("Updating internal attendance, after button-press event", payload);
        var matchFlag = false;
        var newTodaysAt = [...todaysAttendance]
        for (const item of newTodaysAt) {
            console.log("Current todayAttendance", item);
            if (item.SK === mail) {
                matchFlag = true;
            }
            if (item.SK === mail && item.PK === getFormattedDate() && item.WorkLocation !== payload) {
                console.log("Updated internal attendance of", mail, "from [", item.WorkLocation, "] to [", payload, "]");
                item.WorkLocation = payload;
                matchFlag = true;
            }

            if (item.SK === mail && item.PK === getFormattedDate() && item.NOTES !== newNotes) {
                console.log("Updated internal notes of", mail, "from [", item.NOTES, "] to [", newNotes, "]");
                item.NOTES = newNotes;
                matchFlag = true;
            }


        }
        if (!matchFlag) {
            // insert new entry
            var obj = {
                "SK": mail,
                "WorkLocation": payload,
                "PK": getFormattedDate(),
                "NOTES": newNotes
            }
            newTodaysAt.push(obj);
        }
        setTodaysAttendance(todaysAttendance => newTodaysAt)

        // updateAtLists();
    }
    */


    function handleNotes(value) {

        value = value.trim()
        setNotesError(notesError => null)
        setTempNotes(tempNotes => value)

        if (value.length >= 30) {
            setNotesError(notesError => "Allowed length upto 30 char.")
        }
        if (value.search(/[*<{}>!@#$%^=]/i) >= 0) {
            setNotesError(notesError => "<{}>*!@#$%^* special chars not allowed.")
        }

    }

    function onDateSelection(selectedDate) {
        // const today = new Date()
        // const weekDay = today.getDay()
        console.log("selection", selectedDate)

        // var k = new Date()
        // var p = new Date(k.setDate(today.getDate() + value - today.getDay()))
        const isoFormatDate = selectedDate.toISOString().substring(0, 10)
        console.log("Selected date ISO format", isoFormatDate)
        setAttendanceDate(attendanceDate => isoFormatDate)

        console.log("Validating with history", teamWeek)

        teamWeek.forEach(personWeek => {
            console.log("In", personWeek.SK)
            console.log(Object.values(personWeek.WEEKDATA))
            if (mail === personWeek.SK) {
                for (const day of Object.values(personWeek.WEEKDATA)) {
                    console.log(isoFormatDate, " - ", day["DATE"], day["NOTES"], day["WORKLOCATION"])
                    if (isoFormatDate === day['DATE']) {
                        console.log("Match found")
                        setNotes(notes => day['NOTES'])
                        setPressedButton(pressedButton => day["WORKLOCATION"]);
                        setTempNotes(tempNotes => day['NOTES'])
                    }
                }
            }
        })


    }


    return (

        <>
            <nav className="navbar justify-content-center">
                <div className="badge bg-secondary text-wrap">
                    {getUserFormattedDate()}
                </div>
            </nav>
            <br></br>

            < div className="card mb-3"  >
                <h5 className="card-header text-bg-primary fs-3">India
                </h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Office
                        <span className="badge bg-primary rounded-pill">{officeList.length}</span>
                    </li>
                    {officeList}
                    {/* {
                        todaysAttendance.map(record =>
                            record.WorkLocation === 'Office' ?
                                <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li> :
                                null
                        )
                    } */}


                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Meeting
                        <span className="badge bg-primary rounded-pill">{meetingList.length}</span>
                    </li>
                    {meetingList}
                    {/* {

                        todaysAttendance.map(record =>
                            record.WorkLocation === 'Meeting' ?
                                <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li> :
                                null
                        )
                    } */}

                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Remote
                        <span className="badge bg-primary rounded-pill">{remoteList.length}</span>
                    </li>
                    {remoteList}

                    {/* {
                        todaysAttendance.map(record =>
                            record.WorkLocation === 'Remote' ?
                                <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li> :
                                null
                        )
                    } */}

                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Day Off
                        <span className="badge bg-primary rounded-pill">{dayoffList.length}</span>
                    </li>
                    {dayoffList}

                </ul>

                <div className="card-footer text-center">
                    <Button variant="success" onClick={handleShow} className="me-2">
                        Add My Work Location
                    </Button>
                </div>

            </div >


            <ButtonCanvas
                show={show}
                handleClose={handleClose}
                onDateSelection={onDateSelection}
                attendanceDate={attendanceDate}
                handleNotes={handleNotes}
                notesError={notesError}
                pressedButton={pressedButton}
                handleButtonSubmit={handleButtonSubmit}
                MyButton={MyButton}
                notes={notes}>
            </ButtonCanvas>


            <MessageToast attendanceDate={attendanceDate} showFlag={showFlag} onToastClose={() => setShowFlag(false)} ></MessageToast>

        </>
    );
}

function MyButton({ name, onButtonSubmit, pressedButton, className, disabled }) {

    return (
        <button type="button" disabled={disabled} onClick={() => onButtonSubmit(name)} className={className}>
            {name} {pressedButton === name ? '✔' : ''}
        </button>
    );
}