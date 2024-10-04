const myLibrary = [];
const container = document.querySelector('.list');
const addButton = document.querySelector('.add-btn');
const form = document.querySelector('form');
const submit = document.querySelector('.form-btn');
for (let i = 0; i < 10; i++) {
    book = new Book(`Title: ${i}`, `Author: Henryk${i}`, i, false)
    myLibrary.push(book);
}
window.addEventListener('keyup', (evt) => {
    if (evt.key === 'Escape' && window.getComputedStyle(form).getPropertyValue('visibility') === 'visible') {
        hideForm();
    }
})
addButton.addEventListener('click', () => {
    showForm();
})
Book.prototype.changeReadStatus = function () {
    this.isRead = !this.isRead;
}
function Book(title, author, numberOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
    this.info = function () {
        return (`${this.title} by ${this.author}, number of pages: ${this.numberOfPages}, ${this.isRead ? 'already read' : 'not read yet'}`)
    }
}
function addBookToLibrary(book) {
    myLibrary.push(book);
}
function hideForm() {
    container.classList.toggle('blur');
    addButton.classList.toggle('blur');
    form.style.visibility = 'hidden';
}
function changeStatus(div, bool){
    div.classList.remove('done', 'todo');
    if (bool) {
        div.classList.add('done', 'marker');
        div.textContent = "Already read"
    } else {
        div.classList.add('todo', 'marker');
        div.textContent = "Not read"
    }
}
function createCard(book) {
    const card = document.createElement('div');
    card.classList.add('card');
    const h2 = document.createElement('h2');
    h2.textContent = book.title;
    const pAuthor = document.createElement('p');
    pAuthor.textContent = book.author;
    const div = document.createElement('div');
    changeStatus(div,book.isRead);
    const nOfPages = document.createElement('p');
    nOfPages.textContent = book.numberOfPages;
    const delButton = document.createElement('button');
    div.addEventListener('click', () => {
        book.changeReadStatus();
        changeStatus(div, book.isRead);
    })
    delButton.classList.add('del-btn', 'card-btn');
    delButton.addEventListener('click', () => {
        deleteBook(myLibrary.indexOf(book));
    })
    delButton.textContent = "Delete";
    card.appendChild(h2);
    card.appendChild(pAuthor);
    card.appendChild(delButton);
    card.appendChild(div);
    container.appendChild(card);

}
function displayLibrary() {
    container.innerHTML = '';
    for (let book of myLibrary) {
        createCard(book);
    }
}
function deleteBook(idx) {
    myLibrary.splice(idx, 1);
    displayLibrary();
}
function showForm() {
    if (window.getComputedStyle(form).getPropertyValue('visibility') === 'hidden') {
        form.style.visibility = "initial";
        container.classList.toggle('blur');
        addButton.classList.toggle('blur');
    }
}
function handleForm(e) {
    e.preventDefault();
    const data = Array.from(document.querySelectorAll('input'));
    const values = data.map(data => data.value);
    const book = new Book(...values);
    addBookToLibrary(book);
    displayLibrary();
    form.reset();
    hideForm();
}
submit.addEventListener('click', (e) => handleForm(e));
displayLibrary();