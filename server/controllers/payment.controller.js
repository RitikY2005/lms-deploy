import AppError from '../utils/AppError.js';
import User from '../models/user.model.js';
import razorpay from '../server.js';
import Payment from '../models/payment.model.js';
import crypto from 'crypto';
import asyncHandler from '../middlewares/asyncHandler.middleware.js';


export const getRazorpayKey = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'razorpay-key',
        RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID
    });
});

export const buySubscription = asyncHandler(async (req, res, next) => {
    const { id } = req.user;

    if (!id) {
        return next(new AppError('Unauthorized,please login !', 403));
    }

    const user = await User.findById(id);

    if (!user) {
        return next(new AppError('user not found', 404));
    }

    if (user.role === "ADMIN") {
        return next(new AppError('Admin cannot buy a subscription', 400));
    }

    if(user.subscription.status==="active"){
    	return next(new AppError('You already have subscribed', 400));
    }

    const subscription = await razorpay.subscriptions.create({
        plan_id: process.env.RAZORPAY_PLAN_ID,
        customer_notify: 1,
        total_count: 12
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
        success: true,
        message: "subscription created!",
        subscription_id: subscription.id
    });

});


export const verifySubscription= asyncHandler(async (req,res,next)=>{
	const {id}=req.user;
    const {razorpay_payment_id,razorpay_subscription_id,razorpay_signature}=req.body;

    if(!razorpay_payment_id || !razorpay_signature || !razorpay_signature){
    	return next(new AppError('All fields are required !',400));
    }

    const user=await User.findById(id);

    const subscriptionId=user.subscription.id;

    const generatedSignature=await crypto
    									.createHmac('sha256',process.env.RAZORPAY_SECRET)
    									.update(`${razorpay_payment_id}|${subscriptionId}`)
    									.digest('hex');


    if(generatedSignature!==razorpay_signature){
        return next(new AppError('Could not verify the payment , try again !',400));
    }

    const newPayment=await Payment.create({
         razorpay_payment_id,
         razorpay_subscription_id,
         razorpay_signature
    });
    
    user.subscription.status="active";

    await user.save();
    await newPayment.save();

    res.status(200).json({
    	success:true,
    	message:'payment verified!',
    });

});


export const removeSubscription= asyncHandler(async (req,res,next)=>{
       let messageRes="";
       const {id} = req.user;

       const user= await User.findById(id);

       if(!user){
       	 return next(new AppError('User not found',404));
       }

       if(user.role==="ADMIN"){
       	  return next(new AppError('Admin need not to cancel subscrition !',400));
       }

       const subscriptionId= user.subscription.id;

       
       try{
       
       	const subscription = await razorpay.subscriptions.cancel(subscriptionId);

       	user.subscription.status=subscription.status;

       	await user.save();

       } catch(e){
            return next(new AppError(e.error.description,e.statusCode));
       }

      
       const payment= await Payment.findOne({
       	 razorpay_subscription_id:subscriptionId
       });
      
       const timeSinceFirstPayment= Date.now()-payment.createdAt;

       const refundPeriod= 14 * 24 * 60 * 60 *1000 ; // 14 days refund period ;
       

       if(refundPeriod<=timeSinceFirstPayment){
       	  messageRes="No refund will be provided .";
       } else{
               try{
          // if within 14days, them refund the full amount
        
        const p=await razorpay.payments.refund(payment.razorpay_payment_id,{speed:"optimum"});
        


       } catch(e){
         return next(new AppError(e.error.description,e.statusCode));
       }
       }
      



       
       user.subscription.id= undefined;
       user.subscription.status=undefined;

       await user.save();
       await Payment.findByIdAndDelete(payment._id);
       console.log('message',messageRes);
       res.status(200).json({
       	 success:true,
       	 message:` ${messageRes} Subscription cancelled successfully !`,
       });
  

      


});

export const allPayments=asyncHandler(async (req,res,next)=>{
	const {count,skip} = req.query;


    const allPayments= await razorpay.subscriptions.all({
      plan_id:process.env.RAZORPAY_PLAN_ID,
    	count:count ? count :10,
    	skip:skip ? skip : 0
    });


    const monthNames=[
     "january",
     "february",
     "march",
     "april",
     "may",
     "june",
     "july",
     "august",
     "september",
     "october",
     "november",
     "december"
    ];

    const finalMonths={
    	january:0,
    	february:0,
    	march:0,
    	april:0,
    	may:0,
    	june:0,
    	july:0,
    	august:0,
    	september:0,
    	october:0,
    	november:0,
    	december:0
    }

    const monthlyWisePayments=allPayments.items.map((payment)=>{
    	const monthInNumbers= new Date(payment.start_at*1000);

    	return monthNames[monthInNumbers.getMonth()];
    });

    
    monthlyWisePayments.forEach((month)=>{
    	Object.keys(finalMonths).map((objMonth)=>{
    		 if(month==objMonth){
    		 	finalMonths[objMonth]+=1;
    		 }   		 
    	})
    });

    const monthlySalesRecord = [];

    Object.keys(finalMonths).forEach((monthName)=>{
    	monthlySalesRecord.push(finalMonths[monthName]);
    });



    res.status(200).json({
    	success:true,
    	message:'all payments information !',
    	finalMonths,
    	allPayments,
    	monthlySalesRecord
    });

});


