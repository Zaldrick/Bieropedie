const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

//router.get('/', auth,userCtrl.getAllUsersNames);
//router.get('/getName', auth, userCtrl.getName);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;