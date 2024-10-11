const express = require('express');
const userController = require('../controller/userController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const USER_BASE_URL="/api/users";

const USER_ROUTES={
    LOGIN:'/login',
    REGISTER:'/register',
    UPLOAD_ASSIGNMENT:'/upload',
    GET_ADMINS:'/admins'
}

router.post( USER_BASE_URL + USER_ROUTES.REGISTER, userController.register);
router.post( USER_BASE_URL + USER_ROUTES.LOGIN, userController.login);
router.post( USER_BASE_URL + USER_ROUTES.UPLOAD_ASSIGNMENT, authMiddleware, userController.uploadAssignment);
router.get( USER_BASE_URL + USER_ROUTES.GET_ADMINS, authMiddleware, userController.getAdmins);

module.exports = router;