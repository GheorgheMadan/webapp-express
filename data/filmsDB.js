const mySql = require('mysql2')

const connection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mySQL@Madan.com123',
    database: 'movies_db'
})

connection.connect((err) => {
    if (err) throw err;
    console.log(('Connect to MySQL'));

})

module.exports = connection;