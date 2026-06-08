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

async function sendMessage(){

const text =
msgInput.value.trim();

if(!text) return;

addMessage(text,"user");

msgInput.value="";

try{

const response =
await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.model}:generateContent?key=${CONFIG.apiKey}`,
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

contents:[
{
parts:[
{text:text}
]
}
],

generationConfig:{
temperature:
CONFIG.temperature,

topP:
CONFIG.topP,

topK:
CONFIG.topK,

maxOutputTokens:
CONFIG.maxOutputTokens
}

})
}
);

const data =
await response.json();

const reply =
data.candidates?.[0]
?.content?.parts?.[0]
?.text ||
"Tidak ada jawaban";

addMessage(reply,"ai");

}catch(err){

addMessage(
"Error: "+err.message,
"ai"
);

}

}

const floatingMenu =
document.getElementById("floatingMenu");

const editBtn =
document.getElementById("editMsg");

const copyBtn =
document.getElementById("copyMsg");

const deleteBtn =
document.getElementById("deleteMsg");

let selectedBubble = null;

function enableLongPress(el){

let timer;

el.addEventListener(
"touchstart",
e=>{

timer=setTimeout(()=>{

selectedBubble=el;

floatingMenu.style.left=
e.touches[0].pageX+"px";

floatingMenu.style.top=
e.touches[0].pageY+"px";

floatingMenu.classList.remove(
"hidden"
);

},800);

}
);

el.addEventListener(
"touchend",
()=>{
clearTimeout(timer);
}
);

}

copyBtn.onclick=()=>{

if(!selectedBubble) return;

navigator.clipboard.writeText(
selectedBubble.textContent
);

floatingMenu.classList.add(
"hidden"
);

};

deleteBtn.onclick=()=>{

if(!selectedBubble) return;

selectedBubble.remove();

floatingMenu.classList.add(
"hidden"
);

saveChat();

};

editBtn.onclick=()=>{

if(!selectedBubble) return;

const txt = prompt(
"Edit Pesan",
selectedBubble.textContent
);

if(txt){

selectedBubble.textContent=txt;

saveChat();

}

floatingMenu.classList.add(
"hidden"
);

};

function saveChat(){

localStorage.setItem(
"chatData",
chat.innerHTML
);

}

function loadChat(){

const data =
localStorage.getItem(
"chatData"
);

if(data){

chat.innerHTML=data;

document
.querySelectorAll(".msg")
.forEach(enableLongPress);

}

}

loadChat();

const oldAddMessage =
addMessage;

addMessage=(text,type)=>{

oldAddMessage(text,type);

saveChat();

};
document.body.onclick=()=>{

floatingMenu.classList.add(
"hidden"
);

};

const saveBg =
document.getElementById(
"saveBg"
);

saveBg.onclick=()=>{

if(!window.currentBg)
return;

localStorage.setItem(
"background",
window.currentBg
);

};

const muteBtn =
document.getElementById(
"muteBg"
);

muteBtn.onclick=()=>{

bgVideo.muted =
!bgVideo.muted;

};

document
.getElementById("apikey")
.value=
CONFIG.apiKey;

document
.getElementById("model")
.value=
CONFIG.model;

document
.getElementById("temp")
.value=
CONFIG.temperature;

document
.getElementById("topP")
.value=
CONFIG.topP;

document
.getElementById("topK")
.value=
CONFIG.topK;

document
.getElementById("prompt")
.value=
CONFIG.systemPrompt;

[
"apikey",
"model",
"temp",
"topP",
"topK",
"prompt"
].forEach(id=>{

document
.getElementById(id)
.addEventListener(
"change",
e=>{

localStorage.setItem(
id,
e.target.value
);

location.reload();

}
);

});

if(
"serviceWorker"
in navigator
){

navigator.serviceWorker
.register(
"service-worker.js"
);

}

  function exportChat(){

const data = [];

document
.querySelectorAll(".msg")
.forEach(msg=>{

data.push({

type:
msg.classList.contains(
"user"
)
?"user":"ai",

text:
msg.textContent

});

});

const blob =
new Blob(

[
JSON.stringify(
data,
null,
2
)
],

{
type:
"application/json"
}

);

const a =
document.createElement("a");

a.href=
URL.createObjectURL(blob);

a.download=
"chat.json";

a.click();

  }
