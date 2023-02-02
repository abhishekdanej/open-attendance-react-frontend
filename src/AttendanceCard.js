import AttendanceButton from "./AttendanceButton";
import { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { getUserFormattedDate, getFormattedDate } from "./Utilities";
import MessageToast from "./MessageToast";

export default function AttendanceCard({ mail }) {

    const [todaysAttendance, setTodaysAttendance] = useState([]);
    const [pressedButton, setPressedButton] = useState();
    const [showFlag, setShowFlag] = useState(null);

    const [officeList, setOfficeList] = useState([]);
    const [officeListItems, setOfficeListItems] = useState([]);
    const [anywhereList, setAnywhereList] = useState([]);
    const [anywhereListItems, setAnywhereListItems] = useState([]);
    const [meetingList, setMeetingList] = useState([]);
    const [meetingListItems, setMeetingListItems] = useState([]);

    useEffect(() => {
        parseAttendanceList(todaysAttendance);
    },[todaysAttendance])

    // const in_mail = mail;

    useEffect(() => {
        console.log("In useEffect - todaysAttendance");
        // getAttendanceData();
        // testing off getAttendanceData();

        console.log("Getting attendance data from server");

        const fDate = getFormattedDate();
        var url1 = "https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/attendance?date=" + fDate;
        const url = url1 + "&mail=" + mail;


        // working
        fetch(url)
            .then(response => response.json())
            .then((result) => {
                console.log("Received from server:", result.body);
                console.log(JSON.stringify(result.body));

                if (JSON.stringify(result.body) !== JSON.stringify(todaysAttendance)) {
                    console.log("Received attendance is different than local attendance, updating local attendance.");
                    setTodaysAttendance(() => result.body);
                    // parseAttendanceList(result.body);
                } else {
                    console.log("Received attendance is same as local attendance");
                }

                /*
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
                */

            })
            .catch(error => console.log('FAILED to GET attendance, error', error));


    }, [todaysAttendance]);

    /*
    if (value) {

        console.log("Got Object: " + value['value'].length);
        // setAtList(value['value']);
        // console.log("Got list: " + JSON.stringify(value));
        // const obj = JSON.parse(JSON.stringify(value))['value'];
        // console.log("List length: " + obj.length);


        var list = value['value'];
        for (const item of list) {
            console.log("checking: " + JSON.stringify(item));
            if (item.WorkLocation === 'Office') {
                officeList.push(item);
            }
            if (item.WorkLocation === 'Anywhere') {
                anywhereList.push(item);
            }
            if (item.WorkLocation === 'Meeting') {
                meetingList.push(item);
            }
        }

        //  <li class="list-group-item fs-5">Person A</li>

        console.log("Office size", officeList.length, ", Anywhere size:", anywhereList.length, ", Meeting size:", meetingList.length);
    }

    const officeListItems = officeList.map(record =>
        <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li>
    );
    const anywhereListItems = anywhereList.map(record =>
        <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li>
    );
    const meetingListItems = meetingList.map(record =>
        <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li>
    );
    */


    function parseAttendanceList(value) {

        console.log('inside parseAttendanceList');
        console.log("Got Object: " + value.length);

        // var officeList = [];
        // var meetingList = [];
        // var anywhereList = [];
        setOfficeList(officeList => []);
        setOfficeListItems(officeListItems => []);

        setMeetingList(meetingList => []);
        setMeetingListItems(meetingListItems => []);

        setAnywhereList(anywhereList => []);
        setAnywhereListItems(anywhereListItems => []);

        // value = todaysAttendance;

        if (value) {

            console.log("inside IF")

            console.log("Got Object: " + value.length);

            var list = value;
            for (const item of list) {
                console.log("checking: " + JSON.stringify(item));
                if (item.WorkLocation === 'Office') {
                    officeList.push(item);
                }
                if (item.WorkLocation === 'Anywhere') {
                    anywhereList.push(item);
                }
                if (item.WorkLocation === 'Meeting') {
                    meetingList.push(item);
                }
            }

            console.log("Office size", officeList.length, ", Anywhere size:", anywhereList.length, ", Meeting size:", meetingList.length);
            console.log("ITEM, Office size", officeListItems.length, ", Anywhere size:", anywhereListItems.length, ", Meeting size:", meetingListItems.length);
        }

        setMeetingListItems(meetingList.map(record =>
            <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li>
        ));
        setOfficeListItems(officeList.map(record =>
            <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li>
        ));
        setAnywhereListItems(anywhereList.map(record =>
            <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li>
        ));
    }

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
                        // setTodaysAttendance(result.body);
                        parseAttendanceList(result.body);
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
    function handleButtonSubmit(payload) {

        console.log("Button pressed:", payload);
        // send attendance if pressed button is different that current selection
        // if (payload !== pressedButton) {
        //   storeAttendance(payload);
        // }

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

    return (
        <>

            <div className="container justify-content-between">
                <div className="row align-items-center">
                    <div className="col">

                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                My Workplace
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1" onClick={() => handleButtonSubmit("Office")}>Office</Dropdown.Item>
                                <Dropdown.Item href="#/action-2" onClick={() => handleButtonSubmit("Meeting")}>Meeting</Dropdown.Item>
                                <Dropdown.Item href="#/action-3" onClick={() => handleButtonSubmit("Remote")}>Remote</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="col">

                        <div className="badge bg-secondary text-wrap">
                            {getUserFormattedDate()}
                        </div>
                    </div>
                </div>
            </div>
            <br></br>

            <div className="d-flex justify-content-center">
            </div>
            < div className="card mb-3"  >
                <h5 className="card-header text-bg-primary fs-3">India</h5>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Office
                        <span className="badge bg-primary rounded-pill">{officeListItems.length}</span>
                    </li>
                    {officeListItems}

                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Meeting
                        <span className="badge bg-primary rounded-pill">{meetingListItems.length}</span>
                    </li>
                    {meetingListItems}

                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Anywhere
                        <span className="badge bg-primary rounded-pill">{anywhereListItems.length}</span>
                    </li>
                    {anywhereListItems}

                </ul>
                <div className="card-footer text-center">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" size="lg">
                            My Workplace
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" size="lg">Office</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Meeting</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Remote</Dropdown.Item>
                            <Dropdown.Item href="#/action-4">Day-off</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </div>

                <MessageToast showFlag={showFlag} onToastClose={() => setShowFlag(false)} ></MessageToast>
            </div >
        </>
    );
}