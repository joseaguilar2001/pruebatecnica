const mysql = require('mysql2')

const mysqlconn = mysql.createConnection(
{
    host: 'localhost',
    user: 'root',
    password: '123DiosesmiPadre',
    database: 'dbreu',
    port: 3306
}
);

mysqlconn.connect(function(error)
{
    if(error){
        console.log(error);
        return;
    }else{
        console.log('Conected!')
    }
});

module.exports = mysqlconn;