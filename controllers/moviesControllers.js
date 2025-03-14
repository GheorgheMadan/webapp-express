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
    const movieSql = "SELECT * FROM movies WHERE id = ?"

    // Eseguo la query per ottenere il film selezionando il film in base all'id
    const reviewSql = `SELECT * FROM reviews WHERE movie_id = ? `

    // Eseguo la query per ottenere il film
    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Data query failed' }) // Gestione errore query
        // console.log(movieResults);
        if (movieResults.length === 0) return res.status(404).json({ error: 'Movie Not Found' }) // Gestione film non trovato


        // modifico movie aggiungendo il percorso completo dell'immagine
        const movie = {
            ...movieResults[0],
            img: req.imagePath + movieResults[0].image
        }

        // Eseguo la query per ottenere le recensioni del film
        connection.query(reviewSql, [id], (err, reviewResult) => {
            // se la query non va a buon fine invio un errore 
            if (err) return res.status(500).json({ err: 'Data Query failed' })

            // aggiorniamo l'oggetto movie con le review ritornate
            movie.reviews = reviewResult // Aggiungo le recensioni all'oggetto del film

            res.json(movie) // Invio il film con le recensioni come risposta

        })
    })
}

// Funzione CREATE per creare una nuova recensione per un film
function createReview(req, res) {

    // Estraggo l'id del film a cui aggiungeremo la recensione
    const { id } = req.params

    // Destrutturo gli elementi che verranno inseriti nella recensione tramite il form di frontend
    const { name, vote, text } = req.body

    // Preaparo la query per inserire una nuova recensione nel database 
    const sqlReview = "INSERT INTO reviews (text, vote, name, movie_id) VALUES (?, ?, ?, ?)"

    // Eseguo la query per inserire la recensione inviando i dati estratti dal form di frontend
    connection.query(sqlReview, [text, vote, name, id], (err, results) => {
        // Se la query non va a buon fine inio un messagio di errore 
        if (err) return res.status(500).json({ error: 'Database query failed' })
        res.status(201);
        // Invio un messaggio di conferma che la recensione è stata creata con successo
        res.json({ message: 'Review added', id: results.insertId }) // Invio un messaggio di conferma che la recensione è stata creata con successo
        // insertId è l'id della recensione appena creata per poterla visualizzare. 01


    })

}

// FUNZIONE STORE per creare un nuovo FILM 
function createFilm(req, res, next) {

    // Estraggo il nome del file caricato  tramite Multer
    const imageName = `${req.file.filename}`

    // Destrutturo gli elementi che verranno inseriti nel film tramite il form di frontend
    const { title, director, genre, release_year, abstract } = req.body

    // Preparo la query per inserire un nuovo film nel database
    const sql = "INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)"

    // Eseguo la query per inserire il film inviando i dati estratti dal form al database 
    connection.query(sql, [title, director, genre, release_year, abstract, imageName], (err, results) => {
        // Se la query non va a buon fine invio un messaggio di errore 
        if (err) return res.status(500).json({ error: 'Database query failed' })

        // Invio un messaggio di conferma che il film è stato creato con successo
        res.status(201).json({ message: 'Film added', status: 'success' })
    })

}


// Esporto le funzioni per poterle usare in altri file
module.exports = { index, show, createReview, createFilm }