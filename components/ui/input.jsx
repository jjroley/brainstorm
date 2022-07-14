import { useState, useRef } from 'react'

export default function Input (props) {

  function verifySend (evt) {
    if (evt.keyCode === 13) {
      props.onEnter(evt.target.value);
    }
  }

  return (
    <input
        {...props}
        onKeyUp={verifySend}
    />
  );
}