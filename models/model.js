const { Sequelize } = require("sequelize");
const database = new Sequelize("hr", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres",
});



const EmployeeModel = database.define(
  "employee",
  {
    employeeId: {
      field: "employee_id",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    firstName: {
      field: "first_name",
      type: Sequelize.STRING,
    },
    lastName: {
      field: "last_name",
      type: Sequelize.STRING,
    },
    jobId: {
      field: "job_id",
      type: Sequelize.INTEGER,
    },
    email: {
      field: "email",
      type: Sequelize.STRING,
    },
    departmentId: {
      field: "department_id",
      type: Sequelize.INTEGER,
      references: {
        model: "departments",
        key: "department_id",
      },
    },
  },
  {
    timestamps: false,
    associate: function (models) {
      EmployeeModel.belongsTo(models.DepartmentModel, {
        foreignKey: "department_id",
      });
    },
  }
);

module.exports = (EmployeeModel);
