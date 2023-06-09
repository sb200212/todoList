const express = require("express");
const bodyParser = require("body-parser");

let items = ["Eat food"];
let workItem = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("List", { listTitle: day, newListItem: items });
});

app.post("/", function (request, response) {
  let item = request.body.newItems;
  console.log(request.body.list);

  if (request.body.list == "Work List") {
    workItem.push(item);
    response.redirect("/work");
  } else {
    items.push(item);
    response.redirect("/");
  }
});

app.post("/delete", function (request, response) {
  let checkedItemId = request.body.checkbox;
  let listName = request.body.listName;

  if (listName === "Work List") {
    workItem.splice(checkedItemId, 1);
    response.redirect("/work");
  } else {
    items.splice(checkedItemId, 1);
    response.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("List", { listTitle: "Work List", newListItem: workItem });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/work", function (request, response) {
  let item = request.body.newItems;
  items.push(item);
  response.redirect("/work");
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
