import React, { useState, useCallback, useEffect, useRef } from "react";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-5">
      <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-[8px_8px_0px_rgba(255,105,180,0.8)] border-4 border-black relative">
        <h1 className="text-3xl font-bold text-black text-center mb-4">
          🔐 Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex items-center gap-2 p-3 bg-gray-100 border-2 border-black rounded-xl shadow-[4px_4px_0px_rgba(255,105,180,0.8)]">
          <input
            type="text"
            value={password}
            className="w-full p-2 text-lg bg-transparent focus:outline-none"
            readOnly
            ref={inputRef}
          />
          <button
            onClick={copyPassword}
            className="bg-pink-500 text-white px-4 py-2 font-bold rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] hover:shadow-none active:scale-95"
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-100 border-2 border-black rounded-xl shadow-[4px_4px_0px_rgba(255,105,180,0.8)]">
            <label className="font-bold">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-100 border-2 border-black rounded-xl shadow-[4px_4px_0px_rgba(255,105,180,0.8)]">
            <label className="font-bold">Include Numbers</label>
            <input
              type="checkbox"
              checked={number}
              onChange={() => setNumber(!number)}
              className="w-5 h-5 accent-pink-500"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-100 border-2 border-black rounded-xl shadow-[4px_4px_0px_rgba(255,105,180,0.8)]">
            <label className="font-bold">Include Symbols</label>
            <input
              type="checkbox"
              checked={character}
              onChange={() => setCharacter(!character)}
              className="w-5 h-5 accent-pink-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
