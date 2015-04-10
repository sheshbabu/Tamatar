var Timer = (function() {

    function Timer(duration, progressCallback, endCallback) {
        this.duration = duration;
        this.progressCallback = progressCallback;
        this.endCallback = endCallback;
        this.interval = null;
    }

    Timer.prototype.start = function() {
        var self = this,
            startTime = Date.now(),
            currTime,
            diffTime;

        this.interval = setInterval(function() {
            currTime = Date.now();
            diffTime = (self.duration - (currTime - startTime));

            if (diffTime < 0) {
                self.endCallback();
                return;
            }

            self.progressCallback(diffTime);
        }, 1000);
    }

    Timer.prototype.stop = function() {
        clearInterval(this.interval);
    }

    Timer.getTimeBreakdown = function(time) {
        var minutes,
            seconds;

        time = time / 1000;

        minutes = time / 60;
        minutes = minutes > 0 ? minutes : 0;
        minutes = Math.floor(minutes);
        seconds = time - (minutes * 60);
        seconds = Math.ceil(seconds);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return {
            minutes: minutes,
            seconds: seconds
        }
    }

    return Timer;

}());