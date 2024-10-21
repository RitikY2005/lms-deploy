
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosInstance.js';
import toast from 'react-hot-toast';


const initialState={
	key:"",
	subscription_id:"",
	isPaymentVerified:false,
	allPayments:{},
	finalMonths:{},
	monthlySalesRecord:[],

}

export const getRazorpayKey= createAsyncThunk("/razorpay/key",async(data,{rejectWithValue})=>{
    try{
     
     const response= axiosInstance.get("/payments/razorpay-key");
     return (await response).data;
    } catch(e){
         return rejectWithValue(e?.response?.data);
    }
});

export const buySubscription=createAsyncThunk("razorpay/subscribe",async(data,{rejectWithValue})=>{
    try{
        
        const response= axiosInstance.post("/payments/subscribe");
        
        await toast.promise(response,{
        	loading:"creating your subscripiton...",
          success:"you can now proceed with payment..",
        	error:(error)=>error?.response?.data?.message
        });

        return (await response).data;

    } catch(e){
        return rejectWithValue(e?.response?.data);
    }
});


export const verifyPayment = createAsyncThunk("razorpay/vefify",async (data,{rejectWithValue})=>{
      try{
          console.log("verify",data)
          const res= axiosInstance.post("/payments/verify",data);
          await toast.promise(res,{
          	loading:"verifying your payment...",
          	success:"payment verified successfully",
          	error:(error)=>error?.response?.data?.message
          });

          return (await res).data;
      } catch(e){
           return rejectWithValue(e?.response?.data);
      }
});


export const cancelSubscription = createAsyncThunk("razorpay/cancelSubscription",async(data,{rejectWithValue})=>{
	 try{
          const response= axiosInstance.post("/payments/unsubscribe");
          await toast.promise(response,{
          	loading:'terminating subscription...',
          	success:(res)=>res?.data?.message,
          	error:(error)=>error?.response?.data?.message
          });

          return (await response).data;
	 } catch(e){
	 	return rejectWithValue(e?.response?.data);
	 }
});

export const getAllPayment=createAsyncThunk("/razorpay/getAllPayment",async(data,{rejectWithValue})=>{
   try{
      const res= axiosInstance.get('/payments/');
      await toast.promise(res,{
        loading:"fetching payment info..",
        success:"payemnts fetched successfully",
        error:(error)=>error?.response?.data?.message
      });
      return (await res).data;
   } catch(e){
      return rejectWithValue(e?.response?.data);
   }
});


const razorpaySlice=createSlice({
	name:"razorpay",
	initialState,
	reducers:{},
	extraReducers:(builder)=>{
		builder
		.addCase(getRazorpayKey.fulfilled,(state,action)=>{
			state.key= action?.payload?.RAZORPAY_KEY_ID;
		})
		.addCase(buySubscription.fulfilled,(state,action)=>{
			state.subscription_id=action?.payload?.subscription_id;
		})
		.addCase(verifyPayment.fulfilled,(state,action)=>{
			state.isPaymentVerified= true;
		})
    .addCase(getAllPayment.fulfilled,(state,action)=>{
       state.allPayments=action?.payload?.allPayments;
       state.monthlySalesRecord=action?.payload?.monthlySalesRecord;
       state.finalMonths=action?.payload?.finalMonths;
    })

	}
});

export default razorpaySlice.reducer;