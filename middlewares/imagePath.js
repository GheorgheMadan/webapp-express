// Questa funzione middleware imposta il percorso dell'immagine nella richiesta
function setImagePath(req, res, next) {

    // Costruisce il percorso dell'immagine utilizzando il protocollo della richiesta e l'host
    req.imagePath = `${req.protocol}://${req.get('host')}/movies/imgs/`

    // Passa il controllo al prossimo middleware 
    next()
}

// Esporta la funzione setImagePath per poterla utilizzare in altre parti dell'applicazione
module.exports = { setImagePath }