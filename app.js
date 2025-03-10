
const express = require('express'); // Importiamo il modulo Express
const app = express(); // Creiamo un'applicazione Express
const port = 3000; // Definiamo la porta su cui il server ascolterà le richieste
const router = require('./routers/moviesRouters') // importo la rotta dei film 

// Middleware per permettere di leggere i dati JSON nel corpo delle richieste
app.use(express.json())

// definisco la cartella dei file statici (immagini)
app.use(express.static('public'));

// definisco la rotta home
app.get('/api', (req, res) => {
    res.send('Questa è la home della mia pagina')
});

// definisco la parte iniziale delle rotte 
app.use('/api', router)

// Avviamo il server e lo mettiamo in ascolto sulla porta specificata
app.listen(port, () => {
    console.log(`il server è in ascolto sulla porta ${port}`);
})