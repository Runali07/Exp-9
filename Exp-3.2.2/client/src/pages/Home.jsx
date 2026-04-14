import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Page</h1>
      <p>This is a public page.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}