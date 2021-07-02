const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
let instance = null;
/*const connection = mysql.createConnection({
host:process.env.HOST,
user:process.env.USER,
password:process.env.PASSWORD,
database:process.env.DATABASE,
port:process.env.DBPORT
});*/

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Mecatronica9212',
    database:'web_app',
    port:'3306'
});

connection.connect((err) => {
if(err){
    console.log(err.message);
}else{
    console.log('DB Connected!');
}
});

class DbService{
    static getDbServiceInstance(){
        return instance ? instance:new DbService;
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve,reject) => {
                const query = 'SELECT * FROM Names;';
                connection.query(query,(error,results) => {
                    if(error) reject(new Error(error.message));
                    resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async createName(nombre){
        try {
            const date = new Date();
            const insertId = await new Promise((resolve,reject) => {
                const query = 'INSERT INTO Names (nombre,date) VALUES (?,?);';
                connection.query(query,[nombre,date], (error, result) => {
                    if(error) reject(new Error(error.message));
                    resolve(result.insertId);
                });
            });
            return {
                id: insertId,
                nombre:nombre,
                date:date
            };
        } catch (error) {
            console.log(error);
        }   
    }

    async deleteRow(id){
        id = parseInt(id,10);
        try {
            const response = await new Promise((resolve,reject) => {
                const query = 'DELETE FROM Names WHERE id = ?;';
                connection.query(query,[id], (error, result) => {
                    if(error) reject(new Error(error.message));
                    resolve(result);
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    async updateNameById(id,nombre){
        id = parseInt(id,10);
        const date = new Date();
        try {
            const response = await new Promise((resolve,reject) => {
                const query = 'UPDATE Names SET nombre=?,date=? WHERE id=? ;';
                connection.query(query,[nombre,date,id], (error, result) => {
                    if(error) reject(new Error(error.message));
                    resolve(result);
                });
            });
            return {
                id:id,
                nombre:nombre,
                date:date
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports=DbService;
