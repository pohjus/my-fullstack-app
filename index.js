const express = require("express");
const app = express();
const port = 3000;

let counter = 3;

let db = [
  { id: 1, name: "jack" }, // 0
  { id: 2, name: "tina" }, // 1
];

// app.use((req, res, next) => {
//   console.log(new Date().toString());
//   next();
// });

// req.body = JSON.parse('{ "name": "hannah" }')

app.use(express.json());

// http get
// http://localhost:3000/customers
app.get("/customers", (req, res) => {
  res.send(db);
});

// http get
// http://localhost:3000/customers/5
app.get("/customers/:urlId([0-9]+)", (req, res) => {
  const id = Number(req.params.urlId); //
  let temp = db.find((customer) => customer.id === id);

  if (temp) {
    res.send(temp);
  } else {
    res.status(404).end();
  }
});

app.post("/customers", (req, res) => {
  let customer = req.body;
  customer.id = counter++;
  db.push(customer);
  res.send(customer);
});

// http get
// http://localhost:3000/customers/1
app.delete("/customers/:urlId([0-9]+)", (req, res) => {
  const id = Number(req.params.urlId); //
  db = db.filter((customer) => customer.id != id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
