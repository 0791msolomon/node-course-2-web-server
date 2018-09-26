const express = require("express");
const hbs = require("hbs");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

//console logs and adds documentation to server log file for each http request made on site
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: http:${req.method} path:${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      throw err;
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

//gives access to public files directory to all files
app.use(express.static(__dirname + "/public"));

//creates function calls to be used in handlebars (hbs);
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

//http requests along with key value pairs that will be passed to handlebars to dynamically fill out pages
app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Welcome to the home page",
    homeMessage: "welcome to my website"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page!",
    aboutText: "Welcome to the about page!"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "unable to fulfill request"
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
