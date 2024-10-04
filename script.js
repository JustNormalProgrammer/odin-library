
class Library {
    
    constructor(arr) {
        this.myLibrary = arr;
    }
    
    deleteBook(idx) {
        this.myLibrary.splice(idx, 1);
    }
    
    addBookToLibrary(book) {
        this.myLibrary.push(book);
    }
}
class Book {
    constructor(title, author, numberOfPages, isRead) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
    }
    Info() {
        return (`${this.title} by ${this.author}, number of pages : ${this.numberOfPages}, ${this.isRead ? 'already read' : 'not read yet'}`)
    }
    
    
    changeReadStatus() {
        this.isRead = !this.isRead;
    }
}
class ScreenControler{
    constructor(){
        this.library = new Library(this.createSeeds());
        this.container = document.querySelector('.list');
        this.addButton = document.querySelector('.add-btn');
        this.form = document.querySelector('form');
        this.submit = document.querySelector('.form-btn');
        window.addEventListener('keyup', (evt) => {
            if (evt.key === 'Escape' && window.getComputedStyle(form).getPropertyValue('visibility') === 'visible') {
                hideForm();
            }
        })
        this.addButton.addEventListener('click', () => {
            this.showForm();
        })
        this.submit.addEventListener('click', (e) => this.handleForm(e));
    }
    createSeeds() {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            let book = new Book(`Title: ${i}`, `Author: Henryk${i}`, i, false)
            arr.push(book);
        }
        return arr;
    }

    hideForm() {
        this.container.classList.toggle('blur');
        this.addButton.classList.toggle('blur');
        this.form.style.visibility = 'hidden';
    }
    displayLibrary() {
        this.container.innerHTML = '';
        for (let book of this.library.myLibrary) {
            this.createCard(book);
        }
    }
    createCard(book) {
        const card = document.createElement('div');
        card.classList.add('card');
        const h2 = document.createElement('h2');
        h2.textContent = book.title;
        const pAuthor = document.createElement('p');
        pAuthor.textContent = book.author;
        const div = document.createElement('div');
        this.changeStatus(div, book.isRead);
        const nOfPages = document.createElement('p');
        nOfPages.textContent = book.numberOfPages;
        const delButton = document.createElement('button');
        div.addEventListener('click', () => {
            book.changeReadStatus();
            this.changeStatus(div, book.isRead);
        })
        delButton.classList.add('del-btn', 'card-btn');
        delButton.addEventListener('click', () => {
            this.library.deleteBook(this.library.myLibrary.indexOf(book));
            this.displayLibrary();
        })
        delButton.textContent = "Delete";
        card.appendChild(h2);
        card.appendChild(pAuthor);
        card.appendChild(delButton);
        card.appendChild(div);
        this.container.appendChild(card);
    }
    changeStatus(div, bool) {
        div.classList.remove('done', 'todo');
        if (bool) {
            div.classList.add('done', 'marker');
            div.textContent = "Already read"
        } else {
            div.classList.add('todo', 'marker');
            div.textContent = "Not read"
        }
    }
    handleForm(e) {
        e.preventDefault();
        const data = Array.from(document.querySelectorAll('input'));
        const values = data.map(data => data.value);
        const book = new Book(...values);
        this.library.addBookToLibrary(book);
        this.displayLibrary();
        this.form.reset();
        this.hideForm();
    }
    showForm() {
        if (window.getComputedStyle(this.form).getPropertyValue('visibility') === 'hidden') {
            this.form.style.visibility = "initial";
            this.container.classList.toggle('blur');
            this.addButton.classList.toggle('blur');
        }
    }
    
    
}


const screen = new ScreenControler();
screen.displayLibrary();