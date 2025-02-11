import React, { useState, useCallback, useEffect, useRef } from "react";
import Pass from "./Pass";
const App = () => {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [password, setPassword] = useState("");
  const [character, setCharacter] = useState(false);
  const inputRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*()_+~`|}{[]:;?";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      password += str.charAt(char);
    }
    setPassword(password);
  }, [length, number, character]);

  const copyPassword = useCallback(() => {
    inputRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  return (
    <>
   
    <Pass/>
    </>
  );
};

export default App;
