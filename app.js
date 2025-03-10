// Importiamo il modulo Express
const express = require('express');

// Creiamo un'applicazione Express
const app = express();

// Definiamo la porta su cui il server ascolterà le richieste
const port = 3000;

// Middleware per permettere di leggere i dati JSON nel corpo delle richieste
app.use(express.json())



// Avviamo il server e lo mettiamo in ascolto sulla porta specificata
app.listen(port, () => {
    console.log(`il server è in ascolto sulla porta ${port}`);

})