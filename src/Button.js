// import { useState } from "react";

export default function Button({ name, onButtonSubmit, pressedButton }) {

    // const[value, setValue] = useState(null);

    // function handleClick() {
    //     console.log( name + ' clicked');
        
    //     if(pressedButton === name) {
    //         setValue('✔');
    //     } else {
    //         setValue('');
    //     }

    //     onButtonSubmit(name);
    // }


    

    return (
      <button type="button" onClick={() => onButtonSubmit(name)} className="btn btn-lg btn-outline-warning m-1">
        {name} {pressedButton === name ? '✔' : ''}
      </button>
    );
  }
  