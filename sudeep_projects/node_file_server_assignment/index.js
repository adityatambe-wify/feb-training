const express = require("express")
const bodyParser = require('body-parser');

const app = express()
const PORT = 3000


// Body-parser to get request response from body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import route modules
const userRoutes = require('./appRoutes');

// custom routes
app.use('/', userRoutes);

app.get("/", (req, res)=>{
    res.send(`Get request successful`)
});

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});
