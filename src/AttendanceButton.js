import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';


export default function AttendanceButton({ name, onButtonSubmit, pressedButton }) {


    const [value, setValue] = useState(['None', 'Office', 'Meeting', 'Remote', 'Day-off']);

    const handleChange = (val) => setValue(val);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        //   <button type="button" className="btn btn-lg btn-outline-primary">
        //     Mark your Presence 🙂
        //   </button>


        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                My Workplace
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

    );
}
