var count = 0;
console.log(document.cookie)

function handleClick() {
    incrementCount();
}

function incrementCount() {
    count++;
    const counterElement = document.getElementById("count");
    counterElement.innerHTML = `${count}`;
    setCookie("lopi-count", count)
}

function cookieExists(cookieName) {
    const cookies = document.cookie.split(';');
    if (cookies.length === 0) return false;
    return cookies.some((item) => item.trim().startsWith(cookieName));
}

function setCookie(cookieName, cookieVal) {
    if (!cookieExists(cookieName)) {
        document.cookie = `${cookieName}=${cookieVal};`;
        return;
    }
    
    let cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
        if (cookie.startsWith(cookieName)) {
            document.cookie = `${cookieName}=${cookieVal}; SameSite=strict`;
        }
    })
}

function getCookie(cookieName) {
    let value = null;
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        if (cookie.trim().startsWith(cookieName)) {
            value = cookie.trim().replace(`${cookieName}=`, '');
        }
    })
    return value;
}

// ran whenever script loads
if (cookieExists('lopi-count')) {
    count = parseInt(getCookie('lopi-count'));
    document.getElementById("count").innerHTML = getCookie('lopi-count')
} else {
    setCookie('lopi-count', `${count}`);
}