const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const noteCtrl = require('../controllers/note');

router.get('/', auth, noteCtrl.getAllNotes);
router.post('/', auth, multer, noteCtrl.createnote);
router.get('/:id', auth, noteCtrl.getOnenote);
router.put('/:id', auth, multer, noteCtrl.modifynote);
router.delete('/:id', auth, noteCtrl.deletenote);

module.exports = router;