const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 5000;
const app = express();
const data = require("./data");
const token = "ahuBHejkJJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA07i73Gebhu98";

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// console.log('LogIn: this.props =  ', this.props) shows us what is available through props.

// Before we send off our data, the first thing we do is go through the authenticator middleware. 
// What authenticator does is check something inside of something called headers.
// Inside of headers there is an authorization item in the object.
// We are checking to see is the authorization item matches our token.
// If it does then next() is ran, if not we get the 403 error.


function authenticator(req, res, next) {
  const { authorization } = req.headers; // I do not get request headers...Nothing .log....
  if (authorization === token) {
    console.log("🚀 ~ file: server.js ~ line 27 ~ authenticator ~ authorization", authorization)
    console.log('server.js: ', headers, req, res) // so far no output is happening...
    next();
  } else {
    res.status(403).json({ error: "User must be logged in to do that." });
  }
}

// Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body; // req body UNIT 4 stuff
  if (username === "lambda" && password === "school") {
    req.loggedIn = true;
    res.status(200).json({ // 200 is good.
      username: "lambdaSchool",
      role: "editor",
      token: token
    });
  } else {
    res
      .status(403)
      .json({ error: "Username or Password incorrect. Please see Readme" });
  }
});

// log out
app.post("/api/logout", (req, res) => {
  // remove token from database
  // how does this work?
  res.status(200).json({
    payload: token
  });
});

// getData in the GasPrices.js file will use this.
app.get("/api/data", authenticator, (req, res) => { // what is authenticator and req? Middleware? per Longmire
  setTimeout(() => {
    res.send(data);
  }, 1000);
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
