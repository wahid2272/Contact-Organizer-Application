"use strict";

const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");

// Connect Database here
connectDB();

// Middleware Initiate
app.use(express.json({ extended: false }));

// Routes will be defined here
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("contact-organizer-app/build"));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "contact-organizer-app", "build", "index.html")
    )
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
