class AppError extends Error {
     
	constructor(msg="something went wrong !!",statusCode=500){
		super(msg);
		this.statusCode=statusCode;
		Error.captureStackTrace(this,this.constructor);
	}
}

export default AppError;