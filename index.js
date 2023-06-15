/*
 *
 *
 ------->Title: server file
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: 06/15/2023
 *
 *
 */

// Dependencies
const express = require("express");
const dotenv = require("dotenv");

// internal dependencies
const userRouter = require("./routes/userRoute");

// Model Scaffolding
const app = express();

// Configuration
dotenv.config();
const PORT = process.env.PORT || 5005;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '30mb' }))

// routes
app.use("/api/v1/users", userRouter)

// error middleware

// run server
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});

