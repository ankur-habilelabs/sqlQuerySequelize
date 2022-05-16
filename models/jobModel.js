const { Sequelize } = require("sequelize");
const database = new Sequelize("hr", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres",
});

const JobModel = database.define(
  "job",
  {
    JobId: {
      field: "job_id",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    jobTitle: {
      field: "job_title",
      type: Sequelize.STRING,
    },
    minSalary: {
      field: "min_salary",
      type: Sequelize.INTEGER,
    },
    maxSalary: {
      field: "max_salary",
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
    // associate: function (models) {
    //   DepartmentModel.hasMany(models.EmployeeModel, {
    //     foreignKey: "employee_id",
    //   });
    //   DepartmentModel.belongsTo(models.LocationModel, {
    //     foreignKey: "location_id",
    //   });
    // },
  }
);
module.exports = (JobModel);