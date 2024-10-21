import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState={
    courseData:[]
};

export const getAllCourses= createAsyncThunk("/courses/getAllCourses",async (data,{rejectWithValue})=>{
   try{
      const res= axiosInstance.get('/courses');
      await toast.promise(res,{
        loading:"wait ! loading courses..",
        success:"courses fetched successfully",
        error:(error)=> error?.response?.data?.message
      });

      return (await res).data;
   } catch(e){
        return rejectWithValue(e?.response?.data);
   }
});

export const createNewCourse= createAsyncThunk("/courses/createNewCourse",async (data,{rejectWithValue})=>{
    try{
          const res= axiosInstance.post("/courses",data);
          await toast.promise(res,{
            loading:"wait! creating course...",
            success:"course created successfully",
            error:(error)=> error?.response?.data?.message
          });
          return (await res).data;
    }catch(e){
            return rejectWithValue(e?.response?.data);
    }
});

export const deleteCourseById=createAsyncThunk("/course/deleteCourse",async(data,{rejectWithValue})=>{
    try{
      
       const res= axiosInstance.delete(`/courses/${data}`);
       
       await toast.promise(res,{
         loading:"wait! deleting course...",
            success:"course deleted successfully",
            error:(error)=> error?.response?.data?.message
       });

       return (await res).data;



    } catch(e){
       return rejectWithValue(e?.response?.data);
    
    }
});

export const updateCourse=createAsyncThunk("/course/updataCourse",async(data,{rejectWithValue})=>{
    try{
         const res= axiosInstance.put(`/courses/${data[0]}`,data[1]);
         await toast.promise(res,{
           loading:"wait!updating....",
           success:"updated successfully!",
           error:(error)=>error?.response?.data?.message
         });

         return (await res).data;
    } catch(e){
            return rejectWithValue(e?.response?.data);
    }
});


const courseSlice= createSlice({
    name:"course",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder
        .addCase(getAllCourses.fulfilled,(state,action)=>{
           state.courseData=action?.payload?.courses;

        })
    }
});


export default courseSlice.reducer;