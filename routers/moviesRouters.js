// Importo Express per gestire le rotte
const express = require('express');
const router = express.Router();

// Importo il controller che gestirà la logica delle richieste
const controllers = require('../controllers/moviesControllers')

// Definisco la rotta per ottenere la lista di tutti i film
router.get('/movies', controllers.index);


// Definisco la rotta per ottenere i dettagli di un singolo film tramite ID
router.get('/movies/:id', controllers.show)

// Definisco la rotta per creare una nuova recensione per un film
router.post('/:id/reviews', controllers.createReview)

// Esporto le rotte in modo da poterle usare in altri file
module.exports = router