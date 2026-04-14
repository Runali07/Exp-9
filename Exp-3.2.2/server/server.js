const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const verifyToken = require("./middleware/authMiddleware");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const demoUser = {
  email: "test@example.com",
  password: "123456"
};

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === demoUser.email && password === demoUser.password) {
    const token = jwt.sign(
      { email: demoUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful",
      token
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

app.get("/private", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to the protected route",
    user: req.user
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});