
// Funzione che gestisce gli errori interni del server che restituisce un errore 500 al client
function errorsHandler(err, req, res, next) {

    // setto lo status della risposta a 500
    res.status(500)

    // invio un oggetto JSON con un messaggio di errore 
    res.json({
        error: 'Internal Server Error'
    })
}

module.exports = { errorsHandler }