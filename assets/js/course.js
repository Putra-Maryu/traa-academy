document.addEventListener('DOMContentLoaded', function() {
    const encrypted = "U2FsdGVkX1+...";
    const decrypted = CryptoJS.AES.decrypt(encrypted, 'kunci').toString(CryptoJS.enc.Utf8);
    document.body.innerHTML = decrypted;
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c')) ||
        e.key === 'F12'
    ) {
        e.preventDefault();
        alert("Akses Developer Tools diblokir!");
        window.location.href = "/";
    }
});

let devToolsOpen = false;
setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    
    if ((widthThreshold || heightThreshold) && !devToolsOpen) {
        devToolsOpen = true;
        alert("Developer Tools terdeteksi!");
        document.body.innerHTML = "<h1>Akses Developer Tools diblokir!</h1>";
    }
}, 1000);

document.addEventListener('DOMContentLoaded', function() {
    const moduleHeaders = document.querySelectorAll('.module-header');
    
    moduleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const moduleContent = header.nextElementSibling;
            const arrow = header.querySelector('span');
            
            header.classList.toggle('active');
            moduleContent.classList.toggle('active');
            
            if (header.classList.contains('active')) {
                arrow.textContent = '▲';
            } else {
                arrow.textContent = '▼';
            }
        });
    });
});