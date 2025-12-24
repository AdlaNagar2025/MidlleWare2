//Haneen && Adla
// 50-2
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Logger middleware: logs request method, URL, date and time
app.use((req, res, next) => {
  const now = new Date();
  const time = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
  const date =
    now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();

  console.log(req.method, req.url, date, time);
  next(); // pass control to the next middleware
});

// Home route: accessible to all users
app.get("/", (req, res) => {
  res.send("ברוכים הבאים לדף הבית!");
});

// Authorization middleware: allows access only if user=admin
app.use("/admin", (req, res, next) => {
  const { user } = req.query;
  if (user !== "admin") {
    return res.status(403).send("Access Denied");
  }
  next(); // user is authorized
});

// Admin route: accessible only to authorized users
app.get("/admin", (req, res) => {
  res.send("ברוכים הבאים לעמוד הניהול!");
});

// Public route: accessible to everyone
app.get("/public", (req, res) => {
  res.send("זהו דף ציבורי.");
});

// Starts the server and listens for requests
app.listen(port, () => {
  console.log("The app is running");
});
