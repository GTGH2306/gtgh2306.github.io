const tickrate = 100;
let cookies = 0;
let cps = 123.4;
let cpc = 5;

window.addEventListener('load', function(){
    setInterval(run, tickrate);
})

document.getElementById('addCookie').addEventListener('click', function(){
    cookies += cpc;
    showCookies();
})

document.getElementById('removeCookie').addEventListener('click', function(){
    if (cookies - 1 >= 0){
        cookies --;
    }
    showCookies();
})

function run(){
    cookiePerSecond();
    showCookies();
}

function cookiePerSecond(){
    cookies += (cps / 1000) * tickrate;
}

function showCookies(){
    document.getElementById('cookiesNb').innerHTML = 'Cookies: ' + Math.floor(cookies);
}