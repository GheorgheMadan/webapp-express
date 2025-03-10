
const express = require('express'); // Importiamo il modulo Express
const app = express(); // Creiamo un'applicazione Express
const port = 3000; // Definiamo la porta su cui il server ascolterà le richieste
const router = require('./routers/moviesRouters') // importo la rotta dei film 

// importazione dei middleware 
const imagePathMiddleware = require('./middlewares/imagePath') // importo il middleware per il percorso delle immagini 
const errorsHandler = require('./middlewares/errorsHandler') // Importo il middleware per la gestione degli errori del server (errore 500) 
const errorNotFound = require('./middlewares/errorNotFound') // Importo il middleware per la gestione degli errori 404 

// Middleware per permettere di leggere i dati JSON nel corpo delle richieste
app.use(express.json())

// definisco la cartella dei file statici (immagini)
app.use(express.static('public'));

// Middleware per impostare il percorso dell'immagine nella richiesta 
app.use(imagePathMiddleware.setImagePath)

// definisco la rotta home
app.get('/api', (req, res) => {
    res.send('Questa è la home della mia pagina')
});

// definisco la parte iniziale delle rotte 
app.use('/api', router)

// Middleware per la gestione degli errori del server (errore 500)
app.use(errorsHandler.errorsHandler)

// Middleware per la gestione degli errori 404
app.use(errorNotFound.notFound)

// Avviamo il server e lo mettiamo in ascolto sulla porta specificata
app.listen(port, () => {
    console.log(`il server è in ascolto sulla porta ${port}`);
})