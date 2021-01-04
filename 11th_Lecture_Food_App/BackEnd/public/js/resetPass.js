let pw= document.querySelector("#signup-password");
let showSignupPass= document.querySelector(".show-text");
let cpw= document.querySelector("#signup-cfpassword");
let resetBtn= document.querySelector("#forgot-btn");


resetBtn.addEventListener("click", async function(e){
    try{
        e.preventDefault();
        
        let screenUrl= document.URL.split("/");
        let token= screenUrl[screenUrl.length-1];
        console.log(token);

        if(pw.value&&cpw.value && pw.value==cpw.value){
            let obj= await axios.patch(`http://localhost:3000/api/user/resetpassword/${token}`, {password: pw.value, confirmPassword: cpw.value});
            console.log(obj);
            pw.value="";
            cpw.value="";
            if(obj.data.user){
                window.location.href="/";
            }
            else{
                console.log("error");
                pw.value="";
                cpw.value="";
            }
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