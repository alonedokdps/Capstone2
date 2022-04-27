const express = require("express");
const cors = require("cors");
const app = express();
const upload = require("./middlewares/Upload.js");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
// ======================================= //

const departmentRoute = require("./routes/department");
const courseRoute = require("./routes/course");
const eventTypeRoute = require("./routes/eventType");
const addressRoute = require("./routes/address");
const accountRoute = require("./routes/account");
const eventRoute = require("./routes/event");
const eventDetailRoute = require("./routes/eventDetail");
const participantRoute = require("./routes/participant");

// ======================================= //

dotenv.config();
//CONNECT DATABASE
mongoose.connect("mongodb://localhost:27017/Capstone2", () => {
  console.log("Connected to MongoDB");
});
app.post("/upload", upload.single("avatar"), (req, res) => {
  res.json({success: true, data: req.file.path});
});
// app.get("/home", (req, res) => {
//   res.json("ok");
// });
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use(morgan("common"));
app.use("/uploads", express.static("uploads"));

// ======================================= //

//ROUTES
app.use("/api/department", departmentRoute);
app.use("/api/course", courseRoute);
app.use("/api/eventType", eventTypeRoute);
app.use("/api/address", addressRoute);
app.use("/api/account", accountRoute);
app.use("/api/event", eventRoute);
app.use("/api/eventDetail", eventDetailRoute);
app.use("/api/participant", participantRoute);

// ======================================= //

app.listen(8000, () => {
  console.log(`server on runing `);
});
