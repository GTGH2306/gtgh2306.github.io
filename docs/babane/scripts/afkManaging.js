let startTimer;

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState == 'visible'){
        if (startTimer){
            let timeAfk = new Date() - startTimer;

            babanes += (getGlobalBps() / 1000) * timeAfk;

            startTimer = null;
        }

    } else {
        startTimer = new Date();
        
    }



});