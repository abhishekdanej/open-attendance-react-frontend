import { useState } from "react";

function MailInput({onMailSubmit}) {

    const [mail, setMail] = useState(null);

    //const handleCallback = () => onMailSubmit(mail);

    // function handleCallback() {
    //     console.log(mail);
    //     onMailSubmit(mail);
    // }


    return (

        <div class="mb-3">
            <br/>
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <br/>
            <input type="email" class="form-control" onChange={(e) => setMail(e.target.value)} id="exampleFormControlInput1" placeholder="name@opentext.com"/>
            <br/>
            <button type="submit" class="btn btn-primary mb-1" onClick={() => onMailSubmit(mail)}>Confirm identity</button>
        </div>

    );
}

export default MailInput;