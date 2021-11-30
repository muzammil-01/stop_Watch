showData();
let min = 0;
let sec = 0;
let millisec = 0;
var setinterval;
var i = 0;


// ====================Buttons==================== 
let startBtn = document.getElementById('startBtn')
let stopBtn = document.getElementById('stopBtn')
let resetBtn = document.getElementById('resetBtn')
let lapBtn = document.getElementById('lapBtn')
lapBtn.disabled = true;

// ==============Timer Headings================
let minHeading = document.querySelector('.minHeading');
let secHeading = document.querySelector('.secHeading');
let millisecHeading = document.querySelector('.millisecHeading');

// ===============main stopwatch function======================
function stopWatch() {
    millisec +=10;
    millisecHeading.innerHTML = millisec;
    if (millisec >= 1000) {
        sec++;
        secHeading.innerHTML = sec;
        millisec = 0;
    }
    else if (sec >= 60) {
        min++;
        minHeading.innerHTML = min;
        sec = 0;
    }
}


// =================Start Button Event=================
startBtn.addEventListener('click', function start() {
    setinterval = setInterval(stopWatch,10)
    startBtn.disabled = true;
    lapBtn.disabled = false;
    audio.play();
})

// ================Getting audio=======================
const audio = new Audio();
audio.src = './sound/clock.mp3'


// ================Stop button Event=========================
stopBtn.addEventListener('click', stop);
function stop() {
    clearInterval(setinterval)
    startBtn.disabled = false;
    lapBtn.disabled = true;
    audio.pause();
}

// =================Reset button event========================
resetBtn.addEventListener('click', reset);
function reset() {
    lapBtn.disabled = true;
    min = 00;
    sec= 00 ;
    msec = 00;
    minHeading.textContent = min;
    secHeading.textContent = sec;
    millisecHeading.textContent = msec;
    stop();
  
}



// clear All
document.getElementById('clr').addEventListener('click',function(){
    localStorage.clear();
    window.location.reload();
})

// store laps in Local storage 
lapBtn.addEventListener('click', function () {
    var min = minHeading.innerHTML
    var sec = secHeading.innerHTML
    var msec = millisecHeading.innerHTML; 

let laps = localStorage.getItem("laps");
if(laps == null){
     lapsObj = [];
}
else{
    lapsObj=JSON.parse(laps)
}
let myObj = {
    min: min,
    sec: sec,
    msec: msec
}
lapsObj.push(myObj);
localStorage.setItem("laps",JSON.stringify(lapsObj));
showData();
})

function showData(){
    let laps = localStorage.getItem('laps');
if(laps === null){
    lapsObj = [];
}
else{
    lapsObj = JSON.parse(laps)
}
let html = "";
lapsObj.forEach(function(element,index) {
    html +=  `
    <tr>
    <td>${index}</td>
    <td>${element.min}</td>
    <td>${element.sec}</td>
    <td>${element.msec}</td>
    <td><a><i class="fas fa-trash" onClick="deleteLap('index')"></i></a></td>
    </tr>
    `;
});
let lapsCount = document.getElementById('lapsCount');
if(lapsObj == 0){
    lapsCount.innerHTML = "<center>No Laps recorder</center>";
}else{
    lapsCount.innerHTML = html;
}
}
// delete laps from local Storage

function deleteLap(index){
    let laps = localStorage.getItem('laps');
if(laps === null){
    lapsObj = [];
}
else{
    lapsObj = JSON.parse(laps)
}
lapsObj.splice(index,1)
localStorage.setItem("laps",JSON.stringify(lapsObj))
showData();
}