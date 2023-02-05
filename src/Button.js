// import { useState } from "react";

export default function Button({ name, onButtonSubmit, pressedButton }) {

    return (
      <button type="button" onClick={() => onButtonSubmit(name)}>
        Office
        {name} {pressedButton === name ? '✔' : ''}
      </button>
    );
  }
  