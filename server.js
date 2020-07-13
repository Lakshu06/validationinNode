const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('./config/connection')

const platform = require('./routes/platform');
const user = require('./routes/user');
const errorHandler = require('./middleware/errorhandler');
// const { Platform, validate } = require('./models/platform');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(errorHandler);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, OPTIONS, PUT');
    next();
});
app.use('/platform', platform);
app.use('/user', user);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});