chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.htm', {
        'bounds': {
            'width': 280,
            'height': 170
        }
    });
});