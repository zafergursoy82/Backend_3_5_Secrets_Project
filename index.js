
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var password = "";
var passIsOk = false;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

function passwordController(req, res, next) {
  password = req.body["password"];
  if (password === "ILoveProgramming") {
    passIsOk = true;
  } else {
    passIsOk = false;
  }
  next();
}

app.use(passwordController);

app.post("/check", (req, res) => {
  if (passIsOk) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
