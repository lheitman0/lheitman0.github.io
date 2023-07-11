// sidebar
var toggleButton = document.getElementById("toggleButton");
var sidebar = document.querySelector(".sidebar");
var content = document.querySelector(".content");

toggleButton.addEventListener("click", function() {
    sidebar.classList.toggle("hidden");
    content.classList.toggle("sidebar-hidden");
});


const bookForm = document.querySelector('.book-form');
const bookList = document.querySelector('.book-list');
// const bookPrev = document.querySelector('.book-prev');
// const bookPrevContainer = document.querySelector('.book-prev-container');


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
        const books = data.items.map(item => item.volumeInfo);
        displayBookInformation(books);
        // testDisplay(books); //test
      }
    })
    .catch(error => {
      console.error(error);
      displayErrorMessage('Error occurred while searching for the book');
    });

  titleInput.value = '';
  authorInput.value = '';
});

// ...

function displayBookInformation(books) {
  if (books.length > 0) {
    const book = books[0];

    const bookCard = document.createElement('li');
    bookCard.classList.add('book-card');

    const bookImage = document.createElement('img');
    bookImage.src = book.imageLinks ? book.imageLinks.thumbnail : 'no-image-available.jpg';
    bookImage.alt = book.title;
    bookCard.appendChild(bookImage);

    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<span class="material-icons">remove_circle_outline</span>';
    bookCard.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
      bookCard.remove();
    });

    // bookCard.addEventListener('click', () => {
    //   bookPrevContainer(book);
    // });

    bookList.appendChild(bookCard);
  }
}


// function testDisplay(books) {
//   const bookInfo = document.createElement('li');
//   bookInfo.classList.add('book-info');

//   book = books[0];
//   const bookAuthor = document.createElement('p');
//   bookAuthor.classList.add('book-author');
//   bookAuthor.textContent = 'Author: ' + (book.authors ? book.authors.join(', ') : 'Unknown');
//   bookInfo.appendChild(bookAuthor);

//   const bookGenre = document.createElement('p');
//   bookGenre.classList.add('book-genre');
//   bookGenre.textContent = 'Genre: ' + (book.categories ? book.categories.join(', ') : 'Unknown');
//   bookInfo.appendChild(bookGenre);

//   bookList.appendChild(bookInfo); // Append the bookInfo element to the bookList
// }
