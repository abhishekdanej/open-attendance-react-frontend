// import { useState } from "react";

export default function AtButton({ name, onButtonSubmit, pressedButton, className }) {

    return (
      <button type="button" onClick={() => onButtonSubmit(name)} className={className}>
        {name} {pressedButton === name ? '✔' : ''}
      </button>
    );
  }
  