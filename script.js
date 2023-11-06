//Display right div() when button is clicked
function show(selection){
	document.getElementById('main-display').innerHTML = document.getElementById(selection).innerHTML;

	if(selection == "timer"){
		document.getElementById('timerHome').innerHTML = document.getElementById('timerDropDown').innerHTML;
	}
}

//---------------------------- Convert single digits to double digits -------------------------------------
function get2Digits(number){
	if(number < 10){
		return "0" + number;
	}
	return number;
}

//------------------------------------ World Clock Script -------------------------------------------------
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January","February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

setInterval(worldClock, 500, "local","localTime","localDate"); //Local time
setInterval(worldClock, 500,"America/New_York","nyTime","nyDate"); //New York
setInterval(worldClock, 500,"Asia/Tokyo","tokyoTime","tokyoDate"); //Toyko
setInterval(worldClock, 500,"Africa/Accra","accraTime","accraDate"); //Accra
setInterval(worldClock, 500,"Europe/London","londonTime","londonDate"); //London

function worldClock(cityZone,timeId,dateId){

	var local = new Date();

	if(timeId == "localTime"){
		document.getElementById(timeId).innerHTML = "<b>Local Time :</b> " + get2Digits(local.getHours()) + ":" + get2Digits(local.getMinutes()) + ":" + get2Digits(local.getSeconds());
		document.getElementById(dateId).innerHTML =  days[local.getDay()] + ", " + get2Digits(local.getDate()) + " " + months[local.getMonth()] + " " + local.getFullYear();
	}
	else{
		var newTime = local.toLocaleTimeString('en-GB', {timeZone:cityZone});
		var newDate = local.toLocaleDateString('en-GB', {timeZone:cityZone});

		var day = newDate.slice(0,2);
		var month = newDate.slice(3,5);
		var year = newDate.slice(6);

		document.getElementById(timeId).innerHTML = newTime;
		document.getElementById(dateId).innerHTML = day + " " + months[Number(month)-1] + " " + year;
	}
}

//---------------------------------------- Set Timer script ------------------------------------------------

//Add numbers to the dropdown element

var $secDisplay =$(function(){
	var sec = $("#seconds");
	for(i=0;i<60;i++){
		$(sec).append($('<option></option>').val(get2Digits(i)).html(get2Digits(i)))
	}
});


var $minDisplay = $(function(){
	var mins = $("#minutes");
	for(i=0;i<60;i++){
		$(mins).append($('<option></option>').val(get2Digits(i)).html(get2Digits(i)))
	}
});


var $hrDisplay = $(function(){
	var hrs = $("#hours");
	for(i=0;i<=23;i++){
		$(hrs).append($('<option></option>').val(get2Digits(i)).html(get2Digits(i)))
	}
});

$minDisplay;
$secDisplay;
$hrDisplay;

var hours;
var minutes;
var seconds;
var counter = 1;
var secs = 0;

function pauseTimer(){
	if(document.getElementById('pauseButton').value != "Continue"){
		clearInterval(timer);
		document.getElementById('pauseButton').value = "Continue";
	}
	else{
		timer = setInterval(displayTimer,1000);
		document.getElementById('pauseButton').value = "Pause";
	}
}

function cancelTimer(){
	if(document.getElementById('pauseButton').value == "Continue"){
		document.getElementById('pauseButton').value = "Pause";
	}
	clearInterval(timer);
	$minDisplay;
	$secDisplay;
	$hrDisplay;
	counter = 1;
	document.getElementById('timerHome').style.Display = "none";
	document.getElementById('timerHome').innerHTML = document.getElementById('timerDropDown').innerHTML;
}

function timeInSeconds(h,m,s){
	return h*3600 + m*60 + s;
}

