// Importo la connessione al database dei film
const connection = require('../data/filmsDB')

// Funzione INDEX per ottenere tutti i film
function index(req, res) {

    // Preparo la query per selezionare tutti i film dal database 
    const sql = "SELECT * FROM movies"

    // Eseguo la query 
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' }) // Gestione errore query

        // Mappo i risultati per aggiungere il percorso completo dell'immagine
        const movies = results.map(movie => {
            return {
                ...movie,
                img: req.imagePath + movie.image // Aggiungo il percorso dell'immagine
            }
        })
        res.json(movies) // Invio la lista dei film come risposta
    })
}

// Funzione SHOW per ottenere i dettagli di un singolo film
function show(req, res) {
    // Estraggo l'ID del film dai parametri della richiesta
    const { id } = req.params

    // preparo la query che richiama un film in base all'id  
    const moviesSql = "SELECT * FROM movies WHERE id = ?"

    // Eseguo la query per ottenere il film
    const reviewSql = `SELECT * FROM reviews WHERE movie_id = ? `

    // Eseguo la query per ottenere il film
    connection.query(moviesSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Data query failed' }) // Gestione errore query
        if (movieResults.length === 0) res.status(404).json({ error: 'Movie Not Found' }) // Gestione film non trovato

        // modifico movie aggiungendo il percorso completo dell'immagine
        const movie = {
            ...movieResults[0],
            img: req.imagePath + movieResults[0].image
        }

        // Eseguo la query per ottenere le recensioni del film
        connection.query(reviewSql, [id], (err, reviewResults) => {
            if (err) return res.status(500).json({ err: 'Data Query failed' })  // Gestione errore query

            movie.review = reviewResults[0] // Aggiungo le recensioni all'oggetto del film

            res.json(movie) // Invio il film con le recensioni come risposta

        })
    })

}

// Esporto le funzioni per poterle usare in altri file
module.exports = { index, show }