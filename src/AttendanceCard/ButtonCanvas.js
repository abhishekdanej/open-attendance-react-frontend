// import Dropdown from 'react-bootstrap/Dropdown';
// import { useState, useEffect, useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import DateSelectionModal from './DateSelectionModal';
import { useState } from 'react';

export default function ButtonCanvas(
    {
        show,
        handleClose, 
        onDateSelection, 
        attendanceDate, 
        handleNotes, 
        notesError, 
        pressedButton,
        handleButtonSubmit, 
        MyButton, 
        notes
    }) {


    return (
        <Offcanvas show={show} onHide={handleClose} name='attendance-btn-offcanvas' placement='bottom'>
        {/* <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header> */}
        <Offcanvas.Body>

            <div className='d-flex flex-row'>
                <DateSelectionModal te onSubmit={onDateSelection} attendanceDate={attendanceDate}></DateSelectionModal>
            </div>

            <input type="text" 
                onChange={(e) => handleNotes(e.target.value)} 
                className="form-control" 
                aria-describedby="notesHelpBlock" 
                placeholder={notes} 
                aria-label="STAY TUNED"></input>
            <div id="notesHelpBlock" className="form-text p-2">
                Optional notes - customer name, location or reason.
            </div>
            <div className="d-flex flex-row">
                <div className="d-grid p-1 col-3 mx-auto">
                    <MyButton name="Office" className='btn btn-primary' onButtonSubmit={handleButtonSubmit} pressedButton={pressedButton} />
                </div>
                <div className="d-grid p-1 col-3 mx-auto">
                    <MyButton name="Meeting" className='btn btn-success' onButtonSubmit={handleButtonSubmit} pressedButton={pressedButton} />
                </div>
                <div className="d-grid p-1 col-3 mx-auto">
                    <MyButton name="Remote" className='btn btn-warning' onButtonSubmit={handleButtonSubmit} pressedButton={pressedButton} />
                </div>
                <div className="d-grid p-1 col-3 mx-auto">
                    <MyButton name="Day Off" className='btn btn-secondary' onButtonSubmit={handleButtonSubmit} pressedButton={pressedButton} />
                </div>
            </div>
            <div id="notesErrorBlock" className="form-text text-danger">
                {notesError}
            </div>
        </Offcanvas.Body>
    </Offcanvas>
    )
}