const http = require("http");
const fs = require("fs");
const PORT = 3000;

const requestListener = (req, res) => {
  console.log("req", req.method, req.url);
  // console.log("res", res);
  const { method, url } = req;
  if (method === "GET") {
    if (url === "/") {
      fs.readFile("./views/index.html", { encoding: "utf-8" }, (err, data) => {
        if (err) {
          console.log(err);
        }
        res.end(data);
      });
      return;
    }
    if (url === "/about") {
      fs.readFile("./views/about.html", { encoding: "utf-8" }, (err, data) => {
        if (err) {
          console.log(err);
        }
        res.end(data);
      });
      return;
    }
    if (url === "/contacts") {
      fs.readFile("./views/contacts.html", { encoding: "utf-8" }, (err, data) => {
        if (err) {
          console.log(err);
        }
        res.end(data);
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
