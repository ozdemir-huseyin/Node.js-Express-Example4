import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { users } from "./data.js";

const app = express();
app.use(cors());
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("welcome to home page");
});
app.post("/users",(req,res)=>{
  console.log(req.body);
users.push(req.body)

res.send("process completed")
})
app.get("/users", (req, res) => {
  const country = req.query.country;

  if (country) {
    const user = users.filter(
      (user) => user.country.toLowerCase() == country.toLowerCase()
    );
    console.log(user);
    if (user.length === 0) {
      return res.send("There is no user from Switzerland ");
    }
    return res.send(user);
  }
  return res.send(users);
});

app.get("/users/lowest-salary", (req, res) => {
  const lowestSalary = users.reduce((previes, current) => {
    return previes.salary < current.salary ? previes : current;
  });
  return res.send(lowestSalary)
});
app.get("/users/highest-salary", (req, res) => {
  const highestSalary = users.reduce((previes, current) => {
    return previes.salary > current.salary ? previes : current;
  });
  return res.send(highestSalary)
});


app.listen(3020, () => {
  console.log("everything is working ");
});

