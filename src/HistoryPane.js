import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { MeContext } from "./App";

// export default function MyAtPane({handleQuerySelect, query}) {
export default function MyAtPane() {

    // const [mail, setMail] = useState(() => {
    //     return JSON.parse(localStorage.getItem('mail')) || null
    // })
    const navigate = useNavigate();

    const { query, setQuery, myHistory, mail } = useContext(MeContext)


    const colorClassKey = {
        'Meeting': "mb-1 fs-6 badge bg-primary text-wrap",
        'Remote': "mb-1 fs-6 badge bg-warning text-wrap",
        'Office': "mb-1 fs-6 badge bg-success text-wrap",
        'Day Off': "mb-1 fs-6 badge bg-secondary text-wrap"
    }

    useEffect(() => {
        console.log("In useEffect mail")
        if (!mail) {
            console.log("Login not found, redirecting to Login page")
            navigate("/login");
        }
    }, [mail])


    return (
        <>

            <div className="card mb-3">
                <div className="card-header bg-primary">
                    <h5 className="card-title " style={{ "color": "white" }}>Work History</h5>
                </div>
                <div className="card-body">
                    {/* <h5 className="card-title">Make a Selection</h5> */}
                    <div className="d-flex justify-content-evenly btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input onChange={() => setQuery(query => "mcw")} type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={"mcw" === query ? true : false} />
                        {/* <input onChange={(e) => handleQuerySelect(e.target.name)} type="radio" className="btn-check"  
                            name="mcw" id="btnradio1" autocomplete="off" checked={"mcw"===query? true : false} /> */}
                        <label className="btn btn-outline-secondary" htmlFor="btnradio1">1 Week</label>

                        <input onChange={() => setQuery(query => "m2w")} type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={"m2w" === query ? true : false} />
                        {/* <input onChange={(e) => handleQuerySelect(e.target.name)} type="radio" className="btn-check"  
                            name="m2w" id="btnradio2" autocomplete="off" checked={"m2w"===query? true : false}/> */}
                        <label className="btn btn-outline-secondary" htmlFor="btnradio2">2 Weeks</label>

                        <input onChange={() => setQuery(query => "m4w")} type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" checked={"m4w" === query ? true : false} />
                        {/* <input onChange={(e) => handleQuerySelect(e.target.name)} type="radio" className="btn-check"  
                            name="m4w" id="btnradio3" autocomplete="off" checked={"m4w"===query? true : false}/> */}
                        <label className="btn btn-outline-secondary" htmlFor="btnradio3">4 weeks</label>
                    </div>

                </div>
                <div className="card-footer">
                    <small className="text-muted">Attendance History</small>
                </div>

            </div>

            <div className="list-group">

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

                {

                    myHistory.WEEKDATA &&
                    Object.keys(myHistory.WEEKDATA).sort().reverse().map(record => (
                        // console.log("record", record.toString(), ":", atHistory.WEEKDATA[record].DATE)

                        < div key={myHistory.WEEKDATA[record].DATE} className="list-group-item list-group-item-action" >
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 fs-6 badge bg-dark text-wrap">{new Date(myHistory.WEEKDATA[record].DATE).toDateString()}</h5>
                                <h5 className={colorClassKey[myHistory.WEEKDATA[record].WORKLOCATION]}>{myHistory.WEEKDATA[record].WORKLOCATION}</h5>
                                {/* <h5 className="mb-1 fs-6 badge bg-success text-wrap">{ atHistory.WEEKDATA[record].WORKLOCATION }</h5> */}
                            </div>
                            <span className="mb-1">
                                {myHistory.WEEKDATA[record].NOTES}
                            </span>
                        </div>

                    ))

                }

            </div>

        </>
    )
}