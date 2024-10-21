import {Router} from 'express';
import {contactUs,getUserStats} from '../controllers/miscellenous.controller.js';
import {isLoggedIn,authorizeRoles} from '../middlewares/auth.middleware.js';

const router= Router();


router
     .post('/contact-us',contactUs);

router
	 .post('/admin/stats/user',isLoggedIn,authorizeRoles("ADMIN"),getUserStats);

export default router;