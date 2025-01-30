"use client";

import React, { useState } from "react";
import { auth } from "./lib/firebase"; // Make sure the path to firebase.js is correct
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    console.log("Attempting sign-in...");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully:", userCredential.user);
      alert("Signed in successfully!");
    } catch (err) {
      console.error("Error during sign-in:", err);
    }
  };    

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleSignIn}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
