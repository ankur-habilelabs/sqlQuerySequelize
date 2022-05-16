const {Sequelize}=require('sequelize');
const database=new Sequelize('hr','postgres','12345678' ,{
    host: 'localhost',
    dialect:'postgres'
});
module.exports = database