// Importo il modulo mysql2 per connettermi al database MySQL
const mySql = require('mysql2')

// Creo la connessione al database con le mie credenziali
const connection = mySql.createConnection({
    host: 'localhost',               // Questo è l'indirizzo del database (locale in questo caso)
    user: 'root',                    // Il mio nome utente per accedere a MySQL
    password: 'mySQL@Madan.com123',  // La mia password per l'accesso
    database: 'movies_db'            // Il nome del database a cui voglio connettermi
})

// Mi collego al database 
connection.connect((err) => {
    if (err) throw err; // Se c'è un errore, lo mostro e blocco l'esecuzione
    console.log(('Connected to MySQL')); // Stampo un messaggio di conferma

})

module.exports = connection;