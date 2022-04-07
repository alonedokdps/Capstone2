const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
// ======================================= //

const roleRoute = require("./routes/role");
const departmentRoute = require("./routes/department");
const eventTypeRoute = require("./routes/eventType");
const addressRoute = require("./routes/address");
const userRoute = require("./routes/user");
const accountRoute = require("./routes/account");
const eventRoute = require("./routes/event");

// ======================================= //

dotenv.config();
//CONNECT DATABASE
mongoose.connect((process.env.MONGODB_URL), () => {
    console.log("Connected to MongoDB");
});

app.use(bodyParser.json({limit:"50mb"}));
app.use(helmet());
app.use(cors());
app.use(morgan("common"));


// ======================================= //

//ROUTES
app.use("/api/role", roleRoute);
app.use("/api/department", departmentRoute);
app.use("/api/eventType", eventTypeRoute);
app.use("/api/address", addressRoute);
app.use("/api/user", userRoute);
app.use("/api/account", accountRoute);
app.use("/api/event", eventRoute);


// ======================================= //

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running...");
});
