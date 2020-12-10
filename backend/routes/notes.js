const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const noteCtrl = require('../controllers/notes');

router.get('/', auth, noteCtrl.getAllNotes);
router.post('/', auth, noteCtrl.createNote);
router.get('/:id', auth, noteCtrl.getOneNote);
router.get('/allNotes/:id', auth, noteCtrl.getAllNotesByBiere);
//router.put('/:id', auth, noteCtrl.modifynote);
//router.delete('/:id', auth, noteCtrl.deletenote);

module.exports = router;