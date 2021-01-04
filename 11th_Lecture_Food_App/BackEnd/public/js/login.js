let email= document.querySelector("#login-email");
let loginPass= document.querySelector("#login-password");
let loginBtn= document.querySelector("#login-btn");
let showLoginPass= document.querySelector(".show-text");
let showTextDiv= document.querySelector(".show-hide");
let errorMessage= document.querySelector("#error-message");

loginBtn.addEventListener("click", async function(e){
    try{
        e.preventDefault();

        if(email.value && loginPass.value){
            let obj= await axios.post("http://localhost:3000/api/user/login", {email: email.value, password: loginPass.value});
            console.log(obj);
            
            email.value="";
            loginPass.value="";

            if(obj.data.data){
            window.location.href= "/";
            }
            else{
                errorMessage.innerHTML= obj.data.message;
                email.value="";
                loginPass.value="";
            }
        }
    }
    catch(error){
        console.log(error);
    }
})

showLoginPass.addEventListener("click", function(){
    
        
        if (loginPass.type == "password"){
            loginPass.type = "text";
            showLoginPass.textContent= "HIDE";
            showLoginPass.style.color= "#3a7cff";
        }
        else{
            loginPass.type = "password";
            showLoginPass.textContent= "SHOW";
            showLoginPass.style.color= "#222";
        }

})