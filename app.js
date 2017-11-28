const express = require("express");
const cors = require("cors");
const students = require("./data/students")
const app = express()
app.use(cors());

function getStudentInfoById(studentinfo, id) {
  for (var i = 0; i < studentinfo.length; i++) {
    if (studentinfo[i].id == id) {
      return studentinfo[i];
    }
  }
  return null;
};

app.get("/", (req, res) => res.json({
  data: students
}));

app.get("/:id", function(request, response) {
  var item = getStudentInfoById(students, request.params.id);
  if (!item) {
    response.status(404);
    response.json({
      error: {
        message: "No record found!"
      }
    });
  }
  response.json({
    data: item
  });
});

app.listen(process.env.PORT || 3000)
