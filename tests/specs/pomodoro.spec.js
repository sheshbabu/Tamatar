describe('Pomodoro', function() {

    var floatingActionButtonEl,
        tabPomodoroEl,
        tabShortBreakEl,
        tabLongBreakEl,
        timerDisplayEl;

    beforeEach(function() {
        // cleanup of fixtures is done automatically
        setFixtures("<div class='app-bar'>Tamatar</div>" +
            "<div class='tabs'>" +
            "<div id='pomodoro' class='tab selected'>Pomodoro</div>" +
            "<div id='shortBreak' class='tab'>Short Break</div>" +
            "<div id='longBreak' class='tab'>Long Break</div>" +
            "</div>" +
            "<div id='floating-action-button' class='start'>" +
            "<div></div>" +
            "</div>" +
            "<div class='timer-display'></div>");

        floatingActionButtonEl = document.querySelector('#floating-action-button');
        tabPomodoroEl = document.querySelector('#pomodoro');
        tabShortBreakEl = document.querySelector('#shortBreak');
        tabLongBreakEl = document.querySelector('#longBreak');
        timerDisplayEl = document.querySelector('.timer-display');
    });

    describe('When the app is opened', function() {

        beforeEach(function() {
            Pomodoro.init();
        });

        it('should set pomodoro tab as selected', function() {
            expect(tabPomodoroEl.className).toEqual('tab selected');
        });

        it('should set timer display to 25 seconds', function() {
            expect(timerDisplayEl.textContent).toEqual('25:00');
        });

        it('should set floating-action-button to start', function() {
            expect(floatingActionButtonEl.className).toEqual('start');
        });

    });

    describe('When the tabs are switched', function() {

        beforeEach(function() {
            Pomodoro.init();
        });

        it('should set clicked tab as selected and other tabs as unselected', function() {
            tabShortBreakEl.click();
            expect(tabPomodoroEl.className).toEqual('tab');
            expect(tabShortBreakEl.className).toEqual('tab selected');
            expect(tabLongBreakEl.className).toEqual('tab');

            tabLongBreakEl.click();
            expect(tabPomodoroEl.className).toEqual('tab');
            expect(tabShortBreakEl.className).toEqual('tab');
            expect(tabLongBreakEl.className).toEqual('tab selected');

            tabPomodoroEl.click();
            expect(tabPomodoroEl.className).toEqual('tab selected');
            expect(tabShortBreakEl.className).toEqual('tab');
            expect(tabLongBreakEl.className).toEqual('tab');
        });

        it('should set the correct timer display text on tab switch', function() {
            tabShortBreakEl.click();
            expect(timerDisplayEl.textContent).toEqual('05:00');

            tabLongBreakEl.click();
            expect(timerDisplayEl.textContent).toEqual('15:00');

            tabPomodoroEl.click();
            expect(timerDisplayEl.textContent).toEqual('25:00');
        });
    });
});