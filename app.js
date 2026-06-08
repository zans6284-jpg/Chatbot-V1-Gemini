const chat =
document.getElementById("chat");

const msgInput =
document.getElementById("message");

const sendBtn =
document.getElementById("sendBtn");

const settings =
document.getElementById("settings");

const settingBtn =
document.getElementById("settingBtn");

settingBtn.onclick=()=>{
settings.classList.toggle("hidden");
};

function addMessage(text,type){

const div =
document.createElement("div");

div.className =
"msg " + type;

div.textContent = text;

chat.appendChild(div);

chat.scrollTop =
chat.scrollHeight;

enableLongPress(div);
}

sendBtn.onclick=sendMessage;

msgInput.addEventListener(
"keydown",
e=>{
if(e.key==="Enter"){
sendMessage();
}
}
);
