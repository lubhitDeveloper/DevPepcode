let pw= document.querySelector("#signup-password");
let showSignupPass= document.querySelector(".show-text");
let cpw= document.querySelector("#signup-cfpassword");
let resetBtn= document.querySelector("#forgot-btn");


resetBtn.addEventListener("click", async function(e){
    try{
        e.preventDefault();
        if(pw.value && cpw.value){
            let obj= await axios.patch("http://localhost:3000/api/user/resetpassword/:token", {password: pw.value, confirmPassword: cpw.value});
            console.log(obj);
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