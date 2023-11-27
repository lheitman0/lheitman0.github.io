// Add your JavaScript here
function checkPassword() {
    var password = document.getElementById('passwordInput').value;
    if (password === 'password') {
        document.getElementById('section2').style.display = 'block';
        document.getElementById('passwordPrompt').style.display = 'none';
    } else {
        alert('Incorrect password');
    }
}

// window.onload = function() {
//     var url = window.location.href;
//     if (url.includes('#section2')) {
//         document.getElementById('passwordPrompt').style.display = 'block';
//     }
// }

function showPasswordPrompt() {
    document.getElementById('passwordPrompt').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
}

function hidePasswordPrompt() {
    document.getElementById('passwordPrompt').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
}

window.onload = function() {
    var url = window.location.href;
    if (url.includes('#section2')) {
        showPasswordPrompt();
    }
};

