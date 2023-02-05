import { useState } from "react";

function MailInput({ onMailSubmit }) {

    const [mail, setMail] = useState(null);

    //const handleCallback = () => onMailSubmit(mail);

    // function handleCallback() {
    //     console.log(mail);
    //     onMailSubmit(mail);
    // }


    return (

        <>
            {/* <div className="mb-3">
                <br />
                <label for="exampleFormControlInput1" className="form-label">Email address</label>
                <br />
                <input type="email" className="form-control" onChange={(e) => setMail(e.target.value)} id="exampleFormControlInput1" placeholder="name@opentext.com" />
                <br />
                <button type="submit" className="btn btn-primary mb-1" onClick={() => onMailSubmit(mail)}>Confirm identity</button>
            </div> */}

            <div className="card text-center">
                <div className="card-header">
                    Welcome 💐
                </div>
                <div className="card-body">
                    <h5 className="card-title">Let's onboard you..</h5>
                    <br></br>
                    {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                    <input type="email" className="form-control" onChange={(e) => setMail(e.target.value)} id="exampleFormControlInput1" placeholder="name@opentext.com" />
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                    <br></br>
                    <button type="submit" className="btn btn-primary" onClick={() => onMailSubmit(mail)}>Enter</button>
                </div>
                <div className="card-footer text-muted">
                    ▪ openverse ▪
                </div>
            </div>
        </>

    );
}

export default MailInput;