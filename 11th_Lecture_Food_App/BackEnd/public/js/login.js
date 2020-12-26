let email= document.querySelector("#email");
let pw= document.querySelector("#password");
let loginBtn= document.querySelector("#submit");

loginBtn.addEventListener("click", async function(e){
    try{
        e.preventDefault();

        if(email.value && pw.value){
            let obj= await axios.post("http://localhost:3000/api/user/login", {email: email.value, password: pw.value});
            console.log(obj);
        }
    }
    catch(error){
        console.log(error);
    }
})