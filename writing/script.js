// // Add your JavaScript here
// function checkPassword() {
//     var password = document.getElementById('passwordInput').value;
//     if (password === 'password') {
//         document.getElementById('section2').style.display = 'block';
//         document.getElementById('passwordPrompt').style.display = 'none';
//     } else {
//         alert('Incorrect password');
//     }
// }

// function showPasswordPrompt() {
//     document.getElementById('passwordPrompt').style.display = 'block';
//     document.querySelector('.overlay').style.display = 'block';
// }

// function hidePasswordPrompt() {
//     document.getElementById('passwordPrompt').style.display = 'none';
//     document.querySelector('.overlay').style.display = 'none';
// }

// window.onload = function() {
//     var url = window.location.href;
//     if (url.includes('#section2')) {
//         showPasswordPrompt();
//     }
// };

// // Function to show Luke's writing
// document.getElementById('lukeBtn').addEventListener('click', function() {
//     hideAllContent();
//     document.getElementById('lukeSection').style.display = 'block';
// });

// // Function to show the password prompt for Scarlett's section
// document.getElementById('scarlettBtn').addEventListener('click', function() {
//     hideAllContent();
//     document.getElementById('passwordPrompt').style.display = 'block';
// });

// // Function to check the password and show Scarlett's writing
// function checkPassword() {
//     var password = document.getElementById('passwordInput').value;
//     if (password === 'password') {
//         document.getElementById('scarlettSection').style.display = 'block';
//         document.getElementById('passwordPrompt').style.display = 'none';
//     } else {
//         alert('Incorrect password');
//     }
// }

// // Helper function to hide all content
// function hideAllContent() {
//     var contentSections = document.querySelectorAll('.content');
//     contentSections.forEach(function(section) {
//         section.style.display = 'none';
//     });
//     document.getElementById('passwordPrompt').style.display = 'none';
// }


// When the page loads, we don't show any writing sections
document.addEventListener('DOMContentLoaded', function() {
    hideAllContent();
});

// Function to show Luke's writing
document.getElementById('lukeBtn').addEventListener('click', function() {
    hideAllContent();
    document.getElementById('lukeSection').classList.remove('hidden');
});

// Function to show the password prompt for Scarlett's section
document.getElementById('scarlettBtn').addEventListener('click', function() {
    hideAllContent();
    document.getElementById('passwordPrompt').classList.remove('hidden');
});

// Function to check the password and show Scarlett's writing
function checkPassword() {
    var password = document.getElementById('passwordInput').value;
    if (password === 'password') {
        document.getElementById('scarlettSection').classList.remove('hidden');
        document.getElementById('passwordPrompt').classList.add('hidden');
    } else {
        alert('Incorrect password');
    }
}

// Helper function to hide all content
function hideAllContent() {
    document.querySelectorAll('.content').forEach(function(section) {
        section.classList.add('hidden');
    });
    document.getElementById('passwordPrompt').classList.add('hidden');
}
