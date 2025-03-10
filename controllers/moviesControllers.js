// importo i dati dei posts 
const connection = require('../data/filmsDB')

// Funzione index 
function index(req, res) {

    // preparo la query 
    const sql = "SELECT * FROM movies"

    // eseguo la query 
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })
        // console.log(results);
        res.json(results)
    })
}

// Funzione show 
function show(req, res) {

    const { id } = req.params

    // preparo la query che richiama un film in base all'id  
    const moviesSql = "SELECT * FROM movies WHERE id = ?"

    // preparo la query che richiama i review del film selezionato 
    const reviewSql = `SELECT * FROM reviews WHERE movie_id = ? `

    connection.query(moviesSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Data query failed' })
        if (movieResults.length === 0) res.status(404).json({ error: 'Book Not Found' })
        // res.json(movieResults[0])

        const movie = movieResults[0]

        connection.query(reviewSql, [id], (err, reviewResults) => {
            if (err) return res.status(500).json({ err: 'Data Query failed' })

            movie.review = reviewResults[0]

            res.json(movie)
        })
    })

}

module.exports = { index, show }