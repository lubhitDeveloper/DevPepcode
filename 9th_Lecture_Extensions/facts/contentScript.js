let allImages= document.querySelectorAll("img");

function changeImage(){
let images= ["./images/pexels-photo-2193600.jpeg", "./images/pexels-photo-1402407.jpeg", "./images/pexels-photo-2307221.jpeg"];

for(let i=0; i<allImages.length; i++)
{
    //console.log(chrome.extension.getURL("./images/pexels-photo-1402407.jpeg"));
    let idx= Math.floor(Math.random() * images.length);

    allImages[i].src= chrome.extension.getURL(images[idx]);
}
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    changeImage();
    sendResponse("Hello from content");
});