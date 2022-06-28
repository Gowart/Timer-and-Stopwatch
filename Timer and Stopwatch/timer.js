document.getElementById('data-clock').innerHTML = setClockHtml();

function setClockHtml() {
    return `
        <div class="header">
        <div class="header-container">
            <div class="header-left">
                <div class="header-left-center">
                    <h1 class="header-timer">TIMER</h1>
                </div>
            </div>
            <div class="header-right">
                <div class="header-right-center">
                    <h1 class="header-stopwatch">STOPWATCH</h1>
                </div>
            </div>
        </div>
        </div>
        <div class="clock-container">
            <div class="clock" id="timenow">00:00:00</div>
        </div>
    `
};

let timerButtonFlag = 'false';
const timerButton = document.querySelector('.header-left');
const timerButtonText = document.querySelector('.header-timer');

let stopwatchButtonFlag = 'true';
const stopwatchButton = document.querySelector('.header-right');
const stopwatchButtonText = document.querySelector('.header-stopwatch');


timerButton.addEventListener('click', function(event) {
    if (event.type === 'click' && timerButtonFlag === 'true') {
        timer();
        timerButtonFlag = 'false';
        stopwatchButtonFlag = 'true';
        stopwatchButtonText.style.color = '#686868';
        timerButtonText.style.color = '#313131';
    };
});

stopwatchButton.addEventListener('click', function(event) {
    if (event.type === 'click' && stopwatchButtonFlag === 'true') {
        stopwatch();
        stopwatchButtonFlag = 'false';
        timerButtonFlag = 'true';
        stopwatchButtonText.style.color = '#313131';
        timerButtonText.style.color = '#686868';
    };
});


// CLOCK  -----------------------------------------------------


function clock() {
    const getTimeNow = document.getElementById('timenow');
    // const getTimeNowMilliseconds = document.getElementById('timenowmil');

    function clockSet() {
        const timeNow = new Date();
        const timeUnits = {
            hours: timeNow.getHours(),
            minutes: timeNow.getMinutes(), 
            seconds: timeNow.getSeconds(),
            // milliseconds: timeNow.getMilliseconds(),

            checkSpaces() {
                for (let key in this) {
                    if (key !== 'milliseconds') {
                        if (String(this[key]).length === 1) this[key] = `0${String(this[key])}`
                    } else if (String(this[key]).length === 1) this[key] = `00${String(this[key])}`
                      else if (String(this[key]).length === 2) this[key] = `0${String(this[key])}`             
            }},

            renderTime() {
                this.checkSpaces();
                getTimeNow.innerText = `${this.hours}:${this.minutes}:${this.seconds}`;
                // getTimeNowMilliseconds.innerText = this.milliseconds; 
            },
        };
        timeUnits.renderTime(); 
    };
    clockSet();
    const clockStart = setInterval(clockSet, 10);
};
clock();


// TIMER  -----------------------------------------------------


