const database = require("../code/database");
const express = require("express");
const EmployeeModel = require("../code/models/model");
const DepartmentModel = require("../code/models/departmentModel");
const JobModel = require("../code/models/jobModel");
const LocationModel = require("../code/models/location");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const app = express();
const Port = 3001;
app.use(express.json());
database
  .authenticate()
  .then(() => {
    console.log("connects");
  })
  .catch((err) => {
    console.log(err);
  });

// const empdata=StudentModel.create({name:"akshay"});
app.get("/employee", async (req, res) => {
  EmployeeModel.belongsTo(DepartmentModel, {
    foreignKey: "department_id",
  });

  DepartmentModel.hasMany(EmployeeModel, {
    foreignKey: "department_id",
  });

  const employeData = await DepartmentModel.findAll({
    attributes: ["departmentName"],
    include: {
      model: EmployeeModel,
      attributes: ["last_name"],

      where: {
        last_name: {
          [Op.like]: "%a%",
        },
      },
    },
  });
  res.json(employeData);
});
app.get("/assign", async (req, res) => {
  EmployeeModel.belongsTo(DepartmentModel, {
    foreignKey: "department_id",
  });

  DepartmentModel.hasMany(EmployeeModel, {
    foreignKey: "department_id",
  });
  DepartmentModel.belongsTo(LocationModel, {
    foreignKey: "location_id",
  });
  LocationModel.hasMany(DepartmentModel, {
    foreignKey: "location_id",
  });

  const employeData = await LocationModel.findAll({
    attributes: ["City"],
    where: {
      City: {
        [Op.like]: "Toronto",
      },
    },
    include: {
      model: DepartmentModel,
      attributes: ["departtmentId"],
      // model: LocationModel,
      include: {
        model: EmployeeModel,
        attributes: ["last_name"],
      },
    },
  });
  res.json(employeData);
});

app.get("/employeejob", async (req, res) => {
  EmployeeModel.belongsTo(JobModel, {
    foreignKey: "job_id",
  });
  JobModel.hasMany(EmployeeModel, {
    foreignKey: "job_id",
  });
  EmployeeModel.belongsTo(DepartmentModel, {
    foreignKey: "department_id",
  });
  DepartmentModel.hasMany(EmployeeModel, {
    foreignKey: "department_id",
  });
  const jobempdata = await DepartmentModel.findAll({
    attributes: ["departtmentId"],
    include: {
      model: EmployeeModel,
      attributes: ["last_name"],
      include: {
        model: JobModel,
        attributes: ["job_id"],
      },
    },
  });
  res.json(jobempdata);
});

app.get("/job", async (req, res) => {
  const JobModelData = await JobModel.findAll();
  res.json(JobModelData);
});
// app.get("/employeelastname", async (req, res) => {
//   const employeData = await EmployeeModel.findAll({
//     attributes: [
//       [Sequelize.fn("initcap", Sequelize.col("last_name")), "lastName"],
//     ],
//   });
//   res.json(employeData);
// });

// app.post("/employeedataentry", async (req, res) => {
//   const data = req.body;
//   const output = await EmployeeModel.create(data);
//   res.json(output);
// });

// app.delete("/employeedelete", (req, res) => {
//   const id = req.params;

//   res.json(id);
// });

// app.get("/department", async (req, res) => {
//   const departmentData = await DepartmentModel.findAll();
//   res.json(departmentData);
// });

// app.post("/student", async (req, res) => {
//   const { name } = req.body;
//   const student = await EmployeeModel.create({ name: name });
//   res.json(student);
// });
app.listen(Port);
