var mysql = require('mysql');

var connection = mysql.createConnection({
    'secret': "Passphrase for encryption should be 45-50 char long",
    host : 'localhost',
    user : 'root',
    password : 'mysql',
    database : 'canvas',
    insecureAuth: true
});

connection.connect(function(err){
    if(err)
       throw err;
   // else
       // console.log('connected')     
 });

module.exports = connection;
