require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");

const Models = require("./models")

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());


app.post("/api/signup", async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, phoneNumber} = req.body;
  
    if (!firstName || !lastName || !email || !password || !confirmPassword || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      // Attempt to find an existing user in the database with the provided email.
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ message: "Email is already in use." });
      }
  
      // Proceed to hash the provided password using bcrypt with 10 salt rounds.
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: "Error hashing password" });
        }
        //TODO make this talk to the CRUD api instead
        const user = new User({
          firstName, 
          lastName,   
          phoneNumber,  
          email,
          password: hashedPassword,
        });

        // Save the new user instance to the database.
        user.save();
            res.status(201).json({message: "User created successfully", user: { ...user._doc, password: undefined }});
      });
    } catch (err) {
      return res.status(500).json({ message: err.message || "Error while signup" });
    }
  });

app.post("/api/login", async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        try {
            const user = await User.findOne({ email: email });
            if (!user) {
            return res.status(401).json({ message: "User does not exist" });
            }
            // Use bcrypt to compare the provided password with the hashed password stored in the database.
            bcrypt.compare(password, user.password, (err, isMatch) => {
            // If an error occurs during the comparison, return a 500 Internal Server Error status.
            if (err) {
                return res.status(500).json({ message: "Error comparing password" });
            }
            // If the passwords do not match, return a 401 Unauthorized status to indicate invalid credentials.
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // If the passwords match, generate a JWT token using the user's email as the payload.
            // Set the token to expire in 1 hour.
            const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            // Return a 200 OK status with a success message, the generated token, and the user object.
            // This indicates a successful login.
            res.status(200).json({ message: "Login successful", token, user: user });
            });
        } catch (err) {
            // If an error occurs while finding the user, return a 500 Internal Server Error status.
            // This helps to handle unexpected errors that may occur during the database query operation.
            return res.status(500).json({ message: "Error finding user" });
        }
    });

  app.get("/", (req, res) => {
    res.send("Root Path");
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));