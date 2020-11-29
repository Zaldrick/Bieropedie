const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/bieres');

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createBiere);
router.get('/:id', auth, stuffCtrl.getOneBiere);
router.put('/:id', auth, multer, stuffCtrl.modifyBiere);
router.delete('/:id', auth, stuffCtrl.deleteBiere);

module.exports = router;