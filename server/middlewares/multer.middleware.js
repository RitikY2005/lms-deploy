import multer from 'multer';
import path from 'path';

const upload=multer({
	dest:"uploads/",
	storage:multer.diskStorage({
		destination:"uploads/",
		filename:function (req,file,cb){
			cb(null,file.originalname);
		}
	}),
	limits:{fileSize:50*1024 *1024} ,// 50MB of file ,
	fileFilter:function (req,file,cb){

        let ext=path.extname(file.originalname);
       

        if(ext!=='.jpg' && ext!=='.jpeg' && ext!==".webp" && ext!==".png" && ext!==".mp4" ){
        	cb(new Error("File type  not supported!"),false);
        }

        cb(null,true);
	}

});

export default upload;