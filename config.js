const CONFIG = {

apiKey:
localStorage.getItem("apikey") || "",

model:
localStorage.getItem("model") ||
"gemini-2.5-flash",

temperature:
Number(
localStorage.getItem("temp")
) || 1,

topP:
Number(
localStorage.getItem("topP")
) || 0.9,

topK:
Number(
localStorage.getItem("topK")
) || 40,

maxOutputTokens:8192,

frequencyPenalty:0,

presencePenalty:0,

systemPrompt:
localStorage.getItem("prompt") ||
"Anda adalah AI yang ramah."

};
