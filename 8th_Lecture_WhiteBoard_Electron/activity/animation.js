let toolButton= document.querySelector(".tool-button");
let toolbox= document.querySelector(".toolbox")
let openTool= document.querySelector("#open-tool");
let closeTool= document.querySelector("#close-tool");

toolButton.addEventListener("click", function(){
    if(toolbox.classList.contains("hide")){
        toolbox.classList.remove("hide");
        openTool.classList.add("hide");
        closeTool.classList.remove("hide");

    }
    else{
        toolbox.classList.add("hide");
        openTool.classList.remove("hide");
        closeTool.classList.add("hide");
    }
})