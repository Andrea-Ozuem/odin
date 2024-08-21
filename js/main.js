function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages,
    this.read = read;
    this.info = function() {
        return `${this.name} by ${this.author}, ${this.pages - this.read} pages, not ready yet`;
    }
    this.changeRead = function() {
      this.read = !this.read;
      return this.read;
    }
}

const book1 = new Book('Redeeming Love', 'Francine', 129, true)
const book2 = new Book('Hosting', 'Bill Johnson', 129, false)
const myLibrary = [book1, book2];

const books = document.getElementById('books');

function createBookContent(book) {
  const h3 = document.createElement('h3');
  h3.textContent = book.title;

  const i = document.createElement('i');
  i.textContent = book.author;

  const rmBtn = document.createElement('button');
  rmBtn.textContent = 'Remove';
  rmBtn.classList.add('red');

  const readBtn = document.createElement('button');
  readBtn.textContent = 'Mark as read'
  readBtn.id = 'isread';

  const pages = document.createElement('p');
  pages.textContent = `Pages: ${book.pages}`;

  const read = document.createElement('p');
  read.classList.add('readStat');
  read.textContent = `Read: ${book.read ? 'Yes': 'No'}`;
  
  const li = document.createElement('li');
  li.setAttribute('data-id', myLibrary.indexOf(book))
  li.appendChild(h3);
  li.appendChild(i);
  li.appendChild(pages);
  li.appendChild(read);
  li.appendChild(rmBtn);
  li.appendChild(readBtn);
  return li;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}


function displayBook(myLibrary) {
  const books = document.getElementById("books");
  myLibrary.forEach((book) => {
    const li = createBookContent(book);
    books.appendChild(li);
  });
}

const showButton = document.querySelector("dialog + button");
const dialog = document.querySelector("dialog");
const submit = document.getElementById("submit");
const cancelBtn = document.getElementById("cancel");

window.addEventListener('load', (e) => {
  displayBook(myLibrary);
})


showButton.addEventListener("click", () => {
  dialog.showModal();
});


submit.addEventListener("click", (event) => {
  const form = document.querySelector("form");
  if (form.checkValidity()) {
    event.preventDefault();
    const newBook = new Book(form.elements["title"].value, form.elements["author"].value, form.elements["pages"].value, form.elements["read"].value);
    addBookToLibrary(newBook);
    const books = document.getElementById('books');
    books.appendChild(createBookContent(newBook));
  }
});


// Remove book & change Read statusfunctionality
books.addEventListener('click', (e) => {
  if (e.target) {
    const idx = e.target.parentElement.getAttribute('data-id');
    if (e.target.classList.contains('red')) {
      delete myLibrary[idx];
      books.removeChild(e.target.parentElement);
    } else if (e.target.previousElementSibling.previousElementSibling.classList.contains('readStat')) {
        const stat = e.target.previousElementSibling.previousElementSibling;
        stat.textContent = `Read: ${myLibrary[idx].changeRead() ? 'Yes': 'No'}`;
    }
  }
})


cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});