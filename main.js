var currentPane = 'pomodoro';

var setTimerDisplay = function(minutes, seconds) {
    var timerEl = document.querySelector('#timer');
    timerEl.textContent = minutes + ':' + seconds;
};
setTimerDisplay(25, '00');

var onTimerEnd = function() {
    timer.stop();
    startStopEl.textContent = 'Start'
    isRunning = false;
    enablePaneSwitching();
    chrome.notifications.create('', {
        iconUrl: 'tamatar-notification.png',
        title: 'Tamatar',
        message: 'Done',
        type: 'basic'
    }, function() {});
}

var timer;

var isRunning = false;

var startStopEl = document.querySelector('#startStop'),
    pomodoroEl = document.querySelector('#pomodoro'),
    shortBreakEl = document.querySelector('#shortBreak'),
    longBreakEl = document.querySelector('#longBreak');

startStopEl.addEventListener('click', startStop);
pomodoroEl.addEventListener('click', showPomodoroPane);
shortBreakEl.addEventListener('click', showShortBreakPane);
longBreakEl.addEventListener('click', showLongBreakPane);

function startStop() {
    var timerDuration = getTimerDurationByPane(currentPane);
    if (!isRunning) {
        timer = new Timer(timerDuration, setTimerDisplay, onTimerEnd);
        timer.start();
        isRunning = true;
        startStopEl.textContent = 'Stop';
        disablePaneSwitching();
    } else {
        timer.stop();
        startStopEl.textContent = 'Start'
        isRunning = false;
        enablePaneSwitching();
    }
}

function disablePaneSwitching() {
    pomodoroEl.disabled = true;
    shortBreakEl.disabled = true;
    longBreakEl.disabled = true;
}

function enablePaneSwitching() {
    pomodoroEl.disabled = false;
    shortBreakEl.disabled = false;
    longBreakEl.disabled = false;
}

function getTimerDurationByPane(paneName) {
    switch (paneName) {
        case 'pomodoro':
            return 25 * 60 * 1000;
        case 'shortBreak':
            return 5 * 60 * 1000;
        case 'longBreak':
            return 15 * 60 * 1000;
    }
}

function showPomodoroPane() {
    currentPane = 'pomodoro';
    removeTabSelection();
    pomodoroEl.className = 'selected';
    setTimerDisplay('25', '00');
}

function showShortBreakPane() {
    currentPane = 'shortBreak';
    removeTabSelection();
    shortBreakEl.className = 'selected';
    setTimerDisplay('05', '00');
}

function showLongBreakPane() {
    currentPane = 'longBreak';
    removeTabSelection();
    longBreakEl.className = 'selected';
    setTimerDisplay('15', '00');
}

function removeTabSelection() {
    var tabs = document.querySelectorAll('#tabs div');
    tabs = Array.prototype.slice.call(tabs);
    tabs.forEach(function(tab) {
        tab.className = '';
    });
}