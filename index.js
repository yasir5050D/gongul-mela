const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const path = require('path');
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.static(path.join(__dirname, 'assets')));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));  
app.set("view engine", "ejs");  

app.use("/", userRoutes);
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
