const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/login', userController.loginUser);
router.post('/login-user', userController.loginUserAccess);
router.get('/signup', userController.registerUser);
router.post('/signup-user', userController.registerUserAccess);


module.exports = router;