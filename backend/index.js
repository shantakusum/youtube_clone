
const express = require("express");
const cors = require("cors");
const path = require("path")

const router= require('./routes/index.route');
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', router );



app.listen(process.env.PORT || 5000, () => {
    console.log(" server is listening on port 5000");
})