timer();
    function timer() {

        renderMainDataTimer();
        function renderMainDataTimer() {
            document.querySelector('.main-data-container').innerHTML = setMainDataHtml();
        };

        function setMainDataHtml() {
            return `
                <div id="data-timer">
                </div>
                <div id="data-timer-buttons">
                </div>
            `
        };

        renderInputsTimer();
        function renderInputsTimer() {
            document.getElementById('data-timer').innerHTML = setInputsHtml();
        };

        function setInputsHtml() {
            return `
                    <div class="inputs-timer">
                        <input class="getdays input" type="number" placeholder="D">
                        <input class="gethours input" type="number" placeholder="H">
                        <input class="getminutes input" type="number" placeholder="M">
                        <input class="getseconds input" type="number" placeholder="S">
                    </div>
            `
        };

        function renderCounterTimer() {
            document.getElementById('data-timer').innerHTML = setCounterHtml();
        };

        function setCounterHtml() {
            return `
                    <div class="timer">
                        <div class="timer-days" id="daysoutid"></div>
                        <div class="timer-time" >
                            <div class="timer-hours" id="hoursoutid"></div>
                            <div class="timer-sep">:</div>
                            <div class="timer-minutes" id="minutesoutid"></div>
                            <div class="timer-sep">:</div>
                            <div class="timer-seconds" id="secondsoutid"></div>
                        </div>
                        <div class="timer-milliseconds" id="millisecondsoutid"></div>
                    </div>       
            `
        };


        renderButtonsTimer();
        function renderButtonsTimer() {
            document.getElementById('data-timer-buttons').innerHTML = setButtonsHtml();
        };

        function setButtonsHtml() {
            return `
                    <div class="timer-buttons">
                        <div class="timer-button-start starttimer" id="starttimer">START</div>
                        <div class="timer-button-pause pausetimer">PAUSE</div>
                        <div class="timer-button-clear cleartimer">CLEAR</div>
                    </div>
            `
        };

        let timer;
        let futureTime;
        let timeStampNow;

        let getDays = 0;
        let getHours = 0;
        let getMinutes = 0;
        let getSeconds = 0;

        let getInputsValuesFlag = 'true';
        function getInputsValues() {
            getDays = +document.getElementsByClassName('getdays')[0].value;
            getHours = +document.getElementsByClassName('gethours')[0].value;
            getMinutes = +document.getElementsByClassName('getminutes')[0].value;
            getSeconds = +document.getElementsByClassName('getseconds')[0].value;
        };


        function startTimer(buttonCall) {
            if (getInputsValuesFlag === 'true') {
                getInputsValues();
                getInputsValuesFlag = 'false';
            };

            let setTimeInput = (+getDays * 86400000) + (+getHours * 3600000) + (+getMinutes * 60000) + (+getSeconds * 1000);

                timeStampNow = new Date().getTime();
                if (buttonCall === 'Start') futureTime = timeStampNow + setTimeInput;
                if (buttonCall === 'Pause')futureTime = timeStampNow + continueTime;
                timer = setInterval(timerSet, 10);
        };

        let timeRest;
        function timerSet() {
            timeStampNow = new Date().getTime();
            timeRest = futureTime - timeStampNow;
            let days = new Date(timeRest).getUTCDate();
            let hours = new Date(timeRest).getUTCHours();
            let minutes = new Date(timeRest).getMinutes();
            let seconds = new Date(timeRest).getSeconds();
            let milliseconds = new Date(timeRest).getMilliseconds();
            
            if (isNaN(milliseconds) === false) {
                    document.getElementById('daysoutid').innerText = `${+days - 1}`;
                    document.getElementById('hoursoutid').innerText = `${+hours}`;
                    document.getElementById('minutesoutid').innerText = `${+minutes}`;
                    document.getElementById('secondsoutid').innerText = `${+seconds}`;
                    document.getElementById('millisecondsoutid').innerText = `${+milliseconds}`;

                if (String(days).length === 1) document.getElementById('daysoutid').innerText = `00${+days - 1}`;
                if (String(days).length === 2) document.getElementById('daysoutid').innerText = `0${+days - 1}`;
                if (String(hours).length === 1) document.getElementById('hoursoutid').innerText = `0${+hours}`;
                if (String(minutes).length === 1) document.getElementById('minutesoutid').innerText = `0${+minutes}`;
                if (String(seconds).length === 1) document.getElementById('secondsoutid').innerText = `0${+seconds}`;
                if (String(milliseconds).length === 1) document.getElementById('millisecondsoutid').innerText = `00${+milliseconds}`;
                if (String(milliseconds).length === 2) document.getElementById('millisecondsoutid').innerText = `0${+milliseconds}`;

                    if (timeRest <= 0) {
                        clearInterval(timer);

                        document.getElementById('daysoutid').innerText = '000';
                        document.getElementById('hoursoutid').innerText = '00';
                        document.getElementById('minutesoutid').innerText = '00';
                        document.getElementById('secondsoutid').innerText = '00';
                        document.getElementById('millisecondsoutid').innerText = '000';
                        startTimerButton.innerText = 'START';
                        pauseTimerButton.innerText = 'PAUSE';
                    };
            } else {
                    clearInterval(timer);

                    document.getElementById('daysoutid').innerText = '000';
                    document.getElementById('hoursoutid').innerText = '00';
                    document.getElementById('minutesoutid').innerText = '00';
                    document.getElementById('secondsoutid').innerText = '00';
                    document.getElementById('millisecondsoutid').innerText = '000';

                    startTimerButton.innerText = 'START';
                    pauseTimerButton.innerText = 'PAUSE';
            };

        };

        let startTimerButtonFlag = 'true';

        const startTimerButton = document.getElementById('starttimer');
        startTimerButton.addEventListener('click', function(event) {

                if (event.type === 'click' && startTimerButtonFlag === 'true') {
                    getInputsValues();
                    startTimerButtonFlag = 'false';
                };
                
                if (event.type === 'click' && (getDays > 0 || getHours > 0 || getMinutes > 0 || getSeconds > 0)) {
                    clearInterval(timer);
                    startTimer('Start');
                    startTimerButton.innerText = 'RESTART';
                    pauseTimerButton.innerText = 'PAUSE';
                    pauseFlag = 'Pause';
                    renderCounterTimer();
                } else {
                    startTimerButtonFlag = 'true';
                };
        });


        let continueTime = 0;
        let pauseFlag = 'Pause';
        const pauseTimerButton = document.querySelector('.pausetimer');
        pauseTimerButton.addEventListener('click', function(event) {
                if (event.type === 'click' && pauseFlag === 'Pause' && startTimerButtonFlag === 'false') {
                    clearInterval(timer);
                    pauseTimerButton.innerText = 'CONTINUE';
                    continueTime = timeRest;
                    pauseFlag = 'Continue';
                } else if (event.type === 'click' && pauseFlag === 'Continue' && startTimerButtonFlag === 'false') {
                    clearInterval(timer);
                    pauseTimerButton.innerText = 'PAUSE';
                    pauseFlag = 'Pause';
                    startTimer('Pause');
                };
        });

        const clearTimerButton = document.querySelector('.cleartimer');
        clearTimerButton.addEventListener('click', function(event) {
                if (event.type === 'click') {
                    clearTimer();
                };
        });

        function clearTimer() {

            clearInterval(timer);
            document.getElementById('daysoutid').innerText = '000';
            document.getElementById('hoursoutid').innerText = '00';
            document.getElementById('minutesoutid').innerText = '00';
            document.getElementById('secondsoutid').innerText = '00';
            document.getElementById('millisecondsoutid').innerText = '000';

            renderInputsTimer();
            getInputsValuesFlag = 'true';

            startTimerButton.innerText = 'START';
            pauseTimerButton.innerText = 'PAUSE';
            continueTime = 0;
            timeRest = 0;
            getDays = 0;
            getHours = 0;
            getMinutes = 0;
            getSeconds = 0;
            startTimerButtonFlag = 'true';
        };

        stopwatchButton.addEventListener('click', function(event) {
            if (event.type === 'click') {
                clearInterval(timer);
            }});


    };

   
