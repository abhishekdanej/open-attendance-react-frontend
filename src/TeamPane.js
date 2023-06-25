import { useContext, useEffect } from "react"
import { Team2Context } from "./App"
import { useNavigate } from 'react-router-dom';

export default function TeamPane() {

    const navigate = useNavigate();

    const { mail, teamWeek } = useContext(Team2Context);

    // console.log("Received",JSON.stringify(teamWeek))

    const colorClassKey = {
        'Meeting': "badge bg-primary rounded-pill",
        'Remote': "badge bg-warning rounded-pill",
        'Office': "badge bg-success rounded-pill",
        'Day Off': "badge bg-secondary rounded-pill"
    }

    useEffect(() => {
        console.log("In useEffect mail")
        if (!mail) {
            console.log("Login not found, redirecting to Login page")
            navigate("/login");
        }
    }, [mail])


    function getWeekCalendar() {

        const today = new Date()
        const weekDay = today.getDay()
        const days = 86400000 //number of milliseconds in a day
        var dateList = []
        for (let i=1; i<=7; i++) {
            console.log("preparing day", i)
            var k = new Date()
            // const diff = (i-weekDay)*days
            // console.log("diff " + diff)
            // var p = new Date(today - (7-i-weekDay)*days)
            // var p = new Date(today + ((i-weekDay)*days))

            var p = new Date(today - (7-i-weekDay)*days)
            var dateNum = p.getDate();

            //var p = new Date(k.setDate(today.getDate() + i - weekDay))
            console.log("date for",i, "is",p)
            if (p.getDate()===today.getDate()) {
                dateList.push(<td className="border-bottom border-secondary">{p.getDate()}</td>)
            } else {
                dateList.push(<td>{p.getDate()}</td>)
            }
        }
        // if(weekDay===0) {dateList.push(<td></td>)}

        return (
            <tbody>
                <tr>
                    {dateList}
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td><span className="badge border border-secondary rounded-pill text-secondary">M</span></td>
                    <td><span className="badge border border-secondary rounded-pill text-secondary">T</span></td>
                    <td><span className="badge border border-secondary rounded-pill text-secondary">W</span></td>
                    <td><span className="badge border border-secondary rounded-pill text-secondary">T</span></td>
                    <td><span className="badge border border-secondary rounded-pill text-secondary">F</span></td>
                    <td><span className="badge border border-secondary rounded-pill text-bg-secondary">S</span></td>
                    <td><span className="badge border border-secondary rounded-pill text-bg-secondary">S</span></td>
                    <td>&nbsp;</td>
                    {/* <td>&nbsp;</td> */}
                    <td><small>🏆</small></td>
                </tr>
            </tbody>
        )
    }


    function getBadge(i, payload) {
        console.log("getbadge", payload.toString())
        // 0   7   (sun) new Date().getDay() : ISO day
        // 1   1
        // 2   2
        // 3   3
        // 4   4
        // 5   5
        // 6   6   (sat)
        let className = ""
        var d = new Date().getDay();
        if (d === 0) { d = 7 }
        if (d === i) {
            console.log("match found with calendar date", i)
            className = "border-bottom border-secondary"
        }
        return <td className={className}><span className={colorClassKey[payload['WORKLOCATION']]}>{payload['WORKLOCATION'].substring(0, 1)}</span></td>
    }

    function getDateBadge(i) {

        const today = new Date()
        const weekDay = today.getDay()
        const days = 86400000 //number of milliseconds in a day
        var p = new Date(today - (7-i-weekDay)*days)
        var dateNum = p.getDate();
        // for (let i = 1; i <= 7; i++) {
        //     // console.log("preparing day", i)
        //     console.log("date for",i, "is",p)
        //     if (p.getDate()===today.getDate()) {
        //         dateList.push(<td className="border-bottom border-secondary">{p.getDate()}</td>)
        //     } else {
        //         dateList.push(<td>{p.getDate()}</td>)
        //     }
        // }


        let className = ""
        var d = new Date().getDay();
        if (d === 0) { d = 7 }
        if (d === i) {
            console.log("match found with calendar date", i)
            className = "border-bottom border-secondary"
        }
        if (i >= 6) {
            return <td className={className}><span className="badge border border-secondary rounded-pill text-bg-secondary">S</span></td>
        }
        return <td className={className}><small><span className="badge border border-secondary rounded-pill text-secondary">{dateNum}</span></small></td>
    }


    function getWeekAttendance(pk, weekdata) {
        console.log("Received weekdata:", weekdata)
        const w = pk.split("-")[2]

        var badgeList = []
        // badgeList.push(<tr>)
        // const days =  ['2','3','4','5','6','7','8']
        for (let i = 1; i <= 7; i++) {
            let id = w + '-' + i
            console.log("checking for day", id)
            weekdata[id] ? console.log("exists", weekdata[id]) : console.log("does not", id)
            badgeList.push(weekdata[id] ? getBadge(i, weekdata[id]) : getDateBadge(i))
        }

        console.log(badgeList.toString())
        return (
            <tr>
                {badgeList}
                <td>&nbsp;</td>
                <td><small>🏆</small></td>
            </tr>
        )

    }

    return (

        <>

            <div className="card mb-3">
                <div className="card-header bg-primary">
                    <h5 className="card-title " style={{ "color": "white" }}>Week Calendar</h5>
                </div>
                <div className="card-body">
                    {/* <h5 className="card-title">Make a Selection</h5> */}
                    <table className="table table-borderless">
                        {getWeekCalendar()}
                    </table>

                </div>
                {/* <div className="card-footer">
                    <small className="text-muted">Attendance History</small>
                </div> */}

            </div>

            <div className="list-group">

                {/* <div class="list-group-item list-group-item-action ps-2">
                    <span className="fw-bold">
                        abhishek.danej@opentext.com
                    </span>
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td><span class="badge bg-primary rounded-pill">M</span></td>
                                <td><span class="badge bg-success rounded-pill">O</span></td>
                                <td><span class="badge bg-primary rounded-pill">M</span></td>
                                <td><span class="badge bg-warning rounded-pill">R</span></td>
                                <td><span class="badge border border-secondary rounded-pill text-secondary">17</span></td>
                                <td><span class="badge bg-secondary rounded-pill">18</span></td>
                                <td className="border-bottom border-secondary"><span class="badge bg-secondary rounded-pill">19</span></td>
                                <td>&nbsp;</td>
                                <td>🏆</td>
                                <td>&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}


                {/* <div class="list-group-item list-group-item-action ps-2">
                    <span className="fw-bold">
                        vasudev.gwala@opentext.com
                    </span>
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td><span className="badge bg-warning rounded-pill">R</span></td>
                                <td><span className="badge bg-success rounded-pill">O</span></td>
                                <td><span className="badge bg-primary rounded-pill">M</span></td>
                                <td><span className="badge bg-primary rounded-pill">M</span></td>
                                <td><span className="badge bg-primary rounded-pill">M</span></td>
                                <td><span className="badge bg-secondary rounded-pill">18</span></td>
                                <td className="border-bottom border-secondary"><span class="badge bg-secondary rounded-pill">19</span></td>
                                <td>&nbsp;</td>
                                <td><small>🏆</small></td>
                                <td>&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
                
                {
                    teamWeek.map(person =>

                        <div key={person['SK']} className="list-group-item list-group-item-action ps-2">
                            <span className="fw-bold">
                                {person['SK']}
                            </span>
                            <table className="table table-borderless">
                                <tbody>
                                    {
                                        getWeekAttendance(person['PK'], person['WEEKDATA'])
                                    }
                                </tbody>
                            </table>
                        </div>

                    )

                }


            </div>
        </>
    )
}