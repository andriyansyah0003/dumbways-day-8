const express = require("express");

const app = express();
const port = 3000;

const isLogin = true;
let projects = [
  {
    projectName: "Personal Website",
    startDate: "2022-06-01",
    endDate: "2022-07-01",
    lengthDate: "1 Months",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    nodeJs: "public/img/nodejs-icon.svg",
    reactJs: "public/img/react.svg",
    nextJs: "public/img/nextjs-icon.svg",
    typeScript: "public/img/typescript-icon.svg",
    projectImage: "img/cover.png",
  },
];

app.set("view engine", "hbs");

app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  const newProject = projects.map((project) => {
    project.isLogin = isLogin;
    return project;
  });
  res.render("index", { isLogin: isLogin, projects });
});

app.get("/home", function (req, res) {
  const newProject = projects.map((project) => {
    project.isLogin = isLogin;
    return project;
  });

  res.render("index", { isLogin: isLogin, projects });
});

app.get("/add-project", function (req, res) {
  res.render("add-project");
});

app.post("/add-project", function (req, res) {
  const data = req.body;

  console.log(data);

  data.lengthDate = getDateDifference(data["startDate"], data["endDate"]);
  data["startDate"] = converTime(data["startDate"]);
  data["endDate"] = converTime(data["endDate"]);

  projects.push(data);
  res.redirect("/");
});

app.get("/project-detail/:index", function (req, res) {
  const index = req.params.index;
  const project = projects[index];

  res.render("project-detail", { isLogin: isLogin, project });
});

app.get("/contact", function (req, res) {
  res.render("contact", { isLogin: isLogin });
});

app.get("/edit-project/:index", function (req, res) {
  const index = req.params.index;
  const edit = projects[index];

  res.render("edit-project", { isLogin: isLogin, edit, id: index });
});

app.post("/edit-project/:index", function (req, res) {
  const data = req.body;
  const index = req.params.index;

  data.lengthDate = getDateDifference(data["startDate"], data["endDate"]);
  data["start-date"] = converTime(data["startDate"]);
  data["end-date"] = converTime(data["endDate"]);

  console.log(data);

  projects[index] = data;

  res.redirect("/");
});

app.get("/delete-project/:index", (req, res) => {
  const index = req.params.index;
  projects.splice(index, 1);

  res.redirect("/");
});

app.listen(port, function () {
  console.log(`Server running on port: ${port}`);
});

function getDateDifference(startDate, endDate) {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  const startDateUTC = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const endDateUTC = Date.UTC(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  day = 1000 * 60 * 60 * 24; // miliseconds in a day
  difference = (endDateUTC - startDateUTC) / day; // difference in days
  return difference < 30
    ? difference + " Days"
    : parseInt(difference / 30) + " Months"; // return difference in months
}

function converTime(time) {
  return new Date(time).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
