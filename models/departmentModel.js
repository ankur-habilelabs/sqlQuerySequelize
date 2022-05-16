const { Sequelize } = require("sequelize");
const database = new Sequelize("hr", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres",
});

const DepartmentModel = database.define(
    "department",
    {
      departtmentId: {
        field: "department_id",
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      departmentName: {
        field: "department_name",
        type: Sequelize.STRING,
      },
      locationId: {
        field: "location_id",
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
      associate: function (models) {
        DepartmentModel.hasMany(models.EmployeeModel, {
          foreignKey: "employee_id",
        });
        DepartmentModel.belongsTo(models.LocationModel, {
          foreignKey: "location_id",
        });
      },
    }
  );

module.exports = (DepartmentModel);