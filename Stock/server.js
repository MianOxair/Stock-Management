require("dotenv").config();
//require('cors').config();
const express = require("express");
const cors = require("cors");
const app = express();
const stockManagementRouter = require("./controller/stockManagementController");
const userManagementRouter = require("./controller/userController");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to DB"));

app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())

app.use(
  cors({
    origin: "*", //["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use("/stockManagement", stockManagementRouter);
app.use("/user", userManagementRouter);
app.listen(3030, () => console.log("Server started at 3030 port."));

////// ## Apply CORS Policy ## //////
//app.use(cors());
//app.options('*',cors());
// var corsOptions = {
//     origin: 'http://127.0.0.1:5500/',
//     optionsSuccessStatus: 200, // For legacy browser support
//     methods: "GET, PUT, POST, PATCH, DELETE"
// }

// app.use(cors(corsOptions));
// app.use(cors({
//     //origin: ['http://127.0.0.1:5500','http://127.0.0.1:5500/', 'https://127.0.0.1:5500'],
//     origin: '*',
//     methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
//     allowedHeaders: ["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"],
// }));
// const allowlist = ['http://127.0.0.1:5500/', 'http://127.0.0.1:5500'];

//     const corsOptionsDelegate = (req, callback) => {
//     let corsOptions;

//     let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;
//     let isExtensionAllowed = req.path.endsWith('.jpg');

//     if (isDomainAllowed && isExtensionAllowed) {
//         // Enable CORS for this request
//         corsOptions = { origin: true }
//     } else {
//         // Disable CORS for this request
//         corsOptions = { origin: false }
//     }
//     callback(null, corsOptions)
// }

// app.use(cors(corsOptionsDelegate));
// var corsOptions = {
//     origin: 'http://127.0.0.1:5500/',
//     methods: "GET, PUT, POST, PATCH, DELETE",
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
//   app.options('/user/login', cors())
//   app.get('/user/login', cors(corsOptions), function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for only example.com.'})
//   })
// var allowlist = ['http://127.0.0.1:5500/', 'http://127.0.0.1:5500']
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }
// app.use(cors(corsOptionsDelegate));
