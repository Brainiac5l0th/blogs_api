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
const morgan = require("morgan");
const cors = require("cors");

// internal dependencies
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const corsOptions = require("./config/corsOptions");
const blogRouter = require("./routes/blogRoute");
const tagsRouter = require("./routes/tagsRoute");

// Model Scaffolding
const app = express();

// Configuration
dotenv.config();
const PORT = process.env.PORT || 5005;

// middleware
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/tags", tagsRouter);

// error middleware

// run server
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});