// STOPWATCH  -----------------------------------------------------


function stopwatch() {
    

    document.querySelector('.main-data-container').innerHTML = setStopwatchHtml();

    setStopwatchHtml();
    function setStopwatchHtml() {
        return `
            <div class="stopwatch">
                <div class="stopwatch-days" id="secdaysid">000</div>
                <div class="stopwatch-time" >
                    <div class="stopwatch-hours" id="sechoursid">00</div>
                    <div class="stopwatch-sep">:</div>
                    <div class="stopwatch-minutes" id="secminutesid">00</div>
                    <div class="stopwatch-sep">:</div>
                    <div class="stopwatch-seconds" id="secsecondsid">00</div>
                </div>
                <div class="stopwatch-milliseconds" id="secmillisecid">000</div>
            </div>
            <div class="stopwatch-buttons">
                <div class="stopwatch-button-start">START</div>
                <div class="stopwatch-button-clear">CLEAR</div>
            </div>
        `
    };

    let startSecFlag = 'Start';
    let timefreeze = 0;
    let stopwatch;
    let pauseArray = [0];
    let sumPause = 0;

    const startSecButton = document.querySelector('.stopwatch-button-start');
    startSecButton.addEventListener('click', function(event) {
            if (event.type === 'click' && startSecFlag === 'Start') {
                startSecButton.innerText = 'PAUSE';
                startSecFlag = 'Pause';
                startSec();
            } else if (event.type === 'click' && startSecFlag === 'Pause') {
                startSecButton.innerText = 'START';
                startSecFlag = 'Start';
                pauseArray.push(new Date().getTime() - timefreeze);
                sumPause = pauseArray.reduce((sum, current) => sum + current, 0);
                clearInterval(stopwatch);
            };
    });


    function startSec() {
            timefreeze = new Date().getTime();
            stopwatch = setInterval(stopwatchSet, 10);
    };


    function stopwatchSet() {
            let stopwatchTime = new Date().getTime() - timefreeze + sumPause;

            let days = new Date(stopwatchTime).getUTCDate();
            let hours = new Date(stopwatchTime).getUTCHours();
            let minutes = new Date(stopwatchTime).getMinutes();
            let seconds = new Date(stopwatchTime).getSeconds();
            let milliseconds = new Date(stopwatchTime).getMilliseconds();

                document.getElementById('secdaysid').innerText = `${+days - 1}`;
                document.getElementById('sechoursid').innerText = `${+hours}`;
                document.getElementById('secminutesid').innerText = `${+minutes}`;
                document.getElementById('secsecondsid').innerText = `${+seconds}`;
                document.getElementById('secmillisecid').innerText = `${+milliseconds}`;

            if (String(days).length === 1) document.getElementById('secdaysid').innerText = `00${+days - 1}`;
            if (String(days).length === 2) document.getElementById('secdaysid').innerText = `0${+days - 1}`;
            if (String(hours).length === 1) document.getElementById('sechoursid').innerText = `0${+hours}`;
            if (String(minutes).length === 1) document.getElementById('secminutesid').innerText = `0${+minutes}`;
            if (String(seconds).length === 1) document.getElementById('secsecondsid').innerText = `0${+seconds}`;
            if (String(milliseconds).length === 1) document.getElementById('secmillisecid').innerText = `00${+milliseconds}`;
            if (String(milliseconds).length === 2) document.getElementById('secmillisecid').innerText = `0${+milliseconds}`;
    };

    
    const clearSecButton = document.querySelector('.stopwatch-button-clear');
    clearSecButton.addEventListener('click', function(event) {
            if (event.type === 'click') {
                clearStopwatch()
            };    
    });

    let secdaysid = document.getElementById('secdaysid');
    let sechoursid = document.getElementById('sechoursid');
    let secminutesid = document.getElementById('secminutesid');
    let secsecondsid = document.getElementById('secsecondsid');
    let secmillisecidt = document.getElementById('secmillisecid');

    clearStopwatch();
    function clearStopwatch() {
        clearInterval(stopwatch);
        pauseArray = [0];
        timefreeze = 0;
        sumPause = 0;
        startSecButton.innerText = 'START';
        startSecFlag = 'Start';

        secdaysid.innerText = '000';
        sechoursid.innerText = '00';
        secminutesid.innerText = '00';
        secsecondsid.innerText = '00';
        secmillisecidt.innerText = '000';
    };

    timerButton.addEventListener('click', function(event) {
        if (event.type === 'click') {
            clearStopwatch();
        }});

    let spaceFlag = true;
    document.addEventListener('keydown', function(event) {

            if (event.code == 'Space' && spaceFlag === true) {
                spaceFlag = false;
                event.preventDefault();
                if (startSecFlag === 'Start') {
                    startSecButton.innerText = 'PAUSE';
                    startSecFlag = 'Pause';
                    startSec();
                } else if (startSecFlag === 'Pause') {
                    startSecButton.innerText = 'START';
                    startSecFlag = 'Start';
                    pauseArray.push(new Date().getTime() - timefreeze);
                    sumPause = pauseArray.reduce((sum, current) => sum + current, 0);
                    clearInterval(stopwatch);
                };
            };
    });

    document.addEventListener('keyup', function(event) {
            
            if (event.code == 'Space') {
                event.preventDefault();
                spaceFlag = true;
            };
    });
};

















