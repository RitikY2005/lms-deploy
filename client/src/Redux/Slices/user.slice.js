import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosInstance.js';
import toast from 'react-hot-toast';

const initialState={
	isLoggedIn:localStorage.getItem('isLoggedIn') || false,
	role:localStorage.getItem('role') || "",
	data:JSON.parse(localStorage.getItem('data')) || {}
}

export const createAccount= createAsyncThunk('/user/signin',async (data,{rejectWithValue})=>{
    try{
      const res= axiosInstance.post("/user/register",data);
	 await toast.promise(res,{
		loading:"wait ! authentication in progress..",
		success:"Account created successfully",
		error:(error)=>error?.response?.data?.message
	  })
	  return (await res).data;
	}catch(e){
          return rejectWithValue(e?.response?.data);
	}
});

export const login= createAsyncThunk("/user/login",async (data,{rejectWithValue})=>{
    try{
        const res=axiosInstance.post('/user/login',data);
		await toast.promise(res,{
			loading:"wait ! verifying details..",
			success:"user logged in successfully",
			error:(error)=>(error?.response?.data?.message)
		  });

		 return (await res).data; 
	} catch(e){
		return rejectWithValue(e?.response?.data);
	}
});

export const logout= createAsyncThunk("/user/logout",async (data,{rejectWithValue})=>{
      try{
		 
           const res=axiosInstance.get("/user/logout");
		   
		   await toast.promise(res,{
			loading:"initiating logout!",
			success:"user logged out successfully",
			error:(error)=>error?.response?.data?.message
		  });
		 return (await res).data ;
	  }catch(e){
		return rejectWithValue(e?.response?.data);
	  }
});

export const forgotPassword = createAsyncThunk('/user/forgot-password',async (data,{rejectWithValue})=>{
	try{
        const res= axiosInstance.post("/user/reset",data);
		await toast.promise(res,{
			loading:"sending you email...",
			success:"email sent successfully",
			error:(error)=>error?.response?.data?.message
		});

		return (await res).data;
	}catch(e){
		return rejectWithValue(e?.response?.data);
	}
});

export const resetPassword= createAsyncThunk("/user/reset-password",async (data,{rejectWithValue})=>{
	try{
		const resetToken = data?.resetToken;
        const res= axiosInstance.post(`/user/reset/${resetToken}`,data);
		await toast.promise(res,{
			loading:"resetting password...",
			success:"password reset successfully",
			error:(error)=>error?.response?.data?.message
		});

		return (await res).data;
	} catch(e){
		 return rejectWithValue(e?.response?.data);
	}
});

export const editUserProfile= createAsyncThunk("/user/editProfile",async (data,{rejectWithValue})=>{
     try{
        const res= axiosInstance.put(`/user/update/${data[0]}`,data[1]);
		await toast.promise(res,{
			loading:"wait!editing profile...",
			success:"Profile updated successfully!",
			error:(error)=>error?.response?.data?.message
		});
		return (await res).data;
	 } catch(e){
            return rejectWithValue(e?.response?.data);
	 }
});

export const changeUserPassword=createAsyncThunk("user/changePassword",async(data,{rejectWithValue})=>{
	 try{
       const res= axiosInstance.post("/user/change-password",data);
       await toast.promise(res,{
       	loading:"wait!authentication in progress..",
       	success:"password changed successfully",
       	error:(error)=> error?.response?.data?.message
       });

       return (await res).data;
	 } catch(e){
        return rejectWithValue(e?.response?.data);
	 }
});


export const getUserData= createAsyncThunk("user/me",async(data,{rejectWithValue})=>{
	try{
       const response= axiosInstance.get('/user/me');
       await toast.promise(response,{
       	loading:"wait! fetching data..",
       	success:"data loaded successfully!",
       	error:(error)=>error?.response?.data?.message
       });
       return (await response).data;
	}catch(e){
       return rejectWithValue(e?.response?.data);
	}
});








const userSlice= createSlice({
	 name:'user',
	 initialState,
	 reducers:{},
	 extraReducers:(builder)=>{
		builder
		.addCase(createAccount.fulfilled,(state,action)=>{
		   localStorage.setItem('data',JSON.stringify(action?.payload?.user));
           localStorage.setItem('isLoggedIn',true);
		   localStorage.setItem('role',action?.payload?.user?.role);
		   state.isLoggedIn=true;
		   state.role=action?.payload?.user?.role;
		   state.data=action?.payload?.user;
		})
		.addCase(login.fulfilled,(state,action)=>{
			localStorage.setItem('data',JSON.stringify(action?.payload?.user));
			localStorage.setItem('isLoggedIn',true);
			localStorage.setItem('role',action?.payload?.user?.role);
			state.isLoggedIn=true;
			state.role=action?.payload?.user?.role;
			state.data=action?.payload?.user;
		})
		.addCase(logout.fulfilled,(state,action)=>{
			localStorage.clear();
			state.isLoggedIn=false;
			state.role="";
			state.data={};
		})
		.addCase(getUserData.fulfilled,(state,action)=>{
		   localStorage.setItem('data',JSON.stringify(action?.payload?.user));
		   state.data=action?.payload?.user;
		})

	 }
});

export default userSlice.reducer;