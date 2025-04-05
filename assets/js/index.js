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
    createParticles();
    
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    
    const validCredentials = [
        { username: 'putraadmin', password: 'putraadmin16' },
        { username: 'maulana', password: 'maulana1324' },
        { username: 'adminrpl', password: 'adminrpl4321' }
    ];
    
    togglePasswordBtn.addEventListener('click', function() {
        const passwordField = passwordInput;
        const icon = this.querySelector('i');
        const text = this.querySelector('span');
        
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
            text.textContent = 'Sembunyikan';
        } else {
            passwordField.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
            text.textContent = 'Lihat Password';
        }
    });
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateAndLogin();
    });
    
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validateAndLogin();
        }
    });
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validateAndLogin();
        }
    });
    
    function validateAndLogin() {
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        resetErrorStates();

        const isValid = validCredentials.some(cred => 
            cred.username === username && cred.password === password
        );
        
        if (isValid) {
            animateSuccess();
            
            setTimeout(() => {
                window.location.href = 'page/course01.html';
            }, 1000);
        } else {
            animateError();
            showInputErrors();
        }
    }
    
    function animateSuccess() {
        const button = document.querySelector('.cyber-button');
        button.innerHTML = '<i class="fas fa-check"></i> SUCCESS';
        button.style.background = 'linear-gradient(45deg, #64ffda, #2ecc71)';
        
        setTimeout(() => {
            button.innerHTML = '<span>LOGIN</span><i class="fas fa-arrow-right"></i>';
            button.style.background = 'linear-gradient(45deg, var(--cyber-primary), var(--cyber-secondary))';
        }, 2000);
    }
    
    function animateError() {
        const button = document.querySelector('.cyber-button');
        button.innerHTML = '<i class="fas fa-times"></i> ERROR';
        button.style.background = 'linear-gradient(45deg, #ff2d75, #e74c3c)';
        
        setTimeout(() => {
            button.innerHTML = '<span>LOGIN</span><i class="fas fa-arrow-right"></i>';
            button.style.background = 'linear-gradient(45deg, var(--cyber-primary), var(--cyber-secondary))';
        }, 2000);
    }
    
    function showInputErrors() {
        usernameInput.parentElement.classList.add('error');
        passwordInput.parentElement.classList.add('error');
        
        let errorMessage = document.querySelector('.cyber-error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'cyber-error-message';
            errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Invalid username or password';
            loginForm.insertBefore(errorMessage, loginForm.firstChild);
        }
        
        loginForm.classList.add('shake');
        setTimeout(() => {
            loginForm.classList.remove('shake');
        }, 500);
    }
    
    function resetErrorStates() {
        usernameInput.parentElement.classList.remove('error');
        passwordInput.parentElement.classList.remove('error');

        const errorMessage = document.querySelector('.cyber-error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function createParticles() {
        const particlesContainer = document.querySelector('.cyber-particles');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 2 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            const duration = Math.random() * 20 + 10;
            particle.style.animation = `float ${duration}s linear infinite`;
            
            particlesContainer.appendChild(particle);
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});