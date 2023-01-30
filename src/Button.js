// import { useState } from "react";

export default function Button({ name, onButtonSubmit, pressedButton }) {

    return (
      <button type="button" onClick={() => onButtonSubmit(name)} className="btn btn-outline-warning m-1">
        {name} {pressedButton === name ? '✔' : ''}
      </button>
    );
  }
  