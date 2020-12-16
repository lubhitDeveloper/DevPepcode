
socket.on("user-joined", function(name){
    //<div class="chat join">Lubhit joined the chat !</div>
    let joinDiv= document.createElement("div");
    joinDiv.classList.add("chat");
    joinDiv.classList.add("join");
    joinDiv.innerHTML= `${name} joined the chat !`;

    chatBox.append(joinDiv);
})

socket.on("recieve-chat", function(userObj){
    addChat("left", userObj);
})

socket.on("leave", function(name){
    let leaveDiv= document.createElement("div");
    leaveDiv.classList.add("chat");
    leaveDiv.classList.add("leave");
    leaveDiv.innerHTML= `${name} left the chat !`;

    chatBox.append(leaveDiv);
})

function addChat(sender, userObj){
        let chatDiv= document.createElement("div");
        chatDiv.classList.add("chat");
        chatDiv.classList.add(sender);

        let chatName= document.createElement("div");
        chatName.classList.add("chat-name");
        chatName.innerHTML= userObj.user;

        let chatText= document.createElement("div");
        chatText.classList.add("chat-text");
        chatText.innerHTML= userObj.chatMessage;

        chatDiv.append(chatName);
        chatDiv.append(chatText);

        chatBox.append(chatDiv);

        chatBox.scrollTop= chatBox.scrollHeight;
}