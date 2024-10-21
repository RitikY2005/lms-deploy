import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import AppError from '../utils/AppError.js';
import sendEmail from '../utils/sendEmail.js';
import User from '../models/user.model.js';


export const contactUs = asyncHandler(async(req,res,next)=>{
	 const {name,email,message}= req.body;

	 if(!name || !email || !message){
	 	 return next(new AppError('All fields are required!',400));
	 }

	 const subject=`${name} with email ${email} wants to contact support`;


	 try{
          await sendEmail(process.env.CONTACT_US_EMAIL,subject,message);
	 }catch(e){
	 	return next(new AppError("could not send email , try again  !",500));
	 }

	 res.status(200).json({
	 	success:true,
	 	message:`Your response has been captured , we will reply shortly`,
	 });

});

export const getUserStats = asyncHandler(async(req,res,next)=>{

	 const totalUsers= await User.countDocuments();
	 const subscribedUsers= await User.countDocuments({"subscription.status":"active"});

	 res.status(200).json({
	 	success:true,
	 	message:"all users count ",
	 	totalUsers,
	 	subscribedUsers
	 });
}); 