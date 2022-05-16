const { Sequelize } = require("sequelize");
const database = new Sequelize("hr", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres",
});

const LocationModel = database.define(
  "location",
  {
    locationId: {
      field: "location_id",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    streetAddress: {
      field: "street_address",
      type: Sequelize.STRING,
    },
    postalCode: {
      field: "postal_code",
      type: Sequelize.STRING,
    },
    City: {
      field: "city",
      type: Sequelize.INTEGER,
    },
    stateProvince: {
      field: "state_province",
      type: Sequelize.STRING,
    },
    country_id: {
      field: "country_id",
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
      LocationModel.hasMany(models.DepartmentModel, {
        foreignKey: "location_id",
      });
    },
  }
);

module.exports = LocationModel;
