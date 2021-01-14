let userImg= document.querySelector("#user-img");
let profileImg= document.querySelector(".profile-img img");
let editBtn= document.querySelector(".edit-btn");
let saveBtn= document.querySelector(".save-btn");
let email= document.querySelector("#profile-email");
let fullName= document.querySelector("#profile-name");
let pw= document.querySelector("#profile-password");
let showProfilePass= document.querySelector(".show-text");

profileImg.addEventListener("click", function(){
    userImg.click();
})

userImg.addEventListener("change", async function(e){
    e.preventDefault();
    let file= userImg.files[0];
    console.log(file);

    let formData= new FormData();
    formData.append("user", file);
    
    let obj= await axios.patch("http://localhost:3000/api/user/updateprofilephoto", formData);
    console.log(obj);
    if(obj.data.message){
        window.location.reload();
    }
})

editBtn.addEventListener("click", function(e){
    e.preventDefault();
    saveBtn.style.display= "block";
    editBtn.style.display= "none";
    fullName.removeAttribute("readonly");
    email.removeAttribute("readonly");
    pw.removeAttribute("readonly");
})

saveBtn.addEventListener("click", async function(e){
    e.preventDefault();
    saveBtn.style.display= "none";
    editBtn.style.display= "block";
    fullName.setAttribute("readonly", "");
    email.setAttribute("readonly", "");
    pw.setAttribute("readonly", "");

    let updateUserObj={
        name: fullName.value,
        email: email.value,
        password: pw.value
    }

    let obj= await axios.patch("http://localhost:3000/api/user", updateUserObj);
    console.log(obj);

    if(obj.data.message){
        window.location.reload();
    }
})

showProfilePass.addEventListener("click", function(){
    
        
    if (pw.type == "password"){
        pw.type = "text";
        showProfilePass.textContent= "HIDE";
        showProfilePass.style.color= "#3a7cff";
    }
    else{
        pw.type = "password";
        showProfilePass.textContent= "SHOW";
        showProfilePass.style.color= "#222";
    }

})