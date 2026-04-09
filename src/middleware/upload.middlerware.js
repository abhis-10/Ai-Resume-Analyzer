const multer = require("multer");
const path = require("path");
const uploadPath = path.join(__dirname, "../uploads");

if(!file.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, uploadPath)
    },

    filename : function(req,file,cb){
        const nameFile = Date.now() + path.extname(file.originalname);
        cb(null, nameFile);
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === "application/pdf"){
        cb(null,true);
    }else{
        cb(new Error("Only pdf format is allowed."),false);
    }
};

const upload = multer({ storage, fileFilter});
module.exports = upload;