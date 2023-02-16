import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { HistoryContext } from "./App";
import { getFormattedDate, getISOFormattedDate, getUserFormattedDate } from "./Utilities";

// export default function MyAtPane({handleQuerySelect, query}) {
export default function MyAtPane() {

    // const [mail, setMail] = useState(() => {
    //     return JSON.parse(localStorage.getItem('mail')) || null
    // })
    const navigate = useNavigate();
    // const querySet = new Set(["mcw"])
    // const [atHistory, setAtHistory] = useState({})
    // const [query, setQuery] = useState()

    const {query, setQuery, atHistory, mail} = useContext(HistoryContext)


    const colorClassKey = {
        'Meeting': "mb-1 fs-6 badge bg-primary text-wrap",
        'Remote': "mb-1 fs-6 badge bg-warning text-wrap",
        'Office': "mb-1 fs-6 badge bg-success text-wrap"
    }

    useEffect(() => {
        console.log("In useEffect mail")
        if (!mail) {
          console.log("Login not found, redirecting to Login page")
          navigate("/login");
        }
      }, [mail])


    /* WORKING
    useEffect(() => {

        console.log("In useEffect - atHistory");

        if (atHistory.WEEKDATA) {
            console.log("Object keys")
            console.log(Object.keys(atHistory.WEEKDATA))
            Object.keys(atHistory.WEEKDATA).map(record => {
                console.log("record", record.toString(), ":", atHistory.WEEKDATA[record].DATE)
            })
        }

    }, [atHistory])
    */

    // const handleQuerySelect = useCallback((newQuery) => {

    //     setQuery(newQuery)
    //     // query = value

    //     console.log("In useCallback - query", newQuery);
    //     if (!mail) {
    //         console.log("Login not found, redirecting to Login page")
    //         navigate("/login");
    //         return
    //     }

    //     console.log("GET query attendance attempt from server", newQuery);

    //     if (!querySet.has(newQuery)) {
    //         console.log("Invalid query", newQuery, ", quitting.")
    //         return
    //     }

    //     const date = getISOFormattedDate();

    //     var url = "https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/attendance?date=" + date;
    //     url = url + "&mail=" + mail;
    //     url = url + "&query=" + newQuery

    //     // working
    //     fetch(url)
    //         .then(response => response.json())
    //         .then((result) => {
    //             console.log("Received from server:", result.body);
    //             console.log(JSON.stringify(result.body));

    //             if (JSON.stringify(result.body) !== JSON.stringify(atHistory)) {
    //                 console.log("Received attendance history is different than local attendance history, updating local attendance.");
    //                 setAtHistory(result.body);
    //                 // updateAtLists(result.body);
    //             } else {
    //                 console.log("Received attendance history is same as local attendance history");
    //             }

    //         })
    //         .catch(error => console.log('FAILED to GET attendance, error', error));

    // },[query])

    // useEffect(() => {

    //     console.log("In useEffect - query", query);
    //     if (!mail) {
    //         console.log("Login not found, redirecting to Login page")
    //         navigate("/login");
    //         return
    //     }

    //     console.log("GET query attendance attempt from server", query);

    //     if (!querySet.has(query)) {
    //         console.log("Invalid query", query, ", quitting.")
    //         return
    //     }

    //     const date = getISOFormattedDate();

    //     var url = "https://iiy5uzcet7.execute-api.ap-south-1.amazonaws.com/dev/attendance?date=" + date;
    //     url = url + "&mail=" + mail;
    //     url = url + "&query=" + query

    //     // working
    //     fetch(url)
    //         .then(response => response.json())
    //         .then((result) => {
    //             console.log("Received from server:", result.body);
    //             console.log(JSON.stringify(result.body));

    //             if (JSON.stringify(result.body) !== JSON.stringify(atHistory)) {
    //                 console.log("Received attendance history is different than local attendance history, updating local attendance.");
    //                 setAtHistory(result.body);
    //                 // updateAtLists(result.body);
    //             } else {
    //                 console.log("Received attendance history is same as local attendance history");
    //             }

    //         })
    //         .catch(error => console.log('FAILED to GET attendance, error', error));

    // }, [query])


    return (
        <>

            <div className="card mb-3">
                <img src="img1.jpg" className="card-img-top" alt="Group of friends" />
                <div className="card-body">
                    <h5 className="card-title">Limited Preview Feature</h5>
                    <p className="card-text">History of your work location (visible to you only).</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-header">
                    <h5 className="card-title">Make a Selection</h5>
                </div>
                <div className="card-body">
                    {/* <h5 className="card-title">Make a Selection</h5> */}
                    <div className="d-flex justify-content-evenly btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input onChange={() => setQuery(query => "mcw")} type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={"mcw"===query? true : false} />
                        {/* <input onChange={(e) => handleQuerySelect(e.target.name)} type="radio" className="btn-check"  
                            name="mcw" id="btnradio1" autocomplete="off" checked={"mcw"===query? true : false} /> */}
                        <label className="btn btn-outline-secondary" htmlFor="btnradio1">1 Week</label>

                        <input onChange={() => setQuery(query => "m2w")} type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={"m2w"===query? true : false}/>
                        {/* <input onChange={(e) => handleQuerySelect(e.target.name)} type="radio" className="btn-check"  
                            name="m2w" id="btnradio2" autocomplete="off" checked={"m2w"===query? true : false}/> */}
                        <label className="btn btn-outline-secondary" htmlFor="btnradio2">2 Weeks</label>

                        <input onChange={() => setQuery(query => "m4w")} type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" checked={"m4w"===query? true : false}/>
                        {/* <input onChange={(e) => handleQuerySelect(e.target.name)} type="radio" className="btn-check"  
                            name="m4w" id="btnradio3" autocomplete="off" checked={"m4w"===query? true : false}/> */}
                        <label className="btn btn-outline-secondary" htmlFor="btnradio3">4 weeks</label>
                    </div>

                </div>

            </div>

            <div className="list-group">


                {/* <div className="list-group-item list-group-item-action mb-2">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1 badge bg-dark text-wrap">14 Feb 2023, Tuesday</h5>
                        <h5 className="mb-1 badge bg-primary text-wrap">Meeting</h5>
                        <small class="text-muted">3 days ago</small>
                    </div>
                    <span className="mb-1">
                        <span className="fw-bold">Meeting</span>: Implementation review at IDBI Bank. Implementation review at IDBI Bank.
                    </span>
                </div> */}

                {/* <div className="list-group-item list-group-item-action mb-2">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1 badge bg-dark text-wrap">13 Feb 2023, Monday</h5>
                        <h5 className="mb-1 badge bg-warning text-wrap">Remote</h5>
                    </div>
                    <span className="mb-1">
                        <span className="fw-bold">Remote</span>: SMAX VILT Training day 2.
                    </span>
                </div> */}


                {/* <div className="list-group-item list-group-item-action mb-2">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1 badge bg-dark text-wrap">12 Feb 2023, Monday</h5>
                        <h5 className="mb-1 badge bg-success text-wrap">Office</h5>
                    </div>
                    <span className="mb-1">
                        <span className="fw-bold">Office</span>:
                        SMAX VILT Training day 2.
                    </span>
                </div> */}

                {/* <div className="list-group-item list-group-item-action mb-2">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1 fs-6 badge bg-dark text-wrap">10 Feb 2023, Saturday</h5>
                        <h5 className="mb-1 fs-6 badge bg-success text-wrap">Remote</h5>
                    </div>
                    <span className="mb-1">
                        <span className="fw-bold">Remote</span>: Implementation review at IDBI Bank
                    </span>
                </div> */}


                {

                    atHistory.WEEKDATA &&
                    Object.keys(atHistory.WEEKDATA).map(record => (
                        // console.log("record", record.toString(), ":", atHistory.WEEKDATA[record].DATE)

                        < div key={atHistory.WEEKDATA[record].DATE} className="list-group-item list-group-item-action mb-2" >
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 fs-6 badge bg-dark text-wrap">{new Date(atHistory.WEEKDATA[record].DATE).toDateString()}</h5>
                                <h5 className={colorClassKey[atHistory.WEEKDATA[record].WORKLOCATION]}>{atHistory.WEEKDATA[record].WORKLOCATION}</h5>
                                {/* <h5 className="mb-1 fs-6 badge bg-success text-wrap">{ atHistory.WEEKDATA[record].WORKLOCATION }</h5> */}
                            </div>
                            <span className="mb-1">
                                {atHistory.WEEKDATA[record].NOTES}
                            </span>
                        </div>

                    ))

                }

            </div>

        </>
    )
}