
var mysql_pool = require('mysql');
var pool  = mysql_pool.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'test',
    port     : 3306,
    database : 'inventory',
    connectionLimit : '10',
    multipleStatements: true
});

exports.pool = pool;