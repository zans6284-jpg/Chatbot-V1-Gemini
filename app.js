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
