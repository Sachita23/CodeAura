import Link from "next/link";

export default function Home() {
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Welcome to Firebase Auth with Next.js</h1>
            <Link href="/signin">
                <button>Go to Sign-In</button>
            </Link>
        </div>
    );
}
