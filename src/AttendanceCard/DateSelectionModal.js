import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import { TeamContext } from '../App';

export default function DateSelectionModal({ onSubmit, attendanceDate }) {

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const dateSelected = (selectedDate) => {
        // alert('You clicked the third ListGroupItem');
        onSubmit(selectedDate)
        setShow(false)
    };

    const { mail, teamWeek } = useContext(TeamContext)

    const createDropdown = () => {
        const today = new Date()
        let weekDay = today.getDay()
        if (weekDay===0) {weekDay=7}
        console.log(today + " - " + weekDay)
        const dateList = []
        for (let i=1; i <= weekDay; i++) {
            var k = new Date()
            const p = new Date(k.setDate(today.getDate() + i - weekDay))
            console.log("date for", i, "is", p)

            const pIsoFormat = p.toISOString().substring(0,10)
            let info = ''

            teamWeek.forEach(personWeek => {
                // console.log("In", personWeek.SK)
                // console.log(Object.values(personWeek.WEEKDATA))
                if(mail === personWeek.SK) {
                    for (const day of Object.values(personWeek.WEEKDATA)) {
                        // console.log(isoFormatDate," - ",day["DATE"], day["NOTES"], day["WORKLOCATION"])
                        if(pIsoFormat === day['DATE']) {
                            console.log("Match found")
                            info = "[" + day['WORKLOCATION'] + " | " + day['NOTES'] + "]"
                            // setNotes(notes => day['NOTES'])
                            // setTempNotes(tempNotes => day['NOTES'])
                        }
                    }
                }
            })

            
            dateList.push(<ListGroup.Item key={i} action onClick={() => dateSelected(p)}>{p.toString().substring(0, 3)}, {p.getDate()} {info}</ListGroup.Item>)
        }

        return dateList
    }

    const[dateList, setDateList] = useState(createDropdown)

    // useEffect(() => createDropdown)


    return (
        <div className='pb-2'>
            <Button variant="outline-primary" onClick={handleShow}>
                {attendanceDate}
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Select Date</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup variant="flush">
                        {dateList}
                        {/* {createDropdown()} */}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </div>
    );
}