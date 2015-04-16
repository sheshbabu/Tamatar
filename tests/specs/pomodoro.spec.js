describe('Pomodoro', function() {

    var floatingActionButtonEl,
        tabPomodoroEl,
        tabShortBreakEl,
        tabLongBreakEl,
        timerDisplayEl;

    function fireEvent(el, eventName) {
        var ev = document.createEvent('Events');
        ev.initEvent(eventName, true, false);
        el.dispatchEvent(ev);
    }

    function setupFixtures() {
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
    }

    describe('When the app is opened', function() {

        beforeEach(function() {
            setupFixtures();
            new Pomodoro({
                Timer: Timer,
                chrome: {}
            });
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
            setupFixtures();
            new Pomodoro({
                Timer: Timer,
                chrome: {}
            });
        });

        it('should set clicked tab as selected and other tabs as unselected', function() {
            fireEvent(tabShortBreakEl, 'click');
            expect(tabPomodoroEl.className).toEqual('tab');
            expect(tabShortBreakEl.className).toEqual('tab selected');
            expect(tabLongBreakEl.className).toEqual('tab');

            fireEvent(tabLongBreakEl, 'click');
            expect(tabPomodoroEl.className).toEqual('tab');
            expect(tabShortBreakEl.className).toEqual('tab');
            expect(tabLongBreakEl.className).toEqual('tab selected');

            fireEvent(tabPomodoroEl, 'click');
            expect(tabPomodoroEl.className).toEqual('tab selected');
            expect(tabShortBreakEl.className).toEqual('tab');
            expect(tabLongBreakEl.className).toEqual('tab');
        });

        it('should set the correct timer display text on tab switch', function() {
            fireEvent(tabShortBreakEl, 'click');
            expect(timerDisplayEl.textContent).toEqual('05:00');

            fireEvent(tabLongBreakEl, 'click');
            expect(timerDisplayEl.textContent).toEqual('15:00');

            fireEvent(tabPomodoroEl, 'click');
            expect(timerDisplayEl.textContent).toEqual('25:00');
        });

    });

    describe('When timer is started', function() {

        beforeEach(function() {
            setupFixtures();
            new Pomodoro({
                Timer: Timer,
                chrome: {}
            });
            fireEvent(floatingActionButtonEl, 'click');
        });

        it('should disable tab swtiching', function() {
            expect(tabPomodoroEl.className).toEqual('tab disabled');
            expect(tabShortBreakEl.className).toEqual('tab disabled');
            expect(tabLongBreakEl.className).toEqual('tab disabled');

            fireEvent(tabLongBreakEl, 'click');
            expect(tabPomodoroEl.className).toEqual('tab disabled');
            expect(tabShortBreakEl.className).toEqual('tab disabled');
            expect(tabLongBreakEl.className).toEqual('tab disabled');

            fireEvent(tabPomodoroEl, 'click');
            expect(tabPomodoroEl.className).toEqual('tab disabled');
            expect(tabShortBreakEl.className).toEqual('tab disabled');
            expect(tabLongBreakEl.className).toEqual('tab disabled');

            fireEvent(tabShortBreakEl, 'click');
            expect(tabPomodoroEl.className).toEqual('tab disabled');
            expect(tabShortBreakEl.className).toEqual('tab disabled');
            expect(tabLongBreakEl.className).toEqual('tab disabled');
        });

        it('should set floating-action-button to stop', function() {
            expect(floatingActionButtonEl.className).toEqual('stop');
        });

    });

    describe('When timer is stopped', function() {

        beforeEach(function(done) {
            setupFixtures();
            new Pomodoro({
                Timer: Timer,
                chrome: {}
            });
            setTimeout(function() {
                fireEvent(floatingActionButtonEl, 'click');
                done();
            }, 1000);
            fireEvent(floatingActionButtonEl, 'click');
        });

        it('should enable tab swtiching', function() {
            expect(tabPomodoroEl.className).toEqual('tab selected');
            expect(tabShortBreakEl.className).toEqual('tab');
            expect(tabLongBreakEl.className).toEqual('tab');
        });

        it('should set floating-action-button to start', function() {
            expect(floatingActionButtonEl.className).toEqual('start');
        });

    });

    describe('When timer ends', function() {

        var stubChrome = {
            notifications: {
                create: jasmine.createSpy('spy')
            }
        }

        beforeEach(function() {
            setupFixtures();
            new Pomodoro({
                Timer: Timer,
                chrome: stubChrome,
                timePomodoro: 1000
            });
            fireEvent(floatingActionButtonEl, 'click');
        });

        afterEach(function() {
            stubChrome.notifications.create.calls.reset();
        });

        it('should reset the timer-display to original value', function(done) {
            setTimeout(function() {
                expect(timerDisplayEl.textContent).toEqual('00:01');
                done();
            }, 2000);
        });

        it('should send chrome notification', function(done) {
            setTimeout(function() {
                expect(stubChrome.notifications.create.calls.mostRecent().args[0]).toEqual('');
                expect(stubChrome.notifications.create.calls.mostRecent().args[1]).toEqual({
                    iconUrl: 'src/assets/images/tamaterial-128.png',
                    title: 'Tamatar',
                    message: 'Done',
                    type: 'basic'
                });

                done();

            }, 2000);
        });

        it('should enable tab swtiching', function(done) {
            setTimeout(function() {
                expect(tabPomodoroEl.className).toEqual('tab selected');
                expect(tabShortBreakEl.className).toEqual('tab');
                expect(tabLongBreakEl.className).toEqual('tab');
                done();
            }, 2000);

        });

        it('should set floating-action-button to start', function(done) {
            setTimeout(function() {
                expect(floatingActionButtonEl.className).toEqual('start');
                done();
            }, 2000);
        });

    });


});