function updateTime(sec,identity){
	secs = sec;
	if(secs >= 0){
		hours = Math.floor(sec/3600);
		minutes = Math.floor((sec%3600)/60);
		seconds = Math.ceil((sec%3600)%60);

		if(seconds >= 1){
			seconds -= 1;
		}
		else if(seconds == 0 && minutes >= 1){
			seconds = 59;
			minutes -= 1;
		}
		else if(minutes == 0 && hours >= 1){
			minutes = 59;
			hours -= 1;
			if(seconds == 0){
				seconds = 59;
			}
		}
		secs -= 1;
	}
	else{
		cancelTimer;
	}
}

//Start timer

function startTimer(){
	timer = setInterval(displayTimer,1000);
}

function displayTimer(){
		if(counter == 1){
			hours = Number(document.getElementById("hours").value);
			minutes = Number(document.getElementById("minutes").value);
			seconds = Number(document.getElementById("seconds").value);
			counter += 1;
		}
		else if(hours >= 0 || minutes >= 0 || seconds >= 0){
			updateTime(timeInSeconds(hours,minutes,seconds),timer);
			document.getElementById("timerHome").innerHTML = "<h1>" + get2Digits(hours) + ":" + get2Digits(minutes) + ":" + get2Digits(seconds) + "</h1>";
		}
}

//--------------------------------------------- Stopwatch ------------------------------------------------

var stopwatchCounter = 0;
var stopwatchMins = 0;
var stopwatchSecs = 0;
var centiSeconds = 0;

function startStopWatch(){
	stopwatch = setInterval(displayStopwatch,1);
}

function displayStopwatch(){
	stopwatchCounter++;
	stopwatchMins = get2Digits(stopwatchCounter/60000 | 0);
	stopwatchSecs = get2Digits((stopwatchCounter/1000 | 0)%60);
	centiSeconds = get2Digits((stopwatchCounter/10 | 0)%100);

	document.getElementById("stopwatch-counter").innerHTML = "<h1>" + stopwatchMins + ":" + stopwatchSecs + ":" + centiSeconds + "</h1>"; 
}

function lap(){
	var lapItem = document.createElement("LI");
	var lapContent = document.createTextNode(stopwatchMins + ":" + stopwatchSecs + ":" + centiSeconds);

	lapItem.appendChild(lapContent);
	document.getElementById("laps").appendChild(lapItem);
}

//-------------------------------------------- Alarm ------------------------------------------------------

// Define variables for alarm state and sound
var isAlarmPlaying = false;
var alarmSound = document.getElementById("alarm-sound");

// Function to set the alarm
function setAlarm() {
    var alarmHour = parseInt(document.getElementById("alarm-hour").value);
    var alarmMinute = parseInt(document.getElementById("alarm-minute").value);
    var alarmSecond = parseInt(document.getElementById("alarm-second").value);

    // Function to check and play the alarm
    function checkAndPlayAlarm() {
        var now = new Date();
        var currentHours = now.getHours();
        var currentMinutes = now.getMinutes();
        var currentSeconds = now.getSeconds();

        if (
            currentHours === alarmHour &&
            currentMinutes === alarmMinute &&
            currentSeconds === alarmSecond
        ) {
            if (!isAlarmPlaying) {
                isAlarmPlaying = true;
                alarmSound.loop = true;
                alarmSound.play();
            }
        }
    }

    // Check and play the alarm every second
    var alarmInterval = setInterval(checkAndPlayAlarm, 1000);

    // Function to stop the alarm and clear the interval
    function stopAlarm() {
        clearInterval(alarmInterval);
        alarmSound.pause();
        alarmSound.currentTime = 0;
        isAlarmPlaying = false;
    }

    // Prompt the user to stop the alarm
    var userInput;
    var promptInterval = setInterval(function() {
        userInput = prompt("Time to wake up! Type 'awake' to stop the alarm loop.");
        if (userInput === 'awake') {
            stopAlarm();
            clearInterval(promptInterval);
        }
    }, 1000 * (alarmSecond - new Date().getSeconds()));
}







