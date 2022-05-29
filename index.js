const express = require("express");

const app = express();
const PORT = 3000;

const projects = [];

app.set("view engine", "hbs"); // set the view engine to handlebars

app.use("/public", express.static(__dirname + "/public")); // set the public folder as static
app.use(express.urlencoded({ extended: false })); // set the body parser

app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/add-project", (req, res) => {
  res.render("add-project");

  const newProject = projects.map((project) => {
    projects.lengthDate = getDateDifference(
      new Date(projects.start_date),
      new Date(projects.end_date)
    );
    console.log(projects.lengthDate);
  });
});
app.post("/add-project", (req, res) => {
  const data = req.body;

  console.log(data);
  projects.push(data);

  res.redirect("/");
});

app.get("/detail-project", (req, res) => {
  res.render("project-detail", { projects });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// function getFullTime(time) {
//   const date = time.getDate();
//   const monthIndex = time.getMonth();
//   const year = time.getFullYear();
//   let hour = time.getHours();
//   let minute = time.getMinutes();

//   if (hour < 10) {
//     hour = "0" + hour;
//   }

//   if (minute < 10) {
//     minute = "0" + minute;
//   }

//   const fullTime = `${date} ${month[monthIndex]} ${year} ${hour}:${minute} WIB`;

//   return fullTime;
// }

function getDateDifference(startDate, endDate) {
  // get date difference
  if (startDate > endDate) {
    // check if start date is greater than end date
    console.error("Start date must be before end date"); // throw error
    return null; // return null
  }
  const startYear = startDate.getFullYear(); // get start year
  const startMonth = startDate.getMonth(); // get start month
  const startDay = startDate.getDate(); // get start day

  const endYear = endDate.getFullYear(); // get end year
  const endMonth = endDate.getMonth(); // get end month
  const endDay = endDate.getDate(); // get end day

  const february =
    (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28; // check if end year is leap year
  const daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // get days of month

  const startDateNotPassedInEndYear =
    endMonth < startMonth || (endMonth == startMonth && endDay < startDay); // check if start date is not passed in end year
  const years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0); // get years
  const months =
    (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12; // get months

  const days =
    startDay <= endDay
      ? endDay - startDay
      : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay; // get days

  return {
    years: years,
    months: months,
    days: days,
  };
}
