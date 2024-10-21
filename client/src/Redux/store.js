import {configureStore} from '@reduxjs/toolkit';
import userSliceReducer from './Slices/user.slice.js';
import courseSliceReducer from './Slices/course.slice.js';
import razorpaySliceReducer from './Slices/razorpay.slice.js';
import lectureSliceReducer from './Slices/lecture.slice.js';
import statSliceReducer from './Slices/stats.slice.js';

const store = configureStore({
	reducer:{
     user:userSliceReducer,
	 course:courseSliceReducer,
	 razorpay:razorpaySliceReducer,
	 lecture:lectureSliceReducer,
	 stat:statSliceReducer
	},
	devTools:true
});

export default store;
