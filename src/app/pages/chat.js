import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";

export default function Chatbot() {
  const [user, setUser] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/signin"); // Redirect to sign-in page if not signed in
      }
    });
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.response); // Display response from Groq chatbot
    } catch (err) {
      console.error("Error fetching Groq response:", err);
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
