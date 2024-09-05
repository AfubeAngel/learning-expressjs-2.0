//To see how the final website should work, run "node index.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming!!
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3003;
let userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));


//custom middleware to log the request body made in the simple html form
function checkPassword(req, res, next) {
    const password = req.body["password"];
    if (password === "ILoveProgramming!!") {
    userIsAuthorised = true;
    }
    console.log(req.body);
    next();
}

app.use(checkPassword);
//response { password: 'ILoveProgramming!!' }


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
//when a user visit localhost:3003, the index.html form in the public/index/html displays for the user to input the correct password


app.post("/check", (req, res) => {
    if (userIsAuthorised) {
      res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.redirect("/");
      //Alternatively res.sendFile(__dirname + "/public/index.html");
    }
  });
  //clicking the submit button calls the /check; which returns "the public/secret.html if the passowrd is { password: 'ILoveProgramming!!' }, else it redirects the suer back to the home page"


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
//console log - Listening on port 3003
