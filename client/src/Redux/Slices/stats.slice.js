import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosInstance.js';
import toast from 'react-hot-toast';


const initialState={
	allUsersCount:0,
	subscribedUsers:0
}


export const getUserStats=createAsyncThunk("/stats",async (data,{rejectWithValue})=>{
	 try{
         const res= axiosInstance.post("/admin/stats/user");
         await toast.promise(res,{
         	 loading:"wait! fetching user stats..",
         	 success:"user stats fetched successfully!",
         	 error:(error)=>error?.response?.data?.message

         })

         return (await res).data;
	 } catch(e){
	 	 return rejectWithValue(e?.response?.data);
	 }
});


const statSlice=createSlice({
	name:"stat",
	initialState,
	reducers:{},
	extraReducers:(builder)=>{
       builder
         .addCase(getUserStats.fulfilled,(state,action)=>{
         	 state.allUsersCount= action?.payload?.totalUsers;
         	 state.subscribedUsers=action?.payload?.subscribedUsers;
         })
	}
})

export default statSlice.reducer;

