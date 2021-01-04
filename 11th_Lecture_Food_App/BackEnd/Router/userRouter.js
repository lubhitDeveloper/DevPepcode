const express= require("express");
const multer= require("multer");

const storage= multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/users");
    },
    filename: function(req, file, cb){
        cb(null, `user${Date.now()}.jpg`);
    }
})

function fileFilter(req, file, cb){
    if(file.mimetype.includes("image")){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const upload= multer({storage: storage, fileFilter: fileFilter});

const { signup, login, protectRoute, forgotPassword, resetPassword } = require("../Controller/authController");
const { getAllUsers, createUser, getUserById, updateUserbyId, deleteUserById, updateProfilePhoto } = require("../Controller/userController");

const userRouter= express.Router();


//userRouter.route("").get(getAllUsers).post(createUser);

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.patch("/resetpassword/:token", resetPassword);

userRouter.use(protectRoute);

userRouter.patch("/updateprofilephoto", upload.single("user"), updateProfilePhoto );

userRouter
    .route("")
    .get(getUserById)
    .patch(updateUserbyId)
    .delete(deleteUserById);

module.exports= userRouter;