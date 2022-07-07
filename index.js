const gluon = require("./gluon");
const app = gluon();

app.get("/", (req, res) => {
  res.writeHead(200).end("Hello World! using makeshift framework");
});

app.get("/gluon", (req, res) => {
  res.end("GET from gluon");
});

app.listen(8080);
