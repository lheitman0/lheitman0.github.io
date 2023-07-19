let books = JSON.parse(localStorage.getItem('books')) || [];
var bookForm = document.getElementById('book-form');
const bookList = document.querySelector('.book-list');
// Clear the book list
bookList.innerHTML = '';

// Load and display the books from localStorage
books.forEach(book => {
  displayBookInformation(book);
});
window.onload = function() {
// Retrieve books from localStorage

  var lockButton = document.getElementById("lockButton");
  var unlockButton = document.getElementById("unlockButton");
  var passwordBox = document.getElementById("password-box");
  var passwordInput = document.getElementById("password-input");
  var passwordSubmit = document.getElementById("password-submit");
  // var bookForm = document.getElementById("book-form"); 

  // if(lockButton) {
  //   lockButton.addEventListener("click", function() {
  //     passwordBox.classList.toggle("hidden");
  //   });
  // } else {
  //   console.log("Lock button not found");
  // }

  if(lockButton) {
    lockButton.addEventListener("click", function() {
      if (bookForm.classList.contains('hidden')) {
          // Unlock the screen
          passwordBox.classList.remove("hidden");
      } else {
          // Lock the screen
          bookForm.classList.add("hidden");
          passwordBox.classList.add("hidden");
          unlockButton.classList.add("hidden");
          lockButton.classList.remove("hidden");
          // Disable hover effect
          var bookCards = document.getElementsByClassName('book-card');
          for (var i = 0; i < bookCards.length; i++) {
            bookCards[i].style.pointerEvents = 'none';
          }
      }
  });
  
  } else {
    console.log("Lock button not found");
  }
  document.addEventListener('mousedown', function (event) {
    var isClickInsidePasswordBox = passwordBox.contains(event.target);
    
    if (!isClickInsidePasswordBox) {
      // The click was outside the passwordBox, so hide it
      passwordBox.classList.add("hidden");
    }
  });
  

  if (unlockButton) {
    unlockButton.addEventListener("click", function() {
      bookForm.classList.add("hidden"); // Hide the book form
      unlockButton.classList.add("hidden"); // Hide the unlock button
      lockButton.classList.remove("hidden"); // Show the lock button
  
      // Disable hover effect and delete buttons
      var bookCards = document.getElementsByClassName('book-card');
      for (var i = 0; i < bookCards.length; i++) {
        bookCards[i].style.pointerEvents = 'none';
      }
      var deleteButtons = document.getElementsByClassName('delete-button');
      for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].classList.add("hidden");
      }
    });
  } else {
    console.log("Unlock button not found");
  }
  

  if(passwordSubmit) {
    passwordSubmit.addEventListener("click", function() {
      if (passwordInput.value === 'iknowthisisntsecure') {
        console.log('Password is correct');
        // alert('Password accepted');
        // Remove 'hidden' class from book form and unlock button
        bookForm.classList.remove("hidden");
        unlockButton.classList.remove("hidden");
        // Add 'hidden' class to password box and lock button
        passwordBox.classList.add("hidden");
        lockButton.classList.add("hidden");
        passwordInput.value = '';

        // Enable hover effect
        var bookCards = document.getElementsByClassName('book-card');
        for (var i = 0; i < bookCards.length; i++) {
          bookCards[i].style.pointerEvents = 'auto';
        }
        // Remove 'hidden' class from deleteButton
        var deleteButtons = document.getElementsByClassName('delete-button');
        for (var i = 0; i < deleteButtons.length; i++) {
          deleteButtons[i].classList.remove("hidden");
        }
      } else {
        console.log('Password is incorrect');
        alert('Incorrect password');
        passwordInput.value = '';
      }
    });
  } else {
    console.log("Password submit button not found");
  }
}



  // Function to save books to localStorage
  function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
  }

  // const bookPrev = document.querySelector('.book-prev');
  // const bookPrevContainer = document.querySelector('.book-prev-container');

  if (bookForm){

    bookForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const titleInput = document.querySelector('#title');
      const authorInput = document.querySelector('#author');

      const title = titleInput.value;
      const author = authorInput.value;

      fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`)
        .then(response => response.json())
        .then(data => {
          if (data.totalItems === 0) {
            displayErrorMessage('Book not found');
          } else {
            const bookData = data.items[0].volumeInfo;
            // Add the new book to the existing books array
            books.push(bookData);

            // Save the updated books to localStorage
            saveBooks()
            displayBookInformation(bookData)
          }
        })
        .catch(error => {
          console.error(error);
          displayErrorMessage('Error occurred while searching for the book');
        });

      titleInput.value = '';
      authorInput.value = '';
      // When the page loads:

    });

  }else{
    console.log("book form not found")
  }

  function displayBookInformation(book) {
    const bookCard = document.createElement('li');
    bookCard.classList.add('book-card');
    if (bookForm.classList.contains('hidden')) {
      bookCard.style.pointerEvents = 'none';
    }
  
    const bookImage = document.createElement('img');
    bookImage.src = book.imageLinks ? book.imageLinks.thumbnail : 'no-image-available.jpg';
    bookImage.alt = book.title;
    bookCard.appendChild(bookImage);
  
    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);
  
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button', 'hidden');
    deleteButton.innerHTML = '<span class="material-icons">remove_circle_outline</span>';
    bookCard.appendChild(deleteButton);
    deleteButton.addEventListener('click', () => {
      bookCard.remove();
      // Remove the deleted book from the books array
      books = books.filter(b => b.title !== book.title);
      // Save the updated books to localStorage
      saveBooks();
    });
  
    bookList.appendChild(bookCard);
  }
  
  

