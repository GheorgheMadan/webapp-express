// Importo Multer per gestire il caricamento dei file
const multer = require('multer');

// configuro Multer per salvare i file nella cartella public/img/movies
const storage = multer.diskStorage({

    destination: './public/movies/imgs/',  // definisco la destinazione dei file caricati
    filename: (req, file, cb) => { // definisco il nome del file caricato

        // creo un nome univoco per il file ovvero la data corrente + il nome originale del file cosi da evitare sovrascritture e nomi duplicati
        const uniqueName = `${Date.now()}-${file.originalname}`;

        // cb sta per callback e viene utilizzato per ritornare il nome del file e permettere a Multer di continuare con il caricamento del file
        cb(null, uniqueName);
    },
});

// Creo un'istanza di Multer passando la configurazione dello storage ovvero la destinazione e il nome del file in modo da poterlo utilizzare in altri file del server
const upload = multer({ storage });

// ora esporto il modulo in modo da poterlo utilizzare in altri file del server
module.exports = upload;


