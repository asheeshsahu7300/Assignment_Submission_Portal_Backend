const express = require('express');
const adminController = require('../controller/adminController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

const ADMIN_BASE_URL="/api/admins";

const ADMIN_ROUTES={
    LOGIN:'/login',
    REGISTER:'/register',
    GET_ASSIGNMENTS:'/assignments',
    ACCEPT_ASSIGNMENTS:'/assignments/:id/accept',
    REJECT_ASSIGNMENTS:'/assignments/:id/reject',
}

router.post( ADMIN_BASE_URL + ADMIN_ROUTES.REGISTER, adminController.register);
router.post( ADMIN_BASE_URL + ADMIN_ROUTES.LOGIN, adminController.login);
router.get( ADMIN_BASE_URL + ADMIN_ROUTES.GET_ASSIGNMENTS, authMiddleware, adminController.getAssignments);
router.post( ADMIN_BASE_URL + ADMIN_ROUTES.ACCEPT_ASSIGNMENTS, authMiddleware, adminController.acceptAssignment);
router.post( ADMIN_BASE_URL + ADMIN_ROUTES.REJECT_ASSIGNMENTS, authMiddleware, adminController.rejectAssignment);

module.exports = router;