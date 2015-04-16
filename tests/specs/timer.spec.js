describe('Timer', function() {

    var timer, progressCallbackSpy, endCallbackSpy;

    beforeEach(function() {
        progressCallbackSpy = jasmine.createSpy('spy');
        endCallbackSpy = jasmine.createSpy('spy');
        jasmine.clock().install();
        timer = new Timer(3000, progressCallbackSpy, endCallbackSpy);
    });

    afterEach(function() {
        timer = null;
        jasmine.clock().uninstall();
    });

    it('should breakdown milliseconds into minutes and seconds', function() {
        expect(Timer.getTimeBreakdown(1000)).toEqual({
            minutes: '00',
            seconds: '01'
        });
        expect(Timer.getTimeBreakdown(25 * 60 * 1000)).toEqual({
            minutes: '25',
            seconds: '00'
        });
        expect(Timer.getTimeBreakdown(5 * 60 * 1000)).toEqual({
            minutes: '05',
            seconds: '00'
        });
    });

    it('should call progressCallback every second', function() {
        timer.start();
        jasmine.clock().tick(1000);
        jasmine.clock().tick(1000);
        expect(progressCallbackSpy.calls.count()).toEqual(2);
    });

    it('should call endCallback after the time ends', function() {
        var startTime = Date.now();
        timer.start();
        spyOn(Date, 'now').and.returnValue(startTime + 4000);
        jasmine.clock().tick(1000);
        expect(endCallbackSpy).toHaveBeenCalled();
    });

    it('should stop calling progressCallback after stopped', function() {
        timer.start();
        jasmine.clock().tick(1000);
        jasmine.clock().tick(1000);
        timer.stop();
        jasmine.clock().tick(1000);
        jasmine.clock().tick(1000);
        expect(progressCallbackSpy.calls.count()).toEqual(2);
    })

});