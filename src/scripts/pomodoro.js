function Pomodoro(options) {
    var _Timer,
        _chrome,
        _timer,
        _timePomodoro,
        _timeShortBreak,
        _timeLongBreak,
        _isTimerRunning = false,
        _areTabsLocked = false,
        _currentTab = 'pomodoro';

    var _tabPomodoroEl,
        _tabShortBreakEl,
        _tabLongBreakEl,
        _floatingActionButtonEl,
        _timerDisplayEl;

    options = options || {};

    _Timer = options.Timer;
    _chrome = options.chrome;

    _timePomodoro = options.timePomodoro || 25 * 60 * 1000;
    _timeShortBreak = options.timeShortBreak || 5 * 60 * 1000;
    _timeLongBreak = options.timeLongBreak || 15 * 60 * 1000;

    _floatingActionButtonEl = document.querySelector('#floating-action-button');
    _tabPomodoroEl = document.querySelector('#pomodoro');
    _tabShortBreakEl = document.querySelector('#shortBreak');
    _tabLongBreakEl = document.querySelector('#longBreak');
    _timerDisplayEl = document.querySelector('.timer-display');

    _setTimerDisplay(_timePomodoro);
    _bindEvents();

    function _bindEvents() {
        _floatingActionButtonEl.addEventListener('click', function() {
            if (_isTimerRunning) {
                _stop();
            } else {
                _start();
            }
        });
        _tabPomodoroEl.addEventListener('click', function() {
            _switchTab('pomodoro');
        });
        _tabShortBreakEl.addEventListener('click', function() {
            _switchTab('shortBreak');
        });
        _tabLongBreakEl.addEventListener('click', function() {
            _switchTab('longBreak');
        });
    }

    function _setTimerDisplay(time) {
        time = _Timer.getTimeBreakdown(time);
        _timerDisplayEl.textContent = time.minutes + ':' + time.seconds;
    }

    function _onTimerProgress(time) {
        _setTimerDisplay(time);
    }

    function _onTimerEnd(time) {
        _stop(time);
        // Send chrome notification
        _chrome.notifications.create('', {
            iconUrl: 'src/assets/images/tamatar-notification.png',
            title: 'Tamatar',
            message: 'Done',
            type: 'basic'
        }, function() {});
    }

    function _start() {
        var timerDuration;
        switch (_currentTab) {
            case 'pomodoro':
                timerDuration = _timePomodoro;
                break;
            case 'shortBreak':
                timerDuration = _timeShortBreak;
                break;
            case 'longBreak':
                timerDuration = _timeLongBreak;
                break;
        }
        _timer = new _Timer(timerDuration, _onTimerProgress, _onTimerEnd);
        _timer.start();
        _floatingActionButtonEl.className = 'stop';
        _isTimerRunning = true;
        _disableTabs();
    }

    function _stop(time) {
        _timer.stop();
        _floatingActionButtonEl.className = 'start';
        _setTimerDisplay(time);
        _isTimerRunning = false;
        _enableTabs();
    }

    function _switchTab(tabName) {
        var tabEl;

        if (_areTabsLocked) {
            return;
        }

        _deselectTabs();

        switch (tabName) {
            case 'pomodoro':
                tabEl = _tabPomodoroEl;
                _currentTab = 'pomodoro';
                _setTimerDisplay(_timePomodoro);
                break;
            case 'shortBreak':
                tabEl = _tabShortBreakEl;
                _currentTab = 'shortBreak';
                _setTimerDisplay(_timeShortBreak);
                break;
            case 'longBreak':
                tabEl = _tabLongBreakEl;
                _currentTab = 'longBreak';
                _setTimerDisplay(_timeLongBreak);
                break;
        }
        tabEl.className = 'tab selected';
    }

    function _enableTabs() {
        _areTabsLocked = false;
        _tabPomodoroEl.className = 'tab';
        _tabShortBreakEl.className = 'tab';
        _tabLongBreakEl.className = 'tab';
        _switchTab(_currentTab);
    }

    function _disableTabs() {
        _areTabsLocked = true;
        _tabPomodoroEl.className = 'tab disabled';
        _tabShortBreakEl.className = 'tab disabled';
        _tabLongBreakEl.className = 'tab disabled';
    }

    function _deselectTabs() {
        _tabPomodoroEl.className = 'tab';
        _tabShortBreakEl.className = 'tab';
        _tabLongBreakEl.className = 'tab';
    }
}