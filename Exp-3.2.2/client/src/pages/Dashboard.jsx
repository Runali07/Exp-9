import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:5000/private", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMessage(res.data.message);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }

    fetchData();
  }, [navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>{message}</p>
    </div>
  );
}