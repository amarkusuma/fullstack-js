import { Sequelize } from "sequelize";
 
const db = new Sequelize('amarTest', 'root', '4mar_Kusuma53', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;