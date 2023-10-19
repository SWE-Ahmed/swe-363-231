// the following script is to populate the images dynamically
let images = [
    {
        src:"../assets/meSuit.png",
        alt:"Myself in a suit"
    },
    {
        src:"../assets/kfupmIcon.png",
        alt:"Icon of KFUPM"
    }
]
for (var i = 0; i < images.length; i++){
    let img = document.createElement("img")
    img.width = 200
    img.height = 200
    img.src = images[i].src
    img.alt = images[i].alt
    document.querySelector(`#useImage${i}`).appendChild(img)
}

// the following script is to make the web page responsive to keyboard taps
// using the numbers 0,1,2,3 to represent sections  of the page to navigate to when clicked
// 0 -> home
// 1 -> about me section
// 2 -> work me section
// 3 -> contact me section
window.onkeydown = function(event) {
if (event.keyCode === 48 || event.keyCode === 96) {
    window.location.href = "index.html"
} else if (event.keyCode === 49 || event.keyCode === 97) {
    window.location.href = "#useImage0"
} else if (event.keyCode === 50 || event.keyCode === 98) {
    window.location.href = "#useImage1"
} else if (event.keyCode === 51 || event.keyCode === 99) {
    window.location.href = "#useImage2"
}
};
// to let the guest know about these hotkeys
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(function(){
        PopUp();
    },5000);
});

function PopUp(){
    document.getElementById('wrapper').style.display="none"; 
} 

// fetch from the Data Validation API
function validateMessageData() {
    const apiKey = "9ec579f2818a1387436b0d909ef73026";   
    const valText = document.querySelector("#message").value
    const request =  `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&txt=${encodeURIComponent(valText)}&lang=en`; 
    
    console.log(request)
    console.log(valText)
    fetch(request) 
    .then(response => { 
        if (response.ok) { 
            return response.json();
        } else { 
            throw new Error('API request failed'); 
        } 
    }) 
    .then(data => { 
        const sentiment = data.score_tag
        console.log("Sentiment:", sentiment);
    }) 
    .catch(error => { 
        console.error("Error:", error);
    });
}
// adding the validation function to the message data
document.getElementById("formData").onclick = function(){validateMessageData()}

// adding the signature functionality
const canvas = document.getElementById("sign");
const ctx = canvas.getContext("2d");
ctx.lineJoin = "round";
ctx.filter = "blur(1px)";
ctx.lineWidth = 2;
ctx.strokeStyle="#0000FF";
ctx.strokeRect(0, 0, canvas.width, canvas.height);

// defining the process for tracking curson on canva (got assistance from the internet)
const
relPos = pt => [pt.pageX - canvas.offsetLeft, pt.pageY - canvas.offsetTop],
drawStart = pt => { with(ctx) { beginPath(); moveTo.apply(ctx, pt); stroke(); }},
drawMove = pt => { with(ctx) { lineTo.apply(ctx, pt); stroke(); }},

pointerDown = e => drawStart(relPos(e.touches ? e.touches[0] : e)),
pointerMove = e => drawMove(relPos(e.touches ? e.touches[0] : e)),

draw = (method, move, stop) => e => {
    if(method=="add") pointerDown(e);
    canvas[method+"EventListener"](move, pointerMove);
    canvas[method+"EventListener"](stop, ctx.closePath);
};

canvas.addEventListener("mousedown", draw("add","mousemove","mouseup"));
canvas.addEventListener("touchstart", draw("add","touchmove","touchend"));
canvas.addEventListener("mouseup", draw("remove","mousemove","mouseup"));
canvas.addEventListener("touchend", draw("remove","touchmove","touchend"));

// acquiring the signature as an image
function getSignature() {
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;    
}