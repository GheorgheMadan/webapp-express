// Importo Express per gestire le rotte
const express = require('express');
const router = express.Router();

// Importo il controller che gestirà la logica delle richieste
const controllers = require('../controllers/moviesControllers');
const upload = require('../middlewares/multer');

// Definisco la rotta per ottenere la lista di tutti i film
router.get('/', controllers.index);


// Definisco la rotta per ottenere i dettagli di un singolo film tramite ID
router.get('/:id', controllers.show)

// Definisco la rotta per creare una nuova recensione per un film
router.post('/:id/reviews', controllers.createReview)

// Definisco la rotta per aggiungere un nuovo film al database
// upload.single('image') è un middleware di Multer che gestisce il caricamento di un singolo file
// il parametro 'image' è il nome del campo del form che contiene il file da caricare
router.post('/', upload.single('image'), controllers.createFilm)

// Esporto le rotte in modo da poterle usare in altri file
module.exports = router