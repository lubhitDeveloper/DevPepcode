let username= document.querySelector("#name");
let email= document.querySelector("#email");
let pw= document.querySelector("#password");
let cpw= document.querySelector("#confirm-password");
let signupBtn= document.querySelector("#submit");

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
        }
    }
    catch(error){
        console.log(error);
    }
})