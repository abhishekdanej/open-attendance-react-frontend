import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'

function MessageToast({ attendanceDate, showFlag, onToastClose }) {

    return (
        <ToastContainer position="bottom-center">
            <Toast show={showFlag} onClose={onToastClose} delay={3000} autohide>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">openverse</strong>
                    <small>now</small>
                </Toast.Header>
                <Toast.Body><span>Attendance Updated for {attendanceDate}</span></Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default MessageToast;