function addCookie(_name, _value){
    let expDate = new Date();
    expDate.setDate(expDate.getDate() + 1);

    let cookie = _name + '=' + _value + '; '
    cookie += 'expires=' + expDate.toUTCString() + '; ';
    cookie += 'SameSite=Strict; '
    cookie += 'path=/; '

    document.cookie = cookie;
}

function getCookie(_name){
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith(_name));
    return cookie.split('=')[1];
}

function getCookiesTab(){
    let cookies = document.cookie.split('; ');
    for (let cookie of cookies){
        cookies[cookies.indexOf(cookie)] = cookie.split('=');
    }
    return cookies;
}