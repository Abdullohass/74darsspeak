const textarea = document.getElementById("textarea");
const select = document.getElementById("select");
const button = document.getElementById("button");
let voices = [];

// function gapir() {
//     const speech = new SpeechSynthesisUtterance();
//     speech.text = textarea.value;
//     speechSynthesis.speak(speech);
// }

button.addEventListener("click", () => {
    gapir();
})

function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    
    if (voices.length > 0) {
        select.innerHTML = "";
        voices.forEach((voice, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            select.appendChild(option);
        });
    } else {
        select.innerHTML = `<option disabled>no voices available</option>`;
    }
}

function ensureVoicesLoaded() {
    if (voices.length === 0) {
        loadVoices();
        if (voices.length === 0) {
            setTimeout(ensureVoicesLoaded, 500);
        }
    }
}

window.SpeechSynthesis.onvoiceschanged = loadVoices;
ensureVoicesLoaded();

function gapir() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = textarea.value;

    const selectVoicesIndex = textarea.value;

    if (selectVoicesIndex) {
        msg.voice = voices[selectVoicesIndex];
    } else {
        alert("Iltimos, ovoz tanlang!!!");
        return;
    }

    speechSynthesis.speak(msg);
}