function handleClick() {
    incrementCount();
    playRandomSound();
    spawnalopi();
}

function incrementCount() {
    count++;
    const counterElement = document.getElementById("count");
    counterElement.innerHTML = `${count}`;
    setCookie("lopi-count", count)
}

function playRandomSound() {
    const ri = Math.floor(Math.random() * 3);
    
    // load sound
    if (sounds[ri] === null)
        sounds[ri] = new Audio(soundUrls[ri]);

    const sound = sounds[ri].cloneNode();    
    sound.play();
}

function spawnalopi() {
    let popup = getPopup();
    const popupArea = document.getElementById('popup-bg');
    
    const popupWidth = popup.width;
    const popupHeight = popup.height;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    popup.style.left = `${Math.random() * (windowWidth - popupWidth)}px`;
    popup.style.top = `${Math.random() * (windowHeight - popupHeight)}px`;
    const rotation = Math.random() * 360;
    popup.style.transform = `rotate(${rotation}deg)`;
    popup.style.setProperty("--rotato", `${rotation}deg`);
        
    popupArea.appendChild(popup);
    setTimeout(() => { 
        popupArea.removeChild(popup)
    }, 1000)
}

function getPopup() {
    if (lopiImage === null) {
        lopiImage = document.createElement("img");
        lopiImage.alt = "Picture of Lopi";
        lopiImage.src = lopiImageUrl;
        lopiImage.className = "popup";
    }

    return lopiImage.cloneNode();
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

// count is set to the lopi-count cookie if it exists whenever script loads
let count = 0
if (cookieExists('lopi-count')) {
    count = parseInt(getCookie('lopi-count'));
    document.getElementById("count").innerHTML = getCookie('lopi-count')
} else {
    setCookie('lopi-count', `${count}`);
}

// we'll load media on a "as-needed" basis to improve initial load times.
const soundUrls = [
    "media/audio/1.mp3",
    "media/audio/2.mp3",
    "media/audio/3.mp3",
]
const sounds = [
    null, null, null
]
const lopiImageUrl = "media/images/lopi.png"
var lopiImage = null;
