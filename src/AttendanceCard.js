// import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';
import { getUserFormattedDate, getFormattedDate } from "./Utilities";
import Button from 'react-bootstrap/Button';
// import AtButton from "./Button";
import Offcanvas from 'react-bootstrap/Offcanvas';
import MessageToast from "./MessageToast";

export default function AttendanceCard() {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setTempNotes(tempNotes => notes)
        setNotesError(notesError => null)
    }
    const handleShow = () => setShow(true);
    const [pressedButton, setPressedButton] = useState();
    const [showFlag, setShowFlag] = useState(null);
    const [mail, setMail] = useState(JSON.parse(localStorage.getItem('mail')) || null);

    const [todaysAttendance, setTodaysAttendance] = useState([]);

    const [remoteList, setRemoteList] = useState([]);
    const [officeList, setOfficeList] = useState([]);
    const [meetingList, setMeetingList] = useState([]);
    const [notes, setNotes] = useState(null);
    const [tempNotes, setTempNotes] = useState(null);
    const [notesError, setNotesError] = useState(null);


    useEffect(() => {
        updateAtLists();
    }, [todaysAttendance]);


    useEffect(() => {

        console.log("In useEffect - todaysAttendance, mail, pressedbutton");
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

                // move this code to useEffect of todaysAttendance
                for (const item of result.body) {
                    console.log(item.SK, 'comparing with', mail, fDate);
                    // setTodaysAttendance(result.body);

                    if (item.SK === mail && item.PK === fDate) {
                        // console.log("Attendance is already marked for", mail, "as", pressedButton);
                        if (pressedButton !== item.WorkLocation) {
                            setPressedButton(pressedButton => item.WorkLocation);
                            console.log("Attendance updated for", mail, "from [", pressedButton, "] to [", item.WorkLocation, "]");
                            // break;
                        }

                        if (notes !== item.NOTES) {
                            console.log("Notes updated for", mail, "from [", notes, "] to [", item.NOTES, "]");
                            setNotes(notes => item.NOTES)
                        }

                        break;

                    }
                }

            })
            .catch(error => console.log('FAILED to GET attendance, error', error));

    }, [mail])


    function updateAtLists() {

        console.log("In updateAtLists", todaysAttendance.length)

        var tofficeList = [];
        var tmeetingList = [];
        var tremoteList = [];
        // var officeListItems = [];
        // var meetingListItems = [];
        // var anywhereListItems = []

        for (const item of todaysAttendance) {
            console.log("checking: " + JSON.stringify(item));
            if (item.WorkLocation === 'Office') {
                tofficeList.push(item);
            }
            if (item.WorkLocation === 'Remote') {
                tremoteList.push(item);
            }
            if (item.WorkLocation === 'Meeting') {
                tmeetingList.push(item);
            }

        }

        //  <li class="list-group-item fs-5">Person A</li>

        console.log("Office size", tofficeList.length, ", Anywhere size:", tremoteList.length, ", Meeting size:", tmeetingList.length);
        // }

        setOfficeList(officeList => tofficeList.map(record =>
            <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li>
        ));
        setRemoteList(remoteList => tremoteList.map(record =>
            <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li>
        ));
        setMeetingList(meetingList => tmeetingList.map(record =>
            <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li>
        ));

    }


    function storeAttendance(payload) {

        // setPressedButton(payload);
        // add content type header to object
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // using built in JSON utility package turn object to string and store in a variable
        var raw = JSON.stringify({
            "mail": mail,
            "workLocation": payload,
            "date": getFormattedDate(),
            "notes": tempNotes
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
                updateLocalAttendance(payload, tempNotes);
                setShowFlag(true);
                setNotes(tempNotes);
                // alert(JSON.parse(result).body)
            }
            )
            .catch(error => console.log('FAILED to POST attendance, error:', error));

    }


    function handleButtonSubmit(payload) {

        // console.log("Button pressed:", payload, "notes:", tempNotes);
        console.log("Button pressed:", payload, ", temp-notes:", tempNotes, ", notes:", notes);

        // send attendance if pressed button is different that current selection
        if (notesError === null && (payload !== pressedButton || tempNotes !== notes)) {
            // setNotes(notes => tempNotes)
            // setTempNotes(tempNotes => notes)
            storeAttendance(payload);
            setShow(false);
        }

    }


    function updateLocalAttendance(payload, newNotes) {
        console.log("Updating internal attendance, after button-press event", payload);
        var matchFlag = false;
        for (const item of todaysAttendance) {
            console.log("Current todayAttendance", item);
            if (item.SK === mail) {
                matchFlag = true;
            }
            if (item.SK === mail && item.PK === getFormattedDate() && item.WorkLocation !== payload) {
                // console.log("Updated internal attendance of", mail, "from", item.WorkLocation, "to", payload);
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
            todaysAttendance.push(obj);
        }


        updateAtLists();
    }


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
                    {/* <li className="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Office
                        <span className="badge bg-primary rounded-pill">{officeListItems.length}</span>
                    </li>
                    {officeListItems} */}

                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Meeting
                        <span className="badge bg-primary rounded-pill">{meetingList.length}</span>
                    </li>
                    {meetingList}
                    {/* <li className="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Meeting
                        <span className="badge bg-primary rounded-pill">{meetingListItems.length}</span>
                    </li>
                    {meetingListItems} */}

                    {/* <li className="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Remote
                        <span className="badge bg-primary rounded-pill">{anywhereListItems.length}</span>
                    </li>
                    {anywhereListItems} */}
                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Remote
                        <span className="badge bg-primary rounded-pill">{remoteList.length}</span>
                    </li>
                    {remoteList}

                </ul>

                <div className="card-footer text-center">
                    <Button variant="success" onClick={handleShow} className="me-2">
                        Add My Work Location
                    </Button>
                </div>

            </div >


            <Offcanvas show={show} onHide={handleClose} name='attendance-btn-offcanvas' placement='bottom'>
                {/* <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Submit
                    </Offcanvas.Title>
                </Offcanvas.Header> */}
                <Offcanvas.Body closeButton>
                    <div id="notesHelpBlock" className="form-text">
                        <input type="text" onChange={(e) => handleNotes(e.target.value)} className="form-control" aria-describedby="notesHelpBlock" placeholder={notes} aria-label="STAY TUNED"></input>
                        <p>
                            optional notes eg. customer name, location or reason
                        </p>
                    </div>
                    <MyButton name="Office" className='btn btn-primary btn-lg m-1 mb-3' onButtonSubmit={handleButtonSubmit} pressedButton={pressedButton} />
                    <MyButton name="Meeting" className='btn btn-success btn-lg m-1 mb-3' onButtonSubmit={handleButtonSubmit} pressedButton={pressedButton} />
                    <MyButton name="Remote" className='btn btn-warning btn-lg m-1 mb-3' onButtonSubmit={handleButtonSubmit} pressedButton={pressedButton} />
                    <br></br>
                    {/* <label for="inputPassword5" class="form-label">Password</label> */}
                    {/* <input type="text" onChange={(e) => setNotes(e.target.value)} id="inputPassword5" className="form-control" aria-describedby="notesHelpBlock" placeholder={notes} aria-label="STAY TUNED"></input> */}
                    {/* <input type="text" onChange={(e) => handleNotes(e.target.value)} id="inputPassword5" className="form-control" aria-describedby="notesHelpBlock" placeholder={notes} aria-label="STAY TUNED"></input> */}
                    {/* <input type="text" onChange={(e) => setTempNotes(e.target.value)} id="inputPassword5" className="form-control" aria-describedby="notesHelpBlock" placeholder={notes} aria-label="STAY TUNED"></input> */}

                    <div id="notesErrorBlock" className="form-text text-danger">
                        {notesError}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            <MessageToast showFlag={showFlag} onToastClose={() => setShowFlag(false)} ></MessageToast>

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