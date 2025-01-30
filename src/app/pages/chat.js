import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase"; // Firebase authentication setup

export default function Chatbot() {
  const [user, setUser] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const router = useRouter();

  // Handle user authentication (check if signed in)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // User is signed in, set the user state
      } else {
        router.push("/signin"); // Redirect to sign-in if not authenticated
      }
    });
  }, [router]);

  // Handle form submission to interact with the chatbot
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the prompt to the backend API (which is chat.py on the server)
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.ok) {
        // Display the chatbot's response
        setResponse(data.response);
      } else {
        // Handle error if response is not okay
        setResponse("Error: Could not get a response from the chatbot.");
      }
    } catch (err) {
      console.error("Error fetching Groq response:", err);
      setResponse("Error: An unexpected error occurred.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <img src={user.photoURL} alt="Profile" width="100" />
          <p>Email: {user.email}</p>
          <form onSubmit={handleSubmit}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a coding question..."
              rows="4"
              cols="50"
            />
            <br />
            <button type="submit">Ask</button>
          </form>
          <div>
            <h3>Response from Chatbot:</h3>
            <p>{response}</p>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
