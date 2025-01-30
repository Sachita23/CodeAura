import { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "../lib/firebase";

export default function SignIn() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    const handleSignIn = async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log("User signed in:", userCredential.user);
          alert("Signed in successfully!");
        } catch (err) {
          console.error("Sign-in error:", err); // Logs detailed error for debugging
          setError(err.message || "An error occurred during sign-in.");
        }
      };
      

    const handleSignOut = async () => {
        await signOut(auth);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            {user ? (
                <>
                    <h2>Welcome, {user.displayName}</h2>
                    <img src={user.photoURL} alt="Profile" width="100" />
                    <p>Email: {user.email}</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <>
                    <h2>Sign in with Google</h2>
                    <button onClick={handleSignIn}>Sign In</button>
                </>
            )}
        </div>
    );
}
