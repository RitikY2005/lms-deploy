import {Router} from 'express';
import {isLoggedIn,authorizeSubscribers,authorizeRoles} from '../middlewares/auth.middleware.js';
import {getRazorpayKey,buySubscription,verifySubscription,removeSubscription,allPayments} from '../controllers/payment.controller.js';

const router= Router();

router
     .get('/razorpay-key',isLoggedIn,getRazorpayKey);

router
     .post('/subscribe',isLoggedIn,buySubscription);

router
	 .post('/verify',isLoggedIn,verifySubscription);

router
	 .post('/unsubscribe',isLoggedIn,authorizeSubscribers,removeSubscription);

router
 	 .get('/',isLoggedIn,authorizeRoles("ADMIN"),allPayments);
export default router;