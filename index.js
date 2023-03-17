const http = require("http");
const fs = require("fs");
const PORT = 3000;
const users = [];

const routeGET = {
  "/": "./views/index.html",
  "/about": "./views/about.html",
  "/contacts": "./views/contacts.html",
};

const requestListener = (req, res) => {
  console.log("req", req.method, req.url);
  // console.log("res", res);
  const { method, url } = req;
  if (method === "GET") {
    fs.readFile(routeGET[url], { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
      }
      res.end(data);
    });
    return;
  }
  if (method === "POST") {
    if (url === "/create-user") {
      let jsonString = "";
      req.on("data", (chunk) => {
        jsonString += chunk;
      });
      req.on("end", () => {
        const user = JSON.parse(jsonString); //object
        delete user.password;
        users.push(user);
        res.end(JSON.stringify(user));
      });
      return;
    }
  }
  fs.readFile("./views/404.html", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.end(data);
  });
};
const server = http.createServer(requestListener);
server.listen(PORT);
