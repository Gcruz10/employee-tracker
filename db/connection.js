const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee'
});
connection.connect(function (err) {
    if (err) console.error(err)
})

module.exports = connection