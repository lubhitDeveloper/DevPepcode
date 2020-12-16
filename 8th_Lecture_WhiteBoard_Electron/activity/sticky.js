let stickyAdd = document.querySelector("#sticky");

// let stickyNotes = document.querySelector(".sticky-notes");

stickyAdd.addEventListener("click" , function(){
    
    let textBox = document.createElement("textarea");
    textBox.setAttribute("class" , "stickybox");
    textBox.setAttribute("rows" , "10");
    textBox.setAttribute("cols" , "26");
    // <textarea class="stickybox" rows="10" cols="30"> </textarea>
    let stickyContent = createSticky();
    stickyContent.appendChild(textBox);
    // <div class="sticky-content">
    // <textarea id="stickybox" rows="10" cols="30"> </textarea>
    // </div>    
})