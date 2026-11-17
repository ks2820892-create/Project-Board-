const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', cardController.createCard);
router.put('/:id', cardController.updateCard);
router.patch('/:id/status', cardController.moveCardStatus);
router.delete('/:id', cardController.deleteCard);

module.exports = router;
