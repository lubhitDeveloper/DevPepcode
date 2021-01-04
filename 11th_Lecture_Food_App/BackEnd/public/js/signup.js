let username= document.querySelector("#signup-name");
let email= document.querySelector("#signup-email");
let pw= document.querySelector("#signup-password");
let cpw= document.querySelector("#signup-cfpassword");
let signupBtn= document.querySelector("#signup-btn");
let showSignupPass= document.querySelector(".show-text");

signupBtn.addEventListener("click", async function(e){
    try{
        e.preventDefault();

        if(username.value && email.value && pw.value && cpw.value){
            let signupObject= {
                "name": username.value, 
                "email": email.value,
                "password": pw.value,
                "confirmPassword": cpw.value
            }
            let obj= await axios.post("http://localhost:3000/api/user/signup", signupObject);
            console.log(obj);
            username.value="";
            email.value="";
            pw.value="";
            cpw.value="";
        }
        else{
            username.value="";
            email.value="";
            pw.value="";
            cpw.value="";
        }
    }
    catch(error){
        console.log(error);
    }
})

showSignupPass.addEventListener("click", function(){
    
        
    if (pw.type == "password"){
        pw.type = "text";
        showSignupPass.textContent= "HIDE";
        showSignupPass.style.color= "#3a7cff";
    }
    else{
        pw.type = "password";
        showSignupPass.textContent= "SHOW";
        showSignupPass.style.color= "#222";
    }

})