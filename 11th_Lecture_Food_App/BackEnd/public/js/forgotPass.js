let forgotEmail= document.querySelector("#login-email");
let forgotPass= document.querySelector("#forgot-btn");

forgotPass.addEventListener("click", async function(e){
    try{
        e.preventDefault();
        if(forgotEmail.value){
            let obj= await axios.post("http://localhost:3000/api/user/forgotpassword", {email: forgotEmail.value});
            console.log(obj);
            forgotEmail.value="";
        }
        else{
            forgotEmail.value="";
        }
    }
    catch(error){
        console.log(error);
    }
})