import express from 'express';
import LoginController from '../controllers/loginController.js';

const router = express.Router();

router.post('/', (req, res, next) => LoginController.postLogin(req, res, next));
router.get('/:email', (req, res, next) => LoginController.getLoginUserByEmail(req, res, next));

//forgot password routes
router.post('/forgot-password', (req, res, next) => LoginController.postForgotPassword(req, res, next));
router.post('/reset-password/:token', (req, res, next) => LoginController.postResetPassword(req, res, next));

export default router;
