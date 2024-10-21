
import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosInstance.js';
import toast from 'react-hot-toast';

const initialState={
   lectures:[]
};


export const getLectures=createAsyncThunk("/courses/lecture/get",async (data,{rejectWithValue})=>{
   try{
         const res= axiosInstance.get(`/courses/${data}`);
         await toast.promise(res,{
         	loading:"wait! fetching lectures...",
         	success:"fetched lectures suuccessfully",
         	error:(error)=>error?.response?.data?.message
         });

         return (await res).data;
   } catch(e){
   	  return rejectWithValue(e?.response?.data);
   }
});

export const deleteLectureById=createAsyncThunk("/courses/lecture/delete",async(data,{rejectWithValue})=>{
    try{
       const res= axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
       await toast.promise(res,{
        loading:"wait! deleting lecture..",
        success:"lecture deleted!",
        error:(error)=>error?.response?.data?.message
       });

       return (await res).data;
    } catch(e){
       return rejectWithValue(e?.response?.data);
    }
});

export const addLectureById=createAsyncThunk("/courses/lecture/add",async (data,{rejectWithValue})=>{
   try{ 

    const res= axiosInstance.post(`/courses/${data[0]}`,data[1]);
    await toast.promise(res,{
        loading:"wait! adding lecture..",
        success:"lecture added successfully!",
        error:(error)=>error?.response?.data?.message
    });

    return (await res).data;

   } catch(e){
     return rejectWithValue(e?.response?.data);
   }
});


const lectureSlice= createSlice({
   name:"lecture",
   initialState,
   reducers:{},
   extraReducers:(builder)=>{
    builder
    .addCase(getLectures.fulfilled,(state,action)=>{
    	 state.lectures= action?.payload?.lectures;
    })
   }
});


export default lectureSlice.reducer;