// Importo Express per gestire le rotte
const express = require('express');
const router = express.Router();

// Importo il controller che gestirà la logica delle richieste
const controller = require('../controllers/moviesContollers')

// Definisco la rotta per ottenere la lista di tutti i film
router.get('/movies', controller.index);


// Definisco la rotta per ottenere i dettagli di un singolo film tramite ID
router.get('/:id', controller.show)


// Esporto le rotte in modo da poterle usare in altri file
module.exports = router