
import { navbar } from "./navbar.js";

navbar();

let form = document.getElementById('login-form');

form.addEventListener('submit', function(){
    event.preventDefault();

    const email  = form.email.value;
    const password = form.password.value;

    if(email === 'admin@empher.com' && password === 'empher@123'){
        localStorage.setItem('loginData', JSON.stringify({role: 'admin', email}));
        alert('Login as admin successfulll');
        window.location.href = 'admin.html';
    }
    else if(email === 'user@empher.com' && password === 'user@123'){
        localStorage.setItem('loginData', JSON.stringify({role: 'user', email}));
        alert('Login as user successfulll');
        window.location.href = 'book.html';
    }
    else{
        alert('something went wrong in login..');
    }
})