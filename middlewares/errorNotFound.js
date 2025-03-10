// Funzione che gestisce l'errore 404, not found, ovvero quando il client richiede una risorsa che non esiste
function notFound(req, res, next) {

    // setto lo status della risposta a 404
    res.status(404);

    // invio un oggetto JSON con un messaggio di errore
    res.json({
        error: "Not Found",
        message: "Pagina non trovata"
    });
};

module.exports = { notFound };